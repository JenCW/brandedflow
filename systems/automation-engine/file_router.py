from pathlib import Path
import shutil
import datetime

class FileRouter:
    """
    Routes files from the inbox (Desktop Conversations folder)
    into the processed folder for ingestion by the Daily Ops Engine.
    """

    def __init__(self, inbox: Path, processed: Path):
        self.inbox = inbox
        self.processed = processed

    def move_to_processed(self, files):
        """
        Copy files into /processed, timestamp them,
        and return the list of successfully routed paths.
        """
        routed = []

        for f in files:
            ts = datetime.datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
            new_name = f"{ts}__{f.name}"
            target = self.processed / new_name

            try:
                shutil.copy(str(f), str(target))
                routed.append(target)
            except Exception as e:
                print(f"[FileRouter] ERROR copying {f}: {e}")

        return routed