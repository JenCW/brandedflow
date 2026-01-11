# Performance Optimization Guide

## 🎯 Current Performance Baseline

### Build Size
- `.next` directory: **122MB** (before optimizations)
- Client components: **30 files**
- Largest components:
  - `MortgageCalculator.tsx`: 19KB
  - `LoanProcessFlow.tsx`: 17KB

### Performance Opportunities
- ⚠️ Images not optimized in pipeline
- ⚠️ No code splitting for large components
- ⚠️ Bundle size not analyzed
- ⚠️ Font loading not optimized

---

## 🛠️ Optimization Tools Added

### 1. Bundle Analyzer
**Purpose:** Visualize bundle composition and identify bloat

**How to Use:**
```bash
npm run build:analyze
```

This will:
- Build the production bundle
- Generate interactive HTML reports showing:
  - Which dependencies are largest
  - Duplicate packages
  - Unused code opportunities

**Configuration:** `next.config.analyze.mjs`

### 2. Image Optimization Script
**Purpose:** Automatically optimize all images for web

**How to Use:**
```bash
node scripts/optimize-images.js
```

This will:
- Convert images to AVIF (best compression)
- Generate WebP fallbacks (wide browser support)
- Create multiple sizes for responsive images
- Output to `public/optimized/` directory

**Generated Formats:**
- AVIF: 60% quality (excellent visual quality, 50% smaller than JPEG)
- WebP: 80% quality (good quality, 30% smaller than JPEG)
- JPEG: 85% quality (fallback for old browsers)

**Sizes Generated:**
- Thumbnail: 256px
- Small: 640px
- Medium: 1024px
- Large: 1920px
- XLarge: 2560px

---

## 📋 Performance Optimization Checklist

### Immediate Wins (< 1 hour)

- [ ] **Run Bundle Analyzer**
  ```bash
  npm run build:analyze
  ```
  Review the report and identify largest dependencies.

- [ ] **Optimize Images**
  ```bash
  node scripts/optimize-images.js
  ```
  Replace original images with optimized versions.

- [ ] **Add Dynamic Imports for Heavy Components**
  Example for MortgageCalculator:
  ```tsx
  // Before
  import MortgageCalculator from './components/MortgageCalculator'

  // After
  import dynamic from 'next/dynamic'
  const MortgageCalculator = dynamic(() => import('./components/MortgageCalculator'), {
    loading: () => <div>Loading calculator...</div>,
    ssr: false // If calculator doesn't need SSR
  })
  ```

- [ ] **Enable Compression in Netlify**
  Add to `netlify.toml`:
  ```toml
  [[headers]]
    for = "/*"
    [headers.values]
      Content-Encoding = "br"  # Brotli compression
  ```

### Short-Term Improvements (1-2 days)

- [ ] **Code Split Large Components**
  - Break `MortgageCalculator` (19KB) into:
    - `PaymentCalculator.tsx`
    - `AffordabilityCalculator.tsx`
    - `RefinanceCalculator.tsx`
  - Break `LoanProcessFlow` (17KB) into step components

- [ ] **Lazy Load Below-the-Fold Components**
  Use Intersection Observer:
  ```tsx
  'use client'
  import { useEffect, useState } from 'react'
  import { useInView } from 'react-intersection-observer'

  export function LazyComponent() {
    const { ref, inView } = useInView({ triggerOnce: true })
    const [Component, setComponent] = useState(null)

    useEffect(() => {
      if (inView && !Component) {
        import('./HeavyComponent').then(mod => setComponent(() => mod.default))
      }
    }, [inView, Component])

    return <div ref={ref}>{Component ? <Component /> : <Skeleton />}</div>
  }
  ```

- [ ] **Optimize Font Loading**
  Update font configuration:
  ```tsx
  // app/layout.tsx
  import { Inter } from 'next/font/google'

  const inter = Inter({
    subsets: ['latin'],
    display: 'swap', // Prevent FOIT (Flash of Invisible Text)
    preload: true,
    variable: '--font-inter'
  })
  ```

- [ ] **Implement Image Placeholders**
  Use blur placeholders for better perceived performance:
  ```tsx
  <Image
    src="/hero.jpg"
    alt="Hero"
    placeholder="blur"
    blurDataURL="data:image/..." // Use plaiceholder library
  />
  ```

### Medium-Term Optimizations (1 week)

- [ ] **Audit and Remove Unused Dependencies**
  ```bash
  npx depcheck
  npm uninstall [unused-package]
  ```

- [ ] **Tree-Shake Radix UI Imports**
  Instead of:
  ```tsx
  import * as Dialog from '@radix-ui/react-dialog'
  ```
  Use:
  ```tsx
  import { Root, Trigger, Content } from '@radix-ui/react-dialog'
  ```

- [ ] **Implement Service Worker for Caching**
  Use Next.js PWA plugin:
  ```bash
  npm install next-pwa
  ```

- [ ] **Split CSS by Route**
  Ensure CSS is loaded per-route, not globally (Next.js handles this by default if using CSS modules)

