class FormatDetector:
    def detect(self, text: str) -> str:
        """Return a simple detected format label."""
        if "<html" in text.lower():
            return "html"
        if text.strip().startswith("{") and text.strip().endswith("}"):
            return "json"
        return "text"