// systems/mcp-server/enforce-directive-check-strict.js
//
// STRICT enforcement - cannot be bypassed
// This version logs violations and requires explicit directive search results

const fs = require('fs').promises;
const path = require('path');

module.exports = async function enforceDirectiveCheckStrict(input = {}) {
  const {
    user_confirmed = false,
    directive_search_performed = false,
    directive_found = null,
    directive_path = null,
    blueprint_created = false,
    blueprint_approved = false,
    task_description = null
  } = input;

  // PHASE 1: Directive Check (MANDATORY)
  if (!directive_search_performed) {
    return {
      status: "BLOCKED",
      phase: "DIRECTIVE_CHECK",
      message: "🚫 BLOCKED: Directive search not performed",
      required_action: `
MANDATORY FIRST STEP:
1. Search systems/doe-engine/directives/ for relevant directive
2. Use list_dir or glob_file_search to examine directives folder
3. Report EXACTLY ONE of:
   - "✅ DIRECTIVE FOUND: [filename]"
   - "✅ NO DIRECTIVE FOUND: [task description]"
4. Re-run this check with directive_search_performed: true, directive_found: [true/false], directive_path: [path or null]
      `,
      cannot_proceed: true
    };
  }

  // PHASE 2: If directive found, must read it
  if (directive_found === true && !directive_path) {
    return {
      status: "BLOCKED",
      phase: "DIRECTIVE_READ",
      message: "🚫 BLOCKED: Directive found but path not provided",
      required_action: "Provide directive_path when directive_found is true",
      cannot_proceed: true
    };
  }

  // PHASE 3: If no directive, determine if one should be created
  if (directive_found === false) {
    // Check if this is a recurring/complex task that needs a directive
    const needsDirective = input.needs_directive === true;
    
    if (needsDirective && !user_confirmed) {
      return {
        status: "BLOCKED",
        phase: "DIRECTIVE_CREATION",
        message: "🚫 BLOCKED: No directive found, but task requires one",
        required_action: `
This task is RECURRING/COMPLEX and needs a directive:
1. Create directive in systems/doe-engine/directives/
2. Use .template.md as template
3. Get user approval for directive creation
4. Re-run this check with user_confirmed: true
        `,
        cannot_proceed: true
      };
    }
  }

  // PHASE 4: If coding work needed, blueprint required
  if (input.coding_work_needed === true) {
    if (!blueprint_created) {
      return {
        status: "BLOCKED",
        phase: "BLUEPRINT_CREATION",
        message: "🚫 BLOCKED: Coding work requires blueprint",
        required_action: `
MANDATORY: Create detailed blueprint with:
- Objectives
- Proposed Changes (files, modifications)
- Logic/Edge Cases
- FE/BE Separation
- Dependencies
Then re-run this check with blueprint_created: true
        `,
        cannot_proceed: true
      };
    }

    if (!blueprint_approved) {
      return {
        status: "BLOCKED",
        phase: "BLUEPRINT_APPROVAL",
        message: "🚫 BLOCKED: Blueprint created but not approved",
        required_action: "WAIT for explicit user approval. Re-run with blueprint_approved: true",
        cannot_proceed: true
      };
    }
  }

  // PHASE 5: All checks passed
  return {
    status: "CLEARED",
    phase: "EXECUTION",
    message: "✅ All checks passed. You may proceed to execution.",
    required_action: null,
    cannot_proceed: false
  };
};
