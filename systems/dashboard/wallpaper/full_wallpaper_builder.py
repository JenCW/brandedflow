"""
Full Wallpaper Builder
Shows ALL tasks, ALL decisions, and critical folders that need manual commits
"""

from pathlib import Path
from datetime import datetime
from PIL import Image, ImageDraw, ImageFont
import sys
import os

# Add project root to path
ROOT = Path(__file__).resolve().parents[3]
sys.path.insert(0, str(ROOT))

# Import with correct path (directory is automation-engine, not automation_engine)
automation_engine_path = ROOT / "systems" / "automation-engine"
sys.path.insert(0, str(automation_engine_path))

# Change to automation-engine directory for imports
original_cwd = os.getcwd()
try:
    os.chdir(str(automation_engine_path))
    from protected_files import ProtectedFiles
    from git_commit_manager import GitCommitManager
finally:
    os.chdir(original_cwd)

class FullWallpaperBuilder:
    """
    Builds wallpaper showing:
    - ALL tasks (not just top 3)
    - ALL decisions
    - Critical folders/files that need manual commits
    """
    
    def __init__(self):
        self.root = ROOT
        self.trackers = self.root / "systems" / "trackers"
        self.wallpaper_dir = self.root / "systems" / "dashboard" / "wallpaper"
        self.output_file = self.wallpaper_dir / "wallpaper.png"
        self.protected = ProtectedFiles(self.root)
        self.git = GitCommitManager(self.root)
    
    def build(self):
        """Build the full wallpaper."""
        # Load ALL tasks and decisions
        all_tasks = self._load_all_tasks()
        all_decisions = self._load_all_decisions()
        critical_files = self._get_critical_files_needing_commits()
        
        # Create image
        width, height = 1920, 1080
        img = Image.new("RGB", (width, height), color=(20, 20, 22))
        draw = ImageDraw.Draw(img)
        
        # Fonts
        font_large = self._font(36)
        font_medium = self._font(24)
        font_small = self._font(18)
        font_tiny = self._font(14)
        
        # Colors
        COLOR_HEADER = (255, 255, 255)
        COLOR_TITLE = (120, 200, 255)
        COLOR_TEXT = (235, 235, 235)
        COLOR_WARNING = (255, 200, 100)
        COLOR_MUTED = (170, 170, 170)
        
        # Header
        now = datetime.now().strftime("%a %b %d • %I:%M %p")
        draw.text((60, 40), "BrandedFlow Dashboard", fill=COLOR_HEADER, font=font_large)
        draw.text((60, 85), now, fill=COLOR_MUTED, font=font_medium)
        
        # Layout: 3 columns
        col1_x = 60
        col2_x = 680
        col3_x = 1300
        start_y = 140
        line_height = 24
        section_spacing = 30
        
        y = start_y
        
        # COLUMN 1: ALL TASKS
        y = self._draw_section(
            draw, "ALL TASKS", all_tasks, 
            col1_x, y, 600, 
            font_medium, font_small, 
            COLOR_TITLE, COLOR_TEXT, line_height
        )
        
        # COLUMN 2: ALL DECISIONS
        y = start_y
        y = self._draw_section(
            draw, "ALL DECISIONS", all_decisions,
            col2_x, y, 600,
            font_medium, font_small,
            COLOR_TITLE, COLOR_TEXT, line_height
        )
        
        # COLUMN 3: CRITICAL FILES (Need Manual Commits)
        y = start_y
        y = self._draw_section(
            draw, "CRITICAL FILES (Manual Commits)", critical_files,
            col3_x, y, 580,
            font_medium, font_tiny,
            COLOR_WARNING, COLOR_TEXT, 18
        )
        
        # Footer
        footer_y = height - 40
        draw.text((60, footer_y), f"Total: {len(all_tasks)} tasks, {len(all_decisions)} decisions, {len(critical_files)} critical files",
                 fill=COLOR_MUTED, font=font_tiny)
        
        # Save
        img.save(self.output_file)
        return self.output_file
    
    def _load_all_tasks(self):
        """Load ALL tasks from tasks.md (filtering done items)."""
        tasks_file = self.trackers / "tasks.md"
        if not tasks_file.exists():
            return ["(no tasks yet)"]
        
        lines = tasks_file.read_text(errors="ignore").split("\n")
        tasks = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
            # Remove checkbox markers and bullet points
            line = line.replace("[ ]", "").replace("[x]", "").strip()
            if line.startswith("- "):
                line = line[2:]
            elif line.startswith("* "):
                line = line[2:]
            if line and line not in tasks:  # Avoid duplicates
                tasks.append(line)
        
        # Filter out done items
        from status_tracker import StatusTracker
        status_tracker = StatusTracker(self.trackers)
        tasks = status_tracker.filter_done(tasks, "tasks")
        
        return tasks if tasks else ["(no tasks yet)"]
    
    def _load_all_decisions(self):
        """Load ALL decisions from decisions-log.md (filtering done items)."""
        decisions_file = self.trackers / "decisions-log.md"
        if not decisions_file.exists():
            return ["(no decisions yet)"]
        
        lines = decisions_file.read_text(errors="ignore").split("\n")
        decisions = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
            # Remove checkbox markers and bullet points
            line = line.replace("[ ]", "").replace("[x]", "").strip()
            if line.startswith("- "):
                line = line[2:]
            elif line.startswith("* "):
                line = line[2:]
            if line.startswith("Decision: "):
                line = line[10:]
            if line and line not in decisions:  # Avoid duplicates
                decisions.append(line)
        
        # Filter out done items
        from status_tracker import StatusTracker
        status_tracker = StatusTracker(self.trackers)
        decisions = status_tracker.filter_done(decisions, "decisions")
        
        return decisions if decisions else ["(no decisions yet)"]
    
    def _get_critical_files_needing_commits(self):
        """Get list of critical files/folders that need manual commits."""
        critical = []
        
        # Get pending critical files from auto-commit tracker
        try:
            from auto_commit import AutoCommit
            auto_commit = AutoCommit(self.root)
            pending = auto_commit.get_pending_critical_files()
            
            for item in pending:
                critical.append(f"{item['file']} ({item['reason']})")
        except Exception as e:
            # Fallback to git status if auto-commit not available
            try:
                changed_files = self.git.get_changed_files()
                protected_files = changed_files.get("protected", [])
                
                for file_path in protected_files:
                    reason = self.protected.get_protection_reason(file_path)
                    critical.append(f"{file_path} ({reason})")
            except:
                critical.append(f"Error: {e}")
        
        # Add critical directories that always need attention
        critical_dirs = [
            "systems/doe-engine/directives/",
            "automations/mcps/",
            "systems/mcp-server/",
            "systems/automation-engine/",
            "docs/internal/",
        ]
        
        for dir_path in critical_dirs:
            dir_obj = self.root / dir_path
            if dir_obj.exists():
                # Check if directory has uncommitted changes
                try:
                    status = self.git.get_status()
                    has_changes = any(f.startswith(dir_path) for f in status)
                    if has_changes:
                        critical.append(f"{dir_path} (has changes)")
                except:
                    critical.append(f"{dir_path} (critical folder)")
        
        # Add always-critical files
        always_critical = [
            "MASTER_RULES.md",
            "docs/internal/CONTEXT.md",
            "docs/internal/DECISIONS_LOG.md",
        ]
        
        for file_path in always_critical:
            file_obj = self.root / file_path
            if file_obj.exists():
                critical.append(f"{file_path} (always review)")
        
        return critical if critical else ["(no critical files)"]
    
    def _draw_section(self, draw, title, items, x, y, max_width, 
                     font_title, font_text, color_title, color_text, line_height):
        """Draw a section with title and items."""
        # Title
        draw.text((x, y), title, fill=color_title, font=font_title)
        y += font_title.size + 10
        
        # Items (truncate if too long)
        max_items = min(len(items), 35)  # Max 35 items per section
        for i, item in enumerate(items[:max_items]):
            # Truncate long items
            display_text = item
            if len(display_text) > 60:
                display_text = display_text[:57] + "..."
            
            draw.text((x, y), f"• {display_text}", fill=color_text, font=font_text)
            y += line_height
        
        # Show count if truncated
        if len(items) > max_items:
            remaining = len(items) - max_items
            draw.text((x, y), f"... and {remaining} more", fill=color_text, font=font_text)
            y += line_height
        
        return y
    
    def _font(self, size):
        """Get font."""
        try:
            return ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", size)
        except:
            try:
                return ImageFont.truetype("Arial.ttf", size)
            except:
                return ImageFont.load_default()

