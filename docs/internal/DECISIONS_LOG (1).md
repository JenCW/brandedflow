# DECISIONS LOG
Chronological record of all major business decisions for Branded + Flow

---

## November 25, 2024

### Service Offering
**Decision:** Launch with 10 Quick Starts, not 49  
**Rationale:** Market research shows 6 options = 30% conversion vs 3% for 24+ options. Operational complexity of 49 services unsustainable for solo operator.  
**Impact:** Faster to market, clearer messaging, less build time

**Decision:** Every Quick Start includes mini research sprint  
**Rationale:** Core differentiator vs competitors who just execute client requests  
**Impact:** Justifies premium pricing, creates strategic value

**Decision:** DIY + Managed pricing tiers for all services  
**Rationale:** Serves different buyer segments, creates upgrade path  
**Impact:** DIY generates cash flow, Managed generates recurring revenue

### Tech Stack
**Decision:** Base44 for client portals ($50/mo unlimited)  
**Rationale:** Zero marginal cost per client, professional delivery experience  
**Impact:** Can include portal with every Quick Start at no additional cost

**Decision:** n8n self-hosted on VPS ($10/mo)  
**Rationale:** Unlimited workflows, cheaper than cloud at scale  
**Impact:** $120/year savings vs n8n Cloud

**Decision:** Standardized tech stack for all clients  
**Rationale:** Enables reusable MCPs, prevents "works with 47 different tools" chaos  
**Impact:** Faster delivery, scalable automation

### Business Structure
**Decision:** Form LLC within 30 days  
**Rationale:** Protects personal assets, appears more professional  
**Impact:** $50-500 one-time cost, ongoing annual fees

**Decision:** Get professional liability insurance immediately  
**Rationale:** Protects against client claims of damages  
**Impact:** $500-800/year cost, but required for credibility

### Sales Strategy
**Decision:** Async sales only (no phone calls)  
**Rationale:** Founder phone anxiety/PTSD, B2B buyers increasingly prefer async  
**Impact:** Enables sales despite founder constraint

**Decision:** Target warm leads first (not cold outreach)  
**Rationale:** Warm leads convert 10-25% in 30-60 days vs cold 1-5% in 90-180 days  
**Impact:** Faster path to first revenue

**Decision:** 5 warm outreach emails per day for 30 days  
**Rationale:** 150 contacts → 60 responses → 18 interested → 7 proposals → 2-3 clients  
**Impact:** Systematic approach to first sales

### MCP Development
**Decision:** Build `mini-research-sprint` MCP first (Week 1-2)  
**Rationale:** Used for every client, validates AI research workflow  
**Impact:** Immediate time savings, proves concept

**Decision:** Build MCPs in priority order based on sales, not all at once  
**Rationale:** Prevents building things nobody buys  
**Impact:** 4-6 MCPs in 90 days vs 49 MCPs in 6-12 months

**Decision:** Manual delivery for first 3 clients while building MCPs  
**Rationale:** Learn what clients actually need before automating  
**Impact:** Better MCPs, faster iteration

### AI Workflow
**Decision:** Use Claude Code for all coding/MCP work  
**Rationale:** Already set up, persistent context, MCP native support  
**Impact:** No tool switching, context preserved

**Decision:** Use ChatGPT Deep Research for client research  
**Rationale:** Deep Research feature analyzes 100+ sources in one query  
**Impact:** Better research quality than manual or Claude alone

**Decision:** NO RAG architecture  
**Rationale:** Solo operator with <10 clients doesn't need vector database overhead  
**Impact:** Simpler system, lower costs, adequate for current scale

**Decision:** Rolling context via markdown files + Git commits  
**Rationale:** Preserves context without RAG complexity  
**Impact:** Never lose decisions again, version control built in

### Pricing Strategy
**Decision:** $1,200-2,997 DIY, $600-1,497 setup + $197-697/mo Managed  
**Rationale:** 3-5% of target market annual revenue = affordable  
**Impact:** Competitive with market, sustainable margins

**Decision:** Business Deep Dive optional ($997), not required  
**Rationale:** Some clients want comprehensive strategy, most want tactical execution  
**Impact:** Higher LTV for strategy buyers, lower barrier for tactical buyers

### iAnswering.ai Partnership
**Decision:** Email Richard within Week 1 to formalize partnership  
**Rationale:** Cannot build 4 "I Hate My Phone" services on verbal agreement  
**Impact:** Either get signed agreement or need backup plan (Bland.ai)

