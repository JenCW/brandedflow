# AGENTS.md

This file provides guidance to AI agents and assistants when working with this repository.

## Technical Commands & Code Style

**Repository Type**: This is a documentation-only repository containing business strategy documents in Markdown format. There are no build, lint, or test commands.

**No Code Commands Available**:
- No package.json, build scripts, or testing frameworks
- No linting or formatting tools configured
- No CI/CD pipelines or deployment processes

**Code Style Guidelines** (when adding code examples to documentation):
- Use clear, readable formatting with proper indentation
- Include comments only when necessary for clarity
- Follow consistent naming conventions (camelCase for variables, PascalCase for components)
- Use TypeScript types when applicable in code examples
- Keep code examples practical and directly applicable to the business context

**File Operations**:
- All files are Markdown (.md) format
- No compilation or processing required
- Changes are effective immediately upon editing

## Repository Overview

This is a **business planning and strategy repository** for Branded + Flow, a branding and AI automation service business targeting overwhelmed solopreneurs and small businesses. This is NOT a code repository - it contains business strategy documents, marketing plans, and operational guides.

**Owner**: Jen Cortez-Walters, solopreneur launching at age 50, mom of 4, rebuilding after COVID
**Business Model**: Branding services fused with AI automation for small businesses
**Tech Stack**: Base 44, Airtable, n8n, Breezy, Gamma, TenWeb, Canva Pro, NotebookLM, QuickBooks, ClickUp, Outlook

## Document Structure & Purpose

### Core Business Documents (Read-Only Strategic Assets)

All documents are in Markdown format and serve as strategic planning guides:

1. **START_HERE.md** - Master index and quick reference guide
2. **PRICING_PACKAGES.md** - 3-tier service pricing (Foundation/Momentum/Authority)
3. **BUYER_PERSONA_ICP.md** - Target customer profiles ("Overwhelmed Olivia" & "Scaling Steve")
4. **INTROVERT_SALES_STRATEGIES.md** - Phone-free sales methodology for introverted entrepreneurs
5. **BUSINESS_SUCCESS_ROADMAP.md** - 90-day launch plan + 12-month growth strategy
6. **TECH_STACK_OPTIMIZATION.md** - Integration guides for Base 44, n8n, Airtable, etc.
7. **COMPETITIVE_ANALYSIS.md** - Market positioning vs. traditional agencies and automation firms
8. **ADDITIONAL_RECOMMENDATIONS.md** - Advanced strategies (partnerships, content, scaling)

### Document Relationships

```
START_HERE.md (entry point)
    ├─→ References all other documents
    ├─→ Contains immediate action checklists
    └─→ Quick reference for specific topics

Business Planning Flow:
    BUYER_PERSONA_ICP.md → PRICING_PACKAGES.md → INTROVERT_SALES_STRATEGIES.md
         (who to target)        (what to charge)         (how to sell)

Implementation Flow:
    BUSINESS_SUCCESS_ROADMAP.md → TECH_STACK_OPTIMIZATION.md
         (when to do what)              (how to use tools)

Market Context:
    COMPETITIVE_ANALYSIS.md → ADDITIONAL_RECOMMENDATIONS.md
         (market positioning)        (advanced strategies)
```

## Working with This Repository

### When User Requests Business Strategy Changes

**DO:**
- Reference the existing strategic framework before suggesting changes
- Maintain consistency with the established positioning (no-BS, solopreneur-focused, introvert-friendly)
- Keep pricing aligned with market research (see COMPETITIVE_ANALYSIS.md)
- Ensure recommendations fit the owner's constraints (phone anxiety, solo operation, mom of 4)

**DON'T:**
- Suggest expensive tools or solutions that break the lean operating model
- Recommend strategies requiring large teams or significant capital
- Use marketing jargon or corporate-speak (owner "detests marketing speak")
- Ignore the introvert-friendly sales approach outlined in INTROVERT_SALES_STRATEGIES.md

### Key Business Constraints & Context

**Owner Profile:**
- Introvert with phone anxiety (PTSD with phone calls)
- Prefers email, text, video messages over live calls
- Values authenticity and transparency over polished marketing
- Works from Colab Space in Irvine, CA (physical location matters for local strategy)

**Target Market:**
- Solopreneurs and small businesses (2-7 years in business)
- $75K-$250K annual revenue range
- Overwhelmed by marketing and tech complexity
- Need both branding AND automation (fusion positioning)

