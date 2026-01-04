# AI Work Logging Rules (MANDATORY)

## 🚨 MANDATORY: Log All Work Actions

**When you create, update, or complete work, you MUST log it.**

---

## The Rule

**Every time you:**
- Create a directive
- Update a directive
- Create an MCP
- Update an MCP
- Make a decision
- Create a task
- Complete a task
- Create important files
- Update important files
- Do significant work

**You MUST:**
1. **Call `log-work-action` MCP** to log the work
2. **Include all details:** Decisions, tasks, files, notes
3. **Ensure visibility** - user sees what was done

---

## When to Log

### Always Log:
- ✅ Creating directives
- ✅ Updating directives
- ✅ Creating MCPs
- ✅ Updating MCPs
- ✅ Making decisions
- ✅ Creating tasks
- ✅ Completing tasks
- ✅ Creating important files (rules, docs, etc.)
- ✅ Significant updates

### Don't Log:
- ❌ Small file edits (typos, formatting)
- ❌ Reading files
- ❌ Simple searches
- ❌ Routine operations

**Rule of thumb:** If it's something the user would want to know about, log it.

---

## How to Log

### Step 1: Do the Work
- Create directive, MCP, file, etc.

### Step 2: Log the Action
Call the `log-work-action` MCP with:

```javascript
{
  "action_type": "directive_created" | "directive_updated" | "mcp_created" | "mcp_updated" | "decision" | "task_created" | "task_completed" | "file_created" | "file_updated" | "other",
  "title": "Short title of what was done",
  "details": "Detailed description",
  "files_created": ["path/to/file1.md", "path/to/file2.js"],
  "files_updated": ["path/to/file.md"],
  "decisions": ["Decision 1", "Decision 2"],
  "tasks": ["Task 1", "Task 2"],
  "notes": ["Note 1", "Note 2"],
  "context": "Additional context"
}
```

### Step 3: Verify Log Created
- Check that log file was created in `systems/trackers/work_logs/`
- Verify log file exists and contains correct information

---

## Examples

### Example 1: Creating a Directive

```javascript
// After creating build-client-website.md directive
await callMCP('log-work-action', {
  action_type: 'directive_created',
  title: 'Created build-client-website directive',
  details: 'Created comprehensive directive for building client websites with client profile integration',
  files_created: ['systems/doe-engine/directives/build-client-website.md'],
  decisions: [
    'Use client profile for all variations',
    'Check profile before building',
    'Adapt process based on profile'
  ],
  tasks: [
    'Create client profile MCP',
    'Update website template MCP',
    'Test directive with sample client'
  ],
  notes: [
    'Directive handles Wix, WordPress, and static HTML',
    'Profile variations are automatically used'
  ]
});
```

### Example 2: Creating an MCP

```javascript
// After creating create-client-folder.js MCP
await callMCP('log-work-action', {
  action_type: 'mcp_created',
  title: 'Created create-client-folder MCP',
  details: 'Created MCP to automatically create standard client folder structure',
  files_created: ['automations/mcps/create-client-folder.js'],
  decisions: [
    'Use standard folder structure: 01_intake, 02_brand, etc.',
    'Create README.txt in each folder'
  ],
  notes: [
    'MCP ensures consistency across all clients',
    'Folder structure matches established rules'
  ]
});
```

### Example 3: Making Decisions

```javascript
// After making a decision about client profile system
await callMCP('log-work-action', {
  action_type: 'decision',
  title: 'Decision: Use client profile for all variations',
  details: 'Decided to use client-profile.json to store all client variations (design, tech stack, etc.)',
  decisions: [
    'Store all variations in client-profile.json',
    'All directives check profile first',
    'Profile is single source of truth for client variations'
  ],
  files_created: ['systems/doe-engine/client-profile-system.md'],
  notes: [
    'This prevents repeated detection of variations',
    'System becomes more reliable over time'
  ]
});
```

### Example 4: Completing Tasks

```javascript
// After completing a task
await callMCP('log-work-action', {
  action_type: 'task_completed',
  title: 'Completed: Updated all directives to use client profiles',
  details: 'Updated all existing directives to check and use client profiles',
  files_updated: [
    'systems/doe-engine/directives/build-client-website.md',
    'systems/doe-engine/directives/setup-lead-magnet-automation.md',
    'systems/doe-engine/directives/setup-client-onboarding.md'
  ],
  tasks: [
    'Updated build-client-website directive',
    'Updated setup-lead-magnet-automation directive',
    'Updated setup-client-onboarding directive'
  ],
  notes: [
    'All directives now use client profile system',
    'Consistency improved across all automations'
  ]
});
```

---

## Action Types

### directive_created
- New directive was created
- Include: files_created, decisions, tasks

### directive_updated
- Existing directive was updated
- Include: files_updated, what changed, why

### mcp_created
- New MCP was created
- Include: files_created, what it does, decisions

### mcp_updated
- Existing MCP was updated
- Include: files_updated, what was fixed/improved

### decision
- A decision was made
- Include: decisions array, context, rationale

### task_created
- Tasks were created
- Include: tasks array, context

### task_completed
- Tasks were completed
- Include: tasks array, what was done

### file_created
- Important files were created
- Include: files_created, purpose

### file_updated
- Important files were updated
- Include: files_updated, what changed

### other
- Other significant work
- Include: details, context

---

## What Gets Logged

The log file will contain:
- **Timestamp** - When it happened
- **Action Type** - What kind of work
- **Title** - Short summary
- **Details** - Full description
- **Decisions** - Marked with "decision:" for extraction
- **Tasks** - Marked with "task:" for extraction
- **Notes** - Marked with "note:" for extraction
- **Files** - What was created/updated
- **Context** - Additional information

---

## Where Logs Go

**Log files:**
- Location: `systems/trackers/work_logs/`
- Format: `work-{timestamp}.txt`
- Stored for reference (not processed)

**Summary log:**
- Location: `systems/trackers/work_logs/summary.json`
- Contains: Last 200 work actions
- Format: JSON for easy reading

---

## Log Storage

**The log files:**
- Are stored in `systems/trackers/work_logs/`
- Serve as historical record
- Can be reviewed manually if needed
- Use "decision:", "task:", "note:" markers for structure
- Show what was done

**Logs contain:**
- What was created/updated
- Decisions made
- Tasks created/completed
- Files changed
- When it happened

---

## Why This Matters

**Without logging:**
- ❌ No record of what was done
- ❌ No visibility into work
- ❌ Can't track progress
- ❌ Work is not documented

**With logging:**
- ✅ Historical record of all work
- ✅ Can review what was done
- ✅ Full transparency
- ✅ Track progress over time
- ✅ Accountability for work

---

## Enforcement

**This is MANDATORY.**
- All significant work MUST be logged
- No exceptions
- Logging is part of the work process
- If you forget, log it as soon as you remember

---

**Last Updated:** December 8, 2024
**Status:** MANDATORY - Must follow for all significant work

