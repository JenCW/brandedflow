# BRANDED + FLOW - CONTEXT INITIALIZATION
**Last Updated:** November 25, 2024  
**Project:** Intelligence-Powered Branding & Automation Agency  
**Founder:** Jen  
**Status:** Pre-launch, Foundation Phase

---

## PROJECT OVERVIEW

**Business Model:** Quick Start services combining AI-powered research + brand design + marketing automation  
**Target Market:** Overwhelmed solopreneurs and small businesses ($75K-250K annual revenue)  
**Core Differentiator:** Research-first approach (competitors just execute what clients ask)  
**Delivery Model:** Standardized tech stack + MCP automation + Base44 client portals

**Founder Constraints:**
- Phone anxiety/PTSD from past workplace trauma
- Solo operation (no team yet)
- Limited runway (need revenue in 30-60 days)
- Warm lead network available for fast sales
- Strong technical skills (can build MCPs, automation)

---

## LOCKED DECISIONS (DO NOT REVISIT)

### Service Offering
- **10 Quick Starts** (not 49) organized by pain point
- Every Quick Start includes: mini research sprint, brand component, automation component, tracking dashboard, branded portal access
- Pricing: $1,200-2,997 DIY one-time OR 50% setup + $197-697/mo Managed
- Launch with 3-4 services, expand after validation

### Top Priority Services (Build MCPs in This Order)
1. Call Screening & Prep System ($1,997 DIY / $997+$397mo Managed) - **Week 3-4**
2. Lead Magnet Setup ($1,500 DIY / $750+$297mo Managed) - **Week 3-4**
3. Client Onboarding Automation ($1,500 DIY / $750+$297mo Managed) - **Week 7-8**
4. Complete Template System ($2,997 DIY / $1,497+$397mo Managed) - **Week 9-10**

### Tech Stack (Standardized for All Clients)
- **CRM:** Airtable (Team $20/mo, per-client bases)
- **Automation:** n8n (self-hosted $10/mo VPS)
- **Client Portals:** Base44 Builder $50/mo (UNLIMITED portals)
- **Email:** ConvertKit (Free tier, $29/mo when needed)
- **Websites:** 10Web AI ($20/mo per client site)
- **Design:** Canva (Free or Pro $10/mo)
- **AI:** Claude API ($10-30/mo usage)
- **Phone AI:** iAnswering.ai (pending partnership formalization)

### Portal Strategy
- Every Quick Start includes Base44 portal access
- DIY clients: 90-day access
- Managed clients: Permanent access
- Zero marginal cost (Base44 is flat-rate unlimited)
- Portal includes: project tracking, research deliverables, metrics dashboards, support messaging

### Business Fundamentals Locked
- LLC formation within 30 days
- Professional liability insurance ($500-800/year)
- Service agreement template (Bonsai $24/mo)
- Business bank account (separate from personal)
- Domain: brandedandflow.com (also own brandedflow.com)

---

## CURRENT PHASE: WEEK 1-2 FOUNDATION

