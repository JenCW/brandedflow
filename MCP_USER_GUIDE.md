# How to Use Your MCP Server: A Practical Guide

## What Is an MCP?

An **MCP (Model Context Protocol) Server** is like a smart API gateway that:
1. Receives automation requests (HTTP POST)
2. Validates that you're authorized (API key check)
3. Executes the requested action (create PR, deploy, etc.)
4. Returns the result

Think of it as your **personal automation robot** that listens for commands and carries them out.

---

## The Architecture: How It Works

```
┌─────────────────────────────────────────────────────────┐
│ Your Automation System (n8n, GitHub Actions, etc.)      │
│                                                         │
│ Sends HTTP POST request with:                          │
│ - automation name (e.g., "bump-deps")                  │
│ - parameters (e.g., owner, repo)                       │
│ - API key (proves you're authorized)                   │
└───────────────────────┬─────────────────────────────────┘
                        │
                        ↓
        ┌───────────────────────────────┐
        │   MCP Server (localhost:4000) │
        │                               │
        │  1. Check API key ✓           │
        │  2. Check allowlist ✓         │
        │  3. Load automation ✓         │
        │  4. Run it with adapters ✓    │
        │  5. Return result ✓           │
        └───────────────┬───────────────┘
                        │
           ┌────────────┼────────────┐
           ↓            ↓            ↓
    ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
    │   GitHub     │ │  Netlify     │ │  Airtable    │
    │              │ │              │ │              │
    │ - Create PR  │ │ - Trigger    │ │ - Read/Write │
    │ - List repos │ │   deploy     │ │   records    │
    │ - Update     │ │ - List sites │ │              │
    │   files      │ │              │ │              │
    └──────────────┘ └──────────────┘ └──────────────┘
```

---

## Step-by-Step: How You'll Use It

### Step 1: Start the MCP Server Locally

```bash
cd mcp-server
npm install          # One time only
node index.js        # Starts server on http://localhost:4000
```

You'll see: `MCP server listening on http://localhost:4000`

---

### Step 2: Configure Your API Keys

**File:** `mcp-server/.env`

```env
# GitHub - so the MCP can create PRs, branches, commits
GITHUB_TOKEN=ghp_your_token_here

# Netlify - so the MCP can trigger deploys
NETLIFY_TOKEN=your_netlify_token_here

# Airtable (optional) - for reading/writing records
AIRTABLE_API_KEY=your_airtable_key
AIRTABLE_BASE_ID=appXXXXXXXXXX

# n8n (optional) - for triggering n8n workflows
N8N_HOST=http://localhost:5678

# MCP Security - these keys allow access to your MCP
MCP_API_KEYS=key1,key2,key3

PORT=4000
```

The `MCP_API_KEYS` are YOUR passwords. Anyone who knows one can trigger automations.

---

### Step 3: Make API Calls to Trigger Automations

**Basic Pattern:**
```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{
    "automation": "automation-name",
    "params": { /* parameters */ },
    "dryRun": false
  }'
```

---

## Example 1: Create a PR to Update Dependencies

**Request:**
```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{
    "automation": "bump-deps",
    "params": {
      "owner": "JenCW",
      "repo": "my-project"
    },
    "dryRun": false
  }'
```

**What happens:**
1. MCP validates your API key ✓
2. MCP checks that "bump-deps" is allowed ✓
3. MCP connects to GitHub using your `GITHUB_TOKEN`
4. Creates a new branch: `automation/bump-deps-1732123456`
5. Updates `package.json` with bumped versions
6. Creates a commit on that branch
7. Opens a PR from that branch to `main`
8. Returns the PR number and URL

**Response:**
```json
{
  "ok": true,
  "dryRun": false,
  "result": {
    "pr_number": 42,
    "pr_url": "https://github.com/JenCW/my-project/pull/42"
  }
}
```

---

## Example 2: Test Before Running (Dry Run)

**Request:**
```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{
    "automation": "bump-deps",
    "params": {
      "owner": "JenCW",
      "repo": "my-project"
    },
    "dryRun": true
  }'
```

**Response:**
```json
{
  "ok": true,
  "dryRun": true,
  "result": {
    "dryRun": true,
    "message": "Would create branch automation/bump-deps-* with package.json update"
  }
```

**No PR is created.** You just see what WOULD happen. Perfect for testing!

---

## Example 3: Deploy to Netlify

**Request:**
```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{
    "automation": "deploy-netlify",
    "params": {
      "siteId": "your-site-abc123"
    }
  }'
```

**What happens:**
1. MCP validates your API key ✓
2. MCP checks that "deploy-netlify" is allowed ✓
3. MCP connects to Netlify using your `NETLIFY_TOKEN`
4. Triggers a deploy for that site
5. Returns deploy status

---

## How You'll Actually Use This

### Scenario 1: Triggered by n8n

You have an n8n workflow that needs to create a PR:

```
n8n workflow
    ↓
  [HTTP Request node]
    ↓
POST http://localhost:4000/run
  with API key in header
    ↓
MCP runs "bump-deps"
    ↓
GitHub PR created ✓
    ↓
n8n receives result
    ↓
n8n sends Slack notification
```

**n8n HTTP Node Config:**
- Method: POST
- URL: `http://localhost:4000/run`
- Headers: `X-API-Key: key1`
- Body:
  ```json
  {
    "automation": "bump-deps",
    "params": { "owner": "JenCW", "repo": "my-repo" }
  }
  ```

---

### Scenario 2: Triggered by GitHub Actions

You want a GitHub Action to deploy when tests pass:

