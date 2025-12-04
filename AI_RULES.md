# AI ASSISTANT RULES FOR BRANDED + FLOW
**Applies to:** Claude Code, Cursor, Cursor Composer, ChatGPT, all AI tools
**Last Updated:** December 4, 2024
**Status:** MANDATORY - Must follow before taking any action

---

## ⚠️ STOP AND READ FIRST

Before creating ANY file, folder, or making changes:
1. Read [docs/CONTEXT.md](docs/CONTEXT.md) to understand current state
2. Follow the folder structure rules below
3. Follow the naming conventions below
4. Update documentation per [company/operations/UPDATE_CHECKLIST.md](company/operations/UPDATE_CHECKLIST.md)

**If you violate these rules, you will create confusion and duplicate work.**

---

## 📁 FOLDER STRUCTURE RULES

### ✅ APPROVED Folder Locations

**For CLIENT work:**
- `clients/{client-name}/` - All client deliverables, proposals, assets
- Example: `clients/luxe-fine-dining/pitch-deck.pdf`

**For COMPANY operations:**
- `company/accounting/` - Financial tracking, invoices
- `company/email-logs/` - Email correspondence
- `company/operations/` - SOPs, checklists, internal processes
- `company/sales/` - Sales materials, proposals templates
- `company/templates/` - Reusable templates for client work
- `company/website/` - Branded + Flow's own website materials

**For DOCUMENTATION:**
- `docs/` - All business documentation (CONTEXT.md, CLIENT_STATUS.md, etc.)
- `docs/archive/` - Outdated versions of docs

**For AUTOMATION:**
- `automation-library/mcp-reference/` - MCP server examples and documentation
- `automation-library/workflows/` - Reusable n8n workflows, scripts
- `automation-library/prompts/` - Reusable AI prompts and templates

**For SYSTEMS:**
- `systems/daily-accountability/` - Daily task system (LIVE - don't break!)
- `systems/{system-name}/` - Other operational systems

**For TEMPLATES:**
- `templates/gamma-templates/` - Gamma presentation templates
- `templates/{template-type}/` - Other template categories

### ❌ NEVER Create These

- ❌ Folders in project root (except the 6 main folders above)
- ❌ Folders with CAPS names (use lowercase-kebab-case)
- ❌ Folders with spaces or underscores (use hyphens)
- ❌ `automation-system/` (deleted - don't recreate)
- ❌ `CLIENTS/` (renamed to `clients/`)
- ❌ `FOUNDATION.DOCS/` (moved to `docs/`)
- ❌ Random folders for "new features" without asking first

---

## 📝 NAMING CONVENTIONS

### File Names
- ✅ `lowercase-kebab-case.md`
- ✅ `update-checklist.md`
- ❌ `UPPERCASE_SNAKE_CASE.md`
- ❌ `camelCase.md`
- ❌ `spaces in names.md`

**Exception:** Documentation files that are all-caps are OK if that's the established pattern (CONTEXT.md, README.md, etc.)

### Folder Names
- ✅ `lowercase-kebab-case/`
- ✅ `daily-accountability/`
- ❌ `UPPERCASE/`
- ❌ `snake_case/`
- ❌ `Folder With Spaces/`

### Client Folder Names
- ✅ `clients/company-name/` (lowercase, hyphens)
- ✅ `clients/luxe-fine-dining/`
- ❌ `clients/LUXE_FINE_DINING/`
- ❌ `clients/Luxe Fine Dining/`

---

## 🔄 BEFORE CREATING ANYTHING

### 1. ASK YOURSELF:
- **Does this already exist?** Search first: `grep -r "feature_name"`
- **Where does this belong?** Use the folder structure above
- **Is this client work or company work?** Goes in `clients/` or `company/`
- **Is this documentation?** Goes in `docs/`
- **Is this automation?** Goes in `automation-library/` or `systems/`

### 2. CHECK EXISTING STRUCTURE:
```bash
ls -la  # See what's at root level
ls -la clients/  # See existing clients
ls -la systems/  # See existing systems
```

### 3. ASK USER IF UNSURE:
"I want to create [X] for [Y purpose]. Should this go in:
- `systems/{new-system-name}/` (new operational system)
- `automation-library/workflows/` (reusable automation)
- `company/operations/` (internal process doc)
- Somewhere else?"

---

## 📋 AFTER CREATING FILES

**You MUST update documentation immediately:**

### Always Update:
1. **docs/CONTEXT.md** - If affects current priorities or status
2. **docs/DECISIONS_LOG.md** - If you made a significant decision about what to create
3. **Git commit** - Commit with clear message about what was created and why

### Update If Relevant:
- **docs/CLIENT_STATUS.md** - If related to client work
- **docs/TECH_STACK.md** - If added new tools
- **docs/QUICK_STARTS.md** - If affects service delivery
- **company/operations/UPDATE_CHECKLIST.md** - If changes how things get updated

See [company/operations/UPDATE_CHECKLIST.md](company/operations/UPDATE_CHECKLIST.md) for complete guide.

---

## 🚫 COMMON VIOLATIONS TO AVOID

### ❌ DON'T DO THIS:
```
Creating new folder at root: /brandedflow/new-feature/
Creating automation-system/ (already deleted)
Creating files with CAPS_AND_UNDERSCORES.md
Creating files in random locations
Forgetting to update docs/CONTEXT.md
```

### ✅ DO THIS INSTEAD:
```
Ask where it should go first
Use established folder structure
Use lowercase-kebab-case naming
Update documentation immediately
Check if it already exists first
```

---

## 🎯 SPECIAL RULES BY AI TOOL

### Cursor Composer
- **STOP before creating folders** - Ask user where they should go
- **Read AI_RULES.md first** - Every session
- **Don't create entire systems** - Without discussing structure first

### Claude Code
- **Read docs/CONTEXT.md** - Every session start
- **Follow existing patterns** - Look at similar files first
- **Update docs immediately** - Don't defer to "later"

### ChatGPT / Deep Research
- **Suggest structure** - Don't create files (you can't)
- **Reference this file** - When planning implementations
- **Remind user** - To follow rules when implementing

---

## 🔍 QUICK CHECKLIST

Before creating anything, verify:
- [ ] I read docs/CONTEXT.md to understand current state
- [ ] I checked if this already exists
- [ ] I know which of the 6 main folders this belongs in
- [ ] I'm using lowercase-kebab-case naming
- [ ] I will update docs/CONTEXT.md after creating
- [ ] I will update docs/DECISIONS_LOG.md if this is a new system/feature
- [ ] I will commit to git with clear message

**If you can't check all boxes, STOP and ask the user first.**

---

## 📞 WHEN IN DOUBT

**ASK:** "I want to create [X]. Based on AI_RULES.md, should this go in `systems/`, `automation-library/`, or somewhere else?"

**DON'T:** Just create it in a new root folder or random location.

---

## 🔄 VERSION HISTORY

**December 4, 2024** - Created after Cursor Composer violated folder structure rules
