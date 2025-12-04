# AQ Remodeling Website - Netlify Deployment

**Premium remodeling contractor website optimized for SEO, AI search, and lead generation.**

---

## 🚀 Quick Start

### Deploy to Netlify

1. **Drag and drop** the entire `aq-remodeling-v2` folder to [Netlify Drop](https://app.netlify.com/drop)
2. **Or connect via Git:**
   - Push to GitHub
   - Connect repository in Netlify
   - Auto-deploy on push

### Configure Custom Domain

1. Go to Netlify Dashboard → Site Settings → Domain Management
2. Add custom domain: `aqremodeling.com`
3. Update DNS records as instructed
4. Update all `https://aqremodeling.com` references in HTML files

---

## 📋 Features

### ✅ SEO Optimized
- Comprehensive meta tags
- Schema.org structured data (LocalBusiness, Service, Review)
- Semantic HTML5
- Optimized images (WebP format, lazy loading)
- Sitemap.xml and robots.txt
- Open Graph and Twitter Cards

### ✅ AI Search Optimized
- Rich structured data for AI crawlers
- Clear content hierarchy
- FAQ schema markup
- Service schema markup
- Review/rating schema

### ✅ Lead Generation
- Multiple contact forms (homepage, contact page)
- CRM integration via webhook (Airtable/n8n)
- Base44 client portal integration
- Click tracking and conversion events
- Google Analytics 4 integration
- Form validation and spam protection
- Automatic portal access after form submission

### ✅ Metrics & Analytics
- Comprehensive metrics tracking system
- Base44 metrics sync
- Real-time conversion tracking
- Scroll depth and engagement metrics
- Time on page tracking
- Exportable metrics dashboard

### ✅ Performance
- Optimized images (WebP)
- Lazy loading
- Preconnect to fonts
- Minimal dependencies
- Fast page loads

---

## 🔧 Configuration

### 1. CRM Integration (Airtable/n8n)

**Update webhook URL in:**
- `js/forms.js` - Line with `WEBHOOK_URL`
- Contact form HTML - `action` attribute

**Current setup:**
- Forms submit to webhook endpoint
- Webhook forwards to Airtable
- n8n automation triggers follow-up emails

**To configure:**
1. Create Airtable base with fields: Name, Email, Phone, Project Type, Message, Date
2. Create n8n workflow with webhook trigger
3. Add webhook URL to form configuration

### 2. Google Analytics

**Add your GA4 Measurement ID:**
- Update `G-XXXXXXXXXX` in `js/analytics.js`
- Or add directly to each HTML file's `<head>`

### 3. Base44 Integration

**Configure Base44 client portal:**
- Update `BASE44_PORTAL_URL` in `js/base44-integration.js`
- Update `BASE44_API_KEY` (if using API)
- Update `BASE44_WORKSPACE_ID`
- See `BASE44_SETUP.md` for detailed instructions

**Enable Base44 in forms:**
- Set `BASE44_ENABLED = true` in `js/forms.js`

### 4. Contact Information

**Update contact details in:**
- `index.html` (footer)
- `contact.html` (form and info)
- Schema.org markup (telephone, email)

### 5. Domain Configuration

**Update all URLs:**
- Replace `https://aqremodeling.com` with your actual domain
- Update in: meta tags, schema markup, canonical URLs

---

## 📁 File Structure

```
aq-remodeling-v2/
├── index.html              # Homepage
├── about.html              # About page
├── commercial.html         # Commercial services
├── residential.html        # Residential services
├── portfolio.html          # Project gallery
├── faq.html                # FAQ page
├── contact.html            # Contact form
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   ├── script.js          # Main JavaScript
│   ├── forms.js           # Form handling & CRM integration
│   ├── analytics.js       # Analytics tracking
│   ├── metrics.js         # Metrics dashboard & tracking
│   └── base44-integration.js # Base44 portal integration
├── images/                 # All images (WebP format)
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
└── README.md              # This file
```

---

## 🎯 SEO Checklist

- [x] Meta titles and descriptions on all pages
- [x] Schema.org structured data
- [x] Semantic HTML5 markup
- [x] Alt text on all images
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Open Graph tags
- [x] Twitter Card tags
- [x] Canonical URLs
- [x] Mobile-responsive design
- [x] Fast page load times

---

## 🔗 CRM Integration Setup

### Option 1: Airtable Direct (Simple)

1. Create Airtable base with form fields
2. Get Airtable API endpoint
3. Update `WEBHOOK_URL` in `js/forms.js`
4. Forms will submit directly to Airtable

### Option 2: n8n Webhook (Recommended)

1. Create n8n workflow:
   - **Trigger:** Webhook (POST)
   - **Action 1:** Add to Airtable
   - **Action 2:** Send confirmation email
   - **Action 3:** Send SMS notification (optional)
2. Copy webhook URL
3. Update `WEBHOOK_URL` in `js/forms.js`

### Option 3: Base44 Integration (Recommended)

1. Set up Base44 portal (see `BASE44_SETUP.md`)
2. Configure Base44 credentials in `js/base44-integration.js`
3. Enable Base44 in `js/forms.js` (`BASE44_ENABLED = true`)
4. Forms automatically sync to Base44 and provide portal access

---

## 📊 Analytics & Tracking

### Google Analytics 4
- Page views tracked automatically
- Form submissions tracked as events
- Button clicks tracked as events
- Scroll depth tracking

### Conversion Events
- Form submissions
- Phone number clicks
- Email clicks
- CTA button clicks
- Portfolio image views

---

## 🎨 Customization

### Colors
- Primary Dark: `#0a0a0a`
- Accent Gold: `#d4af37`
- Text: `#d4d4d4`
- Update in `css/style.css`

### Fonts
- Headings: Cormorant Garamond
- Body: Montserrat
- Update in HTML `<head>` and CSS

### Content
- Update all text in HTML files
- Update images in `images/` folder
- Keep image names consistent

---

## 🚨 Important Notes

1. **Update Contact Info:** Replace placeholder phone/email in all files
2. **Configure Webhook:** Add your CRM webhook URL before going live
3. **Add Analytics ID:** Add your GA4 measurement ID
4. **Update Domain:** Replace `aqremodeling.com` with actual domain
5. **Test Forms:** Test all contact forms before launch
6. **Verify Schema:** Use Google Rich Results Test tool

---

## 📈 Post-Launch Checklist

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify Google Analytics is tracking
- [ ] Test all contact forms
- [ ] Verify CRM integration (check Airtable/n8n)
- [ ] Test mobile responsiveness
- [ ] Check page load speeds
- [ ] Verify SSL certificate (Netlify auto-provides)
- [ ] Set up 404 page (optional)
- [ ] Monitor form submissions

---

## 🆘 Troubleshooting

### Forms Not Submitting
- Check webhook URL is correct
- Check browser console for errors
- Verify CORS settings on webhook endpoint
- Test webhook with Postman/curl

### Analytics Not Working
- Verify GA4 measurement ID is correct
- Check browser console for errors
- Use GA4 DebugView to test

### Images Not Loading
- Check image paths are correct
- Verify images are in `images/` folder
- Check file names match exactly (case-sensitive)

---

## 📞 Support

For issues or questions:
- Check Netlify deployment logs
- Check browser console for errors
- Verify all configuration settings

---

**Last Updated:** December 2024
**Version:** 2.0
**Deployment:** Netlify Static Site
