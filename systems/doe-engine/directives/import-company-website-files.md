# DIRECTIVE: Import/Update Company Website Files from External Sources

## 1. GOAL
Import website files from external sources (getmocha.com, exports, ZIP files) and integrate them into the Branded+Flow company website, ensuring proper build configuration and deployment setup.

## 2. INPUTS

### Required Inputs
- **Source**: ZIP file or extracted files from external source (getmocha.com, etc.)
- **Location**: `company/website/site/` (target directory)
- **ZIP Location**: Usually in Downloads folder or user-specified location

### File Types Expected
- React/TypeScript/Vite applications (common from getmocha.com)
- Static HTML/CSS/JS (less common, but possible)
- Package.json indicates build system type

## 3. PROCESS

### Phase 1: Orchestration (Check Directive First)
1. **MANDATORY: Check for existing directive FIRST**
   - Always check for directives before starting (DOE method)
   - Read `build-company-website.md` or `build-branded-flow-website.md` if they exist
   - If directive exists but doesn't cover import process, update it or create this directive
   - Even if user provides a plan, check directives first and update plan if needed

2. **Identify source files**
   - Locate ZIP file (typically in Downloads)
   - Understand what type of application it is (React/Vite, static HTML, etc.)
   - Check if it's a build output or source code

3. **Determine approach**
   - If React/TypeScript/Vite: Follow React app import process
   - If static HTML/CSS/JS: Follow static file import process
   - Check package.json to determine build system

### Phase 2: Extract and Review
1. **Extract ZIP to temporary location**
   - Create temp directory: `company/website/site/_temp_extract/`
   - Extract ZIP file to temp location
   - Review file structure and identify file types

2. **Identify application type**
   - Check for `package.json`, `vite.config.ts`, `tsconfig.json`
   - Check for `src/` directory (React/TypeScript)
   - Check for HTML files in root (static or Vite)
   - Determine build system requirements

### Phase 3: File Replacement
1. **Backup consideration** (if needed)
   - User may request backup of existing files
   - If not requested, proceed with replacement

2. **Remove old files**
   - Remove old HTML, CSS, JS files from `company/website/site/`
   - Preserve: `.cursorrules`, `DEPLOYMENT_GUIDE.md`, `netlify.toml`, `robots.txt`, `sitemap.xml`
   - Preserve: `public/` and `assets/` directories (unless replacing them)
   - Remove old directories (except preserved ones)

3. **Copy new files**
   - Copy all files from temp extraction to `company/website/site/`
   - Maintain folder structure from source
   - Ensure all necessary files are copied

### Phase 4: Configuration Updates
1. **Update netlify.toml**
   - For React/Vite apps:
     - `publish = "dist/client"` (Vite outputs client build to dist/client/)
     - `command = "npm install --legacy-peer-deps && npm run cf-typegen && npm run build"`
   - For static HTML:
     - `publish = "dist"` or `"."` depending on build output
     - `command = "npm install && npm run build"` (if build needed) or leave empty
   - Preserve headers and redirects configurations

2. **Handle build requirements**
   - For React/Vite with Cloudflare Workers:
     - Run `npm run cf-typegen` to generate worker-configuration.d.ts
     - This is required before build
   - For dependency conflicts:
     - Use `--legacy-peer-deps` flag if peer dependency errors occur
     - Common with Vite 7.x and some plugins

3. **Verify build configuration**
   - Check vite.config.ts (if exists) to understand build output
   - Ensure netlify.toml matches actual build output location

### Phase 5: Build and Test
1. **Install dependencies**
   - Run `npm install --legacy-peer-deps` (if dependency conflicts)
   - Or `npm install` (if no conflicts)
   - Verify all packages install successfully

2. **Generate types** (if needed)
   - Run `npm run cf-typegen` for Cloudflare Worker apps
   - Verify worker-configuration.d.ts is created

3. **Test build**
   - Run `npm run build`
   - Verify build succeeds
   - Check output directory matches netlify.toml publish setting
   - Verify all assets are included

