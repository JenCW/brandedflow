# GitHub API Permissions Guide

## What Permissions You Need

For your MCPs and automation systems, you need a GitHub Personal Access Token (PAT) with specific permissions.

---

## Required Permissions

### ✅ Minimum Permissions (Recommended)

**For basic git operations (commits, pushes, pulls):**

1. **repo** (Full control of private repositories)
   - ✅ Allows: Read/write access to code, commits, branches
   - ✅ Allows: Create commits, push changes, pull updates
   - ✅ Allows: Read repository contents
   - **This is the main permission you need**

**OR if you only need public repos:**

2. **public_repo** (Access public repositories)
   - ✅ Allows: Same as `repo` but only for public repositories
   - ⚠️ Limited: Won't work if your repo is private

---

## What Your MCPs Do With GitHub

**Based on your code:**

1. **`create-git-commit.js`** - Creates git commits
   - Needs: `repo` permission (write access)

2. **`get-git-status.js`** - Gets git status
   - Needs: `repo` permission (read access)

3. **Auto-commit system** - Automatically commits files
   - Needs: `repo` permission (write access)

4. **Daily ops system** - May commit logs and updates
   - Needs: `repo` permission (write access)

---

## How to Create GitHub Token

### Step 1: Go to GitHub Settings

1. Log into GitHub
2. Click your profile picture (top right)
3. Click **Settings**
4. Scroll down to **Developer settings** (left sidebar)
5. Click **Personal access tokens**
6. Click **Tokens (classic)** or **Fine-grained tokens**

### Step 2: Create New Token

**Option A: Classic Token (Recommended for simplicity)**

1. Click **Generate new token** → **Generate new token (classic)**
2. **Note:** "BrandedFlow MCP Server"
3. **Expiration:** Choose your preference (90 days, 1 year, or no expiration)
4. **Select scopes:**
   - ✅ **repo** (Full control of private repositories)
     - This includes:
       - `repo:status` - Commit status
       - `repo_deployment` - Deployments
       - `public_repo` - Access public repositories
       - `repo:invite` - Repository invitations
       - `security_events` - Security events

5. Click **Generate token**
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)

**Option B: Fine-grained Token (More secure, more control)**

1. Click **Generate new token** → **Generate new token (fine-grained)**
2. **Token name:** "BrandedFlow MCP Server"
3. **Expiration:** Choose your preference
4. **Repository access:** 
   - Select **Only select repositories**
   - Choose your `brandedflow` repository
5. **Repository permissions:**
   - **Contents:** Read and write
   - **Metadata:** Read-only (automatic)
   - **Pull requests:** Read and write (if you want PR automation)
6. Click **Generate token**
7. **COPY THE TOKEN IMMEDIATELY**

---

## Add Token to .env

**Add to `systems/mcp-server/.env`:**

```bash
# GitHub (for git operations)
GITHUB_TOKEN=ghp_your_token_here
```

**Important:**
- Replace `ghp_your_token_here` with your actual token
- The token starts with `ghp_` for classic tokens
- Fine-grained tokens start with `github_pat_`

---

## What Each Permission Does

### repo (Full control)
- ✅ Read/write repository contents
- ✅ Create commits
- ✅ Push changes
- ✅ Pull updates
- ✅ Create branches
- ✅ Create pull requests
- ✅ Manage issues (if needed)

### public_repo (Public only)
- ✅ Same as `repo` but only for public repositories
- ❌ Won't work for private repos

### workflow (GitHub Actions)
- ✅ Trigger GitHub Actions workflows
- ⚠️ Only needed if you use GitHub Actions

### admin:repo_hook (Webhooks)
- ✅ Manage repository webhooks
- ⚠️ Only needed if you set up webhooks

---

## Security Best Practices

### ✅ DO:
- Use fine-grained tokens when possible (more secure)
- Set expiration dates
- Only grant permissions you actually need
- Store token in `.env` (never commit it)
- Rotate tokens regularly (every 90 days)

### ❌ DON'T:
- Never commit tokens to git
- Never share tokens
- Don't use `repo:all` if you don't need it
- Don't set "no expiration" unless necessary

---

## Testing Your Token

**Test if your token works:**

```bash
# Test read access
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/user

# Test repo access
curl -H "Authorization: token YOUR_TOKEN" \
  https://api.github.com/repos/YOUR_USERNAME/brandedflow
```

**If you get your user info and repo info back, the token works!**

---

## Recommended Setup

**For your use case (MCPs doing git operations):**

1. **Token Type:** Classic token (simpler)
2. **Permissions:** Just `repo` (covers everything you need)
3. **Expiration:** 1 year (or your preference)
4. **Name:** "BrandedFlow MCP Server"

**This gives you:**
- ✅ All git operations (commit, push, pull)
- ✅ Repository read/write
- ✅ Everything your MCPs need
- ✅ Simple to manage

---

## Troubleshooting

**"Bad credentials" error:**
- Check token is correct (starts with `ghp_`)
- Check token hasn't expired
- Check token has `repo` permission

**"Resource not accessible" error:**
- Check token has access to the repository
- Check repository is not archived
- Check you're using the right token

**"Permission denied" error:**
- Check token has `repo` permission (not just `public_repo`)
- Check token has write access (not just read)

---

## Quick Reference

**Minimum needed:**
- `repo` permission

**Token format:**
- Classic: `ghp_xxxxxxxxxxxx`
- Fine-grained: `github_pat_xxxxxxxxxxxx`

**Add to .env:**
```bash
GITHUB_TOKEN=ghp_your_token_here
```

---

**Last Updated:** December 8, 2024
**Status:** Complete Guide ✅

