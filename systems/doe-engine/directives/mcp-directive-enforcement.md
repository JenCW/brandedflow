# DIRECTIVE: MCP Server for Directive Enforcement

## 1. GOAL
Create an MCP server that enforces the directive-check process by making it part of the execution layer (deterministic) rather than orchestration (probabilistic).

## 2. THE PROBLEM IT SOLVES

### Current Issue
- **Orchestration layer (me)**: Probabilistic, can skip directive-check
- **Pattern**: See task → immediately solve → skip process
- **Result**: Violations happen repeatedly

### Solution: Move Enforcement to Execution Layer
- **MCP server**: Deterministic, can't be skipped
- **Pattern**: Request work → MCP checks directive → presents directive → validates check → allows work
- **Result**: Process is enforced automatically

## 3. HOW IT WOULD WORK

### MCP: `check-directive-before-work`

**Input:**
```json
{
  "task_description": "investigate GitHub branches",
  "task_type": "investigation" | "development" | "deployment" | "automation",
  "client_name": "enzo-mortgages" (optional)
}
```

**Process:**
1. **Search for directive** (deterministic):
   - Search `systems/doe-engine/directives/` for matching directive
   - Try multiple search terms (task type, keywords)
   - Return list of potential directives

2. **Apply 3-question test** (if no directive found):
   - Will this be done again? (Recurring)
   - Is this complex? (Multiple steps)
   - Does consistency matter? (Same quality)
   - Return recommendation: "Create directive" or "Skip directive"

3. **Present directive** (if found):
   - Return directive content
   - Mark as "must read before proceeding"
   - Log that directive was presented

4. **Validate directive was checked**:
   - Require acknowledgment that directive was read
   - Log the check (for tracking)
   - Only then allow work to proceed

**Output:**
```json
{
  "directive_found": true,
  "directive_path": "systems/doe-engine/directives/verify-deployment-configuration.md",
  "directive_content": "...",
  "must_read": true,
  "three_question_test": null,
  "recommendation": "Read directive before proceeding"
}
```

OR (if no directive):

```json
{
  "directive_found": false,
  "three_question_test": {
    "recurring": true,
    "complex": true,
    "consistency_matters": true,
    "score": 3
  },
  "recommendation": "Create directive - 3/3 criteria met",
  "suggested_directive_name": "verify-deployment-configuration.md"
}
```

## 4. INTEGRATION WITH WORKFLOW

### Current Flow (Broken)
```
User Request
    ↓
AI sees task → immediately starts work ❌ (skips directive check)
```

### New Flow (Enforced)
```
User Request
    ↓
AI calls MCP: check-directive-before-work
    ↓
MCP searches for directive (deterministic)
    ↓
[If found] → MCP returns directive → AI must read it → Proceed
[If not found] → MCP applies 3-question test → Recommendation → Proceed
    ↓
Work proceeds (with directive knowledge)
```

## 5. BENEFITS

### 1. **Enforcement**
- Can't skip the check (MCP enforces it)
- Deterministic (same input = same output)
- Reliable (not probabilistic)

### 2. **Automatic**
- MCP does the searching (faster than manual)
- Consistent search logic
- No human error in search terms

### 3. **Tracking**
- Logs when directive was checked
- Tracks violations (when check is skipped)
- Provides metrics on directive usage

### 4. **Learning**
- MCP can learn which directives are most relevant
- Can suggest directive improvements
- Can identify gaps (tasks without directives)

## 6. IMPLEMENTATION

### MCP Server Endpoint

**Route:** `POST /check-directive`

**Request:**
```json
{
  "task_description": "investigate GitHub branches and fix Netlify deployment",
  "task_type": "deployment",
  "client_name": "enzo-mortgages"
}
```

**Response:**
```json
{
  "ok": true,
  "directive_found": true,
  "directive": {
    "path": "systems/doe-engine/directives/verify-deployment-configuration.md",
    "title": "Verify Deployment Configuration & Branch Management",
    "summary": "Verify and fix deployment configuration...",
    "must_read": true
  },
  "validation_required": true,
  "check_id": "check_12345" // For tracking
}
```

### Validation Endpoint

**Route:** `POST /validate-directive-check`

**Request:**
```json
{
  "check_id": "check_12345",
  "directive_path": "systems/doe-engine/directives/verify-deployment-configuration.md",
  "acknowledged": true
}
```

**Response:**
```json
{
  "ok": true,
  "validated": true,
  "work_authorized": true
}
```

## 7. EDGE CASES

### Quick Question
- MCP still checks (might be recurring question)
- If truly one-off: Returns "skip directive" recommendation
- Still logs the check

### Emergency Fix
- MCP checks directive (might have been fixed before)
- If directive exists: Returns it (faster than guessing)
- If no directive: Returns "proceed, but create directive after"

### "I Already Know This"
- MCP still checks (directive might have learnings you don't know)
- Returns directive anyway (it's faster to check than debug later)

## 8. TRACKING & METRICS

### Log Every Check
- Task description
- Directive found (or not)
- Whether directive was read
- Whether work proceeded correctly
- Violations (when check was skipped)

### Metrics
- Directive usage frequency
- Most common tasks without directives
- Directive effectiveness (did following directive help?)
- Violation rate (how often is process skipped?)

## 9. LEARNINGS

### Why This Solves the Problem

**Root Cause:** Directive-check is in orchestration layer (probabilistic)
- I can skip it
- I do skip it (pattern matching → immediate work)
- No enforcement mechanism

**Solution:** Move to execution layer (deterministic)
- MCP enforces it
- Can't be skipped (server requires it)
- Automatic and reliable

### Implementation Priority

**High Priority:**
1. Create `check-directive-before-work` MCP
2. Integrate into workflow (AI calls MCP first)
3. Add validation endpoint
4. Add logging/tracking

**Medium Priority:**
1. Add metrics dashboard
2. Add directive suggestions
3. Add violation alerts

**Low Priority:**
1. Machine learning for directive matching
2. Auto-create directives from patterns
3. Directive effectiveness scoring

---
**Last Updated:** 2025-01-XX
**Status:** Proposal
**Created By:** AI Assistant (Auto) - After user suggested MCP server solution
**Purpose:** Enforce directive-check process via deterministic execution layer

