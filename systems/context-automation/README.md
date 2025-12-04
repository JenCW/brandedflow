# Context File Automation System

Active system to keep your Branded + Flow documentation current and accurate.

## 🚀 Quick Start

**Easiest way:**
```bash
./systems/context-automation/run.command
```
Double-click `run.command` in Finder, or run from Terminal.

**Or from project root:**
```bash
cd /Users/jencortez-walters/brandedflow
./systems/context-automation/update_and_open.sh
```

## 📋 Checklist Prompts

When you make changes, get prompted with what to update:

```bash
./systems/context-automation/prompt_checklist.sh client_won
```

Available types: `client_won`, `client_lost`, `service_added`, `decision_made`, `priority_changed`, `tool_added`, `mcp_built`, `tech_changed`

## 📁 Files

- `context_manager.py` - Main Python script
- `context_dashboard.html` - Web dashboard
- `update_and_open.sh` - Update status and open dashboard
- `prompt_checklist.sh` - Show checklist prompts
- `run.command` - Double-click to run
- `git-hooks/pre-commit` - Git hook (optional)

## 🔄 How It Works

1. Checks how old your context files are
2. Suggests what needs updating
3. Shows checklist prompts based on UPDATE_CHECKLIST.md
4. Opens visual dashboard in browser

## 📖 Documentation

See [company/operations/UPDATE_CHECKLIST.md](../../company/operations/UPDATE_CHECKLIST.md) for what gets updated when.