**Decision:** 30-day deadline for signed agreement  
**Rationale:** Cannot wait indefinitely, need to move forward  
**Impact:** Forces decision, enables alternate planning

### Portal Structure
**Decision:** Every client gets Base44 portal regardless of service tier  
**Rationale:** Zero marginal cost, huge perceived value, professional delivery  
**Impact:** Clients feel like working with enterprise agency

**Decision:** DIY = 90-day portal access, Managed = permanent  
**Rationale:** Creates upgrade incentive, sustainable for cost structure  
**Impact:** DIY clients may upgrade to keep portal access

### First 90 Days Plan
**Decision:** 60/40 split (60% business operations, 40% AI workflow optimization)  
**Rationale:** Founder needs both revenue AND confidence in workflow  
**Impact:** Sustainable approach vs forcing 80/20 split

**Decision:** Revenue targets: Month 1 = $2.5K, Month 2 = $6K, Month 3 = $10-14K  
**Rationale:** Conservative based on warm lead conversion rates  
**Impact:** Realistic expectations, avoids desperation

### Risk Mitigation
**Decision:** Avoid regulated industries (healthcare, finance, legal)  
**Rationale:** HIPAA/SOC 2 compliance too expensive for solo operator  
**Impact:** Narrower TAM but eliminates certification costs

**Decision:** Budget for 3-5x API cost increases  
**Rationale:** OpenAI history shows sudden price changes possible  
**Impact:** Margins protected if Claude API costs spike

**Decision:** Build Airtable Interface backup for Base44 portal  
**Rationale:** Base44 could raise prices or shut down  
**Impact:** Client migration path exists if needed

---

## December 3, 2024

### Website Platform Strategy
**Decision:** Use Netlify + AI-generated static HTML for all client websites
**Rationale:** AQ Remodeling site successfully deployed on Netlify with full integration capabilities (forms, CRM, analytics, Base44 portal, metrics tracking). Provides user-editable sites without code, fast performance, no vendor lock-in, and clients own everything.
**Impact:** Abandons WordPress/Elementor/10Web approach entirely. Template established via AQ Remodeling site structure. Faster, cheaper, more flexible delivery.
**Alternatives Considered:** WordPress/Elementor (rejected: too complex, vendor lock-in, slower performance), 10Web (rejected: expensive, limited control)
**Review Date:** After 5 client websites delivered (evaluate if approach scales)

### Context Management System
**Decision:** Implement master context file system with docs/CONTEXT.md as auto-loaded source of truth
**Rationale:** Need ANY AI tool (Cursor, ChatGPT, Claude) to have latest context automatically without manual updates. Prevents losing decisions, current status, or client information between sessions.
**Impact:** Created comprehensive context file hierarchy with CONTEXT.md linking to CLIENT_STATUS.md, TECH_STACK.md, QUICK_STARTS.md. Cursor auto-loads at session start. Eliminates "what was I working on?" problem.
**Alternatives Considered:** RAG system (rejected: too complex for solo operator), manual context passing (rejected: unreliable, will forget)
**Review Date:** After 30 days of usage (evaluate if system is being maintained)

### Folder Structure Reorganization
**Decision:** Complete reorganization to 6 main folders: clients/, company/, docs/, automation-library/, systems/, templates/
**Rationale:** Previous structure had too many folders, inconsistent naming (CAPS vs lowercase), no clear source of truth, duplicate/unclear content across brandedflow and brandedflow-clean.
**Impact:** Clean structure with lowercase-kebab-case naming throughout. Single source of truth for documentation. Clear separation between client work, company operations, and automation systems. Working systems preserved (daily-accountability).
**Alternatives Considered:** Keep existing structure (rejected: confusion unsustainable), merge into fewer folders (rejected: loses logical separation)
**Review Date:** After Luxe pitch (December 4, 2024) - evaluate if structure supports workflow

### Documentation Update Workflow
**Decision:** Establish source of truth hierarchy - CONTEXT.md is always current, detailed docs updated as needed, UPDATE_CHECKLIST.md provides quick reference
**Rationale:** Need clear system for "what gets updated where" to prevent documentation drift. Solo operator needs minimal-friction update process that won't be forgotten.
**Impact:** Clear responsibilities: (1) CONTEXT.md updated when priorities/status change, (2) Detailed docs updated when systems/services change, (3) Archive outdated versions. Checklist prevents forgetting what needs updating.
**Alternatives Considered:** Automated updates via git hooks (future Phase 4), daily manual reviews (rejected: too time-consuming)
**Review Date:** After 2 weeks of usage (evaluate if workflow is sustainable)

