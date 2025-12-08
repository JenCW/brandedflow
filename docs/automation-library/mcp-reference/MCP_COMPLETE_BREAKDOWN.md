# MCP Server: The Complete Breakdown

## 🎯 What Your MCP Does

Your MCP (Model Context Protocol) Server is a **command center** for automations. It's like a smart assistant that:

1. **Listens** for API requests (HTTP POST to `http://localhost:4000/run`)
2. **Validates** that you're authorized (checks your API key)
3. **Executes** the requested automation (create PR, deploy, sync data, etc.)
4. **Returns** the result (success/failure with details)

---

## 🏗️ The Complete Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOU (or your system)                    │
│                                                                 │
│  n8n / GitHub Actions / Zapier / Manual curl request           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ Makes HTTP POST request with:
                         │ - Your API key
                         │ - Automation name ("bump-deps")
                         │ - Parameters (owner, repo, etc.)
                         │
                         ↓
        ┌────────────────────────────────────┐
        │      MCP Server (Port 4000)       │
        │                                    │
        │  /run endpoint receives request   │
        └────────────┬───────────────────────┘
                     │
                     ↓
        ┌────────────────────────────────────┐
        │  Step 1: Check API Key             │
        │  ✓ Is your X-API-Key header valid?│
        └────────────┬───────────────────────┘
                     │
             YES ↙    ↘ NO
              │        └─→ Return 401: Unauthorized
              │
              ↓
        ┌────────────────────────────────────┐
        │  Step 2: Check Allowlist           │
        │  ✓ Is this automation allowed?     │
        └────────────┬───────────────────────┘
                     │
             YES ↙    ↘ NO
              │        └─→ Return 403: Forbidden
              │
              ↓
        ┌────────────────────────────────────┐
        │  Step 3: Load the Automation       │
        │  ✓ Does it exist in /examples?     │
        └────────────┬───────────────────────┘
                     │
            FOUND ↙   ↘ NOT FOUND
              │        └─→ Return 404: Not found
              │
              ↓
        ┌────────────────────────────────────┐
        │  Step 4: Execute or Dry-Run?       │
        │  ✓ dryRun=true? Show what would   │
        │                 happen, don't do   │
        │    dryRun=false? Actually do it!   │
        └────────────┬───────────────────────┘
                     │
                     ├─→ Connects to GitHub     (via adapters/github.js)
                     ├─→ Connects to Netlify   (via adapters/netlify.js)
                     ├─→ Connects to Airtable  (via adapters/airtable.js)
                     └─→ Connects to n8n       (via adapters/n8n.js)
                     │
                     ↓
        ┌────────────────────────────────────┐
        │  Step 5: Return Result             │
        │  { ok: true, result: {...} }       │
        └────────────┬───────────────────────┘
                     │
                     ↓
        Back to caller with:
        - Success: { pr_number: 42, pr_url: "..." }
        - Error: { error: "error message" }
        - Dry-run: { message: "Would do X", dryRun: true }
                     │
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│                    YOU get the result                           │
│                                                                 │
│  ✅ You can use it to:                                         │
│  - Send notification (Slack, email)                            │
│  - Trigger next step in workflow                               │
│  - Update dashboard                                            │
│  - Log to database                                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔧 How the Pieces Fit Together

### Your Request Arrives

```json
{
  "automation": "bump-deps",
  "params": {
    "owner": "JenCW",
    "repo": "my-project"
  },
  "dryRun": false
}
```

Header: `X-API-Key: key1`

### MCP Routes It

1. **index.js** — Receives the request, validates API key
2. **middleware/auth.js** — Checks if `key1` is in `MCP_API_KEYS`
3. **index.js** — Checks if `bump-deps` is in `ALLOWLIST`
4. **examples/index.js** — Loads the `bump-deps.js` file
5. **examples/bump-deps.js** — Actually does the work

### bump-deps Does Its Thing

```javascript
// It has access to adapters
const { github } = adapters;

// It calls GitHub operations
const pr = await github.createBranchAndPR({
  owner: "JenCW",
  repo: "my-project",
  branchName: "automation/bump-deps-1732123456",
  title: "Bump dependencies",
  fileChanges: [
    { path: "package.json", content: "..." }
  ]
});

// It returns the result
return { pr_number: pr.pr_number, pr_url: pr.pr_url };
```

