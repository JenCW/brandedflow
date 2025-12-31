# BLUEPRINT: Consolidate Rules to Directive-First Method

## OBJECTIVES

Transform all rule files from "Blueprint-First" approach to "Directive-First" (Directive → Orchestration → Execution) approach, integrating blueprint creation as a step within the Orchestration phase when coding work is required.

## CURRENT STATE

- **`.cursorrules`** files use "Blueprint-First" (Blueprint → Construct → Execute)
- **`gemini.md`** uses "Directive-First" (Directive → Orchestration → Execution)
- These are currently separate, creating confusion about which method to use
- Blueprint process should be embedded within directives for coding work

## PROPOSED CHANGES

### 1. Mandatory Checkpoint Files (7 Total)

**ALL 7 files must have IDENTICAL structure and content:**
- `.cursorrules` (root)
- `clients/.cursorrules`
- `company/.cursorrules`
- `docs/.cursorrules`
- `automations/.cursorrules`
- `systems/.cursorrules`
- `templates/.cursorrules`

**Structure (Mandatory Pre-Flight Check Cannot Be Bypassed):**
- **MANDATORY PRE-FLIGHT CHECK** at top of file requiring explicit acknowledgment
- Section I: "DIRECTIVE-FIRST APPROACH" (Directive → Orchestration → Execution)
- **Orchestration Phase** includes:
  - Check for existing directive
  - If coding work needed: Create blueprint → Get approval → Then execute
  - If deterministic script exists: Use it directly
  - If no directive exists: Ask user if directive should be created
- All other sections preserved (Code Quality, Documentation, etc.)

**Checkpoint Enforcement:**
- Pre-flight check MUST be completed before ANY action
- AI cannot proceed without providing the acknowledgment
- All 7 files serve as identical checkpoints to enforce directive-first method
- **IMPORTANT:** These checkpoints are NOT for isolated folder work - always open Cursor at root
- Checkpoints ensure directive-first method is followed regardless of which folder AI is working within

### 2. All Nested `.cursorrules` Files

Update these files to match the new structure:
- `company/.cursorrules`
- `company/website/.cursorrules`
- `company/website/site/.cursorrules`
- `company/website/site/relume/.cursorrules`

### 3. Directive Template Update

Update `systems/doe-engine/directives/.template.md` to include blueprint step in PROCESS section:

```markdown
## 3. PROCESS

### Phase 1: Orchestration (Decision Making)
1. **Check for existing directive** (if applicable)
2. **For coding/development work:**
   - Create detailed blueprint with:
     * Objectives
     * Proposed changes
     * Logic/edge cases
     * FE/BE separation
     * Dependencies
   - **WAIT FOR EXPLICIT HUMAN APPROVAL** before proceeding
3. **For deterministic work:**
   - Use existing execution scripts/MCPs
   - Call scripts in correct order
4. **Handle errors and self-anneal**

### Phase 2: Execution
1. **If blueprint approved:** Implement according to blueprint
2. **If using scripts:** Execute deterministic scripts/MCPs
3. **Verify outputs**
```

### 4. Key Integration Points

- **Blueprint becomes a sub-step of Orchestration** when coding work is needed
- **Directive-first** is the primary workflow (check directive → orchestrate → execute)
- **Blueprint approval** still required, but within the directive's orchestration phase
- **Self-annealing** updates the directive, not just the blueprint

## SPECIFIC FILE MODIFICATIONS

### Mandatory Checkpoint Files (Cannot Be Bypassed):

**Root + 6 Core Folders (MANDATORY CHECKPOINTS):**
1. `.cursorrules` (root) - Complete rewrite of Section I - **MANDATORY CHECKPOINT**
2. `clients/.cursorrules` - Create/update to match root - **MANDATORY CHECKPOINT**
3. `company/.cursorrules` - Update to match root - **MANDATORY CHECKPOINT**
4. `docs/.cursorrules` - Create/update to match root - **MANDATORY CHECKPOINT**
5. `automations/.cursorrules` - Create/update to match root - **MANDATORY CHECKPOINT**
6. `systems/.cursorrules` - Create/update to match root - **MANDATORY CHECKPOINT**
7. `templates/.cursorrules` - Create/update to match root - **MANDATORY CHECKPOINT**

