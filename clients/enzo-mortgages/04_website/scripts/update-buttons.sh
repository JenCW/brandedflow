#!/bin/bash

# Update all btn-luxury and btn-luxury-outline to VA button style
# Run from project root

cd "$(dirname "$0")/.." || exit 1

# Files to update
FILES=(
  "app/landing/buying/page.tsx"
  "app/landing/cash-out/page.tsx"
  "app/landing/refinance/page.tsx"
  "app/landing/investment/page.tsx"
  "app/landing/emergency-cash/page.tsx"
  "app/landing/first-time-buyer/page.tsx"
  "app/landing/foreign-national/page.tsx"
  "app/apply/page.tsx"
  "app/contact/page.tsx"
)

# VA Primary Button Style
PRIMARY_BTN='inline-flex items-center gap-2 px-8 py-4 bg-primary border border-primary text-primary-foreground font-semibold rounded hover:bg-primary\/90 transition-colors'

# VA Outline Button Style
OUTLINE_BTN='inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-primary text-primary font-semibold rounded hover:bg-primary hover:text-primary-foreground transition-colors'

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "Updating $file..."

    # Replace btn-luxury-outline first (before btn-luxury to avoid partial matches)
    sed -i '' 's/className="btn-luxury-outline"/className="'$OUTLINE_BTN'"/g' "$file"
    sed -i '' "s/className='btn-luxury-outline'/className=\"$OUTLINE_BTN\"/g" "$file"

    # Replace btn-luxury (including variants like btn-luxury btn-shiny)
    sed -i '' 's/className="btn-luxury[^"]*"/className="'$PRIMARY_BTN'"/g' "$file"
    sed -i '' "s/className='btn-luxury[^']*'/className=\"$PRIMARY_BTN\"/g" "$file"

    echo "✓ Updated $file"
  else
    echo "✗ File not found: $file"
  fi
done

echo ""
echo "✅ Button style update complete!"
