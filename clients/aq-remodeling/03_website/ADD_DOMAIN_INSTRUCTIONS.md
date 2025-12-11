# How to Add Domains in Netlify

## Step 1: Add the Main Domain

1. Go to Netlify Dashboard → Your site (aq-remodeling-oc)
2. Click **"Domain settings"** in left sidebar
3. Click **"Add custom domain"**
4. Type: `aqremodelinginc.com`
5. Click **"Verify"** or **"Add domain"**

## Step 2: Add the www Version

Netlify will likely show you a prompt like:
- "We also recommend adding www.aqremodelinginc.com. Add it?"

**Click "Add"** or **"Yes"**

If it doesn't prompt automatically:
1. Click **"Add custom domain"** again
2. Type: `www.aqremodelinginc.com`
3. Click **"Verify"** or **"Add domain"**

## What Netlify Does Automatically

Netlify will automatically:
- Set up redirect from www → non-www (or vice versa)
- Show you DNS records for BOTH domains
- Issue SSL certificates for both

## After Adding Both Domains

You'll see DNS configuration like:

```
For aqremodelinginc.com:
A Record:
Name: @ (or blank)
Value: 75.2.60.5

For www.aqremodelinginc.com:
CNAME Record:
Name: www
Value: aq-remodeling-oc.netlify.app
```

**Both domains will point to the same site automatically!**

---

**TL;DR:** Add `aqremodelinginc.com` first, then add `www.aqremodelinginc.com` as a separate custom domain (not an alias field - just add it the same way).

