# MCP Quick Reference Card

## Start the Server
```bash
cd mcp-server
node index.js
# → Server runs on http://localhost:4000
```

## Environment Setup
```bash
cp mcp-server/.env.example mcp-server/.env
# Edit .env and add your tokens:
# GITHUB_TOKEN=ghp_...
# NETLIFY_TOKEN=...
# MCP_API_KEYS=key1,key2,key3
```

## Make API Calls

### Basic Template
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "AUTOMATION_NAME",
    "params": { "PARAM": "value" },
    "dryRun": false
  }'
```

## Available Automations

### bump-deps
Creates a PR with updated dependencies.

**Params:**
- `owner` (required) — GitHub org/user
- `repo` (required) — Repository name

**Example:**
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation":"bump-deps","params":{"owner":"JenCW","repo":"my-repo"}}'
```

**Response:**
```json
{
  "ok": true,
  "result": {
    "pr_number": 42,
    "pr_url": "https://github.com/JenCW/my-repo/pull/42"
  }
}
```

---

### deploy-netlify
Triggers a Netlify site deployment.

**Params:**
- `siteId` (required) — Netlify site ID

**Example:**
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation":"deploy-netlify","params":{"siteId":"my-site-abc123"}}'
```

**Response:**
```json
{
  "ok": true,
  "result": {
    "deploy": { "id": "...", "url": "..." }
  }
}
```

---

## Test Without Making Changes

Add `"dryRun": true` to any request:

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{
    "automation": "bump-deps",
    "params": {"owner":"JenCW","repo":"my-repo"},
    "dryRun": true
  }'
```

**Response:**
```json
{
  "ok": true,
  "dryRun": true,
  "result": {
    "message": "Would create branch automation/bump-deps-*..."
  }
}
```

---

## Error Handling

### 401 Unauthorized
Missing or invalid API key.
```json
{ "error": "Unauthorized: invalid or missing X-API-Key header" }
```

### 403 Forbidden
Automation not in allowlist.
```json
{ "error": "automation \"xyz\" not in allowlist" }
```

### 404 Not Found
Automation doesn't exist.
```json
{ "error": "automation not found" }
```

### 500 Server Error
Something went wrong (check server logs).
```json
{ "error": "error message here" }
```

---

## Integration Examples

### n8n (HTTP Request Node)

**Setup:**
- Method: `POST`
- URL: `http://localhost:4000/run` (or your production domain)
- Headers Tab:
  - Key: `X-API-Key`
  - Value: `key1`
- Body:
  ```json
  {
    "automation": "bump-deps",
    "params": {
      "owner": "JenCW",
      "repo": "my-repo"
    }
  }
  ```

**Next Step:** Send HTTP response to Slack, email, etc.

---

### GitHub Actions (YAML)

```yaml
- name: Run MCP Automation
  run: |
    curl -X POST http://mcp-server.example.com/run \
      -H "X-API-Key: ${{ secrets.MCP_API_KEY }}" \
      -H "Content-Type: application/json" \
      -d '{
        "automation": "bump-deps",
        "params": {
          "owner": "JenCW",
          "repo": "my-repo"
        }
      }'
```

---

### Zapier / Integromat

**Choose "Make a Webhook Request":**
- Method: POST
- URL: http://localhost:4000/run
- Headers:
  - `X-API-Key: key1`
  - `Content-Type: application/json`
- Body: (JSON with automation name and params)

---

## Add a New Automation

### 1. Create the file
`mcp-server/examples/my-automation.js`:
```javascript
module.exports = async function ({ adapters, params, dryRun }) {
  // adapters = { github, netlify, airtable, n8n }
  // params = what caller passed
  // dryRun = true if testing
  
  if (dryRun) return { dryRun: true, message: "Would do X" };
  
  // Do the actual work here
  const result = await adapters.github.someOperation(...);
  return result;
};
```

### 2. Register it
`mcp-server/examples/index.js`:
```javascript
module.exports = {
  'bump-deps': require('./bump-deps'),
  'my-automation': require('./my-automation')  // ADD THIS
};
```

### 3. Add to allowlist
`mcp-server/index.js`:
```javascript
const ALLOWLIST = {
  'bump-deps': true,
  'my-automation': true  // ADD THIS
};
```

### 4. Use it
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation":"my-automation","params":{...}}'
```

---

## File Structure

```
mcp-server/
├── index.js                 # Main server (don't edit much)
├── package.json             # Dependencies
├── .env.example             # Template (copy to .env)
├── Dockerfile               # Container config
├── mcp-config.yaml          # Capabilities manifest
├── README.md                # Docs
├── adapters/
│   ├── github.js           # GitHub API calls
│   ├── netlify.js          # Netlify API calls
│   ├── airtable.js         # Airtable API calls
│   └── n8n.js              # n8n webhook calls
├── examples/
│   ├── index.js            # Register automations
│   ├── bump-deps.js        # Automation: bump deps
│   └── deploy-netlify.js   # Automation: deploy
└── middleware/
    └── auth.js             # API key validation
```

**You mostly edit:**
- `examples/*.js` — Add new automations
- `adapters/*.js` — Add new API operations
- `index.js` — Update ALLOWLIST when adding automations
- `.env` — Your tokens

---

## Deployment Checklist

- [ ] Get GitHub Personal Access Token (Settings → Developer settings → Personal access tokens)
- [ ] Get Netlify Personal Access Token (Account settings → Applications)
- [ ] Copy `.env.example` to `.env` and fill in tokens
- [ ] Run locally: `node index.js`
- [ ] Test with curl (see examples above)
- [ ] Deploy to production (Docker, Railway, Render, etc.)
- [ ] Update n8n/GitHub Actions to point to production URL
- [ ] Test end-to-end automation

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot find module 'express'" | Run `npm install` |
| 401 Unauthorized | Check `MCP_API_KEYS` in .env |
| 403 automation not allowed | Add to ALLOWLIST in index.js |
| GitHub operations fail | Check `GITHUB_TOKEN` is valid |
| Netlify deploy fails | Check `NETLIFY_TOKEN` is valid |
| Server won't start | Port 4000 in use? Change `PORT` in .env |
| Can't connect from n8n | Firewall blocking port 4000? |

---

**You now have a personal automation robot! 🤖**
