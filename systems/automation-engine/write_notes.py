from pathlib import Path
from status_tracker import StatusTracker
from conflict_detector import ConflictDetector

class NoteWriter:
    """
    Appends extracted notes into the notes.md tracker.
    """

    def __init__(self, trackers_root: Path):
        self.path = trackers_root / "notes.md"

    def write(self, notes):
        if not notes:
            return True
        
        # Detect conflicts
        conflict_detector = ConflictDetector()
        conflicts = conflict_detector.detect_conflicts(notes, "note")
        
        # Filter out done items
        status_tracker = StatusTracker(self.path.parent)
        pending_notes = status_tracker.filter_done(notes, "notes")
        
        # Write pending notes
        if pending_notes:
            with open(self.path, "a") as f:
                for n in pending_notes:
                    f.write(f"- [ ] {n}\n")
        
        # Write conflicts if any
        if conflicts:
            conflicts_file = self.path.parent / "conflicts.md"
            conflict_lines = []
            for conflict in conflicts:
                conflict_lines.append(f"## Note Conflict ({len(conflict['items'])} items, {conflict['similarity']:.0%} similar)\n\n")
                for item in conflict["items"]:
                    conflict_lines.append(f"- {item}\n")
                conflict_lines.append("\n")
            
            # Append to conflicts file
            with open(conflicts_file, "a") as f:
                f.write("\n".join(conflict_lines))
        
        return True