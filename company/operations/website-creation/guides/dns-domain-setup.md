# DNS & Domain Setup Guide

## Adding Custom Domain to Netlify

### Step 1: Add the Main Domain
1. Go to Netlify Dashboard → Your site
2. Click **"Domain settings"** in left sidebar
3. Click **"Add custom domain"**
4. Type your domain (e.g., `example.com`)
5. Click **"Verify"** or **"Add domain"**

### Step 2: Add the www Version
Netlify will likely show you a prompt like:
- "We also recommend adding www.example.com. Add it?"

**Click "Add"** or **"Yes"**

If it doesn't prompt automatically:
1. Click **"Add custom domain"** again
2. Type: `www.example.com`
3. Click **"Verify"** or **"Add domain"**

### Step 3: Get DNS Records from Netlify
Netlify will show you **DNS records** you need. Write these down or keep this screen open:

**You'll see something like:**
```
A Record:
Name: @ (or blank/root)
Value: 75.2.60.5

CNAME Record:
Name: www
Value: your-site-xyz123.netlify.app
```

**Important:** Netlify may give you multiple A records or ALIAS records. Get ALL of them.

---

## Updating DNS Records

### Step 1: Access Domain Settings
**If domain is managed at registrar (GoDaddy, Namecheap, etc.):**
1. Log into your domain registrar account
2. Go to **DNS Management** or **Domain Settings**

**If domain is managed in hosting platform:**
1. Log into hosting account
2. Go to **Domains** → **DNS Settings**

### Step 2: Update DNS Records

**What to do:**

1. **Find the current A record** pointing to old host
2. **Replace it** with Netlify's A record IP
3. **Add/update CNAME record:**
   - Name: `www`
   - Value: Your Netlify site URL (e.g., `your-site-xyz123.netlify.app`)

**Example of what you're changing:**

**Before (pointing to old host):**
```
Type: A
Name: @
Value: 185.230.63.107  ← Old host IP

Type: CNAME
Name: www
Value: www.oldhost.com  ← Old host
```

**After (pointing to Netlify):**
```
Type: A
Name: @ (or blank)
Value: 75.2.60.5  ← Netlify's IP

Type: CNAME
Name: www
Value: your-site-xyz123.netlify.app  ← Your Netlify site
```

**Save the changes!**

---

## Wait for DNS Propagation

DNS changes take time to spread across the internet:
- **Usually:** 5 minutes to 2 hours
- **Sometimes:** Up to 48 hours (rare)

**While waiting:**
- You can check if it's working: https://dnschecker.org
- Type your domain and select "A Record"
- Check different global locations - when they all show Netlify's IP, you're good!

---

## Verify in Netlify

1. Go back to Netlify → Your Site → Domain Settings
2. Netlify will automatically detect when DNS is pointing correctly
3. You should see: ✅ **"DNS configured correctly"** or **"Domain active"**
4. Netlify will automatically set up SSL certificate (free HTTPS)

---

## Troubleshooting DNS Issues

### Site Not Loading After DNS Change
- Wait up to 2 hours for DNS propagation
- Clear your browser cache
- Try incognito/private browsing window
- Check dnschecker.org to verify DNS has propagated

### Netlify Says DNS Not Configured
- Double-check A record IP matches Netlify's exactly
- Make sure CNAME for www is correct
- Wait a bit longer - Netlify checks periodically

### Getting SSL Certificate Errors
- Netlify sets up SSL automatically, but can take a few minutes after DNS is configured
- Wait 10-15 minutes after DNS is configured

### Still Seeing Old Site
- Clear browser cache
- Try different browser or incognito mode
- Check dnschecker.org to verify DNS has propagated globally

### Clear DNS Cache (Mac)
```bash
sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder
```

### Clear DNS Cache (Windows)
```bash
ipconfig /flushdns
```

---

## Important Notes

1. **Don't delete old site immediately** - Keep it for a few days in case you need to revert
2. **Email will still work** - If email is set up at your domain registrar (separate from hosting), it won't be affected
3. **If email is through old host** - You may need to keep some DNS records for email, or migrate email separately
4. **Backup the Netlify deploy** - Netlify keeps deployment history automatically

---

## Final Checklist

- [ ] Site deployed to Netlify
- [ ] Custom domain added in Netlify (both `example.com` and `www.example.com`)
- [ ] DNS A record updated (points to Netlify IP)
- [ ] DNS CNAME record updated (www points to Netlify site)
- [ ] DNS propagation complete (checked with dnschecker.org)
- [ ] Site loads at `example.com` ✅
- [ ] Site loads at `www.example.com` ✅
- [ ] HTTPS/SSL is active (check for padlock in browser)

---

**Questions?** The key is patience with DNS propagation - it's not instant!