**Competitive Positioning:**
- NOT competing on price (mid-tier pricing)
- NOT a traditional branding agency (adds automation)
- NOT a pure automation firm (adds branding/design)
- Unique fusion of branding + AI automation for underserved solopreneur market

### Pricing Structure (Do Not Modify Without Market Research)

- **Foundation Package**: $2,997 one-time + $297/month ongoing
- **Momentum Package**: $6,997 one-time + $697/month ongoing
- **Authority Package**: $14,997 one-time + $1,497/month ongoing

These prices are based on 2025 market research showing AI automation services command 20-50% premium over traditional services.

### Tech Stack Integration Strategy

The business uses the same tools it sells to clients (authenticity advantage):
- **Base 44**: Client portals and custom dashboards
- **n8n**: Workflow automation (6 core workflows documented in TECH_STACK_OPTIMIZATION.md)
- **Airtable**: CRM and operations database
- **Canva Pro**: All design and brand deliverables
- **TenWeb**: Website platform (AI-powered WordPress)

When suggesting technical improvements, ensure they align with this existing stack.

## Document Editing Guidelines

### When Adding New Content

**Maintain Tone & Voice:**
- Direct, conversational, no fluff
- Empathetic to struggles (owner has lived the pain)
- Practical and actionable (not theoretical)
- Avoid jargon, marketing-speak, or corporate language

**Format Consistency:**
- Use Markdown formatting
- Include actionable checklists where appropriate
- Add examples and templates (not just theory)
- Reference other documents with clear pointers

### When User Asks to Update Existing Documents

1. **Read the full document first** to understand context
2. **Preserve the strategic framework** - don't contradict other documents
3. **Maintain cross-references** - if you change pricing, update all mentions
4. **Keep the authentic voice** - owner's personal story is central to positioning

## Common User Requests

### "Update my pricing"
→ Review COMPETITIVE_ANALYSIS.md first to ensure market alignment
→ Update PRICING_PACKAGES.md primary source
→ Update references in START_HERE.md and BUSINESS_SUCCESS_ROADMAP.md
→ Ensure new pricing maintains profit margins outlined in roadmap

### "Add a new service offering"
→ Check alignment with BUYER_PERSONA_ICP.md (does target market want this?)
→ Verify it fits the tech stack in TECH_STACK_OPTIMIZATION.md
→ Add to PRICING_PACKAGES.md with clear deliverables
→ Update BUSINESS_SUCCESS_ROADMAP.md if it changes timeline

### "Help me with content/marketing"
→ Reference BUYER_PERSONA_ICP.md for messaging that resonates
→ Use content strategies from ADDITIONAL_RECOMMENDATIONS.md
→ Maintain introvert-friendly approaches from INTROVERT_SALES_STRATEGIES.md
→ Pull from owner's authentic story (age 50, mom of 4, COVID rebuild)

### "I need implementation help"
→ BUSINESS_SUCCESS_ROADMAP.md has week-by-week action plan
→ TECH_STACK_OPTIMIZATION.md has setup guides for all tools
→ START_HERE.md has immediate priority checklists

## Important Context for AI Assistance

**This is a solo business launch**, not an established company:
- Owner is at the very beginning (documents created Oct 30, 2025)
- No clients yet, no testimonials, no case studies
- Owner is rebuilding after financial loss from COVID
- Every dollar matters - recommendations should be lean and scrappy

**Success metrics are in BUSINESS_SUCCESS_ROADMAP.md:**
- Month 3 target: $3K-5K revenue (1-3 clients)
- Month 6 target: $8K-12K revenue
- Month 12 target: $15K-25K revenue

Keep recommendations realistic and appropriate for current stage.

## Repository Maintenance

Since this is purely documentation (no code to build/test/deploy):

**Adding Documents:**
- Place in root directory alongside existing .md files
- Update START_HERE.md to reference new documents
- Maintain cross-references in related documents

**Updating Documents:**
- Always read full document before editing (use Read tool)
- Use Edit tool to preserve exact formatting
- Test all cross-references after changes

**Document Interdependencies:**
- Pricing changes → Update PRICING_PACKAGES.md + START_HERE.md + BUSINESS_SUCCESS_ROADMAP.md
- Persona changes → May affect PRICING, SALES STRATEGIES, COMPETITIVE ANALYSIS
- Tech stack changes → Update TECH_STACK_OPTIMIZATION.md + relevant workflow sections

This repository is a living business plan - expect iterative updates as the business launches and evolves.
