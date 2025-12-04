# Quick Reference Guide - AQ Remodeling Website

## 🎯 Most Common Updates

### Change Phone Number or Email
**Files:** ALL `.html` files (search in each)
**Search for:** `(555) 123-4567` or `info@aqremodeling.com`
**Replace with:** Real contact info

---

### Update Service Modal Content
**File:** `js/service-modal.js`
**Line:** Find the service name (e.g., `tenant:`, `hotel:`, etc.)
**Edit:** title, description, or items in the `includes` array

---

### Add Portfolio Image
**File:** `portfolio.html`
**Steps:**
1. Add image to `/images/Work-pics-and-vids/`
2. Copy existing portfolio item code block
3. Update image path, title, description
4. Save and refresh

---

### Change Colors
**File:** `css/style.css` (lines 10-24)
**Variables:**
- `--luxury-gold: #d4af37` ← Accent color
- `--primary-dark: #0a0a0a` ← Background
- `--off-white: #f5f5f5` ← Text color

---

### Update Slider Images
**File:** `index.html` (lines 35-50)
**Change:** `src="images/Work-pics-and-vids/IMG_XXXX.png"`

---

## 📁 Key Files

| File | What It Does |
|------|--------------|
| `index.html` | Home page with hero slider |
| `commercial.html` | Commercial services with popups |
| `portfolio.html` | Project gallery (40 images) |
| `css/style.css` | ALL styling (colors, fonts, layouts) |
| `js/service-modal.js` | Popup content for services |
| `js/script.js` | Slider, animations, interactions |

---

## 🚀 Deploy to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up (free)
3. Drag `aq-remodeling` folder onto dashboard
4. Get instant URL!

**To update live site:**
- Make local changes
- Drag folder to Netlify again
- Done!

---

## 💬 Ask Claude for Updates

**Start with:**
"I need to update the AQ Remodeling site. Client wants [describe changes]."

**Always specify:**
- Which page needs updating
- What specifically should change
- Share screenshots if visual changes

---

## 🐛 Quick Fixes

**Images not showing?**
- Check file path matches image name exactly
- Make sure image is in `/images/Work-pics-and-vids/`

**Buttons not working?**
- Check browser console (F12) for errors
- Make sure `.js` files are loading

**Changes not showing?**
- Hard refresh: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)

---

## 📞 Important Info

**Project Location:**
`/Users/jencortez-walters/brandedflow/aq-remodeling/`

**Documentation:**
`/Users/jencortez-walters/brandedflow/aq-remodeling/CLIENT_DOCS/`

**Client:** AQ Remodeling (Orange County)
**Type:** Luxury Remodeling Contractor
**Theme:** Dark luxury with gold accents
