/**
 * Log Work Action
 * Logs all work done (decisions, directives, MCPs, tasks, etc.) for dashboard processing
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Logs work actions (decisions, directives, MCPs, tasks, etc.) for Daily Ops Engine processing',
  
  params: {
    action_type: {
      type: 'string',
      required: true,
      description: 'Type: "decision", "directive_created", "directive_updated", "mcp_created", "mcp_updated", "task_created", "task_completed", "file_created", "file_updated", "other"'
    },
    title: {
      type: 'string',
      required: true,
      description: 'Title or summary of the action'
    },
    details: {
      type: 'string',
      required: false,
      description: 'Detailed description of what was done'
    },
    files_created: {
      type: 'array',
      required: false,
      description: 'Array of file paths created'
    },
    files_updated: {
      type: 'array',
      required: false,
      description: 'Array of file paths updated'
    },
    decisions: {
      type: 'array',
      required: false,
      description: 'Array of decisions made'
    },
    tasks: {
      type: 'array',
      required: false,
      description: 'Array of tasks created or completed'
    },
    notes: {
      type: 'array',
      required: false,
      description: 'Array of notes or learnings'
    },
    context: {
      type: 'string',
      required: false,
      description: 'Additional context'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const {
      action_type,
      title,
      details = '',
      files_created = [],
      files_updated = [],
      decisions = [],
      tasks = [],
      notes = [],
      context = ''
    } = params;

    if (!action_type || !title) {
      throw new Error('action_type and title are required');
    }

    const trackersPath = path.join(PROJECT_ROOT, 'systems', 'trackers');
    const workLogsDir = path.join(trackersPath, 'work_logs');
    await fs.ensureDir(workLogsDir);

    // Create a timestamped log file (format that Daily Ops Engine can process)
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const logFileName = `work-${timestamp}.txt`;
    const logFilePath = path.join(workLogsDir, logFileName);

    // Format as a chat-like entry that Daily Ops Engine can process
    // Use markers that Daily Ops Engine looks for: "decision:", "task:", "note:"
    let logContent = `WORK ACTION LOG
Timestamp: ${new Date().toISOString()}
Action Type: ${action_type}
Title: ${title}

${details ? `${details}\n` : ''}
`;

    // Add decisions (with "decision:" marker for extraction)
    if (decisions.length > 0) {
      logContent += `\nDECISIONS:\n`;
      decisions.forEach(decision => {
        logContent += `decision: ${decision}\n`;
      });
    }

    // Add tasks (with "task:" marker for extraction)
    if (tasks.length > 0) {
      logContent += `\nTASKS:\n`;
      tasks.forEach(task => {
        logContent += `task: ${task}\n`;
      });
    }

    // Add notes (with "note:" marker for extraction)
    if (notes.length > 0) {
      logContent += `\nNOTES:\n`;
      notes.forEach(note => {
        logContent += `note: ${note}\n`;
      });
    }

    // Add file information
    if (files_created.length > 0) {
      logContent += `\nFILES CREATED:\n`;
      files_created.forEach(file => {
        logContent += `- ${file}\n`;
      });
    }

    if (files_updated.length > 0) {
      logContent += `\nFILES UPDATED:\n`;
      files_updated.forEach(file => {
        logContent += `- ${file}\n`;
      });
    }

    if (context) {
      logContent += `\nCONTEXT:\n${context}\n`;
    }

    logContent += `\n---
This log entry will be processed by Daily Ops Engine and appear in your dashboard.
`;

    await fs.writeFile(logFilePath, logContent);

    // Also create a summary entry in a central log
    const summaryLogPath = path.join(workLogsDir, 'summary.json');
    let summary = [];
    
    if (await fs.pathExists(summaryLogPath)) {
      try {
        summary = await fs.readJson(summaryLogPath);
      } catch (e) {
        summary = [];
      }
    }

    summary.push({
      timestamp: new Date().toISOString(),
      action_type,
      title,
      details,
      files_created,
      files_updated,
      decisions,
      tasks,
      notes,
      log_file: logFileName
    });

    // Keep only last 200 entries
    if (summary.length > 200) {
      summary = summary.slice(-200);
    }

    await fs.writeJson(summaryLogPath, summary, { spaces: 2 });

    // Auto-commit non-critical files
    try {
      const automationEnginePath = path.join(PROJECT_ROOT, 'systems', 'automation-engine');
      
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);

      const pythonCode = `
import sys
from pathlib import Path
ROOT = Path("${PROJECT_ROOT}").resolve()
sys.path.insert(0, str(ROOT))

import os
AUTOMATION_DIR = Path("${PROJECT_ROOT}") / "systems" / "automation-engine"
os.chdir(str(AUTOMATION_DIR))
sys.path.insert(0, str(AUTOMATION_DIR))

from auto_commit import AutoCommit
import json

auto_commit = AutoCommit(ROOT)
work_summary = ${JSON.stringify(title)} + (${JSON.stringify(details || '')} ? ': ' + ${JSON.stringify(details || '')} : '')
result = auto_commit.commit_non_critical(work_summary)

print(json.dumps(result))
`;

      const tempScript = path.join(automationEnginePath, 'temp_auto_commit.py');
      await fs.writeFile(tempScript, pythonCode);

      try {
        const { stdout } = await execAsync(
          `cd "${PROJECT_ROOT}" && python3 "${tempScript}"`,
          { maxBuffer: 10 * 1024 * 1024 }
        );
        
        const commitResult = JSON.parse(stdout);
        
        // Clean up temp script
        await fs.remove(tempScript);
        
        return {
          success: true,
          message: 'Work action logged and auto-committed',
          log_file: logFileName,
          auto_commit: commitResult
        };
      } catch (e) {
        // Clean up temp script on error
        if (await fs.pathExists(tempScript)) {
          await fs.remove(tempScript);
        }
        // Continue even if auto-commit fails
        return {
          success: true,
          message: 'Work action logged (auto-commit failed)',
          log_file: logFileName,
          auto_commit_error: e.message
        };
      }
    } catch (e) {
      // If auto-commit setup fails, just log the work
      return {
        success: true,
        message: 'Work action logged',
        log_file: logFileName,
      log_path: logFilePath,
      summary_entries: summary.length,
      decisions_logged: decisions.length,
      tasks_logged: tasks.length,
      notes_logged: notes.length,
      note: 'This log will be processed by Daily Ops Engine and appear in your dashboard'
    };
  }
};

