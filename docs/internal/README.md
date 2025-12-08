# BRANDED + FLOW
**Brand. Automate. Nurture.**

Intelligence-powered branding & automation agency for overwhelmed solopreneurs.

---

## 🚨 AI ASSISTANTS: READ FIRST

**Before creating or modifying ANYTHING:**
1. **Read [AI_RULES.md](AI_RULES.md)** - MANDATORY folder structure and naming rules
2. **Read [docs/CONTEXT.md](docs/CONTEXT.md)** - Current project state
3. **Read [company/operations/UPDATE_CHECKLIST.md](company/operations/UPDATE_CHECKLIST.md)** - What to update when

**These rules prevent you from creating files in wrong locations or breaking the folder structure.**

---

## 🚀 QUICK START

**New to this project? Start here:**

1. Read [AI_RULES.md](AI_RULES.md) - **MANDATORY** before creating anything
2. Read [docs/CONTEXT.md](docs/CONTEXT.md) - Master context file (auto-loaded by Cursor)
3. Read [docs/INIT.md](docs/INIT.md) - Session initialization guide
4. Check [docs/CLIENT_STATUS.md](docs/CLIENT_STATUS.md) - Current client status
5. Review [docs/QUICK_STARTS.md](docs/QUICK_STARTS.md) - Our 15 service offerings

---

## 📁 PROJECT STRUCTURE

```
brandedflow/
├── clients/              # Client projects & deliverables
│   ├── aq-remodeling/   # ✅ LIVE on Netlify (website template)
│   ├── luxe-fine-dining/ # 🔥 URGENT - Pitch tomorrow morning
│   ├── dental-bunny/    # Proposal stage
│   └── ianswering-ai/   # Partnership work
│
├── company/             # YOUR business operations
│   ├── website/         # brandedandflow.com (to be built)
│   ├── templates/       # Proposals, contracts, agreements
│   ├── accounting/      # Daily accounting, financial tracking
│   ├── email-logs/      # Email communication logs
│   ├── sales/           # Sales playbook, outreach scripts
│   └── operations/      # Day-to-day operations
│
├── docs/                # Strategic business documentation
│   ├── CONTEXT.md       # 🎯 START HERE - Master context
│   ├── INIT.md          # Session initialization
│   ├── OPERATIONS_MANUAL.md  # How to run the business
│   ├── DECISIONS_LOG.md # Decision history
│   ├── TECH_STACK.md    # Complete tech stack
│   ├── CLIENT_STATUS.md # Current client tracking
│   ├── QUICK_STARTS.md  # 15 Quick Start services
│   ├── MASTER_BRAND_GUIDE.md  # Brand voice & identity
│   └── archive/         # Outdated/reference docs
│
├── automations/         # Reusable automation code
│   ├── mcps/            # Reusable MCP code
│   ├── workflows/       # Reusable n8n workflows
│   └── prompts/         # Reusable AI prompts
│
├── systems/             # Active running systems
│   └── daily-accountability/  # ⚡ Morning/evening popups (ACTIVE)
│
└── templates/           # Reusable website templates
    ├── client-website-template/  # Based on AQR site
    └── gamma-templates/          # Presentation templates
```

---

## 📚 KEY DOCUMENTATION

### Business Strategy
- [CONTEXT.md](docs/CONTEXT.md) - Current status, priorities, decisions
- [OPERATIONS_MANUAL.md](docs/OPERATIONS_MANUAL.md) - How to run the business day-to-day
- [DECISIONS_LOG.md](docs/DECISIONS_LOG.md) - Why decisions were made
- [MASTER_BRAND_GUIDE.md](docs/MASTER_BRAND_GUIDE.md) - Brand voice, positioning, identity

### Services & Clients
- [QUICK_STARTS.md](docs/QUICK_STARTS.md) - 15 Quick Start service definitions
- [CLIENT_STATUS.md](docs/CLIENT_STATUS.md) - Active clients and pipeline
- [TECH_STACK.md](docs/TECH_STACK.md) - Complete technology stack

### Technical
- [AI_WORKFLOW_GUIDE.md](docs/AI_WORKFLOW_GUIDE.md) - Which AI tool for what task
- [MCP Documentation](docs/automation-library/mcp-reference/) - MCP guides and references (note: actual MCP code is in `automations/mcps/`)

---

## 🎯 CURRENT PRIORITIES

1. **URGENT:** Luxe Fine Dining pitch presentation (tomorrow morning)
2. Phase 1: Clean folder structure ✅ COMPLETE
3. Phase 2: Prep Luxe pitch (tonight)
4. Phase 3: Document company operating system
5. Phase 4: Build 15 Quick Start MCPs

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
15 Quick Start automations (see [QUICK_STARTS.md](docs/QUICK_STARTS.md))

---

## 🛠️ TECH STACK

**Primary Platform:** Netlify (AI-generated HTML sites)
**CRM:** Airtable + Base44 client portals
**Automation:** n8n workflows
**AI Tools:** ChatGPT Pro, Claude Code, Cursor, NotebookLM
**Design:** Gamma, Canva Pro

See [TECH_STACK.md](docs/TECH_STACK.md) for complete breakdown.

---

## 🚨 ACTIVE SYSTEMS

### Daily Accountability System
**Location:** [systems/daily-accountability/](systems/daily-accountability/)
**Status:** ⚡ ACTIVE - Do not modify without testing
**What it does:**
- Morning routine popups
- Daily priority tracking
- Evening shutdown reminders
- Completion rate tracking

**Important:** This system is currently running via macOS launchd agents. Changes to folder paths require updating config files.

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

See [CLIENT_STATUS.md](docs/CLIENT_STATUS.md) for details.

---

## 📖 HOW TO USE THIS PROJECT

### Starting a New Cursor Session
1. Cursor auto-loads [docs/CONTEXT.md](docs/CONTEXT.md)
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
1. Update [CONTEXT.md](docs/CONTEXT.md) when priorities change
2. Update [CLIENT_STATUS.md](docs/CLIENT_STATUS.md) when client status changes
3. Update [DECISIONS_LOG.md](docs/DECISIONS_LOG.md) when making major decisions

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
- Start with [CONTEXT.md](docs/CONTEXT.md)
- Check [OPERATIONS_MANUAL.md](docs/OPERATIONS_MANUAL.md)
- Review [AI_WORKFLOW_GUIDE.md](docs/AI_WORKFLOW_GUIDE.md)

**Common Tasks:**
- New client? See [CLIENT_STATUS.md](docs/CLIENT_STATUS.md)
- Tech question? See [TECH_STACK.md](docs/TECH_STACK.md)
- Service question? See [QUICK_STARTS.md](docs/QUICK_STARTS.md)

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
