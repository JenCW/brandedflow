/**
 * Extract Decisions and Tasks from Chat Files
 * Uses the Daily Ops Engine's extraction functionality
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');

const execAsync = promisify(exec);

module.exports = {
  description: 'Extracts decisions, tasks, and notes from chat files using Daily Ops Engine',
  
  params: {
    chat_files: {
      type: 'array',
      required: false,
      description: 'Specific chat files to process (if not provided, processes all in inbox)'
    },
    output_format: {
      type: 'string',
      required: false,
      default: 'json',
      description: 'Output format: "json" or "markdown"'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { chat_files = null, output_format = 'json' } = params;

    const trackersPath = path.join(PROJECT_ROOT, 'systems', 'trackers');
    const conversationsInbox = path.join(trackersPath, 'conversations_to_process');
    const opsDir = path.join(PROJECT_ROOT, 'systems', 'automation-engine', 'daily_ops');

    // Create a temporary Python script to extract
    const tempScript = path.join(PROJECT_ROOT, 'systems', 'automation-engine', 'temp_extract.py');
    
    const pythonCode = `
import sys
from pathlib import Path
ROOT = Path("${PROJECT_ROOT}").resolve()
sys.path.insert(0, str(ROOT))

# Change to automation-engine directory for relative imports
import os
AUTOMATION_DIR = Path("${PROJECT_ROOT}") / "systems" / "automation-engine"
os.chdir(str(AUTOMATION_DIR))
sys.path.insert(0, str(AUTOMATION_DIR))

from daily_ops_engine import DailyOpsEngine
import json

trackers = Path("${trackersPath}")
ops_dir = Path("${opsDir}")
engine = DailyOpsEngine(trackers, ops_dir)

# Get chat files from inbox (exclude Processed folder)
inbox = Path("${conversationsInbox}")
chat_files = []
if inbox.exists():
    for item in inbox.iterdir():
        if item.name == "Processed":
            continue
        if item.is_file():
            chat_files.append(item)
        elif item.is_dir() and item.suffix.lower() == ".rtfd":
            chat_files.append(item)

if not chat_files:
    print(json.dumps({"decisions": [], "tasks": [], "notes": [], "message": "No chat files found in inbox"}))
    sys.exit(0)

decisions, tasks, notes = engine.extract(chat_files)

result = {
    "decisions": decisions,
    "tasks": tasks,
    "notes": notes,
    "files_processed": len(chat_files)
}

print(json.dumps(result))
`;

    try {
      // Write temp script
      await fs.writeFile(tempScript, pythonCode);

      // Run extraction
      const { stdout, stderr } = await execAsync(
        `cd "${PROJECT_ROOT}" && python3 "${tempScript}"`,
        { maxBuffer: 10 * 1024 * 1024 }
      );

      // Clean up temp script
      await fs.remove(tempScript);

      const result = JSON.parse(stdout);

      if (output_format === 'markdown') {
        const markdown = `# Extracted Decisions, Tasks, and Notes

## Decisions (${result.decisions.length})
${result.decisions.length > 0 ? result.decisions.map(d => `- ${d}`).join('\n') : 'None'}

## Tasks (${result.tasks.length})
${result.tasks.length > 0 ? result.tasks.map(t => `- ${t}`).join('\n') : 'None'}

## Notes (${result.notes.length})
${result.notes.length > 0 ? result.notes.map(n => `- ${n}`).join('\n') : 'None'}

---
**Files Processed:** ${result.files_processed}
`;

        return {
          success: true,
          format: 'markdown',
          content: markdown,
          counts: {
            decisions: result.decisions.length,
            tasks: result.tasks.length,
            notes: result.notes.length
          }
        };
      }

      return {
        success: true,
        format: 'json',
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

