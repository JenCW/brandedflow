/**
 * Run Daily Ops Engine
 * Wraps the Python Daily Ops Engine to run via MCP
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');

const execAsync = promisify(exec);

module.exports = {
  description: 'Runs the Daily Ops Engine: extracts decisions/tasks from chats, builds dashboard, generates daily ops package',
  
  params: {
    mode: {
      type: 'string',
      required: false,
      default: 'daily',
      description: 'Mode: "daily" or "weekly"'
    },
    open_dashboard: {
      type: 'boolean',
      required: false,
      default: true,
      description: 'Open dashboard after running (default: true)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { mode = 'daily', open_dashboard = true } = params;

    if (!['daily', 'weekly'].includes(mode)) {
      throw new Error('Mode must be "daily" or "weekly"');
    }

    const automationEnginePath = path.join(PROJECT_ROOT, 'systems', 'automation-engine');
    const maintenanceScript = path.join(automationEnginePath, 'maintenance_agent.py');
    const runDailyScript = path.join(automationEnginePath, 'run_daily.py');

    // Check if scripts exist
    if (!await fs.pathExists(maintenanceScript)) {
      throw new Error(`Maintenance script not found: ${maintenanceScript}`);
    }

    try {
      let result;

      if (mode === 'daily') {
        // Run daily ops
        const { stdout, stderr } = await execAsync(
          `cd "${PROJECT_ROOT}" && python3 "${runDailyScript}"`,
          { maxBuffer: 10 * 1024 * 1024 } // 10MB buffer
        );
        result = {
          mode: 'daily',
          output: stdout,
          errors: stderr || null
        };
      } else {
        // Run weekly ops
        const { stdout, stderr } = await execAsync(
          `cd "${PROJECT_ROOT}" && python3 "${maintenanceScript}" weekly`,
          { maxBuffer: 10 * 1024 * 1024 }
        );
        result = {
          mode: 'weekly',
          output: stdout,
          errors: stderr || null
        };
      }

      // Check for daily_ops output directory
      const opsDir = path.join(automationEnginePath, 'daily_ops');
      const opsPackages = await fs.pathExists(opsDir) 
        ? (await fs.readdir(opsDir)).filter(f => !f.startsWith('.'))
        : [];

      return {
        success: true,
        mode,
        message: `Daily Ops Engine completed (${mode} mode)`,
        output: result.output,
        errors: result.errors,
        ops_packages: opsPackages,
        latest_package: opsPackages.length > 0 ? opsPackages[opsPackages.length - 1] : null,
        dashboard_opened: mode === 'daily' ? true : false // run_daily.py always opens dashboard for daily mode
      };
    } catch (error) {
      return {
        success: false,
        mode,
        error: error.message,
        stderr: error.stderr || null,
        stdout: error.stdout || null
      };
    }
  }
};

