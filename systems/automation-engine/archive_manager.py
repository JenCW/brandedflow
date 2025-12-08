from pathlib import Path
import shutil
from datetime import datetime

class ArchiveManager:
    def __init__(self):
        base = Path(__file__).resolve().parent.parent.parent
        self.archive_root = base / "systems" / "trackers" / "archive"

    def archive_raw(self, files):
        """Move raw chat files into dated archive folders."""
        if not files:
            return

        today = datetime.now().strftime("%Y-%m-%d")
        dest = self.archive_root / today
        dest.mkdir(parents=True, exist_ok=True)

        for f in files:
            try:
                shutil.move(str(f), str(dest / f.name))
            except Exception as e:
                print(f"Error archiving {f}: {e}")
                