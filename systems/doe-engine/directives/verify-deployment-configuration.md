# DIRECTIVE: Verify Deployment Configuration & Branch Management

## 1. GOAL
Verify and fix deployment configuration (Netlify, GitHub branches) to ensure production deployments use the correct branch and contain all latest code. Clean up outdated branches that have been merged.

## 2. INPUTS
- **Location**: Client website folder (e.g., `clients/{client-name}/04_website/`)
- **Deployment Platform**: Netlify (primary), or other platforms
- **Repository**: GitHub repository (brandedflow)
- **Required**: 
  - Access to Netlify dashboard
  - Access to GitHub repository
  - Knowledge of which branch should be used for production (typically `main`)
- **Optional**: 
  - Deployment guide documentation
  - Previous branch analysis documentation

## 3. PROCESS

### Phase 1: Investigation & Analysis

1. **Check current branch structure**
   ```bash
   git branch -a                    # List all branches (local and remote)
   git log --oneline --all --graph  # Visualize branch history
   ```

2. **Identify bootstrap/temporary branches**
   - Look for branches with patterns: `bootstrap/*`, `temp/*`, `feature/*-old`
   - Check if branches have been merged into main:
     ```bash
     git log origin/main --oneline --not origin/{branch-name} -- {client-folder}
     ```

3. **Compare branches to find missing commits**
   - Check what commits are in `main` but not in bootstrap branch:
     ```bash
     git log origin/main --not origin/bootstrap/{branch-name} --oneline -- {client-folder}
     ```
   - If commits exist, bootstrap branch is outdated

4. **Check deployment documentation**
   - Read `DEPLOYMENT_GUIDE.md` in client website folder
   - Verify which branch it references
   - Check if documentation matches actual branch structure

### Phase 2: Verify Netlify Configuration

1. **Access Netlify Dashboard**
   - Go to https://app.netlify.com
   - Find the client's site

2. **Check Branch Configuration**
   - Navigate: Site settings → Build & deploy → Continuous Deployment
   - Verify "Production branch" setting
   - **Should be:** `main` (or primary branch)
   - **If it's:** `bootstrap/*` or other temporary branch → **NEEDS FIX**

3. **Verify Build Settings**
   - Base directory: Should match client website folder (e.g., `clients/{client-name}/04_website`)
   - Build command: Should match project type (e.g., `npx next build` for Next.js)
   - Publish directory: Should match build output (e.g., `.next` for Next.js)
   - Node version: Should match project requirements

4. **Check Latest Deploy**
   - Go to Deploys tab
   - Verify latest deploy is from correct branch (`main`)
   - Verify commit hash matches latest in `main` branch
   - If deploy shows old commit or wrong branch → **NEEDS FIX**

### Phase 3: Fix Configuration (If Needed)

1. **Update Netlify Branch Configuration**
   - Site settings → Build & deploy → Continuous Deployment
   - Change "Production branch" to `main`
   - Save changes
   - Netlify will automatically trigger new deploy

2. **Update Deployment Documentation**
   - Update `DEPLOYMENT_GUIDE.md` to reference `main` branch
   - Remove references to bootstrap/temporary branches
   - Add warning if bootstrap branch was previously used

3. **Create Verification Documentation**
   - Create `BRANCH_ANALYSIS.md` documenting:
     * Which branches exist
     * Which branch should be used
     * What commits are missing from outdated branches
   - Create `NETLIFY_VERIFICATION_CHECKLIST.md` with step-by-step verification steps

### Phase 4: Clean Up Branches (After Verification)

1. **Verify branches are safe to delete**
   - Confirm branch has been merged into `main`:
     ```bash
     git log origin/main --oneline | grep -i "merge.*{branch-name}"
     ```
   - Confirm all important code is in `main`
   - Confirm Netlify is now using `main` branch

2. **Delete outdated branches**
   ```bash
   # Delete remote branch
   git push origin --delete bootstrap/{branch-name}
   
   # Delete multiple branches at once
   git push origin --delete bootstrap/{branch-1} bootstrap/{branch-2}
   ```

3. **Verify deletion**
   ```bash
   git fetch --prune
   git branch -r
   # Should NOT see deleted branches
   ```

4. **Create cleanup documentation**
   - Document which branches were deleted
   - Document why they were safe to delete
   - Update any remaining references

