# WHAT YOU'RE GOING TO DO TO RUN THIS BUSINESS
**Last Updated:** November 25, 2024

---

## PART 1: HERE'S HOW YOU'RE GOING TO USE AI

### ChatGPT Pro - You Use This For Client Research

You're paying $20/mo for ChatGPT Pro. Here's what you're going to do with it:

**When a client fills out your onboarding form:**
1. You open ChatGPT Pro
2. You create a new Project and name it "[Client Name]"
3. You paste their onboarding questionnaire into the chat
4. You tell it: "Run Deep Research on [their industry] competitive landscape. I need: market gaps, positioning opportunities, and trends."
5. You wait 5-30 minutes while it analyzes 100+ sources
6. You download the report as markdown
7. You're done with ChatGPT for that client

You get 10 full Deep Research queries per month. That's enough for 3-5 clients if you're smart about batching questions.

### Claude Code - You Use This For Building Everything Technical

You're already using this in VSCode. Here's what you're going to keep doing:

**Every time you need to build something (MCP, automation, code):**
1. You open your brandedflow project in VSCode
2. You tell Claude: "See INIT.md for context. Today I'm building [whatever]."
3. You let Claude see your entire project structure
4. You build the thing
5. You test it
6. You commit to GitHub (happens automatically at 11pm)
7. You're done

Don't use Claude Code for research. Don't use ChatGPT for coding. Stay in your lane.

### NotebookLM - You Use This To Make Sure AI Isn't Lying

You're using this for free. Here's what you're going to do:

**After ChatGPT gives you research:**
1. You open NotebookLM
2. You create a notebook for that client
3. You upload the ChatGPT report + any competitor websites + client docs
4. You ask it: "What are the top 3 opportunities for this client?"
5. It tells you, with citations to specific sources
6. You use those citations in your client deliverable
7. You're done

NotebookLM's job is to fact-check ChatGPT and show you where the info came from.

### Gamma - You Use This To Make Client Presentations Look Good

You're using the free version. Here's what you're going to do:

**When you need to give client a presentation:**
1. You paste your research or outline into Gamma
2. You click "Generate presentation"
3. You wait 60 seconds
4. You spend 8-10 minutes fixing formatting and adding images
5. You export as PDF or get shareable link
6. You send it to client
7. You're done

If you make more than 3 presentations per month, you'll need to pay $8/mo for Pro.

### n8n - You Use This To Connect Everything

You're going to self-host this on a VPS for $10/mo.

**Here's what you're going to use it for:**
- When client fills form → data goes to Airtable → welcome email sends
- When you upload file to Google Drive → client gets notified
- When invoice is due → reminder email sends
- When call comes in → transcription goes to your email

You're not building these workflows manually. You're using Claude Code to build them.

---

## HERE'S HOW YOU'RE NEVER GOING TO LOSE CONTEXT AGAIN

You said: "I used to get myself in a complete tizzy trying to find decisions made in various chats."

That's because you were using AI wrong. Here's what you're going to do instead:

### You're Setting Up This Folder Structure TODAY

```
/Users/jen/brandedflow/
├── INIT.md                    ← You paste this at start of every Claude Code session
├── OPERATIONS_MANUAL.md       ← This file you're reading right now
├── DECISIONS_LOG.md           ← Every decision you make gets written here
│
├── /clients/
│   ├── /acme-corp/
│   │   ├── context.md        ← Running summary of everything about this client
│   │   ├── onboarding.md     ← Their questionnaire answers
│   │   ├── /research/        ← ChatGPT reports you downloaded
│   │   └── /deliverables/    ← Final files you gave them
│   │
│   └── /widgets-inc/
│       └── (same structure)
│
├── /mcp-servers/
│   ├── /mini-research-sprint/
│   ├── /call-screening-setup/
│   └── /lead-magnet-deploy/
│
├── /templates/
│   ├── service-agreement.md
│   ├── proposal-template.md
│   └── warm-outreach-email.md
│
└── /docs/
    └── (other guides)
```

### Here's Your Daily Routine

**8am - You Start Your Day:**
1. You open Claude Code
2. You read INIT.md to remember what you're doing
3. You check DECISIONS_LOG.md to see what you decided yesterday
4. You start working

**During The Day:**
- Working on Acme Corp? You open `/clients/acme-corp/context.md` first
- Building an MCP? You let Claude Code see the whole `/mcp-servers/` folder
- Creating a template? You save it to `/templates/`

**6pm - You End Your Day:**
1. You update the context.md file for whatever client you worked on
2. You add today's decisions to DECISIONS_LOG.md
3. You close your computer
4. At 11pm, Git automatically commits everything

**Next Day When You Open Claude Code:**
You type: "See INIT.md for full context. See /clients/acme-corp/context.md for this client. Today I'm building their lead magnet."

Claude now knows everything instantly. You don't re-explain anything.

### You're Setting Up Git Auto-Commit RIGHT NOW

