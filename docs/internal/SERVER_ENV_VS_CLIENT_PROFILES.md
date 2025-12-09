# Server .env vs Client Profiles

## The Distinction

### Server `.env` File (`systems/mcp-server/.env`)
**Purpose:** Server-level API keys and tokens (shared across ALL clients)

**Contains:**
- API keys that work for all clients
- OAuth credentials for your services
- Tokens that authenticate the server

**Examples:**
- `BASE44_API_KEY` - Your Base44 account key (works for all clients)
- `AIRTABLE_API_KEY` - Your Airtable account key (works for all clients)
- `NETLIFY_TOKEN` - Your Netlify account token (works for all clients)
- `OUTLOOK_CLIENT_ID` - Your Outlook OAuth credentials
- `GITHUB_TOKEN` - Your GitHub token
- `PANDADOC_API_KEY` - Your PandaDoc account key
- `N8N_API_KEY` - Your n8n account key
- `APOLLO_API_KEY` - Your Apollo account key
- `CLAY_API_KEY` - Your Clay account key

**These are YOUR account credentials that the server uses.**

---

### Client Profile (`clients/{client-name}/client-profile.json`)
**Purpose:** Client-specific values and configurations (unique to each client)

**Contains:**
- Client-specific IDs and URLs
- Client's own database IDs
- Client's own webhook URLs
- Client's own site IDs
- Client variations (design, tech stack, etc.)

**Examples:**
- `airtable_base_id` - Client's specific Airtable base
- `netlify_site_id` - Client's specific Netlify site
- `n8n_webhook_url` - Client's specific n8n webhook
- `pandadoc_workspace_id` - Client's specific PandaDoc workspace
- `design_style` - Client's design preferences
- `tech_stack` - Client's tech choices
- `existing_tools` - Client's existing tools

**These are CLIENT-SPECIFIC values that vary per client.**

---

## Complete Example

### Server `.env` File:
```bash
# Server-level API keys (shared)
BASE44_API_KEY=your_base44_key
AIRTABLE_API_KEY=your_airtable_key
NETLIFY_TOKEN=your_netlify_token
N8N_API_KEY=your_n8n_key
OUTLOOK_CLIENT_ID=your_outlook_client_id
OUTLOOK_CLIENT_SECRET=your_outlook_secret
OUTLOOK_TENANT_ID=your_tenant_id
OUTLOOK_REFRESH_TOKEN=your_refresh_token
# ... etc
```

### Client Profile (`clients/dental-bunny/client-profile.json`):
```json
{
  "client_name": "dental-bunny",
  "business_name": "Dental Bunny",
  
  "variations": {
    "design_style": "modern-bright-editorial",
    "tech_stack": {
      "website": "wix",
      "email": "gmail",
      "crm": "airtable"
    }
  },
  
  "client_specific_ids": {
    "airtable_base_id": "appABC123def456",  // Client's Airtable base
    "netlify_site_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",  // Client's Netlify site
    "n8n_webhook_url": "https://n8n.example.com/webhook/dental-bunny",  // Client's webhook
    "pandadoc_workspace_id": "workspace_xyz789",  // Client's PandaDoc workspace
    "base44_portal_id": "portal_abc123"  // Client's Base44 portal
  },
  
  "automations": {
    "website": { "status": "completed" },
    "lead_magnet": { "status": "active" }
  }
}
```

---

## How It Works

### When Building a Client Website:

1. **Server uses `.env` for authentication:**
   - Uses `NETLIFY_TOKEN` from `.env` to authenticate with Netlify API

2. **Server uses client profile for client-specific values:**
   - Reads `netlify_site_id` from `client-profile.json`
   - Deploys to that specific site

3. **Result:**
   - Server authenticates with YOUR token (from `.env`)
   - Deploys to CLIENT's site (from client profile)

---

## What Goes Where?

### ✅ Server `.env` (Shared):
- API keys (Base44, Airtable, Netlify, n8n, etc.)
- OAuth credentials (Outlook, Gmail)
- Tokens (GitHub, PandaDoc)
- **These authenticate the SERVER**

### ✅ Client Profile (Per Client):
- Airtable Base ID (which base to use)
- Netlify Site ID (which site to deploy to)
- n8n Webhook URL (which webhook to trigger)
- PandaDoc Workspace ID (which workspace to use)
- Base44 Portal ID (which portal to update)
- Design style, tech stack, variations
- **These specify CLIENT-SPECIFIC resources**

---

## Summary

**Server `.env`:**
- "Here's how to authenticate as Branded + Flow"
- Shared across all clients
- Your account credentials

**Client Profile:**
- "Here's what THIS client uses"
- Unique per client
- Client-specific IDs and configurations

**You're absolutely right - each client needs their own profile with their own IDs!**

---

**Last Updated:** December 9, 2024

