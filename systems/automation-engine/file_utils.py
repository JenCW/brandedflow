from pathlib import Path

def write(path: Path, content: str):
    path.write_text(content)

def append(path: Path, content: str):
    with open(path, "a") as f:
        f.write(content + "\n")