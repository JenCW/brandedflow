# Self-Annealing Process Guide

## Overview

**Self-annealing** = When something breaks or a variation is encountered, the system fixes itself and gets stronger.

**Principle:** Errors are learning opportunities. Each fix makes the system more reliable.

---

## When to Self-Anneal

### 1. When an Error Occurs
- MCP fails to execute
- Directive doesn't handle a case
- Process breaks or produces wrong output
- Integration fails (API, service, etc.)

### 2. When a Variation is Encountered
- Client uses different tool than expected
- Process needs to adapt to new requirement
- Edge case not covered in directive
- Better approach discovered

---

## The Self-Annealing Loop

### Step 1: Identify the Problem
- **What broke?** (MCP, directive, process)
- **Why did it break?** (Error message, edge case, variation)
- **What should have happened?** (Expected behavior)

### Step 2: Fix the Execution Layer (MCP/Script)
1. **Locate the MCP/script** that failed
2. **Fix the code** to handle the error/variation
3. **Test the fix** (ask before using paid APIs)
4. **Verify it works** for the specific case

**Example:**
```
Error: MCP fails when client uses Wix instead of static HTML
Fix: Update MCP to check client profile for website type
Test: Run MCP with Wix client profile
Result: MCP now handles Wix correctly
```

### Step 3: Update the Directive
1. **Read the directive** fully
2. **Update the relevant section:**
   - **Edge Cases:** Add the new variation/error
   - **Process:** Update steps if process changed
   - **Execution Scripts:** Note which MCP handles it
   - **Learnings:** Document what was learned

**Example:**
```
Directive: build-client-website.md
Update Edge Cases section:
- "Client uses Wix: Check profile, use Wix setup MCP instead of static HTML"
Update Learnings:
- "Always check client profile for website type before building"
```

### Step 4: Document the Learning
1. **Update directive's "LEARNINGS" section** (Section 7)
2. **Add to general learnings** if applicable to all directives
3. **Update client profile** if variation is client-specific

**Example:**
```
## 7. LEARNINGS & PROFILE UPDATES

### After Completing:
- Always check client profile for website type (Wix, WordPress, static HTML)
- Profile variations are now automatically handled by MCPs

### General Learnings:
- Client profile system prevents repeated detection of variations
- MCPs adapt based on profile, maintaining reliability
```

### Step 5: System is Now Stronger
- **MCP handles the case** (execution layer fixed)
- **Directive documents it** (knowledge preserved)
- **Next time:** Process works automatically
- **System improved:** More reliable, handles more cases

---

## Examples

### Example 1: MCP Error

**Problem:**
```
Error: create-client-folder MCP fails when client name has spaces
```

**Self-Anneal:**
1. **Fix MCP:** Add validation to convert spaces to hyphens
2. **Test:** Run with "test client" → creates "test-client" folder
3. **Update directive:** Add edge case: "Client names with spaces are converted to hyphens"
4. **Update learnings:** "MCP now handles spaces in client names automatically"

**Result:** System now handles spaces in client names

---

### Example 2: Variation Encountered

**Problem:**
```
Client uses HubSpot instead of Airtable (not in directive)
```

**Self-Anneal:**
1. **Adapt process:** Use HubSpot integration instead of Airtable
2. **Update client profile:** Add `tech_stack.crm: "hubspot"`
3. **Update directive:** Add edge case: "If profile shows HubSpot, use HubSpot MCP instead of Airtable"
4. **Update learnings:** "Client profile variations are automatically handled"

**Result:** Directive now handles HubSpot, system learns from variation

---

### Example 3: Better Approach Discovered

**Problem:**
```
Current process: Manual file copying
Better approach: Use MCP to copy files
```

**Self-Anneal:**
1. **Create MCP:** `copy-website-template.js` for deterministic copying
2. **Test MCP:** Verify it works correctly
3. **Update directive:** Replace manual steps with MCP call
4. **Update learnings:** "MCP-based copying is more reliable than manual"

**Result:** Process is now more reliable and consistent

---

## Rules for Self-Annealing

### ✅ DO:
- **Fix MCPs immediately** when they break
- **Update directives** with learnings (ask permission first if major change)
- **Test fixes** before marking complete
- **Document variations** in edge cases section
- **Update client profiles** when variations are client-specific

### ❌ DON'T:
- **Don't skip testing** - verify fixes work
- **Don't update directives** without understanding the full context
- **Don't create new directives** for every variation (update existing ones)
- **Don't ignore errors** - always self-anneal
- **Don't use paid APIs** for testing without asking

---

## Integration with DOE Method

### Self-Annealing is Part of DOE

**Directive** → Defines the process
**Orchestrate** → AI makes decisions, calls MCPs
**Execute** → MCPs do the work
**Self-Anneal** → System improves when errors/variations occur

### The Complete Loop

```
Task Request
    ↓
Check Directive
    ↓
Load Client Profile
    ↓
Call MCPs
    ↓
[If Error/Variation]
    ↓
Self-Anneal:
  - Fix MCP
  - Update Directive
  - Document Learning
    ↓
System Improved
    ↓
Next Time: Works Automatically
```

---

## Where Self-Annealing Happens

### 1. MCPs (Execution Layer)
- **Location:** `automations/mcps/`
- **When:** MCP fails or needs to handle new case
- **Action:** Fix MCP code, test, verify

### 2. Directives (Knowledge Layer)
- **Location:** `systems/doe-engine/directives/`
- **When:** Process needs update, variation encountered
- **Action:** Update edge cases, process, learnings sections

### 3. Client Profiles (Variation Storage)
- **Location:** `clients/{client-name}/client-profile.json`
- **When:** Client-specific variation discovered
- **Action:** Update profile, future automations use it automatically

### 4. Documentation (Knowledge Base)
- **Location:** `docs/internal/`, `MASTER_RULES.md`
- **When:** General learnings that apply to all tasks
- **Action:** Update rules, add examples, document patterns

---

## Checklist for Self-Annealing

When something breaks or a variation is encountered:

- [ ] **Identify the problem** (what broke, why)
- [ ] **Fix the MCP/script** (execution layer)
- [ ] **Test the fix** (verify it works)
- [ ] **Update the directive** (edge cases, learnings)
- [ ] **Update client profile** (if client-specific)
- [ ] **Document the learning** (for future reference)
- [ ] **Verify system improved** (next time works automatically)

---

## Logging Self-Annealing Actions

### Automatic Logging (MANDATORY)

**Every time I self-anneal, I MUST:**
1. **Call `log-self-annealing` MCP** to log the action
2. **Include all details:** What broke, how fixed, what was learned
3. **Create log file** that Daily Ops Engine can process
4. **Ensure transparency** - you see what was fixed

**The log file will:**
- Be processed by Daily Ops Engine
- Appear in your dashboard
- Show what was fixed/updated
- Track learnings over time

**See:** `self-annealing-notification.md` for full details

---

## Summary

**Self-annealing ensures:**
- ✅ Errors become learning opportunities
- ✅ System gets stronger over time
- ✅ Variations are handled automatically
- ✅ Reliability increases with each fix
- ✅ Knowledge is preserved in directives
- ✅ **All actions are logged and visible**

**The system improves itself. Each error makes it better. And you see every improvement.**

---

**Last Updated:** December 8, 2024
**Status:** Active Process

