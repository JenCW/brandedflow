# How Daily Ops Engine Works

## The Workflow

### Step 1: Feed Chats from Any Platform
- Copy/paste chat from **any platform** (ChatGPT, Claude, Cursor, etc.)
- Save to: `systems/trackers/conversations_to_process/`
- The inbox folder collects all chats

### Step 2: Trigger Daily Ops
**Two ways to trigger:**

#### Option A: Desktop Button (Still Works!)
- Double-click the desktop button
- Runs: `systems/automation-engine/run_daily.py`
- Processes chats → Builds dashboard → Opens dashboard

#### Option B: Via Cursor (New!)
- Ask Cursor: "Run daily ops"
- I call the `run-daily-ops` MCP
- MCP runs the **same Python script** (`run_daily.py`)
- Same result: Processes chats → Builds dashboard → Opens dashboard

### Step 3: Processing
The Daily Ops Engine:
1. **Collects chats** from `systems/trackers/conversations_to_process/`
2. **Extracts** decisions, tasks, notes
3. **Builds dashboard** with extracted info
4. **Archives** processed chats
5. **Opens dashboard** for review

---

## How It Works with Cursor

### The MCP Calls the Same Python Script

**Desktop Button:**
```bash
python3 systems/automation-engine/run_daily.py
```

**MCP (via Cursor):**
```bash
python3 systems/automation-engine/run_daily.py
```

**Same script, same result!**

### The Workflow is Identical

1. **You feed chats** → Save to `systems/trackers/conversations_to_process/`
2. **You trigger** → Desktop button OR ask Cursor
3. **Engine processes** → Reads inbox, extracts, builds dashboard
4. **Dashboard opens** → Review decisions/tasks/notes

---

## Answering Your Questions

### Q: Will the desktop button still work?
**A: YES!** The desktop button runs the Python script directly. Nothing changed.

### Q: Will it work when you feed it chats from any platform?
**A: YES!** The MCP calls the same Python script that:
- Reads from `systems/trackers/conversations_to_process/`
- Processes chats from any platform (ChatGPT, Claude, Cursor, etc.)
- Extracts decisions/tasks/notes
- Builds dashboard

**The workflow is identical - just a different trigger method.**

---

## Summary

**Desktop Button:**
- Still works exactly as before
- Runs Python script directly
- Processes chats from inbox

**Cursor/MCP:**
- Calls the same Python script
- Same workflow, same results
- Just a different way to trigger it

**Both methods:**
- Read from the same inbox folder
- Process chats from any platform
- Extract decisions/tasks/notes
- Build dashboard
- Open dashboard

**Nothing changed about how it works - just added a new way to trigger it!**

