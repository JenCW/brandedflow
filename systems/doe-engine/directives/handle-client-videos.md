# DIRECTIVE: Handle Client Videos for Website

## 1. GOAL
Automatically process client video testimonials and media, upload to Cloudinary CDN, and integrate into website with optimal SEO and performance.

## 2. INPUTS
- **Client Name**: From user request
- **Video Location**: `clients/{client-name}/00_media-drop/videos/` or `clients/{client-name}/03_website/images/Work-pics-and-vids/`
- **Video Files**: .MOV, .MP4, .mov, .mp4 files
- **Cloudinary Credentials**: From environment or config

## 3. PROCESS

### Step 1: Identify Videos
1. **Check drop folder**: `clients/{client-name}/00_media-drop/videos/`
2. **Check website folder**: `clients/{client-name}/03_website/images/**/*.MOV` (and variants)
3. **List all video files** found
4. **Ask user**: Which videos to use? (if multiple found)

### Step 2: Upload to Cloudinary
1. **Get Cloudinary credentials**:
   - Check: `clients/{client-name}/cloudinary-config.json` (if exists)
   - Or: Environment variables
   - Or: Ask user for cloud name and API key
2. **Upload each video**:
   - Use Cloudinary API
   - Set optimization: `quality: "auto"`, `format: "mp4"`
   - Get delivery URL
   - Store URL mapping

### Step 3: Update Website HTML
1. **Find video references** in HTML files:
   - Search for: `<video src="images/...`
   - Search for: Video testimonial sections
   - Search for: Any local video paths
2. **Replace with CDN URLs**:
   - Update `src` attributes to Cloudinary URLs
   - Maintain all other attributes (controls, preload, etc.)
   - Keep alt text and descriptions

### Step 4: Optimize for SEO
1. **Add video schema markup**:
   - VideoObject schema for each video
   - Include title, description, thumbnail
   - Add to page schema
2. **Optimize meta tags**:
   - Video-specific meta tags
   - Open Graph video tags
   - Twitter Card video tags

### Step 5: Create Video Testimonial Section
1. **If testimonials**:
   - Create elegant video testimonial grid
   - Add play buttons and hover effects
   - Include client names and quotes
   - Make responsive and fast-loading

## 4. OUTPUTS
- Videos uploaded to Cloudinary
- HTML files updated with CDN URLs
- Schema markup added
- Video testimonial sections created
- Cloudinary config saved (for future use)
- Documentation updated

## 5. EXECUTION

### Automation Script
Create: `systems/doe-engine/execution/upload-videos-cloudinary.js`

**Functionality**:
- Scans for video files
- Uploads to Cloudinary
- Returns CDN URLs
- Updates HTML files
- Adds schema markup

### MCP Integration
- `upload-videos-to-cloudinary` - Uploads videos, returns URLs
- `update-html-video-urls` - Replaces local paths with CDN URLs
- `add-video-schema` - Adds VideoObject schema markup

## 6. EDGE CASES
- **No Cloudinary account**: Guide user to create one (free, 2 minutes)
- **Large videos**: Cloudinary auto-optimizes, but warn if > 500MB
- **Multiple videos**: Batch upload, show progress
- **Video format issues**: Cloudinary auto-converts
- **Existing videos**: Check if already uploaded, reuse URLs

## 7. LEARNINGS
- Always use CDN for videos (never git)
- Cloudinary is industry standard
- Video testimonials convert 3x better than text
- Schema markup improves SEO significantly
- Auto-optimization saves time and improves performance

---

**Last Updated**: January 2025  
**Status**: Active  
**Priority**: High - Videos are critical for modern marketing

