# Critical Files - Manual Commits Required

## What Are Critical Files?

**Critical files are files that require manual review before committing.** These are files that:
- Are protected (require approval for updates)
- Are in critical directories
- Are always-critical (should always be reviewed)

---

## How You Know What Needs Manual Commits

### 1. Wallpaper Display

**The wallpaper shows a "CRITICAL FILES" section** with:
- Protected files that have uncommitted changes
- Critical directories that need attention
- Always-critical files that should be reviewed

**Example:**
```
CRITICAL FILES (Manual Commits)
• MASTER_RULES.md (always review)
• systems/doe-engine/directives/ (has changes)
• automations/mcps/ (critical folder)
• docs/internal/CONTEXT.md (always review)
```

### 2. Git Status Check

**Use the MCP to check:**
```javascript
await callMCP('get-git-status', {});
```

**Shows:**
- All changed files
- Which files are protected
- Which files need manual approval

### 3. Protected Files List

**Critical files are defined in:**
- `systems/automation-engine/protected_files.py`

**Categories:**
- Critical files (exact matches)
- Protected patterns (matching patterns)
- Protected directories (entire directories)

---

## Critical Files List

### Always-Critical Files

**These should ALWAYS be reviewed before committing:**
- `MASTER_RULES.md` - Master rules document
- `docs/internal/CONTEXT.md` - Project context
- `docs/internal/DECISIONS_LOG.md` - Decision log

### Critical Directories

**These directories require attention:**
- `systems/doe-engine/directives/` - DOE directives
- `automations/mcps/` - MCP files
- `systems/mcp-server/` - MCP server
- `systems/automation-engine/` - Automation engine
- `docs/internal/` - Internal documentation

### Protected Patterns

**Files matching these patterns need approval:**
- `**/RULES.md` - Any RULES.md file
- `**/README.md` - Any README.md file
- `**/CONTEXT.md` - Any CONTEXT.md file
- `**/DECISIONS_LOG.md` - Any DECISIONS_LOG.md file
- `**/*.env` - Environment files
- `**/package.json` - Package files
- `**/client-profile.json` - Client profiles
- `**/item_status.json` - Status tracking
- `**/decision_versions.json` - Decision versions

---

## How to Check What Needs Commits

### Option 1: Wallpaper (Always Visible)

**The wallpaper shows:**
- Critical files with changes
- Critical directories needing attention
- Always-critical files

**You can't miss it - it's on your desktop!**

### Option 2: Git Status MCP

**Check via Cursor:**
```javascript
await callMCP('get-git-status', {});
```

**Returns:**
- Changed files
- Protected files
- Preview of what would be committed

### Option 3: Manual Git Check

**Command line:**
```bash
git status
```

**Shows:**
- All changed files
- Which files are staged
- Which files need to be added

---

## What to Do

### Before Committing

1. **Check wallpaper** - See critical files section
2. **Review protected files** - Make sure changes are correct
3. **Check git status** - See what would be committed
4. **Review critical directories** - Ensure they're up to date

### When Committing

1. **Use `create-git-commit` MCP** - It excludes protected files by default
2. **Or manually commit** - Review each file before staging
3. **Include protected files** - Only if you explicitly approve (`include_protected: true`)

---

## Example Workflow

### Daily Workflow

1. **Run Daily Ops Engine**
   - Wallpaper updates
   - Shows critical files section

2. **Review Critical Files**
   - Check wallpaper for critical files
   - Review each file if needed

3. **Check Git Status**
   ```javascript
   await callMCP('get-git-status', {});
   ```

4. **Commit (if ready)**
   ```javascript
   await callMCP('create-git-commit', {
     include_work_summary: true,
     include_protected: false  // Excludes protected files
   });
   ```

5. **Or commit protected files** (if approved)
   ```javascript
   await callMCP('create-git-commit', {
     include_protected: true  // Includes protected files
   });
   ```

---

## Summary

### How You Know

- ✅ **Wallpaper** - Shows critical files section (always visible)
- ✅ **Git Status MCP** - Check what needs commits
- ✅ **Protected Files List** - Know which files are critical

### What to Do

- ✅ **Review before committing** - Check critical files
- ✅ **Use git commit MCP** - Excludes protected by default
- ✅ **Manually approve** - Only include protected if you approve

**You'll always know what needs manual commits - it's on your desktop wallpaper!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Critical Files Display Working

