# Claude Code Website Building Prompts

**For building static websites from scratch with Claude Code in Cursor**

---

## 🚀 Quick Start Workflow

### Step 1: Setup Folder Structure

```bash
mkdir -p clients/{client-name}/03_website/{css,js,images}
cd clients/{client-name}/03_website
```

### Step 2: Open in Cursor

Open the `03_website` folder in Cursor, then use these prompts with Claude Code.

---

## 📝 Prompt Sequence

### Prompt 1: Create index.html (Main Page)

```
Create a complete, modern, responsive index.html page for [CLIENT NAME], a [BUSINESS TYPE] in [LOCATION].

Requirements:
- Clean, professional design
- Hero section with compelling headline
- Services/offerings section
- About section (brief)
- Contact section with form
- Footer with contact info
- Fully responsive (mobile-first)
- Semantic HTML5
- SEO optimized meta tags
- Use modern CSS (will be in separate file)
- Include placeholder for logo/image
- Professional color scheme suitable for [INDUSTRY]

Structure:
- Header with navigation
- Hero section
- Services/Features section
- About section
- Contact section
- Footer

Make it production-ready and polished.
```

### Prompt 2: Create style.css

```
Create a complete, modern CSS file (style.css) for the [CLIENT NAME] website.

Requirements:
- CSS variables for colors (define a professional color scheme for [INDUSTRY])
- Modern, clean design
- Responsive breakpoints (mobile, tablet, desktop)
- Smooth animations/transitions
- Professional typography
- Grid/Flexbox layouts
- Hover effects on interactive elements
- Mobile menu (hamburger style)
- Form styling
- Button styles
- Card/container styles
- Professional spacing and typography scale

Color scheme should be:
- Primary: [COLOR or "professional and modern"]
- Accent: [COLOR or "complementary accent"]
- Text: [COLOR or "readable dark"]
- Background: [COLOR or "clean light"]

Make it visually appealing and modern.
```

### Prompt 3: Create script.js (if needed)

```
Create a JavaScript file (script.js) for the [CLIENT NAME] website.

Include:
- Mobile menu toggle functionality
- Smooth scrolling for anchor links
- Form validation (basic)
- Any interactive elements needed
- Modern ES6+ syntax
- No external dependencies

Keep it lightweight and performant.
```

### Prompt 4: Additional Pages (if needed)

```
Create [PAGE_NAME].html for [CLIENT NAME] website.

Requirements:
- Match the design style of index.html
- Same header/footer structure
- [SPECIFIC CONTENT NEEDED]
- Responsive design
- SEO optimized

Use the same CSS file (style.css).
```

### Prompt 5: SEO Files

```
Create robots.txt and sitemap.xml for [CLIENT NAME] website.

Website URL: [URL or placeholder]
Pages: [list all pages]

Make them SEO-friendly and complete.
```

---

## 🎯 Complete Example Prompt (All-in-One)

If you want to do it all at once:

```
Build a complete static website for [CLIENT NAME], a [BUSINESS TYPE] in [LOCATION].

Create:
1. index.html - Home page with hero, services, about, contact sections
2. css/style.css - Complete stylesheet with modern design, responsive breakpoints
3. js/script.js - Interactive functionality (mobile menu, smooth scroll, form validation)
4. robots.txt - SEO file
5. sitemap.xml - SEO file

Requirements:
- Modern, professional design suitable for [INDUSTRY]
- Fully responsive (mobile-first approach)
- Clean, semantic HTML5
- SEO optimized (meta tags, proper headings)
- Color scheme: [DESCRIBE or "professional and modern"]
- Smooth animations and transitions
- Contact form ready for Netlify Forms
- Professional typography
- Fast loading (optimized CSS, minimal JS)

Design style: [DESCRIBE: e.g., "minimal and elegant", "bold and modern", "warm and inviting"]

Include:
- Header with logo and navigation
- Hero section with compelling headline
- Services/Features section (3-5 items)
- About section
- Contact section with form
- Footer with contact info and social links

Make it production-ready and deployable to Netlify.
```

---

## 🎨 Design Direction Prompts

### For Specific Industries:

