/**
 * Create Git Commit
 * Creates a git commit with proper message, handles protected files, includes work summary
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');

const execAsync = promisify(exec);

module.exports = {
  description: 'Creates a git commit with proper message, handles protected files, includes work summary from logs',
  
  params: {
    commit_message: {
      type: 'string',
      required: false,
      description: 'Custom commit message (if not provided, generated from work logs)'
    },
    include_protected: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'Whether to include protected files in commit (default: false)'
    },
    dry_run: {
      type: 'boolean',
      required: false,
      default: false,
      description: 'If true, only shows what would be committed (default: false)'
    },
    include_work_summary: {
      type: 'boolean',
      required: false,
      default: true,
      description: 'Include work summary from logs in commit message (default: true)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { 
      commit_message = null, 
      include_protected = false, 
      dry_run = false,
      include_work_summary = true
    } = params;

    const automationEnginePath = path.join(PROJECT_ROOT, 'systems', 'automation-engine');
    const gitCommitManagerScript = path.join(automationEnginePath, 'git_commit_manager.py');

    // Get work summary from logs if requested
    let work_summary = null;
    let decisions = [];
    let tasks = [];

    if (include_work_summary) {
      try {
        const workLogsDir = path.join(PROJECT_ROOT, 'systems', 'trackers', 'work_logs');
        const summaryFile = path.join(workLogsDir, 'summary.json');
        
        if (await fs.pathExists(summaryFile)) {
          const summary = await fs.readJson(summaryFile);
          const recent = summary.slice(-5); // Last 5 work actions
          
          if (recent.length > 0) {
            work_summary = recent.map(w => w.title).join(', ');
            recent.forEach(w => {
              if (w.decisions) decisions.push(...w.decisions);
              if (w.tasks) tasks.push(...w.tasks);
            });
          }
        }
      } catch (e) {
        // Ignore errors, just won't include work summary
      }
    }

    // Create Python script to handle commit
    const tempScript = path.join(PROJECT_ROOT, 'systems', 'automation-engine', 'temp_git_commit.py');
    
    const pythonCode = `
import sys
from pathlib import Path
ROOT = Path("${PROJECT_ROOT}").resolve()
sys.path.insert(0, str(ROOT))

import os
AUTOMATION_DIR = Path("${PROJECT_ROOT}") / "systems" / "automation-engine"
os.chdir(str(AUTOMATION_DIR))
sys.path.insert(0, str(AUTOMATION_DIR))

from git_commit_manager import GitCommitManager
import json

manager = GitCommitManager(ROOT)

# Generate commit message if not provided
commit_msg = ${commit_message ? `"${commit_message.replace(/"/g, '\\"')}"` : 'None'}
if not commit_msg:
    decisions = ${JSON.stringify(decisions)}
    tasks = ${JSON.stringify(tasks)}
    work_summary = ${work_summary ? `"${work_summary}"` : 'None'}
    commit_msg = manager.generate_commit_message(work_summary, decisions, tasks)

# Create commit
result = manager.commit(
    commit_message=commit_msg,
    include_protected=${include_protected},
    dry_run=${dry_run}
)

print(json.dumps(result))
`;

    try {
      // Write temp script
      await fs.writeFile(tempScript, pythonCode);

      // Run git commit manager
      const { stdout, stderr } = await execAsync(
        `cd "${PROJECT_ROOT}" && python3 "${tempScript}"`,
        { maxBuffer: 10 * 1024 * 1024 }
      );

      // Clean up temp script
      await fs.remove(tempScript);

      const result = JSON.parse(stdout);

      return {
        ...result,
        commit_message: result.message || commit_message,
        protected_files_excluded: result.protected_files_excluded || 0
      };
    } catch (error) {
      // Clean up temp script on error
      if (await fs.pathExists(tempScript)) {
        await fs.remove(tempScript);
      }

      return {
        success: false,
        error: error.message,
        stderr: error.stderr || null,
        stdout: error.stdout || null
      };
    }
  }
};

