#!/bin/bash
# Double-click this file to run!
# Or run from Terminal: ./automation-system/run.command

cd "$(dirname "$0")/../.."

echo "🔄 Updating context status..."
python3 systems/context-automation/context_manager.py update-json

echo "✅ Status updated!"
echo "🌐 Opening dashboard..."

open systems/context-automation/context_dashboard.html

echo ""
echo "✅ Done! Dashboard should be open in your browser."
echo ""
read -p "Press Enter to close this window..."

