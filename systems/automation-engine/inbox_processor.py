from pathlib import Path

class InboxProcessor:
    def __init__(self, inbox: Path):
        self.inbox = inbox

    def list_files(self):
        return [f for f in self.inbox.iterdir() if f.is_file()]