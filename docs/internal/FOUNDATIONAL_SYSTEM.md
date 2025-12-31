# Branded + Flow: Foundational System & Workflows
## Your Personal Operating Manual

**Last Updated**: 2025-12-21
**Purpose**: End the confusion. This is THE system. Follow this and only this.

---

## ⚠️ STOP CONSUMING EXTERNAL ADVICE

**You have a system. It's in this repository. Use it.**

- ❌ Don't follow YouTube tutorials about "the best way"
- ❌ Don't ask ChatGPT for workflow advice
- ❌ Don't watch "bible of systems" videos
- ✅ **Follow THIS document**
- ✅ **Use YOUR .cursorrules file**
- ✅ **Trust YOUR DOE Method**

**Why?** Because external advice is generic. YOUR system is custom-built for YOUR business.

---

## I. CURSOR & WORKSPACE RULES

### Where to Open Cursor (ALWAYS)

```
✅ CORRECT:
Open Cursor here: /Users/jencortez-walters/brandedflow/

❌ WRONG:
Do NOT open in: /Users/jencortez-walters/brandedflow/clients/habibi/
Do NOT open in: /Users/jencortez-walters/brandedflow/company/
```

**Why?**
- Your `.cursorrules` file is at the root
- DOE Method only works from root
- AI needs full context of all clients and systems
- Subfolders bypass your entire system

### When to Start a New Chat

**Start NEW chat when:**
- ✅ Switching to different client
- ✅ Completely different topic (from website work to automation work)
- ✅ Major context shift

**DON'T start new chat for:**
- ❌ Small updates to same project
- ❌ Follow-up questions about current work
- ❌ Related tasks in same area

**Rule of Thumb**: If the AI needs to remember what you just talked about, stay in same chat.

---

## II. GIT & GITHUB WORKFLOW (SOLO AGENCY)

### Your Simple Git Workflow

```
DAILY WORK:
1. Open Cursor at /Users/jencortez-walters/brandedflow/
2. Check current branch: git branch
3. Working on client? Create/switch to branch:
   git checkout -b client-name/feature-name
   Example: git checkout -b habibi/website-updates

4. Work normally in Cursor
5. Commit frequently (every hour or after significant work):
   git add .
   git commit -m "Clear description of what you did"

6. Push to GitHub (backup):
   git push origin branch-name

7. When feature is done and working:
   git checkout main
   git merge client-name/feature-name
   git push origin main
   git branch -d client-name/feature-name  (delete branch)
```

### Branch Naming Convention

```
Client work:     client-name/feature
                 Examples: habibi/website-launch, aqr/contact-form

Company work:    company/feature
                 Examples: company/pricing-update, company/new-branding

Testing:         test/what-you're-testing
                 Examples: test/new-automation, test/crewai-setup

Bootstrap:       bootstrap/client-name-date
                 Examples: bootstrap/habibi-20251221
```

### What You DON'T Need