### Immediate Tasks (This Week)
- [ ] Form LLC
- [ ] Get EIN from IRS
- [ ] Get professional liability insurance quote
- [ ] Set up Airtable Free with 30 warm contacts
- [ ] Build mini-research-sprint MCP (priority #1)
- [ ] Create service agreement template
- [ ] Build simple website (10Web or Notion page)

### Next Week Tasks
- [ ] Send 5 warm outreach emails per day (35 total)
- [ ] Follow up on responses
- [ ] Send 3+ proposals
- [ ] Close first client
- [ ] Deliver first project manually while documenting

---

## AI WORKFLOW DECISIONS

### Tool Assignments
- **ChatGPT Pro Deep Research:** Client research, competitive analysis, market gaps, buyer personas
- **Claude Code (VSCode):** Building MCPs, writing automation code, technical problem-solving
- **NotebookLM:** Synthesizing research documents, creating source-grounded insights
- **Gamma:** Client-facing presentations, proposals, brand strategy documents
- **n8n:** Automation workflows, client onboarding, email sequences

### Context Management System
**Problem Solved:** Chat chaos, lost decisions, fragmented context across multiple AI conversations

**Solution:** Rolling summary + selective retrieval (NO RAG needed for solo operation)

**Daily Workflow:**
1. Start session: Paste previous summary from client's Notion page
2. Work with AI on client tasks
3. End session: Ask "Summarize key decisions and next actions"
4. Copy summary to client's Notion page
5. Commit code/docs to GitHub

**Folder Structure:**
```
/brandedflow/
  /clients/
    /client-name/
      context.md (running summary)
      onboarding.md (questionnaire responses)
      research/ (ChatGPT outputs)
      deliverables/ (final files)
  /mcp-servers/
    /mini-research-sprint/
    /call-screening/
    /lead-magnet/
    /client-onboarding/
  /templates/
    service-agreement.md
    proposal-template.md
    onboarding-questionnaire.md
  /docs/
    INIT.md (this file)
    OPERATIONS_MANUAL.md
    DECISIONS_LOG.md
```

**GitHub Automation:**
```bash
# Schedule daily at 11pm
git add .
git commit -m "Daily update: $(date +%Y-%m-%d)"
git push origin main
```

### RAG Decision
**Not needed.** Solo operator managing <10 concurrent clients doesn't need vector database overhead. Current system (ChatGPT Projects + Notion + GitHub + Claude Code context files) handles context preservation adequately.

**When to reconsider RAG:** 25+ concurrent clients, 100+ documents per client, need instant semantic search across all client data.

---

## CRITICAL NUMBERS

### Monthly Operating Costs
- **Bootstrap (Month 1-2):** $75/mo
- **Professional (Month 3+):** $164/mo
- **Per Managed Client:** $61-111/mo (passed to client in pricing)

### Break-Even Revenue
- Monthly base: $164
- Living expenses: ~$3,000/mo (estimate)
- Total needed: $3,164/mo
- **Options:**
  - 8 Managed clients at $397/mo = $3,176/mo
  - 2 DIY sales/month at $1,500 = $3,000/mo
  - **Realistic:** 5 Managed + 1 DIY/mo = $3,485/mo

### First 90 Days Revenue Targets
- **Month 1:** 1 client at $2,500 = $2,500
- **Month 2:** 2 clients at $3,000 avg = $6,000
- **Month 3:** 3-4 clients at $3,500 avg = $10,500-14,000
- **Total:** $19,000-22,500 in first 90 days

---

## iAnswering.ai PARTNERSHIP STATUS

**Current:** Verbal approval from Richard to white-label  
**Needed:** Written agreement within 30 days  
**Must Include:**
- Wholesale pricing locked for 12 months
- Unlimited markup rights
- White-label/rebrand permission
- Ownership of custom scripts/configs created
- Clear support division
- 90-day termination notice minimum

**Backup Plan:** If no signed agreement by Day 30, build alternative using Bland.ai ($0.08/min) or Vapi.ai

**Email to Richard:** Drafted, send Week 1

---

## SALES STRATEGY (PHONE-FREE)

### Warm Lead Outreach Process
1. Email offering helpful insight (no pitch)
2. Loom video analysis of their situation (if they respond)
3. Proposal document with Loom walkthrough
4. Email follow-up handling objections
5. Digital signature + Stripe checkout

### Daily Routine
- 8am: Send 5 warm outreach emails
- 10am: Follow up on yesterday's responses
- 12pm: Create/send proposals
- 2pm: Loom videos for interested prospects
- 4pm: LinkedIn engagement

### Conversion Math
- 30 warm contacts
- 40% respond = 12 responses
- 50% say "yes send info" = 6 interested
- 40% convert to proposal = 2-3 proposals
- 50% close = 1-2 clients
- **Timeline:** 2-4 weeks to first sale

---

## MCP DEVELOPMENT PRIORITIES

### MCP #1: mini-research-sprint (BUILD THIS WEEK)
- **Input:** Client business name, industry, 5-10 competitor URLs, target audience, goals
- **Output:** 15-20 page research report (Gamma) with competitive landscape, market gaps, target audience, buyer personas, positioning, Quick Start recommendations
- **Time to Build:** 2-3 days with Claude Code
- **Time Saved:** 3-4 hours → 60 min per client

### MCP #2: call-screening-setup (WEEK 3-4)
- **Input:** Client business name, phone number, industry, greeting preferences
- **Output:** iAnswering.ai account provisioned, greeting configured, transcription → n8n → email/SMS summary, Airtable connection
- **Time to Build:** 2-3 days
- **Time Saved:** 3 hours → 2 minutes per client

### MCP #3: lead-magnet-deploy (WEEK 3-4)
- **Input:** Client logo/colors, lead magnet topic, target audience
- **Output:** PDF lead magnet (Canva), Gamma landing page, Airtable form, ConvertKit sequence, n8n connections
- **Time to Build:** 3-4 days
- **Time Saved:** 6 hours → 2 minutes per client

### MCP #4: client-onboarding (WEEK 7-8)
- **Input:** Client business name, email, Quick Start purchased
- **Output:** Portal created, welcome email sent, CRM entry, check-in scheduled
- **Time to Build:** 2-3 days
- **Time Saved:** 2 hours → 30 seconds per client

---

## OPEN QUESTIONS / PENDING DECISIONS

1. Navy Federal business account setup (in progress)
2. QuickBooks automation for Cash App + personal account transactions
3. VA hiring timeline (when revenue hits $5K/mo)
4. Whether to keep "Business Deep Dive" as optional foundation service
5. Exact messaging for "I Hate My Phone" category positioning

---

## RISKS & MITIGATION

**Risk:** iAnswering.ai partnership not formalized  
**Mitigation:** 30-day deadline, Bland.ai backup ready

**Risk:** Building too many MCPs before validating sales  
**Mitigation:** Only build MCPs after services proven to sell

**Risk:** Phone anxiety preventing sales  
**Mitigation:** Async sales process (email + Loom only)

**Risk:** Running out of money before revenue  
**Mitigation:** Warm leads shorten sales cycle to 2-4 weeks

**Risk:** Base44 price increase or shutdown  
**Mitigation:** Airtable Interface backup ready

**Risk:** API cost explosion  
**Mitigation:** Budget for 3-5x increases, OpenRouter fallback

---

## SUCCESS CRITERIA

**Week 2:** mini-research-sprint MCP functional  
**Week 4:** First client closed  
**Week 8:** 3 clients total, first testimonials  
**Week 12:** $10K total revenue, 6-7 clients  
**Month 6:** $10K/mo recurring, 20-25 clients  
**Month 12:** $20K/mo recurring, VA hired, 40-50 clients

---

## NOTES FOR FUTURE SESSIONS

- All client context lives in `/clients/[name]/context.md`
- All MCPs stored in `/mcp-servers/[name]/`
- GitHub commits happen daily at 11pm (automated)
- This INIT.md file updated weekly or when major decisions made
- Reference OPERATIONS_MANUAL.md for detailed processes
- Reference DECISIONS_LOG.md for chronological decision history

---

**Next Session Prompt:**
"We're building Branded + Flow. See INIT.md for full context. Today's focus: [specific task]."
