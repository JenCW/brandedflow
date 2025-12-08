# Folder Structure Issues - Summary

## ✅ CORRECT (Per Rules)

1. **`clients/`** ✅ - Correct structure
2. **`company/`** ✅ - Correct structure  
3. **`docs/`** ✅ - Correct structure
4. **`automations/`** ✅ - Correct structure (but rules say `automation-library/`)
5. **`systems/`** ✅ - Correct structure

---

## ❌ ISSUES FOUND

### Issue 1: `_core/` Folder (Not Allowed)

**Problem:** Not in allowed 6 folders at root level

**Contents:**
- `_core/automation-guides/` → Should go to `docs/automation-library/`
- `_core/brand/` → Check if duplicate of `company/brand/`, merge or move
- `_core/tech-stack/` → Should go to `docs/` or `company/operations/`
- `_core/templates/` → Should go to `templates/` (create) or `company/templates/`

**Action:** Move contents, then remove `_core/`

---

### Issue 2: `automation-system/` Folder (Not Allowed)

**Problem:** Not in allowed 6 folders, appears duplicate/old

**Contents:**
- `automation-system/logs/` (6 log files)

**Action:** 
- Move logs to `systems/logs/` (check for duplicates)
- Remove `automation-system/` folder

---

### Issue 3: `mcp/` Folder (Not Allowed)

**Problem:** Not in allowed 6 folders

**Contents:**
- `mcp/RULES.md` (1 file)

**Action:**
- Move `mcp/RULES.md` → `systems/mcp-server/RULES.md` (if not duplicate)
- Remove `mcp/` folder

---

### Issue 4: Root Level Log Files

**Files:**
- `dailyops_error.log`
- `dailyops.log`

**Problem:** Should be in `systems/logs/`

**Action:** Move to `systems/logs/`

---

### Issue 5: Missing `templates/` Folder

**Problem:** Rules say it should exist, but it doesn't

**Options:**
- Create `templates/` folder
- OR document that templates are in `company/templates/` or `_core/templates/`

**Action:** Create folder or update rules

---

### Issue 6: Rules Mismatch

**Problem:** Rules say `automation-library/` but actual folder is `automations/`

**Action:** Update rules to match reality (`automations/`)

---

### Issue 7: Root `package.json`

**Status:** ✅ OK - This is for the project root (has fs-extra dependency)
**Note:** MCP server has its own `package.json` in `systems/mcp-server/`

---

## Files in Correct Locations ✅

### `clients/` ✅
- All client folders follow correct structure
- `01_intake/`, `02_brand/`, `03_website/`, `04_automation/`, `05_deliverables/`, `99_archive/`

### `company/` ✅
- All subfolders correct
- `accounting/`, `brand/`, `operations/`, `sales/`, `templates/`, `website/`

### `docs/` ✅
- All subfolders correct
- `archive/`, `automation-library/`, `internal/`, `processes/`, `training/`

### `automations/` ✅
- All subfolders correct
- `mcps/` (MCPs are here - correct!)
- `integrations/`, `library/`, `scripts/`, `workflows/`

### `systems/` ✅
- All subfolders correct
- `automation-engine/`, `dashboard/`, `doe-engine/`, `mcp-server/`, `trackers/`

---

## Summary

### ✅ Correct (5/6 folders)
- `clients/` ✅
- `company/` ✅
- `docs/` ✅
- `automations/` ✅
- `systems/` ✅

### ❌ Issues (3 invalid folders + 1 missing)
- `_core/` ❌ (not allowed)
- `automation-system/` ❌ (not allowed)
- `mcp/` ❌ (not allowed)
- `templates/` ❌ (missing)

### ⚠️ Minor Issues
- Root log files (should be in systems/logs/)
- Rules mismatch (automation-library/ vs automations/)

---

## Recommended Actions

1. **Move `_core/` contents** to appropriate locations
2. **Move `automation-system/` logs** to `systems/logs/`
3. **Move `mcp/RULES.md`** to `systems/mcp-server/`
4. **Move root log files** to `systems/logs/`
5. **Create `templates/`** folder or document where templates are
6. **Update rules** to say `automations/` instead of `automation-library/`
7. **Remove invalid folders** after moving contents

---

**Would you like me to create a cleanup script to fix these automatically?**

---

**Last Updated:** December 8, 2024
**Status:** Audit Complete - Issues Documented

