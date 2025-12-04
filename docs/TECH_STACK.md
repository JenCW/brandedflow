# BRANDED + FLOW TECH STACK
**Last Updated:** December 3, 2024
**Status:** Production Stack (Active)

---

## 🎯 TECH STACK PHILOSOPHY

**Goals:**
- Maximum automation with minimum manual work
- Cost-effective (solo operation budget)
- Scalable (can handle 10, 50, 100 clients with same stack)
- Integration-friendly (everything talks to everything)
- No vendor lock-in (clients own what we build)

---

## 🤖 AI & DEVELOPMENT TOOLS

### ChatGPT Pro
- **Cost:** $20/month
- **Use Case:** Client research, competitive analysis, deep research queries
- **Why:** 10 Deep Research queries/month = 3-5 clients worth of research
- **Limit:** Don't use for coding (use Claude Code instead)

### Claude Code
- **Cost:** Free tier (usage-based after)
- **Use Case:** Building MCPs, automation code, technical problem-solving
- **Why:** Best for coding, sees entire project structure
- **IDE:** VSCode/Cursor integration
- **Limit:** Don't use for research (use ChatGPT instead)

### Cursor
- **Cost:** $20/month Pro (optional)
- **Use Case:** Primary IDE, AI-powered coding
- **Why:** Claude Code integration, context-aware suggestions
- **Features:** Auto-complete, inline edits, chat interface

### NotebookLM
- **Cost:** Free
- **Use Case:** Fact-checking ChatGPT research, source-grounded insights
- **Why:** Provides citations, validates AI-generated content
- **Workflow:** Upload ChatGPT reports + competitor sites → get cited insights

---

## 🌐 WEBSITE & HOSTING

### Netlify ⭐ PRIMARY PLATFORM
- **Cost:** Free tier (Pro $19/mo if needed)
- **Use Case:** Client website hosting
- **Why:** Fast, global CDN, easy deploys, form handling, analytics
- **Features:**
  - Instant deployments from Git
  - Automatic HTTPS
  - Form submissions (webhook integration)
  - Netlify Editor for client editing
  - Analytics included
  - Serverless functions

### Netlify Editor
- **Cost:** Included with Netlify
- **Use Case:** Allow clients to edit their own sites without code
- **Why:** Empowers DIY clients, reduces support burden

**🚫 NOT USING:**
- WordPress/Elementor/10Web (ABANDONED - too complex, vendor lock-in)

**✅ USING INSTEAD:**
- AI-generated static HTML/CSS/JS
- Deployed to Netlify
- Full client control
- Template: AQ Remodeling site

---

## 📊 CRM & DATA

### Airtable
- **Cost:** Free tier, Team $20/mo when needed
- **Use Case:** Client CRM, contact database, project tracking
- **Why:** Flexible, visual, connects to everything, powerful automation
- **Bases:**
  - Contacts/leads database
  - Client project tracking
  - Content calendar
  - Deal pipeline

### Base44
- **Cost:** Builder $50/month (UNLIMITED portals)
- **Use Case:** Client portals on top of Airtable
- **Why:** Professional branded portals, zero marginal cost per client
- **Features:**
  - Custom dashboards
  - File sharing
  - Project tracking
  - Support messaging
  - Metrics visualization

**Portal Strategy:**
- DIY clients: 90-day access
- Managed clients: Permanent access
- Every Quick Start includes portal

---

## 🔗 AUTOMATION & WORKFLOWS

### n8n
- **Cost:** $0-$20/month (self-hosted VPS ~$10/mo, or cloud $20/mo)
- **Use Case:** Workflow automation, connecting apps, scheduled tasks
- **Why:** Open-source, powerful, no vendor lock-in, own your automations forever
- **Workflows:**
  - Form submission → Airtable → welcome email
  - File upload → client notification
  - Invoice due → reminder email
  - Call transcription → email delivery
  - Daily briefings
  - Social posting automation

### Apollo
- **Cost:** Free tier, Pro plans available
- **Use Case:** Lead generation, contact discovery
- **Why:** B2B prospecting, email sequences

### Clay
- **Cost:** Free tier, paid plans for scale
- **Use Case:** Data enrichment, lead qualification
- **Why:** Enriches contact data, integrates with other tools

---

## 📧 EMAIL & COMMUNICATION

### Brevo (formerly Sendinblue)
- **Cost:** Free tier, scales with usage
- **Use Case:** Email marketing, transactional emails
- **Why:** Affordable, reliable, good deliverability

### Outlook
- **Cost:** Included with Microsoft 365
- **Use Case:** Business email

### Gmail
- **Cost:** Free / Google Workspace
- **Use Case:** Personal/backup email

---

## 🎨 DESIGN & PRESENTATIONS

### Gamma
- **Cost:** Free tier, Pro $8/month if >3 presentations/mo
- **Use Case:** Client presentations, proposals, pitch decks
- **Why:** AI-powered, fast, beautiful designs
- **Workflow:** Paste outline → generate → fix formatting → export PDF/link

### Canva Pro
- **Cost:** $13/month
- **Use Case:** Brand design, social media graphics, marketing materials
- **Why:** Professional results, huge template library, easy to use
- **Client Benefit:** Ongoing design flexibility for managed clients

