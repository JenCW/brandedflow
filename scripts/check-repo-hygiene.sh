#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Checking repo hygiene (structure + single sources of truth)..."

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

# Root-level folders we explicitly allow (non-dot).
ALLOWED_ROOT_DIRS=(
  "clients"
  "company"
  "docs"
  "automations"
  "systems"
  "templates"
  "cursor"
  "scripts"
)

is_allowed_dir() {
  local d="$1"
  for allowed in "${ALLOWED_ROOT_DIRS[@]}"; do
    if [[ "$d" == "$allowed" ]]; then
      return 0
    fi
  done
  return 1
}

# Fail if any unexpected non-dot folder exists at root.
while IFS= read -r -d '' dir; do
  base="$(basename "$dir")"
  # skip dot folders
  if [[ "$base" == .* ]]; then
    continue
  fi
  if ! is_allowed_dir "$base"; then
    echo "❌ Unexpected root folder: $base"
    echo "   Allowed root folders: ${ALLOWED_ROOT_DIRS[*]}"
    exit 1
  fi
done < <(find . -maxdepth 1 -type d -print0)

# Ensure only ONE live workflow_state.md exists (templates may contain template copy).
LIVE_WORKFLOW_STATE_COUNT="$(git ls-files | grep -E '^workflow_state\.md$' | wc -l | tr -d ' ')"
if [[ "$LIVE_WORKFLOW_STATE_COUNT" -ne 1 ]]; then
  echo "❌ Expected exactly 1 live workflow_state.md at repo root"
  git ls-files | grep -E 'workflow_state\.md$' || true
  exit 1
fi

# Ensure only ONE live project_config.md exists (templates may contain template copy).
LIVE_PROJECT_CONFIG_COUNT="$(git ls-files | grep -E '^project_config\.md$' | wc -l | tr -d ' ')"
if [[ "$LIVE_PROJECT_CONFIG_COUNT" -ne 1 ]]; then
  echo "❌ Expected exactly 1 live project_config.md at repo root"
  git ls-files | grep -E 'project_config\.md$' || true
  exit 1
fi

echo "✅ Repo hygiene checks passed"

