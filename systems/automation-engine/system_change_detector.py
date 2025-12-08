class SystemChangeDetector:
    def detect(self, text: str) -> list:
        """Identify lines describing system changes."""
        return [line for line in text.split("\n") if "updated" in line.lower() or "changed" in line.lower()]