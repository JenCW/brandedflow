# Enzo Mortgages - Netlify Deployment Guide

## Quick Deploy to Netlify

### Step 1: Push to GitHub
```bash
# Already done! Your code is in:
# Repository: brandedflow
# Branch: bootstrap/enzo-mortgages-20251221
# Folder: clients/enzo-mortgages/04_website/
```

### Step 2: Connect to Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **"Add new site" → "Import an existing project"**
3. Choose **GitHub**
4. Select repository: **brandedflow**
5. Choose branch: **bootstrap/enzo-mortgages-20251221**
   (Or merge to main first and use main)

### Step 3: Configure Build Settings

**Base directory:** `clients/enzo-mortgages/04_website`

**Build command:** `npx next build`

**Publish directory:** `.next`

**Node version:** `20`

### Step 4: Add Environment Variables

Go to **Site Settings → Environment Variables** and add:

**Required:**
- `AIRTABLE_API_KEY` = [Your Airtable API key]
- `AIRTABLE_BASE_ID` = [Your Airtable base ID]
- `AIRTABLE_TABLE_NAME` = `Leads`

**Optional (for live rates):**
- `FRED_API_KEY` = [Your FRED API key]

#### How to Get These Values:

**Airtable:**
1. Go to https://airtable.com/create/tokens
2. Create a new personal access token
3. Copy the token → This is your `AIRTABLE_API_KEY`
4. Open your Airtable base
5. Look at the URL: `https://airtable.com/appXXXXXXXXXXXXXX/...`
6. The `appXXXXXXXXXXXXXX` part is your `AIRTABLE_BASE_ID`

**FRED API (Optional):**
1. Go to https://fred.stlouisfed.org/docs/api/api_key.html
2. Request an API key
3. Use it for live mortgage rate display

### Step 5: Deploy!

Click **"Deploy site"**

Netlify will:
1. Pull your code from GitHub
2. Run `npx next build`
3. Deploy to a URL like: `https://random-name-12345.netlify.app`

### Step 6: Add Custom Domain (Optional)

1. Go to **Site Settings → Domain Management**
2. Click **"Add custom domain"**
3. Enter: `enzomortgages.com` (or your domain)
4. Follow DNS instructions to point your domain to Netlify

---

## Testing After Deployment

### Test These Pages:
- ✅ Homepage: `/`
- ✅ Apply form: `/apply`
- ✅ Calculator: `/tools/calculator`
- ✅ Contact: `/contact`
- ✅ Landing pages: `/landing/refinance`, `/landing/buying`, etc.

### Test on Mobile:
- Open site on your phone
- Check that everything displays correctly
- Test forms and navigation

### Test Airtable Integration:
1. Fill out a form on the site
2. Check your Airtable base
3. Verify the lead was captured

---

## Troubleshooting

### Build Fails
- Check build logs in Netlify dashboard
- Verify Node version is set to 20
- Check that base directory is correct

### Forms Don't Submit
- Verify environment variables are set correctly
- Check Airtable API key has proper permissions
- Look at Function logs in Netlify dashboard

### Mobile Still Broken
- Clear browser cache
- Try incognito/private mode
- Check viewport meta tag is present

---

## Current Deployment Status

- **Repository**: `https://github.com/JenCW/brandedflow` (private)
- **Branch**: `bootstrap/enzo-mortgages-20251221`
- **Website Folder**: `clients/enzo-mortgages/04_website/`
- **Ready to Deploy**: ✅ YES

---

## Next Steps After Deployment

1. Get the live URL from Netlify
2. Test everything thoroughly
3. Set up custom domain (enzomortgages.com)
4. Build n8n automations for lead nurturing
5. Connect to Base44 client portal

---

**Need Help?** Check Netlify docs: https://docs.netlify.com/integrations/frameworks/next-js/
