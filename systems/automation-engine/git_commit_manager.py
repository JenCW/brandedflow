"""
Git Commit Manager
Handles git commits with proper messages, protected file checks, and commit previews
"""

from pathlib import Path
from datetime import datetime
import subprocess
import json
import sys

# Handle both relative and absolute imports
try:
    from .protected_files import ProtectedFiles
except ImportError:
    # If running as script, use absolute import
    sys.path.insert(0, str(Path(__file__).parent))
    from protected_files import ProtectedFiles

class GitCommitManager:
    """
    Manages git commits with safety checks and proper messaging.
    """
    
    def __init__(self, repo_root: Path):
        self.repo_root = Path(repo_root)
        self.protected = ProtectedFiles(repo_root)
    
    def get_status(self):
        """Get current git status."""
        try:
            result = subprocess.run(
                ["git", "status", "--short"],
                cwd=self.repo_root,
                capture_output=True,
                text=True,
                check=False
            )
            return result.stdout.strip().split("\n") if result.stdout.strip() else []
        except Exception as e:
            return [f"ERROR: {e}"]
    
    def get_changed_files(self):
        """Get list of changed files."""
        status_lines = self.get_status()
        files = {
            "modified": [],
            "added": [],
            "deleted": [],
            "protected": [],
            "unprotected": []
        }
        
        for line in status_lines:
            if line.startswith("ERROR"):
                continue
            
            status = line[:2].strip()
            file_path = line[3:].strip()
            
            if "M" in status:
                files["modified"].append(file_path)
            if "A" in status or "??" in status:
                files["added"].append(file_path)
            if "D" in status:
                files["deleted"].append(file_path)
            
            # Check if protected
            if self.protected.is_protected(file_path):
                files["protected"].append(file_path)
            else:
                files["unprotected"].append(file_path)
        
        return files
    
    def generate_commit_message(self, work_summary=None, decisions=None, tasks=None):
        """
        Generate a commit message based on work done.
        
        Args:
            work_summary: Summary of work from work logs
            decisions: List of decisions made
            tasks: List of tasks completed
        """
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        
        # Build commit message
        message_parts = []
        
        if work_summary:
            message_parts.append(f"Work: {work_summary}")
        
        if decisions:
            message_parts.append(f"Decisions: {len(decisions)}")
            for d in decisions[:3]:  # First 3 decisions
                clean_d = d.replace("Decision: ", "").strip()
                if len(clean_d) > 60:
                    clean_d = clean_d[:57] + "..."
                message_parts.append(f"  - {clean_d}")
            if len(decisions) > 3:
                message_parts.append(f"  ... and {len(decisions) - 3} more")
        
        if tasks:
            message_parts.append(f"Tasks: {len(tasks)} completed")
        
        if not message_parts:
            message_parts.append("Daily updates")
        
        message = "\n".join(message_parts)
        message += f"\n\nTimestamp: {timestamp}"
        
        return message
    
    def create_commit_preview(self, commit_message=None, include_protected=False):
        """
        Create a commit preview showing what would be committed.
        
        Args:
            commit_message: Custom commit message (optional)
            include_protected: Whether to include protected files in preview
        """
        changed_files = self.get_changed_files()
        
        # Filter protected files if not including them
        files_to_commit = []
        if include_protected:
            files_to_commit = (changed_files["modified"] + 
                             changed_files["added"] + 
                             changed_files["deleted"])
        else:
            files_to_commit = changed_files["unprotected"]
        
        if not commit_message:
            commit_message = self.generate_commit_message()
        
        preview = {
            "message": commit_message,
            "files": {
                "total": len(files_to_commit),
                "modified": [f for f in changed_files["modified"] if f in files_to_commit],
                "added": [f for f in changed_files["added"] if f in files_to_commit],
                "deleted": [f for f in changed_files["deleted"] if f in files_to_commit],
                "protected": changed_files["protected"] if not include_protected else [],
                "excluded_protected": len(changed_files["protected"]) if not include_protected else 0
            },
            "timestamp": datetime.now().isoformat(),
            "warning": "Protected files excluded. Use include_protected=True to include them." if changed_files["protected"] and not include_protected else None
        }
        
        return preview
    
    def commit(self, commit_message=None, include_protected=False, dry_run=False):
        """
        Create a git commit.
        
        Args:
            commit_message: Custom commit message (optional)
            include_protected: Whether to include protected files
            dry_run: If True, only show what would be committed
            
        Returns:
            Dict with commit result
        """
        changed_files = self.get_changed_files()
        
        # Filter files
        files_to_commit = []
        protected_files = []
        
        if include_protected:
            files_to_commit = (changed_files["modified"] + 
                             changed_files["added"] + 
                             changed_files["deleted"])
        else:
            files_to_commit = changed_files["unprotected"]
            protected_files = changed_files["protected"]
        
        if not files_to_commit:
            return {
                "success": False,
                "message": "No files to commit",
                "protected_files": protected_files
            }
        
        if not commit_message:
            commit_message = self.generate_commit_message()
        
        if dry_run:
            return {
                "success": True,
                "dry_run": True,
                "message": commit_message,
                "files": files_to_commit,
                "protected_files": protected_files,
                "would_commit": len(files_to_commit)
            }
        
        # Stage files
        try:
            for file_path in files_to_commit:
                subprocess.run(
                    ["git", "add", file_path],
                    cwd=self.repo_root,
                    check=True,
                    capture_output=True
                )
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "error": f"Failed to stage files: {e.stderr.decode()}"
            }
        
        # Commit
        try:
            result = subprocess.run(
                ["git", "commit", "-m", commit_message],
                cwd=self.repo_root,
                capture_output=True,
                text=True,
                check=True
            )
            
            return {
                "success": True,
                "message": commit_message,
                "files_committed": len(files_to_commit),
                "protected_files_excluded": len(protected_files),
                "commit_output": result.stdout,
                "files": files_to_commit
            }
        except subprocess.CalledProcessError as e:
            return {
                "success": False,
                "error": f"Failed to commit: {e.stderr}",
                "files_staged": files_to_commit
            }

