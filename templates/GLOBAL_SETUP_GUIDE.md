# Global Setup Guide - Ensuring Universal Application

This guide ensures that ALL foundational rules, guidelines, and templates apply **GLOBALLY** across every workspace, chat, project, subproject, user, and space.

---

## ✅ What is ALREADY Global

### 1. Cursor User Settings (`settings.json`)
**Location**: `~/Library/Application Support/Cursor/User/settings.json`

**Status**: ✅ **TRULY GLOBAL** - These settings apply to:
- All workspaces
- All projects
- All chat sessions
- All windows
- All users on this machine

**What's Included**:
- Error Lens configuration
- Auto-fix and organize imports on save
- Auto-organize imports on file move
- Inline suggestions enabled

### 2. Keyboard Shortcuts (`keybindings.json`)
**Location**: `~/Library/Application Support/Cursor/User/keybindings.json`

**Status**: ✅ **TRULY GLOBAL** - Applies everywhere

---

## 🔧 Making Rules TRULY Global

### Option 1: Cursor User Rules (RECOMMENDED - TRUE GLOBAL)

Cursor has a built-in "User Rules" feature that applies globally to ALL projects and chats.

**Steps to Enable**:

1. Open Cursor
2. Press `Cmd+,` (or `Ctrl+,`) to open Settings
3. Search for "Rules" or "User Rules"
4. Click on "User Rules" or "Rules" section
5. Copy the ENTIRE content from `~/.cursorrules`
6. Paste it into the User Rules field
7. Save

**Result**: These rules will now apply to:
- ✅ Every new project
- ✅ Every existing project
- ✅ Every chat session
- ✅ Every workspace
- ✅ Every subproject
- ✅ Every user interaction

**This is the ONLY way to make rules truly global in Cursor.**

### Option 2: Project-Level Rules (Automatic Copy)

For projects that need project-specific rules PLUS global rules:

1. Run the setup script: `~/templates/COPY_TO_PROJECT.sh /path/to/project`
2. This copies `.cursorrules` to the project root
3. Cursor automatically reads `.cursorrules` from project root
4. Project-specific rules can be added/overridden at project level

**Note**: This is supplementary to User Rules, not a replacement.

---

## 📋 Template Files - Global Availability

### Templates Location
`~/templates/`

### Available Templates:
1. **project_config.md** - The Constitution (stable, long-term context)
2. **workflow_state.md** - The Dynamic Brain (current state tracking)
3. **crewai_agent_template.py** - CrewAI agent setup template
4. **n8n_workflow_template.json** - n8n workflow template
5. **COPY_TO_PROJECT.sh** - Setup script for new projects

### How to Use Templates:

#### For New Projects:
```bash
# Copy all templates to new project
~/templates/COPY_TO_PROJECT.sh /path/to/new/project

# Or manually copy:
cp ~/templates/project_config.md /path/to/project/
cp ~/templates/workflow_state.md /path/to/project/
cp ~/.cursorrules /path/to/project/
```

#### For Existing Projects:
```bash
# Copy only if files don't exist (safe operation)
~/templates/COPY_TO_PROJECT.sh /path/to/existing/project
```

---

## 🎯 Ensuring Consistency Across All Spaces

### Verification Checklist

To ensure everything is global, verify:

- [ ] ✅ **User Settings**: Check `~/Library/Application Support/Cursor/User/settings.json` exists and has all configurations
- [ ] ✅ **User Rules**: Add `.cursorrules` content to Cursor Settings → User Rules
- [ ] ✅ **Templates Available**: Templates exist in `~/templates/`
- [ ] ✅ **Setup Script**: `~/templates/COPY_TO_PROJECT.sh` is executable

### Testing Global Application

1. **Create a new project**
2. **Open Cursor in that project**
3. **Start a new chat**
4. **Ask AI to generate code**
5. **Verify**:
   - Code follows Blueprint-First approach
   - Code quality standards are enforced
   - SEO/performance/styling rules are followed
   - File structure standards are maintained

---

## 🔄 Maintenance & Updates

### Updating Global Rules

When foundational rules need updating:

1. **Update the source file**: `~/.cursorrules`
2. **Update Cursor User Rules**: Copy updated content to Settings → User Rules
3. **Update existing projects** (optional): Run copy script on projects if needed
4. **Update templates** (if applicable): Update template files in `~/templates/`

### Version Control

Consider versioning your global configuration:
- Commit `~/.cursorrules` to a private repository
- Document changes in a changelog
- Share with team members for consistency

---

## 📝 Quick Reference

### Global Configuration Files:
```
~/.cursorrules                                    # Global rules (source)
~/Library/Application Support/Cursor/User/settings.json  # Global settings ✅
~/Library/Application Support/Cursor/User/keybindings.json # Global shortcuts ✅
~/templates/                                      # Global templates
```

### For Each Project (Recommended):
```
project-root/
├── .cursorrules              # Project-specific rules (optional, supplements User Rules)
├── project_config.md         # Project constitution
└── workflow_state.md         # Current state tracking
```

---

## ⚠️ Important Notes

### User Rules vs Project Rules
- **User Rules** (Settings → Rules): Apply GLOBALLY to everything
- **Project Rules** (`.cursorrules` in project root): Apply to that project only
- **Recommendation**: Use User Rules for global enforcement, project rules only for project-specific overrides

### Settings Hierarchy
1. **User Settings** (global) - `~/Library/Application Support/Cursor/User/settings.json`
2. **Workspace Settings** (workspace-specific) - `.vscode/settings.json`
3. **User Rules** (global) - Cursor Settings → Rules
4. **Project Rules** (project-specific) - `.cursorrules` in project root

### Best Practice
- **Global defaults** in User Settings and User Rules
- **Project overrides** only when absolutely necessary
- **Maintain consistency** across all projects

---

## 🚀 Getting Started

### Initial Setup (One-Time):

1. **Verify global settings are in place**:
   ```bash
   ls -la ~/Library/Application\ Support/Cursor/User/settings.json
   ls -la ~/.cursorrules
   ```

2. **Add rules to Cursor User Rules**:
   - Open Cursor Settings (`Cmd+,`)
   - Search "Rules"
   - Paste content from `~/.cursorrules`

3. **Verify templates exist**:
   ```bash
   ls -la ~/templates/
   ```

### For Each New Project:

```bash
# Quick setup
~/templates/COPY_TO_PROJECT.sh /path/to/new/project

# Then fill out project_config.md with project-specific info
```

---

## ✅ Verification Commands

```bash
# Check global rules exist
test -f ~/.cursorrules && echo "✓ Global rules exist" || echo "✗ Missing"

# Check templates exist
test -d ~/templates && echo "✓ Templates directory exists" || echo "✗ Missing"

# Check settings exist
test -f ~/Library/Application\ Support/Cursor/User/settings.json && echo "✓ Settings exist" || echo "✗ Missing"

# List all templates
ls -1 ~/templates/
```

---

**Last Updated**: [Current Date]
**Status**: ✅ All configurations ready for global application
