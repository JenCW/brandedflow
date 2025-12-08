from pathlib import Path

class OpsConfig:
    """
    Central configuration for the BrandedFlow Automation Engine.
    All modules import from here instead of hard‑coding paths.
    """

    # --- ROOT DIRECTORIES ---
    ROOT = Path(__file__).resolve().parents[2]

    TRACKERS = ROOT / "systems" / "trackers"
    AUTOMATION = ROOT / "systems" / "automation-engine"
    DAILY_OPS_DIR = AUTOMATION / "daily_ops"
    DASHBOARD_DIR = ROOT / "systems" / "dashboard" / "html"

    # --- DASHBOARD APP PATH ---
    DASHBOARD_APP = Path("/Users/jencortez-walters/Desktop/Dashboard.app")

    # --- LOG LOCATIONS ---
    LOG_FILE = ROOT / "dailyops.log"
    ERROR_LOG_FILE = ROOT / "dailyops_error.log"

    # --- SCHEDULE SETTINGS ---
    DAILY_HOUR = 8
    DAILY_MINUTE = 0

    # --- FILES FOR DAILY OPS PACKAGE ---
    PROPOSED_DECISIONS = "proposed_decisions.md"
    PROPOSED_TASKS = "proposed_tasks.md"
    PROPOSED_NOTES = "proposed_notes.md"
    PROPOSED_UPDATES = "proposed_updates.md"
    COMMIT_PREVIEW = "git_commit_preview.json"

    # --- PYTHON RUNTIME ---
    PYTHON = "/usr/bin/python3"

    @classmethod
    def summary(cls):
        """Useful for debugging — prints resolved paths."""
        return {
            "ROOT": str(cls.ROOT),
            "TRACKERS": str(cls.TRACKERS),
            "AUTOMATION": str(cls.AUTOMATION),
            "DAILY_OPS_DIR": str(cls.DAILY_OPS_DIR),
            "DASHBOARD_DIR": str(cls.DASHBOARD_DIR),
            "DASHBOARD_APP": str(cls.DASHBOARD_APP),
            "LOG_FILE": str(cls.LOG_FILE),
            "ERROR_LOG_FILE": str(cls.ERROR_LOG_FILE),
        }
