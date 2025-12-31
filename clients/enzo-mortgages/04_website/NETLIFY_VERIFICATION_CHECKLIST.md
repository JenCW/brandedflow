# Netlify Configuration Verification Checklist

## ⚠️ Critical: Update Netlify Branch Configuration

### Step 1: Check Current Netlify Configuration

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Log in to your account
   - Find your Enzo Mortgages site

2. **Check Branch Settings**
   - Click on your site
   - Go to **Site settings** → **Build & deploy**
   - Scroll to **"Continuous Deployment"** section
   - Look for **"Production branch"** or **"Branch to deploy"**

3. **Verify Current Branch**
   - **If it shows:** `bootstrap/enzo-mortgages-20251221` ❌ **WRONG - NEEDS UPDATE**
   - **If it shows:** `main` ✅ **CORRECT**

### Step 2: Update Branch Configuration (If Needed)

**If the branch is set to `bootstrap/enzo-mortgages-20251221`:**

1. In **Site settings** → **Build & deploy** → **Continuous Deployment**
2. Click **"Edit settings"** or **"Change branch"**
3. Change **"Production branch"** from `bootstrap/enzo-mortgages-20251221` to `main`
4. Click **"Save"** or **"Update"**
5. Netlify will automatically trigger a new deploy from `main` branch

### Step 3: Verify Latest Deploy

1. Go to **Deploys** tab in Netlify dashboard
2. Check the latest deploy:
   - **Commit hash** should match latest from `main` branch (e.g., `3c0f215`)
   - **Branch** should show `main`
   - **Status** should be "Published" (green)

3. **If you see an old commit** (like `88c54dc`), the branch configuration hasn't been updated yet

### Step 4: Verify Build Settings

Ensure these settings are correct:

- **Base directory:** `clients/enzo-mortgages/04_website`
- **Build command:** `npx next build`
- **Publish directory:** `.next` (or leave blank - Next.js plugin handles it)
- **Node version:** `20`

### Step 5: Test Live Site

After the new deploy completes, verify:

- ✅ Homepage loads correctly
- ✅ Loan process flowchart is visible
- ✅ APR rates are showing (if configured)
- ✅ Forms submit to Airtable
- ✅ Video modal works
- ✅ Mobile responsive design works

## Current Git Status

- **Correct branch:** `main`
- **Latest commit:** `3c0f215` (Deploy company website to Netlify - SEO and performance optimized)
- **Outdated branch:** `bootstrap/enzo-mortgages-20251221` (last commit: `88c54dc`)

## Commits Missing from Bootstrap Branch

These commits are in `main` but NOT in the bootstrap branch:

1. `01de180` - corrected the airtable integration
2. `515a229` - Deploy company website to Netlify - SEO and performance optimized
3. `3aed851` - Add homepage updates: fix video, add APR to rates, create interactive loan process flowchart
4. `3c0f215` - Deploy company website to Netlify - SEO and performance optimized

## Troubleshooting

### If Deploy Fails After Branch Change

1. Check build logs in Netlify dashboard
2. Verify base directory is correct: `clients/enzo-mortgages/04_website`
3. Check environment variables are still set
4. Verify Node version is 20

### If Changes Don't Appear on Live Site

1. Clear Netlify cache: **Site settings** → **Build & deploy** → **Clear cache and retry deploy**
2. Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
3. Check if deploy completed successfully
4. Verify you're looking at the correct site URL

## Next Steps After Verification

Once Netlify is configured to deploy from `main`:

1. ✅ Monitor next few deploys to ensure they're working
2. ✅ Delete bootstrap branches (see `BRANCH_CLEANUP.md`)
3. ✅ Update any other documentation that references bootstrap branch

