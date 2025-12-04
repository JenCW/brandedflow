#!/bin/bash
# Quick script to show checklist prompts
# Usage: ./prompt_checklist.sh <change_type>

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT"

if [ -z "$1" ]; then
    echo "📋 Available checklist prompts:"
    echo ""
    echo "  client_won       - When you win a new client"
    echo "  client_lost      - When you lose a client"
    echo "  service_added    - When you add/change a service"
    echo "  decision_made    - When you make a major decision"
    echo "  priority_changed - When priorities change"
    echo "  tool_added       - When you add a new tool"
    echo "  mcp_built        - When you build an MCP/automation"
    echo "  tech_changed     - When tech stack changes"
    echo ""
    echo "Usage: ./prompt_checklist.sh <change_type>"
    echo "Example: ./prompt_checklist.sh client_won"
    exit 1
fi

python3 automation-system/context_manager.py prompt "$1"

