# MCP API Setup Guide

## How MCPs Are Set Up With API Keys

### Overview

MCPs use environment variables (stored in `.env` file) to access API keys securely. The MCP server loads these keys and makes them available to MCPs.

---

## Step 1: Create `.env` File

**Location:** `systems/mcp-server/.env`

**Create the file:**
```bash
cd systems/mcp-server
touch .env
```

**Important:** The `.env` file is in `.gitignore` - it will NEVER be committed to git.

---

## Step 2: Add API Keys to `.env`

**Basic Setup:**
```bash
# MCP Security - API keys that allow access to the server
MCP_API_KEYS=your-secret-key-1,your-secret-key-2

# Server Configuration
PORT=4000
PROJECT_ROOT=/Users/jencortez-walters/brandedflow

# External Service API Keys
# Add your actual API keys here:

# PandaDoc (for proposals)
PANDADOC_API_KEY=your_pandadoc_api_key_here
PANDADOC_WORKSPACE_ID=your_workspace_id_here

# Airtable (for CRM)
AIRTABLE_API_KEY=your_airtable_api_key_here
AIRTABLE_BASE_ID=appXXXXXXXXXX

# Netlify (for deployments)
NETLIFY_TOKEN=your_netlify_token_here
NETLIFY_SITE_ID=your_site_id_here

# Brevo (for email)
BREVO_API_KEY=your_brevo_api_key_here

# Base44 (for client portals)
BASE44_API_KEY=your_base44_api_key_here

# GitHub (for git operations)
GITHUB_TOKEN=ghp_your_token_here
```

---

## Step 3: How MCPs Access API Keys

**In your MCP code, access keys like this:**

```javascript
module.exports = {
  description: 'My MCP that uses an API',
  
  params: {
    // Your parameters here
  },

  async execute(params, { PROJECT_ROOT }) {
    // Access API keys from environment variables
    const apiKey = process.env.PANDADOC_API_KEY;
    const workspaceId = process.env.PANDADOC_WORKSPACE_ID;
    
    if (!apiKey) {
      throw new Error('PANDADOC_API_KEY not found in environment');
    }
    
    // Use the API key to make requests
    const response = await fetch('https://api.pandadoc.com/v1/documents', {
      headers: {
        'Authorization': `API-Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    return { success: true, data: await response.json() };
  }
};
```

---

## Step 4: Example MCPs That Use APIs

### PandaDoc MCP (Example)

```javascript
// automations/mcps/send-proposal-via-pandadoc.js
module.exports = {
  description: 'Sends proposal via PandaDoc API',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name'
    },
    proposal_path: {
      type: 'string',
      required: true,
      description: 'Path to proposal file'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const apiKey = process.env.PANDADOC_API_KEY;
    const workspaceId = process.env.PANDADOC_WORKSPACE_ID;
    
    if (!apiKey || !workspaceId) {
      throw new Error('PandaDoc API credentials not configured. Add PANDADOC_API_KEY and PANDADOC_WORKSPACE_ID to .env');
    }
    
    // Read proposal file
    const proposalContent = await fs.readFile(
      path.join(PROJECT_ROOT, params.proposal_path),
      'utf8'
    );
    
    // Create document in PandaDoc
    const response = await fetch('https://api.pandadoc.com/v1/documents', {
      method: 'POST',
      headers: {
        'Authorization': `API-Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: `Proposal for ${params.client_name}`,
        template_uuid: workspaceId,
        recipients: [/* recipient info */],
        // ... other fields
      })
    });
    
    const result = await response.json();
    
    return {
      success: true,
      document_id: result.id,
      message: 'Proposal sent via PandaDoc'
    };
  }
};
```

### Airtable MCP (Example)

```javascript
// automations/mcps/create-airtable-record.js
module.exports = {
  description: 'Creates a record in Airtable',
  
  params: {
    table_name: {
      type: 'string',
      required: true,
      description: 'Airtable table name'
    },
    fields: {
      type: 'object',
      required: true,
      description: 'Record fields'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    
    if (!apiKey || !baseId) {
      throw new Error('Airtable API credentials not configured. Add AIRTABLE_API_KEY and AIRTABLE_BASE_ID to .env');
    }
    
    const response = await fetch(
      `https://api.airtable.com/v0/${baseId}/${params.table_name}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: params.fields
        })
      }
    );
    
    const result = await response.json();
    
    return {
      success: true,
      record_id: result.id,
      message: 'Record created in Airtable'
    };
  }
};
```

---

## Step 5: Security Best Practices

### ✅ DO:
- Store all API keys in `.env` file
- Use different keys for different environments (dev/prod)
- Rotate keys regularly
- Use descriptive variable names (e.g., `PANDADOC_API_KEY` not `KEY1`)

### ❌ DON'T:
- Never commit `.env` to git (it's in `.gitignore`)
- Never hardcode API keys in MCP files
- Never share `.env` files
- Never use the same key for multiple services

---

## Step 6: Testing API Keys

**Test if your API keys work:**

```bash
# Test PandaDoc
curl -X GET "https://api.pandadoc.com/v1/documents" \
  -H "Authorization: API-Key YOUR_KEY_HERE"

# Test Airtable
curl -X GET "https://api.airtable.com/v0/YOUR_BASE_ID/YOUR_TABLE" \
  -H "Authorization: Bearer YOUR_KEY_HERE"
```

---

## Step 7: Using MCPs with API Keys from Cursor

**When calling an MCP that needs API keys:**

1. **Make sure `.env` is configured** with the required keys
2. **Restart the MCP server** after adding new keys:
   ```bash
   cd systems/mcp-server
   npm start
   ```
3. **Call the MCP** - it will automatically have access to the keys via `process.env`

**Example call:**
```javascript
// From Cursor or any client
const result = await callMCP('send-proposal-via-pandadoc', {
  client_name: 'luxe-fine-dining',
  proposal_path: 'clients/luxe-fine-dining/05_deliverables/proposal.md'
});
```

---

## Current Setup Status

**Your MCP server:**
- ✅ Located at: `systems/mcp-server/`
- ✅ Loads MCPs from: `automations/mcps/`
- ✅ Uses `.env` for configuration
- ✅ `.env` is in `.gitignore` (safe)

**To add API keys:**
1. Create `systems/mcp-server/.env` if it doesn't exist
2. Add your API keys (see Step 2)
3. Restart the server

---

## Quick Reference

**Environment Variable Format:**
```bash
SERVICE_NAME_API_KEY=your_key_here
```

**Access in MCP:**
```javascript
const apiKey = process.env.SERVICE_NAME_API_KEY;
```

**Check if key exists:**
```javascript
if (!process.env.SERVICE_NAME_API_KEY) {
  throw new Error('SERVICE_NAME_API_KEY not configured in .env');
}
```

---

**Last Updated:** December 8, 2024
**Status:** Setup Guide Complete ✅

