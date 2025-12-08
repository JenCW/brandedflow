from pathlib import Path

class WeeklySummary:
    def build(self, trackers_path: Path):
        """Combine week data into a single summary string."""
        summary_file = trackers_path / "weekly-summary.md"

        lines = ["# Weekly Summary\n"]

        # Pull from decisions, tasks, and daily summaries
        for name in ["decisions-log.md", "tasks.md", "daily-summary.md"]:
            fpath = trackers_path / name
            if fpath.exists():
                lines.append(f"\n## {name}")
                lines.append(fpath.read_text())

        output = "\n".join(lines)

        with open(summary_file, "w") as f:
            f.write(output)

        return output
        