- [ ] **Optimize Third-Party Scripts**
  Use Next.js Script component with strategy:
  ```tsx
  import Script from 'next/script'

  <Script
    src="https://analytics.example.com/script.js"
    strategy="afterInteractive" // or "lazyOnload"
  />
  ```

---

## 🎨 Image Optimization Best Practices

### Using Optimized Images

After running the optimization script, update your components:

```tsx
// Before
<Image src="/hero.jpg" alt="Hero" width={1920} height={1080} />

// After - Using picture element for format selection
<picture>
  <source
    srcSet="/optimized/hero.avif"
    type="image/avif"
  />
  <source
    srcSet="/optimized/hero.webp"
    type="image/webp"
  />
  <Image
    src="/optimized/hero.jpg"
    alt="Hero"
    width={1920}
    height={1080}
  />
</picture>
```

### Responsive Images with srcset

```tsx
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/optimized/hero-large.avif"
    type="image/avif"
  />
  <source
    media="(min-width: 640px)"
    srcSet="/optimized/hero-medium.avif"
    type="image/avif"
  />
  <source
    srcSet="/optimized/hero-small.avif"
    type="image/avif"
  />
  {/* WebP fallbacks */}
  <source
    media="(min-width: 1024px)"
    srcSet="/optimized/hero-large.webp"
    type="image/webp"
  />
  <Image
    src="/optimized/hero-medium.jpg"
    alt="Hero"
    width={1024}
    height={576}
  />
</picture>
```

---

## 📦 Code Splitting Strategies

### 1. Route-Based Code Splitting
Next.js does this automatically for each page.

### 2. Component-Based Code Splitting
Use dynamic imports for heavy components:

```tsx
// Good candidates for code splitting:
// - Rich text editors
// - Charts and data visualizations
// - 3D graphics/maps
// - Heavy calculators
// - Admin panels

const MortgageCalculator = dynamic(
  () => import('@/components/MortgageCalculator'),
  {
    loading: () => <CalculatorSkeleton />,
    ssr: false // Don't server-render if not needed
  }
)
```

### 3. Library Code Splitting
Split large libraries:

```tsx
// Before: Entire recharts library loaded
import { LineChart, BarChart } from 'recharts'

// After: Only load what you need
const LineChart = dynamic(
  () => import('recharts').then(mod => mod.LineChart),
  { ssr: false }
)
```

---

## 🚀 Next.js Specific Optimizations

### 1. Use Static Generation Where Possible
```tsx
// For pages that don't change often
export const dynamic = 'force-static'
```

### 2. Enable Experimental Features
Update `next.config.mjs`:
```js
export default {
  experimental: {
    optimizeCss: true, // Optimize CSS loading
    optimizePackageImports: ['@radix-ui'], // Tree-shake specific packages
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.logs in prod
  }
}
```

### 3. Configure Image Optimization
Already configured in your `next.config.mjs`:
```js
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 60,
}
```

---

## 📊 Performance Monitoring

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

### Tools to Measure
1. **Lighthouse** (built into Chrome DevTools)
   ```bash
   npm install -g lighthouse
   lighthouse https://your-site.com
   ```

2. **WebPageTest**
   - Visit: https://www.webpagetest.org/
   - Test from multiple locations
   - Compare before/after optimizations

3. **Next.js Analytics** (if using Vercel/Netlify)
   ```bash
   npm install @vercel/analytics
   ```

### Real User Monitoring (RUM)
Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

---

## 🎯 Performance Budget

Set and enforce performance budgets:

### Bundle Size Budget
- Main bundle: < 200KB (gzipped)
- Per-page bundles: < 100KB (gzipped)
- Total JavaScript: < 500KB (gzipped)

### Image Budget
- Hero images: < 100KB (optimized)
- Thumbnails: < 20KB
- Icons: Use SVG or icon fonts

### Request Budget
- Initial page load: < 50 requests
- Time to first byte: < 600ms
- Total page size: < 2MB

---

## ✅ Quick Wins Completed

Check off as you complete:

- [x] Testing infrastructure set up
- [x] Rate limiting implemented
- [ ] Bundle analyzer installed
- [ ] Images optimized
- [ ] Large components code-split
- [ ] Font loading optimized
- [ ] Unused dependencies removed
- [ ] Service worker implemented
- [ ] Performance monitoring added

---

## 📈 Expected Performance Improvements

After implementing all optimizations:

| Metric | Before | Target | Improvement |
|--------|--------|--------|-------------|
| Bundle Size | 122MB | ~80MB | -34% |
| First Contentful Paint | ~2s | <1.5s | -25% |
| Largest Contentful Paint | ~3s | <2.5s | -17% |
| Time to Interactive | ~4s | <3s | -25% |
| Lighthouse Score | ~70 | >90 | +29% |
| Image Size (avg) | ~300KB | ~100KB | -67% |

---

## 🔗 Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Chrome DevTools Performance](https://developer.chrome.com/docs/devtools/performance/)
- [Bundle Phobia](https://bundlephobia.com/) - Check package sizes before installing

---

**Last Updated:** 2026-01-09
**Status:** Optimization tools ready, implementation in progress
