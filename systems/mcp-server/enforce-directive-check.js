// systems/mcp-server/enforce-directive-check.js

module.exports = async function enforceDirectiveCheck(input) {
    return {
      status: "BLOCKED",
      message: "Directive check required before any work can proceed.",
      required_action: "Search systems/doe-engine/directives/ and report results explicitly."
    };
  };
  