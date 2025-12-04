#!/bin/bash
# One-command script to update status and open dashboard
# Usage: ./update_and_open.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

echo "🔄 Updating context status..."
python3 automation-system/context_manager.py update-json

echo "✅ Status updated!"
echo "🌐 Opening dashboard..."

# Open dashboard in default browser
open automation-system/context_dashboard.html

