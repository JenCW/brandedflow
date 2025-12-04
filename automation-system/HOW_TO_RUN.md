# How to Run the Context Automation System

## 🎯 Three Easy Ways to Use It

### Option 1: Web Dashboard (Easiest - Just Open!)

```bash
open automation-system/context_dashboard.html
```

Or double-click `context_dashboard.html` in Finder.

This opens a beautiful visual dashboard in your browser showing:
- Status of all context files
- How old each file is
- Suggestions for what needs updating
- Quick action buttons

**Best for:** Quick visual check of everything

---

### Option 2: Command Line - Quick Check

```bash
# Simple status check (no interaction needed)
python3 automation-system/context_manager.py check
```

**Output:** Shows if CONTEXT.md is current or needs updating

**Best for:** Quick status check before starting work

---

### Option 3: Command Line - Interactive Mode

```bash
# Full interactive menu
python3 automation-system/context_manager.py
```

This opens an interactive menu where you can:
1. Update CONTEXT.md date
2. View full status report
3. Open UPDATE_CHECKLIST.md
4. Exit

**Best for:** When you want to actually update files

---

## 📋 Other Useful Commands

### Get Suggestions
```bash
python3 automation-system/context_manager.py suggest
```
Shows what files need updating and why

### Update CONTEXT.md Date
```bash
python3 automation-system/context_manager.py update-date
```
Automatically updates the "Last Updated" date in CONTEXT.md

### Full Status Report (JSON)
```bash
python3 automation-system/context_manager.py report
```
Detailed JSON report of all file statuses

### Quick Bash Script
```bash
./automation-system/check_context.sh
```
Runs both check and suggest commands

---

## 🔧 Install Git Hook (Optional - But Recommended!)

This makes git automatically remind you to update CONTEXT.md before committing:

```bash
cd /Users/jencortez-walters/brandedflow
ln -s automation-system/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

After this, every time you run `git commit`, it will check if CONTEXT.md is outdated and prompt you.

---

## 💡 Recommended Daily Workflow

**Morning:**
```bash
open automation-system/context_dashboard.html
```
Quick visual check - takes 5 seconds

**When Making Changes:**
- Update the relevant doc (see UPDATE_CHECKLIST.md)
- Run `python3 automation-system/context_manager.py update-date` if you updated CONTEXT.md

**Before Committing:**
- Git hook will automatically remind you if needed

---

## 🆘 Troubleshooting

**"command not found: python3"**
- Try `python` instead of `python3`
- Or install Python 3: `brew install python3`

**"Permission denied"**
- Make scripts executable: `chmod +x automation-system/*.sh`

**Dashboard won't open**
- Right-click `context_dashboard.html` → Open With → Browser
- Or drag it into your browser window

---

## 🎯 Start Here

**Easiest way (one command):**
```bash
./automation-system/update_and_open.sh
```

This will:
1. Update the status data
2. Open the dashboard automatically

**Or manually:**
```bash
# Step 1: Generate status data
python3 automation-system/context_manager.py update-json

# Step 2: Open dashboard
open automation-system/context_dashboard.html
```

The dashboard now shows **real data** from your actual files!

