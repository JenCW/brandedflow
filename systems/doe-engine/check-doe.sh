#!/bin/bash
# Helper script to check for DOE components before task execution
# Usage: ./check-doe.sh <task-name>

TASK_NAME="$1"

if [ -z "$TASK_NAME" ]; then
    echo "Usage: ./check-doe.sh <task-name>"
    echo "Example: ./check-doe.sh build-client-website"
    exit 1
fi

# Get the script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
DIRECTIVE_PATH="$PROJECT_ROOT/systems/doe-engine/directives/${TASK_NAME}.md"
EXECUTION_DIR="$PROJECT_ROOT/systems/doe-engine/execution/"

echo "🔍 Checking DOE components for: ${TASK_NAME}"
echo ""

if [ -f "$DIRECTIVE_PATH" ]; then
    echo "✅ Directive exists: ${DIRECTIVE_PATH}"
    echo "📄 Directive contents:"
    echo "---"
    cat "$DIRECTIVE_PATH"
    echo "---"
else
    echo "⚠️  No directive found at: ${DIRECTIVE_PATH}"
    echo "💡 Consider creating one for this task type"
fi

echo ""
echo "📁 Available execution scripts:"
if [ -d "$EXECUTION_DIR" ] && [ "$(ls -A $EXECUTION_DIR 2>/dev/null)" ]; then
    ls -la "$EXECUTION_DIR"
else
    echo "   (execution directory is empty or doesn't exist)"
fi

echo ""
echo "💡 To create a directive:"
echo "   cp $PROJECT_ROOT/systems/doe-engine/directives/.template.md $DIRECTIVE_PATH"
echo "   Then edit $DIRECTIVE_PATH with task-specific details"

