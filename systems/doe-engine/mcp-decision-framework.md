# MCP Decision Framework

**When should I create an MCP for a task?**

Use this framework every time you need to decide whether to create an MCP.

## The 4 Questions

Before creating an MCP, ask:

1. **Is this task recurring?** 
   - Will this be done 2+ times?
   - Is this part of a standard workflow?
   - ✅ Example: "Create client folder" (done for every client)
   - ❌ Example: "Fix typo in one file" (one-time)

2. **Is this task deterministic?**
   - Same inputs = same outputs every time?
   - No randomness or guessing involved?
   - ✅ Example: "Copy template files" (always same result)
   - ❌ Example: "Write creative content" (varies each time)

3. **Would an MCP make this more reliable?**
   - Reduces chance of errors?
   - Ensures consistency?
   - Prevents forgetting steps?
   - ✅ Example: "Create folder structure" (easy to forget a folder)
   - ❌ Example: "Read a file" (simple, hard to mess up)

4. **Is this task complex enough?**
   - Multiple steps involved?
   - File operations, API calls, data processing?
   - Worth the overhead of creating an MCP?
   - ✅ Example: "Extract info from multiple files" (multiple steps)
   - ❌ Example: "Delete one file" (too simple)

## Decision Matrix

| Answers | Action |
|---------|--------|
| **3-4 "Yes"** | ✅ **Create MCP automatically** |
| **2 "Yes"** | ⚠️ **Ask user first** |
| **0-1 "Yes"** | ❌ **Don't create MCP, do it manually** |

## Examples

### ✅ Create MCP Automatically

**Task:** "Create client folder structure"
- Recurring? ✅ (done for every client)
- Deterministic? ✅ (same structure every time)
- More reliable? ✅ (prevents missing folders)
- Complex enough? ✅ (multiple folders to create)
**Decision:** Create MCP automatically

**Task:** "Copy website template"
- Recurring? ✅ (done for every website)
- Deterministic? ✅ (same copy operation)
- More reliable? ✅ (ensures all files copied)
- Complex enough? ✅ (multiple files, validation)
**Decision:** Create MCP automatically

### ⚠️ Ask User First

**Task:** "Generate PDF lead magnet"
- Recurring? ✅ (might be done multiple times)
- Deterministic? ⚠️ (depends on content quality)
- More reliable? ✅ (ensures consistent format)
- Complex enough? ✅ (PDF generation, formatting)
**Decision:** Ask user first (2 "Yes" answers)

**Task:** "Update documentation"
- Recurring? ✅ (done regularly)
- Deterministic? ⚠️ (content varies)
- More reliable? ✅ (ensures format consistency)
- Complex enough? ❌ (might be simple edits)
**Decision:** Ask user first

### ❌ Don't Create MCP

**Task:** "Fix typo in index.html"
- Recurring? ❌ (one-time fix)
- Deterministic? ✅ (but too simple)
- More reliable? ❌ (simple edit, no need)
- Complex enough? ❌ (single character change)
**Decision:** Just do it manually

**Task:** "Answer a question"
- Recurring? ❌ (each question is different)
- Deterministic? ❌ (answers vary)
- More reliable? ❌ (not applicable)
- Complex enough? ❌ (not a task)
**Decision:** Just answer, no MCP

## When You Create an MCP

1. **Create the file** in `systems/mcp-server/automations/{task-name}.js`
2. **Test it** (use dryRun first, then real test)
3. **Update the directive** to reference the new MCP
4. **Document it** in the directive's "Execution Scripts" section

## Quick Reference

**Create MCP if:**
- ✅ Task is recurring (2+ times)
- ✅ Task is deterministic (same result)
- ✅ MCP improves reliability
- ✅ Task is complex enough

**Ask user if:**
- ⚠️ 2 out of 4 are "Yes"

**Don't create MCP if:**
- ❌ 0-1 out of 4 are "Yes"
- ❌ Task is one-off
- ❌ Task is too simple
- ❌ Task is exploratory/creative

