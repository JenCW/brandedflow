// Example automation: bump-deps
// Creates a branch, updates package.json (mock version bump), and opens a PR.

module.exports = async function ({ adapters, params, dryRun }) {
  const { github } = adapters;
  const { owner, repo } = params || {};
  if (!owner || !repo) throw new Error('owner and repo required in params');
  
  if (dryRun) {
    return { dryRun: true, message: 'Would create branch automation/bump-deps-* with package.json update' };
  }
  
  const branch = `automation/bump-deps-${Date.now()}`;
  
  // Example: update package.json with bumped version
  // In real usage, you'd parse, bump, and serialize the actual file
  const fileChanges = [
    {
      path: 'package.json',
      content: JSON.stringify({
        name: 'example',
        version: '0.2.0', // bumped from 0.1.0
        dependencies: {}
      }, null, 2)
    }
  ];
  
  const pr = await github.createBranchAndPR({
    owner,
    repo,
    branchName: branch,
    title: 'Bump dependencies',
    body: 'Automated dependency bump by MCP server',
    fileChanges
  });
  
  return { pr_number: pr.pr_number, pr_url: pr.pr_url };
};
