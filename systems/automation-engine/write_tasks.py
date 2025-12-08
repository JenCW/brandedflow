from pathlib import Path

class TaskWriter:
    """
    Appends extracted tasks into the tasks.md tracker.
    """

    def __init__(self, trackers_root: Path):
        self.path = trackers_root / "tasks.md"

    def write(self, tasks):
        with open(self.path, "a") as f:
            for t in tasks:
                f.write(f"- {t}\n")
        return True