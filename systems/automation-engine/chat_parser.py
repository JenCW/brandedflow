class ChatParser:
    def parse(self, text: str) -> list:
        """Split chat text into lines for downstream extractors."""
        return [line.strip() for line in text.split("\n") if line.strip()]