# Daily Ops Desktop Display - How It Works

## Desktop Wallpaper System

### How It Shows on Desktop

**The system creates a PNG image that becomes your desktop wallpaper:**

1. **Generates PNG** - `systems/dashboard/wallpaper/wallpaper.png`
2. **Sets as wallpaper** - Uses macOS AppleScript to set desktop background
3. **Always visible** - Your desktop shows the dashboard content

### What Shows on Wallpaper

**Content displayed:**
- **Top 3 Priorities** - Tasks to do first
- **Recent Decisions** - Latest decisions made
- **Notes** - Important notes
- **Timestamp** - When it was last updated

**Format:**
- Static PNG image (1920x1080)
- Branded colors and layout
- Clean, readable design
- **Always on your desktop** - can't miss it!

### Wallpaper Updates

**When it updates:**
- Every time you run Daily Ops Engine
- Desktop button → Updates wallpaper
- Cursor "run daily ops" → Updates wallpaper

**How it updates:**
1. Processes all chats/logs
2. Extracts decisions/tasks/notes
3. Generates new PNG
4. **Automatically sets as desktop background**
5. You see it immediately!

---

## Dashboard App

### HTML Dashboard

**Location:** `systems/dashboard/html/index.html`

**Shows:**
- Top 3 tasks
- Latest decisions
- Latest tasks
- Notes
- File links

**Opens:**
- Dashboard.app (if on desktop)
- Or in your default browser

**Interactive:**
- Clickable links
- Full content
- Scrollable

---

## File Structure Understanding

### What It Knows ✅

**Project Structure:**
- ✅ Knows project root
- ✅ Knows client folders (`clients/{client-name}/`)
- ✅ Knows systems folders (`systems/{system-name}/`)
- ✅ Knows trackers location
- ✅ Knows dashboard location

**Protected Files:**
- ✅ Knows which files are protected
- ✅ Won't update without approval
- ✅ Excludes from commits by default

**Archive Locations:**
- ✅ Knows where to archive chats (`archive/{date}/`)
- ✅ Knows where to archive logs (`Processed/`)

### What It Doesn't Know (Yet) ⚠️

**File Updates:**
- ⚠️ Doesn't automatically know which files to update
- ⚠️ Doesn't map decisions to file updates
- ✅ You approve updates manually

**Superseded Files:**
- ⚠️ Doesn't automatically archive superseded project files
- ⚠️ Only archives processed chats/logs
- ✅ You manually manage project files

---

## Complete Daily Ops Flow

### Step-by-Step

1. **You trigger it** (desktop button or Cursor)

2. **System collects:**
   - External chats from inbox
   - Work logs (Cursor work)
   - Self-annealing logs (fixes)

3. **System processes:**
   - Extracts decisions/tasks/notes
   - Detects conflicts
   - Detects superseded decisions
   - Filters done items
   - Tracks versions

4. **System creates:**
   - Dashboard HTML
   - Wallpaper PNG
   - Status files
   - Conflict reports

5. **System displays:**
   - **Sets wallpaper as desktop background** ✅
   - Opens Dashboard.app
   - Shows everything

6. **System archives:**
   - Moves processed chats to archive
   - Moves processed logs to Processed/
   - Keeps inbox clean

---

## Desktop Wallpaper Details

### Visual Layout

**Wallpaper shows:**
```
┌─────────────────────────────────────────┐
│ BrandedFlow Dashboard                   │
│                                         │
│ Top 3 Priorities                        │
│ - Task 1                                │
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

**Always visible on your desktop!**

### Technical Details

**Image:**
- Format: PNG
- Size: 1920x1080 (standard desktop resolution)
- Location: `systems/dashboard/wallpaper/wallpaper.png`

**Setting Wallpaper:**
- Uses macOS AppleScript
- Command: `tell application "Finder" set desktop picture to...`
- **Automatically applied** after generation

---

## What Gets Archived

### Currently Archived ✅

**Chats:**
- External chats → `systems/trackers/archive/{date}/`
- Processed after extraction

**Logs:**
- Work logs → `systems/trackers/work_logs/Processed/`
- Self-annealing logs → `systems/trackers/self_annealing_logs/Processed/`
- Processed after extraction

### NOT Archived (Yet) ⚠️

**Project Files:**
- Superseded files remain in place
- Not automatically archived
- You manually manage

**Example:**
- Old approach file → Stays where it is
- New approach file → Created
- Both exist until you decide

---

## Summary

### What Daily Ops Does ✅

1. **Collects** all chats/logs
2. **Processes** everything
3. **Extracts** decisions/tasks/notes
4. **Detects** conflicts & superseded
5. **Creates** dashboard HTML
6. **Creates** wallpaper PNG
7. **Sets wallpaper** as desktop background ✅
8. **Opens** Dashboard.app
9. **Archives** processed files

### Desktop Display ✅

- ✅ **Wallpaper PNG** generated
- ✅ **Automatically set** as desktop background
- ✅ **Always visible** - can't miss it!
- ✅ **Updates** every run
- ✅ **Shows** Top 3, Decisions, Notes

### File Structure ✅

- ✅ **Knows** your file structure
- ✅ **Respects** protected files
- ✅ **Archives** processed chats/logs
- ⚠️ **Doesn't** auto-update files (you approve)
- ⚠️ **Doesn't** archive superseded project files (you manage)

**Your dashboard is always in your face - it's your desktop wallpaper!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Desktop Wallpaper Working

