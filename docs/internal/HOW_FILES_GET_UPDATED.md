# How and When Files Get Updated

## Current System

### Files Get Updated When I Work

**As I work in Cursor:**
1. I create new files (directives, MCPs, documentation)
2. I modify existing files (update rules, fix code, add features)
3. Files are changed on your computer immediately
4. **Non-critical files auto-committed** ✅
5. **Critical files tracked** for your approval ⏳

**This happens:**
- ✅ In real-time as I work
- ✅ Every time I create/modify a file
- ✅ Automatically (no manual step needed)

---

## The Flow

### Step-by-Step

**1. I Work (Create/Modify Files)**
```
You: "Create a new directive for proposals"
Me: Creates systems/doe-engine/directives/create-proposal.md
     → File created on your computer
     → Work logged via log-work-action MCP
```

**2. Auto-Commit Triggered**
```
log-work-action MCP runs
  → Triggers auto-commit system
  → Checks if file is critical
```

**3. File Committed (If Non-Critical)**
```
If non-critical:
  → Auto-committed immediately ✅
  → Changes saved in git
  → Done!
```

**4. File Tracked (If Critical)**
```
If critical:
  → Tracked in critical_files_pending.json
  → Shown on dashboard
  → Waiting for your approval ⏳
```

---

## When Files Get Updated

### Scenario 1: I Create a New File

**Example:**
- You ask me to create a new directive
- I create `systems/doe-engine/directives/new-directive.md`
- File created immediately
- If non-critical → Auto-committed ✅
- If critical → Shown on dashboard ⏳

**When:** Immediately as I work

### Scenario 2: I Modify an Existing File

**Example:**
- You ask me to update a rule
- I modify `MASTER_RULES.md`
- File updated immediately
- If non-critical → Auto-committed ✅
- If critical → Shown on dashboard ⏳

**When:** Immediately as I work

### Scenario 3: You Approve Critical File

**Example:**
- Critical file shown on dashboard
- You review and approve
- You commit it:
  ```javascript
  await callMCP('create-git-commit', {
    include_protected: true
  });
  ```
- File committed ✅

**When:** When you approve and commit

---

## What Does NOT Update Files

### Decisions Don't Update Files

**Decisions are:**
- Just logged decisions (informational)
- Extracted from chats/logs
- Record of what was decided

**Decisions do NOT:**
- ❌ Automatically update files
- ❌ Trigger file changes
- ❌ Mean files were changed

**Files are updated separately:**
- When I actually create/modify files
- Not based on decisions alone

### Tasks Don't Update Files

**Tasks are:**
- Things to do (todo items)
- Extracted from chats/logs

**Tasks do NOT:**
- ❌ Automatically update files
- ❌ Trigger file changes
- ❌ Mean files were changed

**Files are updated when:**
- I actually do the work
- I create/modify files to complete the task

---

## The Complete Picture

### What Updates Files

**Files get updated when:**
1. ✅ **I create new files** (as I work)
2. ✅ **I modify existing files** (as I work)
3. ✅ **You manually edit files** (if you do)
4. ✅ **Other systems update files** (if configured)

**Files do NOT get updated when:**
- ❌ Decisions are made (just logged)
- ❌ Tasks are created (just logged)
- ❌ Notes are added (just logged)

### The Relationship

**Decisions → Files:**
- Decision made → Logged
- I work on decision → Files created/modified
- Files created/modified → Auto-committed (if non-critical)

**Tasks → Files:**
- Task created → Logged
- I work on task → Files created/modified
- Files created/modified → Auto-committed (if non-critical)

---

## Example Workflow

### Scenario: You Ask Me to Create a Proposal System

**Step 1: Decision Made**
```
You: "We need a proposal system"
Decision: "Create proposal system" → Logged to decisions-log.md
```

**Step 2: I Work**
```
Me: Creates systems/doe-engine/directives/create-proposal.md
    Creates automations/mcps/create-proposal.js
    Updates docs/internal/CONTEXT.md
```

**Step 3: Files Updated**
```
Files created/modified:
  - create-proposal.md (non-critical) → Auto-committed ✅
  - create-proposal.js (non-critical) → Auto-committed ✅
  - CONTEXT.md (critical) → Shown on dashboard ⏳
```

**Step 4: You Review**
```
Dashboard shows:
  - Decision: "Create proposal system" (logged)
  - Task: "Create proposal system" (if created)
  - Critical file: CONTEXT.md (pending your approval)
```

**Step 5: You Approve**
```
You: Review CONTEXT.md
     Commit it:
     await callMCP('create-git-commit', {
       include_protected: true
     });
```

---

## Summary

### How Files Get Updated

**Files get updated:**
- ✅ When I create/modify files (as I work)
- ✅ Immediately (real-time)
- ✅ Automatically (no manual step)

**Files are committed:**
- ✅ Non-critical files → Auto-committed immediately
- ✅ Critical files → Shown on dashboard, you approve

### What Doesn't Update Files

**Decisions:**
- Just logged (informational)
- Don't update files
- Files updated separately when I work

**Tasks:**
- Just logged (todo items)
- Don't update files
- Files updated separately when I work

### The Flow

**Decision/Task → I Work → Files Updated → Auto-Committed**

**Everything happens automatically except:**
- Your approval for critical files
- That's it!

---

**Last Updated:** December 8, 2024
**Status:** Active - File Update System Explained

