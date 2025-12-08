import sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT))
    
from datetime import datetime

# ------------------------------------------------------------
# IMPORTS (absolute imports for wallpaper)
# ------------------------------------------------------------

from systems.dashboard.wallpaper.build_wallpaper import BuildWallpaper
from systems.dashboard.wallpaper.render_wallpaper import WallpaperRenderer
from file_router import FileRouter
from chat_ingest import ChatIngest
from conversation_digest import ConversationDigest
from decision_extractor import DecisionExtractor
from task_extractor import TaskExtractor
from note_extractor import NoteExtractor
from write_notes import NoteWriter
from conflict_detector import ConflictDetector
from status_tracker import StatusTracker
from decision_versioning import DecisionVersioning
from daily_summary import DailySummary
from weekly_summary import WeeklySummary
from dashboard_builder import DashboardBuilder
from archive_manager import ArchiveManager
from file_cleanup import FileCleanup
from foundational_doc_updater import FoundationalDocUpdater

# Tracker paths

HERE = Path(__file__).resolve().parent
BASE_DIR = HERE.parent.parent

CONV_INBOX = BASE_DIR / "systems" / "trackers" / "conversations_to_process"
SELF_ANNEALING_LOGS = BASE_DIR / "systems" / "trackers" / "self_annealing_logs"
WORK_LOGS = BASE_DIR / "systems" / "trackers" / "work_logs"
TRACKERS   = BASE_DIR / "systems" / "trackers"


# ===================================================================
# MAINTENANCE AGENT
# ===================================================================

class MaintenanceAgent:
    def __init__(self):
        self.ingest = ChatIngest(CONV_INBOX)
        self.digest = ConversationDigest()
        self.decision_extractor = DecisionExtractor()
        self.task_extractor = TaskExtractor()
        self.note_extractor = NoteExtractor()
        self.write_notes = None  # Will be initialized with trackers path
        self.daily = DailySummary()
        self.weekly = WeeklySummary()
        self.dashboard = DashboardBuilder()
        self.wallpaper = BuildWallpaper()
        self.archive = ArchiveManager()
        self.cleanup = FileCleanup(BASE_DIR, TRACKERS)
        self.doc_updater = FoundationalDocUpdater(BASE_DIR, TRACKERS)

    # ---------------------------------------------------------------
    # DAILY PIPELINE
    # ---------------------------------------------------------------
    def run_daily(self):
        """Main daily pipeline executor."""

        # 1. CHAT INGEST
        chats = self.ingest.collect()
        
        # 1a. SELF-ANNEALING LOGS INGEST
        self_annealing_logs = []
        if SELF_ANNEALING_LOGS.exists():
            for item in SELF_ANNEALING_LOGS.iterdir():
                if item.name == "Processed" or item.name == "summary.json":
                    continue
                if item.is_file() and item.name.startswith("self-annealing-"):
                    self_annealing_logs.append(item)

        # 1b. WORK LOGS INGEST (decisions, directives, MCPs, tasks, etc.)
        work_logs = []
        if WORK_LOGS.exists():
            for item in WORK_LOGS.iterdir():
                if item.name == "Processed" or item.name == "summary.json":
                    continue
                if item.is_file() and item.name.startswith("work-"):
                    work_logs.append(item)

        # Combine chats, self-annealing logs, and work logs
        all_files = chats + self_annealing_logs + work_logs

        if all_files:
            parsed = self.digest.process(all_files)

            # 2. WRITE DECISIONS / TASKS / NOTES
            self.decision_extractor.write(parsed, TRACKERS)
            self.task_extractor.write(parsed, TRACKERS)
            # Notes extraction - parsed is a list of conversation dicts
            all_text = "\n".join([conv.get("text", "") for conv in parsed])
            notes = self.note_extractor.extract(all_text)
            note_writer = NoteWriter(TRACKERS)
            note_writer.write(notes)
            
            # 2a. ANALYZE DECISIONS FOR FOUNDATIONAL DOC UPDATES
            # Get all decisions that were just written
            decisions_file = TRACKERS / "decisions-log.md"
            if decisions_file.exists():
                decisions = self._read_recent_decisions(decisions_file)
                if decisions:
                    self.doc_updater.analyze_decisions_for_updates(decisions)

            # 3. DAILY SUMMARY
            self.daily.write(parsed, TRACKERS)

            # 4. ARCHIVE RAW CHATS (and logs)
            if chats:
                self.archive.archive_raw(chats)
            # Archive self-annealing logs to Processed folder
            if self_annealing_logs:
                processed_dir = SELF_ANNEALING_LOGS / "Processed"
                processed_dir.mkdir(exist_ok=True)
                for log_file in self_annealing_logs:
                    log_file.rename(processed_dir / log_file.name)
            # Archive work logs to Processed folder
            if work_logs:
                processed_dir = WORK_LOGS / "Processed"
                processed_dir.mkdir(exist_ok=True)
                for log_file in work_logs:
                    log_file.rename(processed_dir / log_file.name)

        # 5. RUN CLEANUP (prevent file accumulation)
        cleanup_summary = self.cleanup.run_cleanup()
        
        # 6. REBUILD DASHBOARD
        self.dashboard.build_daily()

        # -----------------------------------------------------------
        # 7. BUILD WALLPAPER (actual PNG generator)
        # -----------------------------------------------------------
        wallpaper_out = BASE_DIR / "systems" / "dashboard" / "wallpaper" / "wallpaper.png"

        # Use full wallpaper builder (shows ALL tasks, ALL decisions, critical files)
        sys.path.insert(0, str(BASE_DIR / "systems" / "dashboard" / "wallpaper"))
        from full_wallpaper_builder import FullWallpaperBuilder
        builder = FullWallpaperBuilder()
        builder.build()
        
        # Set as wallpaper
        from set_wallpaper import set_wallpaper
        set_wallpaper(wallpaper_out)

    def _read_recent_decisions(self, decisions_file: Path, limit=20):
        """Read recent decisions from decisions-log.md."""
        if not decisions_file.exists():
            return []
        
        lines = decisions_file.read_text(errors="ignore").split("\n")
        decisions = []
        for line in lines:
            line = line.strip()
            if line and (line.startswith("- ") or line.startswith("* ")):
                decision = line[2:].strip()
                if decision and decision not in decisions:
                    decisions.append(decision)
                    if len(decisions) >= limit:
                        break
        return decisions
    
    # ---------------------------------------------------------------
    # WEEKLY PIPELINE
    # ---------------------------------------------------------------

    def run_weekly(self):
        """Main weekly pipeline executor."""
        summary = self.weekly.build(TRACKERS)
        self.dashboard.build_weekly(summary)


# ===================================================================
# ENTRY POINT
# ===================================================================

if __name__ == "__main__":
    agent = MaintenanceAgent()
    mode = sys.argv[1] if len(sys.argv) > 1 else "daily"

    if mode == "daily":
        agent.run_daily()
    elif mode == "weekly":
        agent.run_weekly()
    else:
        print("Invalid mode. Use 'daily' or 'weekly'.")