# Video Compression Guide

## The Problem

Cloudinary free tier has a **100MB file size limit**. If your videos are larger, they won't upload.

---

## Quick Solution: Use HandBrake (Easiest)

### Step 1: Download HandBrake
- **Mac**: `brew install handbrake` or download from https://handbrake.fr
- **Windows**: Download from https://handbrake.fr

### Step 2: Compress Each Video
1. Open HandBrake
2. Click "Open Source" and select your video
3. **Preset**: Choose "Fast 1080p30" or "General/Fast 1080p30"
4. **Output**: Save as compressed version (same folder)
5. Click "Start Encode"
6. **Replace original**: Once done, replace the original file with the compressed version

### Step 3: Check File Size
- Compressed videos should be **under 100MB**
- Usually reduces size by **70-90%**
- Quality still looks great

---

## Alternative: Use FFmpeg (Command Line)

### Install FFmpeg
```bash
brew install ffmpeg  # Mac
# or download from https://ffmpeg.org
```

### Compress Videos
```bash
cd /path/to/videos

# Compress a video (reduces size ~80%)
ffmpeg -i input.MOV -crf 28 -preset fast -c:v libx264 -c:a aac -b:a 128k output_compressed.mp4

# Check size
ls -lh output_compressed.mp4

# If under 100MB, replace original
mv output_compressed.mp4 input.MOV
```

**Parameters explained:**
- `-crf 28`: Quality setting (lower = better quality, higher = smaller file)
- `-preset fast`: Encoding speed (fast = quicker encoding, slightly larger file)
- `-c:v libx264`: Video codec (H.264, widely compatible)
- `-c:a aac`: Audio codec
- `-b:a 128k`: Audio bitrate

---

## Alternative: Use Online Compressor

1. Go to https://www.freeconvert.com/video-compressor
2. Upload each video
3. Set quality to "Medium" or "High"
4. Download compressed version
5. Replace original

---

## Target Sizes

- **Goal**: Under 100MB per video
- **Ideal**: 20-50MB per video (fast loading, good quality)
- **Maximum**: 100MB (Cloudinary free tier limit)

---

## Check Current File Sizes

```bash
cd /path/to/videos
ls -lh *.MOV *.mp4
```

If any are over 100MB, compress them first.

---

## After Compression

Upload your videos using your preferred method (Cloudinary, CDN, etc.)

