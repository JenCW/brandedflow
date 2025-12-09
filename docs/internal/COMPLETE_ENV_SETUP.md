# Complete .env Setup - All Tech Stack Services

## What I Just Updated

Updated `.env` file to include **ALL** services from your tech stack, not just 4!

---

## Services Now Included

### ✅ Proposals & Documents
- **PandaDoc** - Proposals and signatures

### ✅ CRM & Data
- **Airtable** - CRM and data management
- **Base44** - Client portals

### ✅ Automation & Workflows
- **n8n** - Workflow automation (self-hosted or cloud)
- **Apollo** - Lead generation and prospecting
- **Clay** - Data enrichment and lead qualification

### ✅ Website & Hosting
- **Netlify** - Website deployments

### ✅ Email & Communication
- **Brevo** - Email marketing
- **Gmail** - Email integration (OAuth)
- **Outlook** - Email integration (OAuth)

### ✅ Design & Creative
- **Canva Pro** - Design work
- **Gamma** - Presentations

### ✅ Phone & AI Receptionist
- **iAnswering.ai** - AI receptionist

### ✅ Payments & Business
- **Stripe** - Payment processing

### ✅ Development & Version Control
- **GitHub** - Git operations

### ✅ Analytics & Tracking
- **Google Analytics 4** - Website analytics

---

## How to Set Up Each Service

### n8n
**If self-hosted:**
- Get webhook URL from your n8n instance
- Set `N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-webhook-id`

**If using n8n cloud:**
- Get API key from n8n cloud dashboard
- Set `N8N_API_KEY=your_n8n_api_key_here`

### Apollo
1. Log into Apollo.io
2. Settings → API
3. Generate API key
4. Add to `.env`: `APOLLO_API_KEY=your_key`

### Clay
1. Log into Clay
2. Settings → API
3. Generate API key
4. Add to `.env`: `CLAY_API_KEY=your_key`

### Canva Pro
1. Log into Canva
2. Account → API
3. Create API key
4. Get Brand ID from your brand kit
5. Add to `.env`:
   ```
   CANVA_API_KEY=your_key
   CANVA_BRAND_ID=your_brand_id
   ```

### Gmail (OAuth Setup)
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Get Client ID and Client Secret
4. Generate Refresh Token (requires OAuth flow)
5. Add to `.env`:
   ```
   GMAIL_CLIENT_ID=your_client_id
   GMAIL_CLIENT_SECRET=your_client_secret
   GMAIL_REFRESH_TOKEN=your_refresh_token
   ```

### Outlook (OAuth Setup)
1. Go to Azure Portal
2. Register an app
3. Get Client ID, Client Secret, and Tenant ID
4. Generate Refresh Token (requires OAuth flow)
5. Add to `.env`:
   ```
   OUTLOOK_CLIENT_ID=your_client_id
   OUTLOOK_CLIENT_SECRET=your_client_secret
   OUTLOOK_TENANT_ID=your_tenant_id
   ```

### iAnswering.ai
1. Log into iAnswering.ai
2. Settings → API
3. Get API Key and Account ID
4. Add to `.env`:
   ```
   IANSWERING_API_KEY=your_key
   IANSWERING_ACCOUNT_ID=your_account_id
   ```

### Stripe
1. Log into Stripe Dashboard
2. Developers → API keys
3. Get Secret Key and Publishable Key
4. Add to `.env`:
   ```
   STRIPE_SECRET_KEY=sk_live_your_key
   STRIPE_PUBLISHABLE_KEY=pk_live_your_key
   ```

### Google Analytics 4
1. Go to GA4 Admin
2. Data Streams → Your stream
3. Get Measurement ID (G-XXXXXXXXXX)
4. Create API Secret
5. Add to `.env`:
   ```
   GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   GA4_API_SECRET=your_secret
   ```

---

## OAuth Services (Gmail, Outlook)

**These require OAuth setup:**
- More complex than API keys
- Need to create OAuth apps
- Need to handle token refresh
- May need additional MCP code to handle OAuth flow

**For now:**
- Leave commented out if you don't need them yet
- Can be added later when you build MCPs that use them

---

## Quick Reference

**Simple API Keys (just add key):**
- PandaDoc
- Airtable
- Base44
- Apollo
- Clay
- Netlify
- Brevo
- Canva Pro
- Gamma
- iAnswering.ai
- Stripe
- GitHub

**OAuth (need full setup):**
- Gmail
- Outlook

**Webhook-based:**
- n8n (if self-hosted)

---

## Next Steps

1. **Edit `.env` file:**
   ```bash
   cd systems/mcp-server
   open .env
   ```

2. **For each service you use:**
   - Remove the `#` at the start of the line
   - Replace `your_xxx_api_key_here` with your actual key

3. **Restart server:**
   ```bash
   npm start
   ```

---

**Last Updated:** December 8, 2024
**Status:** Complete Tech Stack Added ✅

