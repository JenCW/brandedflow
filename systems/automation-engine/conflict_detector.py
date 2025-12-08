"""
Conflict Detection for Decisions, Tasks, and Notes
Detects similar/conflicting items and flags them for review
"""

from pathlib import Path
from difflib import SequenceMatcher
import re

class ConflictDetector:
    def __init__(self):
        self.similarity_threshold = 0.7  # 70% similarity = potential conflict
        
    def detect_conflicts(self, items, item_type="decision"):
        """
        Detect conflicts in a list of items.
        Returns list of conflict groups.
        """
        conflicts = []
        processed = set()
        
        for i, item1 in enumerate(items):
            if i in processed:
                continue
                
            conflict_group = [item1]
            
            for j, item2 in enumerate(items[i+1:], start=i+1):
                if j in processed:
                    continue
                    
                similarity = self._calculate_similarity(item1, item2)
                
                if similarity >= self.similarity_threshold:
                    conflict_group.append(item2)
                    processed.add(j)
            
            if len(conflict_group) > 1:
                conflicts.append({
                    "type": item_type,
                    "items": conflict_group,
                    "similarity": self._calculate_similarity(conflict_group[0], conflict_group[1])
                })
                processed.add(i)
        
        return conflicts
    
    def _calculate_similarity(self, text1, text2):
        """Calculate similarity between two texts."""
        # Normalize texts
        norm1 = self._normalize_text(text1)
        norm2 = self._normalize_text(text2)
        
        # Use SequenceMatcher for similarity
        return SequenceMatcher(None, norm1, norm2).ratio()
    
    def _normalize_text(self, text):
        """Normalize text for comparison."""
        # Remove "Decision:", "Task:", "Note:" prefixes
        text = re.sub(r'^(Decision|Task|Note):\s*', '', text, flags=re.IGNORECASE)
        
        # Lowercase
        text = text.lower()
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        # Remove common words that don't affect meaning
        stop_words = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']
        words = [w for w in text.split() if w not in stop_words]
        
        return ' '.join(words)
    
    def flag_conflicts(self, decisions, tasks, notes):
        """Flag all conflicts and return flagged items."""
        flagged = {
            "decisions": [],
            "tasks": [],
            "notes": []
        }
        
        # Detect conflicts
        decision_conflicts = self.detect_conflicts(decisions, "decision")
        task_conflicts = self.detect_conflicts(tasks, "task")
        note_conflicts = self.detect_conflicts(notes, "note")
        
        # Flag items in conflicts
        for conflict in decision_conflicts:
            for item in conflict["items"]:
                flagged["decisions"].append({
                    "item": item,
                    "conflict": True,
                    "conflict_group": [i for i in conflict["items"] if i != item],
                    "similarity": conflict["similarity"]
                })
        
        for conflict in task_conflicts:
            for item in conflict["items"]:
                flagged["tasks"].append({
                    "item": item,
                    "conflict": True,
                    "conflict_group": [i for i in conflict["items"] if i != item],
                    "similarity": conflict["similarity"]
                })
        
        for conflict in note_conflicts:
            for item in conflict["items"]:
                flagged["notes"].append({
                    "item": item,
                    "conflict": True,
                    "conflict_group": [i for i in conflict["items"] if i != item],
                    "similarity": conflict["similarity"]
                })
        
        return flagged, {
            "decisions": decision_conflicts,
            "tasks": task_conflicts,
            "notes": note_conflicts
        }

