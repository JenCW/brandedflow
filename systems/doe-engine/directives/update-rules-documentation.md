# DIRECTIVE: Update Rules and Documentation When Systems Change

## 1. GOAL
Systematically update all rules and documentation files when systems are added, removed, or significantly changed, ensuring consistency across all documentation and preventing outdated references.

## 2. INPUTS

### Required Inputs
- **System Change**: Addition, removal, or significant modification of a system/component
- **Authoritative Source**: Documentation or workflow_state.md confirming the change
- **User Confirmation**: Explicit confirmation of the change status

### Input Sources
- `workflow_state.md` - Authoritative source for system status changes
- `docs/internal/MASTER_RULES.md` - Primary rules file
- `systems/doe-engine/directives/` - Directive files
- `docs/internal/SYSTEMS_EXPLAINED.md` - System documentation
- User notification of system change

### File Types to Check
- Markdown files in `docs/internal/`
- Markdown files in `systems/doe-engine/`
- Any documentation referencing the changed system

## 3. PROCESS

### Phase 1: Orchestration (MANDATORY - Check This Directive First)

1. **MANDATORY: Check for existing directive FIRST**
   - This directive should be used for updating rules/documentation
   - Even if user provides a plan, follow this directive's process
   - This directive IS the process for this task

2. **Verify the System Change**
   - Check `workflow_state.md` for authoritative confirmation
   - Confirm with user if status is unclear
   - Document what changed (added/removed/modified)

3. **Create a Report/Blueprint** (MANDATORY BEFORE EXECUTION)
   - Create a report document listing:
     * Which system changed and how (added/removed/modified)
     * Authoritative source confirming the change
     * All files that need updating
     * Specific changes needed in each file
     * Patterns to search for (references to old system)
     * Replacement patterns (what to replace references with)
   - Present the report to user
   - **WAIT FOR EXPLICIT APPROVAL** before proceeding to execution

### Phase 2: Search and Identify All References

1. **Search for references across codebase**
   - Use codebase_search to find references to the changed system
   - Use grep to find exact text matches
   - Search in:
     * `docs/internal/` - All documentation files
     * `systems/doe-engine/` - DOE engine files and directives
     * Any other relevant directories

2. **Categorize files by priority**
   - **Critical**: Core rules files (MASTER_RULES.md, AI_*_RULES.md)
   - **Important**: System documentation, workflow files
   - **Reference**: Example files, historical documentation
   - **Low Priority**: Old examples, deprecated files

3. **Document findings in report**
   - List all files with references
   - Note the type of reference (active usage, example, mention)
   - Identify which references need updating vs. which are historical

### Phase 3: Create Update Plan (Blueprint)

1. **For each file category, specify:**
   - Exact changes to make
   - Text patterns to replace
   - New text to use
   - Context to preserve

2. **Update patterns to establish:**
   - Old system references → New status references
   - Active usage → Deprecated/removed status
   - Process descriptions → Updated process descriptions

3. **Verify update approach:**
   - Ensure consistency across all files
   - Preserve historical context where appropriate
   - Update active instructions/processes

### Phase 4: Get Approval (MANDATORY)

1. **Present complete blueprint/report to user**
   - Show all files to update
   - Show specific changes
   - Explain approach and rationale

2. **Wait for explicit approval**
   - Do NOT proceed until user approves
   - User may request modifications to plan
   - Update plan if requested, then get approval again

### Phase 5: Execution (After Approval)

1. **Update files systematically**
   - Start with critical files first
   - Work through each file in the approved plan
   - Use search_replace for exact replacements
   - Verify each change preserves context correctly

2. **Update patterns:**
   - Remove active references to removed systems
   - Update process descriptions to reflect current state
   - Replace "processed by X" with "stored for reference" (if system removed)
   - Update system lists and explanations

3. **Preserve appropriate context:**
   - Don't remove historical examples if they're still useful
   - Don't break cross-references unnecessarily
   - Maintain file structure and organization

### Phase 6: Verification

