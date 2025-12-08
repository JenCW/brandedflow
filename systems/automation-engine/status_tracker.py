"""
Status Tracker for Decisions, Tasks, and Notes
Tracks which items are done/pending
"""

from pathlib import Path
import json

class StatusTracker:
    def __init__(self, trackers_path: Path):
        self.trackers_path = trackers_path
        self.status_file = trackers_path / "item_status.json"
        self.status = self._load_status()
    
    def _load_status(self):
        """Load status from file."""
        if self.status_file.exists():
            try:
                with open(self.status_file, 'r') as f:
                    return json.load(f)
            except:
                pass
        return {
            "decisions": {},
            "tasks": {},
            "notes": {}
        }
    
    def _save_status(self):
        """Save status to file."""
        with open(self.status_file, 'w') as f:
            json.dump(self.status, f, indent=2)
    
    def _normalize_item(self, item):
        """Normalize item text for consistent key."""
        # Remove prefixes
        import re
        text = re.sub(r'^(Decision|Task|Note):\s*', '', item, flags=re.IGNORECASE)
        # Normalize whitespace
        text = ' '.join(text.split())
        return text.lower()
    
    def is_done(self, item, item_type):
        """Check if item is marked as done."""
        key = self._normalize_item(item)
        return self.status.get(item_type, {}).get(key, {}).get("done", False)
    
    def mark_done(self, item, item_type):
        """Mark item as done."""
        key = self._normalize_item(item)
        if item_type not in self.status:
            self.status[item_type] = {}
        if key not in self.status[item_type]:
            self.status[item_type][key] = {}
        self.status[item_type][key]["done"] = True
        self.status[item_type][key]["item"] = item
        self._save_status()
    
    def mark_pending(self, item, item_type):
        """Mark item as pending (not done)."""
        key = self._normalize_item(item)
        if item_type not in self.status:
            self.status[item_type] = {}
        if key not in self.status[item_type]:
            self.status[item_type][key] = {}
        self.status[item_type][key]["done"] = False
        self.status[item_type][key]["item"] = item
        self._save_status()
    
    def filter_done(self, items, item_type):
        """Filter out items that are marked as done."""
        return [item for item in items if not self.is_done(item, item_type)]
    
    def get_pending(self, items, item_type):
        """Get only pending (not done) items."""
        return self.filter_done(items, item_type)
    
    def get_all_status(self):
        """Get all status information."""
        return self.status.copy()

