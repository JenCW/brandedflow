# Folder Structure Audit

> ⚠️ **ARCHIVED / HISTORICAL**
>
> This audit references folders and files that no longer exist (e.g. `systems/daily-accountability/`, legacy `03_website/`, etc.).
> Do **not** use this document as instructions.
>
> **Canonical structure now lives in:**
> - `project_config.md` (repo constitution)
> - `docs/internal/REPO_HYGIENE_REPORT.md` (current hygiene + drift plan)

## Expected Structure (Per Rules)

**Only 6 folders at root level:**
1. `clients/` - Client work
2. `company/` - Company operations
3. `docs/` - All documentation
4. `automations/` - Reusable automation (or `automation-library/`?)
5. `systems/` - Operational systems
6. `templates/` - Templates

**Root level files:**
- `MASTER_RULES.md` - Master rules
- `.cursorrules` - Cursor rules
- `.claude_code_rules` - Claude Code rules
- `.gitignore` - Git ignore

---

## Actual Structure Found

### Root Level Folders

**Found:**
- `clients/` ✅
- `company/` ✅
- `docs/` ✅
- `automations/` ✅ (not `automation-library/`)
- `systems/` ✅
- `_core/` ❌ (should this be here?)
- `automation-system/` ❌ (duplicate of `automations/`?)
- `mcp/` ❌ (should be in `systems/` or `automations/`?)

**Issues:**
- `_core/` - Not in the 6 allowed folders
- `automation-system/` - Appears to be duplicate/old
- `mcp/` - Should be in `systems/mcp-server/` or `automations/mcps/`

### Root Level Files

**Found:**
- `MASTER_RULES.md` ✅
- `AI_RULES.md` ✅ (should this be in `docs/internal/`?)
- `.cursorrules` ✅
- `.claude_code_rules` ✅
- `.gitignore` ✅
- `dailyops_error.log` ❌ (should be in `systems/logs/` or `automation-system/logs/`)
- `dailyops.log` ❌ (should be in `systems/logs/` or `automation-system/logs/`)

**Issues:**
- `AI_RULES.md` - Duplicate? Should be in `docs/internal/`
- Log files at root - Should be in logs directory

---

## Detailed Analysis

### `clients/` Folder ✅

**Structure:**
- `clients/{client-name}/01_intake/`
- `clients/{client-name}/02_brand/`
- `clients/{client-name}/03_website/`
- `clients/{client-name}/04_automation/`
- `clients/{client-name}/05_deliverables/`
- `clients/{client-name}/99_archive/`

**Status:** ✅ Correct structure

### `company/` Folder ✅

**Structure:**
- `company/accounting/`
- `company/brand/`
- `company/finances/`
- `company/operations/`
- `company/proposals/`
- `company/sales/`
- `company/templates/`
- `company/website/`

**Status:** ✅ Correct structure

### `docs/` Folder ✅

**Structure:**
- `docs/archive/`
- `docs/automation-library/`
- `docs/incoming/`
- `docs/internal/`
- `docs/processes/`
- `docs/training/`

**Status:** ✅ Correct structure

### `automations/` Folder ✅

**Structure:**
- `automations/integrations/`
- `automations/library/`
- `automations/mcps/` ✅ (MCPs should be here)
- `automations/scripts/`
- `automations/workflows/`

**Status:** ✅ Correct structure

### `systems/` Folder ✅

**Structure:**
- `systems/automation-engine/`
- `systems/context-automation/`
- `systems/context-engine/`
- `systems/daily-accountability/`
- `systems/dashboard/`
- `systems/doe-engine/`
- `systems/logs/`
- `systems/mcp-server/` ✅ (MCP server should be here)
- `systems/trackers/`

**Status:** ✅ Correct structure

### `templates/` Folder ❓

**Status:** Need to check if exists

### `_core/` Folder ❌

**Structure:**
- `_core/automation-guides/`
- `_core/brand/`
- `_core/tech-stack/`
- `_core/templates/`

**Issue:** Not in allowed 6 folders
**Should be:** Moved to appropriate location:
- `_core/brand/` → `company/brand/` or `docs/`
- `_core/templates/` → `templates/` or `company/templates/`
- `_core/tech-stack/` → `docs/` or `company/operations/`
- `_core/automation-guides/` → `docs/automation-library/`

### `automation-system/` Folder ❌

**Structure:**
- `automation-system/logs/`

**Issue:** Duplicate/old folder
**Should be:** Merged with `systems/automation-engine/` or removed

### `mcp/` Folder ❌

**Structure:**
- `mcp/RULES.md`

**Issue:** Should be in `systems/mcp-server/` or `automations/mcps/`
**Should be:** Moved to `systems/mcp-server/` or content moved to `automations/mcps/`

---

## File Location Issues

### Root Level Files

**Issues:**
1. `AI_RULES.md` - Duplicate of `docs/internal/AI_RULES.md`?
2. `dailyops_error.log` - Should be in `systems/logs/`
3. `dailyops.log` - Should be in `systems/logs/`

### Files in Wrong Locations

**Need to check:**
- Are there files in `_core/` that should be elsewhere?
- Are there files in `automation-system/` that should be in `systems/automation-engine/`?
- Are there files in `mcp/` that should be in `systems/mcp-server/`?

---

## Recommendations

### Immediate Actions

1. **Move `_core/` contents:**
   - `_core/brand/` → `company/brand/` (if not duplicate)
   - `_core/templates/` → `templates/` or `company/templates/`
   - `_core/tech-stack/` → `docs/` or `company/operations/`
   - `_core/automation-guides/` → `docs/automation-library/`

2. **Remove or merge `automation-system/`:**
   - Check if `automation-system/logs/` has important logs
   - Move to `systems/logs/` if needed
   - Remove `automation-system/` folder

3. **Move `mcp/` contents:**
   - `mcp/RULES.md` → `systems/mcp-server/RULES.md` or `automations/mcps/RULES.md`
   - Remove `mcp/` folder

4. **Move root level files:**
   - `dailyops_error.log` → `systems/logs/`
   - `dailyops.log` → `systems/logs/`
   - Check if `AI_RULES.md` is duplicate, remove if so

### Verify

- Check if `templates/` folder exists
- Verify all files are in correct locations
- Ensure no duplicates

---

## Summary

### ✅ Correct
- `clients/` - Correct
- `company/` - Correct
- `docs/` - Correct
- `automations/` - Correct
- `systems/` - Correct

### ❌ Issues Found
- `_core/` - Not allowed, needs to be moved
- `automation-system/` - Duplicate/old, needs cleanup
- `mcp/` - Should be in `systems/mcp-server/`
- Root level log files - Should be in `systems/logs/`
- `AI_RULES.md` at root - May be duplicate

---

**Next Steps:** Create cleanup script to fix these issues?

