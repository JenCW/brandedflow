from pathlib import Path

class UnfinishedExtractor:
    def extract(self, tasks: list) -> list:
        """Return tasks that are incomplete — placeholder logic."""
        return [t for t in tasks if "done" not in t.lower()]
        