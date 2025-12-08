from pathlib import Path
import re
from status_tracker import StatusTracker
from conflict_detector import ConflictDetector
from decision_versioning import DecisionVersioning

class DecisionExtractor:
    def write(self, parsed_chats, trackers_path: Path):
        log_file = trackers_path / "decisions-log.md"
        conflicts_file = trackers_path / "conflicts.md"
        superseded_file = trackers_path / "superseded-decisions.md"
        seen = set()
        all_decisions = []

        # Extract all decisions with source file info
        decision_sources = []  # Track which file each decision came from
        for item in parsed_chats:
            for d in self._extract(item["text"]):
                if d not in seen:
                    seen.add(d)
                    all_decisions.append(d)
                    decision_sources.append((d, item["path"]))

        if not all_decisions:
            return

        # Register decisions with versioning system
        versioning = DecisionVersioning(trackers_path)
        for decision, source_file in decision_sources:
            versioning.register_decision(decision, source_file)

        # Detect conflicts
        conflict_detector = ConflictDetector()
        conflicts = conflict_detector.detect_conflicts(all_decisions, "decision")
        
        # Filter out done items
        status_tracker = StatusTracker(trackers_path)
        pending_decisions = status_tracker.filter_done(all_decisions, "decisions")

        # Identify superseded decisions
        superseded_decisions = []
        latest_decisions = []
        
        for decision in pending_decisions:
            if versioning.is_superseded(decision):
                superseding = versioning.get_superseding_decision(decision)
                if superseding:
                    superseded_decisions.append({
                        "old": decision,
                        "new": superseding["decision"],
                        "timestamp": superseding["timestamp"]
                    })
                    # Only add the latest version to pending
                    if superseding["decision"] not in [d for d in pending_decisions]:
                        latest_decisions.append(superseding["decision"])
            else:
                latest_decisions.append(decision)

        # Use latest versions only (remove superseded)
        final_decisions = latest_decisions if latest_decisions else pending_decisions

        # Write pending decisions (latest versions only)
        if final_decisions:
            with open(log_file, "a") as f:
                for d in final_decisions:
                    # Check if this is the latest version
                    latest = versioning.get_latest_version(d)
                    if latest and latest["decision"] == d:
                        f.write(f"- [ ] {d} (latest version)\n")
                    else:
                        f.write(f"- [ ] {d}\n")
        
        # Write conflicts if any
        if conflicts:
            conflict_lines = ["# Conflicts Detected\n\n"]
            for conflict in conflicts:
                conflict_lines.append(f"## Conflict Group ({len(conflict['items'])} items, {conflict['similarity']:.0%} similar)\n\n")
                for item in conflict["items"]:
                    latest = versioning.get_latest_version(item)
                    marker = " (latest)" if latest and latest["decision"] == item else ""
                    conflict_lines.append(f"- {item}{marker}\n")
                conflict_lines.append("\n")
            
            # Append to conflicts file
            with open(conflicts_file, "a") as f:
                f.write("\n".join(conflict_lines))
        
        # Write superseded decisions
        if superseded_decisions:
            superseded_lines = ["# Superseded Decisions\n\n"]
            superseded_lines.append("These decisions have been superseded by newer versions:\n\n")
            for item in superseded_decisions:
                superseded_lines.append(f"## Old Decision (Superseded)\n")
                superseded_lines.append(f"- {item['old']}\n\n")
                superseded_lines.append(f"## New Decision (Current)\n")
                superseded_lines.append(f"- {item['new']}\n")
                superseded_lines.append(f"- Timestamp: {item['timestamp']}\n\n")
            
            # Append to superseded file
            with open(superseded_file, "a") as f:
                f.write("\n".join(superseded_lines))

    def _extract(self, text: str):
        decisions = []
        for raw in text.split("\n"):
            s = raw.strip()
            low = s.lower()

            if not s:
                continue
            if low.startswith(("from ", "class ", "def ", "```", "<", "http")):
                continue

            # Explicit
            if "decision:" in low:
                decisions.append("Decision: " + s.split(":", 1)[1].strip())
                continue

            # Implicit decision patterns (plain conversation)
            if re.search(r"\b(we will|we\'ll|we are going to|we\'re going to|we decided|let’s|lets)\b", low):
                decisions.append("Decision: " + s)
                continue
            if re.search(r"\b(final answer|the plan is|we’re doing|we are doing|we will do)\b", low):
                decisions.append("Decision: " + s)
                continue
            if re.search(r"\b(choose|go with|stick with)\b", low) and ("we" in low or "let" in low):
                decisions.append("Decision: " + s)
                continue

        return decisions