from pathlib import Path

_UI_JUNK = ("skip to content", "open sidebar", "chatgpt", "copy", "share", "new chat")

class DailySummary:
    def write(self, parsed_chats, trackers_path: Path):
        summary_file = trackers_path / "daily-summary.md"
        notes_file = trackers_path / "notes.md"

        lines = ["# Daily Summary\n"]
        notes = []

        for item in parsed_chats:
            cleaned = self._strip_junk(item["text"])
            if cleaned.strip():
                lines.append("---")
                lines.append("\n".join(cleaned.split("\n")[:40]).strip())

            for ln in cleaned.split("\n"):
                if "note:" in ln.lower():
                    notes.append(ln.strip())

        summary_file.write_text("\n".join(lines).strip() + "\n")

        if notes:
            with open(notes_file, "a") as f:
                for n in notes:
                    f.write(f"- {n.split(':',1)[1].strip() if ':' in n else n}\n")

    def _strip_junk(self, text: str) -> str:
        out = []
        in_code = False
        for line in text.split("\n"):
            s = line.strip()
            low = s.lower()

            if "```" in low:
                in_code = not in_code
                continue
            if in_code:
                continue

            if not s:
                continue
            if low.startswith(_UI_JUNK):
                continue
            out.append(s)
        return "\n".join(out)
        