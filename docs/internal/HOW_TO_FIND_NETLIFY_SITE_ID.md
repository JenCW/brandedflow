# How to Find Your Netlify Site ID

## Quick Answer

**Method 1: From Site Settings (Easiest)**
1. Go to: https://app.netlify.com/
2. Click on your site
3. Go to **Site settings** → **General**
4. Scroll down to **Site details**
5. Look for **"Site ID"** - it's a long string like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

**Method 2: From Site Overview**
1. Go to: https://app.netlify.com/
2. Click on your site
3. On the **Overview** page, look at the URL
4. The Site ID is in the URL: `https://app.netlify.com/sites/[SITE_ID]/overview`

---

## Step-by-Step Guide

### Method 1: Site Settings (Recommended)

1. **Log into Netlify**
   - Go to: https://app.netlify.com/
   - Sign in with your account

2. **Select Your Site**
   - Click on the site you want to get the ID for
   - You'll see the site dashboard

3. **Go to Site Settings**
   - Click **"Site settings"** in the top navigation
   - Or click the gear icon ⚙️

4. **Find Site Details**
   - Click **"General"** in the left sidebar (should be selected by default)
   - Scroll down to the **"Site details"** section

5. **Copy the Site ID**
   - Look for **"Site ID"**
   - It's a UUID format: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`
   - Click the copy button next to it, or manually copy it

---

### Method 2: From URL

1. **Go to your site on Netlify**
   - Navigate to: https://app.netlify.com/
   - Click on your site

2. **Look at the URL**
   - The URL will look like:
     ```
     https://app.netlify.com/sites/a1b2c3d4-e5f6-7890-abcd-ef1234567890/overview
     ```
   - The part after `/sites/` and before `/overview` is your Site ID
   - In this example: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

---

### Method 3: Using Netlify API

If you have the Netlify CLI installed:
```bash
netlify sites:list
```

Or using the API directly:
```bash
curl -H "Authorization: Bearer YOUR_NETLIFY_TOKEN" https://api.netlify.com/api/v1/sites
```

---

## Visual Guide

**In Site Settings:**
```
Site settings
├── General
│   └── Site details
│       ├── Site name: Your Site Name
│       ├── Site ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890  ← Copy this!
│       └── Site URL: https://yoursite.netlify.app
```

**In URL:**
```
https://app.netlify.com/sites/[SITE_ID]/overview
                              ↑
                         This is your Site ID
```

---

## Add to Your .env File

Once you have your Site ID:

1. **Open your `.env` file:**
   ```bash
   cd systems/mcp-server
   open .env
   ```

2. **Find the Netlify section:**
   ```bash
   NETLIFY_TOKEN=your_netlify_token_here
   NETLIFY_SITE_ID=your_site_id_here
   ```

3. **Add your Site ID:**
   ```bash
   NETLIFY_TOKEN=nfp_Vdd5RkvKhjSFrQBDtQwTMXyZD6mq3Sqtdf95
   NETLIFY_SITE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
   ```

4. **Save the file**

---

## Important Notes

### Do You Actually Need It?

**You need Site ID if:**
- ✅ You're deploying to a specific site via API
- ✅ You're using Netlify API to manage site settings
- ✅ You're automating deployments to multiple sites

**You might NOT need it if:**
- ❌ You're only using Netlify CLI (`netlify deploy`)
- ❌ You're only using the Netlify dashboard manually
- ❌ You're using Netlify Forms (just need the token)

### Multiple Sites?

If you have multiple Netlify sites:
- Each site has its own Site ID
- You'll need to decide which site(s) to automate
- You can add multiple Site IDs if needed (with different variable names)

---

## Troubleshooting

### "I don't see Site ID in Site Settings"
- **Solution**: Make sure you're in **Site settings** → **General** → **Site details**
- It's usually at the bottom of the Site details section
- Try scrolling down

### "The Site ID looks different"
- **Solution**: Site IDs are UUIDs (with dashes)
- Format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- If it looks different, you might be looking at something else

### "I have multiple sites, which one do I use?"
- **Solution**: Use the Site ID for the site you want to automate
- If automating multiple sites, you might need multiple Site IDs
- Consider using different variable names: `NETLIFY_SITE_ID_1`, `NETLIFY_SITE_ID_2`, etc.

---

## Quick Reference

**Location:** Site settings → General → Site details → Site ID

**Format:** UUID (e.g., `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

**Add to .env:**
```bash
NETLIFY_SITE_ID=a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

**Last Updated:** December 9, 2024

