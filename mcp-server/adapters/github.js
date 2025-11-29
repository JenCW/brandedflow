async function getOctokit() {
  // Import Octokit dynamically because @octokit/rest is an ESM-only package.
  const { Octokit } = await import('@octokit/rest');
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('GITHUB_TOKEN not set');
  return new Octokit({ auth: token });
}

// Helper: create a blob
async function createBlob(octokit, owner, repo, content) {
  const { data } = await octokit.git.createBlob({
    owner,
    repo,
    content,
    encoding: 'utf-8'
  });
  return data.sha;
}

// Helper: create a tree from file changes
async function createTree(octokit, owner, repo, baseSha, fileChanges) {
  const tree = [];
  for (const { path, content } of fileChanges) {
    const sha = await createBlob(octokit, owner, repo, content);
    tree.push({ path, mode: '100644', type: 'blob', sha });
  }
  const { data } = await octokit.git.createTree({
    owner,
    repo,
    tree,
    base_tree: baseSha
  });
  return data.sha;
}

module.exports = {
  listRepos: async (org) => {
    const octokit = await getOctokit();
    const res = await octokit.repos.listForOrg({ org });
    return res.data.map(r => ({ name: r.name, full_name: r.full_name }));
  },
  
  createCommit: async ({ owner, repo, message, fileChanges }) => {
    const octokit = await getOctokit();
    const { data: headRef } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
    const headSha = headRef.object.sha;
    
    const treeSha = await createTree(octokit, owner, repo, headSha, fileChanges);
    const { data: commit } = await octokit.git.createCommit({
      owner,
      repo,
      message,
      tree: treeSha,
      parents: [headSha]
    });
    return commit.sha;
  },
  
  createBranchAndPR: async ({ owner, repo, base = 'main', branchName, title, body, fileChanges = [] }) => {
    const octokit = await getOctokit();
    
    // Get base ref
    const { data: baseRef } = await octokit.git.getRef({ owner, repo, ref: `heads/${base}` });
    const baseSha = baseRef.object.sha;
    
    // Create branch
    await octokit.git.createRef({ owner, repo, ref: `refs/heads/${branchName}`, sha: baseSha });
    
    let commitSha = baseSha;
    if (fileChanges && fileChanges.length > 0) {
      const treeSha = await createTree(octokit, owner, repo, baseSha, fileChanges);
      const { data: commit } = await octokit.git.createCommit({
        owner,
        repo,
        message: title || 'automation commit',
        tree: treeSha,
        parents: [baseSha]
      });
      commitSha = commit.sha;
      
      // Update branch ref to point to new commit
      await octokit.git.updateRef({ owner, repo, ref: `heads/${branchName}`, sha: commitSha });
    }
    
    // Create PR
    const { data: pr } = await octokit.pulls.create({
      owner,
      repo,
      title: title || 'Automation PR',
      head: branchName,
      base,
      body: body || ''
    });
    
    return { pr_number: pr.number, pr_url: pr.html_url, commit_sha: commitSha };
  },
  
  listPullRequests: async ({ owner, repo, state = 'open' }) => {
    const octokit = await getOctokit();
    const { data } = await octokit.pulls.list({ owner, repo, state });
    return data.map(pr => ({ number: pr.number, title: pr.title, url: pr.html_url, state: pr.state }));
  }
};
