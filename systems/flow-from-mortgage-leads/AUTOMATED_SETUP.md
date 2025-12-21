# Automated Mortgage Lead Flow Setup

**One command to set up everything. True DOE method.**

---

## Prerequisites

### 1. Install n8n

```bash
npm install -g n8n
```

### 2. Get n8n API Key

```bash
# Start n8n
n8n start

# Open: http://localhost:5678
# Go to: Settings → API → Generate API Key
# Copy the key
```

### 3. Get Airtable Base ID

1. Open your Airtable base
2. Look at the URL: `https://airtable.com/appXXXXXXXXXX/...`
3. Copy the `appXXXXXXXXXX` part

### 4. Configure Environment

Edit `systems/mcp-server/.env`:

```bash
# n8n Configuration
N8N_URL=http://localhost:5678
N8N_API_KEY=your-n8n-api-key-here

# MCP Server
MCP_API_KEYS=your-secret-key

# Email Notifications
NOTIFICATION_EMAIL=recipient@example.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

**For Gmail App Password:**
- Go to: https://myaccount.google.com/apppasswords
- Generate a new app password
- Use that password (not your regular Gmail password)

---

## Run Setup (One Command)

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./setup-mortgage-flow.sh
```

**That's it!** The script will:
1. ✅ Check MCP server is running (start it if needed)
2. ✅ Check n8n is running
3. ✅ Create the workflow in n8n via API
4. ✅ Give you next steps

---

## What Gets Created

### In n8n:
- **Workflow:** "Mortgage Lead Processor"
- **Nodes:**
  1. Airtable Trigger (watches for new records)
  2. HTTP Request (calls MCP server)
  3. IF condition (checks success)
  4. Success/Error logging

### In MCP Server:
- **Automation:** `process-mortgage-lead` (already exists)
- **Setup Automation:** `setup-mortgage-lead-workflow` (creates n8n workflow)

---

## Manual Steps After Setup

The automated setup creates the workflow, but you need to:

1. **Open n8n:** http://localhost:5678
2. **Find workflow:** "Mortgage Lead Processor"
3. **Add Airtable credentials:**
   - Click the "Airtable Trigger" node
   - Add your Airtable Personal Access Token
   - Select your base and table
4. **Activate workflow:** Toggle switch in top-right corner

---

## Test the Flow

### Quick Test (Direct to MCP):

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./test-mortgage-lead.sh
```

### Full End-to-End Test:

1. Fill out your Airtable form
2. Check n8n execution log (should show success)
3. Check email inbox (should receive notification)

---

## Troubleshooting

### Setup script fails at "Checking MCP Server"
```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
npm install
npm start
```

### Setup script fails at "Checking n8n"
```bash
# Start n8n in a separate terminal
n8n start
```

### Setup script fails at "Creating workflow"
- Check N8N_API_KEY is correct in `.env`
- Check MCP_API_KEYS is set in `.env`
- Verify Airtable Base ID is correct (starts with `app`)

### Workflow created but not working
- Open n8n and check the workflow
- Make sure Airtable credentials are added
- Make sure workflow is activated (green toggle)

---

## The DOE Way

This setup follows the DOE (Directive-Orchestrate-Execute) method:

### ❌ Old Way (Manual):
1. Open n8n
2. Click around creating nodes
3. Configure each node manually
4. Hope you didn't miss something
5. Hard to replicate

### ✅ DOE Way (Automated):
1. Run one script
2. Everything is created via API
3. Deterministic and repeatable
4. Version controlled
5. Easy to replicate across environments

**No clicking. No guessing. Just code.** 🎯

---

## Architecture

```
┌─────────────────────────┐
│   setup-mortgage-flow   │  ← One command
│         .sh             │
└────────┬────────────────┘
         │
         ├─→ Check MCP Server
         ├─→ Check n8n
         ├─→ Call MCP automation: setup-mortgage-lead-workflow
         │   │
         │   └─→ n8n API: Create workflow
         │
         └─→ Done!
```

**Result:** Full flow set up in under 10 seconds.
