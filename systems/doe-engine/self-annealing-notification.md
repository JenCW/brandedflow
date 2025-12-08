# Self-Annealing Notification System

## The Problem

When the AI self-anneals (fixes errors, updates directives, documents learnings), you don't know about it because:
- No chat file is created
- Dashboard doesn't get updated
- Changes happen silently

## The Solution

### Automatic Logging

**Every time I self-anneal, I will:**
1. **Log the action** using `log-self-annealing` MCP
2. **Create a log file** in `systems/trackers/self_annealing_logs/`
3. **Format it** so Daily Ops Engine can process it
4. **Include details:** What broke, how fixed, what was learned

### Daily Ops Engine Integration

**The Daily Ops Engine will:**
1. **Process self-annealing logs** along with chat files
2. **Extract decisions/tasks** from self-annealing actions
3. **Show in dashboard** what was fixed/updated
4. **Track learnings** over time

---

## How It Works

### When I Self-Anneal

```
Error/Variation Detected
    ↓
I Fix It (MCP, directive, etc.)
    ↓
I Call: log-self-annealing MCP
    ↓
Log File Created: systems/trackers/self_annealing_logs/self-annealing-{timestamp}.txt
    ↓
Daily Ops Engine Processes It (next run)
    ↓
Appears in Dashboard
    ↓
You See What Was Fixed
```

### Log File Format

The log files are formatted like chat files so Daily Ops Engine can process them:

```
SELF-ANNEALING ACTION LOG
Timestamp: 2024-12-08T21:00:00Z
Action Type: error_fix

What Broke/Variation: MCP failed when client name has spaces
How Fixed: Updated MCP to convert spaces to hyphens
Directive Updated: build-client-website.md
MCP Updated: create-client-folder.js
Learning: Always validate client names before processing
Context: Client "test client" caused error, now handled automatically
```

---

## What Gets Logged

### Action Types

1. **error_fix** - MCP or process broke, was fixed
2. **variation_handled** - New variation encountered, handled
3. **directive_updated** - Directive was updated with learnings
4. **mcp_updated** - MCP was fixed or improved
5. **learning_documented** - New learning was documented

### Information Captured

- **What broke** - The error or variation
- **How fixed** - The solution
- **Directive updated** - Which directive (if any)
- **MCP updated** - Which MCP (if any)
- **Learning** - What was learned
- **Context** - Additional details

---

## How to View Self-Annealing Actions

### Option 1: Dashboard (Automatic)
- Run Daily Ops Engine
- Self-annealing logs are processed
- Appear in dashboard as decisions/tasks/notes
- You see what was fixed

### Option 2: Summary Log (Manual)
- Location: `systems/trackers/self_annealing_logs/summary.json`
- Contains last 100 self-annealing actions
- JSON format for easy reading

### Option 3: Individual Log Files
- Location: `systems/trackers/self_annealing_logs/`
- One file per self-annealing action
- Timestamped for easy tracking

---

## Example Workflow

### Scenario: MCP Breaks

**1. Error Occurs:**
```
You: "Create client folder for test client"
Me: [MCP fails - spaces in name cause error]
```

**2. I Self-Anneal:**
```
Me: [Fixes MCP to handle spaces]
Me: [Calls log-self-annealing MCP]
```

**3. Log Created:**
```
File: systems/trackers/self_annealing_logs/self-annealing-2024-12-08T21-00-00.txt
Content: Error fix logged with details
```

**4. You See It:**
```
Next Daily Ops Run → Dashboard shows:
"Fixed: MCP now handles spaces in client names"
```

---

## Integration with Daily Ops Engine

### Current Process
```
Chat Files → Daily Ops Engine → Dashboard
```

### With Self-Annealing Logs
```
Chat Files → Daily Ops Engine → Dashboard
Self-Annealing Logs → Daily Ops Engine → Dashboard
```

**Both are processed the same way!**

---

## Benefits

✅ **Transparency** - You see what was fixed
✅ **Accountability** - All changes are logged
✅ **Learning** - Track improvements over time
✅ **Dashboard Integration** - Appears automatically
✅ **History** - Can review what was fixed when

---

## Status

**Implementation:**
- ✅ `log-self-annealing` MCP created
- ✅ Log directory structure set up
- ✅ Format matches Daily Ops Engine processing
- ⚠️ Daily Ops Engine needs to process self-annealing logs (may need update)

**Next Steps:**
1. Test the logging MCP
2. Verify Daily Ops Engine processes the logs
3. Update Daily Ops Engine if needed to handle self-annealing logs

---

**Last Updated:** December 8, 2024
**Status:** Active

