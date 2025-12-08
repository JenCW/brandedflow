# Wallpaper Updates - Complete Task & Decision Display

## What Changed

### Before
- ❌ Only showed "Top 3" tasks
- ❌ Only showed limited decisions
- ❌ No visibility into critical files needing commits

### After
- ✅ Shows **ALL tasks** (complete to-do list)
- ✅ Shows **ALL decisions** (complete decision log)
- ✅ Shows **critical files/folders** that need manual commits

---

## Wallpaper Layout

### 3-Column Layout

**Column 1: ALL TASKS**
- Complete list of all pending tasks
- No truncation (shows everything)
- Max 35 items visible (with "... and X more" if needed)

**Column 2: ALL DECISIONS**
- Complete list of all pending decisions
- No truncation (shows everything)
- Max 35 items visible (with "... and X more" if needed)

**Column 3: CRITICAL FILES (Manual Commits)**
- Protected files with uncommitted changes
- Critical directories that need attention
- Always-critical files (MASTER_RULES.md, etc.)
- Shows protection reason for each file

---

## Critical Files Detection

### What Gets Shown

**Protected Files with Changes:**
- Files that are protected AND have uncommitted changes
- Shows file path + protection reason
- Example: `MASTER_RULES.md (Critical file: MASTER_RULES.md)`

**Critical Directories:**
- `systems/doe-engine/directives/`
- `automations/mcps/`
- `systems/mcp-server/`
- `systems/automation-engine/`
- `docs/internal/`

**Always-Critical Files:**
- `MASTER_RULES.md` (always review)
- `docs/internal/CONTEXT.md` (always review)
- `docs/internal/DECISIONS_LOG.md` (always review)

### How It Works

1. **Checks git status** for protected files with changes
2. **Lists critical directories** that need attention
3. **Shows always-critical files** that should be reviewed
4. **Displays on wallpaper** so you can't miss them

---

## Example Wallpaper

```
┌─────────────────────────────────────────────────────────────┐
│ BrandedFlow Dashboard                    Dec 8, 2024 10:00 AM│
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ ALL TASKS              ALL DECISIONS    CRITICAL FILES      │
│                                                               │
│ • Task 1               • Decision 1     • MASTER_RULES.md   │
│ • Task 2               • Decision 2       (always review)    │
│ • Task 3               • Decision 3     • systems/doe-      │
│ • Task 4               • Decision 4       engine/          │
│ • Task 5               • Decision 5       (has changes)      │
│ ...                    ...              • automations/mcps/  │
│                                                               │
│ Total: 12 tasks, 8 decisions, 5 critical files              │
└─────────────────────────────────────────────────────────────┘
```

---

## How to Use

### Daily Workflow

1. **Run Daily Ops Engine** (desktop button or Cursor)
2. **Wallpaper updates automatically**
3. **See everything on desktop:**
   - All your tasks (complete list)
   - All your decisions (complete list)
   - Critical files needing commits (can't miss them!)

### Critical Files Section

**What it tells you:**
- Which protected files have uncommitted changes
- Which critical directories need attention
- Which files should always be reviewed

**What to do:**
- Review critical files before committing
- Check protected files for changes
- Ensure critical directories are up to date

---

## Technical Details

### Files Updated

1. **`full_wallpaper_builder.py`** - New wallpaper builder
   - Loads ALL tasks (not just top 3)
   - Loads ALL decisions (not limited)
   - Detects critical files needing commits
   - 3-column layout

2. **`maintenance_agent.py`** - Updated to use new builder
   - Calls `FullWallpaperBuilder` instead of old builder
   - Sets wallpaper automatically

### Dependencies

- Uses `ProtectedFiles` to identify protected files
- Uses `GitCommitManager` to check git status
- Shows protection reasons for each file

---

## Benefits

### Complete Visibility ✅

- **See everything** - no more missing tasks or decisions
- **Can't miss critical files** - always visible on desktop
- **Full context** - complete picture of what needs attention

### Better Workflow ✅

- **Know what to commit** - critical files section shows what needs review
- **No surprises** - see all tasks and decisions at once
- **Always informed** - desktop wallpaper keeps you updated

---

## Summary

**Wallpaper now shows:**
- ✅ **ALL tasks** (complete to-do list)
- ✅ **ALL decisions** (complete decision log)
- ✅ **Critical files** (need manual commits)

**You can't miss:**
- What needs to be done (all tasks)
- What was decided (all decisions)
- What needs manual review (critical files)

**Your desktop is now a complete dashboard!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Full Display Working

