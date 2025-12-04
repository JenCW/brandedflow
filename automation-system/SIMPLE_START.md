# Simple Start Guide

## 🎯 One Command to Rule Them All

Just run this:

```bash
./automation-system/update_and_open.sh
```

That's it. It updates everything and opens a dashboard in your browser.

---

## 📋 Checklist Prompts

When you make changes, get prompted with what to update:

```bash
# When you win a client
./automation-system/prompt_checklist.sh client_won

# When you make a decision
./automation-system/prompt_checklist.sh decision_made

# When you add a tool
./automation-system/prompt_checklist.sh tool_added
```

It will walk you through each checklist item!

**Available prompts:**
- `client_won` - New client
- `client_lost` - Lost client  
- `service_added` - New/changed service
- `decision_made` - Major decision
- `priority_changed` - Priorities changed
- `tool_added` - New tool
- `mcp_built` - Built automation/MCP
- `tech_changed` - Tech stack changed

---

## 📊 What It Does

1. Checks how old your important files are
2. Shows you what needs updating
3. Opens a pretty dashboard in your browser
4. Prompts you with checklists when you make changes

---

## 🔄 When to Use It

**Every morning:** Run `./automation-system/update_and_open.sh` to see what needs attention

**When you make changes:** Run `./automation-system/prompt_checklist.sh <change_type>` to get prompted

**Before committing:** Run it to make sure CONTEXT.md is updated

---

## 💡 That's It!

Just remember:
- `./automation-system/update_and_open.sh` - Check status
- `./automation-system/prompt_checklist.sh <type>` - Get checklist prompts

The dashboard will show you everything else.
