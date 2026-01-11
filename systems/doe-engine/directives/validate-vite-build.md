---
id: validate-vite-build
task_type: validation
project_id: all-vite-projects
version: 1
require_ack: false
auto_anneal: true
trigger: before_commit
retry:
  count: 3
  backoff_ms: 1000
fix_script: systems/doe-engine/execution/fix_vite_build.sh
owner: jen
---

# Validate Vite Build - Directive

## Goal

Automatically detect and fix common Vite build errors BEFORE they cause deployment failures.

## Trigger Conditions

Run this validation:
1. Before ANY git commit in a Vite project
2. Before ANY deployment
3. After ANY dependency installation
4. When Claude is asked to "deploy", "build", or "push to production"

## Critical Validation Checks

### 1. Environment Variable Validation

**Rule:** Vite projects MUST use `import.meta.env`, NEVER `process.env`

**Check:**
```bash
grep -r "process\.env" src/ --include="*.ts" --include="*.tsx"
```

**Expected:** No matches (or only in comments/disabled files)

**Auto-fix:**
```bash
# Replace all process.env with import.meta.env
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' 's/process\.env/import.meta.env/g' {} +
```

**Exception:** `process.env.NODE_ENV` in React class components → use `import.meta.env.DEV` or `import.meta.env.PROD`

### 2. TypeScript Compilation

**Rule:** Code MUST compile without errors

**Check:**
```bash
npx tsc --noEmit
```

**Expected:** Exit code 0, no error output

**Auto-fix:**
- If missing imports: Add them
- If type errors: Add proper type declarations
- If unused variables: Remove or prefix with `_`

### 3. Build Test

**Rule:** Production build MUST succeed

**Check:**
```bash
npm run build
```

**Expected:** Exit code 0, dist/ directory created with assets

**Common Issues:**
- Missing dependencies → Run `npm install --legacy-peer-deps`
- React 19 peer dependency conflicts → Use `--legacy-peer-deps`
- WebGL/Three.js type errors → Disable component or add type declarations

### 4. React 19 Compatibility

**Rule:** Libraries incompatible with React 19 require special handling

**Check:**
```bash
grep -E "@react-three/fiber|react-spring" package.json
```

**If found:**
- Verify `--legacy-peer-deps` used for installation
- Check if TypeScript types cause build errors
- Consider replacing with placeholder component if incompatible

### 5. Import Validation

**Rule:** All imports must resolve to existing files

**Check:**
- Grep for all import statements
- Verify target files exist
- Check for circular dependencies

**Auto-fix:**
- Remove unused imports
- Add missing files with placeholder exports
- Fix incorrect import paths

### 6. Environment Variable Syntax

**Patterns to catch:**

❌ **WRONG:**
```typescript
process.env.VITE_API_KEY
process.env.NODE_ENV
process.env.RESEND_API_KEY
```

✅ **CORRECT:**
```typescript
import.meta.env.VITE_API_KEY
import.meta.env.DEV  // for development check
import.meta.env.PROD // for production check
import.meta.env.RESEND_API_KEY
```

### 7. Window/Global Type Errors

**Rule:** Adding properties to `window` requires type declarations

**Pattern:**
```typescript
window.Sentry = Sentry  // ❌ Type error
```

**Auto-fix:**
```typescript
(window as any).Sentry = Sentry  // ✅ Works
// OR create src/types/window.d.ts
```

## Self-Anneal Process

If validation fails:

1. **Capture error output**
2. **Categorize error type**:
   - Environment variable error → Auto-fix with sed
   - Type error → Add type declarations
   - Import error → Add missing imports or remove unused
   - Build error → Check common causes, attempt fix

3. **Apply fix**
4. **Re-run validation**
5. **If still failing after 3 attempts:**
   - Create detailed error report
   - Block commit/deployment
   - Notify user with specific fix instructions

## Prevention System

### Pre-commit Hook

Install in every Vite project:

```bash
#!/usr/bin/env sh
# .husky/pre-commit

# Block commit if build validation fails
./scripts/validate-build.sh || exit 1
```

### ESLint Rule

Add to `.eslintrc.json`:

