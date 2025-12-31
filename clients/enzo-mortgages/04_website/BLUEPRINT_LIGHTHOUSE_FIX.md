# Blueprint: Lighthouse Performance Optimization

## Current Issues Identified
1. **Image Optimization Disabled**: `unoptimized: true` in next.config.mjs
2. **Background Images**: Using CSS background-image instead of Next.js Image component
3. **No Image Lazy Loading**: All images load immediately
4. **Font Loading**: No font-display optimization
5. **Large Bundle Size**: No code splitting visible
6. **No Resource Hints**: Missing preconnect, prefetch, preload

## Objectives
- Achieve Lighthouse Performance score ≥ 90
- Achieve Lighthouse Accessibility score ≥ 90
- Achieve Lighthouse Best Practices score ≥ 90
- Achieve Lighthouse SEO score ≥ 90
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1

## Proposed Changes

### 1. Enable Next.js Image Optimization
**File:** `next.config.mjs`
- Remove `unoptimized: true`
- Add image domains if using external images
- Enable image optimization for Netlify

### 2. Convert Background Images to Next.js Image Component
**Files:** `app/page.tsx` and other pages
- Replace CSS background-image with Next.js Image component
- Add proper sizing and priority flags
- Use `fill` with `object-cover` for hero backgrounds

### 3. Add Font Optimization
**File:** `app/layout.tsx`
- Add `display: 'swap'` to font loading
- Preload critical fonts
- Add font-display CSS

### 4. Optimize Image Loading
- Add `priority` to above-the-fold images only
- Add `loading="lazy"` to below-the-fold images
- Use proper `sizes` attribute for responsive images
- Convert large PNGs to WebP where possible

### 5. Add Resource Hints
**File:** `app/layout.tsx`
- Add preconnect for external domains
- Add dns-prefetch for third-party resources
- Preload critical resources

### 6. Code Splitting
- Ensure dynamic imports for heavy components
- Lazy load non-critical components
- Split large bundles

### 7. Remove Unused Code
- Remove unused imports
- Tree-shake unused CSS
- Remove dead code

## Implementation Order
1. Fix next.config.mjs (enable image optimization)
2. Convert hero background image to Next.js Image
3. Add font optimization
4. Add resource hints
5. Optimize all Image components
6. Test and measure

## Success Criteria
- Lighthouse Performance ≥ 90
- All Core Web Vitals pass
- Images load progressively
- Fonts load with swap
- No layout shift
- Fast initial load



