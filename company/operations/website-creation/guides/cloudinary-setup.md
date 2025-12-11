# Cloudinary Setup Guide

## Why Cloudinary?

- ✅ **Free**: 25GB storage, 25GB bandwidth/month
- ✅ **Fast**: Global CDN, 10x faster than hosting yourself
- ✅ **Auto-optimization**: Compresses videos automatically
- ✅ **SEO**: Fast loading = better rankings
- ✅ **Professional**: Industry standard

---

## Setup Steps

### Step 1: Create Account (2 minutes)
1. Go to: https://cloudinary.com/users/register/free
2. Sign up (free account)
3. Verify email
4. Done

### Step 2: Get Credentials (1 minute)
1. Log into Cloudinary dashboard
2. Click "Settings" (gear icon)
3. Copy these three values:
   - **Cloud Name**: `your-cloud-name`
   - **API Key**: `123456789012345`
   - **API Secret**: `abcdefghijklmnopqrstuvwxyz`

### Step 3: Save Credentials

Create file: `clients/[client-name]/cloudinary-config.json`

```json
{
  "cloudName": "your-cloud-name",
  "apiKey": "123456789012345",
  "apiSecret": "abcdefghijklmnopqrstuvwxyz"
}
```

**⚠️ Important**: Add to `.gitignore`:
```
clients/*/cloudinary-config.json
```

**Method 1: Using Editor (Easiest)**
1. Create new file: `clients/[client-name]/cloudinary-config.json`
2. Paste the JSON structure above
3. Replace placeholders with your actual credentials
4. Save

**Method 2: Using Terminal**
```bash
cd /path/to/client/folder

cat > cloudinary-config.json << 'EOF'
{
  "cloudName": "YOUR_CLOUD_NAME_HERE",
  "apiKey": "YOUR_API_KEY_HERE",
  "apiSecret": "YOUR_API_SECRET_HERE"
}
EOF
```

Then edit the file and replace the placeholders.

---

## Get Your Cloudinary Credentials

1. Go to: https://cloudinary.com/console
2. Log in (or sign up if you haven't)
3. Click **Settings** (gear icon)
4. Scroll to **Product Environment Credentials**
5. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Important Notes

- ⚠️ **This file is in .gitignore** - it won't be committed to git (keeps your API keys private)
- ✅ **File location**: `clients/[client-name]/cloudinary-config.json`
- ✅ **Format**: Must be valid JSON (use double quotes, no trailing commas)

---

## After Setup

Once configured, you can:
- Upload videos/images via Cloudinary API
- Get CDN URLs for embedding
- Automatically optimize media files
- Use Cloudinary's transformation features

---

## Troubleshooting

**"Invalid cloud_name"**
- Double-check the cloud name is exactly as shown in dashboard (case-sensitive)
- Make sure there are no extra spaces

**"File too large"**
- Free tier limit: 100MB per file
- Compress videos first (see `video-compression.md`)

**"Cannot find module cloudinary-config.json"**
- Make sure file is in the correct location
- Check file name spelling (must be exact)
- Ensure file has valid JSON format

