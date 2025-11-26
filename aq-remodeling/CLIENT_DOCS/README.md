# AQ Remodeling Website - Client Documentation

**Client:** AQ Remodeling
**Project:** Luxury Remodeling Website
**Built:** November 2024
**Location:** `/Users/jencortez-walters/brandedflow/aq-remodeling/`

---

## 📁 Project Overview

This is a premium, dark luxury website for AQ Remodeling, a high-end residential and commercial remodeling contractor in Orange County, California.

### Key Features:
- ✨ Ken Burns hero slider with 5 images
- 🎨 Dark luxury design with gold accents
- 📸 40+ portfolio items with real project photos
- 💬 Interactive service modals with detailed info
- 📱 Fully responsive (mobile, tablet, desktop)
- 🚀 SEO optimized for Orange County searches
- ⚡ Lightning-fast static HTML/CSS/JS

---

## 📂 File Structure

```
aq-remodeling/
├── index.html              # Home page with slider
├── about.html              # About page
├── commercial.html         # Commercial services (WITH POPUPS)
├── residential.html        # Residential services
├── portfolio.html          # 40+ project images
├── faq.html                # Frequently asked questions
├── contact.html            # Contact form
├── css/
│   └── style.css          # ALL STYLING (colors, fonts, layouts)
├── js/
│   ├── script.js          # Main JavaScript (slider, animations)
│   └── service-modal.js   # Service popup modals
├── images/
│   └── Work-pics-and-vids/ # All project photos (94 images)
├── sitemap.xml            # For Google
├── robots.txt             # For search engines
└── CLIENT_DOCS/           # THIS FOLDER - All documentation
```

---

## 🎨 Design Specifications

### Colors:
- **Primary Dark:** `#0a0a0a` (black background)
- **Secondary Dark:** `#1a1a1a` (card backgrounds)
- **Luxury Gold:** `#d4af37` (accents, buttons, highlights)
- **Off White:** `#f5f5f5` (text)
- **Gray Light:** `#a8a8a8` (secondary text)

### Typography:
- **Font:** Inter (all weights)
- **Headings:** Inter 800 (extra bold), uppercase
- **Body:** Inter 400 (regular)
- **Letter Spacing:** Normal (0) - Client requested less tight

### Hero Images (Slider):
1. IMG_0468.png - Luxury Kitchen with Ocean View
2. IMG_0463.png - Marble Island Kitchen
3. IMG_0466.png - Dark Luxury Kitchen
4. IMG_0470.png - Navy and Marble Kitchen
5. IMG_0475.png - Modern Outdoor Kitchen

---

## 🔧 How to Make Common Updates

### 1. Change Text Content

**File to Edit:** The specific `.html` file (e.g., `commercial.html`)

**Example - Change a heading:**
1. Open `commercial.html` in text editor
2. Search for the text you want to change (Cmd+F)
3. Edit the text between the HTML tags
4. Save file
5. Refresh browser

```html
<!-- BEFORE -->
<h2>Commercial Services</h2>

<!-- AFTER -->
<h2>Our Commercial Solutions</h2>
```

### 2. Update Service Modal Content

**File to Edit:** `js/service-modal.js`

**What you can change:**
- Service titles
- Descriptions
- Images
- List of included items

**Example:**
```javascript
tenant: {
    title: 'Tenant Improvements',           // ← Change title here
    image: 'images/Work-pics-and-vids/IMG_0480.png',  // ← Change image
    description: 'Your new description...',  // ← Change short description
    details: 'More detailed info...',        // ← Change detailed description
    includes: [
        'Item 1',  // ← Add, remove, or edit items
        'Item 2',
        // Add more items here
    ]
}
```

### 3. Change Colors

**File to Edit:** `css/style.css` (lines 10-24)

**Find this section:**
```css
:root {
    --primary-dark: #0a0a0a;           /* Background color */
    --luxury-gold: #d4af37;            /* Accent color (buttons, highlights) */
    --white: #ffffff;                   /* White text */
    --off-white: #f5f5f5;              /* Main text color */
    --gray-light: #a8a8a8;             /* Secondary text */
}
```

**Change the hex codes** to new colors.

### 4. Add New Portfolio Images

**File to Edit:** `portfolio.html`

**Steps:**
1. Add image to `/images/Work-pics-and-vids/` folder
2. Open `portfolio.html`
3. Copy an existing portfolio item block:

```html
<div class="portfolio-item" data-category="residential kitchen">
    <img src="images/Work-pics-and-vids/YOUR_IMAGE.png" alt="Description">
    <div class="portfolio-overlay">
        <h3>Project Title</h3>
        <p>Project description</p>
    </div>
</div>
```

4. Paste it where you want
5. Update the image path, title, and description
6. Save and refresh

### 5. Update Contact Information

**Files to Edit:** ALL `.html` files (footer section)

**Search for:** `info@aqremodeling.com` or `(555) 123-4567`

**Replace with:** Real contact info

**Example:**
```html
<!-- Footer in every HTML file -->
<p>📧 info@aqremodeling.com</p>        <!-- ← Update email -->
<p>📞 (555) 123-4567</p>                <!-- ← Update phone -->
<p>📍 Orange County, CA</p>             <!-- ← Update location -->
```

### 6. Change Button Text

