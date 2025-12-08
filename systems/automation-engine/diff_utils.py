from pathlib import Path

class DiffUtils:
    """
    Generates simple, readable diff previews for Jen's dashboard.
    Shows added/removed/unchanged lines without applying any changes.
    """

    @staticmethod
    def load(path: Path):
        """Load file text or return empty string."""
        try:
            return path.read_text(errors="ignore").split("\n")
        except:
            return []

    @staticmethod
    def unified_diff(old_lines, new_lines):
        """
        Create a lightweight unified-style diff.
        Added lines start with '+'
        Removed lines start with '-'
        Unchanged lines are omitted unless needed for context.
        """
        diff = []
        old_len = len(old_lines)
        new_len = len(new_lines)
        max_len = max(old_len, new_len)

        for i in range(max_len):
            old = old_lines[i] if i < old_len else None
            new = new_lines[i] if i < new_len else None

            if old == new:
                continue  # unchanged, no noise
            if old is None and new is not None:
                diff.append(f"+ {new}")
            elif new is None and old is not None:
                diff.append(f"- {old}")
            else:
                diff.append(f"- {old}")
                diff.append(f"+ {new}")

        return "\n".join(diff) if diff else "(no changes)"

    @staticmethod
    def diff_files(old_path: Path, new_path: Path):
        """
        Generate a diff preview between two file paths.
        """
        old = DiffUtils.load(old_path)
        new = DiffUtils.load(new_path)
        return DiffUtils.unified_diff(old, new)
