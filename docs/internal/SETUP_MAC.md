# Quick Setup Guide for Mac

## After Cloning

### 1. Create `.env` File

```bash
# At repo root
cat > .env << 'EOF'
# Required for dispatcher
MCP_SECRET=your-secret-key-here-change-this

# MCP Server configuration
MCP_URL=http://localhost:3001
MCP_API_KEY=key1

# Optional: Integration API keys (uncomment and add your keys)
# NETLIFY_AUTH_TOKEN=your-netlify-token
# AIRTABLE_API_KEY=your-airtable-key
# AIRTABLE_BASE_ID=your-base-id
# BASE44_API_KEY=your-base44-key
# N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
EOF
```

**Generate a secure MCP_SECRET:**
```bash
# Option 1: Using openssl
openssl rand -base64 32

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 2. Install Dependencies

```bash
cd systems/mcp-server
npm install
```

**If you get build errors:**
```bash
# Install Xcode Command Line Tools (if not already installed)
xcode-select --install

# Then retry npm install
npm install
```

### 3. Verify Setup

```bash
# Check Node.js version (should be 18+)
node --version

# Check Python version (for worker.py, should be 3.8+)
python3 --version

# Test server syntax
cd systems/mcp-server
node -c index.js
```

### 4. Start Services

**Terminal 1 - Start Dispatcher:**
```bash
cd systems/mcp-server
node index.js
```

**Terminal 2 - Start Worker:**
```bash
# From repo root
python3 worker.py
```

### 5. Test the System

```bash
# From repo root
node cursor/start-task.js import-site brandedflow TEST1 jen '{"zip":"releases/test.zip","site_dir":"sites/test"}'
```

## Troubleshooting

### `sqlite3` build errors
- Ensure Xcode Command Line Tools are installed: `xcode-select --install`
- Try: `npm install sqlite3 --build-from-source`

### Python not found
- macOS usually has Python 3 as `python3`
- If needed: `brew install python3`

### Port 3001 already in use
- Change port in `.env`: `PORT=3002`
- Or kill the process: `lsof -ti:3001 | xargs kill`

## Next Steps

See `systems/doe-engine/DOE_DISPATCHER_SETUP.md` for full documentation and usage examples.
