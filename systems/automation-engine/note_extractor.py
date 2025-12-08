class NoteExtractor:
    def extract(self, text: str) -> list:
        """Extract lines marked as notes."""
        return [line.strip() for line in text.split("\n") if "note:" in line.lower()]