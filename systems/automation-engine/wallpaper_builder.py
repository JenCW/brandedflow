from pathlib import Path
from datetime import datetime

try:
    from PIL import Image, ImageDraw, ImageFont
except Exception:
    Image = None

from set_wallpaper import set_wallpaper

class WallpaperBuilder:
    def __init__(self):
        base = Path(__file__).resolve().parent.parent.parent
        self.trackers = base / "systems" / "trackers"
        self.wallpaper_dir = base / "systems" / "dashboard" / "wallpaper"
        self.wallpaper_dir.mkdir(parents=True, exist_ok=True)
        self.output_file = self.wallpaper_dir / "wallpaper.png"

    def build(self):
        if Image is None:
            self.output_file.write_text("PIL missing")
            return

        top3, decisions, tasks = self._load()

        w, h = 1920, 1080
        img = Image.new("RGB", (w, h), color=(20, 20, 22))
        draw = ImageDraw.Draw(img)

        font_big = ImageFont.load_default()
        font = ImageFont.load_default()

        now = datetime.now().strftime("%a %b %d • %I:%M %p")
        draw.text((60, 50), "BrandedFlow • Daily Focus", fill=(255, 255, 255), font=font_big)
        draw.text((60, 80), now, fill=(170, 170, 170), font=font)

        y = 140
        y = self._section(draw, "TOP 3", top3, 60, y)
        y = self._section(draw, "LATEST DECISIONS", decisions[:5], 60, y + 20)
        y = self._section(draw, "LATEST TASKS", tasks[:8], 60, y + 20)

        img.save(self.output_file)
        set_wallpaper(self.output_file)

    def _load(self):
        tasks = self._tail(self.trackers / "tasks.md", 20)
        decisions = self._tail(self.trackers / "decisions-log.md", 20)

        top3 = tasks[:3] if tasks else ["(no tasks yet)"]
        return top3, decisions, tasks

    def _tail(self, path: Path, n: int):
        if not path.exists():
            return []
        lines = [l.strip() for l in path.read_text(errors="ignore").split("\n") if l.strip()]
        # strip "- " bullets
        cleaned = [(l[2:] if l.startswith("- ") else l) for l in lines]
        return cleaned[-n:]

    def _section(self, draw, title, items, x, y):
        draw.text((x, y), title, fill=(120, 200, 255))
        y += 26
        for i, item in enumerate(items, start=1):
            draw.text((x, y), f"{i}. {item}", fill=(235, 235, 235))
            y += 22
        return y