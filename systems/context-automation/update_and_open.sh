#!/bin/bash
# One-command script to update status and open dashboard
# Usage: ./update_and_open.sh

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

cd "$PROJECT_ROOT"

echo "🔄 Updating context status..."
python3 systems/context-automation/context_manager.py update-json

echo "✅ Status updated!"
echo "🌐 Opening dashboard..."

# Open dashboard in default browser
open systems/context-automation/context_dashboard.html

