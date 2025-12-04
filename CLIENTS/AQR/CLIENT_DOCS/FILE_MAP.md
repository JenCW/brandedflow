# Complete File Map - AQ Remodeling Website

## 📄 HTML Pages (7 total)

### `index.html` - Home Page
**Purpose:** Main landing page with Ken Burns slider
**Key Features:**
- Hero slider (5 images, auto-advance every 6 seconds)
- Commercial/Residential journey cards
- Stats section (500+ projects, 98% satisfaction, 20 years)
- Testimonials (3 clients)
- FAQ preview (3 questions)

**Key Sections:**
- Line 34-50: Hero slider with 5 images
- Line 62-87: Journey cards (Commercial/Residential paths)
- Line 90-109: Stats
- Line 132-170: Testimonials
- Line 172-210: FAQ preview

---

### `commercial.html` - Commercial Services
**Purpose:** Showcase commercial remodeling services
**Key Features:**
- Hero with background image (IMG_0480.png)
- 6 service cards with "Learn More" buttons that open modals
- Full service breakdown (17 trades)
- Process section (Assessment, Planning, Execution)
- Stats (200+ commercial projects)
- Testimonials (2 business owners)
- **5 CTA buttons total**

**Interactive Elements:**
- Service modal popups (requires `js/service-modal.js`)
- Background image with parallax effect

**Key Sections:**
- Line 32: Hero with background image
- Line 51-97: Service cards with popup buttons
- Line 100-176: Full service breakdown (Demo, Plumbing, etc.)
- Line 178-204: Process cards + CTA buttons

---

### `residential.html` - Residential Services
**Purpose:** Showcase residential remodeling services
**Key Features:**
- Hero with background image (IMG_0463.png)
- 6 service cards (ADU, Kitchens, Bathrooms, etc.)
- Full service breakdown (17 trades)
- Process section
- Stats (300+ homes, 98% satisfaction)
- Testimonials (3 homeowners)
- Popular projects breakdown

**Key Sections:**
- Line 32: Hero with background image
- Line 51-87: Residential service cards
- Line 91-167: Full service breakdown
- Line 230-259: Popular projects (Kitchen/Bathroom details)

---

### `portfolio.html` - Project Gallery
**Purpose:** Showcase completed projects with filtering
**Key Features:**
- Hero with background image (IMG_0464.png)
- Filter buttons (All, Residential, Commercial, Kitchens, Bathrooms)
- 33 portfolio items with real images
- Hover overlays with project details
- Stats section
- Video placeholder

**Portfolio Items:**
- 20 kitchen projects
- 6 bathroom projects
- 1 commercial project
- 6 general residential projects

**Key Sections:**
- Line 32: Hero
- Line 38-45: Filter buttons
- Line 48-312: Portfolio grid (33 items)

**Categories Used:**
- `data-category="residential kitchen"`
- `data-category="residential bathroom"`
- `data-category="commercial"`
- `data-category="residential"`

---

### `about.html` - About Page
**Purpose:** Company story and team info
**Status:** Basic structure (needs client content)

---

### `faq.html` - FAQ Page
**Purpose:** Answer common questions
**Status:** Basic structure (needs client FAQs)

---

### `contact.html` - Contact Page
**Purpose:** Contact form and info
**Status:** Basic structure (needs form integration)

---

## 🎨 CSS Files

### `css/style.css` - Complete Stylesheet
**Size:** ~1000 lines
**Purpose:** ALL website styling

**Key Sections:**

**Lines 1-70: Foundation**
- Variables (colors, fonts)
- Reset styles
- Typography (Inter font, heading styles)

**Lines 72-161: Navigation**
- Fixed navbar with blur backdrop
- Hover effects with gold underline
- Mobile menu toggle

**Lines 162-295: Hero Section**
- Ken Burns slider animation
- Hero content positioning
- Hero variations (simple, mustard)
- Dark overlay effects

**Lines 297-496: Buttons & Modals**
- CTA buttons with slide effects
- Service detail buttons
- Modal popup styling
- Close button animations

**Lines 498-650: Layout Systems**
- Grid layouts (2, 3, 4 column)
- Card styles with hover effects
- Section spacing
- Stats containers

**Lines 652-850: Components**
- Portfolio grid and overlays
- Testimonials
- FAQ accordions
- Footer

**Lines 852-1000: Animations & Responsive**
- Slide-up animations
- Mobile breakpoints
- Tablet adjustments

**Key Variables (Lines 10-32):**
```css
--primary-dark: #0a0a0a      /* Black background */
--luxury-gold: #d4af37       /* Gold accents */
--off-white: #f5f5f5         /* Text color */
--overlay-darker: rgba(10, 10, 10, 0.5)  /* Image overlays */
```

---

## ⚙️ JavaScript Files

### `js/script.js` - Main JavaScript
**Purpose:** Hero slider, animations, interactions