**Example - Change "Get Started" to "Book Now":**

1. Open `index.html`
2. Search for "Get Started"
3. Change to "Book Now"
4. Save

```html
<!-- BEFORE -->
<a href="contact.html" class="cta-button">Get Started</a>

<!-- AFTER -->
<a href="contact.html" class="cta-button">Book Now</a>
```

---

## 🚀 Deployment Guide

### Option 1: Netlify (RECOMMENDED - FREE)

**First Time Setup:**
1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag entire `aq-remodeling` folder onto Netlify
4. Get instant URL: `aqremodeling.netlify.app`

**To Update Site:**
- Make changes to local files
- Drag entire folder to Netlify again
- Site updates automatically in 30 seconds

**Connect Custom Domain:**
1. Buy domain (e.g., aqremodeling.com)
2. In Netlify: "Add custom domain"
3. Follow DNS instructions
4. Site live on custom domain in ~24 hours

### Option 2: Vercel (Alternative - Also FREE)
- Same process as Netlify
- Go to [vercel.com](https://vercel.com)
- Deploy from GitHub or drag folder

### Option 3: Traditional Hosting (Bluehost, SiteGround)
- Upload files via FTP
- Point domain to hosting
- More manual but full control

---

## 📞 Getting Claude to Update This Site

### Method 1: Return to Claude Code
1. Open Claude Code
2. Navigate to this folder: `/Users/jencortez-walters/brandedflow/aq-remodeling/`
3. Start conversation with:
   - "I need to update the AQ Remodeling site"
   - "Client wants [specific changes]"
   - Share any screenshots or feedback

### Method 2: Provide Context
When returning, mention:
- "This is the AQ Remodeling luxury remodeling site"
- "Dark theme with gold accents"
- "Has interactive service modals on commercial page"
- Reference this documentation folder

---

## 🎯 SEO Information

### Current Optimization:
- ✅ Meta titles and descriptions for all pages
- ✅ Schema.org structured data (LocalBusiness)
- ✅ Open Graph tags (Facebook/social sharing)
- ✅ Sitemap.xml for Google
- ✅ Robots.txt configured
- ✅ Geo-tags for Orange County
- ✅ Image alt text on all photos

### Keywords Targeting:
- "Orange County remodeling"
- "luxury kitchen remodel"
- "commercial remodeling Orange County"
- "bathroom renovation"
- "ADU contractor"
- "general contractor Orange County"

### Next Steps for Client:
1. **Google Business Profile** - Critical for local SEO!
2. **Get reviews** on Google
3. **Local backlinks** (Orange County business directories)
4. **Blog content** (can add later)

---

## 🐛 Troubleshooting

### Images Not Showing
- Check file path is correct
- Make sure image is in `/images/Work-pics-and-vids/` folder
- Check image filename matches exactly (case-sensitive)

### Buttons Not Working
- Check `js/script.js` is loading
- For service modals: check `js/service-modal.js` is loading
- Look in browser console (F12) for errors

### Styling Looks Wrong
- Clear browser cache (Cmd+Shift+R)
- Check `css/style.css` is loading
- Verify no typos in CSS

### Mobile Issues
- Site is fully responsive
- Test on actual devices or use Chrome DevTools (F12 > Toggle Device Toolbar)

---

## 📋 Client Feedback Log

*Use this section to track all client requests and changes:*

### November 24, 2024 - Initial Build
- ✅ Built complete 7-page luxury website
- ✅ Added Ken Burns hero slider
- ✅ Populated portfolio with 40 images
- ✅ Created interactive service modals
- ✅ Implemented comprehensive SEO
- ✅ Added CTA buttons throughout

### Future Updates:
*Document all changes here with dates*

---

## 💡 Feature Ideas for Future

**Potential Additions Client May Request:**
- [ ] Contact form integration (Netlify Forms, Formspree, or custom)
- [ ] Before/After slider for projects
- [ ] Client testimonials section expansion
- [ ] Blog for SEO content
- [ ] Video backgrounds or video modals
- [ ] Online quote calculator
- [ ] Instagram feed integration
- [ ] Live chat widget
- [ ] Project cost estimator
- [ ] Online scheduling/booking system

---

## 📱 Technical Specifications

**Browser Support:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

**Performance:**
- Static HTML/CSS/JS = Lightning fast
- No database = No server costs
- Images should be optimized (WebP format ideal)
- Loads in <2 seconds on good connection

**Accessibility:**
- Semantic HTML structure
- Alt text on images
- Keyboard navigation supported
- High contrast text

---

## 🔐 Credentials & Access

*Store important info here (use password manager for sensitive data):*

**Hosting:**
- Platform: Netlify
- Account Email: [TO BE SET UP]
- Site URL: [TO BE DEPLOYED]

**Domain:**
- Registrar: [WHERE DOMAIN PURCHASED]
- Domain: [e.g., aqremodeling.com]

**Analytics (if added):**
- Google Analytics ID: [TO BE SET UP]

---

## 📞 Support Contact

**For Technical Updates:**
- Return to Claude Code with this project folder
- Reference this documentation

**For Urgent Issues:**
- Check troubleshooting section above
- Review browser console for errors (F12)

---

**Last Updated:** November 24, 2024
**Version:** 1.0
**Built By:** Claude Code
