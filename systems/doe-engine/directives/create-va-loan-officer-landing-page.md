# Directive: Create VA Loan Officer Multi-Step Landing Page

## Goal
Create a multi-step landing page for Enzo Mortgages loan officers that:
- Matches the design aesthetic of Veterans United Realty's multi-step form
- Uses 4-5 most important questions in a progressive disclosure format
- Integrates the existing home valuation tool for the home value question
- Features a soldier image that salutes on each page transition (cutesy but not cheesy)
- Is SEO and AI optimized with keyword-heavy, SERP-designed content
- Leads to the "apply" section (which should also be updated to match design)
- Maximizes lead generation and conversion

## Scope
Client: Enzo Mortgages  
Project: Loan Officer Landing Page  
Location: `clients/enzo-mortgages/04_website/app/landing/va-loan/`

## Design Reference
Veterans United Realty LP structure:
- Multi-step progressive form
- Clean, minimal design
- Clear progress indicators
- Trust-building elements throughout
- Mobile-responsive

## Required Page Structure

### Multi-Step Form (4-5 Questions)
1. **Step 1: Loan Goal**
   - Purchase or Refinance
   - Simple radio buttons or large clickable cards

2. **Step 2: Property Location**
   - State selection (dropdown)
   - City/Area (text input or dropdown)

3. **Step 3: Home Value** (CRITICAL - Use Valuation Tool)
   - Integrate existing `ValuationForm` component
   - Captures: address, property type, email, phone
   - This is where lead contact info is captured

4. **Step 4: Loan Type Preference**
   - VA, FHA, Conventional, Jumbo, etc.
   - Visual selection cards

5. **Step 5: Timeline/Urgency**
   - When are you looking to buy/refinance?
   - Options: Immediately, 1-3 months, 3-6 months, 6+ months

### Visual Elements

#### Soldier Salute Animation
- Soldier image appears on each step transition
- Salutes (animation) when moving to next step
- Cutesy but professional (not cheesy)
- Use Framer Motion for smooth animations
- Position: Top-right or floating element

#### Progress Indicator
- Clear step counter (e.g., "Step 2 of 5")
- Visual progress bar
- Step dots/circles showing current position

### Trust & Conversion Elements
- Trust badges (NMLS, licenses, etc.)
- "No obligation" messaging
- "24/7 Available" indicator
- Social proof (reviews, testimonials)
- Clear CTA: "Get My Rate" or "Apply Now"

### SEO Requirements
- Keyword-rich content throughout
- H1 with primary keywords: "VA Loan Officer | Mortgage Specialist | [Location]"
- Meta description optimized for SERP
- Schema.org markup (FinancialService, LocalBusiness)
- Internal linking to apply page
- Alt text for all images
- Semantic HTML structure

### Integration Points

#### Home Valuation Tool
- Use existing `ValuationForm` component from `app/components/ValuationForm.tsx`
- Modify to work within multi-step flow
- Ensure lead capture (email, phone) happens here
- Submit to `/api/lead/base44` endpoint

#### Apply Page Integration
- Final step should link to `/apply` page
- Apply page should match new design aesthetic
- Consistent visual language (colors, fonts, spacing)

## Brand Guidelines (Enzo Mortgages)
- Primary Color: `hsl(175 60% 42%)` (teal/cyan)
- Fonts: Inter (sans-serif), Space Grotesk (display)
- Dark theme: zinc-900/zinc-950 backgrounds
- Luxury aesthetic: "The Ferrari of Home Loans"
- Professional but approachable tone

## Technical Requirements
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- Responsive design (mobile-first)
- Form validation
- Error handling
- Loading states
- Success states

## Execution Rules
- Changes may be made directly in Cursor
- No MCP execution required
- Visual inspection via `npx next dev` is sufficient
- Test form submissions to `/api/lead/base44`
- Ensure mobile responsiveness

## Done Definition
- Multi-step landing page exists at `/landing/va-loan`
- 4-5 questions implemented with smooth transitions
- Soldier salute animation works on step transitions
- Home valuation tool integrated and captures leads
- Apply page updated to match design aesthetic
- SEO optimized (meta tags, schema, keywords)
- Mobile responsive
- Form submissions working correctly
- All CTAs lead to apply page

## Learnings
- Document any UX improvements discovered during testing
- Note any conversion optimization opportunities
- Track which questions have highest drop-off rates
