from pathlib import Path

class DecisionWriter:
    """
    Appends extracted decisions into the decisions-log.md tracker.
    """

    def __init__(self, trackers_root: Path):
        self.path = trackers_root / "decisions-log.md"

    def write(self, decisions):
        with open(self.path, "a") as f:
            for d in decisions:
                f.write(f"- {d}\n")
        return True