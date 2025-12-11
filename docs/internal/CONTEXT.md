# BRANDED + FLOW - MASTER CONTEXT
**Last Updated:** December 8, 2024
**Status:** Pre-launch, Foundation Phase
**Next Big Thing:** Website creation workflow established, ready for first client website

---

## 🚨 AI ASSISTANTS: READ FIRST

**Before creating or modifying ANYTHING:**
1. **Read [AI_RULES.md](../AI_RULES.md)** - Mandatory folder structure and naming rules
2. **Read this file (CONTEXT.md)** - Current project state
3. **Read [UPDATE_CHECKLIST.md](../company/operations/UPDATE_CHECKLIST.md)** - What to update when

**Cursor users:** Rules auto-load from `.cursorrules`
**Claude Code users:** Rules auto-load from `.claude_code_rules`

---

## 🎯 CURRENT PRIORITIES (RIGHT NOW)

1. **URGENT:** Luxe Fine Dining proposal finalized - modern HTML proposal deployed
2. **NEW STANDARD:** Modern proposal process now established - all future proposals use this method
3. **NEW STANDARD:** Stepped website creation workflow established - 8-step approval process with ROI tracking
4. File structure reorganization - IN PROGRESS (Phase 1)
5. Build 15 Quick Start MCPs - Coming next (Phase 4)
6. Document complete company operating system - (Phase 3)
7. **NEW:** Unified client form created - One form for intake, proposal, contract, onboarding

---

## 📊 ACTIVE CLIENTS & STATUS

### AQ Remodeling
- **Status:** ✅ LIVE on Netlify
- **Website:** aqremodeling.com (fully functional)
- **Tech:** Static HTML, Netlify hosting, Base44 integration, metrics tracking
- **Next:** Ongoing support, use as template for future clients

### Luxe Fine Dining
- **Status:** ✅ MODERN PROPOSAL COMPLETE & DEPLOYED
- **Proposal:** Modern HTML proposal with phased approach, mobile-responsive, deployed to Netlify
- **Location:** clients/luxe-fine-dining/05_deliverables/PROPOSAL_PHASED_APPROACH_MODERN.html
- **Deployment:** proposal-deploy folder ready for Netlify
- **Next:** Client review and approval

### Dental Bunny
- **Status:** Proposal stage
- **Location:** clients/dental-bunny/
- **Next:** TBD

### iAnswering.ai Partnership
- **Status:** Partnership discussions ongoing
- **Location:** clients/ianswering-ai/
- **Product:** AI receptionist integration
- **Next:** Formalize partnership terms

---

## 💼 BUSINESS MODEL

**What We Do:** Quick Start services combining AI research + brand design + automation

**Target Market:** Overwhelmed solopreneurs ($75K-250K annual revenue)

**Pricing Model:**
- **DIY Option:** ~$2,400 one-time (we build it, train you, hand it off)
- **Managed Option:** ~$1,200 setup + ~$350/month (we build AND manage it)

**Core Services:** 15 Quick Start automations (each will become an MCP)

---

## 🛠️ TECH STACK (FINAL)

### AI & Development
- **ChatGPT Pro** - Client research, deep research queries
- **Claude Code** - Building MCPs, automation code, technical work
- **Cursor** - Primary IDE
- **NotebookLM** - Fact-checking, source citations

### Client Delivery
- **Netlify** - Website hosting (NOT WordPress/Elementor - abandoned that approach)
- **Airtable** - CRM, client database
- **Base44** - Client portals
- **Gamma** - Presentations, pitch decks

### Automation & Integration
- **n8n** - Workflow automation (self-hosted)
- **Apollo** - Lead generation
- **Clay** - Data enrichment
- **Brevo** - Email marketing

### Business Operations
- **Stripe** - Payments
- **Canva Pro** - Design work
- **GitHub** - Version control
- **Google Analytics** - Website metrics
- **Outlook/Gmail** - Email

