# DIRECTIVE: Follow DOE Method (Meta-Directive)

## 1. GOAL
Ensure the DOE method is ALWAYS followed before any work begins. This directive enforces the directive-check process itself.

## 2. INPUTS
- **User Request**: Any task, question, or request from the user
- **Context**: Current chat session, open files, recent work
- **Required**: Access to `systems/doe-engine/directives/` folder

## 3. PROCESS

### MANDATORY FIRST STEP (Cannot Be Skipped)

**BEFORE taking ANY action, you MUST:**

1. **Acknowledge Pre-Flight Check** (if .cursorrules requires it)
   - State: "I have read and understood the .cursorrules file"
   - Confirm: Three mandatory phases (Directive → Orchestration → Execution)
   - Verify: Will NOT write code without checking directive or creating approved blueprint
   - State: Current phase (Check Directive → Orchestrate → Execute)

2. **Check for Relevant Directive**
   - **Task identification**: What is the user asking for?
     * Examples: "investigate branches", "fix deployment", "build website", "create automation"
   - **Search for directive**: `systems/doe-engine/directives/{task-name}.md`
     * Try multiple search terms if needed
     * Check similar/related directives
   - **If directive exists**: 
     * READ IT FULLY before proceeding
     * Follow its process
     * Use its execution scripts/MCPs
   - **If no directive exists**:
     * Apply 3-question test:
       1. Will I do this again? (Recurring)
       2. Is this complex? (Multiple steps, integrations)
       3. Does consistency matter? (Same quality every time)
     * **If 2+ answers are "Yes"**: 
       - Ask user if directive should be created
       - If yes, create directive FIRST, then proceed
     * **If 0-1 answers are "Yes"**: 
       - Proceed with work
       - But still check for execution scripts/MCPs

3. **Check for Execution Scripts/MCPs**
   - Before writing ANY code:
     * Check: `systems/doe-engine/execution/`
     * Check: `automations/mcps/`
     * Check: `systems/mcp-server/automations/`
   - If script/MCP exists: USE IT (don't rewrite)
   - If no script exists: Create one for deterministic operations

### Why This Matters

**The DOE method exists because:**
- LLMs are 90% accurate per step = 59% success over 5 steps
- Directives contain learnings from past work
- Without checking directives, you repeat mistakes
- Self-annealing only works if directives are updated
- The system improves over time ONLY if the process is followed

**What happens when you skip this:**
- You repeat work that's already been done
- You make mistakes that were already fixed
- You don't benefit from past learnings
- The system doesn't improve
- The user has to correct you repeatedly

### The Reflexive Pattern

**Make this automatic:**

1. **User asks question/requests work**
2. **STOP - Don't do anything yet**
3. **Check for directive** (this is now reflexive, like breathing)
4. **If directive exists**: Read it, follow it
5. **If no directive**: Apply 3-question test, create if needed
6. **Check for scripts/MCPs**: Use existing tools
7. **Then proceed with work**

**This pattern must become automatic. It's not optional.**

## 4. OUTPUTS
- **Work completed following DOE method**
- **Directive checked/created** (if needed)
- **Execution scripts/MCPs used** (not rewritten)
- **Self-annealing completed** (if errors/variations occurred)
- **System improved** (directive updated with learnings)

## 5. EXECUTION SCRIPTS
- No scripts needed - this is about process enforcement
- The process IS the tool

## 6. EDGE CASES

### User Asks Quick Question
- **Still check for directive** (might be a recurring question)
- If truly one-off: Answer directly, but note if directive could help

### User Says "Just Do It"
- **Still check for directive first**
- If directive exists: Follow it
- If no directive: Apply 3-question test, proceed if simple

### Emergency/Fix Needed Now
- **Still check for directive** (might have been fixed before)
- If directive exists: Follow it (it's faster than guessing)
- If no directive: Fix it, then self-anneal (create directive for next time)

### "I Already Know How to Do This"
- **Still check for directive** (might have learnings you don't know)
- Directives contain edge cases, API limits, timing issues you might not remember
- It's faster to check than to debug later

## 7. LEARNINGS

### Critical Discovery (2025-01-XX)
- **Issue**: AI assistant repeatedly violates DOE method
- **Root Cause**: Not checking for directives before starting work
- **Impact**: 
  - Work is done without benefit of past learnings
  - Mistakes are repeated
  - System doesn't improve
  - User has to correct repeatedly
- **Solution**: Create this meta-directive to enforce the process
- **Prevention**: Make directive-check reflexive and automatic

### Why This Keeps Happening
1. **Pattern matching**: AI sees task, immediately starts solving
2. **Missing reflex**: No automatic "check directive first" step
3. **Not internalized**: Process is in rules but not in behavior
4. **No enforcement**: Rules exist but aren't followed

### How to Fix
1. **Make it reflexive**: Check directive = automatic first step
2. **Create meta-directive**: This directive enforces the process
3. **Self-anneal immediately**: When caught violating, update this directive
4. **Track violations**: Document when process is skipped

### Best Practices
- **Always check directive first** - even for "simple" tasks
- **Directives contain learnings** - you don't know what you don't know
- **It's faster to check** - than to debug mistakes later
- **System improves** - only if process is followed consistently

---
**Last Updated:** 2025-01-XX
**Status:** Active (Meta-Directive - Enforces Process)
**Created By:** AI Assistant (Auto) - After repeated violations
**Purpose:** Make directive-checking reflexive and automatic