1. You create a file called `.git-auto-commit.sh` in your project folder
2. You paste this in it:

```bash
#!/bin/bash
cd /Users/jen/brandedflow
git add .
git commit -m "Daily update: $(date +%Y-%m-%d)"
git push origin main
```

3. You make it executable: `chmod +x .git-auto-commit.sh`
4. You schedule it to run daily:

```bash
crontab -e
# Add this line:
0 23 * * * /Users/jen/brandedflow/.git-auto-commit.sh
```

Now every day at 11pm, everything you did commits to GitHub automatically. If your computer dies, you lose nothing.

---

## PART 2: HERE ARE THE 10 SERVICES YOU'RE SELLING

You're not selling 49 services. You're selling 10. Here's what they are.

### SERVICE 1: Call Screening & Prep System (YOUR FAVORITE)

**What You're Selling:**
"I set up an AI that answers your phone, screens calls, and sends you a prep brief before you call people back."

**What The Client Pays:**
- DIY: $1,997 one-time (they manage it after you set it up)
- Managed: $997 setup + $397/month (you manage it forever)

**What You Actually Deliver:**
1. You set up their iAnswering.ai account
2. You write their greeting script
3. You configure it so call transcriptions go to their email
4. You connect it to their Airtable CRM
5. You give them a portal where they can see all their calls
6. If Managed: You monitor it monthly and fix issues

**How Long This Takes You:**
- Manual delivery: 3-4 hours
- With MCP (after you build it): 5 minutes

**When You're Building The MCP:**
Week 3-4, using Claude Code

---

### SERVICE 2: Text & Voicemail Daily Brief

**What You're Selling:**
"Every morning at 7am, you get one email that summarizes all your texts and voicemails sorted by urgency."

**What The Client Pays:**
- DIY: $1,997 one-time
- Managed: $997 setup + $397/month

**What You Actually Deliver:**
1. You set up AI monitoring of their texts and voicemails
2. You build an automation that runs at 7am daily
3. It categorizes messages: URGENT / TODAY / THIS WEEK / IGNORE
4. It sends them one summary email
5. You give them a portal to see message history

**How Long This Takes You:**
- Manual: 3-4 hours
- With MCP: 5 minutes

**When You're Building The MCP:**
Week 5-6

---

### SERVICE 3: Daily Email Brief (Inbox Zero System)

**What You're Selling:**
"AI scans your inbox overnight and gives you a prioritized morning brief so you're not drowning in email."

**What The Client Pays:**
- DIY: $1,997 one-time
- Managed: $997 setup + $397/month

**What You Actually Deliver:**
1. You connect to their email via API
2. You set up AI to scan overnight (runs at 6am)
3. It creates a priority list: RESPOND TODAY / READ WHEN FREE / AUTO-ARCHIVED SPAM
4. It emails them the brief
5. Optional: It auto-archives obvious spam
6. Portal access to see what was archived

**How Long This Takes You:**
- Manual: 3-4 hours  
- With MCP: 5 minutes

**When You're Building The MCP:**
Week 5-6

---

### SERVICE 4: Lead Magnet Setup

**What You're Selling:**
"I create a lead magnet, build a landing page, connect it to your email system, and set up the follow-up sequence."

**What The Client Pays:**
- DIY: $1,500 one-time
- Managed: $750 setup + $297/month

**What You Actually Deliver:**
1. You do research on what their audience wants
2. You design the PDF lead magnet in Canva
3. You build a landing page in Gamma
4. You create an Airtable form for their email capture
5. You write a 5-email ConvertKit sequence
6. You connect everything via n8n
7. Portal with tracking dashboard

**How Long This Takes You:**
- Manual: 6 hours
- With MCP: 10 minutes

**When You're Building The MCP:**
Week 3-4 (this is your second MCP to build)

---

### SERVICE 5: Contact Form Intelligence

**What You're Selling:**
"Your website contact form automatically responds within 5 minutes, logs to your CRM, and starts a follow-up sequence."

**What The Client Pays:**
- DIY: $1,200 one-time
- Managed: $600 setup + $197/month

**What You Actually Deliver:**
1. You build/redesign their contact form
2. You write an AI-powered instant response
3. You connect it to Airtable CRM
4. You set up a follow-up email sequence
5. Portal dashboard showing form submissions

**How Long This Takes You:**
- Manual: 3 hours
- With MCP: 5 minutes

**When You're Building The MCP:**
Week 7-8

---

### SERVICE 6: Complete Template System

**What You're Selling:**
"I create 20+ branded templates (proposals, invoices, emails, social posts) that auto-populate from your CRM."

**What The Client Pays:**
- DIY: $2,997 one-time
- Managed: $1,497 setup + $397/month

**What You Actually Deliver:**
1. You do research on their brand voice
2. You create 20+ templates in Canva and Google Docs
3. You connect them to Airtable so they auto-fill
4. You set up hotkeys/shortcuts for quick access
5. Portal library of all templates

