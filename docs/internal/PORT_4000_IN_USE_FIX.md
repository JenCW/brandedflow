# Fix: Port 4000 Already in Use

## Quick Fix

**Kill the process using port 4000:**
```bash
lsof -ti:4000 | xargs kill -9
```

Then run the script again:
```bash
cd systems/mcp-server
node get-outlook-refresh-token.js
```

---

## What's Using Port 4000?

Usually one of these:
- ✅ Your MCP server (`npm start` in `systems/mcp-server/`)
- ✅ Another instance of the refresh token script
- ✅ Another Node.js app

---

## Solutions

### Option 1: Kill the Process (Quickest)
```bash
lsof -ti:4000 | xargs kill -9
```

### Option 2: Find and Stop Manually
1. Find what's using port 4000:
   ```bash
   lsof -i:4000
   ```
2. Note the PID (process ID)
3. Kill it:
   ```bash
   kill -9 <PID>
   ```

### Option 3: Stop Your MCP Server
If your MCP server is running:
1. Go to the terminal where it's running
2. Press `Ctrl+C` to stop it
3. Then run the refresh token script

### Option 4: Use a Different Port
If you can't free port 4000, you can modify the script to use a different port (like 4001), but you'll also need to update the redirect URI in Azure Portal.

---

## After Fixing

Run the script again:
```bash
cd systems/mcp-server
node get-outlook-refresh-token.js
```

---

**Last Updated:** December 8, 2024

