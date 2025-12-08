from pathlib import Path

class ChatIngest:
    def __init__(self, inbox_path: Path):
        self.inbox_path = inbox_path

    def collect(self):
        """Return files AND .rtfd folders in the inbox."""
        if not self.inbox_path.exists():
            return []

        items = []
        for p in self.inbox_path.iterdir():
            if p.name == "Processed":
                continue
            if p.is_file():
                items.append(p)
            elif p.is_dir() and p.suffix.lower() == ".rtfd":
                items.append(p)
        return items