**How Long This Takes You:**
- Manual: 8 hours
- With MCP: 15 minutes

**When You're Building The MCP:**
Week 9-10

---

### SERVICE 7: Homepage Overhaul

**What You're Selling:**
"I redesign your homepage to actually convert visitors into leads."

**What The Client Pays:**
- DIY: $1,500 one-time
- Managed: $750 setup + $397/month

**What You Actually Deliver:**
1. You do research on their competitors' homepages
2. You redesign their homepage (hero, value prop, CTA, social proof)
3. You add a lead capture form
4. You set up tracking
5. Portal dashboard showing homepage performance

**How Long This Takes You:**
- Manual: 5 hours
- With MCP: 20 minutes

**When You're Building The MCP:**
Week 11-12

---

### SERVICE 8: Client Onboarding Automation

**What You're Selling:**
"From the moment someone pays you, everything happens automatically: welcome email, portal access, calendar scheduling, CRM entry."

**What The Client Pays:**
- DIY: $1,500 one-time
- Managed: $750 setup + $297/month

**What You Actually Deliver:**
1. You build a welcome email sequence
2. You set up automatic portal creation
3. You auto-schedule their kickoff call
4. You auto-create CRM entry
5. Portal for them to track their onboarding status

**How Long This Takes You:**
- Manual: 4 hours
- With MCP: 2 minutes

**When You're Building The MCP:**
Week 7-8

---

### SERVICE 9: Invoice Automation

**What You're Selling:**
"Invoices automatically send, reminders automatically go out, late fees automatically apply."

**What The Client Pays:**
- DIY: $1,200 one-time
- Managed: $600 setup + $197/month

**What You Actually Deliver:**
1. You create branded invoice templates
2. You set up auto-send based on triggers
3. You build reminder automation (3 days before, day of, 3 days after)
4. You set up late fee calculation
5. Portal dashboard showing invoice status

**How Long This Takes You:**
- Manual: 3 hours
- With MCP: 5 minutes

**When You're Building The MCP:**
Week 9-10

---

### SERVICE 10: Business Deep Dive & Strategy (OPTIONAL)

**What You're Selling:**
"Before we build anything, I research your business, competitors, and market to create a strategic roadmap."

**What The Client Pays:**
$997 one-time (credited toward any Quick Start they buy within 30 days)

**What You Actually Deliver:**
1. You run ChatGPT Deep Research on their industry
2. You create 3 detailed buyer personas
3. You do competitive analysis
4. You make positioning recommendations
5. You tell them which Quick Starts to buy and in what order
6. 20-page strategy document in Gamma

**How Long This Takes You:**
- Manual: 5 hours
- With MCP: 90 minutes

**When You're Building The MCP:**
Week 1-2 (this is your FIRST MCP - you use it for every client)

---

---

## HERE'S HOW MUCH MONEY YOU NEED

### You Need $192/Month Minimum To Keep The Business Running

Here's what you're paying for every month whether you have clients or not:

- Professional liability insurance: $42/mo
- n8n VPS hosting: $10/mo  
- Domain + email (Google Workspace): $12/mo
- Claude API (light usage): $10/mo
- Base44 Builder (unlimited portals): $50/mo
- Airtable Team: $20/mo
- ConvertKit: $0 (free tier)
- Canva: $0 (free tier)
- **TOTAL: $144/mo**

Add $50 buffer for unexpected shit = **$194/mo to operate**

### You Need $3,164/Month To Actually Live

Your business costs: $194/mo  
Your living expenses: ~$3,000/mo (estimate - adjust to your reality)  
**Total you need: $3,194/mo**

### Here's How You Get To $3,194/Month

**Option 1: All Managed Clients**
8 clients paying $397/mo average = $3,176/mo ✓

**Option 2: Mix of Managed + DIY**
5 Managed clients at $397/mo = $1,985/mo  
+ 1 DIY sale per month at $1,500 = $1,500/mo  
= $3,485/mo ✓

**Option 3: All DIY (Harder)**
2.1 DIY sales per month at $1,500 avg = $3,150/mo ✓

**What I'm Telling You To Do:**
Go for Option 2. Sell Managed plans to clients who want ongoing support. Sell DIY to clients who are broke but motivated.

### Here's What You Make Per Managed Client

**Client pays you:** $397/mo (average Managed price)

**You pay for their tools:**
- ConvertKit: $29/mo (when they need email)
- 10Web website: $20/mo (if building site)
- Calendly Pro: $12/mo (if using scheduling)
- iAnswering.ai: $50/mo (if using phone AI)
- **Total per client: $61-111/mo**

**Your profit:** $397 - $111 = $286/mo per client

At 10 Managed clients: $2,860/mo profit  
At 20 Managed clients: $5,720/mo profit  
At 30 Managed clients: $8,580/mo profit

### Here's Your Revenue Targets

**Month 1:**
- Close 1 client at $2,500
- Total revenue: $2,500

