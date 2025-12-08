/**
 * Get Git Status
 * Shows current git status, changed files, protected files
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');

const execAsync = promisify(exec);

module.exports = {
  description: 'Shows current git status, changed files, and which files are protected',
  
  params: {
    show_protected: {
      type: 'boolean',
      required: false,
      default: true,
      description: 'Show which files are protected (default: true)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { show_protected = true } = params;

    const automationEnginePath = path.join(PROJECT_ROOT, 'systems', 'automation-engine');
    const gitCommitManagerScript = path.join(automationEnginePath, 'git_commit_manager.py');

    // Create Python script to get status
    const tempScript = path.join(PROJECT_ROOT, 'systems', 'automation-engine', 'temp_git_status.py');
    
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

# Get status
status = manager.get_status()
changed_files = manager.get_changed_files()
preview = manager.create_commit_preview(include_protected=False)

result = {
    "status": status,
    "changed_files": changed_files,
    "preview": preview,
    "has_changes": len(changed_files["modified"]) + len(changed_files["added"]) + len(changed_files["deleted"]) > 0
}

print(json.dumps(result))
`;

    try {
      // Write temp script
      await fs.writeFile(tempScript, pythonCode);

      // Run git status
      const { stdout, stderr } = await execAsync(
        `cd "${PROJECT_ROOT}" && python3 "${tempScript}"`,
        { maxBuffer: 10 * 1024 * 1024 }
      );

      // Clean up temp script
      await fs.remove(tempScript);

      const result = JSON.parse(stdout);

      return {
        success: true,
        ...result
      };
    } catch (error) {
      // Clean up temp script on error
      if (await fs.pathExists(tempScript)) {
        await fs.remove(tempScript);
      }

      return {
        success: false,
        error: error.message,
        stderr: error.stderr || null
      };
    }
  }
};

