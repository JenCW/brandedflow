/**
 * Log Self-Annealing Actions
 * Creates a log entry that gets processed by Daily Ops Engine
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Logs self-annealing actions (fixes, updates, learnings) for dashboard processing',
  
  params: {
    action_type: {
      type: 'string',
      required: true,
      description: 'Type of action: "error_fix", "variation_handled", "directive_updated", "mcp_updated", "learning_documented"'
    },
    what_broke: {
      type: 'string',
      required: false,
      description: 'What broke or what variation was encountered'
    },
    how_fixed: {
      type: 'string',
      required: true,
      description: 'How it was fixed or handled'
    },
    directive_updated: {
      type: 'string',
      required: false,
      description: 'Which directive was updated (if applicable)'
    },
    mcp_updated: {
      type: 'string',
      required: false,
      description: 'Which MCP was updated (if applicable)'
    },
    learning: {
      type: 'string',
      required: false,
      description: 'What was learned from this'
    },
    context: {
      type: 'string',
      required: false,
      description: 'Additional context about the fix'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const {
      action_type,
      what_broke = '',
      how_fixed,
      directive_updated = '',
      mcp_updated = '',
      learning = '',
      context = ''
    } = params;

    if (!action_type || !how_fixed) {
      throw new Error('action_type and how_fixed are required');
    }

    const trackersPath = path.join(PROJECT_ROOT, 'systems', 'trackers');
    const selfAnnealingLogDir = path.join(trackersPath, 'self_annealing_logs');
    await fs.ensureDir(selfAnnealingLogDir);

    // Create a timestamped log file (format that Daily Ops Engine can process)
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const logFileName = `self-annealing-${timestamp}.txt`;
    const logFilePath = path.join(selfAnnealingLogDir, logFileName);

    // Format as a chat-like entry that Daily Ops Engine can process
    const logContent = `SELF-ANNEALING ACTION LOG
Timestamp: ${new Date().toISOString()}
Action Type: ${action_type}

${what_broke ? `What Broke/Variation: ${what_broke}\n` : ''}
How Fixed: ${how_fixed}
${directive_updated ? `Directive Updated: ${directive_updated}\n` : ''}
${mcp_updated ? `MCP Updated: ${mcp_updated}\n` : ''}
${learning ? `Learning: ${learning}\n` : ''}
${context ? `Context: ${context}\n` : ''}

---
This log entry will be processed by Daily Ops Engine and appear in your dashboard.
`;

    await fs.writeFile(logFilePath, logContent);

    // Also create a summary entry in a central log
    const summaryLogPath = path.join(selfAnnealingLogDir, 'summary.json');
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
      what_broke,
      how_fixed,
      directive_updated,
      mcp_updated,
      learning,
      log_file: logFileName
    });

    // Keep only last 100 entries
    if (summary.length > 100) {
      summary = summary.slice(-100);
    }

    await fs.writeJson(summaryLogPath, summary, { spaces: 2 });

    return {
      success: true,
      message: 'Self-annealing action logged',
      log_file: logFileName,
      log_path: logFilePath,
      summary_entries: summary.length,
      note: 'This log will be processed by Daily Ops Engine and appear in your dashboard'
    };
  }
};