**Month 2:**
- Close 2 more clients at $3,000 avg
- Total revenue: $6,000

**Month 3:**
- Close 3-4 more clients at $3,500 avg
- Total revenue: $10,500-14,000

**First 90 Days Total:** $19,000-22,500

If half choose Managed plans, you'll have $1,500-2,000/mo recurring by Month 3.

---

---

## HERE'S WHAT YOU'RE DOING FOR THE NEXT 90 DAYS

### WEEK 1-2: Get Legal Shit Done + Build First MCP

**Monday-Tuesday:**
- You form an LLC (or register as sole proprietor)
- You apply for EIN from IRS (takes 15 minutes online)
- You open a business bank account
- You get professional liability insurance quotes

**Wednesday-Friday:**
- You set up Airtable Free and add 30 warm contacts
- You create your service agreement template (use Bonsai for $24/mo)
- You build a simple website (10Web or just a Notion page)

**Weekend:**
- You start building the `mini-research-sprint` MCP in Claude Code
- This is your first MCP
- You're going to use it for every single client

**By End of Week 2:**
- ✓ LLC formed
- ✓ EIN obtained  
- ✓ Insurance purchased
- ✓ Business bank account open
- ✓ mini-research-sprint MCP working

---

### WEEK 3-4: Send Emails + Close First Client

**Every Morning (8am):**
You send 5 warm outreach emails. No excuses. 5 per day.

**Template you're using:**
```
Subject: [First Name], quick question about [their business]

Hi [Name],

I was thinking about our conversation at [event/context] and remembered you mentioned [specific challenge].

I recently helped [similar person] solve [related problem] using [brief description]. They saw [specific result].

Would it be helpful if I sent you a quick breakdown? No call needed – just a Loom video + doc you can review when you want.

Let me know!
- Jen
```

**Every Day (10am-2pm):**
- You follow up on responses from yesterday
- You create Loom videos for people who said "yes"
- You send proposals to interested people
- You answer questions via email (no calls)

**Your Goal:**
- Send 35 emails total (5/day × 7 days)
- Get 3-5 proposals sent
- Close 1 client by end of Week 4

**Meanwhile, You're Also:**
- Building the `call-screening-setup` MCP
- Building the `lead-magnet-deploy` MCP

**By End of Week 4:**
- ✓ 1 client closed
- ✓ First payment received ($1,500-2,997)
- ✓ 2 more MCPs built

---

### WEEK 5-8: Deliver To First Client + Close 2 More

