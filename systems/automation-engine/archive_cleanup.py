from pathlib import Path
import shutil
from datetime import datetime, timedelta

class ArchiveCleanup:
    def __init__(self, archive_root: Path, days: int = 90):
        self.archive_root = archive_root
        self.days = days

    def clean(self):
        """Delete archive folders older than N days."""
        cutoff = datetime.now() - timedelta(days=self.days)

        for folder in self.archive_root.iterdir():
            if folder.is_dir():
                try:
                    folder_date = datetime.strptime(folder.name, "%Y-%m-%d")
                    if folder_date < cutoff:
                        shutil.rmtree(folder)
                except Exception:
                    continue
                