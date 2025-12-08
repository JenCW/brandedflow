import subprocess
from pathlib import Path

def set_wallpaper(image_path: Path):
    if not image_path.exists():
        return

    script = f'''
tell application "Finder"
  set desktop picture to POSIX file "{str(image_path)}"
end tell
'''
    subprocess.run(["osascript", "-e", script], check=False)