**Additional Files (Optional/Existing):**
8. `company/website/.cursorrules` - Update to match root (if exists)
9. `company/website/site/.cursorrules` - Update to match root (if exists)
10. `company/website/site/relume/.cursorrules` - Update to match root (if exists)
11. `systems/doe-engine/directives/.template.md` - Add blueprint step to PROCESS

### Pre-flight Check Changes:

**Old:**
```
BLUEPRINT_PHASE_UNDERSTOOD: YES
CODE_WITHOUT_APPROVAL: FORBIDDEN
CURRENT_PHASE: Phase 1 - Blueprint
VERIFICATION ANSWER: "Create a blueprint and wait for approval"
```

**New:**
```
DIRECTIVE_METHOD_UNDERSTOOD: YES
CODE_WITHOUT_DIRECTIVE_OR_BLUEPRINT: FORBIDDEN
CURRENT_PHASE: Check Directive → Orchestrate → Execute
VERIFICATION ANSWER: "Check for directive, if coding work needed create blueprint in orchestration phase and wait for approval"

⚠️ MANDATORY CHECKPOINT: This file is a checkpoint. You cannot proceed without acknowledging the directive-first method above.
```

## LOGIC/EDGE CASES

### Edge Case 1: Task Has No Directive
- Ask user if directive should be created (3-question test)
- If yes → Create directive first, then proceed
- If no → Proceed with blueprint (if coding) or direct execution (if simple)

### Edge Case 2: Coding Work Within Directive
- Directive's orchestration phase includes blueprint creation
- Blueprint gets approval, then execution proceeds
- Both directive and blueprint can evolve based on learnings

### Edge Case 3: Simple Tasks (No Directive Needed)
- One-off tasks: Skip directive, use blueprint (if coding) or direct execution
- Follow 3-question test from gemini.md

### Edge Case 4: Existing Directives Reference Blueprint
- Directives already written may need updates to include blueprint step
- Update as needed when directives are used

### Edge Case 5: Working in Subfolders
- **ALWAYS open Cursor at root** (`/brandedflow/`)
- Checkpoint `.cursorrules` files enforce directive-first method, NOT folder isolation
- Directives remain centralized in `systems/doe-engine/directives/`
- AI needs full repo context to make good decisions (see `docs/internal/FOUNDATIONAL_SYSTEM.md`)

## FRONTEND/BACKEND SEPARATION

Not applicable - this is a documentation/rule consolidation task.

## DEPENDENCIES

- Access to all `.cursorrules` files
- Understanding of current directive structure
- Understanding of current blueprint requirements
- Confirmation that directives stay centralized (per `gemini.md`)
- Confirmation that Cursor always opens at root (per `FOUNDATIONAL_SYSTEM.md`)

## IMPLEMENTATION STRATEGY

1. **Create new Section I structure** for directive-first approach (with mandatory checkpoint pre-flight)
2. **Preserve all other sections** (Code Quality, Documentation, etc.) - they stay the same
3. **Update pre-flight check** to reflect directive-first (mandatory acknowledgment)
4. **Create/update mandatory checkpoint files:**
   - Root `.cursorrules`
   - `clients/.cursorrules` (create if doesn't exist)
   - `company/.cursorrules` (update existing)
   - `docs/.cursorrules` (create if doesn't exist)
   - `automations/.cursorrules` (create if doesn't exist)
   - `systems/.cursorrules` (create if doesn't exist)
   - `templates/.cursorrules` (create if doesn't exist)
5. **Update any nested .cursorrules** to match (optional)
6. **Update directive template** to include blueprint step
7. **Verify consistency** across all checkpoint files - they must be identical in structure

## RISKS & MITIGATION

- **Risk:** Missing important details from current blueprint-first approach
- **Mitigation:** Extract blueprint requirements and embed them in orchestration phase

- **Risk:** Breaking existing workflows that rely on blueprint-first
- **Mitigation:** Ensure blueprint step is clearly defined in orchestration phase

- **Risk:** Inconsistent rule files
- **Mitigation:** Update all files systematically, verify consistency

- **Risk:** AI bypassing checkpoints
- **Mitigation:** Make pre-flight check very explicit with MANDATORY language, include in all 7 checkpoint files (root + 6 core folders)

---

**APPROVAL REQUIRED BEFORE IMPLEMENTATION**

