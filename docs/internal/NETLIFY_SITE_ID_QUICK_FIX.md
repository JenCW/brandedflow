# Netlify Site ID - Quick Fix

## You're on the Wrong Page!

You're seeing:
- Projects
- Builds
- Extensions
- Members
- etc.

**This is the team/organization view, not a specific site.**

---

## How to Get to Your Site

### Step 1: Click on "Projects"
1. Click **"Projects"** in the left sidebar
2. You'll see a list of all your sites/projects
3. Click on the **specific site** you want the ID for

### Step 2: Once You're on a Site
After clicking on a site, you should see:
- **Deploys**
- **Site settings** ← This is what you need!
- **Functions**
- **Plugins**
- etc.

### Step 3: Get the Site ID
1. Click **"Site settings"** (or the gear icon ⚙️)
2. The Site ID will be in the URL or in Site details

---

## Alternative: Get It from the URL

**When you're on a specific site:**
1. Look at the URL in your browser
2. It will look like:
   ```
   https://app.netlify.com/sites/your-site-name/overview
   ```
   OR
   ```
   https://app.netlify.com/sites/a1b2c3d4-e5f6-7890-abcd-ef1234567890/overview
   ```

3. **If the URL has a UUID** (like `a1b2c3d4-e5f6-7890-abcd-ef1234567890`), that's your Site ID!

4. **If the URL has a site name** (like `your-site-name`), you need to:
   - Go to Site settings
   - Find the Site ID there

---

## Visual Guide

**Current View (Team Level):**
```
Netlify Dashboard
├── Projects ← Click here!
├── Builds
├── Extensions
└── ...
```

**After Clicking Projects:**
```
Projects List
└── [Your Site Name] ← Click on your site!
```

**After Clicking Your Site:**
```
Site Dashboard
├── Deploys
├── Site settings ← Click here!
├── Functions
└── ...
```

**In Site Settings:**
```
Site settings
├── General
│   └── Site details
│       └── Site ID: a1b2c3d4-e5f6-7890-abcd-ef1234567890
```

---

## Quick Steps

1. **Click "Projects"** (left sidebar)
2. **Click on your site** (from the list)
3. **Click "Site settings"** (or gear icon)
4. **Look for Site ID** (in URL or Site details)

---

**Last Updated:** December 9, 2024