1. **Verify all changes made correctly**
   - Review updated files
   - Check for consistency across files
   - Verify no broken references
   - Ensure no unintended changes

2. **Verify no references missed**
   - Re-run searches to confirm no references remain (if system removed)
   - Or verify new references added correctly (if system added)

3. **Test documentation coherence**
   - Ensure updated documentation makes sense
   - Verify process flows are logical
   - Check that examples still work with changes

### Phase 7: Self-Annealing

1. **Log the update process**
   - Call `log-self-annealing` MCP to document:
     * What system changed
     * Which files were updated
     * What patterns were used
     * Any issues encountered

2. **Update this directive with learnings** (if needed)
   - Document new patterns discovered
   - Note edge cases encountered
   - Update process if improvements found
   - Get approval before updating directive

## 4. OUTPUTS

### Primary Outputs
- **Updated documentation files**: All files with references to changed system
- **Report document**: Documentation of changes made (if created)
- **Self-annealing log**: Record of process and learnings

### File Locations
- Updated files remain in their original locations
- Report (if created) goes to `docs/internal/` with descriptive name (e.g., `DAILY_OPS_REMOVAL_REPORT.md`)
- Self-annealing log goes to `systems/trackers/self_annealing_logs/`

### Verification
- All references to changed system are updated
- Documentation is consistent across all files
- No broken references or logical inconsistencies
- Process documentation reflects current state

## 5. EXECUTION SCRIPTS

### MCPs to Use
- `log-self-annealing` - Log the update process and learnings

### Tools to Use
- `codebase_search` - Find references to changed system
- `grep` - Find exact text matches
- `read_file` - Read files to understand context
- `search_replace` - Make exact text replacements

## 6. EDGE CASES

### System Partially Removed
- Some components remain, some removed
- Update references to removed components only
- Clarify what remains vs. what was removed
- Update process descriptions accordingly

### System Status Unclear
- If workflow_state.md doesn't clearly state status
- Ask user for clarification before proceeding
- Document the clarification in report

### Historical References
- Old examples or historical documentation
- Decide case-by-case whether to update
- Preserve if historical context is valuable
- Update if it misleads about current state

### Cross-Referenced Systems
- Changes to one system affect references to others
- Update all related references
- Verify related systems' documentation is consistent

### Files in Multiple Locations
- Same reference in multiple directories
- Search comprehensively across all locations
- Update consistently in all locations
- Don't assume one location covers all references

### Conflicting Documentation
- Different files say different things
- Use authoritative source (workflow_state.md, MASTER_RULES.md)
- Update all files to match authoritative source
- Document why authoritative source takes precedence

## 7. LEARNINGS

### Critical Process Learnings
- **ALWAYS create a report/blueprint FIRST** before making any changes
- **ALWAYS get explicit approval** before executing updates
- **Search comprehensively** - references can be in unexpected places
- **Work systematically** - critical files first, then important, then reference
- **Verify thoroughly** - re-run searches to ensure nothing missed

### Technical Learnings
- **codebase_search is good for semantic search** - finds conceptual references
- **grep is good for exact matches** - finds specific text patterns
- **workflow_state.md is authoritative** - use it to confirm system status
- **Multiple search approaches needed** - semantic + text search catches more
- **Context matters** - understand what file does before updating

### Pattern Learnings (From Daily Ops Engine Removal)
- **Removed systems**: "processed by X" → "stored for reference"
- **Removed systems**: "appears in dashboard" → "available in log files"
- **Removed systems**: Remove from active system lists
- **Added systems**: Add to system lists and process descriptions
- **Modified systems**: Update process descriptions to reflect changes

### Common Mistakes to Avoid
- **Don't skip the report/blueprint phase** - leads to incomplete updates
- **Don't start editing before approval** - violates DOE method
- **Don't assume one search finds everything** - use multiple approaches
- **Don't update without understanding context** - can break documentation
- **Don't skip verification** - re-run searches to confirm completeness

---
**Last Updated:** January 4, 2026
**Status:** Active
**Created By:** AI Assistant (from Daily Ops Engine removal process)
