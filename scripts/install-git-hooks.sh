#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
HOOKS_DIR="$REPO_ROOT/.git/hooks"

if [[ ! -d "$HOOKS_DIR" ]]; then
  echo "❌ .git/hooks not found. Are you in a git repo?"
  exit 1
fi

cat > "$HOOKS_DIR/pre-commit" <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

chmod +x scripts/check-no-direct-exec.sh scripts/check-repo-hygiene.sh

scripts/check-no-direct-exec.sh
scripts/check-repo-hygiene.sh
EOF

chmod +x "$HOOKS_DIR/pre-commit"

echo "✅ Installed pre-commit hook:"
echo "   - blocks direct execution bypass"
echo "   - blocks unexpected root folders"
echo "   - enforces single sources of truth for root docs"

