# Branded + Flow Automation System
## Installation & Setup Guide

This system automatically keeps you on track with your daily priorities using native Mac notifications.

---

## What This Does

**Morning Routine (when you open your laptop):**
- Pops up dialog boxes guiding you through your 15-minute startup
- Forces you to set your 3 priorities before starting work
- Won't run twice in one day (smart tracking)

**Priority Check-ins (10:30am, 1pm, 4pm):**
- Checks if you've completed priorities
- Celebrates progress
- Keeps you accountable

**Evening Shutdown (6pm):**
- Reviews your daily score (how many priorities completed)
- Brain dump to clear your mind
- Sets tomorrow's Priority 1

---

## Installation Steps

### 1. Make Scripts Executable

Open Terminal and run:

```bash
cd ~/brandedflow/automation-system
chmod +x morning_routine.py priority_tracker.py evening_shutdown.py
```

### 2. Create Logs Directory

```bash
mkdir -p ~/brandedflow/automation-system/logs
```

### 3. Test the Scripts Manually First

Before automating, test each script:

```bash
# Test morning routine
python3 ~/brandedflow/automation-system/morning_routine.py

# Test priority tracker
python3 ~/brandedflow/automation-system/priority_tracker.py

# Test evening shutdown
python3 ~/brandedflow/automation-system/evening_shutdown.py
```

You should see notification popups for each. If you don't, check System Preferences > Notifications.

### 4. Install Launch Agents

Copy the automation files to your LaunchAgents folder:

```bash
cp ~/brandedflow/automation-system/com.brandedflow.morning.plist ~/Library/LaunchAgents/
cp ~/brandedflow/automation-system/com.brandedflow.priority.plist ~/Library/LaunchAgents/
cp ~/brandedflow/automation-system/com.brandedflow.evening.plist ~/Library/LaunchAgents/
```

### 5. Load the Launch Agents

```bash
launchctl load ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

### 6. Enable Notifications

1. Go to **System Preferences > Notifications & Focus**
2. Find **Script Editor** or **osascript** in the list
3. Make sure notifications are **ALLOWED** and set to **Alerts** (not banners)

---

## Schedule

Once installed, here's when things run:

| Time | What Happens |
|------|-------------|
| When you open laptop | Morning routine starts (once per day) |
| 10:30am | Priority check-in #1 |
| 1:00pm | Priority check-in #2 |
| 4:00pm | Priority check-in #3 |
| 6:00pm | Evening shutdown |

---

## Customizing the Schedule

Want different times? Edit the plist files:

### Change Priority Check-in Times

Edit: `~/Library/LaunchAgents/com.brandedflow.priority.plist`

Find the `StartCalendarInterval` section and change the hours:

```xml
<dict>
    <key>Hour</key>
    <integer>10</integer>  <!-- Change this to your preferred hour (24-hour format) -->
    <key>Minute</key>
    <integer>30</integer>  <!-- Change this to your preferred minute -->
</dict>
```

### Change Evening Shutdown Time

Edit: `~/Library/LaunchAgents/com.brandedflow.evening.plist`

Change the hour (default is 18 = 6pm):

```xml
<key>Hour</key>
<integer>18</integer>  <!-- Change to 19 for 7pm, 20 for 8pm, etc. -->
```

After making changes, reload:

```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
```

---

## Turning It Off

### Temporarily Disable

```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

### Turn Back On

```bash
launchctl load ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

### Permanently Remove

```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl unload ~/Library/LaunchAgents/com.brandedflow.evening.plist

rm ~/Library/LaunchAgents/com.brandedflow.morning.plist
rm ~/Library/LaunchAgents/com.brandedflow.priority.plist
rm ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

---

## Tracking Your Progress

Your daily data is saved in:
```
~/brandedflow/automation-system/tracker/
```

Each day gets its own file: `2025-11-25.txt`

Inside you'll see:
- When morning routine ran
- Which priorities you completed
- When evening shutdown ran
- Your daily score

You can use this to see patterns over time.

---

## Troubleshooting

### Notifications Aren't Showing Up

1. Check System Preferences > Notifications
2. Make sure "Script Editor" or "Terminal" notifications are enabled
3. Set them to "Alerts" not "Banners"

### Scripts Not Running Automatically

Check if they're loaded:
```bash
launchctl list | grep brandedflow
```

You should see three entries. If not, reload them:
```bash
launchctl load ~/Library/LaunchAgents/com.brandedflow.morning.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

### Check Logs

If something's wrong, look at the logs:
```bash
cat ~/brandedflow/automation-system/logs/morning.error.log
cat ~/brandedflow/automation-system/logs/priority.error.log
cat ~/brandedflow/automation-system/logs/evening.error.log
```

---

## Manual Triggers

Don't want to wait? Run them manually:

```bash
# Run morning routine now
python3 ~/brandedflow/automation-system/morning_routine.py

# Check priorities now
python3 ~/brandedflow/automation-system/priority_tracker.py

# Do evening shutdown now
python3 ~/brandedflow/automation-system/evening_shutdown.py
```

---

## Next Steps

1. Install the system using the steps above
2. Restart your Mac (or just log out and back in)
3. You should see the morning routine popup
4. Go through it honestly
5. Work on Priority 1
6. Wait for check-ins throughout the day

The system will keep you on track. Give it one week and see how your completion rate improves.
