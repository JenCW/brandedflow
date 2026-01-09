# Protected Files System

## Overview

**Critical files are protected from automatic updates and require explicit manual approval.**

---

## Protected Files

### Critical Files (Always Protected)

**Root Level:**
- `project_config.md` - Repo constitution (stable context)
- `workflow_state.md` - Dynamic brain (current state)

**Core Documentation:**
- `docs/internal/CONTEXT.md` - Current project state
- `docs/internal/DECISIONS_LOG.md` - Decision history
- `docs/internal/AI_RULES.md` - AI rules
- `docs/training/MASTER_BRAND_GUIDE.md` - Brand voice anchor (company default)
- `company/website/site/BRAND_STYLE_GUIDE.md` - Company visual system (defaults)

**DOE Engine:**
- `systems/doe-engine/gemini.md` - DOE architecture
- `systems/doe-engine/directives/.template.md` - Directive template

**Configuration Files:**
- `.cursorrules` - Cursor rules
- `systems/mcp-server/.env` - MCP server config
- `systems/mcp-server/package.json` - MCP dependencies

**Critical Data:**
- `clients/*/client-profile.json` - Client profiles
- `systems/trackers/item_status.json` - Item status
- `systems/trackers/decision_versions.json` - Decision versions

**Core System Files:**
- `systems/automation-engine/maintenance_agent.py` - Daily ops engine
- `systems/automation-engine/apply_updates.py` - Update applier
- `systems/automation-engine/protected_files.py` - This system

---

## Protected Patterns

**Files matching these patterns require approval:**
- `**/RULES.md` - Any RULES.md file
- `**/README.md` - Any README.md file
- `**/CONTEXT.md` - Any CONTEXT.md file
- `**/DECISIONS_LOG.md` - Any DECISIONS_LOG.md file
- `**/*.env` - Environment files
- `**/package.json` - Package files
- `**/client-profile.json` - Client profiles
- `**/item_status.json` - Status files
- `**/decision_versions.json` - Version files
- `**/.gitignore` - Git ignore files
- `**/.cursorrules` - Cursor rules
- `**/.claude_code_rules` - Claude rules

---

## Protected Directories

**Entire directories require approval:**
- `systems/doe-engine/directives/` - All directives
- `automations/mcps/` - All MCPs
- `systems/mcp-server/` - MCP server
- `systems/automation-engine/` - Automation engine
- `systems/dashboard/` - Dashboard

---

## How It Works

### Automatic Protection

**When updates are proposed:**
1. System checks if file is protected
2. Protected files are separated
3. Protected files require explicit approval
4. Unprotected files can be auto-updated (if enabled)

### Manual Approval Required

**For protected files:**
- Must explicitly approve in dashboard
- Must use `force_protected=True` flag
- System logs all protected file updates
- Full audit trail

### Example

**Proposed updates:**
```python
{
    "MASTER_RULES.md": "new content",  # PROTECTED
    "clients/test/client-profile.json": "new content",  # PROTECTED
    "docs/temp/notes.md": "new content"  # NOT PROTECTED
}
```

**System response:**
```python
{
    "applied": {
        "docs/temp/notes.md": "updated"
    },
    "blocked": {
        "MASTER_RULES.md": "BLOCKED: Critical file (requires explicit approval)",
        "clients/test/client-profile.json": "BLOCKED: Matches protected pattern (requires explicit approval)"
    },
    "protected_count": 2,
    "unprotected_count": 1
}
```

---

## Safety Guarantees

### ✅ Protected Files
- **Never auto-updated** (even if auto-updates enabled)
- **Require explicit approval** in dashboard
- **Full audit trail** of all changes
- **Can't be overwritten** accidentally

### ✅ Unprotected Files
- Can be auto-updated (if feature enabled)
- Still shown in dashboard for review
- Can be approved/rejected

---

## Adding Protected Files

### To Add a File

**Edit:** `systems/automation-engine/protected_files.py`

**Add to CRITICAL_FILES:**
```python
CRITICAL_FILES = [
    # ... existing files ...
    "path/to/new-critical-file.md",
]
```

**Or add pattern:**
```python
PROTECTED_PATTERNS = [
    # ... existing patterns ...
    "**/critical-*.md",
]
```

**Or add directory:**
```python
PROTECTED_DIRECTORIES = [
    # ... existing directories ...
    "path/to/critical-directory/",
]
```

---

## Current Status

✅ **Protected Files System** - Implemented
✅ **Critical Files Listed** - All important files protected
✅ **Pattern Matching** - Flexible protection
✅ **Directory Protection** - Entire directories protected
✅ **Update Applier Updated** - Respects protection
✅ **Safety Guarantees** - No accidental overwrites

---

## Summary

**Protected files:**
- ✅ Never auto-updated
- ✅ Require explicit approval
- ✅ Full audit trail
- ✅ Can't be overwritten accidentally

**Your critical files are safe!**

---

**Last Updated:** December 8, 2024
**Status:** Active and Protecting Critical Files

