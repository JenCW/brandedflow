# Modern Proposal Workflow - Standard Process

## Overview
This is the **standard process** for creating all client proposals. Based on the proven Luxe Fine Dining proposal that converted.

## The Process

### Step 1: Gather Information
You need:
- Client story (their background, success, situation)
- Problems they face (3-4 specific issues)
- Market opportunity (stats, potential, what they're missing)
- Services to include (phased approach recommended)
- Pricing (setup + monthly for each phase)
- Automation processes (how they work step-by-step)
- Website copy (actual headlines and body copy)
- Lead magnets (if applicable - what they are, why they work)
- ROI calculations (the math - break-even analysis)

### Step 2: Structure the Proposal
Follow this exact order (DO NOT DEVIATE):

1. **Cover** - Elegant, dark, no price visible
2. **The Story** - Their story, not yours
3. **The Problem** - 3-4 specific problems
4. **The Opportunity** - Market potential with stats
5. **The Solution** - Explain approach simply
6. **Phase 1** - Foundation (prove value first)
7. **Phase 2** - Growth (after Phase 1 works)
8. **Phase 3** - Scale (after Phase 2 works)
9. **How Automations Work** - Step-by-step processes
10. **Website Copy** - Actual headlines and body copy
11. **Lead Magnets** - What they are, why they work (if applicable)
12. **Investment** - Phases side by side, payment terms
13. **Next Steps** - Clear CTAs with working email buttons

### Step 3: Use the MCP
Call `create-modern-proposal` MCP with:
- `client_name` (lowercase-kebab-case)
- `proposal_data` (all the information from Step 1)

### Step 4: Review & Deploy
1. Review the generated HTML
2. Test on mobile (must look amazing)
3. Test email buttons (must work)
4. Deploy to Netlify (drag `05_deliverables` folder)
5. Send link to client

## Key Principles (NEVER DEVIATE)

### Language
- ✅ "An AI that answers your phone"
- ❌ "AI Voice Concierge"
- ✅ "A simple system that tracks everything"
- ❌ "CRM integration"
- ✅ "Professional menu PDFs"
- ❌ "Lead magnets"

**Rule:** If a restaurant owner can't understand it, rewrite it.

### Structure
- **NEVER start with price** - Always start with story
- **Price comes at the END** - After value is established
- **Phased approach** - Prove value first, then expand
- **Show, don't tell** - Step-by-step processes, actual copy

### Design
- Dark, elegant color scheme (black, gold accents)
- Mobile-first responsive
- Table of contents with smooth scroll
- Working email buttons
- Clear payment terms

### Payment Terms (ALWAYS INCLUDE)
- 50% upfront due upon approval
- 50% at completion due when project is delivered
- Monthly fee begins 30 days after project start

## Quality Checklist

Before sending:
- [ ] No jargon - target client can understand everything
- [ ] Price is at the END, not the beginning
- [ ] Story and problem come first
- [ ] Automation processes explained step-by-step
- [ ] Website copy included
- [ ] Lead magnets detailed (if applicable)
- [ ] ROI math is clear and simple
- [ ] Design is elegant and modern
- [ ] Mobile responsive tested
- [ ] Table of contents works
- [ ] Email buttons work
- [ ] Payment terms clear (50% upfront, 50% at completion, monthly starts 30 days after start)
- [ ] All deliverables listed

## Success Metrics

A good proposal:
- Gets approved within 48 hours
- Client says "this is exactly what I need"
- Client understands value before seeing price
- Client feels confident moving forward
- No questions about jargon or complexity

## Related Files
- Directive: `systems/doe-engine/directives/create-client-proposal.md`
- MCP: `automations/mcps/create-modern-proposal.js`
- Process Doc: `company/operations/proposals/PROPOSAL_CREATION_PROCESS.md`

## Notes
- This process was proven with Luxe Fine Dining
- It's now the standard for ALL proposals
- Always follow this structure
- Always use simple language
- Always include payment terms
- Always make it mobile-responsive

