class ClientActivity:
    def extract(self, text: str) -> list:
        """Very basic client activity detector."""
        return [line for line in text.split("\n") if "client" in line.lower()]