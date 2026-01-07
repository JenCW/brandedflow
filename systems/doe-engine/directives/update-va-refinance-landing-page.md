# Directive: Update VA + Refinance Landing Pages

## Goal
Redesign the Enzo Mortgages **Refinance** landing page and create a new **VA Loan** landing page to match the structure, clarity, and conversion strength of:
https://www.veteransunitedrealty.com/lp/v2/

Primary objective: higher trust, clearer process, faster conversion.

## Scope
Client: Enzo Mortgages  
Project: Website landing pages  
Location:
- Existing: clients/enzo-mortgages/04_website/app/landing/refinance
- New: clients/enzo-mortgages/04_website/app/landing/va

## Pages Covered
1. Refinance (existing)
2. VA Loan (new – highest priority)

## Design Reference (Non-negotiable)
Veterans United LP structure:
- Strong hero with single clear promise
- Visual step-by-step process
- Trust indicators early (numbers, guarantees, credibility)
- Minimal distraction
- One primary CTA repeated throughout

This is inspiration, not a pixel-for-pixel clone.

## Required Page Structure (Both Pages)

### 1. Hero Section
- Clear headline (benefit-driven, plain language)
- Subhead that reduces fear/confusion
- Primary CTA (form or button → form)
- Optional secondary trust line (e.g. “VA specialists”, “No obligation”)

### 2. How the Process Works (Visual Steps)
- 3–4 steps max
- Plain English
- Icons or numbered blocks
Example:
1. Check eligibility
2. Review options
3. Lock rate
4. Close

### 3. Why Enzo Mortgages
- Bulletproof trust section
- Veteran-focused for VA page
- Speed, clarity, personal service
- No hype language

### 4. Social Proof
- Testimonials OR stats (approved loans, years experience, etc.)
- If testimonials unavailable, use credibility statements

### 5. CTA Reinforcement
- Repeat CTA
- Remove friction (“No credit hit”, “No obligation”, if accurate)

### 6. FAQ (Optional but Recommended)
- Objection handling
- Especially important for VA loans

## Page-Specific Notes

### VA Loan Page (Highest Priority)
- Emphasize:
  - VA eligibility
  - Zero down
  - VA expertise
- Tone: confident, respectful, veteran-first
- No generic mortgage language

### Refinance Page
- Simplify
- Remove clutter
- Focus on savings, clarity, and speed
- Match VA page visual rhythm

## Execution Rules
- Changes may be made directly in Cursor
- No MCP execution required
- No automation required
- Visual inspection via `npx next dev` is sufficient

## Done Definition
- VA page exists and loads at `/landing/va`
- Refinance page redesigned to match new structure
- Both pages:
  - Clear hero
  - Step-based process
  - Strong CTA
  - Mobile-friendly