## 4. OUTPUTS
- **Documentation Created:**
  - `BRANCH_ANALYSIS.md` - Analysis of branch structure and issues
  - `NETLIFY_VERIFICATION_CHECKLIST.md` - Step-by-step verification guide
  - `BRANCH_CLEANUP.md` - Guide for safely deleting branches
  - Updated `DEPLOYMENT_GUIDE.md` - Corrected branch references

- **Configuration Fixed:**
  - Netlify configured to deploy from `main` branch
  - Build settings verified and correct
  - Latest code deploying to production

- **Branches Cleaned:**
  - Outdated bootstrap/temporary branches deleted
  - Repository structure cleaned up
  - Only active branches remain

- **Verification:**
  - Latest deploy shows correct branch and commit
  - All features from `main` are live
  - No missing commits in production

## 5. EXECUTION SCRIPTS
- No scripts needed - this is primarily verification and configuration work
- Git commands are deterministic and can be run directly

## 6. EDGE CASES

### Bootstrap Branch Has Unmerged Commits
- **If:** Bootstrap branch has commits not in `main`
- **Action:** 
  1. Review commits: `git log origin/bootstrap/{branch} --not origin/main`
  2. Determine if commits are needed
  3. If needed: Cherry-pick or merge into `main` first
  4. If not needed: Delete branch anyway (commits are abandoned)

### Multiple Deployment Platforms
- **If:** Client uses multiple platforms (Netlify + Vercel, etc.)
- **Action:** Verify branch configuration for each platform separately
- **Document:** Which branch each platform uses

### Branch Name Mismatch
- **If:** Netlify references branch that doesn't exist
- **Action:** 
  1. Check if branch was renamed or deleted
  2. Update Netlify to use correct branch name
  3. If branch was deleted, recreate from `main` if needed

### Deployment Fails After Branch Change
- **If:** Netlify build fails after switching to `main`
- **Action:**
  1. Check build logs for errors
  2. Verify base directory is correct
  3. Verify build command is correct
  4. Check environment variables are still set
  5. Clear Netlify cache and retry

### Documentation References Wrong Branch
- **If:** Multiple docs reference different branches
- **Action:**
  1. Search codebase for branch references: `grep -r "bootstrap/" .`
  2. Update all references to `main`
  3. Add note about why `main` is correct

## 7. LEARNINGS

### Initial Discovery (2025-01-XX)
- **Issue Found:** Netlify was deploying from `bootstrap/enzo-mortgages-20251221` instead of `main`
- **Root Cause:** Bootstrap branch was created for initial setup, merged into `main`, but Netlify was never updated
- **Impact:** Production was missing 4 commits including:
  - Airtable integration fixes
  - Homepage updates (APR rates, loan process flowchart)
  - SEO and performance optimizations
- **Solution:** Updated Netlify to deploy from `main`, deleted bootstrap branches
- **Prevention:** Always verify Netlify branch configuration matches primary branch after merges

### Best Practices Discovered
1. **Always use `main` branch for production deployments**
   - Bootstrap/temporary branches should be deleted after merge
   - Prevents confusion about which branch is active

2. **Verify branch configuration immediately after merge**
   - Check Netlify settings right after merging bootstrap branch
   - Update deployment documentation at same time

3. **Document branch cleanup process**
   - Create cleanup guides before deleting branches
   - Verify branches are safe to delete (merged, no unique commits)

4. **Regular verification**
   - Periodically check Netlify branch configuration
   - Verify latest deploy matches latest commit in `main`
   - Check for orphaned branches that should be deleted

### Common Mistakes to Avoid
- **Mistake:** Leaving bootstrap branches after merge
- **Why:** Creates confusion, risk of deploying from wrong branch
- **Fix:** Delete immediately after merge is verified

- **Mistake:** Not updating deployment docs when branch changes
- **Why:** Future deployments might use wrong branch
- **Fix:** Update docs as part of merge/cleanup process

- **Mistake:** Assuming Netlify auto-updates branch after merge
- **Why:** Netlify doesn't automatically change branch configuration
- **Fix:** Manually verify and update Netlify settings

### Verification Checklist
Before considering task complete:
- [ ] Netlify is configured to deploy from `main`
- [ ] Latest deploy shows correct branch and commit
- [ ] All commits from `main` are in production
- [ ] Deployment documentation references `main`
- [ ] Outdated branches have been deleted
- [ ] No references to old branches in documentation

---
**Last Updated:** 2025-01-XX
**Status:** Active
**Created By:** AI Assistant (Auto)
**Related Directives:** `build-client-website.md` (deployment preparation)

