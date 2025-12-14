# MASTER RULES FOR BRANDED + FLOW
**Applies to:** All AI assistants (Claude, Cursor, ChatGPT, NotebookLM, etc.)
**Last Updated:** December 7, 2024
**Status:** SINGLE SOURCE OF TRUTH - Use this file for all AI platforms

---

## 📋 HOW TO USE THIS FILE

### For Cursor / Claude Code:
- This file is auto-loaded via `.cursorrules` and `.claude_code_rules`
- No action needed - rules are automatically applied

### For ChatGPT / Claude Web / NotebookLM / Other AIs:
**Copy and paste this entire file into your first message:**
```
"I'm working on the Branded + Flow project. Here are my rules:

[paste entire MASTER_RULES.md content]

Please follow these rules for all tasks."
```

**Or save it as a Custom Instruction:**
- ChatGPT: Settings → Custom Instructions → Paste this file
- Claude Web: Add to your knowledge base or paste in each conversation
- NotebookLM: Add as a source document

---

## 🚨 MANDATORY - READ FIRST

**Before creating, moving, or modifying ANY files:**

1. **READ FIRST:** This file (MASTER_RULES.md) - Complete rules
2. **READ CONTEXT:** `docs/internal/CONTEXT.md` - Current project state and priorities
3. **FOLLOW CHECKLIST:** `company/operations/UPDATE_CHECKLIST.md` - What to update when

**If you violate these rules, you will create confusion and duplicate work.**

---

## 🎯 DOE METHOD - MANDATORY WORKFLOW

**Before executing ANY task, follow the Directive → Orchestrate → Execute pattern:**

### Step 1: Assess Task (3-Question Test)
Before using DOE, quickly assess:
1. **Will this be done again?** (Recurring task)
2. **Is this complex?** (Multiple steps, integrations, error-prone)
3. **Does consistency matter?** (Same quality every time)

**If 2+ answers are "Yes" → Use DOE**
**If 0-1 answers are "Yes" → Skip DOE, do it directly**

### Step 2: Check for Directive (If Using DOE)
1. Search for existing directive: `systems/doe-engine/directives/{task-name}.md`
2. If directive exists: Read it fully before proceeding
3. If no directive exists:
   - For common/recurring tasks: Ask user if you should create one
   - For one-off tasks: Proceed but note what directive could be created

### Step 3: Check for Execution Tools (If Using DOE)
1. Before writing code, check:
   - `automations/mcps/` - For reusable MCPs (preferred location)
   - `systems/mcp-server/automations/` - Alternative location for MCPs (server runtime)
   - `systems/doe-engine/execution/` - For existing scripts

