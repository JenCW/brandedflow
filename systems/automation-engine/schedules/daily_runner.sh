#!/bin/bash
# Daily Runner for BrandedFlow Automation Engine
# Executes the daily maintenance and ops package build

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"

echo "[daily_runner] Starting daily run at $(date)"

# Run daily maintenance agent
python3 "$ROOT/automation-engine/maintenance_agent.py" daily

# Run daily summary (if present)
if [ -f "$ROOT/automation-engine/daily_summary.py" ]; then
    python3 "$ROOT/automation-engine/daily_summary.py"
fi

# Trigger dashboard rebuild (if present)
if [ -f "$ROOT/automation-engine/dashboard_builder.py" ]; then
    python3 "$ROOT/automation-engine/dashboard_builder.py"
fi

echo "[daily_runner] Daily run complete at $(date)"