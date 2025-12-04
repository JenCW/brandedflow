# Branded + Flow Automation System

Automated notifications to keep you on track with your daily priorities.

## Quick Start

Run this one command:

```bash
cd ~/brandedflow/automation-system && ./install.sh
```

That's it. The installer will guide you through setup.

## What You Get

**Morning Routine**
- Pops up when you open your laptop
- Guides you through setting 3 priorities
- Won't run twice in one day

**Priority Check-ins**
- 10:30am, 1pm, 4pm
- Asks if priorities are done
- Celebrates progress

**Evening Shutdown**
- 6pm daily
- Reviews your score
- Brain dump
- Sets tomorrow's Priority 1

## Files

- `morning_routine.py` - Morning startup automation
- `priority_tracker.py` - Throughout-the-day check-ins
- `evening_shutdown.py` - End-of-day closure
- `install.sh` - One-click installer
- `INSTALL.md` - Detailed setup instructions
- `*.plist` - macOS automation config files

## Customization

Want different times? See `INSTALL.md` for how to customize the schedule.

## Turn It Off

```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

## Turn It Back On

```bash
launchctl load ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

## Your Data

Daily progress tracked in: `~/brandedflow/automation-system/tracker/`

Each day gets a file like `2025-11-25.txt` showing:
- When routines ran
- Which priorities completed
- Your daily score

Use this to see patterns over weeks/months.