```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "MemberExpression[object.name='process'][property.name='env']",
        "message": "Use import.meta.env instead of process.env in Vite projects"
      }
    ]
  }
}
```

### TypeScript Config

Ensure strict mode in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

## File Locations to Check

### Company Website (Vite):
- `/company/website/site/src/`
- Check: worker/, react-app/, types/

### Client Websites (Next.js):
- `/clients/*/04_website/`
- These use `process.env` (that's correct for Next.js)
- Don't apply Vite rules to Next.js projects

## Critical: Project Type Detection

**Before applying fixes, detect project type:**

```bash
if grep -q "\"vite\"" package.json; then
  # Apply Vite rules (import.meta.env)
elif grep -q "\"next\"" package.json; then
  # Apply Next.js rules (process.env is OK)
fi
```

## Common Auto-Fixes

### Fix 1: Environment Variables
```bash
find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's/process\.env\.VITE_/import.meta.env.VITE_/g' {} +

find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' 's/process\.env\.RESEND/import.meta.env.RESEND/g' {} +

find src/ -type f \( -name "*.ts" -o -name "*.tsx" \) \
  -exec sed -i '' "s/process\.env\.NODE_ENV === 'development'/import.meta.env.DEV/g" {} +
```

### Fix 2: Missing Imports
```bash
# Detect missing sendEmail import
if grep -q "sendEmail(" src/worker/index.ts && ! grep -q "import.*sendEmail" src/worker/index.ts; then
  # Add to imports
  sed -i '' 's/from "\.\/lib\/email"/&; import { sendEmail }/' src/worker/index.ts
fi
```

### Fix 3: Type Declarations
```bash
# Create window types if missing
if [ ! -f "src/types/window.d.ts" ]; then
  cat > src/types/window.d.ts << 'EOF'
declare global {
  interface Window {
    Sentry?: any;
    gtag?: (...args: any[]) => void;
    hj?: (...args: any[]) => void;
  }
}
export {};
EOF
fi
```

## Success Criteria

All checks MUST pass:

- [ ] No `process.env` in src/ (Vite projects only)
- [ ] TypeScript compiles without errors
- [ ] Production build succeeds
- [ ] Bundle size reasonable (< 1MB gzipped)
- [ ] All imports resolve
- [ ] No type errors
- [ ] No unused variables/imports

## Outputs

**On Success:**
```
✅ All validation checks passed
✅ Safe to commit/deploy
```

**On Failure:**
```
❌ Validation failed: [specific error]
🔧 Auto-fix attempted: [fix applied]
📋 Manual fix required: [instructions]
```

## Integration with DOE Engine

This directive should be called by the MCP enforcement system:

```javascript
// systems/mcp-server/enforce-directive-check.js
if (isViteProject() && (isCommit() || isDeploy())) {
  await runDirective('validate-vite-build');
}
```

## Enforcement Level

**HARD STOP** - Block all commits/deployments if validation fails and auto-fix unsuccessful.

Do NOT allow user to bypass without explicit acknowledgment of risks.

## Edge Cases

1. **WebGL/Three.js Components:**
   - If causing type errors with React 19
   - Auto-disable by renaming to `.disabled`
   - Replace with placeholder component
   - Document for future re-enable

2. **Server-Side Code:**
   - Cloudflare Workers CAN use process.env
   - Check if file is in `src/worker/` before flagging

3. **Test Files:**
   - May have different rules
   - Check for `*.test.ts` or `__tests__/`

4. **Config Files:**
   - vite.config.ts, tsconfig.json allowed to use process
   - Exclude from validation

## Monitoring

Log all validation runs:

```json
{
  "timestamp": "2026-01-11T05:55:00Z",
  "project": "company-website",
  "validation": "vite-build",
  "status": "passed",
  "issues_found": 3,
  "auto_fixed": 3,
  "manual_fixes_required": 0,
  "build_time_ms": 1430
}
```

## Maintenance

Review this directive:
- Weekly: Check for new common errors
- After any failed deployment: Update with new check
- When new dependencies added: Validate compatibility
- When React/Vite versions change: Update rules
