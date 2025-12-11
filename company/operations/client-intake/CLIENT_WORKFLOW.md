# Client Workflow - Complete Process

## Overview
This document outlines the complete client workflow from initial intake to full setup and ongoing management.

## The Process

### Phase 1: Initial Intake (Minimum Viable)

**When:** You first start working with a potential client

**Minimum Required Info:**
- Client Name (lowercase-kebab-case)
- Business Name
- Contact Email
- Industry

**What Happens:**
1. Open unified client form
2. Fill in minimum info
3. Click "Create Client & Start Research"
4. System creates:
   - Client folder structure
   - `client-profile.json`
   - Research prompts in `01_intake/research/`
   - Research execution guide

**Next Steps:**
- Research prompts are ready for ChatGPT Deep Research
- You run the 3-phase research process
- Research informs everything: brand, website, automations

---

### Phase 2: Proposal Creation (Draft)

**When:** After you have enough info to create a proposal

**What Happens:**
1. Continue filling unified form with:
   - Business story
   - Problems/opportunities
   - Services needed
   - Proposal details (phased or single)
   - Pricing
2. Click "Generate Proposal (Draft)"
3. System creates:
   - Modern HTML proposal in `05_deliverables/`
   - Proposal is DRAFT - not approved yet
   - No Airtable, Base44, or contract created yet

**Why Separate:**
- Not all proposals get approved
- Don't create infrastructure until client commits
- Proposals can be revised without affecting setup

---

### Phase 3: Proposal Approval (Full Setup)

**When:** Client clicks "Approve Phase 1" button in proposal

**What Happens:**
1. Click "Approve Proposal" in unified form
2. System triggers FULL SETUP:
   - ✅ Creates Airtable base
   - ✅ Creates Base44 portal
   - ✅ Generates contract
   - ✅ Creates onboarding docs
   - ✅ Sets up iAnswering.ai (if included)
   - ✅ Processes research findings (if complete)
   - ✅ Populates brand folder
   - ✅ Starts auto-sync to Base44

**Critical:** This is when the client becomes "active" and all systems are set up.

---

### Phase 4: Research Processing & Brand Development

**When:** After research is complete (can happen before or after approval)

**What Happens:**
1. Research findings are processed
2. Brand guidelines generated
3. Website structure recommended
4. Automation priorities identified
5. All updates sync to Base44 automatically

**Auto-Sync:**
- Any file update in client folder → Base44 portal updated
- Brand folder updates → Base44 brand section updated
- Deliverables added → Base44 deliverables section updated
- Research complete → Base44 research section updated

---

## Workflow States

### Draft
- Form filled but nothing generated yet
- Can save progress and come back

### Intake Created
- Client folder exists
- Research prompts ready
- Profile created
- **No proposal yet**

### Proposal Draft
- Proposal generated
- Client can review
- **Not approved yet**
- **No infrastructure created**

### Approved
- Proposal approved
- Full setup triggered
- Airtable, Base44, contract, onboarding all created
- Auto-sync active
- Client is "active"

### Active
- Project in progress
- All systems running
- Auto-sync keeping Base44 updated
- Regular updates to folders

---

## Minimum Viable Intake

**Required for folder creation:**
- Client Name
- Business Name
- Contact Email
- Industry

**Optional but helpful:**
- Target Market
- Business Story
- Problems/Opportunities
- Services
- Brand preferences

**What Triggers:**
- Client folder creation
- Research workflow initiation
- Profile creation

**What Does NOT Trigger:**
- Proposal (that's separate)
- Airtable/Base44 (only on approval)
- Contract (only on approval)

---

## Proposal Workflow

### Creating Proposal
1. Fill proposal tab in unified form
2. Generate proposal (creates HTML file)
3. Deploy to Netlify
4. Send link to client

### Client Reviews
- Client can review proposal
- Can ask questions
- Can request changes
- **Nothing is set up yet**

### Client Approves
- Client clicks "Approve Phase 1" button
- You click "Approve Proposal" in form
- **NOW** full setup triggers

---

## Auto-Sync to Base44

**What Syncs:**
- All folder contents (01_intake, 02_brand, 03_website, 04_automations, 05_deliverables)
- Profile updates
- Research findings
- Brand guidelines
- Website structure
- Automation status

**When It Syncs:**
- On any file change in client folder
- After research processing
- After brand folder population
- After proposal approval
- Continuously (watcher mode)

**How It Works:**
- `sync-folder-to-base44` MCP watches folder
- Detects changes
- Calls `update-base44-portal` MCP
- Portal stays up-to-date automatically

---

## Key Principles

1. **Minimum Viable First** - Just enough to create folder and start research
2. **Proposals Separate** - Don't create infrastructure until approved
3. **Approval Triggers Setup** - One click to set up everything
4. **Auto-Sync Everything** - Base44 always reflects current state
5. **Research First** - Everything depends on research findings

---

## File Locations

- **Unified Form:** `company/operations/client-intake/unified-client-form.html`
- **Client Folders:** `clients/{client-name}/`
- **Proposals:** `clients/{client-name}/05_deliverables/PROPOSAL_*.html`
- **Research:** `clients/{client-name}/01_intake/research/`
- **Brand:** `clients/{client-name}/02_brand/`

---

## MCPs Used

1. `process-client-intake` - Creates folder and profile
2. `trigger-client-research` - Sets up research workflow
3. `create-modern-proposal` - Generates HTML proposal
4. `approve-client-proposal` - Triggers full setup
5. `create-airtable-base` - Creates Airtable base
6. `create-base44-portal` - Creates Base44 portal
7. `create-contract` - Generates contract
8. `create-client-startup-docs` - Creates onboarding docs
9. `process-research-findings` - Processes research
10. `populate-brand-folder` - Populates brand folder
11. `sync-folder-to-base44` - Auto-syncs to Base44
12. `update-base44-portal` - Updates portal with new data

---

## Notes

- **Research is CRITICAL** - Everything depends on it
- **Proposals are drafts** - Until approved
- **Approval = Setup** - One action triggers everything
- **Auto-sync is automatic** - Base44 always current
- **One form for everything** - Unified workflow

