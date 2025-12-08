from pathlib import Path

class SummaryEngine:
    def combine(self, sections: list) -> str:
        """Combine multiple text blocks into one clean summary."""
        out = ["# Combined Summary\n"]
        for section in sections:
            if section:
                out.append(section)
        return "\n\n".join(out)
        