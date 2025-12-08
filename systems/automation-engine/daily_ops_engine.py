from pathlib import Path
from datetime import datetime
import json

class DailyOpsEngine:
    """
    Collects chats, extracts decisions/tasks, builds the Daily Ops Package
    for Jen to approve inside the dashboard.
    """

    def __init__(self, trackers: Path, ops_dir: Path):
        self.trackers = trackers
        self.ops_dir = ops_dir
        self.ops_dir.mkdir(parents=True, exist_ok=True)

    def _load_text(self, f: Path):
        try:
            return f.read_text(errors="ignore")
        except:
            return ""

    def _extract_lines(self, text: str, marker: str):
        lines = []
        for ln in text.split("\n"):
            if marker in ln.lower():
                lines.append(ln.strip())
        return lines

    def extract(self, chat_files):
        """Extract proposed decisions + tasks + notes from raw chat files."""
        decisions = []
        tasks = []
        notes = []

        for f in chat_files:
            text = self._load_text(f)
            decisions.extend(self._extract_lines(text, "decision:"))
            tasks.extend(self._extract_lines(text, "task:"))
            notes.extend(self._extract_lines(text, "note:"))

        return decisions, tasks, notes

    def build_package(self, chat_files):
        """Create the daily_ops package outputs."""
        ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
        pkg_root = self.ops_dir / ts
        pkg_root.mkdir(exist_ok=True)

        decisions, tasks, notes = self.extract(chat_files)

        # Write proposed decisions
        (pkg_root / "proposed_decisions.md").write_text(
            "\n".join(decisions) or "(none)"
        )

        # Write proposed tasks
        (pkg_root / "proposed_tasks.md").write_text(
            "\n".join(tasks) or "(none)"
        )

        # Notes
        (pkg_root / "proposed_notes.md").write_text(
            "\n".join(notes) or "(none)"
        )

        # Empty placeholder for future document updates
        (pkg_root / "proposed_updates.md").write_text(
            "No document updates yet. (Engine hook ready)"
        )

        # Commit preview placeholder
        commit_preview = {
            "timestamp": ts,
            "decisions": decisions,
            "tasks": tasks,
            "notes": notes
        }
        (pkg_root / "git_commit_preview.json").write_text(
            json.dumps(commit_preview, indent=2)
        )

        return pkg_root
