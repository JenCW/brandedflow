# Quick Start - Context Automation

## 🚀 Get Started in 2 Minutes

### Option 1: Web Dashboard (Easiest)
```bash
open automation-system/context_dashboard.html
```
Opens a visual dashboard showing all context file statuses.

### Option 2: Command Line
```bash
# Check status
python3 automation-system/context_manager.py

# Or use the quick script
./automation-system/check_context.sh
```

### Option 3: Install Git Hook (Automatic Prompts)
```bash
cd /Users/jencortez-walters/brandedflow
ln -s automation-system/git-hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Now every time you commit, you'll be prompted if CONTEXT.md needs updating!

## 📋 What Gets Automated

✅ **Checks file ages** - Warns if CONTEXT.md is >3 days old  
✅ **Suggests updates** - Shows what needs attention  
✅ **Updates dates** - Can auto-update "Last Updated" in CONTEXT.md  
✅ **Git integration** - Prompts before commits if docs are stale  

## 🎯 Your Source of Truth

**CONTEXT.md** = Your master "start here" file
- Updated when priorities change
- Updated when client status changes  
- Should be reviewed weekly

**Other docs** update when their specific areas change:
- CLIENT_STATUS.md → when clients change
- DECISIONS_LOG.md → when decisions are made
- TECH_STACK.md → when tools change
- QUICK_STARTS.md → when services change

See [UPDATE_CHECKLIST.md](../company/operations/UPDATE_CHECKLIST.md) for full details.

## 💡 Daily Workflow

1. **Morning:** Run `python3 automation-system/context_manager.py` to check status
2. **When making changes:** Update the relevant doc (see checklist)
3. **Before committing:** Git hook will remind you if CONTEXT.md needs updating
4. **Weekly:** Review all context files for accuracy

That's it! The system helps you remember what needs updating, but you're still in control.

