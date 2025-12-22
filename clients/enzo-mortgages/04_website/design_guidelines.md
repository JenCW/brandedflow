# Design Guidelines: Enzo Mortgages

## Design Approach

**Brand Identity:** "The Ferrari of Home Loans" - Luxury, trust, and precision
**Visual Style:** High contrast, fullscreen sections, black & white imagery with turquoise accents

**Core Principles:**
- Fullscreen immersive sections (min-h-screen)
- High contrast between elements - no dark-on-dark or light-on-light
- Grayscale photography with turquoise accent color
- UPPERCASE headers with wide letter-spacing
- Clean, modern, premium feel

## Color System

**Primary Accent:** Turquoise HSL 175 55% 45% (#2FA99F)
**Dark Surfaces:** zinc-950, zinc-900, zinc-800
**Light Surfaces:** zinc-100, zinc-200, white
**Card Backgrounds:** zinc-700 on dark, white on light
**Text on Dark:** white, zinc-200, zinc-300
**Text on Light:** zinc-900, zinc-700, zinc-600

**Contrast Rules:**
- Cards on dark backgrounds: bg-zinc-700 with border-zinc-500
- Cards on light backgrounds: bg-white with border-zinc-200
- Buttons must have visible borders or strong background contrast
- Selected states use bg-primary/20 with border-primary

## Typography

**Font Stack:**
- Primary: Inter (Google Fonts) - body text, UI elements
- Accent: Space Grotesk (Google Fonts) - headings, callouts

**Type Scale:**
- Hero Headline: text-5xl md:text-7xl font-bold uppercase tracking-wide
- Section Headers: text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide
- Subsections: text-xl md:text-2xl font-semibold uppercase tracking-wide
- Body: text-base md:text-lg leading-relaxed
- Small/Meta: text-sm

## Layout System

**Section Heights:** min-h-screen for immersive fullscreen feel
**Vertical Padding:** py-24 md:py-32 for major sections

**Container Strategy:**
- Max width: max-w-7xl for main content
- Content blocks: max-w-4xl for text-heavy sections
- Full bleed backgrounds with contained content

**Spacing Units:** 4, 6, 8, 12, 16, 24

## Component Library

**Cards (Dark Background):**
- Background: bg-zinc-700
- Border: border-zinc-500
- Hover: hover:bg-zinc-600 hover:border-zinc-400
- Selected: border-primary bg-primary/20
- Text: text-zinc-200

**Cards (Light Background):**
- Background: bg-white
- Border: border-zinc-200
- Shadow: shadow-lg
- Text: text-zinc-900

**Buttons:**
- Primary: bg-primary text-white border-2 border-primary
- Primary Hover: bg-transparent text-primary
- Secondary: bg-zinc-700 text-white border border-zinc-500
- Ghost on dark: text-zinc-300 hover:text-primary
- Always visible borders or strong color contrast

**Navigation:**
- Sticky header: bg-zinc-950 border-b border-zinc-800
- Links: text-zinc-300 uppercase tracking-wide hover:text-primary
- Mobile hamburger: text-white w-7 h-7

## Section Backgrounds

**Alternating Pattern for Visual Variety:**
1. Dark (zinc-950) with grayscale image overlay
2. Light (zinc-100) with subtle grayscale image
3. Dark (zinc-900) with gradient
4. Light (white/zinc-50)

**Image Overlays:**
- Dark sections: opacity-30 to opacity-35, with dark gradient overlay
- Light sections: opacity-20 to opacity-25, grayscale

## Images

- All images grayscale (filter: grayscale)
- Hover reveals color on interactive elements
- Background images at 25-35% opacity
- Gradient overlays for text readability

## Animations

Minimal and purposeful:
- Smooth scroll behavior
- Subtle hover scale (hover:scale-105)
- Button state transitions (duration-300)
- Float-in animations on scroll
