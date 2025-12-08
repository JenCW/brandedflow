class MetricsCollector:
    def collect(self, text: str) -> dict:
        """Basic keyword frequency metric."""
        return {
            "lines": len(text.split("\n")),
            "chars": len(text),
        }