# Mortgage Lead Flow - Quick Start

**One command setup. Zero manual clicking.**

---

## TL;DR

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./setup-mortgage-flow.sh
```

Then add Airtable credentials in n8n and activate.

---

## Step-by-Step

### 1. Prerequisites (One Time)

```bash
# Install n8n
npm install -g n8n

# Start n8n (separate terminal)
n8n start

# Get API key: http://localhost:5678 → Settings → API
```

### 2. Configure (One Time)

Create/edit `systems/mcp-server/.env`:

```bash
N8N_URL=http://localhost:5678
N8N_API_KEY=your-key-from-step-1
MCP_API_KEYS=any-secret-key-you-want
NOTIFICATION_EMAIL=your-email@example.com
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-gmail-app-password
```

**Gmail App Password:** https://myaccount.google.com/apppasswords

### 3. Run Setup

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./setup-mortgage-flow.sh
```

### 4. Finish in n8n (2 minutes)

1. Open: http://localhost:5678
2. Find: "Mortgage Lead Processor"
3. Click: Airtable Trigger node
4. Add: Your Airtable credentials
5. Toggle: Activate workflow (top-right)

### 5. Test

```bash
# Test MCP directly
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./test-mortgage-lead.sh

# Or test end-to-end
# Fill out your Airtable form → Check email
```

---

## What It Does

### Automatically Creates:
- ✅ n8n workflow (via API)
- ✅ All nodes configured
- ✅ MCP server connection
- ✅ Email notification setup

### You Just Add:
- Airtable credentials (in n8n UI)
- Activate the workflow

---

## Files

| File | Purpose |
|------|---------|
| `setup-mortgage-flow.sh` | Main setup script |
| `test-mortgage-lead.sh` | Test MCP directly |
| `automations/process-mortgage-lead.js` | Sends email notification |
| `automations/setup-mortgage-lead-workflow.js` | Creates n8n workflow via API |

---

## Architecture

```
Your Airtable Form
        ↓
   Airtable Base
        ↓
   n8n (watches for new records)
        ↓
   MCP Server (process-mortgage-lead)
        ↓
   Email → You
```

**All created programmatically. Zero manual node clicking.**

---

## Troubleshooting

### "MCP Server not running"
```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
npm start
```

### "n8n not running"
```bash
# In a separate terminal
n8n start
```

### "n8n API error"
- Check `N8N_API_KEY` in `.env` is correct
- Regenerate at: http://localhost:5678 → Settings → API

### "Email not sending"
- Check `SMTP_USER` and `SMTP_PASS` in `.env`
- For Gmail: Use App Password, not regular password
- Generate at: https://myaccount.google.com/apppasswords

---

## The DOE Difference

### ❌ Traditional Way:
1. Open n8n
2. Manually create nodes
3. Configure each one
4. Hope you didn't miss anything
5. Can't replicate easily

### ✅ DOE Way:
1. Run one script
2. Everything is created via API
3. Deterministic and repeatable
4. Version controlled
5. Works every time

**No vibe coding. Just results.** 🎯
