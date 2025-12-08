/**
 * Build Dashboard
 * Uses the Daily Ops Engine's dashboard builder
 */

const { exec } = require('child_process');
const { promisify } = require('util');
const path = require('path');
const fs = require('fs-extra');

const execAsync = promisify(exec);

module.exports = {
  description: 'Builds the dashboard using Daily Ops Engine dashboard builder',
  
  params: {
    mode: {
      type: 'string',
      required: false,
      default: 'daily',
      description: 'Dashboard mode: "daily" or "weekly"'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { mode = 'daily' } = params;

    if (!['daily', 'weekly'].includes(mode)) {
      throw new Error('Mode must be "daily" or "weekly"');
    }

    const automationEnginePath = path.join(PROJECT_ROOT, 'systems', 'automation-engine');
    const dashboardBuilderScript = path.join(automationEnginePath, 'dashboard_builder.py');

    // Create a temporary Python script to build dashboard
    const tempScript = path.join(PROJECT_ROOT, 'systems', 'automation-engine', 'temp_build_dashboard.py');
    
    const pythonCode = `
import sys
from pathlib import Path
import os
ROOT = Path("${PROJECT_ROOT}").resolve()
sys.path.insert(0, str(ROOT))

# Change to automation-engine directory for relative imports
AUTOMATION_DIR = Path("${PROJECT_ROOT}") / "systems" / "automation-engine"
os.chdir(str(AUTOMATION_DIR))
sys.path.insert(0, str(AUTOMATION_DIR))

from dashboard_builder import DashboardBuilder
from weekly_summary import WeeklySummary
import json

builder = DashboardBuilder()

try:
    if "${mode}" == "daily":
        builder.build_daily()
        result = {"success": True, "mode": "daily", "message": "Daily dashboard built"}
    else:
        # For weekly, build summary first, then dashboard
        BASE_DIR = ROOT
        TRACKERS = BASE_DIR / "systems" / "trackers"
        weekly = WeeklySummary()
        summary = weekly.build(TRACKERS)
        builder.build_weekly(summary)
        result = {"success": True, "mode": "weekly", "message": "Weekly dashboard built"}
    
    print(json.dumps(result))
except Exception as e:
    print(json.dumps({"success": False, "error": str(e)}))
    sys.exit(1)
`;

    try {
      // Write temp script
      await fs.writeFile(tempScript, pythonCode);

      // Run dashboard builder
      const { stdout, stderr } = await execAsync(
        `cd "${PROJECT_ROOT}" && python3 "${tempScript}"`,
        { maxBuffer: 10 * 1024 * 1024 }
      );

      // Clean up temp script
      await fs.remove(tempScript);

      const result = JSON.parse(stdout);

      // Check if dashboard HTML exists
      const dashboardPath = path.join(PROJECT_ROOT, 'systems', 'dashboard', 'html');
      const dashboardFiles = await fs.pathExists(dashboardPath)
        ? (await fs.readdir(dashboardPath)).filter(f => f.endsWith('.html'))
        : [];

      return {
        ...result,
        dashboard_files: dashboardFiles,
        dashboard_path: dashboardPath
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

