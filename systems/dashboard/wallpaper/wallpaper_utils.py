import json
from pathlib import Path
from textwrap import wrap
from PIL import Image, ImageDraw, ImageFont

class WallpaperUtils:
    """
    Shared helpers for wallpaper generation.
    """

    @staticmethod
    def load_template(path: Path):
        """Load JSON template safely."""
        if not path.exists():
            raise FileNotFoundError(f"Template not found: {path}")

        with open(path, "r") as f:
            return json.load(f)

    @staticmethod
    def load_font(size=24):
        """Attempt to load a system font; fall back to default."""
        try:
            return ImageFont.truetype("Arial.ttf", size)
        except:
            return ImageFont.load_default()

    @staticmethod
    def draw_text(draw: ImageDraw.Draw, text, x, y, font, color="#000000", max_width=40):
        """Draw wrapped multiline text."""
        lines = wrap(text, max_width)
        for line in lines:
            draw.text((x, y), line, font=font, fill=color)
            y += font.size + 4  # line spacing
        return y

    @staticmethod
    def draw_section(draw, title, content, x, y, font_title, font_body, width):
        """Generic helper to draw a titled section box."""
        # Title
        draw.text((x, y), title, font=font_title, fill="#222222")
        y += font_title.size + 8

        # Body
        if isinstance(content, list):
            content = "\n".join(content)

        for line in content.split("\n"):
            draw.text((x, y), line, font=font_body, fill="#333333")
            y += font_body.size + 4

        return y