# BRANDED + FLOW - QUICK REFERENCE (REFERENCE ONLY)
**Status:** REFERENCE DOCUMENT — NOT ENFORCEMENT
**Note:** Enforcement rules are in `.cursorrules` and `systems/doe-engine/ACTIVE_DIRECTIVE.md`

---

## 🎯 DOE METHOD (3-Question Test)
Before any task, ask:
1. Will this be done again? (Recurring)
2. Is this complex? (Multiple steps, integrations)
3. Does consistency matter? (Same quality every time)

**2+ Yes = Use DOE** → Check `systems/doe-engine/directives/{task-name}.md`
**0-1 Yes = Skip DOE** → Do it directly

---

## 📁 FOLDER STRUCTURE
**Only 6 root folders:**
- `clients/` - Client work
- `company/` - Company operations
- `docs/` - Documentation
- `automations/` - Reusable automation
- `systems/` - Operational systems
- `templates/` - Templates

**Pattern:** Only 6 root folders. Use lowercase-kebab-case.

---

## 📝 NAMING
- Files: `lowercase-kebab-case.md`
- Folders: `lowercase-kebab-case/`
- NO spaces, NO underscores, NO CAPS

---

## 🔄 AFTER CREATING
**ALWAYS update:**
- `docs/internal/CONTEXT.md` (if affects priorities)
- `docs/internal/DECISIONS_LOG.md` (if significant decision)
- Git commit with clear message

---

## 📖 FULL RULES
See `MASTER_RULES.md` for complete rules.

**When in doubt, ASK THE USER before creating files/folders.**
