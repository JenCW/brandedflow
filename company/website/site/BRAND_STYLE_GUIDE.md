# Branded+Flow Style Guide

## Hero Section Design System

### Brand Identity

#### Company Name
- **Primary Text**: "branded"
  - Font: Inter (sans-serif)
  - Weight: 900 (Black)
  - Size: 
    - Mobile: 7xl (4.5rem)
    - Tablet: 8xl (6rem)
    - Desktop: 9xl (8rem)
    - Large Desktop: 10rem
  - Color: Black (#000000)
  - Shadow: 3px 3px 0px rgba(0,0,0,0.1)

- **Plus Symbol**: "+"
  - Font: Dancing Script (script/handwriting)
  - Style: Regular (no italic)
  - Color: Teal (#14b8a6)
  - Size: Matches "branded" text size

- **Flow Text**: "flow"
  - Font: Dancing Script (script/handwriting)
  - Style: Italic
  - Color: Teal (#14b8a6)
  - Size: Matches "branded" text size

#### Tagline
"brand + automate + nurture"
- Font: Inter (sans-serif)
- Size:
  - Mobile: 2xl (1.5rem)
  - Tablet: 3xl (1.875rem)
  - Desktop: 4xl (2.25rem)
- "brand", "automate", "nurture": Bold weight, Gray-500 (#6b7280)
- Plus symbols: Dancing Script, Teal (#14b8a6), no italic

---

### Color Palette

#### Primary Colors
- **Teal**: #14b8a6 (rgb 20, 184, 166)
  - Used for: Brand accent, plus symbols, active states
  - Hover state alternative for primary CTAs

- **Gold/Yellow**: #facc15 (rgb 250, 204, 21)
  - Used for: Secondary accent, shadows, borders
  - Hover state alternative for secondary CTAs

- **Black**: #000000
  - Used for: Text, borders, dark backgrounds
  - Primary text color throughout

#### Secondary Colors
- **White**: #ffffff
  - Background color
  - Card backgrounds
  
- **Gray-500**: #6b7280
  - Tagline text
  - Secondary text elements

- **Gray-600**: #4b5563
  - Body copy
  
- **Gray-700**: #374151
  - Darker body copy

---

### Typography

#### Font Families
1. **Inter** (sans-serif)
   - Usage: Company name "branded", tagline words, body copy, UI elements
   - Weights: 400 (regular), 600 (semibold), 700 (bold), 900 (black)
   - Import: Google Fonts

2. **Dancing Script** (script/handwriting)
   - Usage: "+flow", plus symbols throughout
   - Style: Regular and Italic
   - Import: Google Fonts

3. **Libre Baskerville** (serif)
   - Usage: Headlines, subheadings
   - Weights: 400 (regular), 700 (bold)
   - Import: Google Fonts

#### Type Scale
- H1 (Company Name): 7xl to 10rem
- H2 (Main Headlines): 5xl to 7xl (3rem to 4.5rem)
- Tagline: 2xl to 4xl (1.5rem to 2.25rem)
- Body Large: xl to 2xl (1.25rem to 1.5rem)
- Body Regular: base to lg (1rem to 1.125rem)
- Small Text: sm (0.875rem)

---

### Spacing System

#### Section Padding
- Vertical: py-32 (8rem top and bottom)
- Between sections: h-20 buffer (5rem)

#### Hero Section
- Top padding: pt-10 (2.5rem)
- Bottom padding: pb-20 (5rem)
- Max width: max-w-7xl
- Horizontal padding: px-6

#### Component Spacing
- Between headline and body: mb-8 (2rem)
- Between body and CTAs: mb-10 (2.5rem)
- Gap between CTAs: gap-4 (1rem)
- Gap between service cards: gap-4 (1rem)

---

### Interactive Elements

#### Call-to-Action Buttons

**Primary CTA** (Contact/Claim Spot)
- Background: Black
- Text: White
- Border: 2px solid Teal (#14b8a6)
- Border Radius: rounded-md (0.375rem)
- Padding: px-6 py-3
- Font: Bold, uppercase, tracking-wider
- Hover State: Background becomes Teal, text becomes Black
- Transition: 300ms all

**Secondary CTA** (Pricing/Services)
- Background: Transparent
- Text: Black
- Border: 2px solid Gold (#facc15)
- Border Radius: rounded-md (0.375rem)
- Padding: px-6 py-3
- Font: Bold, uppercase, tracking-wider
- Hover State: Background becomes Gold
- Transition: 300ms all

**CTA Icon**
- Arrow Right from Lucide React
- Size: 16px
- Hover: translateX(1) (moves 0.25rem right)

---

### Animated Elements

#### Rotating Equations
- Position: Above company name
- Animation: Fade in/out with slight vertical movement
- Duration: 3 seconds per phrase
- Opacity: 0.4 when visible
- Easing: easeInOut
- Format: "word + word = result"
- Example phrases:
  - marketing + automation = automate
  - websites + SEO = brand
  - forms + AI = automate
  - phone service + 24/7 = automate
  - follow-ups + automation = nurture
  - CRM + email = nurture

#### Scrolling Ticker
- Background: Teal to Gold gradient
- Padding: py-4
- Animation: Infinite scroll right to left
- Duration: 20 seconds
- Content: Limited availability message + testimonials
- Text: Black, lg size
- Separator: Bullet points (•)

---

### Service Cards

#### Layout
- Grid: 3 columns on desktop
- Gap: gap-4 (1rem)

#### Card Styles

**Card 1** (Websites)
- Border: 4px solid Gold
- Background: White
- Hover: Background becomes Teal
- Shadow on hover: 6px 6px 0px 0px rgba(0,0,0,1)

**Card 2** (Phone Service)
- Border: 4px solid Teal
- Background: Black
- Text: White
- Hover: Background becomes Gold, text becomes Black
- Shadow on hover: 6px 6px 0px 0px rgba(0,0,0,1)

**Card 3** (Follow-Up)
- Border: 4px solid Black
- Background: White
- Hover: Background becomes Teal
- Shadow on hover: 6px 6px 0px 0px rgba(0,0,0,1)

#### Card Content
- Title: Libre Baskerville, xl, italic
- Body: sm, leading-relaxed
- Padding: p-6

---

### Background Elements

#### Icon Watermark
- Position: Absolute, centered
- Opacity: 5% (0.05)
- Size: 800px x 800px
- Z-index: Behind content
- Asset: BRanded-and-flow-icon.png

#### Accent Icon
- Position: Absolute, left of company name
- Size: 
  - Mobile: 12px x 12px
  - Tablet: 16px x 16px  
  - Desktop: 20px x 20px
- Opacity: 40%
- Asset: BRanded-and-flow-icon.png

---

### Borders & Shadows

#### Section Borders
- Bottom border: 4px solid Black
- Applied to: All major sections

#### Box Shadows
- Direction: 3px right, 3px down (consistent direction)
- Button/Icon shadows: Gold (#facc15)
- Card hover shadows: Black
- Format: Xpx Ypx 0px 0px rgba(R,G,B,A)

---

### Performance Optimization

#### Animation Best Practices
- Use `will-change: transform, opacity` for animated elements
- Prefer transforms over position changes
- Use CSS animations for infinite loops (ticker)
- Keep Framer Motion animations to opacity and y-axis transforms only
- Duration: 0.6s for fades, 20s for ticker
- Easing: easeInOut for content, linear for ticker

---

### Navigation

#### Desktop Navigation
- Background: Teal to Gold gradient (20% opacity)
- Backdrop blur: md
- Border bottom: 2px solid Black
- Links: Black text, hover to Teal
- Active state: Teal underline (0.5px height)
- CTA Button: Same as primary CTA style
- Link padding: px-3 py-2
- Link spacing: space-x-0 (tight)

#### Logo
- Icon: 
  - Border: 2px solid Black
  - Padding: p-1
  - Background: White
  - Shadow: 3px 3px 0px Gold
  - Size: 10px x 10px
- Logo text image: h-14
- Shadow: 3px 3px 0px rgba(0,0,0,0.3)

---

### Accessibility

#### Text Contrast
- Black on White: 21:1 (WCAG AAA)
- White on Black: 21:1 (WCAG AAA)
- White on Teal: 4.5:1 minimum (WCAG AA)

#### Focus States
- All interactive elements must have visible focus states
- Maintain keyboard navigation support
- ARIA labels on icon-only buttons

#### Animation
- Respect prefers-reduced-motion for users who need it
- Ensure content is readable even when animations are disabled

---

### Responsive Breakpoints

- Mobile: < 768px (md)
- Tablet: 768px - 1024px
- Desktop: 1024px+
- Large Desktop: 1280px+

#### Mobile Adjustments
- Single column layouts
- Reduced font sizes (use minimum in scale)
- Stacked CTAs
- Full-width buttons
- Reduced spacing

---

### Content Guidelines

#### Voice & Tone
- Professional but approachable
- Plain English, no jargon
- Direct and honest
- Emphasize simplicity and clarity
- Address pain points (confusion, overwhelm)

#### Messaging Hierarchy
1. Company name + visual identity
2. Problem statement (confusion, lost leads)
3. Solution (automation, systems that work)
4. Social proof (testimonials, scarcity)
5. Clear CTAs (pricing, contact)

---

### File Assets

#### Required Images
- BRanded-and-flow-icon.png (transparent icon)
- Untitled-design.png (logo with text)
- hero-*.png (hero section imagery as needed)
- Service/feature illustrations

#### Asset Optimization
- Use WebP when possible
- Optimize for file size
- Use responsive images
- Leverage CDN (mochausercontent.com)

---

## Usage Examples

### Hero Code Structure
```jsx
<h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] leading-tight font-black tracking-tight" 
    style={{ textShadow: '3px 3px 0px rgba(0,0,0,0.1)' }}>
  <span className="font-sans">branded</span>
  <span className="font-script text-teal-500">+</span>
  <span className="font-script text-teal-500 italic">flow</span>
</h1>
```

### CTA Button Structure
```jsx
<button className="px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-teal-500 rounded-md transition-all duration-300 hover:bg-teal-500 hover:text-black">
  Get Started
</button>
```

### Service Card Structure
```jsx
<div className="border-4 border-yellow-400 p-6 bg-white hover:bg-teal-500 transition-all duration-300 group cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
  <h3 className="font-serif text-xl mb-3 italic">Title</h3>
  <p className="text-sm text-gray-700 group-hover:text-black leading-relaxed">Description</p>
</div>
```

---

This style guide should be treated as the source of truth for all design decisions related to the hero section and overall brand identity. Consistency is key to maintaining a professional, cohesive appearance across all touchpoints.
