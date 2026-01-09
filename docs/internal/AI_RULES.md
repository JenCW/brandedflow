# AI ASSISTANT RULES FOR BRANDED + FLOW
**Applies to:** Claude Code, Cursor, Cursor Composer, ChatGPT, all AI tools
**Last Updated:** December 4, 2024
**Status:** MANDATORY - Must follow before taking any action

---

## ⚠️ STOP AND READ FIRST

Before creating ANY file, folder, or making changes:
1. Read [docs/internal/CONTEXT.md](docs/internal/CONTEXT.md) to understand current state
2. Follow the folder structure rules below
3. Follow the naming conventions below
4. Update documentation per [company/operations/UPDATE_CHECKLIST.md](company/operations/UPDATE_CHECKLIST.md)

**If you violate these rules, you will create confusion and duplicate work.**

---

## 📁 FOLDER STRUCTURE RULES

### ✅ APPROVED Folder Locations

**For CLIENT work:**
- `clients/{client-name}/` - All client deliverables, proposals, assets
- `clients/{client-name}/04_website/` - Website files for Netlify deployment (Next.js or static)
- Example: `clients/luxe-fine-dining/pitch-deck.pdf` (deliverable)
- Example: `clients/luxe-fine-dining/04_website/index.html` (website file)

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
- `automations/mcps/` - Reusable MCP code
- `automations/workflows/` - Reusable n8n workflows, scripts
- `automations/prompts/` - Reusable AI prompts and templates

**For SYSTEMS:**
- `systems/{system-name}/` - Operational systems, deterministic tooling (MCP server, DOE engine, etc.)

**For TEMPLATES:**
- `templates/gamma-templates/` - Gamma presentation templates
- `templates/{template-type}/` - Other template categories

### ❌ NEVER Create These

- ❌ Random folders in project root (only the approved root folders in `project_config.md` are allowed)
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
- **Is this automation?** Goes in `automations/` or `systems/`

### 2. CHECK EXISTING STRUCTURE:
```bash
ls -la  # See what's at root level
ls -la clients/  # See existing clients
ls -la systems/  # See existing systems
```

### 3. ASK USER IF UNSURE:
"I want to create [X] for [Y purpose]. Should this go in:
- `systems/{new-system-name}/` (new operational system)
- `automations/workflows/` (reusable automation)
- `company/operations/` (internal process doc)
- Somewhere else?"

---

## 📋 AFTER CREATING FILES

**You MUST update documentation immediately:**

### Always Update:
1. **docs/internal/CONTEXT.md** - If it affects current priorities or status
2. **docs/internal/DECISIONS_LOG.md** - If you made a significant decision about what to create
3. **Git commit** - Commit with clear message about what was created and why

### Update If Relevant:
- **docs/internal/CLIENT_STATUS.md** - If related to client work
- **company/operations/TECH_STACK.md** - If you added/changed tools
- **docs/training/QUICK_STARTS.md** - If it affects service delivery
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
Forgetting to update docs/internal/CONTEXT.md
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
- **Read docs/internal/CONTEXT.md** - Every session start
- **Follow existing patterns** - Look at similar files first
- **Update docs immediately** - Don't defer to "later"

### ChatGPT / Deep Research
- **Suggest structure** - Don't create files (you can't)
- **Reference this file** - When planning implementations
- **Remind user** - To follow rules when implementing

---

## 🔍 QUICK CHECKLIST

Before creating anything, verify:
- [ ] I read docs/internal/CONTEXT.md to understand current state
- [ ] I checked if this already exists
- [ ] I know which of the 6 main folders this belongs in
- [ ] I'm using lowercase-kebab-case naming
- [ ] I will update docs/internal/CONTEXT.md after creating
- [ ] I will update docs/internal/DECISIONS_LOG.md if this is a new system/feature
- [ ] I will commit to git with clear message

**If you can't check all boxes, STOP and ask the user first.**

---

## 📞 WHEN IN DOUBT

**ASK:** "I want to create [X]. Based on AI_RULES.md, should this go in `systems/`, `automations/`, or somewhere else?"

**DON'T:** Just create it in a new root folder or random location.

---

## 🎯 DOE METHOD WORKFLOW

**Every task follows: Directive → Orchestrate → Execute**

### When to Use DOE

**Use DOE when task is:**
- ✅ **Recurring** (you'll do it multiple times)
- ✅ **Complex** (multiple steps, integrations, error-prone)
- ✅ **Needs consistency** (same quality every time)
- ✅ **Has edge cases** (things that can go wrong)

**Skip DOE when task is:**
- ❌ **One-off** (never repeated)
- ❌ **Simple** (single step, no complexity)
- ❌ **Exploratory** (figuring things out)
- ❌ **Quick fix** (under 5 minutes)

### The 3-Question Test

Before using DOE, ask:
1. Will I do this again? (Recurring)
2. Is this complex? (Multiple steps, integrations)
3. Does consistency matter? (Same quality every time)

**If 2+ answers are "Yes" → Use DOE**
**If 0-1 answers are "Yes" → Skip DOE, do it directly**

### Before Starting Any Task (If Using DOE):

1. **Check for Directive** (`systems/doe-engine/directives/`)
   - If exists: Read it first
   - If not: Ask if one should be created for recurring tasks

2. **Check for Execution Scripts** (`systems/doe-engine/execution/`)
   - Use existing scripts instead of rewriting
   - Create new scripts for deterministic operations
   - Only write code directly for prototyping

3. **Orchestrate** (Your job):
   - Read directive → understand goals
   - Call appropriate execution scripts
   - Handle errors gracefully
   - Update directives with learnings (ask first)

### Self-Annealing Loop:
Errors → Fix script → Test → Update directive → System improves

**See:** `systems/doe-engine/gemini.md` for full architecture details

---

## 🔄 VERSION HISTORY

**December 7, 2024** - Added DOE Method workflow section
**December 4, 2024** - Created after Cursor Composer violated folder structure rules
