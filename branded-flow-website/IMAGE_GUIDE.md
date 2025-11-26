# Branded + Flow Website - Image Guide

## 📸 Images You Need

Your website has beautiful gradient placeholders showing you exactly what images to add. Here's the complete list:

---

## Hero Grid Section (Bento-Box Layout)

### Image 1: Brand/Design Work
- **Location:** Grid item 1 (top left)
- **Suggested:** Colorful logo designs, brand guidelines, or design workspace
- **Style:** Clean, bright, professional
- **Size:** 800x600px minimum
- **Colors:** Light, airy (matches cyan gradient)

### Image 2: Workspace/Tech Setup
- **Location:** Grid item 3 (large right column)
- **Suggested:** Your workspace at Colab, laptop with code/design, tech setup
- **Style:** Dark, modern, tech-focused
- **Size:** 1200x1000px minimum
- **Colors:** Dark tones (matches navy gradient)
- **Note:** This is the HERO image - most prominent!

### Image 3: Automation/System Visual
- **Location:** Grid item 4 (bottom left small)
- **Suggested:** Airtable screenshot, n8n workflow, automation dashboard
- **Style:** Technical but clean
- **Size:** 600x600px minimum
- **Colors:** Neutral, light

### Image 4: Client Success/Testimonial
- **Location:** Grid item 6 (bottom wide)
- **Suggested:** Happy client photo, before/after results, testimonial graphic
- **Style:** Warm, inviting, success-focused
- **Size:** 1200x500px minimum
- **Colors:** Light, soft tones

---

## About Section

### Your Professional Photo
- **Location:** Right side of "The Story Behind Branded + Flow"
- **Suggested:** Professional headshot or casual professional photo
- **Style:** Authentic, approachable, professional
- **Size:** 800x1200px minimum (portrait)
- **Colors:** Any (gradient will complement it)
- **Note:** Should match your brand - smart but approachable!

---

## Blog Section

### Featured Blog Image
- **Location:** Left large card
- **Suggested:** Conceptual image related to branding/business
- **Style:** Editorial, magazine-quality
- **Size:** 1000x800px minimum
- **Colors:** Can be bold/dark

### Blog Card Images (x2)
- **Location:** Two smaller cards on right
- **Suggested:**
  1. Automation/tech related (code, dashboards, tech setup)
  2. Personal/real talk image (workspace, coffee, authentic moment)
- **Style:** Clean, modern, relatable
- **Size:** 600x400px minimum each
- **Colors:** Light, bright, clean

---

## Meet the Team Section

### Jen's Portrait
- **Location:** Left side of "Meet the Team"
- **Suggested:** Casual but professional photo - maybe with hat (like screenshot inspo!)
- **Style:** Authentic, real, approachable (not stuffy corporate)
- **Size:** 800x1000px minimum (portrait)
- **Colors:** Natural, warm
- **Note:** This should feel REAL, not stock photo-ish!

---

## 🎨 Image Style Guidelines

**Overall Vibe:**
- Authentic, not stock photos
- Natural lighting preferred
- Editorial/magazine quality
- Real people, real workspaces
- Modern but not overly trendy

**Colors to Favor:**
- Navy blues (#0d1f3d)
- Cyan/turquoise (#00bcd4)
- Warm golds (#f4c430)
- Clean whites and light grays
- Avoid: Heavy blacks, neon colors, overly saturated

**Photography Style:**
- Clean backgrounds
- Good natural light or soft lighting
- Minimal clutter
- Professional but not corporate
- Behind-the-scenes feel is GOOD

---

## 📁 How to Add Your Images

### Option 1: Quick Replace (Easiest)
1. Save your images to `/Users/jencortez-walters/brandedflow/branded-flow-website/images/`
2. Name them clearly: `hero-workspace.jpg`, `about-jen.jpg`, etc.
3. Open `index.html`
4. Find the placeholder div (look for `gradient-navy`, `gradient-portrait`, etc.)
5. Replace the entire `<div class="image-placeholder gradient-X">` with:
   ```html
   <img src="images/your-image-name.jpg" alt="Description here">
   ```

### Option 2: Keep Gradients as Background (More Design-y)
1. Find the placeholder
2. Add your image as background:
   ```html
   <div class="image-placeholder" style="background-image: url('images/your-image.jpg'); background-size: cover; background-position: center;">
   </div>
   ```
3. Remove the `<span class="placeholder-hint">` line

### Example:

**BEFORE:**
```html
<div class="image-placeholder gradient-navy">
    <span class="placeholder-hint">Add: Workspace/tech setup photo</span>
</div>
```

**AFTER (Method 1 - Direct Image):**
```html
<img src="images/workspace.jpg" alt="Jen's workspace at Colab Space">
```

**AFTER (Method 2 - Background):**
```html
<div class="image-placeholder" style="background-image: url('images/workspace.jpg'); background-size: cover; background-position: center;">
</div>
```

---

## 📸 Where to Get Images

**Your Own Photos:**
- Take photos at Colab Space
- Screenshot your actual Airtable/n8n workflows
- Professional headshots you already have
- Client work examples (with permission!)

**Stock Photos (If Needed):**
- [Unsplash](https://unsplash.com) - Free, high quality
- [Pexels](https://pexels.com) - Free, good for tech/workspace
- Search terms: "workspace laptop", "woman entrepreneur", "tech dashboard"

**AI-Generated (If Needed):**
- Midjourney / DALL-E for conceptual images
- Can create consistent brand-aligned imagery

**Design Tools:**
- Canva - Create custom graphics
- Figma - Design mockups/screenshots

---

## 🚀 Priority Order

**Must-Have (Do These First):**
1. ✅ Your professional photo (About + Team sections)
2. ✅ Hero workspace image (large navy gradient)
3. ✅ Featured blog image

**Nice-to-Have (Add When You Can):**
4. Other hero grid images
5. Blog card images
6. Client success images

---

## 💡 Pro Tips

**Image Optimization:**
- Compress before uploading (use TinyPNG.com)
- Save for web at 80-90% quality
- Use JPG for photos, PNG for graphics with transparency
- WebP format is even better if you can

**Image Sizes:**
- Don't upload 5MB files!
- Aim for <500KB per image
- Larger hero images can be up to 1MB

**Alt Text:**
- Always add descriptive alt text for SEO
- Example: `alt="Jen Cortez-Walters working at her desk in Irvine, California"`

**Consistency:**
- Use similar lighting/style across all images
- Keep color palette aligned with brand
- Natural > posed

---

## ✅ Quick Checklist

Before going live, make sure you have:
- [ ] Professional photo of Jen (2 spots)
- [ ] Hero workspace image
- [ ] At least 1 featured blog image
- [ ] All images compressed and optimized
- [ ] Alt text added to all images
- [ ] Images look good on mobile too

---

**Current Status:** Beautiful gradient placeholders in place with helpful hints!

**Next Step:** Add your photos one by one, starting with your professional headshot.

**Questions?** Come back to Claude Code and say "I need help adding images to Branded + Flow site"
