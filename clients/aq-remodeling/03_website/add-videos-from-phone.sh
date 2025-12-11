#!/bin/bash
# Script to add videos from iPhone to AQ Remodeling website

echo "📱 Adding Videos from iPhone to Website"
echo "========================================"
echo ""

# Website images folder
WEBSITE_FOLDER="/Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website/images/Work-pics-and-vids"

# Check if website folder exists
if [ ! -d "$WEBSITE_FOLDER" ]; then
    echo "❌ Website folder not found: $WEBSITE_FOLDER"
    exit 1
fi

echo "Website folder: $WEBSITE_FOLDER"
echo ""
echo "📋 Options to add videos:"
echo ""
echo "Option 1: Copy from iCloud Drive"
echo "  - Find your videos in iCloud Drive"
echo "  - Copy them to: $WEBSITE_FOLDER"
echo ""
echo "Option 2: Use Finder"
echo "  - Connect iPhone via cable or use AirDrop"
echo "  - Transfer videos to: $WEBSITE_FOLDER"
echo ""
echo "Option 3: Use this script"
echo "  - Place videos in a source folder"
echo "  - Run: ./add-videos-from-phone.sh /path/to/videos"
echo ""

# If source path provided, copy files
if [ -n "$1" ]; then
    SOURCE="$1"
    if [ ! -d "$SOURCE" ]; then
        echo "❌ Source folder not found: $SOURCE"
        exit 1
    fi
    
    echo "📂 Copying videos from: $SOURCE"
    echo "   To: $WEBSITE_FOLDER"
    echo ""
    
    # Copy video files
    find "$SOURCE" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.m4v" \) -exec cp {} "$WEBSITE_FOLDER/" \;
    
    COUNT=$(find "$SOURCE" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.m4v" \) | wc -l | tr -d ' ')
    echo "✅ Copied $COUNT video file(s)"
    echo ""
    echo "📋 Next steps:"
    echo "  1. Review videos in: $WEBSITE_FOLDER"
    echo "  2. Add them to portfolio.html or testimonials"
    echo "  3. Deploy: cd 03_website && netlify deploy --prod"
else
    echo "💡 To copy videos, run:"
    echo "   ./add-videos-from-phone.sh /path/to/video/folder"
    echo ""
    echo "Or manually copy videos to:"
    echo "   $WEBSITE_FOLDER"
fi

