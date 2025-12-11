#!/bin/bash
# Quick video compression script using FFmpeg
# Compresses videos to under 100MB for Cloudinary upload

echo "🎬 Video Compression Script"
echo "=========================="
echo ""

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found!"
    echo "📦 Install with: brew install ffmpeg"
    exit 1
fi

VIDEOS_DIR="images/Work-pics-and-vids"
BACKUP_DIR="images/Work-pics-and-vids/backup"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Videos to compress
VIDEOS=(
    "IMG_6988.MOV"
    "IMG_6949.MOV"
    "IMG_6831.MOV"
    "IMG_6770.MOV"
    "IMG_6190.MOV"
    "IMG_6189.MOV"
)

echo "📦 Compressing videos..."
echo ""

for video in "${VIDEOS[@]}"; do
    if [ -f "$VIDEOS_DIR/$video" ]; then
        echo "Processing: $video"
        
        # Get original size
        ORIGINAL_SIZE=$(du -h "$VIDEOS_DIR/$video" | cut -f1)
        echo "  Original size: $ORIGINAL_SIZE"
        
        # Backup original
        cp "$VIDEOS_DIR/$video" "$BACKUP_DIR/$video"
        echo "  ✓ Backed up to backup/"
        
        # Compress (CRF 28 = good quality, smaller size)
        OUTPUT="${video%.*}_compressed.mp4"
        if ffmpeg -i "$VIDEOS_DIR/$video" \
            -crf 28 \
            -preset fast \
            -movflags +faststart \
            -c:v libx264 \
            -c:a aac \
            -b:a 128k \
            "$VIDEOS_DIR/$OUTPUT" -y 2>&1 | tee /tmp/ffmpeg_output.log; then
            echo "  ✓ FFmpeg compression completed"
        else
            echo "  ❌ FFmpeg error - check /tmp/ffmpeg_output.log"
            cat /tmp/ffmpeg_output.log | tail -5
        fi
        
        if [ -f "$VIDEOS_DIR/$OUTPUT" ]; then
            NEW_SIZE=$(du -h "$VIDEOS_DIR/$OUTPUT" | cut -f1)
            echo "  Compressed size: $NEW_SIZE"
            
            # Replace original with compressed
            mv "$VIDEOS_DIR/$OUTPUT" "$VIDEOS_DIR/$video"
            echo "  ✓ Compressed and replaced"
        else
            echo "  ❌ Compression failed"
        fi
        
        echo ""
    else
        echo "⚠️  Not found: $video"
        echo ""
    fi
done

echo "✅ Done! Videos compressed and ready for upload."
echo "📝 Run: node upload-testimonial-videos.js"

