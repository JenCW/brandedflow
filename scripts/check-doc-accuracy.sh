#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Checking documentation accuracy (no dead-path guidance)..."

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Files we consider "live guidance" (must not contain dead-path references).
# - docs/reference and docs/archive are allowed to contain legacy references by design.
LIVE_FILES="$(git ls-files \
  | grep -E '^(project_config\.md|workflow_state\.md|docs/(internal|processes|training)/|company/operations/)' \
  | grep -vE '^docs/(archive|reference)/' \
  || true)"

if [[ -z "$LIVE_FILES" ]]; then
  echo "⚠️ No live guidance files found to check."
  exit 0
fi

# Patterns that indicate outdated guidance. These should not appear in live guidance.
PATTERNS=(
  "docs/CONTEXT\\.md"
  "docs/CLIENT_STATUS\\.md"
  "docs/TECH_STACK\\.md"
  "docs/QUICK_STARTS\\.md"
  "docs/AI_WORKFLOW_GUIDE\\.md"
  "docs/OPERATIONS_MANUAL\\.md"
  "docs/DECISIONS_LOG\\.md"
  "systems/daily-accountability"
  "clients/\\{client-name\\}/website"
)

EXIT_CODE=0

for pattern in "${PATTERNS[@]}"; do
  matches="$(echo "$LIVE_FILES" | xargs grep -nH "$pattern" 2>/dev/null || true)"
  # Allow historical mention of removed systems if explicitly marked as deleted/removed.
  if [[ "$pattern" == "systems/daily-accountability" && -n "$matches" ]]; then
    matches="$(echo "$matches" | grep -viE 'deleted|removed|no longer exist' || true)"
  fi
  if [[ -n "$matches" ]]; then
    echo "❌ Found dead-path guidance pattern: $pattern"
    echo "$matches"
    EXIT_CODE=1
  fi
done

if [[ "$EXIT_CODE" -eq 0 ]]; then
  echo "✅ Documentation accuracy check passed"
else
  echo ""
  echo "Fix: update the doc links/paths or move legacy content into docs/reference/ or docs/archive/."
fi

exit "$EXIT_CODE"

