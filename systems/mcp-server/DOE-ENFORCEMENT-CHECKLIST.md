# 🚨 MANDATORY DOE ENFORCEMENT CHECKLIST 🚨

## BEFORE ANY WORK - COMPLETE THIS CHECKLIST

### Step 1: Directive Check (MANDATORY)
- [ ] Called `enforce-directive-check-strict.js` with task description
- [ ] Searched `systems/doe-engine/directives/` using `list_dir` or `glob_file_search`
- [ ] Reported EXACT result: "DIRECTIVE FOUND: [filename]" OR "NO DIRECTIVE FOUND"
- [ ] If directive found: Read the directive fully
- [ ] If no directive: Determined if one should be created (recurring? complex? consistency matters?)

### Step 2: Directive Creation (if needed)
- [ ] If task is recurring/complex: Created directive using `.template.md`
- [ ] Got user approval for directive creation
- [ ] Saved directive to `systems/doe-engine/directives/`

### Step 3: Blueprint Creation (if coding work)
- [ ] Created detailed blueprint with:
  - [ ] Objectives (clear goals)
  - [ ] Proposed Changes (specific files/modifications)
  - [ ] Logic/Edge Cases (all scenarios)
  - [ ] FE/BE Separation
  - [ ] Dependencies
- [ ] Presented blueprint to user
- [ ] WAITED for explicit approval
- [ ] Got user confirmation: "approved" or "proceed"

### Step 4: Execution (only after all above)
- [ ] All checks passed
- [ ] Directive read and understood (if exists)
- [ ] Blueprint approved (if coding work)
- [ ] Now proceeding to implementation

---

## VIOLATION LOG

If you skip any step above, you are in VIOLATION. Log it here:

**Date**: [timestamp]
**Violation**: [what was skipped]
**Task**: [what task was being worked on]
**Correction**: [what should have been done]

---

## HOW TO USE THIS CHECKLIST

1. **Copy this checklist** at the start of EVERY conversation
2. **Check off each item** as you complete it
3. **Do NOT proceed** until all items are checked
4. **If you skip a step**: You are in violation - stop and correct immediately

---

**This checklist is NON-NEGOTIABLE. No exceptions.**
