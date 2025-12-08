from pathlib import Path

def safe_read(path: Path) -> str:
    try:
        return path.read_text()
    except:
        return ""