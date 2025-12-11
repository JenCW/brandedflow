# Commercial Portfolio Images Needed

## Current Status
The portfolio currently has **placeholder divs** for commercial projects. These need to be replaced with actual finished commercial project photos.

## Required Commercial Images

### 1. Office Remodel
**Description:** Modern office space with glass partitions, professional workstations, and contemporary design
**What to show:**
- Open office layout or private offices
- Glass partitions or walls
- Professional workstations
- Modern lighting
- Finished, clean, professional appearance

### 2. Retail Renovation
**Description:** Storefront upgrade with modern fixtures, display areas, and customer-friendly layout
**What to show:**
- Storefront or interior retail space
- Modern fixtures and displays
- Clean, finished appearance
- Customer-friendly layout
- Professional finish work

### 3. Hotel Reception
**Description:** Elegant hotel lobby and reception area with luxury finishes and welcoming atmosphere
**What to show:**
- Hotel lobby or reception desk
- Luxury finishes
- Welcoming, professional atmosphere
- Complete, finished space
- High-end appearance

### 4. Tenant Improvement
**Description:** Complete commercial tenant build-out with custom design and professional finish work
**What to show:**
- Finished commercial tenant space
- Custom design elements
- Professional finish work
- Complete build-out
- Ready for occupancy

### 5. Hotel Guest Room
**Description:** Renovated hotel guest room with modern amenities and elegant design
**What to show:**
- Finished hotel guest room
- Modern amenities visible
- Elegant design
- Complete renovation
- Professional appearance

### 6. Commercial Buildout
**Description:** Professional commercial space with custom casework and premium finishes
**What to show:**
- Finished commercial space
- Custom casework/cabinetry
- Premium finishes
- Professional appearance
- Complete project

## Image Requirements

### ✅ DO Include:
- **Only finished projects** - completely done, ready for use
- **Professional photography** - well-lit, clear, high-quality
- **Clean spaces** - no tools, construction materials, or workers visible
- **Multiple angles** - if you have different views of the same project, choose the best one
- **Consistent quality** - all images should match the professional standard

### ❌ DON'T Include:
- Work in progress
- Unfinished spaces
- Construction workers or tools visible
- Messy or cluttered areas
- Low-quality or blurry photos
- Duplicates of the same space

## Where to Get Images

1. **Client Projects:** Use photos from actual completed commercial projects
2. **Professional Photographer:** Hire a photographer for finished projects
3. **Stock Photos (if needed):** Use high-quality stock photos that match your actual work style
4. **AI Generation:** Use AI image generators (Midjourney, DALL-E, etc.) to create photorealistic commercial spaces that match your aesthetic

## How to Add Images

1. Save images to: `images/Work-pics-and-vids/`
2. Convert to WebP format for best performance
3. Name them descriptively: `commercial-office-01.webp`, `commercial-retail-01.webp`, etc.
4. Update `portfolio.html` - replace the placeholder divs with actual `<img>` tags

## Current Placeholder Locations

In `portfolio.html`, find the section marked:
```html
<!-- Commercial Project Showcase -->
<!-- NOTE: Commercial images need to be added - these are placeholders with descriptions -->
```

Replace each placeholder `<div>` with:
```html
<div class="portfolio-item" data-category="commercial">
    <img src="images/Work-pics-and-vids/YOUR_IMAGE.webp" alt="Description" loading="lazy">
    <div class="portfolio-overlay">
        <h3>Project Title</h3>
        <p>Project description</p>
    </div>
</div>
```

## Priority

**High Priority:** Office Remodel, Retail Renovation, Hotel Reception
**Medium Priority:** Tenant Improvement, Commercial Buildout
**Lower Priority:** Hotel Guest Room (can be added later)

---

**Note:** The portfolio currently shows placeholders. Once you have commercial project photos, replace the placeholders following the format above.

