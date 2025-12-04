# Base44 Client Portal Integration Setup

## Overview

This website integrates with Base44 to provide:
- **Client Portal Access** - Clients can access their portal directly from the website
- **Metrics Updates** - Website metrics automatically sync to Base44
- **Client Data Sync** - Form submissions create/update client records in Base44
- **Project Status** - Display project status and documents to logged-in clients

---

## Configuration Steps

### Step 1: Get Base44 Credentials

1. Log into your Base44 account
2. Go to **Settings** → **API** or **Integrations**
3. Copy:
   - **Portal URL** (e.g., `https://yourcompany.base44.io`)
   - **API Key** (if available)
   - **Workspace ID**

### Step 2: Update Configuration

**File:** `js/base44-integration.js`

Update these constants at the top of the file:

```javascript
const BASE44_PORTAL_URL = 'YOUR_BASE44_PORTAL_URL'; // Replace with your portal URL
const BASE44_API_KEY = 'YOUR_BASE44_API_KEY'; // Your Base44 API key (if available)
const BASE44_WORKSPACE_ID = 'YOUR_WORKSPACE_ID'; // Your workspace ID
```

### Step 3: Configure Portal Access

**Option A: Email-Based Access (Recommended)**
- Base44 handles authentication via email
- Clients click portal link → enter email → access portal
- No API key needed for basic access

**Option B: Token-Based Access**
- Requires Base44 API
- Generates secure tokens for portal access
- More secure, requires API setup

### Step 4: Set Up Metrics Sync

**File:** `js/base44-integration.js`

The `updateBase44Metrics()` function sends metrics to Base44. Configure:

1. **Metrics Endpoint** - Update the API endpoint if different:
   ```javascript
   const response = await fetch(`${BASE44_PORTAL_URL}/api/metrics`, {
   ```

2. **Metrics Structure** - Ensure metrics match your Base44 table structure:
   - `form_submission`
   - `page_view`
   - `cta_click`
   - `contact_click`
   - `website_summary`

### Step 5: Configure Form Integration

**File:** `js/forms.js`

Forms automatically:
1. Submit to CRM (Airtable/n8n)
2. Store client email for portal access
3. Trigger Base44 metrics update
4. Show portal access link after submission

**Enable Base44 integration:**
```javascript
const BASE44_ENABLED = true; // Set to true
```

---

## How It Works

### Client Portal Access Flow

1. **Client submits form** → Email stored in localStorage
2. **Portal link appears** → "Access your client portal" link shown
3. **Client clicks link** → Redirected to Base44 portal with email
4. **Base44 authenticates** → Client logs in or creates account
5. **Portal access granted** → Client sees their projects/documents

### Metrics Sync Flow

1. **User action occurs** → Form submission, CTA click, etc.
2. **Metric tracked locally** → Stored in localStorage
3. **Metric sent to Base44** → Via API every minute (or immediately)
4. **Base44 updates dashboard** → Metrics appear in your Base44 workspace

### Client Data Sync Flow

1. **Form submitted** → Data collected
2. **Sent to CRM** → Airtable/n8n webhook
3. **Base44 updated** → Client record created/updated
4. **Portal access enabled** → Client can access portal

---

## Portal Access Button

### Automatic Display

The portal access button appears automatically when:
- Client email is stored (from form submission)
- Client is logged into Base44 (via cookie/session)

### Manual Addition

Add portal link anywhere in HTML:

```html
<a href="#" data-base44-portal="true">Client Portal</a>
```

Or use the button class:

```html
<a href="#" class="portal-access-button" data-base44-portal="true">Access Portal</a>
```

---

## Metrics Dashboard

### View Metrics

Metrics are tracked and can be viewed:

1. **In Browser Console** (for debugging)
   - Open DevTools → Console
   - Type: `getMetricsSummary()`

2. **In Base44 Dashboard**
   - Metrics sync automatically
   - View in your Base44 workspace

3. **Export Metrics**
   - Type in console: `exportMetrics()`
   - Downloads JSON file with all metrics

### Tracked Metrics

- **Page Views** - Total page views
- **Form Submissions** - Contact form submissions
- **CTA Clicks** - Call-to-action button clicks
- **Phone Clicks** - Phone number link clicks
- **Email Clicks** - Email link clicks
- **Portfolio Views** - Portfolio image views
- **FAQ Opens** - FAQ accordion opens
- **Scroll Depth** - How far users scroll (25%, 50%, 75%, 100%)
- **Time on Page** - Time spent on each page
- **Conversions** - Form submissions and other conversions

---

## Testing

### Test Portal Access

1. Submit a contact form with your email
2. Check that "Access your client portal" link appears
3. Click the link
4. Verify it opens Base44 portal

### Test Metrics

1. Open browser console (F12)
2. Perform actions (click buttons, submit forms)
3. Check console for metric logs
4. Verify metrics appear in Base44 dashboard

### Test Form Integration

1. Submit a contact form
2. Check that:
   - Form submits successfully
   - Email is stored in localStorage
   - Portal link appears
   - Metrics are tracked

---

## Troubleshooting

### Portal Link Not Appearing

**Check:**
- Is `BASE44_ENABLED = true` in `forms.js`?
- Is client email being stored? (Check localStorage)
- Are there JavaScript errors in console?

**Fix:**
- Enable Base44 integration
- Ensure form has email field
- Check browser console for errors

### Metrics Not Syncing

**Check:**
- Is Base44 API key configured?
- Is API endpoint correct?
- Are there network errors in console?

**Fix:**
- Configure Base44 API credentials
- Check API endpoint URL
- Verify CORS settings on Base44 API

### Portal Access Not Working

**Check:**
- Is portal URL correct?
- Is email being passed correctly?
- Does Base44 support email-based access?

**Fix:**
- Update portal URL
- Check email parameter in URL
- Contact Base44 support for access method

---

## Security Notes

1. **API Keys** - Never commit API keys to Git
2. **Client Data** - Email stored in localStorage (not sensitive)
3. **Portal Access** - Base44 handles authentication securely
4. **Metrics** - Only non-sensitive data is tracked

---

## Next Steps

1. ✅ Configure Base44 credentials
2. ✅ Test portal access
3. ✅ Verify metrics sync
4. ✅ Test form integration
5. ✅ Monitor metrics in Base44 dashboard

---

**Need Help?** Check Base44 documentation or contact Base44 support.


