# Daily Ops App - Complete Explanation

## What It Does (In Its Entirety)

### The Complete Pipeline

**When you run Daily Ops Engine:**

```
1. COLLECT
   ├─ External chats (conversations_to_process/)
   ├─ Work logs (work_logs/) - Cursor work
   └─ Self-annealing logs (self_annealing_logs/) - Fixes

2. PROCESS
   ├─ Extract decisions/tasks/notes
   ├─ Detect conflicts (similar items)
   ├─ Detect superseded (older versions)
   ├─ Filter done items (checkbox system)
   └─ Track versions

3. CREATE
   ├─ decisions-log.md (pending decisions)
   ├─ tasks.md (pending tasks)
   ├─ notes.md (notes)
   ├─ daily-summary.md (full summary)
   ├─ conflicts.md (conflicting items)
   ├─ superseded-decisions.md (superseded items)
   ├─ item_status.json (done/pending)
   └─ decision_versions.json (all versions)

4. BUILD
   ├─ Dashboard HTML (interactive)
   └─ Wallpaper PNG (desktop background)

5. DISPLAY
   ├─ Set wallpaper as desktop background ✅
   └─ Open Dashboard.app

6. ARCHIVE
   ├─ Chats → archive/{date}/
   └─ Logs → Processed/ folders
```

---

## Desktop Display - Always in Your Face

### How It Shows on Desktop

**The wallpaper system:**

1. **Generates PNG image** (1920x1080)
   - Location: `systems/dashboard/wallpaper/wallpaper.png`
   - Content: Top 3 tasks, Decisions, Notes, Timestamp
   - Format: Static PNG (not interactive)

2. **Sets as macOS wallpaper**
   - Uses AppleScript: `tell application "Finder" set desktop picture to...`
   - **Automatically applied** after generation
   - **Always visible** - your desktop background!

3. **Updates automatically**
   - Every time you run Daily Ops Engine
   - Desktop button → Updates wallpaper
   - Cursor "run daily ops" → Updates wallpaper

### What You See on Desktop

**Wallpaper shows:**
```
┌─────────────────────────────────────────┐
│ BrandedFlow Dashboard                   │
│                                         │
│ Top 3 Priorities                        │
│ - Task 1 (do this first)                │
│ - Task 2                                │
│ - Task 3                                │
│                                         │
│ Recent Decisions                        │
│ - Decision 1                            │
│ - Decision 2                            │
│                                         │
│ Notes                                   │
│ - Note 1                                │
│                                         │
│ Updated 2024-12-08 22:00               │
└─────────────────────────────────────────┘
```

**Always visible - can't miss it!**

---

## File Structure Understanding

### What It Knows ✅

**Project Structure:**
- ✅ Project root: `/Users/jencortez-walters/brandedflow`
- ✅ Client folders: `clients/{client-name}/`
- ✅ Systems: `systems/{system-name}/`
- ✅ Trackers: `systems/trackers/`
- ✅ Dashboard: `systems/dashboard/`

**Protected Files:**
- ✅ Knows which files are protected
- ✅ Won't update without approval
- ✅ Excludes from commits

**Archive Locations:**
- ✅ Chats: `systems/trackers/archive/{date}/`
- ✅ Logs: `systems/trackers/{log_type}/Processed/`

### What It Doesn't Do (Yet) ⚠️

**File Updates:**
- ⚠️ **Does NOT automatically update files**
- ⚠️ **Does NOT know which files to update for which decisions**
- ✅ You approve updates manually in dashboard
- ✅ `proposed_updates.md` is just a placeholder

**Superseded File Archiving:**
- ⚠️ **Does NOT automatically archive superseded project files**
- ⚠️ **Only archives processed chats/logs** (not project files)
- ✅ You manually manage project files

**Example:**
- ChatGPT creates `old-approach.md`
- Cursor creates `new-approach.md` (supersedes)
- ✅ Decisions: Old marked as superseded
- ⚠️ **Files: Both remain** (not archived automatically)

---

## What Gets Archived

