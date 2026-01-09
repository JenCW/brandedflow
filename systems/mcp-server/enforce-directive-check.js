// systems/mcp-server/enforce-directive-check.js
//
// Deterministic gate for DOE directive-first method.
//
// Default: BLOCKED (forces a directive search + explicit reporting).
// Unblock mechanism (user-controlled): pass `{ user_confirmed: true }`.

module.exports = async function enforceDirectiveCheck(input = {}) {
  const userConfirmed = input?.user_confirmed === true || input?.proceed === true;

  if (userConfirmed) {
    return {
      status: "CLEARED",
      message: "Proceed confirmed by user. You may continue.",
      required_action: null,
    };
  }

  return {
    status: "BLOCKED",
    message: "Directive check required before any work can proceed.",
    required_action:
      "Search systems/doe-engine/directives/ and report results explicitly. Then ask the user to confirm 'proceed' and re-run this check with { user_confirmed: true }.",
  };
};