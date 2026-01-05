# Branded + Flow Company Website - Netlify Deployment Guide

## ⚠️ Important: This is a Vite/React App

This website is built with **Vite + React**, which means it **must be built** before deployment. 

**Netlify Drop will NOT work** because it only accepts pre-built static files. You must use **Git-based deployment** (recommended) or build locally first.

---

## Quick Deploy to Netlify (Git-based - Recommended)

### Step 1: Push to GitHub

Your website code is located in: `company/website/site/`

1. **Commit and push your changes:**
   ```bash
   cd company/website/site
   git add .
   git commit -m "Deploy company website to Netlify"
   git push origin main
   ```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Choose **GitHub**
4. Select repository: **brandedflow**
5. Choose branch: **main** (or your preferred branch)

### Step 3: Configure Build Settings

**Base directory:** `company/website/site`

**Build command:** (Netlify will automatically use the command from `netlify.toml`):
```
npm install --legacy-peer-deps && npm run cf-typegen && npm run build
```

**Publish directory:** `dist/client` (as specified in netlify.toml)

**Node version:** `18` (set in netlify.toml)

⚠️ **Note:** Your `netlify.toml` file already contains these settings, so Netlify should auto-detect them. You can leave the build settings as-is or verify they match above.

### Step 4: Deploy!

Click **"Deploy site"**

Netlify will:
1. Pull your code from GitHub
2. Install dependencies (`npm install --legacy-peer-deps`)
3. Run type generation (`npm run cf-typegen`)
4. Build the site (`npm run build`)
5. Deploy the built files from `dist/client`
6. Provide a URL like: `https://random-name-12345.netlify.app`

### Step 5: Add Custom Domain (Optional)

1. Go to **Site Settings → Domain Management**
2. Click **"Add custom domain"**
3. Enter: `brandedflow.com` (or your domain)
4. Follow DNS instructions to point your domain to Netlify

---

## File Structure

```
company/website/site/
├── index.html          # Main homepage
├── assets/            # Logo and assets
│   ├── logo.png
│   ├── logo.svg
│   └── logo-vector.svg
├── public/            # Additional assets (fonts, images, logos)
├── netlify.toml       # Netlify configuration
├── robots.txt         # SEO crawler directives
└── sitemap.xml        # Site structure for search engines
```

---

## SEO & Performance Features

✅ **SEO Optimized:**
- Meta tags (title, description, keywords)
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (Schema.org JSON-LD)
- robots.txt and sitemap.xml

✅ **Performance Optimized:**
- Font preconnect for faster font loading
- Lazy loading for images
- Optimized script loading
- Security headers configured

---

## Testing After Deployment

### Test These Features:
- ✅ Homepage loads correctly
- ✅ Navigation links work (anchor links)
- ✅ Contact form displays
- ✅ Logo and images load
- ✅ Animations work (GSAP ScrollTrigger)
- ✅ Mobile responsive design

### Test on Mobile:
- Open site on your phone
- Check that everything displays correctly
- Test navigation and scrolling
- Verify animations work smoothly

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard for specific error messages
- Verify base directory is set to `company/website/site`
- Ensure all file paths are correct (relative paths)
- Verify Node.js version is set to 18
- Check that `netlify.toml` build command matches: `npm install --legacy-peer-deps && npm run cf-typegen && npm run build`
- Ensure publish directory is set to `dist/client`

### Netlify Drop Failed
**Why Drop Doesn't Work:** Netlify Drop only accepts pre-built static files. This is a Vite/React app that must be built first.

**Solutions:**
1. **Use Git-based deployment (recommended)** - Connect your GitHub repo and let Netlify build automatically
2. **Build locally first, then drop:** 
   ```bash
   cd company/website/site
   npm install --legacy-peer-deps
   npm run build
   # Then drag and drop the dist/client folder to Netlify Drop
   ```

### Images Don't Load
- Verify asset paths are relative (e.g., `assets/logo.png`)
- Check that assets folder is included in deployment

### Animations Don't Work
- Check browser console for JavaScript errors
- Verify GSAP CDN links are accessible
- Ensure ScrollTrigger plugin loads correctly

### Mobile Issues
- Clear browser cache
- Try incognito/private mode
- Check viewport meta tag is present

---

## Current Deployment Status

- **Repository**: `https://github.com/JenCW/brandedflow` (or your repo)
- **Branch**: `main`
- **Website Folder**: `company/website/site/`
- **Ready to Deploy**: ✅ YES

---

## Next Steps After Deployment

1. Get the live URL from Netlify
2. Test everything thoroughly
3. Set up custom domain (brandedflow.com)
4. Submit sitemap to Google Search Console
5. Monitor performance with Netlify Analytics

---

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   cd company/website/site
   netlify deploy --prod
   ```

---

**Need Help?** Check Netlify docs: https://docs.netlify.com/









