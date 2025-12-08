# Morning Workflow - Complete Guide

## Your Morning Routine

### Step 1: Double-Click Dashboard App

**What happens:**
- Daily Ops Engine runs
- Processes all chats/logs from yesterday
- Extracts decisions, tasks, notes
- Builds dashboard HTML
- Creates wallpaper PNG
- Sets wallpaper as desktop background
- Opens Dashboard.app

**What you see:**
- Dashboard HTML (interactive)
- Desktop wallpaper (always visible)
- All pending tasks (done items filtered out)
- All pending decisions (done items filtered out)
- All notes
- Critical files needing commits

---

## Your Workflow

### 1. Decisions ✅

**What you see:**
- All decisions from yesterday
- Log has been updated automatically

**What you do:**
- ✅ **Nothing** - Just review and understand
- Decisions are logged automatically
- No action needed

**Note:** Decisions are informational - they're logged for reference.

---

### 2. Commits 🔍

**What you see:**
- Critical files section on wallpaper
- Shows protected files with uncommitted changes
- Shows critical directories needing attention

**What you do:**
1. **Review major decisions** - Check if they're accurate
2. **Commit accurate ones:**
   ```javascript
   await callMCP('create-git-commit', {
     include_work_summary: true,
     include_protected: false  // Excludes protected files
   });
   ```
3. **Delete inaccurate ones:**
   - Remove from decisions-log.md if needed
   - Or mark as done if you want to keep record

**Critical files shown:**
- Protected files with changes
- Critical directories
- Always-critical files (MASTER_RULES.md, etc.)

---

### 3. Notes 📝

**What you see:**
- All notes from yesterday
- Notes section on dashboard/wallpaper

**What you do:**
- ✅ **Review and note them**
- No action needed (just informational)
- Can mark as done if you've addressed them

---

### 4. Tasks ✅

**What you see:**
- All pending tasks (done items filtered out)
- Complete to-do list

**What you do:**
1. **Complete tasks** as you work
2. **Mark as done** when finished:
   ```javascript
   await callMCP('mark-item-done', {
     item_type: 'tasks',
     item_text: 'Task: Your task text here'
   });
   ```
3. **Tasks disappear** from dashboard/wallpaper
4. **Remaining tasks** stay for tomorrow

**How it works:**
- Mark task as done → Disappears from dashboard
- Next Daily Ops run → Task stays filtered out
- Only pending tasks show up

---

## Complete Flow

### Morning (8 AM)

1. **Double-click Dashboard.app**
   - System processes yesterday's work
   - Dashboard updates
   - Wallpaper updates

2. **Review Dashboard**
   - See all decisions (understand, no action)
   - See critical files (review for commits)
   - See notes (review and note)
   - See all tasks (work through them)

3. **Handle Commits**
   - Review major decisions
   - Commit accurate ones
   - Delete inaccurate ones

4. **Work Through Tasks**
   - Complete tasks
   - Mark as done
   - They disappear

### During Day

- **Complete tasks** → Mark as done
- **They disappear** from dashboard
- **Remaining tasks** stay visible

### Next Morning

- **Done tasks** don't show up
- **Pending tasks** remain
- **New tasks** from yesterday added
- **Clean slate** for new day

---

## How Done Items Work

### Marking Items as Done

**Via MCP:**
```javascript
await callMCP('mark-item-done', {
  item_type: 'tasks',  // or 'decisions' or 'notes'
  item_text: 'Task: Your task text'
});
```

**What happens:**
- Item marked as done in `item_status.json`
- Item filtered out from dashboard
- Item filtered out from wallpaper
- Item stays in tracker file (for history)

### Filtering

**When Daily Ops runs:**
- Reads all items from tracker files
- Filters out done items using StatusTracker
- Only pending items show in dashboard/wallpaper

**Result:**
- Done tasks don't clutter dashboard
- Only active items visible
- Clean, focused view

---

## Dashboard Sections

### Decisions Section

**Shows:**
- All pending decisions
- Done decisions filtered out

**Action:**
- Review and understand
- No action needed (just informational)

### Commits Section (Critical Files)

**Shows:**
- Protected files with changes
- Critical directories
- Always-critical files

**Action:**
- Review major decisions
- Commit accurate ones
- Delete inaccurate ones

### Notes Section

**Shows:**
- All pending notes
- Done notes filtered out

**Action:**
- Review and note them
- Mark as done if addressed

### Tasks Section

**Shows:**
- All pending tasks
- Done tasks filtered out

**Action:**
- Complete tasks
- Mark as done
- They disappear

---

## Summary

### Your Workflow ✅

1. **Morning:** Double-click → See dashboard
2. **Decisions:** Review, understand, no action
3. **Commits:** Review major decisions, commit accurate ones, delete inaccurate ones
4. **Notes:** Review and note them
5. **Tasks:** Complete, mark as done, they disappear

### How It Works ✅

- ✅ Done items filtered out automatically
- ✅ Only pending items show
- ✅ Mark as done → Disappears
- ✅ Remaining tasks stay for tomorrow
- ✅ Clean dashboard every morning

**Your workflow is exactly as you described!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Workflow Working

