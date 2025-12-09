# Essential API Keys for Your Automation Business

## ✅ YOU NEED THESE (You Automate These Services!)

### Core Automation Services:
1. **Base44** - Client portals
2. **n8n** - Workflow automation
3. **Airtable** - CRM data
4. **Netlify** - Website deployments
5. **Brevo** - Email marketing
6. **PandaDoc** - Proposals
7. **GitHub** - Git operations

### Lead Generation & Outreach (YOU DO THIS!):
8. **Apollo** - ✅ Lead generation automation
9. **Clay** - ✅ Data enrichment automation
10. **Outlook** - ✅ Email sending automation
11. **Gmail** - ✅ Email sending automation (backup/alternative)

### Optional:
12. **Canva Pro** - Design automation (if you automate design)

---

## Complete .env Setup

Your `.env` file in `systems/mcp-server/.env` should include:

```bash
# ============================================
# CORE AUTOMATION SERVICES
# ============================================

# Base44 - Client Portals
BASE44_API_KEY=your_base44_api_key_here

# n8n - Workflow Automation
N8N_WEBHOOK_URL=your_n8n_webhook_url_here
# OR if using cloud:
# N8N_API_KEY=your_n8n_api_key_here

# Airtable - CRM
AIRTABLE_API_KEY=your_airtable_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXX

# Netlify - Website Deployments
NETLIFY_TOKEN=your_netlify_token_here
NETLIFY_SITE_ID=your_site_id_here

# Brevo - Email Marketing
BREVO_API_KEY=your_brevo_key_here

# PandaDoc - Proposals
PANDADOC_API_KEY=your_pandadoc_key_here
PANDADOC_WORKSPACE_ID=your_workspace_id_here

# GitHub - Git Operations
GITHUB_TOKEN=ghp_your_token_here

# ============================================
# LEAD GENERATION & OUTREACH (YOU AUTOMATE THESE!)
# ============================================

# Apollo - Lead Generation (YOU DO THIS!)
APOLLO_API_KEY=your_apollo_api_key_here

# Clay - Data Enrichment (YOU DO THIS!)
CLAY_API_KEY=your_clay_api_key_here

# Outlook - Email Sending (YOU SEND EMAILS!)
OUTLOOK_CLIENT_ID=your_outlook_client_id_here
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret_here
OUTLOOK_TENANT_ID=your_outlook_tenant_id_here

# Gmail - Email Sending (YOU SEND EMAILS!)
GMAIL_CLIENT_ID=your_gmail_client_id_here
GMAIL_CLIENT_SECRET=your_gmail_client_secret_here
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here

# ============================================
# OPTIONAL SERVICES
# ============================================

# Canva Pro - Design Automation (if automating)
CANVA_API_KEY=your_canva_api_key_here
CANVA_BRAND_ID=your_canva_brand_id_here

# iAnswering.ai - AI Receptionist
IANSWERING_AI_API_KEY=your_ianswering_ai_api_key_here

# Stripe - Payments (if needed)
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# Google Analytics - Analytics (if needed)
GOOGLE_ANALYTICS_API_KEY=your_google_analytics_api_key_here
```

---

## Where to Get Each API Key

### Apollo
1. Go to: https://app.apollo.io/#/settings/integrations/api
2. Click "Generate API Key"
3. Copy the key → `APOLLO_API_KEY=...`

### Clay
1. Go to: https://app.clay.com/settings/api
2. Click "Create API Key"
3. Copy the key → `CLAY_API_KEY=...`

### Outlook (OAuth Setup)
1. Go to: https://portal.azure.com/
2. Azure Active Directory → App registrations → New registration
3. Set redirect URI: `http://localhost:4000/auth/outlook/callback`
4. Copy:
   - Application (client) ID → `OUTLOOK_CLIENT_ID=...`
   - Client secret → `OUTLOOK_CLIENT_SECRET=...`
   - Directory (tenant) ID → `OUTLOOK_TENANT_ID=...`

### Gmail (OAuth Setup)
1. Go to: https://console.cloud.google.com/
2. APIs & Services → Credentials → Create Credentials → OAuth 2.0 Client ID
3. Set redirect URI: `http://localhost:4000/auth/gmail/callback`
4. Copy:
   - Client ID → `GMAIL_CLIENT_ID=...`
   - Client secret → `GMAIL_CLIENT_SECRET=...`
5. Generate refresh token (requires one-time OAuth flow)

---

## Priority Order

**Get these first (core automation):**
1. Base44
2. n8n
3. Airtable
4. Netlify
5. Brevo
6. PandaDoc
7. GitHub

**Get these next (lead gen & outreach - YOU DO THIS!):**
8. Apollo ✅
9. Clay ✅
10. Outlook ✅
11. Gmail ✅

**Get these later (if needed):**
12. Canva Pro
13. iAnswering.ai
14. Stripe
15. Google Analytics

---

## Summary

**You're an automation agency - you automate:**
- ✅ Lead generation (Apollo)
- ✅ Data enrichment (Clay)
- ✅ Email sending (Outlook/Gmail)

**These are NOT optional - they're core to your business!**

---

**Last Updated:** December 8, 2024

