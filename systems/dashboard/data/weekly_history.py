from pathlib import Path
from datetime import datetime

class WeeklyHistory:
    def save(self, output_dir: Path, summary: str):
        """Save weekly summary into a dated history file."""
        fname = datetime.now().strftime("%Y-%m-%d") + ".md"
        (output_dir / fname).write_text(summary)