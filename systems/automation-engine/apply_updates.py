from pathlib import Path
from .git_simulator import GitSimulator
from .protected_files import ProtectedFiles

class UpdateApplier:
    """
    Applies approved updates from the Daily Ops Package.
    Only makes changes Jen has approved inside the dashboard.
    Protected files ALWAYS require explicit approval.
    """

    def __init__(self, repo_root: Path):
        self.repo_root = repo_root
        self.git = GitSimulator(repo_root)
        self.protected = ProtectedFiles(repo_root)

    def apply(self, approved_updates: dict, force_protected=False):
        """
        Applies approved updates.
        
        Args:
            approved_updates: { file_path (relative): new_content }
            force_protected: If True, allows updating protected files (use with caution)
            
        Returns:
            Dict of applied updates with status
        """
        applied = {}
        blocked = {}

        # Separate protected and unprotected files
        filtered = self.protected.filter_protected(approved_updates)
        
        # Apply unprotected files
        for rel_path, new_content in filtered["unprotected"].items():
            file_path = self.repo_root / rel_path
            try:
                file_path.parent.mkdir(parents=True, exist_ok=True)
                file_path.write_text(new_content)
                applied[rel_path] = "updated"
            except Exception as e:
                applied[rel_path] = f"ERROR: {e}"
        
        # Handle protected files
        if filtered["protected"]:
            if force_protected:
                # Force update protected files (explicit approval)
                for rel_path, new_content in filtered["protected"].items():
                    file_path = self.repo_root / rel_path
                    try:
                        file_path.parent.mkdir(parents=True, exist_ok=True)
                        file_path.write_text(new_content)
                        applied[rel_path] = "updated (protected - force approved)"
                    except Exception as e:
                        applied[rel_path] = f"ERROR: {e}"
            else:
                # Block protected files (require explicit approval)
                for rel_path in filtered["protected"]:
                    reason = self.protected.get_protection_reason(rel_path)
                    blocked[rel_path] = f"BLOCKED: {reason} (requires explicit approval - use force_protected=True)"

        return {
            "applied": applied,
            "blocked": blocked,
            "protected_count": len(filtered["protected"]),
            "unprotected_count": len(filtered["unprotected"])
        }

    def simulate_commit(self, approved_updates: dict):
        """
        Returns the simulated commit preview for the dashboard.
        """
        return self.git.build_preview(approved_updates)