---

## 💳 PAYMENTS & BUSINESS

### Stripe
- **Cost:** 2.9% + $0.30 per transaction
- **Use Case:** Payment processing, invoicing
- **Why:** Industry standard, easy integration, subscription management

### QuickBooks (Optional)
- **Cost:** ~$30/month
- **Use Case:** Invoicing, expense tracking, financial management
- **Why:** Industry standard, professional, tax-ready

---

## 📈 ANALYTICS & TRACKING

### Google Analytics 4
- **Cost:** Free
- **Use Case:** Website traffic, conversion tracking
- **Why:** Industry standard, powerful insights, free

### Custom metrics.js
- **Cost:** Free (we build it)
- **Use Case:** Custom event tracking, conversion metrics
- **Features:**
  - Form submissions
  - CTA clicks
  - Scroll depth
  - Time on page
  - Portfolio views
  - FAQ interactions

---

## 🛠️ DEVELOPMENT & VERSION CONTROL

### GitHub
- **Cost:** Free
- **Use Case:** Code version control, project management
- **Why:** Industry standard, automatic backups, collaboration-ready
- **Workflow:** Automatic commits at 11pm daily

---

## 📞 PHONE & AI RECEPTIONIST

### iAnswering.ai (Partnership)
- **Cost:** TBD (pending partnership agreement)
- **Use Case:** AI receptionist, phone answering, lead qualification
- **Why:** Solves phone anxiety problem for clients (and Jen!)
- **Features:**
  - 24/7 AI-powered answering
  - Lead qualification
  - Appointment booking
  - Call routing & transcription
  - Professional presence

---

## 🚀 STILL NEEDED (FUTURE ADDITIONS)

### SEO Tool
- **Options:** Ahrefs, SEMrush, Moz
- **Use Case:** Keyword research, rank tracking, competitor analysis
- **Priority:** Medium (important but not urgent)

### Social Media Poster/Scheduler
- **Options:** Buffer, Hootsuite, Later
- **Use Case:** Schedule posts across platforms
- **Priority:** High (need for content automation)

### Content Creator
- **Options:** Copy.ai, Jasper, custom GPT
- **Use Case:** Social posts, blog content, email copy
- **Priority:** High (content production at scale)

### Lead Magnet/Landing Page Builder
- **Options:** ConvertKit, Leadpages, custom HTML on Netlify
- **Use Case:** Lead magnets, opt-in pages
- **Priority:** High (lead generation)

### Chatbox Integration
- **Options:** Intercom, Drift, Tidio, custom
- **Use Case:** Website chat for lead capture
- **Priority:** Medium (nice to have)

### Video Creator
- **Options:** Descript, CapCut, Loom + editing
- **Use Case:** Video content, tutorials, blog vlogs
- **Priority:** Medium (for content strategy)

---

## 💰 MONTHLY COST BREAKDOWN

**Current Stack:**
- ChatGPT Pro: $20
- Claude Code: $0 (free tier)
- Cursor Pro: $20 (optional)
- Netlify: $0-$19
- Airtable: $0-$20
- Base44: $50
- n8n: $10-$20
- Brevo: $0 (free tier)
- Gamma: $0-$8
- Canva Pro: $13
- Stripe: Pay per transaction
- GitHub: $0
- Google Analytics: $0
- NotebookLM: $0

**Total Monthly: ~$113-$170** (very lean for what it delivers)

**Future Additions (when needed):**
- SEO tool: $99-$199
- Social scheduler: $15-$30
- Content creator: $30-$50

---

## 🎯 TECH STACK DECISIONS

### Why Netlify over WordPress?
- ✅ Faster (static sites load instantly)
- ✅ User-editable without code (Netlify Editor)
- ✅ Full control (no theme limitations)
- ✅ Better security (no PHP vulnerabilities)
- ✅ Easier to integrate (webhooks, APIs)
- ✅ Clients own everything (no vendor lock-in)
- ❌ WordPress: Complex, slow, expensive hosting, vendor lock-in

### Why n8n over Zapier?
- ✅ One-time cost vs subscription
- ✅ Open-source, self-hosted
- ✅ Unlimited workflows
- ✅ Clients own the automations
- ❌ Zapier: Expensive at scale, vendor lock-in

### Why Airtable + Base44 over custom CRM?
- ✅ Fast to set up
- ✅ Flexible and customizable
- ✅ Beautiful client portals (Base44)
- ✅ No development time
- ❌ Custom CRM: Months to build, expensive to maintain

---

## 📚 INTEGRATION MAP

```
Lead Source (website/form)
    ↓
n8n Webhook
    ↓
Airtable (CRM)
    ↓
Base44 Portal Created
    ↓
Welcome Email (Brevo)
    ↓
Client Onboarding Flow
    ↓
Project Delivery (Netlify + docs)
    ↓
Metrics Tracking (GA4 + custom)
```

---

## 🔄 UPDATE LOG

**December 3, 2024**
- Confirmed Netlify as primary website platform
- Removed WordPress/Elementor from stack
- Documented current monthly costs
- Added "Still Needed" section for future tools
- Clarified integration strategy