**Key Functions:**
- `nextSlide()` - Advances hero slider every 6 seconds
- Intersection Observer - Triggers slide-up animations
- FAQ accordion toggles
- Portfolio filter buttons
- Mobile menu toggle
- Navbar scroll effects

**Lines:**
- 1-20: Hero slider logic
- 22-40: Scroll animations (slide-up effects)
- 42-60: FAQ accordion
- 62-80: Portfolio filtering
- 82-100: Mobile navigation

---

### `js/service-modal.js` - Service Popups
**Purpose:** Powers the commercial service detail modals

**Service Data Object (Lines 2-150):**
Contains detailed info for 6 services:
1. **tenant** - Tenant Improvements
2. **hotel** - Hotel Upgrades
3. **commercial** - Commercial Remodels
4. **retail** - Retail Renovations
5. **office** - Office Remodels
6. **reception** - Hotel Reception

**Each Service Has:**
- title
- image (path to photo)
- description (short)
- details (long paragraph)
- includes (array of 10 items)

**Functions:**
- `openModal(serviceType)` - Opens popup with service data
- `closeModal()` - Closes popup
- Event listeners for buttons, ESC key, background click

**To Update Service Content:**
Edit lines 2-150, change the text in the service objects

---

## 📸 Images Folder

### `images/Work-pics-and-vids/`
**Contains:** 94 files total
- 81 unique project photos (PNG/JPG)
- Some duplicate formats (webp versions)

**Hero Slider Images (5):**
1. IMG_0468.png - Luxury Kitchen Ocean View
2. IMG_0463.png - Marble Island
3. IMG_0466.png - Dark Luxury Kitchen
4. IMG_0470.png - Navy Marble Kitchen
5. IMG_0475.png - Outdoor Kitchen

**Portfolio Images:**
- IMG_0463.png through IMG_0494.png
- Mix of kitchens, bathrooms, commercial spaces

**Used in Headers:**
- Commercial hero: IMG_0480.png
- Residential hero: IMG_0463.png
- Portfolio hero: IMG_0464.png

---

## 🔍 SEO Files

### `sitemap.xml`
**Purpose:** Tells Google about all pages
**Contains:** URLs for all 7 pages
**Priority Settings:**
- Home: 1.0 (highest)
- Commercial/Residential: 0.9
- Portfolio/About: 0.8
- FAQ: 0.6
- Contact: 0.7

---

### `robots.txt`
**Purpose:** Controls search engine crawling
**Settings:**
- Allows all pages
- Blocks /js/ and /css/ from indexing
- Allows /images/ for Google Image Search
- Points to sitemap.xml

---

## 📋 Schema Markup

**Location:** `index.html` lines 42-84
**Type:** GeneralContractor (Schema.org)
**Includes:**
- Business name, address, phone
- Geo coordinates (Orange County)
- Opening hours
- Rating (4.9/5 from 127 reviews - placeholder)
- Service area (50km radius)
- Image

**Purpose:** Helps Google show rich snippets in search results

---

## 🗂️ Documentation Folder

### `CLIENT_DOCS/README.md`
**Purpose:** Complete documentation
**Contains:**
- Full project overview
- Design specifications
- How-to guides for common updates
- Deployment instructions
- SEO information
- Troubleshooting
- Client feedback log

### `CLIENT_DOCS/QUICK_REFERENCE.md`
**Purpose:** Quick lookup for common tasks
**Contains:**
- Most common updates
- Key files reference
- Deploy instructions
- Quick fixes

### `CLIENT_DOCS/FILE_MAP.md`
**Purpose:** This file - complete file structure guide

---

## 📊 File Statistics

**Total Files:** ~110
- 7 HTML pages
- 1 CSS file (~1000 lines)
- 2 JS files (~400 lines total)
- 94 image files
- 2 SEO files
- 3 documentation files

**Total Project Size:** ~370 MB (mostly images)

---

## 🔄 Update Workflow

**Small Content Changes:**
1. Edit HTML file directly
2. Save
3. Refresh browser
4. Test

**Style Changes:**
1. Edit `css/style.css`
2. Save
3. Hard refresh browser (Cmd+Shift+R)
4. Test across pages

**Service Modal Changes:**
1. Edit `js/service-modal.js`
2. Save
3. Refresh browser
4. Test popups

**New Images:**
1. Add to `/images/Work-pics-and-vids/`
2. Reference in HTML
3. Test loading

**Deploy to Live:**
1. Make all local changes
2. Test thoroughly
3. Drag entire folder to Netlify
4. Verify live site

---

## 🎯 Dependencies

**External:**
- Google Fonts (Inter family)
- None! All code is self-contained

**No Build Process Required:**
- Pure HTML/CSS/JS
- No npm, webpack, or compilation
- Edit and go!

---

**Last Updated:** November 24, 2024
