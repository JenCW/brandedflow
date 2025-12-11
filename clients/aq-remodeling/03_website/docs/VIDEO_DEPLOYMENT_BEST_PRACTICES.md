# Video & Media File Deployment - Best Practices

## The Problem

You have a **client drop folder** where clients send videos/pictures for website use. But:
- ❌ Videos are too large for git (3.5GB = push failures)
- ❌ But videos NEED to be on the website
- ❌ How do they get to Netlify if not in git?

## ✅ Best Practice Solutions

### Option 1: Use a CDN (Recommended for Videos)

**How it works:**
1. Client sends videos to your drop folder
2. You upload videos to **Cloudinary** or **Vimeo** (free tiers available)
3. Get embed URLs from CDN
4. Update HTML to use CDN URLs (not local files)
5. Deploy code changes (small, fast)

**Pros:**
- ✅ Fast website (CDN is optimized for video)
- ✅ No git bloat (videos not in repository)
- ✅ Free tiers available (Cloudinary: 25GB free)
- ✅ Automatic optimization (CDN compresses/optimizes)
- ✅ Better user experience (faster loading)

**Cons:**
- ⚠️ Requires CDN account (but free tiers work)
- ⚠️ Extra step (upload to CDN first)

**Example:**
```html
<!-- Instead of: -->
<video src="images/video.MOV">

<!-- Use: -->
<video src="https://res.cloudinary.com/your-account/video/upload/v1234567/video.mp4">
```

---

### Option 2: Netlify Large Media (For Netlify Sites)

**How it works:**
1. Enable Netlify Large Media (Git LFS integration)
2. Videos stored separately from git
3. Netlify handles large files automatically
4. Still accessible on website

**Pros:**
- ✅ Works with Netlify automatically
- ✅ Videos accessible on site
- ✅ Doesn't bloat git repository

**Cons:**
- ⚠️ Requires Netlify Large Media setup
- ⚠️ May have costs for large storage
- ⚠️ More complex setup

**Setup:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Enable Large Media
netlify lm:install
```

---

### Option 3: Compress Videos Before Git (Quick Fix)

**How it works:**
1. Client sends videos to drop folder
2. **Compress videos** before adding to git (reduce size by 80-90%)
3. Add compressed videos to git
4. Deploy normally

**Pros:**
- ✅ Simple workflow (no extra services)
- ✅ Videos in git (easy to manage)
- ✅ Works with current setup

**Cons:**
- ⚠️ Still slower than CDN
- ⚠️ Git repo still larger than ideal
- ⚠️ Manual compression step

**Tools:**
- **HandBrake** (free, easy): Compress MOV/MP4 files
- **FFmpeg** (command line): `ffmpeg -i input.MOV -crf 28 output.mp4`

---

### Option 4: Selective Video Inclusion (Current Workaround)

**How it works:**
1. Client sends all videos to drop folder
2. You **select only videos you'll actually use** on website
3. Compress those selected videos
4. Add only selected/compressed videos to git
5. Keep all originals in drop folder (not in git)

**Pros:**
- ✅ Only necessary videos in git
- ✅ Original videos preserved (not in git)
- ✅ Works with current workflow

**Cons:**
- ⚠️ Still need to compress
- ⚠️ Manual selection process

---

## 🎯 Recommended Workflow for AQ Remodeling

### For This Project (Right Now):

**Since you already removed videos from git:**

1. **For videos you NEED on the website:**
   - Option A: Upload to **Cloudinary** (free, easy)
   - Option B: Compress and add back to git (if small enough)
   - Option C: Use Netlify Large Media

2. **For videos you DON'T need on website:**
   - Keep in drop folder (not in git)
   - Archive to Google Drive/Dropbox
   - Delete if no longer needed

### Long-term Best Practice:

**Recommended Setup:**
1. **Client Drop Folder**: `clients/[client]/00_media-drop/` (NOT in git)
2. **Selected Media**: Upload to Cloudinary CDN
3. **Website Code**: References CDN URLs (in git)
4. **Deployment**: Fast, small, professional

---

## 📋 Step-by-Step: Using Cloudinary (Recommended)

### 1. Create Cloudinary Account
- Go to: https://cloudinary.com (free tier: 25GB storage)
- Sign up (free)

### 2. Upload Videos
- Upload selected videos to Cloudinary
- Get URLs for each video

### 3. Update HTML
```html
<!-- Replace this: -->
<video src="images/Work-pics-and-vids/IMG_6988.MOV">

<!-- With this: -->
<video src="https://res.cloudinary.com/your-account/video/upload/v1234567/IMG_6988.mp4">
```

### 4. Deploy
- Commit HTML changes (small, fast)
- Push to git (no videos = fast)
- Netlify deploys (videos load from CDN)

---

## 🔧 Current Situation Fix

### What to Do Now:

1. **Check which videos are actually used on website:**
   - Look at HTML files for video references
   - Only those need to be accessible

2. **For videos used on site:**
   - Upload to Cloudinary (recommended)
   - OR compress and add back to git (if < 50MB total)

3. **For videos NOT used:**
   - Keep in drop folder (not in git)
   - Archive to cloud storage
   - They don't need to be on website

4. **Update .gitignore:**
   - Keep excluding large videos
   - But allow small/compressed videos if needed

---

## 💡 Pro Tips

### Video Optimization:
- **Compress before upload**: Use HandBrake to reduce size 80-90%
- **Use WebM format**: Better compression than MP4
- **Limit video count**: Only use essential videos on site

### Workflow:
- **Drop folder**: `clients/[client]/00_media-drop/` (not in git)
- **Selected media**: Process and upload to CDN
- **Website**: References CDN URLs
- **Git**: Only code, no large media

### For Images:
- **Images are fine in git** (usually < 1MB each)
- **WebP format**: Best compression
- **Optimize before adding**: Use ImageOptim or similar

---

## ❓ FAQ

**Q: Can I just put videos back in git?**
A: Technically yes, but you'll have the same problems (slow, expensive, unprofessional). Better to use CDN.

**Q: What if client wants to update videos frequently?**
A: CDN is even better - upload new video, get new URL, update HTML, deploy. Fast and easy.

**Q: Do I need to pay for Cloudinary?**
A: No, free tier is 25GB storage and 25GB bandwidth/month. Plenty for most websites.

**Q: What about images?**
A: Images are fine in git (usually small). Only videos are the problem.

---

## 🎯 Action Items

1. **Decide**: CDN (Cloudinary) or compress videos?
2. **For CDN**: Sign up, upload videos, update HTML
3. **For compression**: Use HandBrake, compress, add to git
4. **Update workflow**: Create `00_media-drop/` folder (not in git) for future clients

---

**Bottom Line**: Videos don't need to be in git to be on the website. Use a CDN (Cloudinary) for best results, or compress videos if you want them in git. Either way, your git repo stays fast and small!