**Week 5:**
- You deliver to your first client (using MCPs where you have them, manually where you don't)
- You document everything you do
- You continue sending 5 emails/day
- You build the `text-voicemail-brief` MCP
- You build the `email-brief-system` MCP

**Week 6:**
- You close your second client
- You deliver faster this time (you have more MCPs now)
- You keep sending 5 emails/day

**Week 7:**
- You close your third client  
- You build the `client-onboarding` MCP
- You build the `contact-form-connect` MCP

**Week 8:**
- You deliver to clients 2 and 3
- You get your first testimonials
- You update your website with testimonials

**By End of Week 8:**
- ✓ 3 clients total
- ✓ $4,500-9,000 revenue total
- ✓ 3 testimonials
- ✓ 6 MCPs built (delivery is getting fast now)

---

### WEEK 9-12: Close 4 More Clients + Systematize Everything

**Week 9:**
- You close client #4
- You build the `template-system-deploy` MCP
- You build the `invoice-automation` MCP

**Week 10:**
- You close client #5
- You deliver to client #4 (fast now with MCPs)
- You document any new processes

**Week 11:**
- You close clients #6 and #7
- You build the `homepage-refresh` MCP

**Week 12:**
- You deliver to all remaining clients
- You're now delivering Quick Starts in under 1 hour each
- You have 6-7 clients total
- You're making $10K-15K total revenue

**By End of Week 12 (90 Days):**
- ✓ 6-7 clients
- ✓ $15K-22K total revenue
- ✓ If half chose Managed: $1,500-2,000/mo recurring
- ✓ All major MCPs built
- ✓ Delivery is mostly automated

---

### How You're Spending Your Time Each Day

**Weeks 1-4:**
- 50% sales (outreach, follow-up, proposals)
- 30% building MCPs
- 20% client delivery

**Weeks 5-8:**
- 40% sales
- 30% client delivery
- 20% building MCPs
- 10% admin/testimonials

**Weeks 9-12:**
- 40% sales
- 40% client delivery (but faster now)
- 10% building last MCPs
- 10% systematizing

**The Rule:**
If you're not talking to potential clients or delivering to paying clients, you're wasting time.

---

## PART 3: LEGAL SHIT YOU CANNOT SKIP

### You're Forming An LLC Within 30 Days

**Why you're doing this:**
- Protects your personal assets if someone sues you
- Makes you look more professional to clients
- Lets you write off business expenses

**How you're doing this:**
1. You go to your state's Secretary of State website
2. You fill out the LLC formation form
3. You pay $50-500 (depends on your state)
4. You get your LLC certificate in 1-2 weeks

**Or you use:**
- LegalZoom ($79 + state fees)
- Northwest Registered Agent ($39 + state fees)

**What happens after:**
- You'll pay $50-800/year to keep it active (varies by state)
- You file annual reports
- You keep business and personal money separate

---

### You're Getting An EIN From The IRS (Takes 15 Minutes)

**What this is:**
It's like a social security number for your business.

**Why you need it:**
- Required to open business bank account
- Required to hire anyone (even a VA)
- Separates your business from your personal identity

**How you get it:**
1. You go to irs.gov/businesses/small-businesses-self-employed/apply-for-an-employer-identification-number-ein-online
2. You fill out the form (15 minutes)
3. You get your EIN instantly
4. It's free

**You do this in Week 1.**

---

### You're Getting Professional Liability Insurance (Required)

**What this is:**
E&O (Errors & Omissions) insurance that protects you if a client says your work damaged their business.

**Why you need it:**
- If client claims your automation broke their business, they could sue you
- Without insurance, they're suing YOU personally
- With insurance, insurance company handles it

**How much it costs:**
$500-800 per year = $42-66/month

**Coverage you're getting:**
- $1M per occurrence
- $2M aggregate

**Where you're getting it:**
- Next Insurance (online, instant quotes)
- Hiscox (online)
- Thimble (online)

**You do this in Week 1.**

---

### You're Opening A Business Bank Account

**Why you're doing this:**
- IRS requires separation of business and personal money
- If you mix them, you lose LLC protection
- Makes taxes way easier

**What you need:**
- Your LLC certificate
- Your EIN
- $25-100 to open account

**Where you're opening it:**
- Navy Federal (you mentioned you're getting this)
- Or your local credit union
- Or Mercury/Relay (online business banks)

**You do this in Week 1-2.**

---

### You're Getting Service Agreement Template (You Use This For Every Client)

**What this is:**
Legal contract that says what you're delivering, what client pays, who owns what, and limits your liability.

**What it must include:**
- Scope of work (which Quick Start you're delivering)
- Payment terms ($X due upfront, $Y due on delivery)
- Intellectual property (client owns deliverables, you own MCPs/systems)
- Liability limits ("We're not liable for damages exceeding amount paid")
- Termination clause (how either party cancels)
- Dispute resolution (arbitration, not court)

**Where you're getting it:**
- Bonsai: $24/mo (has templates)
- LegalZoom: $50-200 one-time
- Attorney review: $300-500 one-time

**You use this before starting ANY client work.**

---

### You're Getting Privacy Policy + Terms of Service (For Your Website)

**Why you need these:**
- Privacy Policy = required by law if you collect ANY client data
- Terms of Service = protects you from website liability

**Where you're getting them:**
- Termly.io (free generator)
- TermsFeed (free generator)
- Just copy/paste them to your website footer

**You do this when you build your website (Week 1-2).**

---

### Here's What's OPTIONAL (Not Required)

**Accounting Software:**
QuickBooks ($30/mo) or Wave (free)  
**When:** Now if you're organized, Month 3 if you're not

**Trademark:**
$250-750 to register your business name  
**When:** After $10K revenue (not before)

**Attorney-Reviewed Contracts:**
$300-500 for lawyer to review your service agreement  
**When:** After first 5 clients (not before)

**Business Credit Card:**
Helps build business credit  
**When:** After 3 months of consistent revenue

---

### How To Avoid Industries That Require Expensive Certifications

**DO NOT accept clients in:**
- Healthcare (HIPAA required = expensive)
- Financial services (SOC 2 required = expensive)
- Legal (BAA required = expensive)
- Government contractors (clearances required)

**DO accept clients in:**
- Coaching/consulting
- Service businesses (plumbers, electricians, etc.)
- Creative professionals (photographers, designers)
- Local businesses (restaurants, gyms)
- E-commerce (non-medical products)
- B2B SaaS

**How you screen them:**
In your onboarding questionnaire, you ask: "What industry are you in?"

If they answer healthcare/finance/legal, you say:
"I focus on [other industries] to provide the best specialized service. I can refer you to [competitor who handles regulated industries]."

This keeps you out of certification hell.

---

### iAnswering.ai Partnership Lock-In Steps

**WEEK 1: Email Richard**

Subject: Formalizing White-Label Partnership for Branded + Flow

Hi Richard,

I'm ready to move forward with white-labeling iAnswering.ai for my clients. To ensure we're aligned, I'd like to formalize our partnership with a written agreement.

Can we discuss:
1. Wholesale pricing (my cost per client/month)
2. Markup rights (can I charge $300-500/mo to clients?)
3. White-label terms (can I brand as "Branded + Flow AI Receptionist"?)
4. Customization ownership (scripts/configs I create - who owns them?)
5. Support model (who handles tech issues vs client questions?)
6. Contract length (monthly or annual commitment?)

I'd like to have this in writing within 30 days so I can confidently market to clients.

Available for a call this week?

Best,
Jen

**WHAT YOU NEED IN AGREEMENT:**
- Your cost locked for 12 months
- Unlimited markup rights
- White-label/rebrand permission
- You own custom scripts/configs
- Clear support division
- 90-day termination notice minimum
- (Ideal: Exclusivity in your niche)

**BACKUP PLAN IF RICHARD WON'T FORMALIZE:**
- Bland.ai: $0.08/min, full white-label, API-first
- Vapi.ai: $0.05/min + $20/mo per number
- Build your own: Twilio + AssemblyAI + Claude API ($50-100/client)

**DEADLINE:**
- If no signed agreement by Day 30 → start building Bland.ai alternative
- You can't build business on verbal partnership

---

### VA Hiring Guide

**WHEN TO HIRE:**
- Revenue: $5K+/mo consistent
- You're turning down work due to capacity
- Admin tasks taking 10+ hrs/week

**WHAT TO DELEGATE:**
- Email responses to inquiries
- Scheduling calls via Calendly
- Airtable data entry
- Portal setup (after you templatize)
- Client check-in messages
- Social media scheduling
- Basic n8n workflow triggers (after training)

**WHERE TO FIND:**
- Upwork (vet carefully, pay $15-25/hr)
- Fancy Hands ($30-60/mo for 5-10 hrs)
- Belay ($1,500+/mo for dedicated VA)

**COST:**
- Part-time (5-10 hrs/week): $300-500/mo
- Part-time (10-20 hrs/week): $600-1,000/mo

**SOP (Standard Operating Procedure) Creation:**
- Loom record yourself doing task
- Write step-by-step checklist
- VA watches video + follows checklist
- VA does task with you watching
- VA does task independently
- Create Notion page per process

**IP PROTECTION:**
- VA signs contractor agreement with IP assignment
- VA has no access to MCP code repositories
- VA only executes, doesn't build

---

### QuickBooks Automation Setup

**CURRENT PROBLEM:**
- Transactions in: Cash App, Credit Union personal, Navy Federal (soon)
- Need to get into QuickBooks without manual entry

**SOLUTION: Use n8n Workflow**

1. **Cash App:**
   - Cash App → Email receipts → Gmail
   - n8n monitors Gmail for Cash App receipts
   - Parses amount, date, description
   - Creates QuickBooks expense via API

2. **Credit Union & Navy Federal:**
   - Export CSV weekly from online banking
   - Upload to Google Drive folder
   - n8n monitors folder for new CSVs
   - Parses transactions
   - Creates QuickBooks entries via API

3. **Alternative: Use Synder.com**
   - Connects to Cash App, banks, PayPal, Stripe
   - Auto-syncs to QuickBooks
   - Cost: $55-85/mo
   - Worth it if n8n solution is too complex

**PROPER METHOD (Do This):**
- Open Navy Federal business account (not personal)
- Get business credit card
- Use ONLY business accounts for business
- Personal = personal, business = business
- Makes taxes infinitely easier

---

### Success Metrics Per Quick Start

**Call Screening & Prep System:**
- Metric: % of calls answered by AI vs missed
- Target: 95%+ answered
- Dashboard: Airtable with call log, response time

**Lead Magnet Setup:**
- Metric: Landing page conversion rate
- Target: 20-40% visitors → downloads
- Dashboard: Embedded Google Analytics

**Contact Form Intelligence:**
- Metric: Form submission → response time
- Target: <5 minutes automated response
- Dashboard: Airtable automation log

**Template System:**
- Metric: Time saved per proposal/invoice
- Target: 30 min → 5 min (83% reduction)
- Dashboard: Before/after time tracking

**Client Onboarding:**
- Metric: Time from payment → portal access
- Target: <24 hours automated
- Dashboard: Airtable timeline tracking

**Homepage Overhaul:**
- Metric: Bounce rate, conversion rate
- Target: <50% bounce, >3% conversion
- Dashboard: Google Analytics

**Set Expectations:**
- Define success metric in proposal
- Show dashboard during delivery
- Send monthly report (Managed clients)
- Use metrics for testimonials: "Went from 20% to 35% conversion"

---

### Client Acquisition Strategy (Phone-Free)

**YOUR WARM LEAD OUTREACH TEMPLATE:**

Subject: [First Name], quick question about [their business]

Hi [Name],

I was just thinking about our conversation back at [specific event/context] and remembered you mentioned [specific challenge they shared].

I recently helped [similar person/business] solve [related problem] using [brief description of solution]. They saw [specific result].

Would it be helpful if I sent you a quick breakdown of the approach? No call needed – just a Loom video + document you can review when convenient.

Let me know!
- Jen

**THE FOLLOW-UP (If They Respond "Yes"):**

[2-3 hours later, not days]

Thanks [Name]!

Here's a 5-minute Loom walking through the approach: [link]
And here's the one-pager: [Gamma link]

If this looks useful for [their business], I can put together a specific plan for you. Just reply "interested" and I'll send over a proposal.

No pressure either way!
- Jen

**THE PROPOSAL (If They Say "Interested"):**

Subject: Quick Start proposal for [Their Business]

Hey [Name],

Based on [their situation], here's what I'm thinking:

[Loom video walkthrough of proposal - 3-5 min]
[Gamma proposal with pricing]

Three options:
1. [Service] DIY: $X one-time
2. [Service] Managed: $Y setup + $Z/month
3. Custom approach: [Different service]

The Managed option means I handle everything – you just watch it work.

If you want to move forward, click here to sign + pay: [Stripe checkout link]

Questions? Just reply (no call needed unless you want one).

- Jen

**CONVERSION MATH:**
- 30 warm contacts
- 40% respond to initial email = 12 responses
- 50% say "yes send me info" = 6 interested
- 40% convert to proposal = 2-3 proposals
- 50% close = 1-2 clients
- **Timeline: 2-4 weeks**

**DAILY ROUTINE:**
- 8am: Send 5 warm outreach emails
- 10am: Follow up on responses from yesterday
- 12pm: Create/send proposals
- 2pm: Loom videos for interested prospects
- 4pm: LinkedIn engagement (comment, post)

---

### The One Thing If You Only Do One Thing

**SEND 5 WARM OUTREACH EMAILS PER DAY FOR 30 DAYS.**

Nothing else matters if you don't do this. Not the perfect portal, not the complete MCP library, not the polished website.

5 emails × 30 days = 150 contacts
40% response rate = 60 responses
30% interested = 18 interested
40% convert to proposal = 7 proposals
40% close = 2-3 clients

At $2,500 avg = $6,250-7,500 revenue in 30 days.

That's enough to prove the business works and fund everything else.

**Start tomorrow. Send 5 emails. Repeat daily.**

---

END OF MANUAL

Next Steps:
1. Save this file to your Claude Code project
2. Review "First 90 Days" section
3. Do Week 1 tasks
4. Send 5 warm emails tomorrow
5. Repeat until first client
**

Subject: Formalizing White-Label Partnership for Branded + Flow

Hi Richard,

I'm ready to move forward with white-labeling iAnswering.ai for my clients. To ensure we're aligned, I'd like to formalize our partnership with a written agreement.

Can we discuss:
1. Wholesale pricing (my cost per client/month)
2. Markup rights (can I charge $300-500/mo to clients?)
3. White-label terms (can I brand as "Branded + Flow AI Receptionist"?)
4. Customization ownership (scripts/configs I create - who owns them?)
5. Support model (who handles tech issues vs client questions?)
6. Contract length (monthly or annual commitment?)

I'd like to have this in writing within 30 days so I can confidently market to clients.

Available for a call this week?

Best,
Jen

**WHAT YOU NEED IN AGREEMENT:**
- Your cost locked for 12 months
- Unlimited markup rights
- White-label/rebrand permission
- You own custom scripts/configs
- Clear support division
- 90-day termination notice minimum
- (Ideal: Exclusivity in your niche)

**BACKUP PLAN IF RICHARD WON'T FORMALIZE:**
- Bland.ai: $0.08/min, full white-label, API-first
- Vapi.ai: $0.05/min + $20/mo per number
- Build your own: Twilio + AssemblyAI + Claude API ($50-100/client)

**DEADLINE:**
- If no signed agreement by Day 30 → start building Bland.ai alternative
- You can't build business on verbal partnership

---

### VA Hiring Guide

**WHEN TO HIRE:**
- Revenue: $5K+/mo consistent
- You're turning down work due to capacity
- Admin tasks taking 10+ hrs/week

**WHAT TO DELEGATE:**
- Email responses to inquiries
- Scheduling calls via Calendly
- Airtable data entry
- Portal setup (after you templatize)
- Client check-in messages
- Social media scheduling
- Basic n8n workflow triggers (after training)

**WHERE TO FIND:**
- Upwork (vet carefully, pay $15-25/hr)
- Fancy Hands ($30-60/mo for 5-10 hrs)
- Belay ($1,500+/mo for dedicated VA)

**COST:**
- Part-time (5-10 hrs/week): $300-500/mo
- Part-time (10-20 hrs/week): $600-1,000/mo

**SOP (Standard Operating Procedure) Creation:**
- Loom record yourself doing task
- Write step-by-step checklist
- VA watches video + follows checklist
- VA does task with you watching
- VA does task independently
- Create Notion page per process

**IP PROTECTION:**
- VA signs contractor agreement with IP assignment
- VA has no access to MCP code repositories
- VA only executes, doesn't build

---

### QuickBooks Automation Setup

**CURRENT PROBLEM:**
- Transactions in: Cash App, Credit Union personal, Navy Federal (soon)
- Need to get into QuickBooks without manual entry

**SOLUTION: Use n8n Workflow**

1. **Cash App:**
   - Cash App → Email receipts → Gmail
   - n8n monitors Gmail for Cash App receipts
   - Parses amount, date, description
   - Creates QuickBooks expense via API

2. **Credit Union & Navy Federal:**
   - Export CSV weekly from online banking
   - Upload to Google Drive folder
   - n8n monitors folder for new CSVs
   - Parses transactions
   - Creates QuickBooks entries via API

3. **Alternative: Use Synder.com**
   - Connects to Cash App, banks, PayPal, Stripe
   - Auto-syncs to QuickBooks
   - Cost: $55-85/mo
   - Worth it if n8n solution is too complex

**PROPER METHOD (Do This):**
- Open Navy Federal business account (not personal)
- Get business credit card
- Use ONLY business accounts for business
- Personal = personal, business = business
- Makes taxes infinitely easier

---

### Success Metrics Per Quick Start

**Call Screening & Prep System:**
- Metric: % of calls answered by AI vs missed
- Target: 95%+ answered
- Dashboard: Airtable with call log, response time

**Lead Magnet Setup:**
- Metric: Landing page conversion rate
- Target: 20-40% visitors → downloads
- Dashboard: Embedded Google Analytics

**Contact Form Intelligence:**
- Metric: Form submission → response time
- Target: <5 minutes automated response
- Dashboard: Airtable automation log

**Template System:**
- Metric: Time saved per proposal/invoice
- Target: 30 min → 5 min (83% reduction)
- Dashboard: Before/after time tracking

**Client Onboarding:**
- Metric: Time from payment → portal access
- Target: <24 hours automated
- Dashboard: Airtable timeline tracking

**Homepage Overhaul:**
- Metric: Bounce rate, conversion rate
- Target: <50% bounce, >3% conversion
- Dashboard: Google Analytics

**Set Expectations:**
- Define success metric in proposal
- Show dashboard during delivery
- Send monthly report (Managed clients)
- Use metrics for testimonials: "Went from 20% to 35% conversion"

---

### Client Acquisition Strategy (Phone-Free)

**YOUR WARM LEAD OUTREACH TEMPLATE:**

Subject: [First Name], quick question about [their business]

Hi [Name],

I was just thinking about our conversation back at [specific event/context] and remembered you mentioned [specific challenge they shared].

I recently helped [similar person/business] solve [related problem] using [brief description of solution]. They saw [specific result].

Would it be helpful if I sent you a quick breakdown of the approach? No call needed – just a Loom video + document you can review when convenient.

Let me know!
- Jen

**THE FOLLOW-UP (If They Respond "Yes"):**

[2-3 hours later, not days]

Thanks [Name]!

Here's a 5-minute Loom walking through the approach: [link]
And here's the one-pager: [Gamma link]

If this looks useful for [their business], I can put together a specific plan for you. Just reply "interested" and I'll send over a proposal.

No pressure either way!
- Jen

**THE PROPOSAL (If They Say "Interested"):**

Subject: Quick Start proposal for [Their Business]

Hey [Name],

Based on [their situation], here's what I'm thinking:

[Loom video walkthrough of proposal - 3-5 min]
[Gamma proposal with pricing]

Three options:
1. [Service] DIY: $X one-time
2. [Service] Managed: $Y setup + $Z/month
3. Custom approach: [Different service]

The Managed option means I handle everything – you just watch it work.

If you want to move forward, click here to sign + pay: [Stripe checkout link]

Questions? Just reply (no call needed unless you want one).

- Jen

**CONVERSION MATH:**
- 30 warm contacts
- 40% respond to initial email = 12 responses
- 50% say "yes send me info" = 6 interested
- 40% convert to proposal = 2-3 proposals
- 50% close = 1-2 clients
- **Timeline: 2-4 weeks**

**DAILY ROUTINE:**
- 8am: Send 5 warm outreach emails
- 10am: Follow up on responses from yesterday
- 12pm: Create/send proposals
- 2pm: Loom videos for interested prospects
- 4pm: LinkedIn engagement (comment, post)

---

### The One Thing If You Only Do One Thing

**SEND 5 WARM OUTREACH EMAILS PER DAY FOR 30 DAYS.**

Nothing else matters if you don't do this. Not the perfect portal, not the complete MCP library, not the polished website.

5 emails × 30 days = 150 contacts
40% response rate = 60 responses
30% interested = 18 interested
40% convert to proposal = 7 proposals
40% close = 2-3 clients

At $2,500 avg = $6,250-7,500 revenue in 30 days.

That's enough to prove the business works and fund everything else.

**Start tomorrow. Send 5 emails. Repeat daily.**

---

END OF MANUAL

Next Steps:
1. Save this file
2. Review "First 90 Days" section
3. Do Week 1 tasks
4. Send 5 warm emails tomorrow
5. Repeat until first client

