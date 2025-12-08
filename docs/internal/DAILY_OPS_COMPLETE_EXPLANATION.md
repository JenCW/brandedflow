# Daily Ops App - Complete Explanation

## What It Does (In Its Entirety)

### The Complete Pipeline

**When you run Daily Ops Engine (desktop button or Cursor):**

1. **Collects All Inputs**
   - External chats from `systems/trackers/conversations_to_process/`
   - Work logs from `systems/trackers/work_logs/` (Cursor work)
   - Self-annealing logs from `systems/trackers/self_annealing_logs/` (fixes/updates)

2. **Processes Everything**
   - Extracts decisions, tasks, notes from all sources
   - Detects conflicts (similar decisions/tasks)
   - Detects superseded decisions (older versions)
   - Filters out done items (checkbox system)
   - Tracks decision versions

3. **Creates Output Files**
   - `decisions-log.md` - All pending decisions (latest versions only)
   - `tasks.md` - All pending tasks
   - `notes.md` - All notes
   - `daily-summary.md` - Full daily summary
   - `conflicts.md` - Conflicting decisions/tasks
   - `superseded-decisions.md` - Decisions that were superseded
   - `item_status.json` - Done/pending status
   - `decision_versions.json` - All versions of decisions

4. **Builds Dashboard**
   - Creates HTML dashboard: `systems/dashboard/html/index.html`
   - Shows: Top 3 tasks, Latest decisions, Latest tasks, Notes
   - Opens Dashboard.app (if exists)

5. **Creates Desktop Wallpaper**
   - Generates PNG: `systems/dashboard/wallpaper/wallpaper.png`
   - Shows: Top 3 tasks, Decisions, Notes, Timestamp
   - **Sets as your desktop wallpaper** (always visible!)

6. **Archives Processed Files**
   - Moves chats to: `systems/trackers/archive/{date}/`
   - Moves logs to: `systems/trackers/{log_type}/Processed/`
   - Keeps inbox clean

---

## Desktop Display

### How It Shows on Desktop

**The wallpaper system:**
1. **Generates PNG image** with your dashboard content
2. **Sets as macOS wallpaper** automatically
3. **Always visible** - your desktop background shows:
   - Top 3 tasks (do these first)
   - Latest decisions
   - Notes
   - Timestamp

**Location:**
- PNG: `systems/dashboard/wallpaper/wallpaper.png`
- Rendered: `systems/dashboard/wallpaper/rendered_wallpaper.png`
- **Automatically set as your desktop background**

**Dashboard App:**
- HTML: `systems/dashboard/html/index.html`
- Opens in browser or Dashboard.app
- Full interactive view

---

## File Structure Understanding

### Current Capabilities

