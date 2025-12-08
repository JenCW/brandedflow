# AI Self-Annealing Rules (MANDATORY)

## 🚨 MANDATORY: Log Every Self-Annealing Action

**When you self-anneal (fix errors, update directives, document learnings), you MUST log it.**

---

## The Rule

**Every time you:**
- Fix an MCP
- Update a directive
- Handle a variation
- Document a learning
- Adapt a process

**You MUST:**
1. **Call `log-self-annealing` MCP** immediately after fixing
2. **Include all details:** What broke, how fixed, what was learned
3. **Ensure transparency** - user sees what was fixed

---

## How to Log

### Step 1: Fix the Issue
- Fix the MCP, update the directive, handle the variation, etc.

### Step 2: Log the Action
Call the `log-self-annealing` MCP with:

```javascript
{
  "action_type": "error_fix" | "variation_handled" | "directive_updated" | "mcp_updated" | "learning_documented",
  "what_broke": "Description of what broke or variation encountered",
  "how_fixed": "How you fixed it or handled it",
  "directive_updated": "directive-name.md" (if applicable),
  "mcp_updated": "mcp-name.js" (if applicable),
  "learning": "What was learned from this",
  "context": "Additional context"
}
```

### Step 3: Verify Log Created
- Check that log file was created
- Verify it will be processed by Daily Ops Engine

---

## Examples

### Example 1: MCP Error Fixed

```javascript
// After fixing create-client-folder MCP
await callMCP('log-self-annealing', {
  action_type: 'error_fix',
  what_broke: 'MCP failed when client name has spaces',
  how_fixed: 'Updated MCP to convert spaces to hyphens before processing',
  mcp_updated: 'create-client-folder.js',
  learning: 'Always validate and normalize client names before processing',
  context: 'Client "test client" caused error, now handled automatically'
});
```

### Example 2: Directive Updated

```javascript
// After updating build-client-website directive
await callMCP('log-self-annealing', {
  action_type: 'directive_updated',
  what_broke: 'Directive didn\'t handle Wix clients',
  how_fixed: 'Added edge case for Wix, updated process to check client profile',
  directive_updated: 'build-client-website.md',
  learning: 'Client profile variations should be checked before building',
  context: 'Client uses Wix instead of static HTML'
});
```

### Example 3: Variation Handled

```javascript
// After handling HubSpot variation
await callMCP('log-self-annealing', {
  action_type: 'variation_handled',
  what_broke: 'Client uses HubSpot instead of Airtable',
  how_fixed: 'Updated process to use HubSpot MCP, added to client profile',
  learning: 'Client profile now stores CRM type, future automations use it automatically',
  context: 'First HubSpot client, process adapted successfully'
});
```

---

## Action Types

### error_fix
- MCP or process broke
- Was fixed
- Include: what broke, how fixed, MCP/script updated

### variation_handled
- New variation encountered
- Process adapted
- Include: variation, adaptation, client profile updated (if applicable)

### directive_updated
- Directive was updated with learnings
- Include: which directive, what was added/updated, why

### mcp_updated
- MCP was fixed or improved
- Include: which MCP, what was fixed, why

### learning_documented
- New learning was documented
- Include: what was learned, where documented, why it matters

---

## What Gets Logged

The log file will contain:
- **Timestamp** - When it happened
- **Action Type** - What kind of self-annealing
- **What Broke/Variation** - The problem
- **How Fixed** - The solution
- **Directive Updated** - Which directive (if any)
- **MCP Updated** - Which MCP (if any)
- **Learning** - What was learned
- **Context** - Additional details

---

## Where Logs Go

**Log files:**
- Location: `systems/trackers/self_annealing_logs/`
- Format: `self-annealing-{timestamp}.txt`
- Processed by: Daily Ops Engine (same as chat files)

**Summary log:**
- Location: `systems/trackers/self_annealing_logs/summary.json`
- Contains: Last 100 self-annealing actions
- Format: JSON for easy reading

---

## Why This Matters

**Without logging:**
- ❌ User doesn't know what was fixed
- ❌ Dashboard doesn't get updated
- ❌ No visibility into improvements
- ❌ Can't track system evolution

**With logging:**
- ✅ User sees what was fixed
- ✅ Dashboard shows improvements
- ✅ Full transparency
- ✅ Track system evolution
- ✅ Accountability for changes

---

## Enforcement

**This is MANDATORY.**
- Every self-annealing action MUST be logged
- No exceptions
- Logging is part of the self-annealing process
- If you forget, log it as soon as you remember

---

## Integration

**The log files:**
- Are formatted like chat files
- Are processed by Daily Ops Engine
- Appear in dashboard
- Show what was fixed/updated
- Track learnings over time

**User sees:**
- What was fixed
- When it was fixed
- What was learned
- How system improved

---

**Last Updated:** December 8, 2024
**Status:** MANDATORY - Must follow for all self-annealing actions

