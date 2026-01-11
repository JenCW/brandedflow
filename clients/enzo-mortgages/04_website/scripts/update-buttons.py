#!/usr/bin/env python3
import re
import os

# Define button style replacements
PRIMARY_BTN = 'inline-flex items-center gap-2 px-8 py-4 bg-primary border border-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition-colors'
OUTLINE_BTN = 'inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-primary text-primary font-semibold rounded hover:bg-primary hover:text-primary-foreground transition-colors'

# Files to update
files = [
    "app/landing/buying/page.tsx",
    "app/landing/cash-out/page.tsx",
    "app/landing/refinance/page.tsx",
    "app/landing/investment/page.tsx",
    "app/apply/page.tsx",
]

def update_button_styles(content):
    # Replace btn-luxury-outline first (more specific pattern)
    content = re.sub(
        r'className="([^"]*\s)?btn-luxury-outline(\s[^"]*)?"',
        f'className="{OUTLINE_BTN}"',
        content
    )

    # Replace btn-luxury with or without additional classes
    content = re.sub(
        r'className="([^"]*\s)?btn-luxury[^"]*"',
        f'className="{PRIMARY_BTN}"',
        content
    )

    # Handle cases with w-full, justify-center, etc.
    content = re.sub(
        f'className="{PRIMARY_BTN}"',
        lambda m: f'className="w-full {PRIMARY_BTN} justify-center"' if 'w-full' in m.string[max(0,m.start()-100):m.start()] else m.group(),
        content
    )

    return content

for filepath in files:
    if not os.path.exists(filepath):
        print(f"✗ File not found: {filepath}")
        continue

    print(f"Updating {filepath}...")

    with open(filepath, 'r') as f:
        content = f.read()

    original_content = content
    content = update_button_styles(content)

    if content != original_content:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"✓ Updated {filepath}")
    else:
        print(f"- No changes needed in {filepath}")

print("\n✅ Button style update complete!")
