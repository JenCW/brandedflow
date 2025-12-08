# Your MCP Server Documentation Index

Welcome! This guide explains **how your MCP server works** and **how to use it** for your automation system.

## 📚 Documentation Files

Pick your starting point based on your needs:

### 🚀 **I want to get started immediately!**
→ Read: **`MCP_QUICK_REFERENCE.md`**
- Copy-paste commands
- API examples
- Troubleshooting
- 5 min read

### 🎯 **I want to understand the architecture**
→ Read: **`MCP_COMPLETE_BREAKDOWN.md`**
- Visual flows and diagrams
- How validation works
- Real-world example (auto-update deps)
- File structure and connections
- 10 min read

### 📖 **I want to understand everything thoroughly**
→ Read: **`MCP_USER_GUIDE.md`**
- What is an MCP (complete explanation)
- Step-by-step how it works
- All integration examples (n8n, GitHub Actions, etc.)
- How to add new automations
- Security details
- 20 min read

---

## 🎓 What is Your MCP?

**TL;DR:** A smart HTTP server that executes automations when you ask it to.

Think of it as your **personal automation robot** that:
1. **Listens** for commands (HTTP POST requests)
2. **Validates** you're authorized (API key check)
3. **Executes** the automation (create PR, deploy, sync data, etc.)
4. **Returns** the result

---

## ⚡ Quick Start (60 seconds)

```bash
# 1. Start the server
cd mcp-server
npm install
node index.js

# 2. In another terminal, test it
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{"automation":"bump-deps","params":{"owner":"JenCW","repo":"my-repo"},"dryRun":true}'

# 3. You should see:
# {"ok":true,"dryRun":true,"result":{"message":"Would create branch..."}}
```

---

## 🏗️ What's Included