---

## December 4, 2024

## December 10, 2024

### Interactive Forms System
**Decision:** Create interactive HTML forms for client intake, proposals, and contracts  
**Rationale:** Eliminates manual copy-paste workflow. Forms prompt for all necessary information, handle partial data gracefully, and automatically create client profiles/proposals/contracts via MCP server.  
**Impact:** 
- Faster client onboarding (no more finding templates, copying content)
- Consistent data collection (all variables captured)
- Desktop shortcuts for quick access
- Handles existing client folders gracefully
- Only requires essential fields (client name, business name, email) - everything else optional

**Implementation:**
- Created `intake-form.html` - Interactive client intake with all variables (design style, tech stack, services, brand info, etc.)
- Created `proposal-form.html` - Service selection, pricing options (DIY/Managed), timeline
- Created `contract-form.html` - Payment schedule, terms, dates
- Created MCP: `create-contract.js` - Saves contracts to deliverables folder
- Updated MCP: `process-client-intake.js` - Enhanced to handle brand info, services, partial data
- Desktop shortcuts created for all three forms

**Location:** `company/operations/client-intake/`
**Desktop Shortcuts:** Client Intake Form.command, Create Proposal.command, Create Contract.command

## December 8, 2024

### Modern Proposal Process - New Standard
**Decision:** Make the Luxe Fine Dining proposal process the standard for ALL future proposals  
**Rationale:** The Luxe proposal was highly successful, conversion-focused, elegant, and client loved it. Process includes: story-first approach (never start with price), simple jargon-free language, phased approach, mobile-responsive HTML, working email buttons, clear payment terms.  
**Impact:** 
- All proposals now follow this proven structure
- Created `create-modern-proposal.js` MCP to automate generation
- Created `MODERN_PROPOSAL_WORKFLOW.md` as standard process doc
- Updated `create-client-proposal.md` directive with implementation details
- Ensures consistent, conversion-focused proposals for all clients
- Mobile-responsive HTML proposals ready for Netlify deployment

**Key Features:**
- Never starts with price (always story first)
- Simple language (no jargon)
- Phased approach (prove value first)
- Elegant design (dark theme, gold accents)
- Mobile-responsive
- Working email buttons
- Clear payment terms (50% upfront, 50% at completion, monthly starts 30 days after start)

**Location:** 
- Directive: `systems/doe-engine/directives/create-client-proposal.md`
- MCP: `automations/mcps/create-modern-proposal.js`
- Workflow: `company/operations/proposals/MODERN_PROPOSAL_WORKFLOW.md`
- Process Doc: `company/operations/proposals/PROPOSAL_CREATION_PROCESS.md`

**Review Date:** After 5 proposals created using this process (evaluate conversion rates)

---

## December 8, 2024

### Stepped Website Creation Workflow - New Standard
**Decision:** Implement 8-step approval-gated website creation process with ROI tracking starting at deployment  
**Rationale:** Need iterative, controlled process where each step can be reviewed and approved before proceeding. User is very particular and needs to iterate for 24+ hours on each step. ROI tracking must start at deployment to prove value. Old single-step process didn't allow for iteration and approval gates.  
**Impact:** 
- Created 8-step workflow: Site Plan → Design → Copy → Features → Review → Deploy → Forms → SEO
- Each step requires approval before next step unlocks
- Can iterate for 24+ hours on each step
- Nothing deploys until all steps approved
- ROI tracking starts at deployment (Step 6)
- Semrush integration for comprehensive SEO tracking
- PandaDoc removed from all processes
- Created approval workflow MCP (`approve-website-step`)
- Site plans and wireframes are simple, understandable (proposal-style), not technical

**Key Features:**
- Step 1: Site Plan & Wireframe (simple, understandable)
- Step 2: Design Guide (colors, fonts, look & feel)
- Step 3: Website Copy (all text content)
- Step 4: Features (animations, integrations, dynamic elements)
- Step 5: Client Review (final review before deployment)
- Step 6: Deploy to Netlify (CMS created, analytics start, ROI tracking begins)
- Step 7: Forms & Database (contact capture, integrations)
- Step 8: SEO Implementation (Semrush, keyword tracking, SEO ROI)

