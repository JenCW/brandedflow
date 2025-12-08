# How to Use MCP Server with Cursor

## Overview

The MCP Server is the **Execution** layer of the DOE method. It runs automations (MCPs) that Cursor can call via HTTP.

**Two Systems:**
1. **Automation Engine** (Python) - Daily operations, dashboard building
2. **MCP Server** (Node.js) - Execution layer for DOE method (this one)

---

## Setup (One-Time)

### 1. Install Dependencies

```bash
cd systems/mcp-server
npm install
```

### 2. Create `.env` File

The `.env` file is already created at `systems/mcp-server/.env` with:
- API keys for security
- Server port (4000)
- Project root path

### 3. Start the Server

```bash
cd systems/mcp-server
npm start
```

**Server runs on:** `http://localhost:4000`

**To run in background:**
```bash
cd systems/mcp-server
npm start &
```

---

## How Cursor Uses It

### Current Setup

**Cursor doesn't automatically call the MCP server yet.** You have two options:

### Option 1: Manual Calls (Current)

When you ask Cursor to do something, I (the AI) will:
1. Check the directive
2. See which MCP to use
3. Call the MCP server via HTTP
4. Get the result
5. Continue with the task

**Example:**
```
You: "Create client folder for dental-bunny"
Me: [Calls MCP server] → Creates folder → Reports back
```

### Option 2: Cursor Integration (Future)

To make Cursor automatically call MCPs, you'd need to:
1. Install a Cursor extension that calls HTTP APIs
2. Or configure Cursor to use the MCP server as a tool
3. Or use a custom Cursor plugin

**For now, I handle the MCP calls for you.**

---

## How It Works

### The Flow

```
You ask Cursor to do something
    ↓
I check the directive
    ↓
I see which MCP to use
    ↓
I call: POST http://localhost:4000/run
    ↓
MCP server executes the automation
    ↓
I get the result
    ↓
I continue with the task
```

### Example: Creating a Client Folder

**You say:** "Create client folder for dental-bunny"

**I do:**
1. Check directive: `build-client-website.md`
2. See it needs: `create-client-folder` MCP
3. Call MCP server:
   ```bash
   curl -X POST http://localhost:4000/run \
     -H "X-API-Key: key1" \
     -H "Content-Type: application/json" \
     -d '{
       "automation": "create-client-folder",
       "params": { "client_name": "dental-bunny" }
     }'
   ```
4. Get result: `{ "success": true, "folders_created": [...] }`
5. Report back: "Created client folder structure for dental-bunny"

---

## Available MCPs

### Current MCPs

- **create-client-folder** - Creates standard client folder structure
- **copy-website-template** - Copies AQ Remodeling template
- **extract-client-info** - Extracts info from intake files
- **create-proposal-from-template** - Creates proposal from template
- **process-client-intake** - Processes intake, creates profile
- **load-client-profile** - Loads client profile
- **create-or-update-client-profile** - Updates client profile

### Check Available MCPs

```bash
curl -X GET http://localhost:4000/automations \
  -H "X-API-Key: key1"
```

---

## Testing the Server

### Health Check

```bash
curl http://localhost:4000/health
```

**Response:**
```json
{
  "ok": true,
  "status": "running",
  "automations": ["create-client-folder", ...],
  "timestamp": "2025-12-08T21:35:02.113Z"
}
```

### Test an MCP

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-client-folder",
    "params": {
      "client_name": "test-client"
    },
    "dryRun": true
  }'
```

**`dryRun: true`** = Test without making changes

---

## Troubleshooting

### Server Not Running

```bash
# Check if server is running
curl http://localhost:4000/health

# If not running, start it:
cd systems/mcp-server
npm start
```

### MCP Not Found

- Check if MCP file exists: `automations/mcps/{mcp-name}.js`
- Check server logs for errors
- Restart server: `npm start`

### API Key Error

- Check `.env` file has `MCP_API_KEYS=key1,key2,key3`
- Use one of those keys in `X-API-Key` header

---

## Summary

**How to use with Cursor:**

1. **Start the server** (one-time setup):
   ```bash
   cd systems/mcp-server
   npm start &
   ```

2. **Ask Cursor to do something** (I handle MCP calls):
   - "Create client folder for dental-bunny"
   - "Create proposal for Luxe Fine Dining"
   - "Process intake for new-client"

3. **I automatically:**
   - Check the directive
   - Call the right MCP
   - Execute the automation
   - Report back

**You don't need to manually call MCPs - I do it for you!**

---

**The MCP server is the execution layer. I (the AI) am the orchestrator. You just ask, and I handle the rest.**