| Component | Purpose |
|-----------|---------|
| **mcp-server/** | Main Node.js application |
| **adapters/** | Connect to GitHub, Netlify, Airtable, n8n |
| **examples/** | Automations: bump-deps, deploy-netlify |
| **middleware/auth.js** | API key validation |
| **.github/workflows/mcp-deploy.yml** | CI/CD to build Docker image |
| **.env** | Your tokens (GITHUB_TOKEN, NETLIFY_TOKEN, etc.) |
| **Dockerfile** | Deploy to production as container |

---

## 📋 How You'll Use It

### Scenario 1: Automated Dependency Updates
```
Every morning at 9 AM:
  n8n cron triggers
    ↓
  Calls MCP with: automation=bump-deps
    ↓
  MCP creates PR with updated dependencies
    ↓
  n8n sends Slack notification
```

### Scenario 2: Deploy on PR Merge
```
PR merged to main:
  GitHub webhook triggers
    ↓
  GitHub Actions calls MCP with: automation=deploy-netlify
    ↓
  MCP triggers Netlify deploy
    ↓
  GitHub Action marks deployment as complete
```

### Scenario 3: Manual Button Click
```
You click button in n8n dashboard
  ↓
  Sends request to MCP with: automation=sync-airtable
    ↓
  MCP reads Airtable, updates GitHub
    ↓
  n8n receives result and updates dashboard
```

---

## 🔐 Security Features

✅ **API Key Authentication** — Only requests with valid `X-API-Key` work  
✅ **Allowlist** — Only whitelisted automations can run  
✅ **Dry-Run Mode** — Test changes safely: `"dryRun": true`  
✅ **Token Management** — Secrets in `.env`, never committed to Git  
✅ **GitHub Actions Integration** — Uses encrypted secrets  

---

## 🚀 Deployment Path

### Local (Development)
```bash
cd mcp-server
node index.js  # Runs on http://localhost:4000
```

### Cloud (Production)
```
Push to GitHub main
  ↓
GitHub Actions builds Docker image
  ↓
Image pushed to GitHub Container Registry
  ↓
Deploy to: Railway, Render, AWS, DigitalOcean, etc.
  ↓
Your n8n/Actions call: https://your-domain.com/run
```

---

## 🛠️ Common Tasks

### Start the Server
```bash
cd mcp-server
npm install  # One time only
node index.js
```

### Test an Automation
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -d '{"automation":"bump-deps","params":{"owner":"JenCW","repo":"my-repo"}}'
```

### Add a New Automation
1. Create `mcp-server/examples/my-automation.js`
2. Register in `mcp-server/examples/index.js`
3. Add to ALLOWLIST in `mcp-server/index.js`
4. Test with curl
5. Deploy

### Use with n8n
1. Create HTTP Request node
2. Method: POST
3. URL: `http://localhost:4000/run`
4. Headers: `X-API-Key: key1`
5. Body: `{"automation":"name","params":{...}}`

---

## 📚 Full Documentation Map

```
MCP Server Root (brandedflow/)
│
├── README.md (if you want general project info)
├── MCP_INDEX.md (this file)
│
├── MCP_USER_GUIDE.md
│   └─ Complete explanation of everything
│
├── MCP_QUICK_REFERENCE.md
│   └─ Copy-paste examples and commands
│
├── MCP_COMPLETE_BREAKDOWN.md
│   └─ Visual flows and architecture
│
└── mcp-server/
    ├── README.md (MCP-specific setup)
    ├── index.js (main server)
    ├── package.json (dependencies)
    ├── .env.example (template for .env)
    ├── Dockerfile (container config)
    ├── mcp-config.yaml (capabilities)
    │
    ├── adapters/
    │   ├── github.js
    │   ├── netlify.js
    │   ├── airtable.js
    │   └── n8n.js
    │
    ├── examples/
    │   ├── index.js
    │   ├── bump-deps.js
    │   └── deploy-netlify.js
    │
    └── middleware/
        └── auth.js
```

---

## ❓ Frequently Asked Questions

### Q: Do I need to use all adapters?
**A:** No. Use what you need. GitHub and Netlify are included, others are optional.

### Q: Can I run it locally AND in the cloud?
**A:** Yes. Run locally for testing/development, deploy to cloud for production use.

### Q: What happens if I restart the server?
**A:** Nothing. The server is stateless. Restarting doesn't affect any data.

### Q: Can I add authentication to the MCP itself?
**A:** Yes! The API key system is built-in. You control `MCP_API_KEYS`.

### Q: Is there a web dashboard?
**A:** Not included, but you can add one. Currently it's API-only.

### Q: Can I run multiple copies?
**A:** Yes, behind a load balancer. The server is stateless.

### Q: What if an automation fails?
**A:** You get `{ error: "error message" }` response. Check logs on server.

---

## 🎯 Next Steps

1. **Pick a documentation file** (based on your learning style above)
2. **Get tokens** — GitHub PAT, Netlify token
3. **Configure .env** — Copy `.env.example`, add your tokens
4. **Test locally** — Run `node index.js`, test with curl
5. **Connect to n8n** — Add HTTP request node
6. **Deploy to cloud** — Push to GitHub, let CI/CD build
7. **Build custom automations** — Create your own in `examples/`

---

## 💡 What Makes This Powerful

| Feature | Why It Matters |
|---------|---|
| **Centralized** | All automations in one place, easy to manage |
| **Secure** | API keys + allowlist prevent unauthorized access |
| **Flexible** | Add any automation by creating new file |
| **Testable** | Dry-run mode lets you preview changes |
| **Reusable** | Any system can call it (n8n, Actions, Zapier, etc.) |
| **Scalable** | Deploy to cloud, handle many requests |
| **Auditable** | See exactly what happened and when |

---

## 🚨 Important Notes

⚠️ **Tokens are secrets!**
- Store in `.env` locally
- Use GitHub Secrets in Actions
- Never commit `.env` to Git

⚠️ **Test with dry-run first!**
- `"dryRun": true` in your request
- See what would happen without making changes

⚠️ **Update ALLOWLIST carefully**
- Only automations in ALLOWLIST can run
- Adding to ALLOWLIST = new security boundary

---

## 📞 Support & Troubleshooting

**Server won't start?**
- Check `npm install` ran successfully
- Check port 4000 isn't in use
- Check `.env` file exists

**API Key rejected?**
- Check `MCP_API_KEYS` in `.env`
- Check header is exactly `X-API-Key: key1`

**Automation fails?**
- Check tokens in `.env` are valid
- Check server logs for error details
- Try dry-run first

**Need more help?**
- Check `MCP_QUICK_REFERENCE.md` troubleshooting table
- Check `MCP_USER_GUIDE.md` for detailed explanations
- Check `MCP_COMPLETE_BREAKDOWN.md` for architecture help

---

**Your MCP is ready to automate!** 🤖

Start with one of the three guides above, then build your first automation. Good luck! 🚀
