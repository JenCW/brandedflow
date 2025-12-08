# Foundational Document Updates

## The Problem You Identified

**You're absolutely right:**
- ✅ When decisions are made, foundational docs should be updated
- ✅ Operating manual needs updates
- ✅ Master guide needs updates
- ✅ CONTEXT.md needs updates
- ✅ DECISIONS_LOG.md needs updates

**We need:**
- ✅ Automatic detection when decisions affect foundational docs
- ✅ Proposed updates shown on dashboard
- ✅ You approve and apply updates
- ✅ Docs stay current

---

## Foundational Document Updater

### What It Does

**When decisions are made:**
1. **Analyzes decisions** - Checks if they affect foundational docs
2. **Identifies affected docs** - Finds which docs need updates
3. **Proposes updates** - Generates proposed content
4. **Shows on dashboard** - Displays pending updates

**You:**
- Review proposed updates
- Approve and apply
- Docs stay current

---

## Foundational Documents

### Documents That Get Updated

1. **`docs/internal/CONTEXT.md`**
   - Project context and current state
   - Updated when decisions affect context/status

2. **`docs/internal/DECISIONS_LOG.md`**
   - Log of all major decisions
   - Updated when new decisions are made

3. **`docs/processes/BRANDED_FLOW_OPERATIONS_MANUAL (2).md`**
   - Branded Flow operations manual
   - Updated when decisions affect processes/workflows

4. **`MASTER_RULES.md`**
   - Master rules document
   - Updated when decisions affect rules/policies

5. **`docs/internal/AI_RULES.md`**
   - AI rules and guidelines
   - Updated when decisions affect AI/automation

6. **`systems/doe-engine/gemini.md`**
   - DOE engine documentation
   - Updated when decisions affect DOE method

---

## How It Works

### Detection

**When a decision is made:**
- System analyzes decision text
- Checks for trigger words:
  - "context", "status" → CONTEXT.md
  - "decision" → DECISIONS_LOG.md
  - "process", "workflow" → Operations Manual
  - "rule", "policy" → MASTER_RULES.md
  - "ai", "automation" → AI_RULES.md
  - "doe", "directive" → DOE docs

**If triggers found:**
- Document flagged for update
- Proposed update generated
- Shown on dashboard

### Update Generation

**For each affected doc:**
- Reads current content
- Generates proposed update
- Adds decision to appropriate section
- Preserves existing content

**Example:**
```
Decision: "We will use client profiles for all proposals"
→ Affects: Operations Manual, CONTEXT.md
→ Proposed: Add decision to "Recent Updates" section
```

---

## Dashboard Display

### What You'll See

**Foundational Docs section:**
- Documents that need updates
- Decision that triggered the update
- Reason why update is needed

**Example:**
```
Foundational Docs (Need Updates)
───────────────────────────────
CONTEXT.md
Decision: Use client profiles for proposals
Reason: Decision mentions 'context' - affects Project context
```

### What You Do

**When ready:**
1. Review proposed updates
2. Approve if correct
3. System applies update
4. Document updated ✅

---

## Your Workflow

### Daily

**Morning:**
1. Double-click Dashboard.app
2. See foundational doc updates (if any)
3. Review proposed updates
4. Approve and apply

**During Day:**
- System automatically:
  - Detects when decisions affect docs
  - Proposes updates
  - Shows on dashboard

**Evening:**
- Review any remaining updates
- Approve and apply
- Docs stay current

---

## Example

### Scenario: Decision Made

**Decision:**
```
"We will use client profiles for all proposals"
```

**System detects:**
- Affects: Operations Manual (mentions "process")
- Affects: CONTEXT.md (affects current state)

**System proposes:**
- Add to Operations Manual "Recent Updates"
- Add to CONTEXT.md "Recent Decisions"

**Dashboard shows:**
- Both docs flagged for update
- You review and approve
- Docs updated ✅

---

## Summary

### The System Does

- ✅ Detects when decisions affect foundational docs
- ✅ Proposes updates automatically
- ✅ Shows on dashboard for approval
- ✅ Keeps docs current

### Your Responsibility

- ✅ Review proposed updates
- ✅ Approve if correct
- ✅ Docs stay up to date

**Your foundational documents will always reflect current decisions!**

---

**Last Updated:** December 8, 2024
**Status:** Active - Foundational Doc Updater Implemented

