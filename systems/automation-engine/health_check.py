from pathlib import Path
import shutil

class HealthCheck:
    """
    Lightweight system check for BrandedFlow's automation engine.
    Ensures required folders, files, and executables are available.
    """

    def __init__(self):
        self.root = Path(__file__).resolve().parents[2]
        self.issues = []

    def check_path(self, label, path: Path):
        if not path.exists():
            self.issues.append(f"[MISSING] {label}: {path}")
        return path.exists()

    def run(self):
        # Required directories
        trackers = self.root / "systems" / "trackers"
        automation = self.root / "systems" / "automation-engine"
        dashboard = self.root / "systems" / "dashboard"

        self.check_path("TRACKERS DIR", trackers)
        self.check_path("AUTOMATION DIR", automation)
        self.check_path("DASHBOARD DIR", dashboard)

        # Required engine files
        required_files = [
            automation / "daily_ops_engine.py",
            automation / "maintenance_agent.py",
            automation / "apply_updates.py",
            automation / "git_simulator.py",
        ]

        for file in required_files:
            self.check_path(f"ENGINE FILE", file)

        # Dashboard app check
        dashboard_app = Path("/Users/jencortez-walters/Desktop/Dashboard.app")
        self.check_path("DASHBOARD.APP", dashboard_app)

        # Python binary check
        python = shutil.which("python3")
        if not python:
            self.issues.append("[MISSING] python3 executable not found")

        return self.issues or ["OK — All systems healthy."]