- ❌ Pull requests (you're solo, just merge)
- ❌ Code reviews (nobody to review)
- ❌ Complex CI/CD pipelines (overkill)
- ❌ Git flow strategy (too complex for solo)

---

## III. TOOL SELECTION DECISION TREE

### The Simple Question Method

**Ask yourself: "What am I trying to do?"**

#### Option 1: Update Client Website
- **Tool**: Just edit in Cursor (no automation needed)
- **Location**: `clients/client-name/03_website/`
- **Steps**:
  1. Open files in Cursor
  2. Make changes
  3. Test locally (if applicable)
  4. Deploy to Netlify
  5. Done

#### Option 2: Automate Repetitive Task
- **Examples**: Send email when form submitted, process images, update database
- **Decision Tree**:

```
Is it MULTI-STEP and needs SCHEDULING?
├─ YES → Use n8n workflow
│         Location: Create in n8n, save config to automations/workflows/
│         Example: Form submission → email → CRM update
│
└─ NO → Is it RECURRING and calls EXTERNAL APIs?
   ├─ YES → Use MCP Server
   │         Location: automations/mcps/
   │         Example: Fetch weather data, call OpenAI API
   │
   └─ NO → Is it COMPLEX RESEARCH or MULTI-AGENT?
      ├─ YES → Use CrewAI
      │         Location: systems/[project-name]/
      │         Example: Research competitors, analyze market
      │
      └─ NO → Use Simple Python/Node Script
                Location: automations/scripts/
                Example: Convert images, process CSV
```

#### Option 3: Build New Feature for Client
- **Tool**: Work in Cursor with DOE Method
- **Steps**:
  1. **CHECK DIRECTIVE**: Check for existing directive in `systems/doe-engine/directives/`
  2. **ORCHESTRATE**: If coding needed, create blueprint and get approval; If deterministic, use scripts/MCPs
  3. **EXECUTE**: Implement according to approved blueprint or execute deterministic scripts/MCPs
  4. Deploy and test
  5. **SELF-ANNEAL**: Update directive with learnings

---

## IV. THE DOE METHOD (YOUR SYSTEM)

### Three Phases (MANDATORY)

```
PHASE 1: CHECK DIRECTIVE
├─ Check for existing directive in systems/doe-engine/directives/
├─ If directive exists: Read it fully
├─ If no directive: Use 3-question test (recurring? complex? consistency matters?)
└─ Check for execution scripts/MCPs before writing code

PHASE 2: ORCHESTRATE
├─ If directive exists: Follow it, create blueprint if coding work needed
├─ If no directive: Create blueprint for coding work, get approval
├─ For deterministic work: Use existing scripts/MCPs
├─ Handle errors and self-anneal
└─ WAIT FOR APPROVAL before executing coding work

PHASE 3: EXECUTE
├─ Implement according to approved blueprint
├─ Or execute deterministic scripts/MCPs
├─ Verify outputs
└─ Self-anneal: Update directive with learnings
```

### When to Use Each Phase

**Check Directive Phase** (ALWAYS start here for):
- New client websites
- New features or automations
- Complex changes
- Anything you're not 100% sure how to do

**Skip Directive Check ONLY for:**
- Tiny text changes (fixing typos)
- Updating prices or contact info
- Simple, obvious fixes

### Pre-Flight Checklist (Before ANY Work)

Open this file and check: `systems/doe-engine/pre-flight.md`

```
Before starting work:
□ Is this client work? Load client-profile.json
□ Is this recurring? Check for existing directive
□ Which tool? (MCP/n8n/CrewAI/script)
□ Is tool available? Check automations/mcps/, workflows/, etc.
□ Folder structure correct?
□ Documentation updated?
```

---

## V. YOUR TECH STACK (WHEN TO USE WHAT)

### Client Websites

**Stack**:
- **Development**: HTML/CSS/JavaScript (simple, no frameworks for most)
- **Hosting**: Netlify
- **CMS** (if needed): 10Web (WordPress)
- **Forms**: Netlify Forms or custom with n8n

**When to use frameworks**:
- ✅ Next.js: For complex, multi-page sites with blog/CMS
- ❌ React: Overkill for most client sites
- ❌ Vue/Angular: You don't need these

### Automations

**Stack**:
- **Workflows**: n8n (self-hosted or cloud)
- **MCP Servers**: Custom Python/Node
- **AI Agents**: CrewAI
- **CRM**: Airtable
- **Client Portal**: Base44

### Internal Tools

**Stack**:
- **This Repository**: Your system of record
- **Cursor**: Your IDE
- **Git/GitHub**: Version control and backup
- **Claude Code**: AI assistance (follows your .cursorrules)

---

## VI. CLIENT PROJECT STRUCTURE

### Every Client Folder Should Have:

```
clients/client-name/
├── client-profile.json          # Client metadata (CREATE THIS!)
├── 01_admin/                    # Contracts, invoices, communication
├── 02_intake/                   # Initial research, brand guidelines
├── 03_website/                  # Website files
│   ├── netlify.toml            # Netlify config
│   ├── index.html              # Homepage
│   └── [other pages]
├── 04_automations/              # Client-specific automations
└── 05_assets/                   # Images, logos, brand files
```

### Client Profile (MANDATORY)

Every client must have `client-profile.json`:

```json
{
  "client_name": "Client Name",
  "company_name": "Company Name",
  "contact_email": "client@example.com",
  "phone": "555-555-5555",
  "website_url": "https://clientwebsite.com",
  "netlify_site_id": "site-id-here",
  "services": ["Website", "Automation", "AI Receptionist"],
  "billing": {
    "type": "DIY" or "Managed",
    "amount": 1500,
    "frequency": "one-time" or "monthly"
  },
  "status": "active" or "completed" or "paused",
  "start_date": "2025-01-15",
  "notes": "Any important notes about this client"
}
```

---

## VII. DEALING WITH CONFUSION (YOUR EMERGENCY PROCESS)

### When You Feel Stuck

**STOP. Follow this process:**

1. **Close all tabs, videos, ChatGPT**
2. **Open this file**: `docs/internal/FOUNDATIONAL_SYSTEM.md` (this file)
3. **Read the relevant section**
4. **Make a decision based on YOUR system**
5. **Execute the decision**
6. **Document the outcome in workflow_state.md**

### When External Advice Conflicts with Your System

**Ask yourself:**

```
Is this advice:
├─ Designed for TEAMS? → Ignore it (you're solo)
├─ Designed for LARGE SCALE? → Ignore it (you're small agency)
├─ Designed for DIFFERENT TECH? → Ignore it (use your stack)
└─ Actually relevant to YOUR specific need? → Consider it
```

**Default Position**: If in doubt, follow YOUR system (this document, .cursorrules, pre-flight.md)

---

## VIII. COMMON SCENARIOS & SOLUTIONS

### Scenario 1: Client Wants Website Updates

```
1. Open Cursor at: /Users/jencortez-walters/brandedflow/
2. Create/switch to branch: client-name/updates
3. Navigate to: clients/client-name/03_website/
4. Make changes in Cursor
5. Test locally (if applicable)
6. Commit: git commit -m "Updated [what you changed]"
7. Deploy to Netlify (git push triggers deploy)
8. Send client link to review
9. Merge to main when approved
```

### Scenario 2: Build New Automation

```
1. Open Cursor at root
2. Start chat: "I need to automate [task]"
3. AI will ask questions (follow DOE Method)
4. Decide tool based on Section III decision tree
5. Build in appropriate location:
   - n8n: Create workflow, export to automations/workflows/
   - MCP: Create in automations/mcps/
   - Script: Create in automations/scripts/
6. Test thoroughly
7. Document in workflow_state.md
8. Commit to git
```

### Scenario 3: New Client Onboarding

```
1. Create client folder: clients/client-name/
2. Create client-profile.json (see template above)
3. Create numbered folders: 01_admin, 02_intake, 03_website, etc.
4. Add client info to company/sales/active-clients.md
5. Create branch: bootstrap/client-name-YYYYMMDD
6. Set up website/automations as needed
7. Document in workflow_state.md
8. Merge to main when launched
```

### Scenario 4: Something Broke

```
1. DON'T PANIC
2. Check git status: What changed?
3. Look at recent commits: git log --oneline -10
4. Identify the breaking change
5. Options:
   - Fix forward: Make new commit fixing issue
   - Rollback: git revert [commit-hash]
   - Hard reset (last resort): git reset --hard [good-commit]
6. Document the issue in workflow_state.md (self-annealing)
7. Update process to prevent future occurrences
```

---

## IX. YOUR INCOME-GENERATING WORKFLOW

### The Real Priority (Making Money)

**Stop getting stuck on systems. Start shipping client work.**

```
INCOME-GENERATING ACTIVITIES (Focus here):
1. Finish client projects
2. Launch client websites
3. Set up client automations
4. Send invoices
5. Market your services

NON-INCOME ACTIVITIES (Minimize):
1. Watching YouTube tutorials
2. Reorganizing your folder structure
3. Perfecting your Git workflow
4. Reading about "the best system"
5. Analysis paralysis
```

### The 80/20 Rule for Your Business

**80% of income comes from:**
- Completing client websites quickly
- Setting up automations that work
- Getting clients live and paying

**20% of income comes from:**
- Perfect folder structure
- Optimal Git workflows
- Knowing every automation tool

**Therefore**: Use "good enough" systems and SHIP WORK.

---

## X. YOUR ACTION PLAN (RIGHT NOW)

### Immediate Next Steps

1. **Make GitHub repo private** (protect client data)
2. **Create client-profile.json for all 5 clients** (know who you're serving)
3. **Finish habibi project** (get paid)
4. **Address Replit website issue** (get client happy)
5. **Invoice completed work** (get paid)

### This Week

1. **Use THIS document as your guide** (bookmark it)
2. **Stop consuming external content** (you have a system)
3. **Work through client projects one by one** (ship work)
4. **Document learnings in workflow_state.md** (self-anneal)
5. **Commit to Git daily** (protect your work)

### This Month

1. **Complete all active client projects**
2. **Get testimonials from happy clients**
3. **Market your services** (you have pricing, go sell)
4. **Refine your system based on what actually works**
5. **Make income, reduce confusion**

---

## XI. THE ONE RULE TO RULE THEM ALL

**When in doubt:**

1. Open this file: `docs/internal/FOUNDATIONAL_SYSTEM.md`
2. Find the relevant section
3. Follow the process
4. Ship the work
5. Get paid

**That's it. That's the system.**

---

## XII. YOUR COMMITMENT

**I commit to:**
- ✅ Following MY system (not YouTube's, not ChatGPT's)
- ✅ Opening Cursor at the ROOT every time
- ✅ Using the DOE Method for significant work
- ✅ Focusing on SHIPPING client work, not perfecting systems
- ✅ Documenting learnings in workflow_state.md
- ✅ Making decisions based on THIS document
- ✅ Getting PAID for my work

**I will STOP:**
- ❌ Watching endless YouTube tutorials
- ❌ Asking external sources for "the best way"
- ❌ Second-guessing my system
- ❌ Reorganizing instead of working
- ❌ Getting stuck in analysis paralysis

---

**This is your system. Trust it. Use it. Ship work. Get paid.**

**End of Foundational System Document**
