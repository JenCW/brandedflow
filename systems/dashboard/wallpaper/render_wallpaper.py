from pathlib import Path
import shutil

class WallpaperRenderer:
    """
    Ensures the generated wallpaper.png is ready for macOS wallpaper use.
    """

    def __init__(self):
        root = Path(__file__).resolve().parents[2]
        self.wallpaper_src = root / "systems" / "dashboard" / "wallpaper" / "wallpaper.png"
        self.rendered = root / "systems" / "dashboard" / "wallpaper" / "rendered_wallpaper.png"

    def render(self):
        if not self.wallpaper_src.exists():
            return "[WallpaperRenderer] ERROR: wallpaper.png not found."

        try:
            shutil.copy(self.wallpaper_src, self.rendered)
            return f"[WallpaperRenderer] Rendered wallpaper at {self.rendered}"
        except Exception as e:
            return f"[WallpaperRenderer] ERROR: {e}"