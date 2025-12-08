from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json 
from typing import Dict, List, Any  # pyright: ignore[reportMissingImports]
import os # pyright: ignore[reportMissingImports]
import sys # pyright: ignore[reportMissingImports]
from pathlib import Path # pyright: ignore[reportMissingImports]  
import json # pyright: ignore[reportMissingImports]
from PIL import Image, ImageDraw, ImageFont # pyright: ignore[reportMissingImports]

class BuildWallpaper:
    """
    Full Branded Wallpaper Renderer
    - Branded color theme
    - Grid layout
    - Clean section boxes with rounded corners
    - Header, Top 3, Decisions, Notes
    - Outputs a REAL PNG that macOS accepts
    """

    def __init__(self):
        # wallpaper folder
        self.wallpaper_dir = Path(__file__).resolve().parent

        # correct template path

        self.template_path = self.wallpaper_dir / "template.json"
    
    def run(self, data: dict, out_path: Path):
        """
        data = {
            "top3": [...],
            "decisions": [...],
            "notes": [...],
            "timestamp": "string"
        }
        """
        template = self._load_template(self.template_path)

        width = template["canvas"]["width"]
        height = template["canvas"]["height"]
        bg = template["canvas"]["background"]

        # Create canvas
        img = Image.new("RGB", (width, height), bg)
        draw = ImageDraw.Draw(img)

        # Brand Colors
        BRAND_PRIMARY = "#1A1A1A"
        BRAND_ACCENT = "#C079FF"
        BOX_BG = "#F5F5F5"
        TEXT_BODY = "#222222"

        # Fonts
        font_header = self._font(54)
        font_title = self._font(32)
        font_body = self._font(26)

        # Header
        hx = template["sections"]["header"]["x"]
        hy = template["sections"]["header"]["y"]
        draw.text((hx, hy), "BrandedFlow Dashboard", fill=BRAND_PRIMARY, font=font_header)

        # Top 3
        t = template["sections"]["top3"]
        self._draw_boxed_block(draw, t["title"], data.get("top3", []), t,
                               font_title, font_body, BRAND_ACCENT, BOX_BG, TEXT_BODY)

        # Decisions
        d = template["sections"]["decisions"]
        self._draw_boxed_block(draw, d["title"], data.get("decisions", []), d,
                               font_title, font_body, BRAND_ACCENT, BOX_BG, TEXT_BODY)

        # Notes
        n = template["sections"]["notes"]
        self._draw_boxed_block(draw, n["title"], data.get("notes", []), n,
                               font_title, font_body, BRAND_ACCENT, BOX_BG, TEXT_BODY)

        # Timestamp
        if "timestamp" in data:
            draw.text((60, height - 60), f"Updated {data['timestamp']}",
                      fill="#444444", font=self._font(20))

        img.save(out_path, "PNG")

    # ---------------------------- UTILITIES ---------------------------- #

    def _load_template(self, path: Path):
        with open(path, "r") as f:
            return json.load(f)

    def _font(self, size):
        try:
            return ImageFont.truetype("Arial.ttf", size)
        except:
            return ImageFont.load_default()

    def _draw_box(self, draw, x, y, w, h, fill, radius=20):
        draw.rounded_rectangle([(x, y), (x + w, y + h)], radius, fill=fill)

    def _draw_boxed_block(self, draw, title, content, section, font_title, font_body,
                           accent_color, bg_color, text_color):
        x = section["x"]
        y = section["y"]
        width = section["width"]

        # Dynamic height
        box_height = max(180, 60 + len(content) * (font_body.size + 8))

        # Box
        self._draw_box(draw, x - 20, y - 20, width + 40, box_height + 40, bg_color)

        # Title
        draw.text((x, y), title, fill=accent_color, font=font_title)
        y += font_title.size + 12

        # Content
        for line in content:
            draw.text((x, y), f"- {line}", fill=text_color, font=font_body)
            y += font_body.size + 8