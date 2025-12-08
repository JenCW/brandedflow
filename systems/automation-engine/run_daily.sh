def run_daily(self):
    """Main daily pipeline executor."""
    chats = self.ingest.collect()

    if chats:
        parsed = self.digest.process(chats)
        self.decision_extractor.write(parsed, TRACKERS)
        self.task_extractor.write(parsed, TRACKERS)
        self.daily.write(parsed, TRACKERS)
        self.archive.archive_raw(chats)

    self.dashboard.build_daily()
    self.wallpaper.build()

    # Force-set wallpaper after build (Finder is most reliable)
    base = Path(__file__).resolve().parent.parent.parent
    set_wallpaper(base / "systems" / "dashboard" / "wallpaper" / "wallpaper.png")