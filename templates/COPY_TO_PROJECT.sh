#!/bin/bash
# Script to copy global templates and rules to new project
# Usage: ./COPY_TO_PROJECT.sh /path/to/project

PROJECT_PATH="${1:-$(pwd)}"
TEMPLATES_DIR="$HOME/templates"

if [ ! -d "$PROJECT_PATH" ]; then
    echo "Error: Project path does not exist: $PROJECT_PATH"
    exit 1
fi

echo "Copying global templates and rules to: $PROJECT_PATH"

# Copy .cursorrules (global rules)
if [ -f "$HOME/.cursorrules" ]; then
    cp "$HOME/.cursorrules" "$PROJECT_PATH/.cursorrules"
    echo "✓ Copied .cursorrules"
else
    echo "✗ .cursorrules not found in home directory"
fi

# Copy project_config.md template if it doesn't exist
if [ ! -f "$PROJECT_PATH/project_config.md" ]; then
    cp "$TEMPLATES_DIR/project_config.md" "$PROJECT_PATH/project_config.md"
    echo "✓ Copied project_config.md template"
else
    echo "⚠ project_config.md already exists (skipped)"
fi

# Copy workflow_state.md template if it doesn't exist
if [ ! -f "$PROJECT_PATH/workflow_state.md" ]; then
    cp "$TEMPLATES_DIR/workflow_state.md" "$PROJECT_PATH/workflow_state.md"
    echo "✓ Copied workflow_state.md template"
else
    echo "⚠ workflow_state.md already exists (skipped)"
fi

echo ""
echo "Setup complete! Don't forget to:"
echo "1. Fill out project_config.md with project-specific information"
echo "2. Update workflow_state.md as you work"
echo "3. Add .cursorrules content to Cursor User Rules for global enforcement"