### Still Need
- SEO tool
- Social media poster/scheduler
- Content creator
- Lead magnet/landing page builder
- Chatbox integration
- Video creator

---

## 📁 FILE STRUCTURE (NEW - JUST REORGANIZED)

```
brandedflow/
├── clients/              # Client projects (aq-remodeling, luxe-fine-dining, etc.)
├── company/             # YOUR business ops (website, templates, accounting, sales)
├── docs/                # Strategic docs (THIS FILE, INIT.md, OPERATIONS_MANUAL.md)
├── automations/         # Reusable automation code (MCPs, workflows, prompts)
├── systems/            # Active systems (daily-accountability)
└── templates/          # Reusable templates
```

---

## 🔑 KEY DECISIONS

### Proposal Process (NEW STANDARD - December 8, 2024)
- ✅ **Modern HTML Proposal Process** - All proposals now use this method
- Story-first approach (never start with price)
- Simple, jargon-free language
- Phased approach (prove value first)
- Mobile-responsive HTML design
- Working email buttons with pre-filled text
- Clear payment terms (50% upfront, 50% at completion, monthly starts 30 days after start)
- **MCP:** `create-modern-proposal.js` automates generation
- **Workflow:** `company/operations/proposals/MODERN_PROPOSAL_WORKFLOW.md`
- **Directive:** `systems/doe-engine/directives/create-client-proposal.md`
- Proven with Luxe Fine Dining proposal

### Website Approach
- ✅ Using Netlify + AI-generated HTML (fast, editable, full control)
- ❌ NOT using WordPress/Elementor/10Web (abandoned this approach)
- ✅ **NEW:** Stepped approval process (8 steps) - Site Plan → Design → Copy → Features → Review → Deploy → Forms → SEO
- ✅ **NEW:** ROI tracking starts at deployment - Analytics, conversions, keyword rankings
- ✅ **NEW:** Semrush integration for comprehensive SEO tracking
- Template: AQ Remodeling site structure

### Automation Strategy
- Client-facing: 15 Quick Start MCPs (revenue-generating)
- Internal: n8n workflows for your operations (efficiency)
- Goal: Automate AS MUCH AS POSSIBLE

### Documentation System
- CONTEXT.md (this file) - Master context, auto-loaded by Cursor
- INIT.md - Session starter
- OPERATIONS_MANUAL.md - How to run the business
- DECISIONS_LOG.md - Decision history
- CLIENT_STATUS.md - Client tracking
- TECH_STACK.md - Technical decisions

---

## 📋 WHAT'S NEXT (PHASES)

**Phase 1** (RIGHT NOW): Clean folder structure ✅ IN PROGRESS
**Phase 2** (TONIGHT): Prep Luxe pitch for tomorrow morning
**Phase 3** (SOON): Document complete operating system
**Phase 4** (AFTER THAT): Build 15 Quick Start MCPs
**Phase 5** (ONGOING): Learn & optimize (tokens, costs, scaling)

---

## 🧠 HOW TO USE THIS FILE

**This file is automatically loaded by Cursor at the start of each session.**

When you open Cursor, you should have full context about:
- Current priorities and urgent deadlines
- All active clients and their status
- What tech stack we're using
- What decisions have been made
- Where to find everything in the project

**To update this file:**
- Edit manually when major changes happen
- Eventually: Automate updates via git hooks or scripts

---

**For full details, see:**
- [INIT.md](./INIT.md) - Session initialization guide
- [OPERATIONS_MANUAL.md](./OPERATIONS_MANUAL.md) - How to run the business
- [DECISIONS_LOG.md](./DECISIONS_LOG.md) - Why decisions were made
- [CLIENT_STATUS.md](./CLIENT_STATUS.md) - Detailed client tracking
- [TECH_STACK.md](./TECH_STACK.md) - Complete tech stack breakdown
- [QUICK_STARTS.md](./QUICK_STARTS.md) - 15 Quick Start services details