### You Get Back

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

## 📁 File Map: Where Everything Lives

```
mcp-server/
│
├── 🎛️  index.js
│   └─ The control panel
│   └─ Listens for requests
│   └─ Routes to automations
│   └─ Defines ALLOWLIST
│
├── 🔐 middleware/auth.js
│   └─ Validates API keys
│   └─ Called on every /run request
│
├── 🛠️  adapters/
│   │
│   ├── github.js
│   │   ├─ createBranchAndPR()    — Create branch + PR with file changes
│   │   ├─ createCommit()         — Create a commit
│   │   ├─ listRepos()            — List your repos
│   │   └─ listPullRequests()     — List PRs
│   │
│   ├── netlify.js
│   │   ├─ listSites()            — List your sites
│   │   └─ triggerDeploy()        — Start a deploy
│   │
│   ├── airtable.js
│   │   └─ listRecords()          — Read Airtable records
│   │
│   └── n8n.js
│       └─ triggerWorkflow()      — Call an n8n webhook
│
├── 🤖 examples/
│   │
│   ├── index.js
│   │   └─ Registers automations
│   │
│   ├── bump-deps.js
│   │   └─ Creates PR to update package.json
│   │
│   └── deploy-netlify.js
│       └─ Triggers Netlify deploy
│
├── 🔑 .env
│   └─ Your tokens (GITHUB_TOKEN, NETLIFY_TOKEN, etc.)
│   └─ Your MCP_API_KEYS (passwords to access the MCP)
│   └─ Port and other config
│
├── 🐳 Dockerfile
│   └─ Tells Docker how to run the MCP in a container
│
└── 📚 mcp-config.yaml
    └─ Describes what your MCP can do
```

---

## 🔄 Real-World Example: Automatic Dependency Updates

### The Scenario
"Every morning at 9 AM, create a PR to bump dependencies in my project"

### How It Works

```
┌─────────────────────────────────────────────────────────┐
│ 9:00 AM - n8n Cron Trigger Fires                       │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ↓
        ┌──────────────────────────┐
        │ n8n HTTP Request Node    │
        │                          │
        │ POST http://localhost:4000/run
        │ Header: X-API-Key: key1  │
        │ Body: {                  │
        │   automation: bump-deps  │
        │   params: {              │
        │     owner: JenCW         │
        │     repo: my-project     │
        │   }                      │
        │ }                        │
        └──────────────┬───────────┘
                       │
                       ↓
        ┌──────────────────────────┐
        │ MCP Server Validates     │
        │ ✓ API Key valid          │
        │ ✓ Automation allowed     │
        │ ✓ Load bump-deps.js      │
        │ ✓ Execute!               │
        └──────────────┬───────────┘
                       │
                       ↓
        ┌──────────────────────────────────┐
        │ bump-deps.js Runs                │
        │                                  │
        │ 1. Create branch:                │
        │    automation/bump-deps-123456   │
        │ 2. Update package.json           │
        │    Bump versions to latest       │
        │ 3. Create commit on branch       │
        │ 4. Create PR to main             │
        └──────────────┬────────────────────┘
                       │
                       ↓ GitHub API calls
        ┌──────────────────────────┐
        │ GitHub                   │
        │                          │
        │ Creates branch ✓         │
        │ Creates commit ✓         │
        │ Creates PR ✓             │
        │ PR #42 opened!           │
        └──────────────┬───────────┘
                       │
                       ↓
        ┌──────────────────────────┐
        │ MCP Returns to n8n:      │
        │ {                        │
        │   ok: true,              │
        │   result: {              │
        │     pr_number: 42,       │
        │     pr_url: "..."        │
        │   }                      │
        │ }                        │
        └──────────────┬───────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │ n8n Next Step: Slack Alert   │
        │                              │
        │ Send message:                │
        │ "Created PR #42 to bump      │
        │  dependencies"               │
        └──────────────────────────────┘
```

### The Result
✅ Every morning: New PR with updated dependencies
✅ Team sees it in GitHub
✅ They review, merge, deploy
✅ Dependencies always up-to-date

---