**Restaurant/Food:**
```
Design should be warm, inviting, with emphasis on food photography. 
Use rich colors, elegant typography, and create appetite appeal.
```

**Professional Services:**
```
Design should be clean, trustworthy, professional. 
Use conservative colors, clear typography, emphasize credibility and expertise.
```

**Creative/Art:**
```
Design should be bold, unique, showcase creativity. 
Use vibrant colors, interesting layouts, emphasize portfolio work.
```

**E-commerce/Retail:**
```
Design should be conversion-focused, product-centric. 
Use clear CTAs, product showcases, easy navigation, trust signals.
```

---

## 🔧 Refinement Prompts

After initial build, use these to refine:

### Adjust Colors:
```
Update the color scheme in style.css to use:
- Primary: [HEX COLOR]
- Secondary: [HEX COLOR]
- Accent: [HEX COLOR]
- Background: [HEX COLOR]

Update all relevant CSS variables and color references.
```

### Add Sections:
```
Add a [SECTION NAME] section to index.html with:
- [DESCRIPTION OF CONTENT]
- Match existing design style
- Responsive layout
- Place it [BEFORE/AFTER existing section]
```

### Improve Mobile:
```
Review and improve the mobile responsiveness:
- Ensure all sections stack properly on mobile
- Check font sizes are readable
- Verify touch targets are large enough
- Test mobile menu functionality
- Optimize spacing for small screens
```

### Add Animations:
```
Add smooth scroll animations to sections as they come into view.
Use CSS transitions and Intersection Observer API.
Keep animations subtle and professional.
```

---

## 📋 Checklist After Building

- [ ] All pages load correctly
- [ ] Navigation works on all pages
- [ ] Mobile menu functions
- [ ] Forms are properly structured (ready for Netlify Forms)
- [ ] Images have alt text
- [ ] All links work
- [ ] Responsive on mobile/tablet/desktop
- [ ] Meta tags are complete
- [ ] robots.txt and sitemap.xml are correct
- [ ] No console errors
- [ ] Fast loading (check file sizes)

---

## 🚀 Deployment Prompt

After building, use this to prepare for Netlify:

```
Review the website files and ensure they're ready for Netlify deployment:

1. Check all file paths are relative (no absolute paths)
2. Verify CSS and JS file references are correct
3. Ensure forms have 'netlify' attribute or proper action
4. Check images are in images/ folder with correct paths
5. Verify robots.txt and sitemap.xml are in root
6. Confirm no external dependencies that need CDN links

Make any necessary adjustments for Netlify deployment.
```

---

## 💡 Pro Tips

1. **Start Simple:** Get the basic structure working first, then refine
2. **Iterate:** Build → Test → Refine → Repeat
3. **Test Locally:** Use `python3 -m http.server 8000` to test
4. **Mobile First:** Always check mobile view first
5. **Ask for Specifics:** The more detail you give Claude Code, the better the output

---

## 🎯 Example: Complete Prompt for a Restaurant

```
Build a complete static website for "The Luxe Fine Dining", an upscale Italian restaurant in Dana Point, California.

Create:
1. index.html - Home page with:
   - Elegant hero section with restaurant name and tagline
   - Featured menu items section (3-4 items with descriptions)
   - About section (restaurant story, chef, ambiance)
   - Reservations section with form
   - Footer with address, hours, contact

2. css/style.css - Complete stylesheet:
   - Elegant, sophisticated design
   - Warm color palette (deep burgundy, gold accents, cream backgrounds)
   - Elegant typography (serif for headings, sans-serif for body)
   - Smooth animations
   - Responsive design
   - Professional spacing

3. js/script.js - Interactive elements:
   - Mobile menu toggle
   - Smooth scrolling
   - Form validation
   - Reservation form handling

4. robots.txt and sitemap.xml

Design should feel:
- Upscale and sophisticated
- Warm and inviting
- Professional yet approachable
- Emphasize quality and elegance

Make it production-ready for Netlify deployment.
```

---

**Remember:** Claude Code works best when you're specific about:
- Business type and industry
- Design style preferences
- Color scheme (or let it choose)
- Required sections/pages
- Target audience

The more context you provide, the better the result!

