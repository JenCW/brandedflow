"""
Decision Versioning and Superseded Detection
Tracks decision versions and detects when decisions supersede each other
"""

from pathlib import Path
from datetime import datetime
import json
import re

class DecisionVersioning:
    def __init__(self, trackers_path: Path):
        self.trackers_path = trackers_path
        self.version_file = trackers_path / "decision_versions.json"
        self.versions = self._load_versions()
    
    def _load_versions(self):
        """Load decision versions from file."""
        if self.version_file.exists():
            try:
                with open(self.version_file, 'r') as f:
                    return json.load(f)
            except:
                pass
        return {}
    
    def _save_versions(self):
        """Save decision versions to file."""
        with open(self.version_file, 'w') as f:
            json.dump(self.versions, f, indent=2)
    
    def _normalize_decision(self, decision):
        """Normalize decision text for comparison."""
        # Remove "Decision:" prefix
        text = re.sub(r'^Decision:\s*', '', decision, flags=re.IGNORECASE)
        # Normalize whitespace
        text = ' '.join(text.split())
        return text.lower()
    
    def _extract_timestamp(self, file_path):
        """Extract timestamp from file path or modification time."""
        # Try to extract from filename (work-2024-12-08T21-59-30.txt)
        if 'work-' in file_path.name:
            try:
                # Extract timestamp from filename
                timestamp_str = file_path.name.replace('work-', '').replace('.txt', '')
                # Convert to datetime
                return datetime.fromisoformat(timestamp_str.replace('T', 'T').replace('-', ':'))
            except:
                pass
        
        # Fall back to file modification time
        try:
            return datetime.fromtimestamp(file_path.stat().st_mtime)
        except:
            return datetime.now()
    
    def register_decision(self, decision, source_file, context=None):
        """Register a decision with its source and timestamp."""
        normalized = self._normalize_decision(decision)
        timestamp = self._extract_timestamp(source_file)
        
        if normalized not in self.versions:
            self.versions[normalized] = []
        
        version = {
            "decision": decision,
            "timestamp": timestamp.isoformat(),
            "source_file": str(source_file),
            "context": context or "",
            "version": len(self.versions[normalized]) + 1
        }
        
        self.versions[normalized].append(version)
        self._save_versions()
        
        return version
    
    def get_latest_version(self, decision):
        """Get the latest version of a decision."""
        normalized = self._normalize_decision(decision)
        
        if normalized not in self.versions:
            return None
        
        versions = self.versions[normalized]
        if not versions:
            return None
        
        # Sort by timestamp (newest first)
        sorted_versions = sorted(versions, key=lambda v: v['timestamp'], reverse=True)
        return sorted_versions[0]
    
    def is_superseded(self, decision, compare_to=None):
        """Check if a decision is superseded by a newer version."""
        normalized = self._normalize_decision(decision)
        
        if normalized not in self.versions:
            return False
        
        versions = self.versions[normalized]
        if len(versions) <= 1:
            return False
        
        # Sort by timestamp
        sorted_versions = sorted(versions, key=lambda v: v['timestamp'], reverse=True)
        
        # Find this decision's version
        decision_timestamp = None
        for v in versions:
            if v['decision'] == decision:
                decision_timestamp = v['timestamp']
                break
        
        if not decision_timestamp:
            return False
        
        # Check if there's a newer version
        latest = sorted_versions[0]
        return latest['timestamp'] > decision_timestamp
    
    def get_superseding_decision(self, decision):
        """Get the decision that supersedes this one."""
        normalized = self._normalize_decision(decision)
        
        if normalized not in self.versions:
            return None
        
        versions = self.versions[normalized]
        if len(versions) <= 1:
            return None
        
        # Sort by timestamp (newest first)
        sorted_versions = sorted(versions, key=lambda v: v['timestamp'], reverse=True)
        
        # Find this decision
        for i, v in enumerate(sorted_versions):
            if v['decision'] == decision:
                # Return the one before it (newer)
                if i > 0:
                    return sorted_versions[0]  # Latest version
                return None
        
        return None
    
    def get_all_versions(self, decision):
        """Get all versions of a decision, sorted by timestamp."""
        normalized = self._normalize_decision(decision)
        
        if normalized not in self.versions:
            return []
        
        versions = self.versions[normalized]
        return sorted(versions, key=lambda v: v['timestamp'], reverse=True)

