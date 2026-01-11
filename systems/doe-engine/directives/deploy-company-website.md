---
id: deploy-company-website
task_type: deploy
project_id: company-website
version: 1
require_ack: true
auto_anneal: true
retry:
  count: 2
  backoff_ms: 5000
owner: jen
---

# Deploy Company Website - Directive

## Goal

Deploy the transformed BrandedFlow company website to Netlify with all award-winning features enabled.

## Prerequisites

1. All TypeScript build errors resolved
2. Dependencies installed with `--legacy-peer-deps` flag
3. Environment variables configured in Netlify
4. Git repository up to date

## Build Requirements

### Required .npmrc file:
**Location:** `company/website/site/.npmrc`
**Content:**
```
legacy-peer-deps=true
```

**Why:**
- @react-three/fiber and @react-three/drei don't yet support React 19
- Netlify runs `npm install` BEFORE your build command
- The .npmrc ensures ALL npm installs use --legacy-peer-deps
- Without this file, Netlify install fails with ERESOLVE errors

### Build command:
```bash
npm run build
```

**Expected output:**
- Client build: ~510 KB (gzipped ~154 KB)
- Worker build: ~194 KB
- Build time: ~2 seconds

## Environment Variables

### Required in Netlify:

```env
# Email Service (Optional - graceful degradation if missing)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=hello@brandedandflow.com
STAFF_EMAIL=jen@brandedandflow.com

# Error Tracking (Optional)
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

### Required in index.html:

Replace placeholders before deploy:
- Line 70 & 75: `G-XXXXXXXXXX` → Real GA4 measurement ID
- Line 84: `XXXXXXX` → Real Hotjar site ID

## Deployment Steps

1. **Pre-deployment checks:**
   ```bash
   cd /Users/jennifercortez-walters/brandedflow/company/website/site
   npm run build  # Must succeed
   git status     # Check for uncommitted changes
   ```

2. **Commit changes:**
   ```bash
   git add .
   git commit -m "Fix build errors and prepare for deployment

   - Replace WebGLBackground with placeholder (React 19 compatibility)
   - Fix TypeScript errors (process.env → import.meta.env)
   - Add missing type declarations
   - Fix Sentry window type
   - Add sendEmail import to worker

   Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
   git push origin main
   ```

3. **Configure Netlify:**
   - Build command: `cd company/website/site && npm install --legacy-peer-deps && npm run build`
   - Publish directory: `company/website/site/dist/client`
   - Node version: 20.x
   - Environment variables: Add all from above

4. **Deploy:**
   - Netlify auto-deploys on push to main
   - OR manual deploy via Netlify dashboard

5. **Post-deployment verification:**
   - [ ] Site loads without errors
   - [ ] Custom cursor appears (desktop only)
   - [ ] Accessibility panel opens
   - [ ] Exit intent popup triggers
   - [ ] Contact form submits (check console if email not configured)
   - [ ] No console errors
   - [ ] Lighthouse score 90+

## Known Issues & Fixes

### Issue 1: WebGL Background Disabled
**Problem:** @react-three/fiber incompatible with React 19
**Solution:** Replaced with placeholder component returning null
**Impact:** Site builds successfully, WebGL features temporarily unavailable
**Future fix:** Wait for library update OR downgrade to React 18

### Issue 2: process.env in Vite
**Problem:** process.env not available in Vite builds
**Solution:** Changed to import.meta.env throughout codebase
**Files affected:** src/worker/lib/email.ts

### Issue 3: TypeScript strict mode errors
**Problem:** Unused destructured parameters, Sentry window types
**Solution:** Added type declarations, used `as any` for window.Sentry
**Files:** src/types/window.d.ts, src/react-app/main.tsx

## Rollback Plan

If deployment fails:

1. **Check Netlify build logs** for specific error
2. **Verify build command** includes `--legacy-peer-deps`
3. **Check publish directory** is `company/website/site/dist/client`
4. **Test build locally** first with `npm run build`
5. **Rollback commit** if necessary:
   ```bash
   git revert HEAD
   git push origin main
   ```

## Success Criteria

- [ ] Build completes without errors
- [ ] Netlify deployment succeeds
- [ ] Site is accessible at production URL
- [ ] No JavaScript console errors on load
- [ ] Custom cursor works (desktop)
- [ ] Accessibility panel functional
- [ ] Exit intent popup triggers
- [ ] Forms submit successfully
- [ ] Analytics tracking active (GA4 + Hotjar)
- [ ] Lighthouse Performance: 90+
- [ ] Lighthouse Accessibility: 95+

## Edge Cases

1. **Email service not configured:**
   - Expected: Console warnings but forms still work
   - Graceful degradation: emails won't send but no errors

2. **Analytics not configured:**
   - Expected: Tracking functions called but no data sent
   - No impact on site functionality

3. **Sentry not configured:**
   - Expected: Error boundary still catches errors
   - Errors logged to console instead of Sentry

4. **Build fails on Netlify:**
   - Common cause: Missing `--legacy-peer-deps` flag
   - Fix: Update build command in Netlify settings

## Maintenance Notes

### To re-enable WebGL background:

1. Wait for @react-three/fiber React 19 support
2. Restore from backup:
   ```bash
   mv src/react-app/components/WebGLBackground.tsx.disabled \
      src/react-app/components/WebGLBackground.tsx
   ```
3. Test build: `npm run build`
4. If successful, commit and deploy

### To update dependencies:

Always use `--legacy-peer-deps` flag:
```bash
npm install <package> --legacy-peer-deps
```

### To verify email service:

Check Resend dashboard for:
- API key validity
- Domain verification status
- Email send logs

## Outputs

- Production URL: https://brandedandflow.com (or Netlify subdomain)
- Build logs: Netlify dashboard
- Deployment status: Success/Failure
- Performance metrics: Lighthouse scores
- Error logs: Sentry dashboard (if configured)
