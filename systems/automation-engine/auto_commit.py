"""
Auto-Commit System
Automatically commits non-critical files as work is done.
Critical files are tracked and shown on dashboard until manually approved.
"""

from pathlib import Path
from datetime import datetime
import subprocess
import json
import sys

# Handle both relative and absolute imports
try:
    from .protected_files import ProtectedFiles
    from .git_commit_manager import GitCommitManager
except ImportError:
    # If running as script, use absolute import
    sys.path.insert(0, str(Path(__file__).parent))
    from protected_files import ProtectedFiles
    from git_commit_manager import GitCommitManager

class AutoCommit:
    """
    Automatically commits non-critical files.
    Tracks critical files for dashboard display.
    """
    
    def __init__(self, repo_root: Path):
        self.repo_root = Path(repo_root)
        self.protected = ProtectedFiles(repo_root)
        self.git = GitCommitManager(repo_root)
        self.critical_tracker = self.repo_root / "systems" / "trackers" / "critical_files_pending.json"
    
    def commit_non_critical(self, work_summary=None):
        """
        Automatically commit all non-critical files.
        Returns info about what was committed and what's pending.
        """
        # Get all changed files
        changed_files = self.git.get_changed_files()
        
        # Separate critical and non-critical
        non_critical = changed_files["unprotected"]
        critical = changed_files["protected"]
        
        # Track critical files for dashboard
        if critical:
            self._track_critical_files(critical)
        
        # Commit non-critical files if any
        if non_critical:
            commit_message = self._generate_commit_message(work_summary, non_critical)
            
            result = self.git.commit(
                commit_message=commit_message,
                include_protected=False,
                dry_run=False
            )
            
            return {
                "auto_committed": True,
                "files_committed": len(non_critical),
                "critical_files_pending": len(critical),
                "commit_message": commit_message,
                "result": result
            }
        else:
            return {
                "auto_committed": False,
                "files_committed": 0,
                "critical_files_pending": len(critical),
                "message": "No non-critical files to commit"
            }
    
    def _generate_commit_message(self, work_summary, files):
        """Generate commit message for auto-commits."""
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        if work_summary:
            return f"Auto-commit: {work_summary}\n\nTimestamp: {timestamp}"
        else:
            file_count = len(files)
            return f"Auto-commit: {file_count} non-critical files updated\n\nTimestamp: {timestamp}"
    
    def _track_critical_files(self, critical_files):
        """Track critical files that need manual approval."""
        # Load existing tracking
        if self.critical_tracker.exists():
            try:
                with open(self.critical_tracker, 'r') as f:
                    tracked = json.load(f)
            except:
                tracked = {}
        else:
            tracked = {}
        
        # Add new critical files
        for file_path in critical_files:
            if file_path not in tracked:
                tracked[file_path] = {
                    "first_seen": datetime.now().isoformat(),
                    "last_seen": datetime.now().isoformat(),
                    "status": "pending",
                    "reason": self.protected.get_protection_reason(file_path)
                }
            else:
                tracked[file_path]["last_seen"] = datetime.now().isoformat()
        
        # Save tracking
        with open(self.critical_tracker, 'w') as f:
            json.dump(tracked, f, indent=2)
    
    def get_pending_critical_files(self):
        """Get list of critical files pending manual approval."""
        if not self.critical_tracker.exists():
            return []
        
        try:
            with open(self.critical_tracker, 'r') as f:
                tracked = json.load(f)
            
            # Only return files that still exist and have changes
            pending = []
            current_changes = self.git.get_changed_files()["protected"]
            
            for file_path, info in tracked.items():
                if info["status"] == "pending" and file_path in current_changes:
                    pending.append({
                        "file": file_path,
                        "reason": info["reason"],
                        "first_seen": info["first_seen"],
                        "last_seen": info["last_seen"]
                    })
            
            return pending
        except:
            return []
    
    def mark_critical_approved(self, file_path):
        """Mark a critical file as approved (committed)."""
        if not self.critical_tracker.exists():
            return
        
        try:
            with open(self.critical_tracker, 'r') as f:
                tracked = json.load(f)
            
            if file_path in tracked:
                tracked[file_path]["status"] = "approved"
                tracked[file_path]["approved_at"] = datetime.now().isoformat()
            
            with open(self.critical_tracker, 'w') as f:
                json.dump(tracked, f, indent=2)
        except:
            pass

