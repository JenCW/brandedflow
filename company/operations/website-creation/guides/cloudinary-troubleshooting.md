# Cloudinary Troubleshooting Guide

## Common Errors & Solutions

### Error 1: "Invalid cloud_name"

**Possible Causes:**
1. Account not fully activated - Check email for verification
2. Wrong credentials - Double-check in Cloudinary dashboard
3. Account type issue - Make sure you're on free tier
4. Typo or extra spaces in config file

**Solution:**
1. Go to: https://cloudinary.com/console
2. Log in
3. Go to: **Settings** → **Product Environment Credentials**
4. **Verify** your cloud name matches exactly (case-sensitive)
5. **Copy credentials again** and update config file
6. Make sure there are no extra spaces or characters

---

### Error 2: "413 - Payload Too Large" or "File too large"

**Cause:**
Videos/images are **over 100MB** (Cloudinary free tier limit)

**Solution: Compress Files First**

#### Option A: Use Compression Script
```bash
cd /path/to/website

# Install FFmpeg if needed
brew install ffmpeg

# Run compression script (if available)
./compress-videos.sh
```

#### Option B: Use HandBrake (Visual)
1. Download HandBrake: https://handbrake.fr
2. Open each video
3. Preset: "Fast 1080p30"
4. Encode
5. Replace original with compressed version

#### Option C: Manual FFmpeg
```bash
cd /path/to/videos

# Compress one video
ffmpeg -i input.MOV -crf 28 -preset fast input_compressed.mp4

# Replace original
mv input_compressed.mp4 input.MOV
```

**Target Size:**
- **Goal**: Under 100MB per video
- **Ideal**: 20-50MB (fast loading, good quality)

See `video-compression.md` for detailed instructions.

---

### Error 3: "Cannot find module cloudinary-config.json"

**Possible Causes:**
1. File not in correct location
2. File name misspelled
3. File has invalid JSON format
4. Running script from wrong directory

**Solution:**
1. Check file location: `clients/[client-name]/cloudinary-config.json`
2. Verify file name is exact (case-sensitive)
3. Check JSON format is valid (use JSON validator)
4. Make sure you're running script from correct directory

---

### Error 4: "TypeError: callback is not a function"

**Cause:**
Unsupported progress callback being used in Cloudinary upload call

**Solution:**
Remove progress callback from upload script. Use standard upload format:
```javascript
cloudinary.uploader.upload(filePath, {
  resource_type: 'video',
  folder: 'testimonials'
})
```

---

## After Fixing

1. **Verify Cloudinary credentials** are correct
2. **Compress videos** to under 100MB (if needed)
3. **Check file paths** in script match actual locations
4. **Run upload script again**

---

## Quick Checks

**Check video sizes:**
```bash
cd /path/to/videos
du -h *.MOV *.mp4
```

**If any are over 100MB**: Compress them first!

**Verify config file:**
```bash
cat clients/[client-name]/cloudinary-config.json
```

**Check JSON is valid:**
- Use online JSON validator
- Make sure all quotes are double quotes
- No trailing commas

---

## Prevention Tips

- ✅ Always compress videos before uploading
- ✅ Verify credentials before running scripts
- ✅ Check file sizes first
- ✅ Test with one file before batch upload
- ✅ Keep config file in `.gitignore` (never commit API keys)

---

**Once videos are compressed and credentials verified, upload will work!**

