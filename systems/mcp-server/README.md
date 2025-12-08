# Branded + Flow MCP Server

HTTP server for executing deterministic operations (DOE method execution layer).

## Quick Start

### 1. Install Dependencies

```bash
cd systems/mcp-server
npm install
```

### 2. Configure Environment

Create a `.env` file in `systems/mcp-server/`:

```bash
cd systems/mcp-server
cat > .env << EOF
# MCP Security - API keys that allow access
MCP_API_KEYS=key1,key2,key3

# Server Port
PORT=4000

# Project Root (absolute path to brandedflow directory)
PROJECT_ROOT=/Users/jencortez-walters/brandedflow

# Optional: External Service API Keys
# GITHUB_TOKEN=ghp_your_token_here
# NETLIFY_TOKEN=your_netlify_token_here
# AIRTABLE_API_KEY=your_airtable_key
# AIRTABLE_BASE_ID=appXXXXXXXXXX
# BREVO_API_KEY=your_brevo_key
EOF
```

**Important:** Replace `/Users/jencortez-walters/brandedflow` with your actual project path.

### 3. Start Server

```bash
npm start
# Server runs on http://localhost:4000
```

## Usage

### Health Check

```bash
curl http://localhost:4000/health
```

### List Available Automations

```bash
curl -X GET http://localhost:4000/automations \
  -H "X-API-Key: key1"
```

### Execute an Automation

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-client-folder",
    "params": {
      "client_name": "dental-bunny"
    },
    "dryRun": false
  }'
```

### Test Without Making Changes

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-client-folder",
    "params": {
      "client_name": "dental-bunny"
    },
    "dryRun": true
  }'
```

## Available Automations

### Internal Processes

- **create-client-folder** - Creates standard client folder structure
- **copy-website-template** - Copies AQ Remodeling template to new client
- **extract-client-info** - Extracts structured info from intake/brand files

### Adding New Automations

1. Create a new file in `automations/` directory
2. Export an object with:
   - `description` - What the automation does
   - `params` - Parameter definitions
   - `execute(params, context)` - Execution function

Example:

```javascript
module.exports = {
  description: 'My automation description',
  
  params: {
    param_name: {
      type: 'string',
      required: true,
      description: 'Parameter description'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    // Your automation logic here
    return { success: true, message: 'Done!' };
  }
};
```

## Integration with DOE Method

This MCP server is the **Execution** layer in the DOE method:

- **Directive** → Specifies which MCP to use
- **Orchestrate** → AI calls the MCP with parameters
- **Execute** → This server runs the automation

## Security

- API keys are required for all requests (except `/health`)
- Set `MCP_API_KEYS` in `.env` (comma-separated)
- Never commit `.env` to git

## Development

```bash
npm run dev  # Auto-restart on file changes (requires nodemon)
```

