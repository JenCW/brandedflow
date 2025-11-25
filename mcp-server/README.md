# BrandedFlow MCP (scaffold)

This is a minimal MCP server tailored to your techstack: Node 18 + npm, GitHub, Netlify, Airtable, and n8n. It provides a lightweight HTTP interface to run named automations and adapter modules you can extend.

## Quick start

1. Copy `.env.example` to `.env` and fill tokens:

```bash
cp .env.example .env
# edit .env and add your tokens
```

2. Install dependencies and run:

```bash
cd mcp-server
npm install
npm start
```

3. Run an automation (example: deploy-netlify with API key):

```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{"automation":"deploy-netlify","params":{"siteId":"your-site-id"}}'
```

4. Test dry-run mode (no side effects):

```bash
curl -X POST http://localhost:4000/run \
  -H "Content-Type: application/json" \
  -H "X-API-Key: key1" \
  -d '{"automation":"bump-deps","params":{"owner":"your-org","repo":"your-repo"},"dryRun":true}'
```

## Files of interest

- `index.js` — main server, /run endpoint, API key validation, allowlist
- `middleware/auth.js` — X-API-Key validation
- `adapters/` — adapter modules (`github`, `netlify`, `airtable`, `n8n`)
  - `github.js` includes blob/tree/commit creation for file changes
- `examples/` — example automations as templates
- `mcp-config.yaml` — manifest showing capabilities and required env vars
- `.github/workflows/mcp-deploy.yml` — GitHub Actions CI/CD for building and pushing Docker image

## API

### POST /run

**Required headers:**
- `X-API-Key: <key>` — must be one of the comma-separated keys in `MCP_API_KEYS` env var

**Request body:**
```json
{
  "automation": "bump-deps",
  "params": { "owner": "your-org", "repo": "your-repo" },
  "dryRun": false
}
```

**Response:**
```json
{
  "ok": true,
  "dryRun": false,
  "result": { "pr_number": 42, "pr_url": "https://github.com/..." }
}
```

### GET /health

Health check endpoint.

## Security

- All `/run` requests require valid `X-API-Key` header (define keys in `.env` as `MCP_API_KEYS=key1,key2,key3`)
- Automations are allowlisted in `index.js` — add new ones to the `ALLOWLIST` object
- Use `dryRun: true` to preview automation actions without making changes

## Next steps

- Implement more robust Git operations (creating blobs/trees) in the GitHub adapter. ✓ Done
- Add secure secrets store integration (GitHub Secrets, Netlify env, or HashiCorp Vault).
- Add integrations for Vercel, Replit, 10Web, Figma, Canva, Breezy, ianswering.ai, and more SaaS tools you listed.
- Add more example automations (e.g., create releases, update docs, sync Airtable to GitHub).
- Test the GitHub Actions workflow and configure deployment target (e.g., Docker Hub, AWS ECR).

