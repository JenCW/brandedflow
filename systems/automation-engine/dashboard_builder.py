from pathlib import Path
from datetime import datetime
from status_tracker import StatusTracker
from auto_commit import AutoCommit
from foundational_doc_updater import FoundationalDocUpdater
import json

def _read(p: Path) -> str:
    return p.read_text(errors="ignore") if p.exists() else ""

def _tail_lines(text: str, n: int = 20):
    lines = [l for l in text.split("\n") if l.strip()]
    return lines[-n:] if lines else []


class DashboardBuilder:
    def __init__(self):
        base = Path(__file__).resolve().parent.parent.parent  # project root
        self.html_dir = base / "systems" / "dashboard" / "html"
        self.trackers = base / "systems" / "trackers"
        self.out = self.html_dir / "index.html"

    # --------------------------------------------------------
    # WEEKLY DASHBOARD
    # --------------------------------------------------------
    def build_weekly(self, summary_text: str):
        """
        Build simple weekly summary HTML page.
        """
        html = f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Weekly Summary</title>
  <style>
    body {{ font-family: -apple-system, system-ui; margin: 24px; }}
    pre {{ white-space: pre-wrap; font-size: 14px; }}
  </style>
</head>
<body>
  <h1>Weekly Summary</h1>
  <pre>{summary_text}</pre>
</body>
</html>
"""
        out = self.html_dir / "weekly.html"
        out.write_text(html)
        return out

    # --------------------------------------------------------
    # DAILY DASHBOARD
    # --------------------------------------------------------
    def build_daily(self):
        """
        Build full daily dashboard HTML.
        """

        # Read tracker data
        decisions_raw = _tail_lines(_read(self.trackers / "decisions-log.md"), 50)
        tasks_raw = _tail_lines(_read(self.trackers / "tasks.md"), 50)
        notes_raw = _tail_lines(_read(self.trackers / "notes.md"), 50)

        def clean(line: str) -> str:
            # Remove checkbox markers and bullets
            line = line.replace("[ ]", "").replace("[x]", "").strip()
            return line[2:] if line.startswith("- ") else line

        decisions = [clean(d) for d in decisions_raw if clean(d)]
        tasks = [clean(t) for t in tasks_raw if clean(t)]
        notes = [clean(n) for n in notes_raw if clean(n)]
        
        # Filter out done items using StatusTracker
        status_tracker = StatusTracker(self.trackers)
        decisions = status_tracker.filter_done(decisions, "decisions")
        tasks = status_tracker.filter_done(tasks, "tasks")
        notes = status_tracker.filter_done(notes, "notes")
        
        # Get critical files pending approval
        base = Path(__file__).resolve().parent.parent.parent
        auto_commit = AutoCommit(base)
        critical_files = auto_commit.get_pending_critical_files()
        
        # Get foundational doc updates pending
        doc_updater = FoundationalDocUpdater(base, self.trackers)
        foundational_updates = doc_updater.get_pending_updates()

        now = datetime.now().strftime("%Y-%m-%d %I:%M %p")

        # Build HTML
        html = f"""<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>BrandedFlow Dashboard</title>
  <style>
    body{{font-family: -apple-system, system-ui, Arial; margin: 24px;}}
    .grid{{display:grid; grid-template-columns:1fr 1fr; gap:16px;}}
    .card{{border:1px solid #ddd; border-radius:12px; padding:16px;}}
    h1{{margin:0 0 8px 0;}}
    h2{{margin:0 0 10px 0; font-size:16px;}}
    ul{{margin:0; padding-left:18px; max-height:400px; overflow-y:auto;}}
    .muted{{color:#666; font-size:12px;}}
    pre{{white-space:pre-wrap;}}
  </style>
</head>
<body>
  <h1>Dashboard</h1>
  <div class="muted">Last build: {now}</div>

  <div class="grid" style="margin-top:16px;">
    <div class="card">
      <h2>All Tasks ({len(tasks)} pending)</h2>
      <ul>{"".join(f"<li>{t}</li>" for t in tasks) or "<li>(no tasks yet)</li>"}</ul>
    </div>

    <div class="card">
      <h2>Latest Decisions</h2>
      <ul>{"".join(f"<li>{d}</li>" for d in decisions) or "<li>(none)</li>"}</ul>
    </div>

    <div class="card">
      <h2>Latest Tasks</h2>
      <ul>{"".join(f"<li>{t}</li>" for t in tasks) or "<li>(none)</li>"}</ul>
    </div>

    <div class="card">
      <h2>Notes</h2>
      <ul>{"".join(f"<li>{n}</li>" for n in notes) or "<li>(none)</li>"}</ul>
    </div>
  </div>

  <div class="card" style="margin-top:16px;">
    <h2>Critical Files (Need Your Approval)</h2>
    {"".join(f"<div style='margin:8px 0; padding:8px; background:#fff3cd; border-radius:4px;'><strong>{cf['file']}</strong><br><small>{cf['reason']}</small><br><small style='color:#666;'>Pending since: {cf['first_seen'][:10]}</small></div>" for cf in critical_files) if critical_files else "<p style='color:#666;'>(No critical files pending)</p>"}
  </div>

  <div class="card" style="margin-top:16px;">
    <h2>Foundational Docs (Need Updates)</h2>
    {"".join(f"<div style='margin:8px 0; padding:8px; background:#d1ecf1; border-radius:4px;'><strong>{update['document']}</strong><br><small>Decision: {update['decision'][:80]}...</small><br><small style='color:#666;'>{update['reason']}</small></div>" for update in foundational_updates) if foundational_updates else "<p style='color:#666;'>(No foundational docs need updates)</p>"}
  </div>

  <div class="card" style="margin-top:16px;">
    <h2>Files</h2>
    <ul>
      <li>systems/trackers/decisions-log.md</li>
      <li>systems/trackers/tasks.md</li>
      <li>systems/trackers/daily-summary.md</li>
      <li>systems/trackers/notes.md</li>
    </ul>
  </div>
</body>
</html>
"""

        self.out.write_text(html)
        return self.out