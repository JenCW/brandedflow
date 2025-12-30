# Blueprint: Homepage Updates for Enzo Mortgages

## Objectives
1. Fix video playback issue in hero section
2. Add APR display to Live Rates section (manually updated weekly)
3. Create interactive loan process flowchart component
4. Integrate flowchart between Live Rates and "Find Your Perfect Loan" sections

## Proposed Changes

### 1. Fix Video in Hero Section
**File:** `app/components/VideoModal.tsx`
- **Issue:** Video path may be incorrect or file missing
- **Solution:** 
  - Add error handling for video load failures
  - Try multiple video format fallbacks (.mp4, .mov)
  - Display graceful error message if video fails to load
  - Update video path in `app/page.tsx` to use .mp4 extension

**Logic/Edge Cases:**
- Handle missing video file gracefully
- Support both .mov and .mp4 formats
- Show user-friendly error message instead of broken player
- Maintain modal functionality even if video fails

### 2. Add APR to Live Rates Section
**Files:** 
- `app/api/rates/route.ts` - Add APR fields to API response
- `app/components/LiveRates.tsx` - Display APR alongside interest rates

**Changes:**
- Add `apr30yr` and `apr15yr` fields to `RateData` interface
- Add environment variables `APR_30YR` and `APR_15YR` for manual weekly updates
- Display APR below interest rates with clear labeling
- Default APR calculation: Interest Rate + 0.35% (30yr) or +0.30% (15yr) if env vars not set

**Logic/Edge Cases:**
- Fallback to calculated APR if env vars not set
- Handle null/undefined APR values gracefully
- Display APR with same formatting as interest rates
- Add visual distinction between interest rate and APR

### 3. Interactive Loan Process Flowchart Component
**New File:** `app/components/LoanProcessFlow.tsx`

**Flow Steps:**
1. Borrower (Application)
2. Loan Officer (Review & Guidance)
3. Disclosures (Initial & Final)
4. Processing (Document Collection & Verification)
5. Underwriting (Risk Assessment & Approval)
6. Funding (Closing & Disbursement)

**Features:**
- Horizontal flowchart with 6 interactive nodes
- Hover effects: Node scales up, shows glow effect
- Click/tap: Expands detailed popup card with:
  - Role title
  - Key responsibilities/duties
  - Timeline expectations
  - What borrower needs to do
- Smooth animations using Framer Motion
- Responsive design (mobile: vertical stack, desktop: horizontal flow)
- Connecting lines/arrows between steps
- Visual indicators (icons for each step)

**Design Requirements:**
- Modern, professional aesthetic matching brand
- Dark theme (zinc-950 background)
- Primary color accents
- Smooth transitions (200-300ms)
- Accessible (keyboard navigation, ARIA labels)
- Mobile-first responsive

**Animation Details:**
- Nodes: Scale 1.0 → 1.05 on hover, glow effect
- Popup: Slide up + fade in from node position
- Connecting lines: Animate in sequentially on load
- Exit animations: Smooth fade out

### 4. Integration into Homepage
**File:** `app/page.tsx`
- Insert `<LoanProcessFlow />` component between:
  - Line 192: `<LiveRates />` 
  - Line 195: "Find Your Perfect Loan" section
- Maintain existing section spacing and styling
- Ensure proper z-index and overflow handling

## Dependencies
- Framer Motion (already in package.json)
- Lucide React icons (already in package.json)
- No new packages required

## Testing Requirements
- Video modal handles missing files gracefully
- APR displays correctly with fallback values
- Flowchart is interactive on desktop and mobile
- All animations are smooth and performant
- Responsive breakpoints work correctly
- Accessibility features function properly

## Implementation Order
1. Fix video component (quick fix)
2. Add APR to rates API and LiveRates component
3. Create LoanProcessFlow component
4. Integrate into homepage
5. Test all features
6. Verify responsive design

## Success Criteria
- ✅ Video plays or shows graceful error
- ✅ APR displays in Live Rates section
- ✅ Interactive flowchart works on all devices
- ✅ Smooth animations and hover effects
- ✅ Component builds trust and educates users
- ✅ No performance issues
- ✅ Accessible and SEO-friendly
