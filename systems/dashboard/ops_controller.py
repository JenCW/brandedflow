from pathlib import Path
import json
from systems.automation_engine.daily_ops_engine import DailyOpsEngine  # pyright: ignore[reportMissingImports]
from systems.automation_engine.apply_updates import UpdateApplier  # pyright: ignore[reportMissingImports]

class OpsController:
    """
    Connects the automation engine with the dashboard UI.
    Loads the latest Daily Ops Package, exposes data for the dashboard,
    and handles approval actions from the UI.
    """

    def __init__(self, repo_root: Path):
        self.repo_root = repo_root
        self.trackers = repo_root / "systems" / "trackers"
        self.ops_dir = repo_root / "systems" / "automation-engine" / "daily_ops"
        self.ops_dir.mkdir(exist_ok=True)

        self.applier = UpdateApplier(repo_root)

    def get_latest_ops_package(self):
        """Returns the most recent package directory."""
        packages = sorted(self.ops_dir.iterdir(), key=lambda p: p.name, reverse=True)
        return packages[0] if packages else None

    def load_ops_data(self):
        """Load and return all proposed operations for the dashboard."""
        pkg = self.get_latest_ops_package()
        if not pkg:
            return {"error": "No ops packages found."}

        data = {}

        def load_file(name):
            f = pkg / name
            return f.read_text(errors="ignore") if f.exists() else "(missing)"

        data["proposed_decisions"] = load_file("proposed_decisions.md")
        data["proposed_tasks"] = load_file("proposed_tasks.md")
        data["proposed_notes"] = load_file("proposed_notes.md")
        data["proposed_updates"] = load_file("proposed_updates.md")

        # load commit preview
        commit_file = pkg / "git_commit_preview.json"
        if commit_file.exists():
            data["commit_preview"] = json.loads(commit_file.read_text())
        else:
            data["commit_preview"] = {}

        data["package_name"] = pkg.name

        return data

    def approve_updates(self, updates: dict):
        """
        Apply updates that Jen approved in the dashboard.
        updates = { relative_path: new_content }
        """
        return self.applier.apply(updates)

    def simulate_commit(self, updates: dict):
        """
        Generate a simulated commit preview for approved updates.
        """
        return self.applier.simulate_commit(updates)