**Note:** 
- **Reusable MCPs** (the tools) go in `automations/mcps/`
- **Client-specific automation files** (workflows, assets, configs) go in `clients/{client-name}/04_automation/`
- MCP server code lives in `systems/mcp-server/` but loads MCPs from `automations/mcps/`
2. If MCP/script exists: Use it (don't rewrite)
3. If no tool exists: Use MCP Decision Framework to decide:
   
   **MCP Decision Framework:**
   - Is this task recurring? (2+ times)
   - Is this task deterministic? (Same inputs = same outputs)
   - Would an MCP make this more reliable? (Reduces errors)
   - Is this task complex enough? (Multiple steps, file ops, APIs)
   
   **If 3+ "Yes" → Create MCP automatically**
   **If 2 "Yes" → Ask user first**
   **If 0-1 "Yes" → Do it manually, no MCP needed**
4. Only write code directly if it's exploratory/prototyping

### Step 4: Orchestrate (Your Role)
- Read directive → Understand goals/inputs/outputs
- Decide which execution scripts to call
- Handle errors and edge cases
- Update directive with learnings (ask permission first)

### Step 5: Self-Anneal on Errors and Variations
When something breaks OR you encounter a variation:
1. **If error**: Fix the execution script/MCP, test it, update directive
2. **If variation**: Adapt process, document variation, update directive with new approach
3. **Learning**: Each variation makes the directive more flexible and reliable
4. **Evolution**: System improves over time, maintains DOE benefits even with custom requirements
5. **MANDATORY: Log the action** - Call `log-self-annealing` MCP to log what was fixed/updated

**Key principle**: Custom requirements don't mean losing reliability. Make directives flexible to handle variations, document learnings, system gets better.

**Transparency**: All self-annealing actions are logged and appear in dashboard. See `systems/doe-engine/AI_SELF_ANNEALING_RULES.md` for details.

### Step 6: Log All Work (MANDATORY)
**Every time you create, update, or complete work, you MUST log it:**
1. **After creating/updating directives** → Call `log-work-action` MCP
2. **After creating/updating MCPs** → Call `log-work-action` MCP
3. **After making decisions** → Call `log-work-action` MCP
4. **After creating/completing tasks** → Call `log-work-action` MCP
5. **After creating/updating important files** → Call `log-work-action` MCP

**All work is automatically logged and appears in dashboard. User only needs to add external chats manually.**

**See:** `systems/doe-engine/AI_WORK_LOGGING_RULES.md` for complete guide

**Key Principle:** Push complexity into deterministic scripts. You orchestrate, scripts execute.

**See:** `systems/doe-engine/gemini.md` for full architecture details

---

## 📁 FOLDER STRUCTURE (DO NOT VIOLATE)

**Only 6 folders exist at root level:**
- `clients/` - Client work
- `company/` - Company operations
- `docs/` - All documentation
- `automations/` - Reusable automation
- `systems/` - Operational systems
- `templates/` - Templates

**NEVER create folders at root level. NEVER use CAPS or underscores in folder names.**

### ✅ APPROVED Folder Locations

**For CLIENT work:**
- `clients/{client-name}/` - All client deliverables, proposals, assets
- `clients/{client-name}/03_website/` - Website files for Netlify deployment (HTML, CSS, JS)
- Example: `clients/luxe-fine-dining/pitch-deck.pdf` (deliverable)
- Example: `clients/luxe-fine-dining/03_website/index.html` (website file)

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
- `docs/internal/` - Internal strategy and context
- `docs/processes/` - Process documentation
- `docs/training/` - Training materials

**For AUTOMATION:**
- `automations/mcps/` - Reusable MCP code
- `automations/workflows/` - Reusable n8n workflows, scripts
- `automations/prompts/` - Reusable AI prompts and templates

**For SYSTEMS:**
- `systems/daily-accountability/` - Daily task system (LIVE - don't break!)
- `systems/doe-engine/` - DOE method directives and execution scripts
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

## 📝 NAMING CONVENTION

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
1. **docs/internal/CONTEXT.md** - If affects current priorities or status
2. **docs/internal/DECISIONS_LOG.md** - If you made a significant decision about what to create
3. **Git commit** - Commit with clear message about what was created and why

### Update If Relevant:
- **docs/internal/CLIENT_STATUS.md** - If related to client work
- **docs/internal/TECH_STACK.md** - If added new tools
- **docs/training/QUICK_STARTS.md** - If affects service delivery
- **company/operations/UPDATE_CHECKLIST.md** - If changes how things get updated

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

### Cursor / Claude Code
- **STOP before creating folders** - Ask user where they should go
- **Read this file first** - Every session
- **Don't create entire systems** - Without discussing structure first
- **Follow DOE method** - For recurring/complex tasks

### ChatGPT / Claude Web / NotebookLM
- **Reference this file** - When planning implementations
- **Suggest structure** - Don't create files (you can't access file system)
- **Remind user** - To follow rules when implementing
- **Follow DOE method** - In your recommendations and planning

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
- [ ] I've assessed if this needs DOE method (recurring? complex? needs consistency?)

**If you can't check all boxes, STOP and ask the user first.**

---

## 📞 WHEN IN DOUBT

**ASK:** "I want to create [X]. Based on MASTER_RULES.md, should this go in `systems/`, `automations/`, or somewhere else?"

**DON'T:** Just create it in a new root folder or random location.

---

## 🔄 VERSION HISTORY

**December 7, 2024** - Consolidated all rules into single master file, added DOE method, made portable for all AI platforms
**December 4, 2024** - Created after Cursor Composer violated folder structure rules

---

## Claude-Specific Execution Preferences

- prefer_concise: true
- avoid_repetition: true
- enforce_plain_speak: true
- detect_and_surface_blind_spots: true
