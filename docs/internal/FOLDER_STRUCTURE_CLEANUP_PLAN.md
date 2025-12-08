# Folder Structure Cleanup Plan

## Audit Results

### ✅ CORRECT Folders (Per Rules)

1. **`clients/`** ✅
   - Structure: `clients/{client-name}/01_intake/`, `02_brand/`, etc.
   - Status: **CORRECT**

2. **`company/`** ✅
   - Structure: `company/accounting/`, `brand/`, `operations/`, etc.
   - Status: **CORRECT**

3. **`docs/`** ✅
   - Structure: `docs/archive/`, `internal/`, `processes/`, `training/`
   - Status: **CORRECT**

4. **`automations/`** ✅ (Note: Rules say `automation-library/` but actual is `automations/`)
   - Structure: `automations/mcps/`, `integrations/`, `library/`, `scripts/`, `workflows/`
   - Status: **CORRECT** (but rules need updating to match reality)

5. **`systems/`** ✅
   - Structure: `systems/automation-engine/`, `dashboard/`, `doe-engine/`, `mcp-server/`, etc.
   - Status: **CORRECT**

6. **`templates/`** ❌
   - Status: **MISSING** (should exist per rules)

---

## ❌ ISSUES FOUND

### Issue 1: `_core/` Folder (Not Allowed)

**Location:** Root level
**Contents:**
- `_core/automation-guides/`
- `_core/brand/`
- `_core/tech-stack/`
- `_core/templates/`

**Problem:** Not in allowed 6 folders
**Action Required:**
- Move `_core/brand/` → Check if duplicate of `company/brand/`, merge or move
- Move `_core/templates/` → `templates/` (create if needed) or `company/templates/`
- Move `_core/tech-stack/` → `docs/` or `company/operations/`
- Move `_core/automation-guides/` → `docs/automation-library/`
- Remove `_core/` folder

---

### Issue 2: `automation-system/` Folder (Not Allowed)

**Location:** Root level
**Contents:**
- `automation-system/logs/` (evening.error.log, evening.log, morning.error.log, etc.)

**Problem:** Not in allowed 6 folders, appears to be duplicate/old
**Action Required:**
- Check if logs are important
- Move logs to `systems/logs/` if needed
- Remove `automation-system/` folder

---

### Issue 3: `mcp/` Folder (Not Allowed)

**Location:** Root level
**Contents:**
- `mcp/RULES.md`

**Problem:** Not in allowed 6 folders
**Action Required:**
- Move `mcp/RULES.md` → `systems/mcp-server/RULES.md` (if not duplicate)
- Remove `mcp/` folder

---

### Issue 4: Root Level Log Files

**Files:**
- `dailyops_error.log`
- `dailyops.log`

**Problem:** Should be in `systems/logs/`
**Action Required:**
- Move to `systems/logs/`

---

### Issue 5: Root Level Package Files

**Files:**
- `package.json`
- `package-lock.json`

**Problem:** These might be for MCP server or other system
**Action Required:**
- Check if these belong to `systems/mcp-server/` or root
- If for MCP server, move to `systems/mcp-server/`
- If for root project, keep (but document why)

---

### Issue 6: Rules Mismatch

**Issue:** Rules say `automation-library/` but actual folder is `automations/`
**Action Required:**
- Update rules to match reality (`automations/`)
- OR rename folder to match rules (`automation-library/`)

---

### Issue 7: Missing `templates/` Folder

**Status:** Folder doesn't exist
**Action Required:**
- Create `templates/` folder if needed
- OR document that templates are in `company/templates/` or `_core/templates/`

---

## Cleanup Actions

### Priority 1: Remove Invalid Folders

1. **Move `_core/` contents:**
   ```bash
   # Check for duplicates first
   # Move brand assets if not duplicate
   # Move templates
   # Move tech-stack docs
   # Move automation guides
   # Remove _core/
   ```

2. **Move `automation-system/` logs:**
   ```bash
   # Move logs to systems/logs/
   # Remove automation-system/
   ```

3. **Move `mcp/` contents:**
   ```bash
   # Move RULES.md to systems/mcp-server/
   # Remove mcp/
   ```

### Priority 2: Move Root Files

1. **Move log files:**
   ```bash
   # dailyops_error.log → systems/logs/
   # dailyops.log → systems/logs/
   ```

2. **Check package files:**
   ```bash
   # Verify package.json belongs where it is
   # Move if needed
   ```

### Priority 3: Create Missing Folders

1. **Create `templates/` if needed:**
   ```bash
   # mkdir templates/
   # OR document that templates are elsewhere
   ```

### Priority 4: Update Rules

1. **Fix rules mismatch:**
   - Update `.cursorrules` to say `automations/` instead of `automation-library/`
   - Update `MASTER_RULES.md` to say `automations/` instead of `automation-library/`

---

## Summary

### ✅ Correct
- `clients/` - Correct
- `company/` - Correct
- `docs/` - Correct
- `automations/` - Correct (but rules say automation-library/)
- `systems/` - Correct

### ❌ Issues
- `_core/` - Not allowed, needs cleanup
- `automation-system/` - Not allowed, needs cleanup
- `mcp/` - Not allowed, needs cleanup
- Root log files - Should be in systems/logs/
- Missing `templates/` - Should exist or be documented
- Rules mismatch - automations/ vs automation-library/

---

## Next Steps

**Would you like me to:**
1. Create a cleanup script to fix these issues?
2. Move files manually?
3. Just document the issues for you to fix?

**Recommendation:** Create cleanup script that:
- Moves files safely
- Checks for duplicates
- Preserves important data
- Updates rules to match reality

---

**Last Updated:** December 8, 2024
**Status:** Audit Complete - Issues Identified

