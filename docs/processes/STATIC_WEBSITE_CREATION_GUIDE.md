# Static Website Creation Guide

**Last Updated:** December 7, 2025  
**Method:** AI-Generated Static HTML/CSS/JS → Netlify

---

## 🎯 Best Method for You

Based on your tech stack and workflow, here's the **recommended approach**:

### **Option 1: Start from AQ Remodeling Template** ⭐ RECOMMENDED

**Best for:** Similar business types, faster delivery

1. **Copy the structure:**
   ```bash
   # Copy AQ Remodeling website as starting point
   cp -r clients/aq-remodeling/03_website clients/{new-client}/03_website
   ```

2. **Customize with AI:**
   - Use **Claude Code** (in Cursor) to modify HTML/CSS
   - Update content, colors, images
   - Keep the structure and functionality

3. **Advantages:**
   - ✅ Proven structure (7 pages, working forms, SEO)
   - ✅ Fast (30-60 minutes vs 3-4 hours)
   - ✅ Already tested and working
   - ✅ Consistent quality

---

### **Option 2: AI-Generated from Scratch**

**Best for:** Unique designs, custom requirements

1. **Research Phase (ChatGPT):**
   ```
   "Create a complete research brief for [client name] website:
   - Business type and services
   - Target audience
   - Competitor analysis
   - Brand colors and style
   - Key pages needed
   - Content requirements"
   ```

2. **Build Phase (Claude Code in Cursor):**
   ```
   "Build a complete static website for [client]:
   - 5-7 pages (home, about, services, portfolio, contact)
   - Responsive design
   - Modern, clean UI
   - SEO optimized
   - Form integration ready
   - Based on this research: [paste research]
   "
   ```

3. **Structure:**
   ```
   clients/{client-name}/03_website/
   ├── index.html
   ├── about.html
   ├── services.html
   ├── portfolio.html
   ├── contact.html
   ├── css/
   │   └── style.css
   ├── js/
   │   └── script.js
   ├── images/
   ├── robots.txt
   └── sitemap.xml
   ```

---

## 🚀 Step-by-Step Workflow

### Phase 1: Setup (5 minutes)

1. **Create client folder structure:**
   ```bash
   mkdir -p clients/{client-name}/03_website/{css,js,images}
   ```

2. **Choose your starting point:**
   - **Template:** Copy from AQ Remodeling
   - **From Scratch:** Start with Claude Code

---

### Phase 2: Build (30-120 minutes)

**If using template:**
1. Open `clients/{client-name}/03_website/index.html` in Cursor
2. Use Claude Code to:
   - Update business name, services, content
   - Change colors (CSS variables)
   - Replace images
   - Modify page structure as needed

**If building from scratch:**
1. Open Cursor in `clients/{client-name}/03_website/`
2. Ask Claude Code:
   ```
   "Create index.html for [client] with:
   - Hero section with [description]
   - Services section
   - About section
   - Contact form
   - Responsive design
   - Modern styling"
   ```
3. Then: "Create style.css with [color scheme]"
4. Then: "Create script.js for [interactions needed]"

---

### Phase 3: Content & Styling (30-60 minutes)

1. **Add content:**
   - Business description
   - Services list
   - Contact information
   - Images (add to `images/` folder)

2. **Customize design:**
   - Update CSS variables for colors
   - Adjust fonts
   - Modify spacing/layout
   - Add animations if needed

3. **SEO setup:**
   - Update meta tags in each HTML file
   - Create `sitemap.xml`
   - Create `robots.txt`

---

### Phase 4: Testing (15 minutes)

1. **Local testing:**
   ```bash
   # Open in browser
   open clients/{client-name}/03_website/index.html
   
   # Or use local server
   cd clients/{client-name}/03_website
   python3 -m http.server 8000
   # Visit http://localhost:8000
   ```

2. **Check:**
   - ✅ All pages load
   - ✅ Links work
   - ✅ Images display
   - ✅ Responsive on mobile
   - ✅ Forms are ready (will connect later)

---

### Phase 5: Deploy to Netlify (5 minutes)