### Currently Archived ✅

**Chats:**
- External chats → `systems/trackers/archive/{date}/`
- Processed after extraction
- Organized by date

**Logs:**
- Work logs → `systems/trackers/work_logs/Processed/`
- Self-annealing logs → `systems/trackers/self_annealing_logs/Processed/`
- Processed after extraction

### NOT Archived (Yet) ⚠️

**Project Files:**
- Superseded files remain in place
- Not automatically detected
- Not automatically archived
- You manually manage

**Why:**
- System doesn't know which files are superseded
- Only knows which decisions are superseded
- File-to-decision mapping not implemented

---

## Complete Daily Ops Flow

### Step-by-Step

1. **You trigger** (desktop button or Cursor)

2. **System collects:**
   - External chats from `conversations_to_process/`
   - Work logs from `work_logs/`
   - Self-annealing logs from `self_annealing_logs/`

3. **System processes:**
   - Extracts decisions/tasks/notes
   - Detects conflicts (70%+ similarity)
   - Detects superseded decisions (older versions)
   - Filters done items (checkbox system)
   - Tracks decision versions

4. **System creates:**
   - Dashboard HTML (`systems/dashboard/html/index.html`)
   - Wallpaper PNG (`systems/dashboard/wallpaper/wallpaper.png`)
   - Status files (decisions, tasks, notes, conflicts, superseded)

5. **System displays:**
   - **Sets wallpaper as desktop background** ✅
   - Opens Dashboard.app (if exists)
   - Shows everything

6. **System archives:**
   - Moves processed chats to `archive/{date}/`
   - Moves processed logs to `Processed/`
   - Keeps inbox clean

---

## Answers to Your Questions

### 1. What does Daily Ops do in its entirety?

**Everything:**
- Collects all chats/logs
- Processes everything
- Extracts decisions/tasks/notes
- Detects conflicts & superseded
- Creates dashboard & wallpaper
- **Sets wallpaper as desktop background**
- Archives processed files

### 2. Does it show on desktop?

**YES! ✅**
- Generates PNG wallpaper
- **Automatically sets as desktop background**
- **Always visible** - can't miss it!
- Updates every run

### 3. Does it understand file structure?

**YES, partially ✅**
- ✅ Knows project structure
- ✅ Knows client folders
- ✅ Knows systems folders
- ✅ Knows protected files
- ⚠️ Doesn't auto-update files
- ⚠️ Doesn't auto-archive superseded project files

### 4. Does it know what files to update where?

**NO, not yet ⚠️**
- ⚠️ Doesn't automatically know which files to update
- ⚠️ Doesn't map decisions to file updates
- ✅ You approve updates manually
- ✅ Protected files excluded automatically

### 5. Does it archive superseded files?

**NO, not yet ⚠️**
- ✅ Archives processed chats/logs
- ⚠️ Does NOT archive superseded project files
- ⚠️ Only knows which decisions are superseded (not files)
- ✅ You manually manage project files

---

## Summary

### What It Does ✅

- ✅ Collects all chats/logs
- ✅ Processes everything
- ✅ Extracts decisions/tasks/notes
- ✅ Detects conflicts & superseded
- ✅ Creates dashboard HTML
- ✅ Creates wallpaper PNG
- ✅ **Sets wallpaper as desktop background** (always visible!)
- ✅ Archives processed chats/logs
- ✅ Knows file structure
- ✅ Respects protected files

### What It Doesn't Do (Yet) ⚠️

- ⚠️ Auto-update files (you approve manually)
- ⚠️ Archive superseded project files (only archives chats/logs)
- ⚠️ Map decisions to file updates (doesn't know which files to update)

### Desktop Display ✅

- ✅ **Wallpaper PNG** generated
- ✅ **Automatically set** as desktop background
- ✅ **Always visible** - your desktop shows the dashboard!
- ✅ **Updates** every run
- ✅ **Shows** Top 3, Decisions, Notes

**Your dashboard is always in your face - it's your desktop wallpaper!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Desktop Wallpaper Working

