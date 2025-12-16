#!/bin/bash
# ENFORCE RULES IN EVERY SINGLE PROJECT - RUNS NOW

echo "Enforcing rules in ALL projects across entire ecosystem..."
echo ""

GLOBAL_RULES="$HOME/.cursorrules"
COUNT=0

# Find ALL directories that could be projects
find ~ -type d -name ".git" -not -path "*/node_modules/*" -not -path "*/.*/*" 2>/dev/null | while read gitdir; do
    project_root="$(dirname "$gitdir")"
    if [ ! -f "$project_root/.cursorrules" ] || [ "$project_root/.cursorrules" -ot "$GLOBAL_RULES" ]; then
        cp "$GLOBAL_RULES" "$project_root/.cursorrules"
        echo "✅ $project_root"
        COUNT=$((COUNT + 1))
    fi
done

# Also check common project directories
for dir in ~/Projects ~/Code ~/Development ~/workspace ~/workspaces ~/dev ~/Desktop/* ~/Documents/*; do
    if [ -d "$dir" ] && [ ! -f "$dir/.cursorrules" ]; then
        cp "$GLOBAL_RULES" "$dir/.cursorrules" 2>/dev/null && echo "✅ $dir"
    fi
done

echo ""
echo "✅ Rules enforced across entire ecosystem"