**The system:**
- ✅ **Knows your folder structure** (uses Path objects, knows project root)
- ✅ **Respects protected files** (won't update without approval)
- ✅ **Archives processed files** (moves to dated folders)
- ⚠️ **Does NOT automatically update files** (you approve manually)
- ⚠️ **Does NOT automatically archive superseded files** (only archives processed chats/logs)

### What It Knows

**File Structure:**
- Project root: `/Users/jencortez-walters/brandedflow`
- Client folders: `clients/{client-name}/`
- Systems: `systems/{system-name}/`
- Trackers: `systems/trackers/`
- Dashboard: `systems/dashboard/`

**Protected Files:**
- Knows which files are protected
- Excludes from auto-updates
- Requires explicit approval

**Archive Locations:**
- Chats: `systems/trackers/archive/{date}/`
- Logs: `systems/trackers/{log_type}/Processed/`

### What It Doesn't Do (Yet)

**File Updates:**
- ❌ Does NOT automatically update files based on decisions
- ❌ Does NOT know which files to update for which decisions
- ✅ You approve updates manually in dashboard

**Superseded File Archiving:**
- ❌ Does NOT automatically archive superseded files
- ❌ Does NOT detect when files are superseded
- ✅ Only archives processed chats/logs (not project files)

---

## What Happens to Superseded Files

### Current Behavior

**Chats/Logs:**
- ✅ Processed chats → Archived to `archive/{date}/`
- ✅ Processed logs → Moved to `Processed/` folder
- ✅ Inbox stays clean

**Project Files:**
- ⚠️ **NOT automatically archived** when superseded
- ⚠️ **NOT detected** as superseded
- ✅ You manually manage project files

### Example

**Scenario:**
- ChatGPT creates `old-approach.md`
- Cursor creates `new-approach.md` (supersedes old)

**What happens:**
- ✅ Decisions extracted (old and new)
- ✅ Superseded detection: Old decision marked as superseded
- ✅ Dashboard shows: Only new decision (latest version)
- ⚠️ **Files NOT archived** - both files remain
- ⚠️ **You manually decide** what to do with old file

---

## Enhancing File Management

### Could Add (Future)

1. **File Update Detection**
   - Detect which files need updating based on decisions
   - Map decisions to file paths
   - Propose updates in dashboard

2. **Superseded File Archiving**
   - Detect when files are superseded
   - Archive old files automatically
   - Keep project clean

3. **File Structure Rules**
   - Understand which files go where
   - Validate file locations
   - Suggest correct locations

---

## Complete Workflow

### Daily Run

```
You: Double-click desktop button (or ask Cursor)
    ↓
System: Collects all chats/logs
    ↓
System: Extracts decisions/tasks/notes
    ↓
System: Detects conflicts & superseded
    ↓
System: Filters done items
    ↓
System: Creates dashboard HTML
    ↓
System: Creates wallpaper PNG
    ↓
System: Sets wallpaper as desktop background ✅
    ↓
System: Opens Dashboard.app
    ↓
System: Archives processed files
    ↓
You: See dashboard on desktop (always visible!)
```

---

## What You See

### Desktop Wallpaper (Always Visible)

**Shows:**
- Top 3 tasks (do these first)
- Latest decisions
- Notes
- Timestamp

**Format:** PNG image (static, not interactive)

**Updates:** Every time you run Daily Ops Engine

### Dashboard HTML (Interactive)

**Shows:**
- Top 3 tasks
- Latest decisions
- Latest tasks
- Notes
- File links

**Format:** HTML page (clickable, interactive)

**Opens:** In browser or Dashboard.app

---

## Current Limitations

### What It Doesn't Do

1. **File Updates**
   - ❌ Doesn't automatically update files
   - ❌ Doesn't know which files to update
   - ✅ You approve manually

2. **Superseded File Archiving**
   - ❌ Doesn't archive superseded project files
   - ❌ Doesn't detect file supersession
   - ✅ Only archives processed chats/logs

3. **File Structure Intelligence**
   - ⚠️ Knows structure but doesn't auto-organize
   - ⚠️ Doesn't validate file locations
   - ✅ Respects protected files

---

## Summary

### What It Does ✅

- ✅ Collects all chats/logs
- ✅ Extracts decisions/tasks/notes
- ✅ Detects conflicts
- ✅ Detects superseded decisions
- ✅ Filters done items
- ✅ Creates dashboard HTML
- ✅ Creates desktop wallpaper (always visible!)
- ✅ Archives processed chats/logs
- ✅ Knows file structure
- ✅ Respects protected files

### What It Doesn't Do (Yet) ⚠️

- ⚠️ Auto-update files (you approve manually)
- ⚠️ Archive superseded project files (only archives chats/logs)
- ⚠️ Auto-organize files (knows structure but doesn't move files)

### Desktop Display ✅

- ✅ Wallpaper PNG generated
- ✅ Set as desktop background automatically
- ✅ Always visible on your desktop
- ✅ Updates every run
- ✅ Shows: Top 3, Decisions, Notes

**Your dashboard is always in your face - it's your desktop wallpaper!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Desktop Wallpaper Working

