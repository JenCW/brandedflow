"""
File Cleanup System
Prevents file accumulation, detects conflicts, handles superseded files
"""

from pathlib import Path
from datetime import datetime, timedelta
import json
import sys

# Handle both relative and absolute imports
try:
    from .conflict_detector import ConflictDetector
    from .decision_versioning import DecisionVersioning
    from .archive_manager import ArchiveManager
except ImportError:
    # If running as script, use absolute import
    sys.path.insert(0, str(Path(__file__).parent))
    from conflict_detector import ConflictDetector
    from decision_versioning import DecisionVersioning
    from archive_manager import ArchiveManager

class FileCleanup:
    """
    Manages file cleanup to prevent accumulation of conflicting/outdated files.
    """
    
    def __init__(self, repo_root: Path, trackers_path: Path):
        self.repo_root = Path(repo_root)
        self.trackers = Path(trackers_path)
        self.archive = ArchiveManager()
        self.conflict_detector = ConflictDetector()
        self.decision_versioning = DecisionVersioning(trackers_path)
        
        # Cleanup config
        self.cleanup_config = {
            "archive_superseded_after_days": 7,  # Archive superseded files after 7 days
            "archive_conflicts_after_days": 14,  # Archive conflicts after 14 days
            "max_duplicate_files": 3,  # Max duplicate files before warning
        }
    
    def detect_and_handle_conflicts(self):
        """
        Detect conflicts and flag them for resolution.
        Returns list of conflicts found.
        """
        conflicts = []
        
        # Check decision conflicts
        decisions_file = self.trackers / "decisions-log.md"
        if decisions_file.exists():
            decisions = self._read_items(decisions_file)
            decision_conflicts = self.conflict_detector.detect_conflicts(decisions, "decision")
            conflicts.extend(decision_conflicts)
        
        # Check task conflicts
        tasks_file = self.trackers / "tasks.md"
        if tasks_file.exists():
            tasks = self._read_items(tasks_file)
            task_conflicts = self.conflict_detector.detect_conflicts(tasks, "task")
            conflicts.extend(task_conflicts)
        
        # Write conflicts to file
        if conflicts:
            self._write_conflicts(conflicts)
        
        return conflicts
    
    def handle_superseded_files(self):
        """
        Identify and archive superseded files.
        Returns list of superseded files.
        """
        superseded = []
        
        # Get all decision versions
        if hasattr(self.decision_versioning, 'versions'):
            for normalized, versions in self.decision_versioning.versions.items():
                if len(versions) > 1:
                    # Sort by timestamp
                    sorted_versions = sorted(versions, key=lambda v: v.get('timestamp', ''), reverse=True)
                    # All but the latest are superseded
                    for old_version in sorted_versions[1:]:
                        if self._should_archive(old_version.get("timestamp")):
                            superseded.append({
                                "decision": old_version.get("decision", ""),
                                "timestamp": old_version.get("timestamp", ""),
                                "superseded_at": old_version.get("timestamp", "")
                            })
        
        # Archive superseded files
        if superseded:
            self._archive_superseded(superseded)
        
        return superseded
    
    def detect_duplicate_files(self):
        """
        Detect duplicate or similar files that might conflict.
        Returns list of potential duplicates.
        """
        duplicates = []
        
        # Check for files with similar names
        # This is a simple check - could be enhanced
        files_by_base = {}
        
        for file_path in self.repo_root.rglob("*"):
            if file_path.is_file() and not self._is_ignored(file_path):
                base_name = file_path.stem.lower()
                if base_name not in files_by_base:
                    files_by_base[base_name] = []
                files_by_base[base_name].append(file_path)
        
        # Find duplicates
        for base_name, files in files_by_base.items():
            if len(files) > self.cleanup_config["max_duplicate_files"]:
                duplicates.append({
                    "base_name": base_name,
                    "files": [str(f.relative_to(self.repo_root)) for f in files],
                    "count": len(files)
                })
        
        return duplicates
    
    def cleanup_old_files(self, days_old=30):
        """
        Clean up old temporary or unused files.
        """
        cleaned = []
        cutoff_date = datetime.now() - timedelta(days=days_old)
        
        # Check for old temp files
        temp_patterns = ["*.tmp", "*.bak", "*.old"]
        
        for file_path in self.repo_root.rglob("*"):
            if file_path.is_file() and not self._is_ignored(file_path):
                # Check if it's a temp file
                is_temp = any(file_path.name.endswith(ext) for ext in [".tmp", ".bak", ".old"]) or file_path.name.endswith("~")
                
                if is_temp:
                    # Check file modification time
                    try:
                        mtime = datetime.fromtimestamp(file_path.stat().st_mtime)
                        if mtime < cutoff_date:
                            # Archive instead of delete
                            archive_dir = self.trackers / "archive" / "old_files"
                            archive_dir.mkdir(parents=True, exist_ok=True)
                            dest = archive_dir / file_path.name
                            if not dest.exists():
                                import shutil
                                shutil.move(str(file_path), str(dest))
                                cleaned.append(str(file_path.relative_to(self.repo_root)))
                    except Exception as e:
                        pass  # Skip if can't process
        
        return cleaned
    
    def run_cleanup(self):
        """
        Run full cleanup process.
        Returns summary of cleanup actions.
        """
        summary = {
            "conflicts_detected": [],
            "superseded_archived": [],
            "duplicates_found": [],
            "old_files_cleaned": [],
            "timestamp": datetime.now().isoformat()
        }
        
        # Detect conflicts
        conflicts = self.detect_and_handle_conflicts()
        summary["conflicts_detected"] = conflicts
        
        # Handle superseded
        superseded = self.handle_superseded_files()
        summary["superseded_archived"] = superseded
        
        # Detect duplicates
        duplicates = self.detect_duplicate_files()
        summary["duplicates_found"] = duplicates
        
        # Clean old files
        old_files = self.cleanup_old_files()
        summary["old_files_cleaned"] = old_files
        
        # Write cleanup report
        self._write_cleanup_report(summary)
        
        return summary
    
    def _read_items(self, file_path: Path):
        """Read items from a markdown file."""
        if not file_path.exists():
            return []
        
        lines = file_path.read_text(errors="ignore").split("\n")
        items = []
        for line in lines:
            line = line.strip()
            if line and (line.startswith("- ") or line.startswith("* ")):
                items.append(line[2:].strip())
        return items
    
    def _write_conflicts(self, conflicts):
        """Write conflicts to conflicts.md."""
        conflicts_file = self.trackers / "conflicts.md"
        
        lines = []
        for conflict in conflicts:
            lines.append(f"## {conflict['type'].title()} Conflict ({len(conflict['items'])} items, {conflict['similarity']:.0%} similar)\n")
            for item in conflict["items"]:
                lines.append(f"- {item}\n")
            lines.append("\n")
        
        conflicts_file.write_text("".join(lines))
    
    def _should_archive(self, timestamp_str):
        """Check if file should be archived based on age."""
        if not timestamp_str:
            return False
        
        try:
            timestamp = datetime.fromisoformat(timestamp_str)
            age = datetime.now() - timestamp
            return age.days >= self.cleanup_config["archive_superseded_after_days"]
        except:
            return False
    
    def _archive_superseded(self, superseded):
        """Archive superseded items."""
        # Archive to superseded folder
        archive_dir = self.trackers / "archive" / "superseded"
        archive_dir.mkdir(parents=True, exist_ok=True)
        
        # Write superseded items to archive
        archive_file = archive_dir / f"superseded-{datetime.now().strftime('%Y-%m-%d')}.json"
        
        if archive_file.exists():
            try:
                with open(archive_file, 'r') as f:
                    existing = json.load(f)
            except:
                existing = []
        else:
            existing = []
        
        existing.extend(superseded)
        
        with open(archive_file, 'w') as f:
            json.dump(existing, f, indent=2)
    
    def _write_cleanup_report(self, summary):
        """Write cleanup report."""
        report_file = self.trackers / "cleanup-report.json"
        with open(report_file, 'w') as f:
            json.dump(summary, f, indent=2)
    
    def _is_ignored(self, file_path: Path):
        """Check if file should be ignored."""
        ignored_patterns = [
            ".git",
            "node_modules",
            "__pycache__",
            ".DS_Store",
            "*.pyc",
            "archive",
            "Processed"
        ]
        
        path_str = str(file_path)
        for pattern in ignored_patterns:
            if pattern in path_str:
                return True
        return False

