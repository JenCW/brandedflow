# BRANDED + FLOW
**Brand. Automate. Nurture.**

Intelligence-powered branding & automation agency for overwhelmed solopreneurs.

---

## 🚨 AI ASSISTANTS: READ FIRST

**Before creating or modifying ANYTHING:**
1. **Read [AI_RULES.md](AI_RULES.md)** - MANDATORY folder structure and naming rules
2. **Read [docs/internal/CONTEXT.md](docs/internal/CONTEXT.md)** - Current project state
3. **Read [company/operations/UPDATE_CHECKLIST.md](company/operations/UPDATE_CHECKLIST.md)** - What to update when

**These rules prevent you from creating files in wrong locations or breaking the folder structure.**

---

## 🚀 QUICK START

**New to this project? Start here:**

1. Read [AI_RULES.md](AI_RULES.md) - **MANDATORY** before creating anything
2. Read [docs/internal/CONTEXT.md](docs/internal/CONTEXT.md) - Master context file
3. Read [project_config.md](project_config.md) - Stable “constitution” and repo rules
4. Read [workflow_state.md](workflow_state.md) - Current phase + active work
5. Check [docs/internal/CLIENT_STATUS.md](docs/internal/CLIENT_STATUS.md) - Current client status
6. Review [docs/training/QUICK_STARTS.md](docs/training/QUICK_STARTS.md) - Service offerings

---

## 📁 PROJECT STRUCTURE

This is the **canonical root structure** (details: `project_config.md`):

```
brandedflow/
├── clients/       # Client projects (each has numbered sections like 01_admin..)
├── company/       # Internal ops (including company website)
├── docs/          # Documentation (canonical “current” docs live in docs/internal/)
├── automations/   # Scripts, MCPs, workflows (reusable)
├── systems/       # DOE engine, MCP server runtime, execution scripts
├── templates/     # Reusable templates (websites, proposals, etc.)
├── cursor/        # Dispatcher entrypoints (task routing)
├── scripts/       # Repo guardrails (deterministic checks)
├── project_config.md
└── workflow_state.md
```

---

## 📚 KEY DOCUMENTATION

### Business Strategy
- [CONTEXT.md](docs/internal/CONTEXT.md) - Current status, priorities, decisions
- [workflow_state.md](workflow_state.md) - Current phase, tasks, learnings
- [MASTER_BRAND_GUIDE.md](docs/training/MASTER_BRAND_GUIDE.md) - Brand voice, positioning, identity
- [BRAND_STYLE_GUIDE.md](company/website/site/BRAND_STYLE_GUIDE.md) - Company visual system

### Services & Clients
- [QUICK_STARTS.md](docs/training/QUICK_STARTS.md) - Service definitions
- [CLIENT_STATUS.md](docs/internal/CLIENT_STATUS.md) - Active clients and pipeline
- [TECH_STACK.md](company/operations/TECH_STACK.md) - Complete technology stack

### Technical
- MCP server runtime: `systems/mcp-server/`
- Reusable MCP code: `automations/mcps/`

**Current priorities always live in:** `workflow_state.md`

---

## 💼 BUSINESS MODEL

**What We Do:**
Quick Start services combining AI research + brand design + automation

**Target Market:**
Overwhelmed solopreneurs ($75K-$250K annual revenue)

**Pricing:**
- DIY: ~$2,400 one-time (we build, train, hand off)
- Managed: ~$1,200 setup + ~$350/mo (we build AND manage)

**Services:**
15 Quick Start automations (see [QUICK_STARTS.md](docs/training/QUICK_STARTS.md))

---

## 🛠️ TECH STACK

**Primary Platform:** Netlify (AI-generated HTML sites)
**CRM:** Airtable + Base44 client portals
**Automation:** n8n workflows
**AI Tools:** ChatGPT Pro, Claude Code, Cursor, NotebookLM
**Design:** Gamma, Canva Pro

See [TECH_STACK.md](company/operations/TECH_STACK.md) for complete breakdown.

---

## 🚨 ACTIVE SYSTEMS

### DOE + MCP Runtime (Active)
**DOE directives:** `systems/doe-engine/directives/`  
**MCP server runtime:** `systems/mcp-server/`  
**Status:** ACTIVE - changes must remain deterministic and tested

**Note:** The legacy `systems/daily-accountability/` system has been removed (see `workflow_state.md`).

---

## 👥 CLIENTS

### Active/Live
- **AQ Remodeling** - Live on Netlify, ongoing support

### Pitch Stage
- **Luxe Fine Dining** - Pitch presentation tomorrow morning (URGENT)

### Proposal Stage
- **Dental Bunny** - Proposal documents prepared

### Partnerships
- **iAnswering.ai** - AI receptionist partnership in discussion

See [CLIENT_STATUS.md](docs/internal/CLIENT_STATUS.md) for details.

---

## 📖 HOW TO USE THIS PROJECT

### Starting a New Cursor Session
1. Cursor uses repo root `/.cursorrules` for enforcement and DOE gating
2. You have full context about current status
3. Reference other docs as needed from the `/docs/` folder

### Working on Client Projects
1. Navigate to `/clients/[client-name]/`
2. All client deliverables are in their folder
3. AQ Remodeling serves as website template

### Building Automations (Future)
1. Reusable MCPs go in `/automations/mcps/`
2. Reusable workflows go in `/automations/workflows/`
3. Each MCP will be its own project

### Updating Documentation
1. Update [CONTEXT.md](docs/internal/CONTEXT.md) when priorities change
2. Update [CLIENT_STATUS.md](docs/internal/CLIENT_STATUS.md) when client status changes
3. Update [DECISIONS_LOG.md](docs/internal/DECISIONS_LOG.md) when making major decisions

---

## ⚠️ IMPORTANT NOTES

### Website Strategy
- ✅ **Using:** Netlify + AI-generated HTML
- ❌ **NOT using:** WordPress/Elementor/10Web (abandoned approach)
- **Template:** AQ Remodeling site structure

### Folder Naming
- All folders use lowercase-kebab-case
- No spaces, no special characters (except hyphens)
- Example: `aq-remodeling`, `luxe-fine-dining`

### Git Workflow
- Automatic daily commits at 11pm
- Manual commits for major changes
- Always test systems before committing

---

## 🆘 NEED HELP?

**Documentation:**
- Start with [CONTEXT.md](docs/internal/CONTEXT.md)
- Check [OPERATIONS_MANUAL.md](company/operations/OPERATIONS_MANUAL.md)
- Review [AI_WORKFLOW_GUIDE.md](docs/training/AI_WORKFLOW_GUIDE.md)

**Common Tasks:**
- New client? See [CLIENT_STATUS.md](docs/internal/CLIENT_STATUS.md)
- Tech question? See [TECH_STACK.md](company/operations/TECH_STACK.md)
- Service question? See [QUICK_STARTS.md](docs/training/QUICK_STARTS.md)

---

## 📝 VERSION INFO

**Last Reorganized:** December 3, 2024
**Structure Version:** 2.0
**Status:** Production

**What Changed:**
- Complete folder reorganization
- Added context management system
- Created company/ folder for business ops
- Moved to lowercase-kebab-case naming
- Consolidated documentation in docs/

---

**Built with:** ChatGPT Pro, Claude Code, Cursor, n8n, Airtable, Netlify, and determination.