```yaml
name: Deploy on Success
on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - run: npm test
      
      - name: Deploy via MCP
        run: |
          curl -X POST http://mcp-server.example.com/run \
            -H "X-API-Key: ${{ secrets.MCP_API_KEY }}" \
            -H "Content-Type: application/json" \
            -d '{
              "automation": "deploy-netlify",
              "params": { "siteId": "my-site" }
            }'
```

---

### Scenario 3: Scheduled Automation

You want something to run every morning at 9 AM:

**Using n8n Cron Trigger:**
```
Every day at 9:00 AM
    ↓
n8n Cron node triggers
    ↓
n8n HTTP Request to MCP
    ↓
MCP runs automation (bump deps, sync Airtable, etc.)
    ↓
Result sent to Slack/Email
```

---

## The Files You Need to Understand

### `index.js` — The Brain

```javascript
// This receives requests and routes them to the right automation
app.post('/run', authMiddleware(), async (req, res) => {
  const { automation, params, dryRun } = req.body;
  
  // 1. Check if you're authorized (API key is valid)
  // 2. Check if this automation is allowed (in the ALLOWLIST)
  // 3. Run the automation
  // 4. Return the result
});
```

**What you change here:**
- Add new automations to `ALLOWLIST`

### `adapters/github.js` — GitHub Operations

```javascript
// Functions to do things on GitHub:
// - Create branches
// - Make commits with file changes
// - Create PRs
// - List repos
// - etc.
```

**What you change here:**
- Add new GitHub operations (list issues, close PRs, etc.)

### `examples/bump-deps.js` — An Automation

```javascript
// This is the actual automation that runs
module.exports = async function ({ adapters, params, dryRun }) {
  // 1. Validate inputs (owner, repo required)
  // 2. If dryRun, return what WOULD happen
  // 3. Otherwise, actually do the thing
  // 4. Return success/failure
};
```

**What you change here:**
- Create new automations (create-release, sync-airtable, etc.)

---

## How to Add a New Automation

### Example: Create a "Create Release" Automation

**Step 1: Create the automation file**

`mcp-server/examples/create-release.js`:
```javascript
module.exports = async function ({ adapters, params, dryRun }) {
  const { github } = adapters;
  const { owner, repo, version } = params;
  
  if (!owner || !repo || !version) {
    throw new Error('owner, repo, and version required');
  }
  
  if (dryRun) {
    return { 
      dryRun: true, 
      message: `Would create release v${version} for ${owner}/${repo}` 
    };
  }
  
  // Create the release on GitHub
  const result = await github.createRelease({ owner, repo, version });
  return { release_url: result.url };
};
```

**Step 2: Register it**

`mcp-server/examples/index.js`:
```javascript
module.exports = {
  'bump-deps': require('./bump-deps'),
  'deploy-netlify': require('./deploy-netlify'),
  'create-release': require('./create-release')  // ← ADD THIS
};
```

**Step 3: Add to allowlist**

`mcp-server/index.js`:
```javascript
const ALLOWLIST = {
  'bump-deps': true,
  'deploy-netlify': true,
  'create-release': true  // ← ADD THIS
};
```

**Step 4: Use it**

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-release",
    "params": {
      "owner": "JenCW",
      "repo": "my-project",
      "version": "2.0.0"
    }
  }'
```

---

## Security: How Your MCP Stays Safe

| Protection | How It Works |
|-----------|-------------|
| **API Key** | Only requests with valid `X-API-Key` header work |
| **Allowlist** | Only specific automations can run (you control which) |
| **Dry Run** | Test safely without making changes |
| **Tokens in .env** | Never committed to Git (add to .gitignore) |
| **GitHub Secrets** | When deployed, use Actions secrets not hardcoded values |

---

## Deployment: Going from Local to Production

### Local (Testing)
```bash
cd mcp-server
node index.js
# Runs on http://localhost:4000
# Use with n8n/GitHub Actions on the same machine
```

### Production (Real Usage)
```bash
# Docker image builds automatically on push to main
# (via .github/workflows/mcp-deploy.yml)

# Deploy container to:
# - DigitalOcean (app platform)
# - Railway.app
# - Render
# - AWS ECS
# - Vercel (with serverless functions)

# Then n8n/GitHub Actions call:
# https://your-mcp-domain.com/run
```

---

## Common Use Cases

| Use Case | Automation | Triggered By |
|----------|-----------|--------------|
| Auto-bump dependencies | bump-deps | Daily cron (n8n) |
| Deploy on PR merge | deploy-netlify | GitHub webhook |
| Sync Airtable data | sync-airtable | n8n cron |
| Create release | create-release | Manual button (n8n) |
| Update docs | update-docs | GitHub Actions |
| Send Slack alerts | send-alert | Any automation result |

---

## Quick Reference: How to Trigger

**From n8n:**
```javascript
// Use HTTP Request node
- Method: POST
- URL: http://localhost:4000/run
- Headers: { "X-API-Key": "key1" }
- Body: { automation: "name", params: {...}, dryRun: false }
```

**From GitHub Actions:**
```yaml
- run: |
    curl -X POST http://mcp-server/run \
      -H "X-API-Key: ${{ secrets.MCP_API_KEY }}" \
      -d '{"automation": "name", "params": {}}'
```

**From Command Line (Testing):**
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation": "bump-deps", "params": {"owner": "JenCW", "repo": "my-repo"}}'
```

---

## What's Next?

1. **Get tokens** — GitHub PAT, Netlify token, etc.
2. **Configure .env** — Add those tokens
3. **Start server locally** — `node index.js`
4. **Test with curl** — Verify it works
5. **Integrate with n8n** — Add HTTP nodes that call your MCP
6. **Deploy to cloud** — Push to GitHub, let CI/CD build Docker image
7. **Connect from production** — Point n8n/Actions to your cloud MCP

---

**Your MCP is ready to be the brains of your automation system!** 🤖
