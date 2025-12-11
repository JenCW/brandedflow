# Media Handling Guide

## Adding Media from iPhone to Website

### Option 1: AirDrop (Easiest)

**On iPhone:**
1. Open Messages app
2. Long-press on video/photo
3. Tap **Share** → **AirDrop** → Select your Mac

**On Mac:**
1. Accept AirDrop notification
2. Save directly to website folder when prompted
3. Or save to Downloads, then drag to website folder

---

### Option 2: Save to Photos, Then Export

**On iPhone:**
1. Open Messages app
2. Long-press on video/photo
3. Tap **Save** (saves to Photos app)

**On Mac:**
1. Open **Photos** app
2. Find the videos/photos you saved
3. Select them
4. Go to **File → Export → Export [X] Photos**
5. Choose format and location
6. Export to your website's media folder

---

### Option 3: Use Image Capture (USB Connection)

1. Connect iPhone to Mac via USB
2. Trust the computer on iPhone if prompted
3. Open **Image Capture** app (built into Mac)
4. Select your iPhone
5. Select videos/photos you want
6. Choose destination folder
7. Click **Import**

---

### Option 4: iCloud Messages Sync (If Enabled)

If you have Messages in iCloud enabled:
1. Videos might sync to Messages app on Mac
2. Open **Messages app** on Mac
3. Find the conversation
4. Right-click video → **Save Attachment**
5. Save to website folder

---

## Recommended Workflow

1. **Client sends media** to `clients/[client-name]/00_media-drop/` folder
2. **Review and select** what to use
3. **Optimize images** (compress, convert to WebP)
4. **Compress videos** if needed (see `video-compression.md`)
5. **Move to website folder** (`03_website/images/`)
6. **Update HTML** to reference new media
7. **Deploy** (see `deployment-setup.md`)

---

## File Organization

```
clients/[client-name]/
  ├── 00_media-drop/          ← Client sends media here (NOT in git)
  │   ├── videos/             ← Raw videos from client
  │   ├── photos/             ← Raw photos from client
  │   └── README.md           ← Instructions for client
  │
  ├── 03_website/             ← Website files (in git)
  │   ├── images/             ← Optimized images (in git, small files)
  │   └── ...                 ← HTML, CSS, etc.
```

---

## Best Practices

- ✅ **Never commit large video files to git** (use CDN instead)
- ✅ **Optimize images** before adding to website (WebP format, compressed)
- ✅ **Compress videos** to under 100MB if using Cloudinary free tier
- ✅ **Use CDN for videos** (Cloudinary, Vimeo) for better performance
- ✅ **Keep originals** in `00_media-drop/` folder as backup

---

## Troubleshooting

**"Files not showing on website"**
- Check file paths in HTML match actual file locations
- Verify filenames match exactly (case-sensitive)
- Clear browser cache (Cmd+Shift+R)

**"Videos too large"**
- Compress videos first (see `video-compression.md`)
- Or use CDN instead of local files

**"Can't find files in Messages"**
- Scroll up in conversation - files might be older messages
- Check if files were sent in a group chat
- Files might be in a different conversation thread

