from pathlib import Path

class LogIngest:
    def __init__(self, logs_path: Path):
        self.logs_path = logs_path

    def read_logs(self):
        """Return all log file contents as text."""
        output = []

        if not self.logs_path.exists():
            return output

        for f in self.logs_path.iterdir():
            if f.is_file() and f.suffix in [".log", ".txt"]:
                try:
                    output.append(f.read_text(errors="ignore"))
                except Exception as e:
                    print(f"Error reading log {f}: {e}")

        return output
        