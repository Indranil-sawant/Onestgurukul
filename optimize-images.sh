#!/bin/bash

# O'Nest Gurukul - Image Optimization Script
# Optimizes all images for web performance

SCRIPT_DIR="/home/neon/College/Onestgurukul"
IMG_DIR="$SCRIPT_DIR/assets/img"
OPTIMIZED_DIR="$IMG_DIR/optimized"

echo "========================================="
echo "O'NEST GURUKUL - IMAGE OPTIMIZATION"
echo "========================================="
echo ""

# Create optimized directory
mkdir -p "$OPTIMIZED_DIR"

# Count images
TOTAL_IMAGES=$(find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) | wc -l)
echo "📊 Found $TOTAL_IMAGES images to analyze"
echo ""

# List heaviest images
echo "🔥 TOP 20 HEAVIEST IMAGES:"
echo "-------------------------------------------"
find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec ls -lh {} \; | \
  awk '{print $5, $9}' | sort -h -r | head -20
echo ""

# Check for image magick
if command -v convert &> /dev/null; then
    echo "✅ ImageMagick found - will optimize images"
    HAVE_IMAGEMAGICK=true
else
    echo "⚠️  ImageMagick not found - will skip optimization"
    HAVE_IMAGEMAGICK=false
fi

# Check for cwebp
if command -v cwebp &> /dev/null; then
    echo "✅ cwebp found - will convert to WebP"
    HAVE_CWEBP=true
else
    echo "⚠️  cwebp not found - will skip WebP conversion"
    HAVE_CWEBP=false
fi

echo ""
echo "========================================="
echo "OPTIMIZATION SUMMARY"
echo "========================================="
echo "Total images found: $TOTAL_IMAGES"
echo "Optimization tools available:"
echo "  - ImageMagick: $HAVE_IMAGEMAGICK"
echo "  - WebP: $HAVE_CWEBP"
echo ""

# Find duplicate images
echo "🔍 CHECKING FOR DUPLICATE IMAGES..."
echo "-------------------------------------------"
find "$IMG_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) -exec md5sum {} \; | \
  sort | uniq -w32 -D --all-repeated=separate | head -20
echo ""

echo "✅ Analysis complete!"
echo "Run optimization commands manually based on the analysis above."