1. **Option A: Drag & Drop (Easiest)**
   - Go to [netlify.com](https://netlify.com)
   - Drag `clients/{client-name}/03_website/` folder
   - Done! Get your URL

2. **Option B: Netlify CLI**
   ```bash
   cd clients/{client-name}/03_website
   netlify deploy --dir=.
   ```

3. **Option C: Git Integration (Best for updates)**
   - Connect GitHub repo to Netlify
   - Auto-deploys on push

---

## 🛠️ Tools & Workflow

### Your Current Stack:

**For Research:**
- **ChatGPT Pro** - Client research, competitor analysis
- **NotebookLM** - Fact-checking, citations

**For Building:**
- **Claude Code** (in Cursor) - Generate HTML/CSS/JS
- **Cursor IDE** - Edit and refine

**For Deployment:**
- **Netlify** - Hosting (free tier)
- **Base44** - Client portal (deliverables)

---

## 📋 Essential Files Checklist

Every static website needs:

- [ ] `index.html` - Home page
- [ ] `about.html` - About page (optional)
- [ ] `services.html` - Services page (optional)
- [ ] `contact.html` - Contact page
- [ ] `css/style.css` - All styles
- [ ] `js/script.js` - Interactions (if needed)
- [ ] `robots.txt` - SEO
- [ ] `sitemap.xml` - SEO
- [ ] `images/` folder - All images

---

## 🎨 Design Best Practices

### CSS Structure (Recommended):

```css
/* Variables at top */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
    --text-color: #333;
    --bg-color: #fff;
}

/* Reset & Base Styles */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* Typography */
body { font-family: 'Inter', sans-serif; }

/* Components */
.hero-section { ... }
.button { ... }
.card { ... }

/* Responsive */
@media (max-width: 768px) { ... }
```

### HTML Structure (Recommended):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Client Name | Services</title>
    <meta name="description" content="...">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <script src="js/script.js"></script>
</body>
</html>
```

---

## 🚫 What NOT to Include

**Don't add:**
- ❌ WordPress/PHP
- ❌ Build tools (webpack, gulp) - not needed for static
- ❌ Node modules
- ❌ Framework dependencies (React, Vue) - unless specifically needed
- ❌ Complex backend code

**Keep it simple:**
- ✅ Pure HTML/CSS/JS
- ✅ No build process
- ✅ Just upload and go

---

## ⚡ Quick Start Commands

```bash
# Create new client website
mkdir -p clients/{client-name}/03_website/{css,js,images}

# Copy from template
cp -r clients/aq-remodeling/03_website/* clients/{client-name}/03_website/

# Test locally
cd clients/{client-name}/03_website
python3 -m http.server 8000

# Deploy to Netlify
netlify deploy --dir=clients/{client-name}/03_website
```

---

## 📚 Reference: AQ Remodeling Structure

**What's in the template:**
- 7 complete pages (home, about, commercial, residential, portfolio, FAQ, contact)
- Responsive design
- Working forms
- SEO optimized
- Image optimization
- Mobile menu
- Interactive elements

**Files:**
- `index.html` - Home with hero slider
- `about.html` - About page
- `commercial.html` - Services page
- `residential.html` - Services page
- `portfolio.html` - Gallery with filtering
- `faq.html` - FAQ accordion
- `contact.html` - Contact form
- `css/style.css` - Complete stylesheet
- `js/script.js` - Interactions
- `robots.txt` - SEO
- `sitemap.xml` - SEO

---

## 🎯 Recommended Approach for You

**For most clients:**
1. Start with AQ Remodeling template (Option 1)
2. Customize with Claude Code
3. Deploy to Netlify
4. **Time:** 1-2 hours total

**For unique/custom projects:**
1. Research with ChatGPT
2. Build from scratch with Claude Code
3. Deploy to Netlify
4. **Time:** 3-4 hours total

---

## 🔗 Next Steps

After website is built:
1. Deploy to Netlify
2. Connect forms (Netlify Forms or Formspree)
3. Add Google Analytics
4. Set up custom domain
5. Upload deliverables to Base44 portal
6. Document in `docs/internal/CLIENT_STATUS.md`

---

**Questions?** This method leverages your existing tools (Claude Code, Cursor, Netlify) for maximum efficiency.

