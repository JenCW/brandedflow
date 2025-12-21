# Mortgage Lead Processing Flow

**Simple, clean flow using MCP server + n8n + Airtable**

**Setup method: AUTOMATED (one command)**

---

## The Flow

```
Airtable Form → Airtable → n8n → MCP Server → Email Notification
```

---

## Quick Start (Automated Setup)

### 1. Prerequisites

```bash
# Install n8n (if not already installed)
npm install -g n8n

# Start n8n
n8n start
# Get API key from: Settings → API → Generate API Key
```

### 2. Configure `.env`

Edit `systems/mcp-server/.env`:

```bash
N8N_URL=http://localhost:5678
N8N_API_KEY=your-n8n-api-key
MCP_API_KEYS=your-mcp-key
NOTIFICATION_EMAIL=recipient@example.com
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
```

### 3. Run Automated Setup

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
./setup-mortgage-flow.sh
```

**Done!** The script automatically:
- ✅ Checks/starts MCP server
- ✅ Verifies n8n is running
- ✅ Creates the workflow via API
- ✅ Configures all nodes

### 4. Final Steps

1. Open n8n: http://localhost:5678
2. Find "Mortgage Lead Processor" workflow
3. Add Airtable credentials to trigger node
4. Activate workflow

### 5. Test

Fill out the Airtable form → Check email

---

## Files

- **MCP Automation:** `systems/mcp-server/automations/process-mortgage-lead.js`
- **Setup Guide:** `systems/mcp-server/MORTGAGE_LEAD_SETUP.md` (detailed instructions)
- **n8n Workflow:** `systems/mcp-server/n8n-mortgage-lead-workflow.json` (importable)

---

## Configuration

All configuration in `systems/mcp-server/.env`:

```bash
# Email notification recipient
NOTIFICATION_EMAIL=his-email@example.com

# SMTP settings (Gmail)
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Troubleshooting

**MCP Server not starting?**
- Check `.env` file exists
- Run `npm install` in `systems/mcp-server/`

**Email not sending?**
- Verify SMTP credentials
- For Gmail: use App Password (not regular password)
- Generate at: https://myaccount.google.com/apppasswords

**n8n not triggering?**
- Verify MCP server is running: `curl http://localhost:4000/health`
- Check n8n workflow is activated
- Verify Airtable connection in n8n

---

## Architecture

This follows the **DOE (Directive-Orchestrate-Execute) method**:

- **Directive:** This README and setup guide
- **Orchestrate:** n8n workflow (triggers and routes)
- **Execute:** MCP server automation (deterministic, reliable)

Clean separation of concerns. Zero "vibe coding". 100% deterministic.
