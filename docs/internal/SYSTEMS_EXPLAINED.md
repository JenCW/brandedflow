# Branded + Flow Systems Explained

## Systems

### 1. MCP Server (Node.js)
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

## How It Works

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
| **MCP Server** | Node.js | Execute MCPs for Cursor | When Cursor needs it |

---

## Quick Reference

**MCP Server:**
- Execution layer for DOE
- Runs MCPs for Cursor
- Always running
- Part of DOE method (Execution layer)

**Note:** Daily Ops Engine was removed. Logs are stored in `systems/trackers/` for reference only.
- Called by Cursor when needed

