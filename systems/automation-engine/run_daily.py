#!/usr/bin/env python3
import subprocess
from pathlib import Path
from datetime import datetime

ROOT = Path(__file__).resolve().parents[2]
TRACKERS = ROOT / "systems" / "trackers"
OPS_DIR = ROOT / "systems" / "automation-engine" / "daily_ops"
DASHBOARD_APP = Path("/Users/jencortez-walters/Desktop/Dashboard.app")

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[run_daily] {ts} — {msg}")

def run_daily_ops():
    log("Starting Daily Ops Engine")
    maintenance_script = ROOT / "systems" / "automation-engine" / "maintenance_agent.py"
    subprocess.run(["python3", str(maintenance_script), "daily"])
    log("Daily Ops Package generated.")

def open_dashboard():
    if DASHBOARD_APP.exists():
        subprocess.run(["open", str(DASHBOARD_APP)])
        log("Dashboard.app launched.")
    else:
        log(f"Dashboard app not found at: {DASHBOARD_APP}")

def main():
    log("Running daily workflow…")
    run_daily_ops()
    open_dashboard()
    log("Done.")

if __name__ == "__main__":
    main()
