import subprocess
from pathlib import Path
from text_normalizer import TextNormalizer
from format_detector import FormatDetector

class ConversationDigest:
    def __init__(self):
        self.normalizer = TextNormalizer()
        self.detector = FormatDetector()

    def process(self, files):
        output = []
        for file_path in files:
            raw = self._read_any(file_path)
            if not raw.strip():
                continue
            fmt = self.detector.detect(raw)
            cleaned = self._clean(raw)
            output.append({"path": file_path, "format": fmt, "text": cleaned})
        return output

    def _read_any(self, path: Path) -> str:
        if path.is_file():
            return path.read_text(errors="ignore")

        if path.is_dir() and path.suffix.lower() == ".rtfd":
            out = path.parent / f"{path.stem}.txt"
            subprocess.run(["textutil", "-convert", "txt", str(path), "-output", str(out)], check=False)
            return out.read_text(errors="ignore") if out.exists() else ""

        return ""

    def _clean(self, text: str) -> str:
        return self.normalizer.normalize(text)