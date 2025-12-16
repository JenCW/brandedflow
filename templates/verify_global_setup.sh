#!/bin/bash
# Verification script to ensure global setup is complete

echo "=========================================="
echo "Global Setup Verification"
echo "=========================================="
echo ""

ERRORS=0

# Check global rules
echo -n "Checking .cursorrules... "
if [ -f "$HOME/.cursorrules" ]; then
    LINES=$(wc -l < "$HOME/.cursorrules")
    echo "✓ EXISTS ($LINES lines)"
else
    echo "✗ MISSING"
    ERRORS=$((ERRORS + 1))
fi

# Check settings.json
echo -n "Checking settings.json... "
if [ -f "$HOME/Library/Application Support/Cursor/User/settings.json" ]; then
    echo "✓ EXISTS"
else
    echo "✗ MISSING"
    ERRORS=$((ERRORS + 1))
fi

# Check keybindings.json
echo -n "Checking keybindings.json... "
if [ -f "$HOME/Library/Application Support/Cursor/User/keybindings.json" ]; then
    echo "✓ EXISTS"
else
    echo "✗ MISSING"
    ERRORS=$((ERRORS + 1))
fi

# Check templates directory
echo -n "Checking templates directory... "
if [ -d "$HOME/templates" ]; then
    COUNT=$(ls -1 "$HOME/templates" | wc -l)
    echo "✓ EXISTS ($COUNT files)"
    
    # Check specific templates
    for FILE in project_config.md workflow_state.md crewai_agent_template.py n8n_workflow_template.json; do
        if [ -f "$HOME/templates/$FILE" ]; then
            echo "  ✓ $FILE"
        else
            echo "  ✗ $FILE MISSING"
            ERRORS=$((ERRORS + 1))
        fi
    done
else
    echo "✗ MISSING"
    ERRORS=$((ERRORS + 1))
fi

# Check setup script
echo -n "Checking COPY_TO_PROJECT.sh... "
if [ -f "$HOME/templates/COPY_TO_PROJECT.sh" ] && [ -x "$HOME/templates/COPY_TO_PROJECT.sh" ]; then
    echo "✓ EXISTS and executable"
else
    echo "✗ MISSING or not executable"
    ERRORS=$((ERRORS + 1))
fi

echo ""
echo "=========================================="
if [ $ERRORS -eq 0 ]; then
    echo "✅ All global configurations are in place!"
    echo ""
    echo "NEXT STEP: Add .cursorrules content to Cursor User Rules"
    echo "1. Open Cursor Settings (Cmd+,)"
    echo "2. Search for 'Rules' or 'User Rules'"
    echo "3. Paste content from ~/.cursorrules"
    echo "4. Save"
else
    echo "✗ Found $ERRORS issue(s) - please fix before proceeding"
fi
echo "=========================================="
