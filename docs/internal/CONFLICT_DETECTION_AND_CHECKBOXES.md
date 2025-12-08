# Conflict Detection and Checkbox System

## Overview

**Two new features:**
1. **Automatic Conflict Detection** - Flags similar/conflicting decisions/tasks/notes
2. **Checkbox System** - Items only removed when marked as done

---

## Conflict Detection

### How It Works

**Automatic detection:**
- Compares all decisions/tasks/notes
- Finds items with 70%+ similarity
- Flags them as potential conflicts
- Creates `conflicts.md` file

### What Gets Flagged

**Example:**
- "Use Python script for daily ops" (ChatGPT)
- "Use MCP server for daily ops" (Cursor)

**Detected as conflict** (similar topic, different approach)

### Where Conflicts Appear

**File:** `systems/trackers/conflicts.md`

**Format:**
```markdown
# Conflicts Detected

## Conflict Group (2 items, 75% similar)

- Decision: Use Python script for daily ops
- Decision: Use MCP server for daily ops
```

### How to Resolve

1. **Review conflicts.md** - See all conflicts
2. **Decide which is current** - Mark the one to keep
3. **Mark others as done** - Remove from dashboard
4. **Or update wording** - Make them distinct

---

## Checkbox System

### How It Works

**Items stay in dashboard until marked as done:**
- Decisions show with `[ ]` checkbox
- Tasks show with `[ ]` checkbox
- Notes show with `[ ]` checkbox
- Only removed when you mark them done

### Marking Items as Done

**Option 1: Via MCP (Cursor)**
```javascript
// Mark a decision as done
await callMCP('mark-item-done', {
  item_type: 'decisions',
  item_text: 'Decision: Use MCP server for daily ops'
});

// Mark a task as done
await callMCP('mark-item-done', {
  item_type: 'tasks',
  item_text: 'Task: Create MCP server'
});
```

**Option 2: Manual (Edit status file)**
- File: `systems/trackers/item_status.json`
- Set `done: true` for the item

**Option 3: Dashboard UI (Future)**
- Click checkbox in dashboard
- Automatically marks as done

### What Happens

**When marked as done:**
- Item removed from dashboard
- Status saved to `item_status.json`
- Next Daily Ops run filters it out
- Can be marked pending again if needed

**When marked as pending:**
- Item shows in dashboard again
- Status updated
- Next Daily Ops run includes it

---

## Dashboard Format

### Decisions/Tasks/Notes

**Format:**
```markdown
- [ ] Decision: Use MCP server for daily ops
- [ ] Task: Create MCP server
- [ ] Note: MCP approach is better
```

**Checkbox indicates:**
- `[ ]` = Pending (not done)
- `[x]` = Done (if manually checked, but system uses status file)

**System uses:** `item_status.json` to track done/pending

---

## Status File

**Location:** `systems/trackers/item_status.json`

**Format:**
```json
{
  "decisions": {
    "use mcp server for daily ops": {
      "done": true,
      "item": "Decision: Use MCP server for daily ops",
      "marked_done_at": "2024-12-08T22:00:00Z"
    }
  },
  "tasks": {
    "create mcp server": {
      "done": false,
      "item": "Task: Create MCP server"
    }
  },
  "notes": {}
}
```

---

## Workflow

### Daily Ops Engine Run

1. **Collects all files** (chats, work logs, self-annealing logs)
2. **Extracts decisions/tasks/notes**
3. **Detects conflicts** (automatic)
4. **Filters done items** (only pending show)
5. **Writes to dashboard** (with checkboxes)
6. **Writes conflicts** (to conflicts.md)

### You Review Dashboard

1. **See pending items** (with checkboxes)
2. **See conflicts** (in conflicts.md)
3. **Mark items as done** (via MCP or manual)
4. **Resolve conflicts** (decide which to keep)

### Next Run

1. **Done items filtered out** (don't show)
2. **Only pending items show** (what's left to do)
3. **New items added** (from new chats/logs)

---

## Examples

### Example 1: Marking Task as Done

**Dashboard shows:**
```
- [ ] Task: Create MCP server
- [ ] Task: Test MCP server
```

**You mark first as done:**
```javascript
await callMCP('mark-item-done', {
  item_type: 'tasks',
  item_text: 'Task: Create MCP server'
});
```

**Next run shows:**
```
- [ ] Task: Test MCP server
```

**First task removed (marked as done)**

### Example 2: Conflict Detection

**ChatGPT chat:**
```
decision: Use Python script for daily ops
```

**Cursor work:**
```
decision: Use MCP server for daily ops
```

**System detects conflict:**
- 75% similarity
- Flags in conflicts.md
- Both show in dashboard (pending)

**You decide:**
- MCP is current
- Mark Python as done
- Keep MCP pending

---

## Benefits

✅ **Conflict Detection** - Automatically finds similar items
✅ **Checkbox System** - Items stay until marked done
✅ **No Lost Items** - Nothing disappears automatically
✅ **Full Control** - You decide what's done
✅ **Conflict Resolution** - Easy to see and resolve conflicts

---

## Status

✅ **Conflict Detection** - Implemented and working
✅ **Status Tracker** - Tracks done/pending
✅ **Checkbox Format** - Items show with `[ ]`
✅ **MCPs Created** - mark-item-done, mark-item-pending
✅ **Daily Ops Updated** - Filters done items automatically

---

**Last Updated:** December 8, 2024
**Status:** Active and Working

