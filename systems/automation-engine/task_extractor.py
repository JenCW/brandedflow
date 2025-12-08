from pathlib import Path
import re
from status_tracker import StatusTracker
from conflict_detector import ConflictDetector

class TaskExtractor:
    def write(self, parsed_chats, trackers_path: Path):
        task_file = trackers_path / "tasks.md"
        conflicts_file = trackers_path / "conflicts.md"
        seen = set()
        all_tasks = []

        # Extract all tasks
        for item in parsed_chats:
            for t in self._extract(item["text"]):
                if t not in seen:
                    seen.add(t)
                    all_tasks.append(t)

        if not all_tasks:
            return

        # Detect conflicts
        conflict_detector = ConflictDetector()
        conflicts = conflict_detector.detect_conflicts(all_tasks, "task")
        
        # Filter out done items
        status_tracker = StatusTracker(trackers_path)
        pending_tasks = status_tracker.filter_done(all_tasks, "tasks")

        # Write pending tasks
        if pending_tasks:
            with open(task_file, "a") as f:
                for t in pending_tasks:
                    f.write(f"- [ ] {t}\n")
        
        # Write conflicts if any
        if conflicts:
            conflict_lines = []
            for conflict in conflicts:
                conflict_lines.append(f"## Task Conflict ({len(conflict['items'])} items, {conflict['similarity']:.0%} similar)\n\n")
                for item in conflict["items"]:
                    conflict_lines.append(f"- {item}\n")
                conflict_lines.append("\n")
            
            # Append to conflicts file
            with open(conflicts_file, "a") as f:
                f.write("\n".join(conflict_lines))

    def _extract(self, text: str):
        tasks = []
        for raw in text.split("\n"):
            s = raw.strip()
            low = s.lower()

            if not s:
                continue
            if low.startswith(("from ", "class ", "def ", "```", "<", "http")):
                continue

            # Explicit
            if "task:" in low:
                tasks.append("Task: " + s.split(":", 1)[1].strip())
                continue

            # Implicit tasks:
            # - lines starting with verbs / to-do phrasing
            if re.match(r"^(todo|to do|next|action|actions)\b[:\-]?\s*", low):
                tasks.append("Task: " + re.sub(r"^(todo|to do|next|action|actions)\b[:\-]?\s*", "", s, flags=re.I).strip())
                continue
            if re.search(r"\b(need to|you need to|we need to|do this|do that|build|create|write|move|fix|update|set up|schedule|run)\b", low):
                # avoid grabbing generic chat ui lines
                if any(x in low for x in ["skip to content", "open sidebar", "chatgpt"]):
                    continue
                tasks.append("Task: " + s)
                continue

        return tasks