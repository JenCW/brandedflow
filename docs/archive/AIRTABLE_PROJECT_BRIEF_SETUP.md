# Airtable Project Brief Form - Setup Guide

**Purpose:** Gather client project requirements without phone calls

---

## Airtable Base Structure

### Table 1: Client Projects

**Fields:**

1. **Project ID** (Auto Number) - Primary field
2. **Client Name** (Single line text) - Required
3. **Email** (Email) - Required
4. **Phone** (Phone number) - Optional
5. **Business Name** (Single line text) - Required
6. **Website (Current)** (URL) - Optional
7. **Industry** (Single select)
   - Options: Healthcare, Legal, Real Estate, E-commerce, Coaching/Consulting, Beauty/Wellness, Home Services, Tech/Software, Other
8. **Project Type** (Multiple select)
   - Options: Website Redesign, New Website, Brand Identity, Automation Setup, Landing Pages, Lead Magnets, AI Receptionist
9. **Timeline** (Single select)
   - Options: ASAP (1 week), 2-3 weeks, 1 month, Flexible
10. **Budget Range** (Single select)
    - Options: Under $2,000, $2,000-$3,500, $3,500-$5,000, $5,000-$7,500, $7,500+, Not sure yet
11. **What's Not Working?** (Long text) - Required
    - "What's broken or frustrating you about your current setup?"
12. **What Does Success Look Like?** (Long text) - Required
    - "When this project is done, what will be different?"
13. **Current Tools** (Long text) - Optional
    - "What tools/platforms are you currently using? (website host, CRM, email platform, etc.)"
14. **Additional Notes** (Long text) - Optional
15. **How Did You Find Us?** (Single select)
    - Options: Referral (from who?), LinkedIn, Google, Instagram, Other
16. **Status** (Single select)
    - Options: New Lead, Reviewing, Proposal Sent, Closed Won, Closed Lost, On Hold
17. **Date Submitted** (Created time)
18. **Last Modified** (Last modified time)
19. **Estimated Project Value** (Currency) - Your internal estimate
20. **Proposal Link** (URL) - Link to Gamma proposal when created
21. **Base44 Portal Link** (URL) - Link to their client portal

---

## Form Configuration

### Form Settings

**Form Name:** Branded + Flow - Project Brief

**Welcome Message:**
```
Let's figure out what you need.

No sales pitch. No phone calls. Just tell us what's broken and we'll tell you if we can fix it.

This takes 3-4 minutes to fill out. We'll review and send you a proposal within 48 hours.
```

**Submit Message:**
```
Got it. We'll review this and email you a proposal within 48 hours.

No follow-up calls. No pressure. Just a clear proposal with pricing and timeline.

- Jen at Branded + Flow
```

---

### Form Fields (in order)

**Section 1: About You**

1. Client Name (Required)
2. Email (Required)
3. Phone (Optional - "Only if you want text updates")
4. Business Name (Required)
5. Website (Current) (Optional)
6. Industry (Required)
7. How Did You Find Us?

**Section 2: What You Need**

8. Project Type (Multiple select - "Check all that apply")
   - Helpful text: "Not sure? Check what feels closest. We'll help you figure out the rest."

9. What's Not Working? (Required)
   - Helpful text: "Be specific. Example: 'My website looks outdated and I'm losing clients to competitors' or 'I'm spending 10 hours a week manually following up with leads'"

10. What Does Success Look Like? (Required)
    - Helpful text: "Example: 'I can send people to my site without being embarrassed' or 'Leads get follow-up emails automatically so I can focus on actual work'"

**Section 3: Timeline & Budget**

11. Timeline (Required)
    - Helpful text: "When do you need this done?"

12. Budget Range (Required)
    - Helpful text: "Ballpark is fine. This helps us recommend the right approach."

**Section 4: Additional Info**

13. Current Tools (Optional)
    - Helpful text: "Example: WordPress, Mailchimp, Google Sheets, etc. Helps us know what we're working with."

