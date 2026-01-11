# DIRECTIVE: Optimize Next.js Website Security & Performance

## 1. GOAL
Add comprehensive security headers and performance optimizations to a Next.js website to achieve:
- Security: Prevent XSS, clickjacking, MIME sniffing attacks
- Performance: Reduce bundle size, optimize images, improve load times
- Standards: Meet OWASP security standards and Lighthouse performance targets (90+ scores)

## 2. INPUTS
- **Location**: Next.js project root (e.g., `clients/[client-name]/04_website/`)
- **Format**: Next.js 14+ with App Router
- **Required**:
  - `next.config.mjs` file exists
  - `package.json` with Next.js dependencies
  - TypeScript configuration
- **Optional**:
  - Existing images in `/public` directory
  - Bundle analyzer dependency

## 3. PROCESS

### Phase 1: Orchestration (Decision Making)
1. **Create detailed blueprint** with:
   - Objectives: Security headers configuration, performance targets
   - Proposed Changes: Specific files to modify (next.config.mjs, package.json)
   - Security Headers: CSP, X-Frame-Options, HSTS, Permissions Policy
   - Performance Configs: optimizePackageImports, compiler optimizations
   - Dependencies: Bundle analyzer, image optimization tools
2. **WAIT FOR EXPLICIT HUMAN APPROVAL** before proceeding to execution
3. **Handle errors**: If CSP breaks site functionality, adjust policies and update directive

### Phase 2: Execution

#### Step 1: Add Security Headers to next.config.mjs
Add comprehensive security headers configuration:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera=(), microphone=(), geolocation=()
- Content-Security-Policy: Configured for specific domains (Airtable, FRED API, Google Fonts, etc.)
- Strict-Transport-Security: max-age=31536000; includeSubDomains

#### Step 2: Add Performance Optimizations to next.config.mjs
Configure experimental and compiler optimizations:
- `experimental.optimizePackageImports`: For large libraries (@radix-ui, recharts, framer-motion)
- `compiler.removeConsole`: Remove console.logs in production (exclude error/warn)

#### Step 3: Install Bundle Analyzer
```bash
npm install --save-dev @next/bundle-analyzer
```

#### Step 4: Create Bundle Analyzer Config
Create `next.config.analyze.mjs` that wraps base config

#### Step 5: Add Performance Scripts to package.json
```json
{
  "scripts": {
    "build:analyze": "ANALYZE=true next build",
    "optimize:images": "node scripts/optimize-images.js"
  }
}
```

#### Step 6: Create Image Optimization Script
Create `scripts/optimize-images.js` that:
- Finds all images in `/public`
- Converts to AVIF (60% quality) and WebP (80% quality)
- Generates multiple responsive sizes
- Outputs to `/public/optimized/`

#### Step 7: Run Bundle Analyzer
```bash
npm run build:analyze
```
Identify large dependencies and optimization opportunities

#### Step 8: Optimize Images
```bash
npm run optimize:images
```

#### Step 9: Verify Configuration
- TypeScript check: `npm run check`
- Build succeeds: `npm run build`
- Tests pass: `npm test`

## 4. OUTPUTS
- **Modified Files**:
  - `next.config.mjs` - Security headers and performance config added
  - `package.json` - New scripts added
- **New Files**:
  - `next.config.analyze.mjs` - Bundle analyzer configuration
  - `scripts/optimize-images.js` - Image optimization script
  - `/public/optimized/` - Optimized images directory
- **Verification**:
  - TypeScript compiles with no errors
  - Build succeeds without warnings
  - All tests pass
  - Security headers present in HTTP responses
  - Bundle size reduced (check analyzer report)

## 5. EXECUTION SCRIPTS
- **Manual Configuration** - Edit `next.config.mjs` directly (no script needed for one-time config)
- `scripts/optimize-images.js` - Optimizes all images in /public directory
- Bundle analyzer via npm script: `npm run build:analyze`

## 6. EDGE CASES

### Content Security Policy (CSP) Issues
- **Problem**: Strict CSP breaks Next.js inline scripts or third-party integrations
- **Solution**: Add 'unsafe-inline' and 'unsafe-eval' for script-src (less secure but necessary for Next.js)
- **Better Solution**: Use nonces or hashes for inline scripts (more complex)

### API Domain Whitelist
- **Problem**: Forgot to whitelist API domain in connect-src
- **Solution**: Add all external API domains to CSP connect-src
- **Common domains**:
  - Airtable: https://api.airtable.com
  - FRED API: https://api.stlouisfed.org
  - Google Fonts: https://fonts.googleapis.com, https://fonts.gstatic.com

### Image Optimization Memory Issues
- **Problem**: Optimizing large images causes out-of-memory errors
- **Solution**: Process images in batches (5 at a time in script)
- **Alternative**: Use cloud-based image optimization service

### Bundle Analyzer Port Conflicts
- **Problem**: Port 8888 already in use
- **Solution**: Bundle analyzer will try next available port automatically

### Performance Regressions
- **Problem**: optimizePackageImports breaks tree-shaking for some libraries
- **Solution**: Remove problematic libraries from optimizePackageImports array
- **Test**: Build and check bundle size before/after each library addition

## 7. LEARNINGS

### What Works Well
- `optimizePackageImports` significantly reduces bundle size for Radix UI components
- Removing console.logs in production reduces bundle by ~5-10KB
- AVIF images are 50% smaller than JPEG with same visual quality
- Security headers don't impact performance

### What Doesn't Work Well
- Too strict CSP breaks Next.js (need 'unsafe-inline' and 'unsafe-eval')
- Some libraries don't tree-shake well even with optimizePackageImports
- Image optimization script is slow for large image sets (use batching)

### Common Errors
1. **CSP breaks site**: Add 'unsafe-inline' to script-src
2. **Build fails after adding headers**: Check for syntax errors in headers() function
3. **Images not optimizing**: Ensure sharp is installed (`npm install sharp`)
4. **Bundle analyzer doesn't open**: Check firewall/port availability

### Performance Impact
- Security headers: 0ms overhead
- optimizePackageImports: 20-30% bundle size reduction
- removeConsole: 5-10KB bundle reduction
- Image optimization: 50-70% file size reduction

### Security Impact
- Prevents: Clickjacking, XSS, MIME sniffing, protocol downgrade attacks
- Limits: Camera, microphone, geolocation access
- Enforces: HTTPS only, strict origin policy

---
**Last Updated:** 2026-01-11
**Status:** Active
**Created By:** Claude Code (DOE compliance update)
