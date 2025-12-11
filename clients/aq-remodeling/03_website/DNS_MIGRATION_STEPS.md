# Point aqremodelinginc.com from Wix to Netlify

**Goal:** Keep Wix account active, but point domain to Netlify site

**Domain:** aqremodelinginc.com

---

## STEP 1: Deploy Site to Netlify (Do This First)

### Option A: Via Netlify Web Dashboard (Easiest)

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Deploy manually"**
3. **Drag and drop** the entire `03_website` folder onto Netlify
4. Wait for deploy to complete
5. You'll get a URL like: `https://aq-remodeling-abc123.netlify.app`

### Option B: Via Netlify CLI (If you prefer terminal)

Run these commands one at a time:

```bash
cd /Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website
netlify init
# Choose: "Create & configure a new project"
# Choose your team: "branded+flow"
# Site name: "aq-remodeling" (or accept default)
# Publish directory: "./" (just hit enter)

netlify deploy --prod
```

---

## STEP 2: Add Custom Domain in Netlify

1. In Netlify dashboard, click on your new site
2. Go to **"Domain settings"** (left sidebar)
3. Click **"Add custom domain"**
4. Type: `aqremodelinginc.com`
5. Click **"Verify"** or **"Add domain"**
6. Netlify will also suggest adding `www.aqremodelinginc.com` - click **"Add"** for that too

**Important:** Netlify will show you DNS records. Keep this tab open! You'll see something like:

```
DNS Configuration Required:

A Record:
Name: @ (or leave blank)
Value: 75.2.60.5

CNAME Record:
Name: www
Value: aq-remodeling-abc123.netlify.app
```

**Write down or screenshot these DNS values!**

---

## STEP 3: Update DNS in Wix

### Where is DNS managed?

**First, figure out where your domain DNS is managed:**

1. Log into your Wix account
2. Go to **Settings** → **Domains**
3. Find `aqremodelinginc.com`
4. Look for **"DNS"** or **"DNS Management"** section

**Two scenarios:**

### Scenario A: Wix Manages DNS Directly

If you see DNS records inside Wix:

1. Click **"DNS Settings"** or **"Manage DNS"**
2. You'll see current records pointing to Wix
3. Find the **A Record** for `@` or blank/root
4. **Edit it:**
   - Change the IP address to Netlify's A record IP (from Step 2)
   - Example: Change `185.230.63.107` (Wix IP) → `75.2.60.5` (Netlify IP)
5. Find or create **CNAME Record** for `www`
   - Name: `www`
   - Value: Your Netlify site URL (e.g., `aq-remodeling-abc123.netlify.app`)
6. **Save changes**

### Scenario B: Domain Registered Elsewhere (GoDaddy, Namecheap, etc.)

If Wix shows "DNS managed at [registrar name]":

1. Log into your domain registrar account (where you bought the domain)
2. Go to **DNS Management** or **Domain Settings** → **DNS**
3. Update the same records there:
   - A Record: Change to Netlify's IP
   - CNAME Record: Change www to Netlify site URL

---

## STEP 4: Wait for DNS Propagation

**This takes time! Usually 5 minutes to 2 hours.**

1. DNS changes need to spread across the internet
2. While waiting, check progress at: https://dnschecker.org
   - Enter: `aqremodelinginc.com`
   - Select: **A Record**
   - Check multiple locations - when they all show Netlify's IP, you're done!

---

## STEP 5: Verify in Netlify

1. Go back to Netlify → Your Site → Domain Settings
2. Netlify will automatically detect when DNS is pointing correctly
3. You'll see: ✅ **"DNS configured correctly"** or **"Domain active"**
4. Netlify will automatically issue an SSL certificate (free HTTPS)
5. SSL can take 5-15 minutes after DNS is configured

---

## STEP 6: Test Your Site

1. Visit `aqremodelinginc.com` (may need to clear browser cache)
2. Visit `www.aqremodelinginc.com`
3. Check for padlock icon (HTTPS is working)
4. Test all pages work correctly

---

## What Happens to Wix?

✅ **Wix account stays active** - They can still log in  
✅ **Wix subscription continues** - No cancellation needed  
✅ **Domain just points to Netlify instead** - That's all we changed  

If they ever want to switch back, just reverse the DNS records!

---

## Troubleshooting

**"Site still shows Wix after 2 hours"**
- Clear browser cache (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Try incognito/private window
- Check dnschecker.org to verify DNS has actually propagated

**"Netlify says DNS not configured"**
- Double-check A record IP matches exactly (no spaces, correct IP)
- Make sure CNAME for www is correct
- Wait a bit longer - Netlify checks periodically

**"SSL/HTTPS not working"**
- Netlify issues SSL automatically but it can take 10-15 minutes after DNS is set
- Wait a bit, then try again

---

**Need help?** Show me the DNS records Netlify gave you and I can help you update them!

