#!/bin/bash
# Auto-setup script for new projects
# Run this when you start a new project

PROJECT_PATH="${1:-$(pwd)}"

echo "Setting up global rules and templates for project..."
echo "Project path: $PROJECT_PATH"
echo ""

# Copy .cursorrules if it doesn't exist
if [ ! -f "$PROJECT_PATH/.cursorrules" ]; then
    cp ~/.cursorrules "$PROJECT_PATH/.cursorrules"
    echo "✅ Copied .cursorrules"
else
    echo "⚠️  .cursorrules already exists (keeping existing)"
fi

# Copy project_config.md template if it doesn't exist
if [ ! -f "$PROJECT_PATH/project_config.md" ]; then
    cp ~/templates/project_config.md "$PROJECT_PATH/project_config.md"
    echo "✅ Copied project_config.md template"
    echo "   → Fill this out with project-specific info"
else
    echo "⚠️  project_config.md already exists"
fi

# Copy workflow_state.md template if it doesn't exist
if [ ! -f "$PROJECT_PATH/workflow_state.md" ]; then
    cp ~/templates/workflow_state.md "$PROJECT_PATH/workflow_state.md"
    echo "✅ Copied workflow_state.md template"
else
    echo "⚠️  workflow_state.md already exists"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Fill out project_config.md with project details"
echo "2. Cursor will automatically read .cursorrules from this directory"
echo "3. Update workflow_state.md as you work"
