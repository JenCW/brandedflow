from pathlib import Path
from datetime import datetime
from .diff_utils import DiffUtils

class GitSimulator:
    """
    Generates commit previews for the dashboard.
    Does NOT perform commits — only simulates what would happen.
    """

    def __init__(self, repo_root: Path):
        self.repo_root = repo_root

    def build_preview(self, updates: dict):
        """
        `updates` is a dict: { file_path: proposed_new_content }
        Returns a commit preview dictionary for UI display.
        """
        changes = {}

        for rel_path, new_content in updates.items():
            file_path = self.repo_root / rel_path

            old_lines = []
            if file_path.exists():
                old_lines = file_path.read_text(errors="ignore").split("\n")

            new_lines = new_content.split("\n")
            diff = DiffUtils.unified_diff(old_lines, new_lines)

            changes[rel_path] = {
                "diff": diff,
                "old_exists": file_path.exists(),
                "old_size": len(old_lines),
                "new_size": len(new_lines),
            }

        commit_message = f"Daily Ops Commit Preview — {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

        return {
            "message": commit_message,
            "changes": changes,
            "timestamp": datetime.now().isoformat()
        }
