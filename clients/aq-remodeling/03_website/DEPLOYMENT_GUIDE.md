# AQ Remodeling Website - Deployment & Domain Migration Guide

**Domain:** aqremodeling.com  
**Current Host:** Wix  
**New Host:** Netlify

---

## Part 1: Deploy Site to Netlify

### Step 1: Authenticate with Netlify CLI

Run this command in your terminal:

```bash
cd /Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website
netlify login
```

This will open your browser. Log in with your Netlify account (or sign up if you don't have one).

### Step 2: Initialize & Deploy

Once logged in, run:

```bash
netlify init
```

**You'll be asked:**
- "Create & configure a new site?" → **Yes**
- "Team" → Select your team (or personal account)
- "Site name" → You can use `aq-remodeling` or let it auto-generate
- "Publish directory" → Type `./` (current directory)

Then deploy:

```bash
netlify deploy --prod
```

**You'll get a URL like:** `https://aq-remodeling-xyz123.netlify.app`

✅ **Site is now live on Netlify!** (but still with Netlify's temporary URL)

---

## Part 2: Point Domain from Wix to Netlify

### Understanding What We're Doing

When someone types `aqremodeling.com` in their browser:
1. Their browser asks DNS: "Where is aqremodeling.com?"
2. DNS looks at your domain's nameservers (or DNS records)
3. DNS tells the browser: "Go to this IP address/servers"
4. Browser connects to that server

We're changing where DNS points: **from Wix → to Netlify**

---

### Step 3: Get DNS Records from Netlify

In Netlify dashboard:

1. Go to your site (the one we just deployed)
2. Click **"Domain settings"** in the left sidebar
3. Click **"Add custom domain"**
4. Enter: `aqremodeling.com`
5. Also add: `www.aqremodeling.com` (Netlify will suggest this)

Netlify will show you **DNS records** you need. Write these down or keep this screen open:

**You'll see something like:**
```
A Record:
Name: @ (or blank/root)
Value: 75.2.60.5

CNAME Record:
Name: www
Value: aq-remodeling-xyz123.netlify.app
```

**Important:** Netlify may give you multiple A records or ALIAS records. Get ALL of them.

---

### Step 4: Access Wix Domain Settings

**Option A: If domain is managed directly in Wix**

1. Log into Wix account
2. Go to **Settings** → **Domains**
3. Click on `aqremodeling.com`
4. Look for **"Advanced DNS Settings"** or **"DNS Management"**
5. You'll see current DNS records pointing to Wix

**Option B: If domain is managed at domain registrar (GoDaddy, Namecheap, etc.)**

1. Wix may show you who manages the domain
2. Log into your domain registrar account
3. Go to **DNS Management** or **Domain Settings**

---

### Step 5: Update DNS Records in Wix/Registrar

**What to do:**

1. **Find the current A record** pointing to Wix (might be something like `185.230.63.107` or similar)
2. **Replace it** with Netlify's A record IP (e.g., `75.2.60.5`)
3. **Add/update CNAME record:**
   - Name: `www`
   - Value: Your Netlify site URL (e.g., `aq-remodeling-xyz123.netlify.app`)

**Example of what you're changing:**

**Before (pointing to Wix):**
```
Type: A
Name: @
Value: 185.230.63.107  ← Wix's IP

Type: CNAME
Name: www
Value: www.wixsite.com  ← Wix
```

**After (pointing to Netlify):**
```
Type: A
Name: @ (or blank)
Value: 75.2.60.5  ← Netlify's IP

Type: CNAME
Name: www
Value: aq-remodeling-xyz123.netlify.app  ← Your Netlify site
```

**Save the changes!**

---

### Step 6: Wait for DNS Propagation

DNS changes take time to spread across the internet:
- **Usually:** 5 minutes to 2 hours
- **Sometimes:** Up to 48 hours (rare)

**While waiting:**
- You can check if it's working: https://dnschecker.org
- Type `aqremodeling.com` and select "A Record"
- Check different global locations - when they all show Netlify's IP, you're good!

---

### Step 7: Verify in Netlify

1. Go back to Netlify → Your Site → Domain Settings
2. Netlify will automatically detect when DNS is pointing correctly
3. You should see: ✅ **"DNS configured correctly"** or **"Domain active"**
4. Netlify will automatically set up SSL certificate (free HTTPS)

---

## Part 8: Final Checklist

- [ ] Site deployed to Netlify
- [ ] Custom domain added in Netlify (`aqremodeling.com` and `www.aqremodeling.com`)
- [ ] DNS A record updated (points to Netlify IP)
- [ ] DNS CNAME record updated (www points to Netlify site)
- [ ] DNS propagation complete (checked with dnschecker.org)
- [ ] Site loads at `aqremodeling.com` ✅
- [ ] Site loads at `www.aqremodeling.com` ✅
- [ ] HTTPS/SSL is active (check for padlock in browser)

---

## Troubleshooting

**"Site not loading after DNS change"**
- Wait up to 2 hours for DNS propagation
- Clear your browser cache
- Try incognito/private browsing window

**"Netlify says DNS not configured"**
- Double-check A record IP matches Netlify's exactly
- Make sure CNAME for www is correct
- Wait a bit longer - Netlify checks periodically

**"Getting SSL certificate errors"**
- Netlify sets up SSL automatically, but can take a few minutes after DNS is configured
- Wait 10-15 minutes after DNS is configured

**"Still seeing Wix site"**
- Clear browser cache
- Try different browser or incognito mode
- Check dnschecker.org to verify DNS has propagated

---

## Important Notes

1. **Don't delete old Wix site immediately** - Keep it for a few days in case you need to revert
2. **Email will still work** - If email is set up at your domain registrar (separate from Wix), it won't be affected
3. **If email is through Wix** - You may need to keep some Wix DNS records for email, or migrate email separately
4. **Backup the Netlify deploy** - Netlify keeps deployment history automatically

---

## Next Steps After Launch

1. Test all pages on the live site
2. Submit new sitemap to Google Search Console (if you have it)
3. Update any hardcoded URLs if needed
4. Monitor site for first 24-48 hours

---

**Questions?** The key is patience with DNS propagation - it's not instant!