14. Additional Notes (Optional)
    - Helpful text: "Anything else we should know?"

---

## Automation Workflow (n8n)

**Trigger:** New form submission in Airtable

**Step 1: Update Status**
- Set "Status" to "New Lead"

**Step 2: Send Confirmation Email**
```
Subject: Got your project brief - reviewing now

Hi [Client Name],

Thanks for filling out the project brief. I'm reviewing it now and will send you a proposal within 48 hours.

Here's what happens next:
1. I'll review your needs and pricing
2. I'll create a mockup concept in Gamma (so you can see what I'm thinking)
3. I'll send you a proposal with clear pricing and timeline
4. You review and say yes or no - no negotiation, no phone calls required

If you need to add anything or have questions, just reply to this email.

- Jen
Branded + Flow
jen@brandedandflow.com
```

**Step 3: Slack/ClickUp Notification**
- Post to #new-leads channel in Slack OR create task in ClickUp
- Include: Client name, project type, budget, timeline, what's broken

**Step 4: Add to Review Queue**
- Create reminder to review within 24 hours

---

## Response Process (Your Workflow)

**Within 24 hours of submission:**

1. **Review the brief** - Read what they need, what's broken, budget/timeline
2. **Estimate the project** - Use PRICING_AND_SERVICES.md as guide
3. **Create Gamma mockup** - Quick concept of what you're proposing (2-3 slides)
4. **Build proposal in Gamma** - Use template (see below)
5. **Send proposal email** - Include Gamma link, pricing, next steps

---

## Gamma Proposal Template Structure

**Slide 1: Cover**
- "Proposal for [Client Name]"
- "[Project Type]"
- Date

**Slide 2: What You Told Us**
- "Here's what you said is broken:"
- [Quote from their form]
- "Here's what success looks like to you:"
- [Quote from their form]

**Slide 3: What We'll Build**
- Visual mockup or wireframe
- 3-5 bullet points of deliverables
- Timeline

**Slide 4: Pricing & Next Steps**
- Clear pricing breakdown
- Payment terms (50% deposit, 50% on delivery)
- Timeline
- "Say yes: Reply to this email with 'Let's do it'"
- "Say no: No hard feelings. Reply with 'Not right now' and I'll check back in 6 months"

**Slide 5: How We'll Work Together**
- Client portal (Base44) for all updates
- Email/text only communication
- Mockup approval before build
- 30 days support after delivery

---

## Proposal Email Template

```
Subject: Project proposal: [Project Type] for [Business Name]

Hi [Client Name],

I reviewed your project brief. Here's what I'm thinking:

[Link to Gamma proposal]

The proposal includes:
- What we'll build (with mockup)
- Pricing: $[Amount]
- Timeline: [Timeframe]
- How we'll work together

Everything's in the link above. Takes 2 minutes to review.

If you want to move forward, just reply "Let's do it" and I'll send the invoice and portal access.

If it's not the right fit, no worries. Just let me know.

- Jen
Branded + Flow
jen@brandedandflow.com
```

---

## Share Link

Once you build this in Airtable, create a **form view** and get the share link.

**Use this link for:**
- Your website (when you build it)
- Email signature
- LinkedIn messages
- Referral requests ("Send them here: [link]")
- Anywhere someone asks "How do I work with you?"

---

## Key Benefits of This System

✅ **No phone calls required** - Everything in writing
✅ **Filters serious inquiries** - Takes effort to fill out
✅ **Gives you time to think** - Not put on the spot
✅ **Creates paper trail** - Everything documented
✅ **Professional** - Shows you have systems
✅ **Scalable** - Works if you get 1 or 100 inquiries

---

## Setup Checklist

- [ ] Create Airtable base with table structure above
- [ ] Configure form with welcome/submit messages
- [ ] Set up n8n automation for confirmation emails
- [ ] Create Gamma proposal template
- [ ] Create email template in QuickBooks/your email
- [ ] Test the entire flow (fill out form yourself)
- [ ] Get share link and add to email signature

---

*Last Updated: November 15, 2025*
