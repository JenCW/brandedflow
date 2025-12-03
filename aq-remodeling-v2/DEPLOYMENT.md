# Deployment Guide: Netlify → 10Web/Elementor

## Step 1: Deploy to Netlify (5 minutes)

1. **Go to:** https://app.netlify.com/drop
2. **Drag the entire `aq-remodeling-v2` folder**
3. **Wait for deployment** (usually 1-2 minutes)
4. **Copy the Netlify URL** (e.g., `https://random-name-123.netlify.app`)

## Step 2: Convert with 10Web AI Builder (15-20 minutes)

1. **Log into 10Web**
2. **Create new WordPress site**
3. **Install Elementor + Elementor Pro**
4. **Open 10Web AI Builder**
5. **Paste Netlify URL**
6. **Select "Full Site Recreation"**
7. **Settings:**
   - Preserve Structure: ON
   - Keep Colors: ON
   - Maintain Layout: ON
8. **Click "Recreate"**
9. **Wait 15-20 minutes** (don't interrupt!)

## Step 3: Apply CSS Override (2 minutes)

1. **Go to:** Elementor → Settings → Custom CSS
2. **Copy CSS from:** `css/elementor-override.css`
3. **Paste into Custom CSS**
4. **Click "Save"**

## Step 4: Verify & Fix (10 minutes)

1. **Check each page:**
   - Colors match ✅
   - Typography matches ✅
   - Spacing matches ✅
   - Buttons work ✅

2. **If something's wrong:**
   - Check `FIXES.md` for common issues
   - Or tell me what's broken, I'll fix it

## Step 5: Client Handoff

✅ Site is live on WordPress
✅ Client can edit in Elementor
✅ You're done!

---

## Time Estimate
- **Total:** ~35-40 minutes
- **Your manual work:** ~15 minutes (mostly verification)

