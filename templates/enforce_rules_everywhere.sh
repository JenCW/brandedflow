#!/bin/bash
# This script ensures .cursorrules exists in EVERY project
# Run this periodically or add to cron

GLOBAL_RULES="$HOME/.cursorrules"

if [ ! -f "$GLOBAL_RULES" ]; then
    echo "Error: Global rules file not found at $GLOBAL_RULES"
    exit 1
fi

echo "Enforcing .cursorrules in all Git repositories..."

# Find all git repos and ensure .cursorrules exists
find ~ -type d -name ".git" -not -path "*/node_modules/*" 2>/dev/null | while read gitdir; do
    project_root="$(dirname "$gitdir")"
    if [ ! -f "$project_root/.cursorrules" ]; then
        cp "$GLOBAL_RULES" "$project_root/.cursorrules"
        echo "✅ Added .cursorrules to: $project_root"
    fi
done

echo "Done!"
