# Branded + Flow Systems Explained

## Two Separate Systems

### 1. Daily Ops Engine (Python)
**Purpose:** Internal operations, dashboard building, task extraction

**What it does:**
- Extracts decisions/tasks from chat files
- Builds "Daily Ops Package" for your approval
- Runs maintenance tasks
- Builds dashboards
- Runs on schedule (daily/weekly)

**Location:** `systems/automation-engine/`

**When it runs:**
- Scheduled (daily/weekly)
- Or manually: `python3 systems/automation-engine/run_daily.py`

**Not part of:** MCP Server or DOE method

---

### 2. MCP Server (Node.js)
**Purpose:** Execution layer for DOE method

**What it does:**
- Runs MCPs (automations) that Cursor calls
- HTTP server that executes deterministic operations
- Used when you ask Cursor to do something

**Location:** `systems/mcp-server/`

**When it runs:**
- Always running (background process)
- Cursor calls it via HTTP when needed

**Part of:** DOE method (Execution layer)

---

## How They Work Together

### Daily Ops Engine
```
Runs on schedule
    ↓
Extracts tasks/decisions from chats
    ↓
Builds dashboard
    ↓
Opens dashboard for your approval
```

**Independent system** - doesn't need MCP server

---

### MCP Server
```
You ask Cursor to do something
    ↓
Cursor calls MCP server (via HTTP)
    ↓
MCP server executes automation
    ↓
Result returned to Cursor
```

**Part of DOE method** - used by Cursor

---

## Summary

| System | Language | Purpose | When Used |
|--------|----------|---------|-----------|
| **Daily Ops Engine** | Python | Internal ops, dashboards | Scheduled/daily |
| **MCP Server** | Node.js | Execute MCPs for Cursor | When Cursor needs it |

**They are separate and serve different purposes.**

---

## Quick Reference

**Daily Ops Engine:**
- Internal operations
- Dashboard building
- Task extraction
- Runs on schedule

**MCP Server:**
- Execution layer for DOE
- Runs MCPs for Cursor
- Always running
- Called by Cursor when needed

