#!/bin/bash
# Check for direct execution script calls that should use dispatcher

EXIT_CODE=0

echo "🔍 Checking for direct execution script calls..."

# Patterns to check for
PATTERNS=(
  "systems/doe-engine/execution/.*\.py"
  "python.*execution/.*\.py"
  "python3.*execution/.*\.py"
)

# Files/directories to check
CHECK_DIRS=(
  "cursor"
  "docs"
  "company"
)

for dir in "${CHECK_DIRS[@]}"; do
  if [ ! -d "$dir" ]; then
    continue
  fi
  
  for pattern in "${PATTERNS[@]}"; do
    # Check in tracked files
    matches=$(git ls-files "$dir" 2>/dev/null | xargs grep -l "$pattern" 2>/dev/null || true)
    
    if [ -n "$matches" ]; then
      echo "❌ Found direct execution calls in:"
      echo "$matches"
      EXIT_CODE=1
    fi
  done
done

# Also check for .cursorrules violations
if grep -q "python3.*systems/doe-engine/execution" .cursorrules 2>/dev/null; then
  echo "❌ Found direct execution pattern in .cursorrules"
  EXIT_CODE=1
fi

if [ $EXIT_CODE -eq 0 ]; then
  echo "✅ No direct execution violations found"
else
  echo ""
  echo "⚠️  Direct execution script calls should use: node ./cursor/start-task.js"
  echo "   See .cursorrules section XVII for details"
fi

exit $EXIT_CODE
