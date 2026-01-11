# Company Website Transformation - Implementation Guide

## What's Been Built (Phase 1: Critical Fixes)

### ✅ Email Service Integration
**Status:** COMPLETE - Ready for configuration

**What was built:**
- Full Resend email integration (`/src/worker/lib/email.ts`)
- Beautiful HTML email templates with branded design
- User confirmation emails (sent when contact form submitted)
- Staff notification emails (alerts you about new leads)
- Graceful degradation (works without API key, just logs)

**Email Features:**
- Professional branded templates matching your site design
- Teal/black color scheme
- Responsive mobile-friendly HTML
- Includes your contact info, address, social links
- Reply-to configured for easy responses
- Staff emails include quick action buttons (Reply, Schedule Call)

**What you need to do:**
1. Sign up for Resend: https://resend.com
2. Add your domain and verify DNS (SPF/DKIM)
3. Get your API key
4. Add to environment variables:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   FROM_EMAIL=hello@brandedandflow.com
   STAFF_EMAIL=jen@brandedandflow.com
   ```

**Testing:**
- Submit contact form → Check both user and staff emails
- Emails will gracefully fail (log only) if Resend not configured

---

### ✅ Analytics & Tracking
**Status:** COMPLETE - Ready for configuration

**What was built:**
- Google Analytics 4 integration (gtag) in `index.html`
- Hotjar heatmaps and session recording in `index.html`
- Comprehensive analytics wrapper (`/src/react-app/lib/analytics.ts`)
- Event tracking for:
  - Page views
  - Form starts
  - Form submissions (success/error)
  - CTA clicks
  - Lead magnet downloads
  - Scroll depth (25%, 50%, 75%, 100%)
  - Time on page (30s, 1min, 2min, 5min)
  - Video plays
  - Calculator usage
  - Quiz completions
  - Exit intent actions

**What you need to do:**
1. Create Google Analytics 4 property: https://analytics.google.com
2. Get your Measurement ID (starts with G-XXXXXXXXXX)
3. Replace `G-XXXXXXXXXX` in `/index.html` line 70 and 75
4. Create Hotjar account: https://www.hotjar.com
5. Get your Hotjar ID
6. Replace `XXXXXXX` in `/index.html` line 84

**Usage:**
```typescript
import { trackEvent, trackFormStart, trackCTAClick } from '@/lib/analytics';

// Track custom event
trackEvent('button_click', { button_name: 'Get Started' });

// Track form start
trackFormStart('contact_form');

// Track CTA click
trackCTAClick('See Pricing', 'Homepage Hero');
```

---

### ✅ Error Tracking & Monitoring
**Status:** COMPLETE - Ready for configuration

**What was built:**
- Sentry integration for error tracking
- React Error Boundary component
- Automatic error capture and reporting
- Session replay for debugging
- Performance monitoring
- Beautiful error fallback UI (matches your site design)

**Error Boundary Features:**
- Catches all React errors
- Displays user-friendly error message
- Shows error details in development mode
- Actions: Reload Page, Go Home, Contact Support
- Automatically sends errors to Sentry

**What you need to do:**
1. Create Sentry project: https://sentry.io
2. Get your DSN
3. Add to environment variables:
   ```
   VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
   ```

**Features:**
- 100% transaction tracing
- Session replay on errors
- 10% session replay sampling
- Environment tracking (dev vs production)

---

## Environment Variables Configuration

Create a `.env` file in `/company/website/site/`:

```env
# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=hello@brandedandflow.com
STAFF_EMAIL=jen@brandedandflow.com

# Error Tracking (Sentry)
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx

# Google Analytics & Hotjar configured directly in index.html
```

Also add these to Netlify environment variables dashboard.

---

## How To Test

### Test Email Integration:
1. Run `npm run dev`
2. Go to `/contact`
3. Fill out and submit form
4. Check console logs (if Resend not configured, you'll see log messages)
5. Once Resend configured, check your email

### Test Analytics:
1. Open browser DevTools Console
2. Navigate through site
3. You'll see `[Analytics]` log messages
4. Once GA4/Hotjar configured, check respective dashboards

### Test Error Tracking:
1. Trigger an error (modify code to throw error)
2. See error boundary UI appear
3. Check Sentry dashboard for error report
4. See session replay

---

## Next Steps (Phase 2)

Coming next:
1. Lead magnet system (PDFs + email capture)
2. Exit-intent popup
3. ROI calculator
4. Automation maturity quiz
5. Enhanced testimonials with real photos/LinkedIn
6. Video testimonial component
7. Client logo wall
8. Detailed case studies

---

## File Structure

```
company/website/site/
├── src/
│   ├── worker/
│   │   ├── index.ts (updated - sends emails now)
│   │   └── lib/
│   │       └── email.ts (NEW - email service)
│   └── react-app/
│       ├── main.tsx (updated - Sentry init)
│       ├── lib/
│       │   └── analytics.ts (NEW - tracking wrapper)
│       └── components/
│           └── ErrorBoundary.tsx (NEW - error UI)
├── index.html (updated - GA4 + Hotjar scripts)
├── package.json (updated - new dependencies)
└── .env (YOU CREATE THIS)
```

---

## Dependencies Added

```json
{
  "dependencies": {
    "@react-email/components": "^0.0.25",
    "@react-three/drei": "^9.114.3",
    "@react-three/fiber": "^8.17.10",
    "@sentry/react": "^8.47.0",
    "resend": "^4.0.1",
    "three": "^0.171.0"
  },
  "devDependencies": {
    "@sentry/vite-plugin": "^2.22.9",
    "@types/three": "^0.171.0",
    "vite-plugin-image-optimizer": "^1.1.8"
  }
}
```

---

## Deployment Notes

### Netlify Environment Variables:
1. Go to Netlify dashboard
2. Site settings → Environment variables
3. Add all `.env` variables

### Cloudflare Workers:
- Email service runs on Workers (Hono backend)
- No additional Cloudflare config needed for Resend
- Resend API calls happen server-side

### Build Command:
No changes needed - existing build command works:
```
npm install --legacy-peer-deps && npm run cf-typegen && npm run build
```

---

## What Changed in Contact Form

**Before:**
```typescript
// Just logged to console, never sent emails
console.log("Contact form submission:", data);
```

**After:**
```typescript
// Sends confirmation email to user
await sendContactConfirmation({ name, email, message });

// Sends notification to staff
await sendStaffNotification({ name, email, company, message, submittedAt });

// Tracks analytics event
trackEvent('form_submit_success', { form_name: 'contact' });
```

---

## Quick Start

1. **Install dependencies:**
   ```bash
   cd /Users/jennifercortez-walters/brandedflow/company/website/site
   npm install
   ```

2. **Create `.env` file** (see template above)

3. **Update `index.html`:**
   - Replace GA4 tracking ID (lines 70, 75)
   - Replace Hotjar ID (line 84)

4. **Sign up for services:**
   - Resend.com (email)
   - analytics.google.com (GA4)
   - hotjar.com (heatmaps)
   - sentry.io (errors)

5. **Test locally:**
   ```bash
   npm run dev
   ```

6. **Deploy:**
   - Push to GitHub
   - Netlify auto-deploys
   - Add env vars to Netlify dashboard

---

## Support

If anything breaks:
- Check browser console for errors
- Check Netlify deploy logs
- Check Sentry dashboard
- Email jen@brandedandflow.com

---

**Phase 1 Status: ✅ COMPLETE**

Next: Building lead magnet system, calculators, and enhanced social proof!
