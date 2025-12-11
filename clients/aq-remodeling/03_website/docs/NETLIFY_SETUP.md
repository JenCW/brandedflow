# Netlify Setup Guide - AQ Remodeling Website

Complete guide for setting up all integrations in Netlify.

---

## 🔧 Environment Variables

Set these in **Netlify Dashboard → Site Settings → Environment Variables**:

### Required:
- **`GOOGLE_ANALYTICS_ID`** - Your Google Analytics 4 Measurement ID (format: `G-XXXXXXXXXX`)
  - Get it from: [Google Analytics](https://analytics.google.com) → Admin → Data Streams → Your stream → Measurement ID

### Optional:
- **`AIRTABLE_WEBHOOK_URL`** - Airtable webhook URL for form submissions
  - Get it from: Airtable → Automations → Create webhook → Copy URL
- **`BASE44_API_KEY`** - Base44 API key for client portal integration
  - Get it from: Base44 Dashboard → Settings → API Keys
- **`BASE44_PORTAL_ID`** - Your Base44 portal ID for AQ Remodeling
  - Get it from: Base44 Dashboard → Your Portal → Settings → Portal ID

---

## 📊 Google Analytics Setup

1. **Create Google Analytics Account:**
   - Go to [Google Analytics](https://analytics.google.com)
   - Create a new GA4 property for `aqremodelinginc.com`
   - Get your Measurement ID (starts with `G-`)

2. **Add to Netlify:**
   - Netlify Dashboard → Site Settings → Environment Variables
   - Add: `GOOGLE_ANALYTICS_ID` = `G-XXXXXXXXXX` (your actual ID)

3. **Verify:**
   - After deployment, check Google Analytics Real-Time reports
   - Visit your site and verify you see your visit

---

## 📋 Airtable Integration Setup

### Step 1: Create Airtable Base

Create a table with these fields:
- **Name** (Single line text)
- **Email** (Email)
- **Phone** (Phone number)
- **Project Type** (Single select)
- **Budget** (Single select)
- **Timeline** (Single select)
- **Message** (Long text)
- **Submitted** (Date)
- **Source** (Single line text)

### Step 2: Create Webhook Automation

1. In Airtable, go to **Automations**
2. Click **Create a new automation**
3. Choose **When webhook is received**
4. Copy the webhook URL
5. Add to Netlify environment variables as `AIRTABLE_WEBHOOK_URL`

### Step 3: Configure Automation Action

In the automation, add action:
- **Create record** in your table
- Map webhook data to fields:
  - `fields.Name` → Name
  - `fields.Email` → Email
  - `fields.Phone` → Phone
  - `fields.Project Type` → Project Type
  - `fields.Budget` → Budget
  - `fields.Timeline` → Timeline
  - `fields.Message` → Message
  - `fields.Submitted` → Submitted
  - `fields.Source` → Source

---

## 🏢 Base44 Client Portal Integration

### Step 1: Get Base44 API Key

1. Log into [Base44 Dashboard](https://base44.com)
2. Go to **Settings** → **API Keys**
3. Create a new API key (or copy existing one)
4. Add to Netlify as `BASE44_API_KEY`

### Step 2: Get Portal ID

1. In Base44, go to your AQ Remodeling portal
2. Go to **Settings** → **Portal Details**
3. Copy the Portal ID
4. Add to Netlify as `BASE44_PORTAL_ID` (or use default: `aq-remodeling`)

### Step 3: Configure Netlify Forms Webhook

1. Netlify Dashboard → Site Settings → Forms
2. Find your contact form (named "contact")
3. Scroll to **Form notifications** → **Webhooks**
4. Add webhook URL: `/.netlify/functions/submit-to-base44`
5. Method: POST
6. Save

**Note:** The function will automatically receive form submissions from Netlify Forms and forward them to Base44.

### Step 4: Verify Base44 API Endpoint

The function uses a default Base44 API endpoint. **You may need to update this** based on Base44's actual API documentation:

1. Check Base44 API docs for the correct endpoint
2. If different, add `BASE44_API_URL` environment variable in Netlify
3. Or update `netlify/functions/submit-to-base44.js` with the correct endpoint

### Step 4: Verify Integration

- Submit a test form on your website
- Check Base44 portal → Form Submissions section
- Verify new lead appears in portal

**What Gets Synced:**
- Form submissions automatically appear in Base44 portal
- Client can view all leads in their portal
- You can track leads, follow up, and manage pipeline

---

## 🎨 Netlify CMS Setup

### Step 1: Enable Git Gateway

1. Netlify Dashboard → Site Settings → Identity
2. Click **Enable Identity**
3. Scroll to **Services** → **Git Gateway**
4. Click **Enable Git Gateway**
5. Authorize with GitHub

### Step 2: Access CMS

1. Visit: `https://aqremodelinginc.com/admin`
2. Click **Sign up** (first time only)
3. Check your email for confirmation
4. Log in and start editing!

### Step 3: Configure Content Types

The CMS is pre-configured for:
- **Pages** - Edit existing pages
- **Testimonials** - Add/edit client testimonials
- **Portfolio** - Add/edit portfolio projects
- **FAQs** - Add/edit frequently asked questions

---

## 🚀 Build Settings

**Base Directory:** `clients/aq-remodeling/03_website`  
**Build Command:** `node build.js`  
**Publish Directory:** `.`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Google Analytics tracking works (check Real-Time reports)
- [ ] Netlify Forms receives submissions (check Forms tab)
- [ ] Airtable receives form data (check your Airtable base)
- [ ] Base44 portal receives form submissions (check portal)
- [ ] Netlify CMS is accessible at `/admin`
- [ ] Can log into CMS and edit content
- [ ] Changes commit to GitHub automatically
- [ ] Site rebuilds after CMS edits

---

## 📝 Notes

- **Google Analytics:** Tracks page views, user behavior, conversions
- **Netlify Forms:** Stores form submissions in Netlify dashboard (free tier: 100 submissions/month)
- **Airtable:** Custom database for lead management, CRM, reporting
- **Base44 Portal:** Client portal where leads appear automatically - client can view and manage
- **Netlify CMS:** Content management for non-technical users

---

**Last Updated:** January 2025

