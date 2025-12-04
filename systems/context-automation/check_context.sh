#!/bin/bash
# Quick script to check context file status
# Usage: ./check_context.sh

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
PYTHON_SCRIPT="$PROJECT_ROOT/systems/context-automation/context_manager.py"

echo "🔍 Checking Branded + Flow context files..."
echo ""

if [ -f "$PYTHON_SCRIPT" ]; then
    python3 "$PYTHON_SCRIPT" check
    echo ""
    python3 "$PYTHON_SCRIPT" suggest
else
    echo "❌ Context manager script not found at: $PYTHON_SCRIPT"
    exit 1
fi

