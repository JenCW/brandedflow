#!/bin/bash
# Weekly Runner for BrandedFlow Automation Engine
# Runs weekly summary + maintenance

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

echo "[weekly_runner] Starting weekly run at $(date)"

# Run weekly maintenance agent
python3 "$ROOT/automation-engine/maintenance_agent.py" weekly

# Build weekly summary (if your engine supports it)
if [ -f "$ROOT/automation-engine/weekly_summary.py" ]; then
    python3 "$ROOT/automation-engine/weekly_summary.py"
fi

echo "[weekly_runner] Weekly run complete at $(date)"
exit 0