4. **Verify file structure**
   - Check that build outputs to expected location
   - For React/Vite: Usually `dist/client/`
   - For static: Usually `dist/` or root

### Phase 6: Cleanup
1. **Remove temporary files**
   - Delete `_temp_extract/` directory
   - Optionally remove ZIP file from Downloads (ask user first)

2. **Final verification**
   - All files in place
   - Build works correctly
   - Netlify config is correct
   - Ready for deployment

## 4. OUTPUTS
- Updated website files in `company/website/site/`
- Properly configured `netlify.toml` for build system
- Working build (verified with `npm run build`)
- Dependencies installed and types generated (if needed)
- Clean directory (temp files removed)

## 5. EXECUTION SCRIPTS
- No specific MCPs yet - this is a manual process
- Future: Could create `import-website-files.js` MCP for automation

## 6. SELF-ANNEALING LOGGING
- After completing import/update process, log self-annealing action using `log-self-annealing` MCP
- Logs are stored in `systems/trackers/self_annealing_logs/` for reference

## 6. EDGE CASES

### Application Type Variations
- **React/Vite with Cloudflare Workers** (getmocha.com exports):
  - Requires `npm run cf-typegen` before build
  - Build outputs to `dist/client/` and `dist/{worker-id}/`
  - Use `--legacy-peer-deps` for dependency conflicts
  - Netlify publishes from `dist/client/`

- **React/Vite standard**:
  - Build outputs to `dist/`
  - Netlify publishes from `dist/`

- **Static HTML/CSS/JS**:
  - May not need build step
  - Netlify publishes from root or `dist/`

### Dependency Issues
- **Peer dependency conflicts**:
  - Use `npm install --legacy-peer-deps`
  - Common with Vite 7.x and @vitejs/plugin-react 4.x

### Missing Type Files
- **worker-configuration.d.ts missing**:
  - Run `npm run cf-typegen` to generate
  - Required for TypeScript builds with Cloudflare Workers

### Build Output Location
- **Verify build output location**:
  - Check actual output after running `npm run build`
  - Update netlify.toml publish setting to match
  - React/Vite apps often output to `dist/client/`, not just `dist/`

### Preserved Files
- **Always preserve**:
  - `.cursorrules`
  - `DEPLOYMENT_GUIDE.md`
  - `netlify.toml` (but update build settings)
  - `robots.txt`
  - `sitemap.xml`
  - `public/` directory (unless explicitly replacing)
  - `assets/` directory (unless explicitly replacing)

## 7. LEARNINGS

### Critical Process Learnings
- **ALWAYS check for directives FIRST** before following a user-provided plan
- **Even when user provides a plan**, check directives and update plan if directive exists
- This is part of the DOE (Directive → Orchestrate → Execute) method
- Following DOE method prevents missing important process steps

### Technical Learnings
- **getmocha.com exports React/TypeScript/Vite apps**, not static HTML
- **Cloudflare Worker apps** require `cf-typegen` step before build
- **Vite 7.x** often has peer dependency conflicts with older plugins
- **Build outputs vary**: React/Vite with Workers outputs to `dist/client/`, not `dist/`
- **Always verify build output location** before configuring Netlify
- **Dependency installation** may require `--legacy-peer-deps` flag

### Process Improvements
- Should check `build-company-website.md` directive first
- Could update that directive to include import/update process
- Future: Create MCP for automated import process

### Common Mistakes to Avoid
- Not checking directives first
- Assuming build output location (always verify)
- Forgetting `cf-typegen` step for Cloudflare Worker apps
- Not using `--legacy-peer-deps` when dependency conflicts occur
- Not preserving important config files (.cursorrules, etc.)

---
**Last Updated:** January 4, 2026
**Status:** Active
**Created By:** AI Assistant (Self-Annealing)
**Related Directives:** `build-company-website.md`, `build-branded-flow-website.md`
