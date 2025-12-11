# Client Media Workflow - Best Practices

## The Problem

Clients send you videos/photos for website use, but:
- Videos are too large for git (3.5GB = push failures)
- But videos need to be accessible on the website
- How do you handle the workflow?

## ✅ Recommended Workflow

### Folder Structure

```
clients/[client-name]/
  ├── 00_media-drop/          ← Client sends media here (NOT in git)
  │   ├── videos/             ← Raw videos from client
  │   ├── photos/             ← Raw photos from client
  │   └── README.md           ← Instructions
  │
  ├── 03_website/             ← Website files (in git)
  │   ├── images/             ← Optimized images (in git, small files)
  │   └── ...                 ← HTML, CSS, etc.
```

### Step-by-Step Process

#### 1. Client Sends Media
- Client uploads to `00_media-drop/` folder
- You review and select what to use
- **This folder is NOT in git** (excluded via .gitignore)

#### 2. Process Selected Media

**For Images:**
- Optimize images (compress, convert to WebP)
- Move to `03_website/images/`
- Add to git (images are small, OK in git)
- Deploy normally

**For Videos:**
- **Option A (Recommended)**: Upload to CDN (Cloudinary)
  - Upload video to Cloudinary
  - Get CDN URL
  - Update HTML: `<video src="https://res.cloudinary.com/.../video.mp4">`
  - Deploy code (no video in git)
  
- **Option B**: Compress and add to git (if small enough)
  - Compress video with HandBrake (reduce 80-90%)
  - If under 10MB, add to git
  - Deploy normally

#### 3. Archive/Delete
- Move unused files to cloud storage (Google Drive)
- Delete from drop folder
- Keep folder clean

---

## 🎯 For AQ Remodeling Specifically

### Current Situation:
- ✅ Website uses **images** (not videos) - perfect!
- ✅ Images are in git (small, fast)
- ✅ Videos removed from git (correct)
- ✅ Videos still on computer (in images folder)

### If You Need Videos on Website:

**Option 1: Use CDN (Best)**
1. Sign up for Cloudinary (free: 25GB)
2. Upload selected videos
3. Get URLs
4. Update HTML to use CDN URLs
5. Deploy (fast, no videos in git)

**Option 2: Compress Videos**
1. Use HandBrake to compress videos
2. If total < 50MB, add to git
3. Deploy normally

**Option 3: Netlify Large Media**
1. Enable Netlify Large Media
2. Videos stored separately
3. Still accessible on site

---

## 📋 Best Practice Rules

### ✅ DO:
- Keep client drop folders outside git (`00_media-drop/`)
- Optimize images before adding to git
- Use CDN for videos
- Archive unused media to cloud storage
- Keep git repo small and fast

### ❌ DON'T:
- Put raw client videos in git
- Leave media in drop folder long-term
- Commit unoptimized large files
- Mix client media with website files

---

## 🔧 Setup for Future Clients

### 1. Create Drop Folder
```bash
mkdir -p clients/[client-name]/00_media-drop/{videos,photos}
```

### 2. Add to .gitignore
Already done - `clients/*/00_media-drop/` is excluded

### 3. Create README
Copy template README to explain workflow

### 4. Process Media
- Review in drop folder
- Process selected files
- Archive/delete rest

---

## 💡 Pro Tips

### For Images:
- **Optimize first**: Use ImageOptim, TinyPNG, or similar
- **WebP format**: Best compression
- **Max size**: Keep under 1-2MB per image
- **OK in git**: Images are fine in git (small files)

### For Videos:
- **Use CDN**: Cloudinary, Vimeo, or YouTube
- **Compress if needed**: HandBrake reduces size 80-90%
- **Limit count**: Only essential videos on site
- **NOT in git**: Videos should use CDN, not git

### Workflow:
- **Drop folder**: Temporary, not in git
- **Selected media**: Process and optimize
- **Website files**: Only optimized, necessary files
- **Archive**: Cloud storage for originals

---

## ❓ FAQ

**Q: How do videos get to Netlify if not in git?**
A: They don't need to be in git! Use a CDN (Cloudinary) - upload videos there, embed URLs in HTML, deploy code. Videos load from CDN, not Netlify.

**Q: Can I just put videos back in git?**
A: Technically yes, but you'll have slow pushes, potential costs, and unprofessional setup. CDN is better.

**Q: What about images?**
A: Images are fine in git (usually < 1MB each). Just optimize them first.

**Q: Do I need to pay for Cloudinary?**
A: No, free tier is 25GB storage and 25GB bandwidth/month. Plenty for most websites.

---

## 🎯 Action Items

1. ✅ **Done**: Created `00_media-drop/` folder structure
2. ✅ **Done**: Added to .gitignore
3. ⏳ **Next**: Set up Cloudinary account (if using videos)
4. ⏳ **Next**: Create workflow documentation for each client

---

**Bottom Line**: Client drop folders are temporary storage (not in git). Process selected media (optimize images, upload videos to CDN), then archive/delete. This keeps git fast and professional!

