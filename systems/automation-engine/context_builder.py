from pathlib import Path

class ContextBuilder:
    def __init__(self, base: Path):
        self.base = base

    def build(self):
        """Placeholder context builder — expands later."""
        context = {
            "trackers": (self.base / "systems" / "trackers").exists(),
            "automation_engine": (self.base / "systems" / "automation-engine").exists(),
        }
        return context
        