## 🎮 Different Ways to Trigger Your MCP

### 1. n8n Workflow
```
Trigger: Schedule (daily at 9 AM)
  ↓
HTTP Request to MCP
  ↓
Result → Slack notification
```

### 2. GitHub Actions
```
Trigger: On PR merge to main
  ↓
Run: curl to MCP to deploy
  ↓
Result → GitHub check mark ✓
```

### 3. Manual via Command Line
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation": "bump-deps", "params": ...}'
```

### 4. Zapier / Integromat Automation
```
Trigger: Webhook from external service
  ↓
Make HTTP request to MCP
  ↓
Result → Update spreadsheet
```

### 5. Your Custom Application
```python
import requests

response = requests.post(
  'http://localhost:4000/run',
  headers={'X-API-Key': 'key1'},
  json={
    'automation': 'bump-deps',
    'params': {'owner': 'JenCW', 'repo': 'my-project'}
  }
)

pr_url = response.json()['result']['pr_url']
print(f"PR created: {pr_url}")
```

---

## 🛡️ Security: Why Your MCP is Safe

| Layer | Protection |
|-------|-----------|
| **API Key** | Only requests with `X-API-Key` header in `MCP_API_KEYS` work |
| **Allowlist** | Only specific automations can run (you control which) |
| **Dry-Run** | Test safely: `"dryRun": true` means no actual changes |
| **Tokens** | Stored in `.env` (never committed to Git) |
| **Environment** | GitHub Actions use "secrets" (encrypted, not visible in logs) |
| **Read-Only** | Can create adapters for read-only operations (no delete risk) |

**Example: If someone steals your API key**
- They can only run automations in the ALLOWLIST
- They can only do what those automations do
- Using dry-run, you can audit what they tried to do

---

## 🚀 From Local to Production

### Development (Your Laptop)
```bash
cd mcp-server
npm install
node index.js
# MCP runs on http://localhost:4000
# Use with n8n on same machine
```

### Production (Cloud)
```
Push to GitHub main branch
  ↓
GitHub Actions workflow triggers
  ↓
npm install + npm test
  ↓
Build Docker image
  ↓
Push to GitHub Container Registry
  ↓
Deploy to: Railway / Render / AWS / DigitalOcean
  ↓
Your n8n/Actions call: https://your-domain.com/run
```

---

## ✨ What Makes Your MCP Powerful

1. **Centralized** — All automations in one place
2. **Secure** — API key validation + allowlist
3. **Flexible** — Easy to add new automations
4. **Testable** — Dry-run mode
5. **Reusable** — Any system can call it (n8n, Actions, etc.)
6. **Auditable** — See exactly what happened
7. **Scalable** — Deploy to cloud, handle many requests
8. **Extensible** — Add adapters for more services

---

## 📊 Quick Decision Tree

```
Do you need to automate something?
│
├─→ Create PR with file changes?
│   └─ Use: bump-deps automation (or customize it)
│
├─→ Trigger a deploy?
│   └─ Use: deploy-netlify automation
│
├─→ Read/write Airtable?
│   └─ Add: new automation using airtable adapter
│
├─→ Something else?
│   └─ Create: new automation in mcp-server/examples/
│       └─ Use: adapters/github.js, adapters/netlify.js, etc.
│
└─→ How often?
    ├─ Scheduled (daily, hourly)?
    │  └─ Trigger from: n8n cron
    │
    ├─ On event (PR merged, deployment)?
    │  └─ Trigger from: GitHub Actions webhook
    │
    ├─ Manual button?
    │  └─ Trigger from: n8n dashboard button
    │
    └─ From another service?
       └─ Trigger from: Zapier, your app, etc.
```

---

## 🎓 Next: Build Your First Custom Automation

**Goal:** Create an automation that syncs Airtable to GitHub

**Steps:**
1. Create `mcp-server/examples/sync-airtable.js`
2. Use `adapters.airtable` to read records
3. Use `adapters.github` to create/update files with that data
4. Add to `ALLOWLIST` in `index.js`
5. Test with dry-run
6. Deploy

**Result:** Every time you run this automation, GitHub gets the latest Airtable data

---

**Your MCP is now a powerful automation engine. Time to build! 🚀**
