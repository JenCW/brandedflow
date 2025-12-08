class TextNormalizer:
    def normalize(self, text: str) -> str:
        """Basic normalization placeholder."""
        text = text.replace("\r", "")
        return "\n".join(line.strip() for line in text.split("\n"))
        