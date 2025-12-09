# Which Services Need API Keys?

## Quick Answer

**Services that NEED API keys (for automation):**
- ✅ Base44 - Client portals
- ✅ n8n - Workflow automation
- ✅ Apollo - Lead generation
- ✅ Clay - Data enrichment
- ✅ Outlook - Email automation
- ✅ Gmail - Email automation
- ✅ Canva Pro - Design automation (if you automate design)

**Services that DON'T need API keys (used manually):**
- ❌ Gamma - Used manually (no API)
- ❌ NotebookLM - Used manually (no public API)
- ❌ ChatGPT - Used directly (not automated)
- ❌ Claude Code - Used directly (not automated)

---

## Detailed Breakdown

### ✅ NEED API KEYS (For Automation)

#### Base44
**Why:** Client portal automation
**What you need:**
- API key from Base44 dashboard
**Add to .env:**
```bash
BASE44_API_KEY=your_base44_api_key_here
```

#### n8n
**Why:** Trigger workflows, create workflows via API
**What you need:**
- If self-hosted: Webhook URL
- If cloud: API key
**Add to .env:**
```bash
# Option 1: Self-hosted (webhook)
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id

# Option 2: Cloud (API key)
N8N_API_KEY=your_n8n_api_key_here
```

#### Apollo
**Why:** ✅ Lead generation automation (CORE TO YOUR BUSINESS)
**What you need:**
- API key from Apollo.io
**Add to .env:**
```bash
APOLLO_API_KEY=your_apollo_api_key_here
```
**Priority:** HIGH - You automate lead gen for clients

#### Clay
**Why:** ✅ Data enrichment automation (CORE TO YOUR BUSINESS)
**What you need:**
- API key from Clay
**Add to .env:**
```bash
CLAY_API_KEY=your_clay_api_key_here
```
**Priority:** HIGH - You automate data enrichment for clients

#### Outlook
**Why:** ✅ Email automation - YOU SEND EMAILS TO CLIENTS/LEADS (CORE TO YOUR BUSINESS)
**What you need:**
- OAuth setup (Client ID, Client Secret, Tenant ID)
**Add to .env:**
```bash
OUTLOOK_CLIENT_ID=your_outlook_client_id_here
OUTLOOK_CLIENT_SECRET=your_outlook_client_secret_here
OUTLOOK_TENANT_ID=your_outlook_tenant_id_here
```
**Note:** Requires OAuth app setup in Azure Portal
**Priority:** HIGH - You send emails to people!

#### Gmail
**Why:** ✅ Email automation - YOU SEND EMAILS TO CLIENTS/LEADS (CORE TO YOUR BUSINESS)
**What you need:**
- OAuth setup (Client ID, Client Secret, Refresh Token)
**Add to .env:**
```bash
GMAIL_CLIENT_ID=your_gmail_client_id_here
GMAIL_CLIENT_SECRET=your_gmail_client_secret_here
GMAIL_REFRESH_TOKEN=your_gmail_refresh_token_here
```
**Note:** Requires OAuth app setup in Google Cloud Console
**Priority:** HIGH - You send emails to people!

#### Canva Pro
**Why:** Design automation (if you automate design creation)
**What you need:**
- API key from Canva
- Brand ID from your brand kit
**Add to .env:**
```bash
CANVA_API_KEY=your_canva_api_key_here
CANVA_BRAND_ID=your_canva_brand_id_here
```
**Note:** Only needed if you automate design creation via MCPs

---

### ❌ DON'T NEED API KEYS (Used Manually)

#### Gamma
**Why:** Used manually for presentations
**No API:** Gamma doesn't have a public API
**Action:** Use it directly in the browser, no automation needed

#### NotebookLM
**Why:** Used manually for fact-checking
**No API:** NotebookLM doesn't have a public API
**Action:** Use it directly in the browser, no automation needed

#### ChatGPT
**Why:** Used directly for research
**No API needed:** You use it in the browser/chat interface
**Note:** If you wanted to automate ChatGPT calls, you'd need OpenAI API key, but you're not doing that

#### Claude Code
**Why:** Used directly for coding
**No API needed:** You use it in Cursor/VSCode
**Note:** If you wanted to automate Claude calls, you'd need Anthropic API key, but you're not doing that

---

## What You Actually Need

### Must Have (For Your Automation Business):
1. **Base44** - Client portals
2. **n8n** - Workflow automation
3. **Airtable** - CRM data
4. **Netlify** - Website deployments
5. **Brevo** - Email marketing
6. **PandaDoc** - Proposals
7. **GitHub** - Git operations
8. **Apollo** - ✅ Lead generation (you automate this!)
9. **Clay** - ✅ Data enrichment (you automate this!)
10. **Outlook/Gmail** - ✅ Email sending (you send emails!)

### Essential (For Your Business):
8. **Apollo** - ✅ YES - Lead generation automation (core to your business)
9. **Clay** - ✅ YES - Data enrichment automation (core to your business)
10. **Outlook/Gmail** - ✅ YES - Email automation (you send emails to clients/leads)
11. **Canva Pro** - If you automate design creation

### Don't Need:
- ❌ Gamma (no API)
- ❌ NotebookLM (no API)
- ❌ ChatGPT (used directly)
- ❌ Claude Code (used directly)

---

## Updated .env Template

**Essential services (must have):**
```bash
# Base44
BASE44_API_KEY=your_key

# n8n
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/xxx
# OR
N8N_API_KEY=your_key

# Airtable
AIRTABLE_API_KEY=your_key
AIRTABLE_BASE_ID=appXXX

# Netlify
NETLIFY_TOKEN=your_token
NETLIFY_SITE_ID=your_site_id

# Brevo
BREVO_API_KEY=your_key

# PandaDoc
PANDADOC_API_KEY=your_key
PANDADOC_WORKSPACE_ID=your_workspace_id

# GitHub
GITHUB_TOKEN=ghp_your_token
```

**Essential services (you automate these!):**
```bash
# Apollo - Lead generation (YOU DO THIS!)
APOLLO_API_KEY=your_key

# Clay - Data enrichment (YOU DO THIS!)
CLAY_API_KEY=your_key

# Outlook - Email sending (YOU SEND EMAILS!)
OUTLOOK_CLIENT_ID=your_id
OUTLOOK_CLIENT_SECRET=your_secret
OUTLOOK_TENANT_ID=your_tenant_id

# Gmail - Email sending (YOU SEND EMAILS!)
GMAIL_CLIENT_ID=your_id
GMAIL_CLIENT_SECRET=your_secret
GMAIL_REFRESH_TOKEN=your_token
```

**Optional services:**
```bash
# Canva Pro (if automating design)
CANVA_API_KEY=your_key
CANVA_BRAND_ID=your_brand_id
```

---

## Summary

**Need API keys (YOU AUTOMATE THESE!):**
- Base44 ✅
- n8n ✅
- Apollo ✅ **YES - YOU AUTOMATE LEAD GEN!**
- Clay ✅ **YES - YOU AUTOMATE DATA ENRICHMENT!**
- Outlook ✅ **YES - YOU SEND EMAILS!**
- Gmail ✅ **YES - YOU SEND EMAILS!**
- Canva Pro ✅ (if automating design)

**Don't need API keys:**
- Gamma ❌ (no API)
- NotebookLM ❌ (no API)
- ChatGPT ❌ (used directly)
- Claude Code ❌ (used directly)

**Focus on the services you're actually automating!**

---

**Last Updated:** December 8, 2024

