# AQ Remodeling Website

A professional, responsive website for AQ Remodeling - a full-service residential and commercial remodeling company serving Orange County, CA.

## Features

- **7 Complete Pages:**
  - Home (index.html)
  - About Us
  - Commercial Services
  - Residential Services
  - Portfolio
  - FAQ
  - Contact

- **Responsive Design:** Mobile-first approach, works perfectly on all devices
- **Interactive Elements:** FAQ accordion, portfolio filtering, mobile menu
- **Modern UI:** Clean, professional design with smooth animations
- **SEO Optimized:** Proper meta tags, semantic HTML, descriptive content
- **Fast Loading:** Optimized CSS, minimal dependencies

## File Structure

```
aq-remodeling/
├── index.html              # Home page
├── about.html              # About Us page
├── commercial.html         # Commercial services
├── residential.html        # Residential services
├── portfolio.html          # Project portfolio
├── faq.html               # Frequently asked questions
├── contact.html           # Contact form
├── css/
│   └── style.css          # Global styles
├── js/
│   └── script.js          # Interactive functionality
├── images/                # Add your images here
└── README.md             # This file
```

## 🚀 Converting to 10Web + Elementor Pro

**Want to convert this site to WordPress/Elementor Pro on 10Web?**

### Quick Path (30-45 minutes, minimal work):
1. **Start Here:** Read `START_HERE_10WEB.md`
2. **Full Guide:** Follow `10WEB_ELEMENTOR_PRO_GUIDE.md`
3. **Result:** Site automatically recreated in WordPress with exact look maintained

### What You Get:
- ✅ Automatic recreation using 10Web AI Builder
- ✅ All pages converted automatically
- ✅ Elementor Pro features (sliders, popups, forms)
- ✅ Minimal manual work (~10-15 minutes)
- ✅ Exact look and style preserved

**See `START_HERE_10WEB.md` for the quick start guide.**

---

## Quick Start (Local Development)

### Option 1: Open Locally

1. Open `index.html` in your web browser
2. That's it! No build process required.

### Option 2: Use a Local Server

For better testing (especially for form functionality):

```bash
# Using Python 3
cd aq-remodeling
python3 -m http.server 8000

# Using Node.js (if you have npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment Options

### Option 1: Netlify (Recommended - FREE)

1. Sign up at [netlify.com](https://netlify.com)
2. Drag and drop the `aq-remodeling` folder onto Netlify
3. Your site is live! Get a custom domain or use the free subdomain

**Bonus:** Netlify Forms work automatically - just add `netlify` attribute to the form tag:
```html
<form netlify>
```

### Option 2: Vercel (FREE)

1. Sign up at [vercel.com](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project folder
4. Follow the prompts

### Option 3: GitHub Pages (FREE)

1. Create a GitHub account
2. Create a new repository named `aq-remodeling`
3. Upload all files
4. Go to Settings > Pages
5. Select main branch as source
6. Your site will be at `yourusername.github.io/aq-remodeling`

### Option 4: Traditional Web Hosting

Upload files via FTP to any web host (GoDaddy, Bluehost, HostGator, etc.):
1. Connect via FTP
2. Upload all files to public_html or www folder
3. Access via your domain

## Customization Guide

### 1. Update Contact Information

Replace placeholder contact info in **all HTML files** (footer section):
- Email: `info@aqremodeling.com`
- Phone: `(555) 123-4567`
- Address: `Orange County, CA`

### 2. Add Real Images

Replace image placeholders in the `images/` folder:
- Logo: `images/logo.png` (recommended: 200x50px)
- Project photos for portfolio
- Hero images
- Team photos

Update HTML where you see `<div class="image-placeholder">📸</div>` with:
```html
<img src="images/your-image.jpg" alt="Description">
```

### 3. Change Colors

Edit `css/style.css` at the top (CSS variables):
```css
:root {
    --primary-color: #2c3e50;      /* Main dark color */
    --secondary-color: #3498db;     /* Accent blue */
    --accent-color: #e74c3c;        /* CTA button red */
    /* Change these to match your brand */
}
```

### 4. Connect Contact Form

The contact form is ready to connect. Choose one:

**Option A: Netlify Forms (Easiest)**
```html
<form netlify name="contact">
```

**Option B: Formspree**
1. Sign up at [formspree.io](https://formspree.io)
2. Update form action:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Option C: EmailJS**
1. Sign up at [emailjs.com](https://www.emailjs.com)
2. Follow their integration guide
3. Update `js/script.js` form handler

### 5. Add Google Analytics

Add before closing `</head>` tag in all HTML files:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 6. Add Google Maps

Replace the map placeholder in `contact.html` with:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE"
  width="100%"
  height="400"
  style="border:0; border-radius: 8px;"
  allowfullscreen=""
  loading="lazy">
</iframe>
```

## SEO Optimization

### Before Going Live:

1. **Update Meta Tags** in each HTML file:
   - Title tags (unique for each page)
   - Meta descriptions
   - Open Graph tags for social sharing

2. **Create sitemap.xml:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://yourdomain.com/</loc></url>
  <url><loc>https://yourdomain.com/about.html</loc></url>
  <url><loc>https://yourdomain.com/commercial.html</loc></url>
  <url><loc>https://yourdomain.com/residential.html</loc></url>
  <url><loc>https://yourdomain.com/portfolio.html</loc></url>
  <url><loc>https://yourdomain.com/faq.html</loc></url>
  <url><loc>https://yourdomain.com/contact.html</loc></url>
</urlset>
```

3. **Create robots.txt:**
```
User-agent: *
Allow: /
Sitemap: https://yourdomain.com/sitemap.xml
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- **Lighthouse Score Target:** 90+ on all metrics
- **No external dependencies** except Google Fonts
- **Optimized images:** Compress images before uploading (use TinyPNG or similar)
- **Fast loading:** < 2 seconds on 3G

## Support & Updates

### Need Changes?

All code is written in standard HTML, CSS, and JavaScript - easy to modify:
- **HTML files:** Change content, add/remove sections
- **CSS (style.css):** Adjust styling, colors, spacing
- **JS (script.js):** Modify interactions and functionality

### Common Updates:

**Add a new service:**
1. Create a new card in the services section
2. Copy existing card HTML and modify text

**Add portfolio items:**
1. Add new `.portfolio-item` divs in `portfolio.html`
2. Add your image and description

**Update testimonials:**
1. Edit the testimonial cards with real client quotes
2. Add client photos if available

## Next Steps

1. ✅ Review all pages in a browser
2. ✅ Replace all placeholder content
3. ✅ Add real images
4. ✅ Update contact information
5. ✅ Connect contact form
6. ✅ Test on mobile devices
7. ✅ Deploy to hosting
8. ✅ Set up custom domain
9. ✅ Add Google Analytics
10. ✅ Submit to Google Search Console

## Questions?

This is a static HTML/CSS/JS website - no frameworks, no build process. Everything is straightforward to edit and customize.

**Need help?** The code is well-commented and organized. Each section is clearly labeled.

---

**Built with:** HTML5, CSS3, JavaScript (Vanilla)
**No dependencies** - Just upload and go!