**Location:**
- Directive: `systems/doe-engine/directives/create-client-website-stepped.md`
- Workflow: `company/operations/website-creation/WEBSITE_CREATION_WORKFLOW.md`
- MCPs: `create-website-design-brief`, `create-design-guide`, `generate-website-copy`, `add-website-features`, `approve-website-step`, `deploy-website-netlify`, `setup-website-seo`
- SEO Tool: `company/operations/website-creation/SEO_TOOL_RECOMMENDATION.md` (Semrush)

**Review Date:** After 3 websites created using this process (evaluate iteration time, approval process, ROI tracking)

### Unified Client Form - Single Form for Everything
**Decision:** Replace multiple forms (intake, proposal, contract, onboarding) with one unified form that can be updated progressively  
**Rationale:** User wants one form that can be filled incrementally as information is gathered. Don't want separate forms for each step. Form should handle minimum viable intake (triggers folder creation and research), proposal creation (draft until approved), contract creation, and onboarding docs.  
**Impact:**
- Created `unified-client-form.html` - One form for everything
- Minimum viable intake (client name, business name, email, industry) triggers folder creation and research
- Proposals stay separate until approved (no infrastructure created until approval)
- Approval triggers full setup (Airtable, Base44, contract, onboarding)
- Auto-sync to Base44 when any folder is updated
- Form saves progress automatically (localStorage)

**Location:**
- Form: `company/operations/client-intake/unified-client-form.html`
- Workflow: `company/operations/client-intake/CLIENT_WORKFLOW.md`
- MCPs: `process-client-intake`, `trigger-client-research`, `create-modern-proposal`, `approve-client-proposal`, `sync-folder-to-base44`

**Review Date:** After 5 clients onboarded using unified form

### PandaDoc Removal
**Decision:** Remove PandaDoc from all processes  
**Rationale:** No longer using PandaDoc for proposals or contracts. Using markdown files and HTML proposals instead.  
**Impact:**
- Removed PandaDoc references from `create-contract.js`
- Removed PandaDoc references from `create-proposal-from-template.js`
- Contracts and proposals are now markdown/HTML files
- No API integration needed

**Review Date:** N/A (removal complete)

---

## December 4, 2024

### AI Assistant Rules System
**Decision:** Create mandatory rules system for all AI assistants (AI_RULES.md, .cursorrules, .claude_code_rules)
**Rationale:** Cursor Composer violated folder structure by creating files in wrong locations with wrong naming conventions. Need enforceable rules that auto-load for all AI tools.
**Impact:** Created comprehensive rule system with auto-loading configs for Cursor and Claude Code. Rules prevent: creating root-level folders, using CAPS/underscores in names, forgetting to update docs, breaking established structure. Updated CONTEXT.md and README.md to reference rules prominently.
**Alternatives Considered:** Manual reminders each session (rejected: unreliable), post-hoc fixes (rejected: wastes time), no enforcement (rejected: chaos continues)
**Review Date:** After 7 days (evaluate if AI assistants follow rules consistently)

### Context File Automation System
**Decision:** Keep Cursor Composer's context-automation system in systems/ folder, delete duplicate reference file
**Rationale:** Composer created automated system (Python scripts, shell scripts, HTML dashboard, git hooks) to help maintain CONTEXT.md and related docs. System is properly located in systems/context-automation/ per folder structure rules. Duplicate quick-reference file in company/operations/ was unnecessary.
**Impact:** Automation system available in systems/context-automation/ for optional use. Can check context file freshness, show update checklists, open dashboard. Not required but helpful for maintaining documentation.
**Alternatives Considered:** Delete entire system (rejected: potentially useful), move to automation-library (rejected: it's an operational system not reusable library), keep duplicate file (rejected: violates single source of truth)
**Review Date:** After trying the automation for 1 week (evaluate if it's actually helpful or just overhead)

---

## Template for Future Decisions

**Date:**  
**Decision:**  
**Rationale:**  
**Impact:**  
**Alternatives Considered:**  
**Review Date:** (when to revisit this decision)

---

## Decisions to Revisit

- **iAnswering.ai partnership:** Review after 30 days (Dec 25, 2024)
- **Service offering expansion:** Review after 10 clients to see what's selling
- **VA hiring:** Review when revenue hits $5K/mo consistently
- **RAG implementation:** Review at 25+ clients or 1,000+ documents
- **Tool stack optimization:** Review every 6 months for cost savings
