# Complete Schedule & Triggers

## 📅 Daily Automation Schedule

### MORNING ROUTINE
**When:** After 8:00am when you open your laptop
**Trigger:** Checks every 5 minutes after login, runs once per day
**Duration:** 2-3 minutes

**Steps:**
1. **Context** - Shows date, time, day, incomplete from yesterday, today's focus
2. **Priority 1** - Pick from revenue options (client work)
3. **Priority 2** - Pick from business building options (content, systems)
4. **Priority 3** - Pick from admin options (or skip)
5. **Summary** - Shows your 3 priorities, then start working

---

### PRIORITY CHECK-INS
**Times:**
- 10:30 AM
- 1:00 PM
- 4:00 PM

**What Happens:**
- Shows your ACTUAL priority (what you picked this morning)
- Asks: Done / Still Working / Skipping
- Tracks completion in real-time

---

### EVENING SHUTDOWN
**Time:** 6:00 PM
**Duration:** 3-5 minutes

**Steps:**
1. **Review Score** - Shows ✓/✗ for each priority, your score (X/3)
2. **Brain Dump (REQUIRED)** - Must type everything on your mind
3. **Biggest Win** - Type one thing that went well today
4. **Tomorrow's P1** - Type tomorrow's #1 priority (preps next morning)

---

## 🕐 What Runs Today (Nov 26)?

```
8:00 AM+  → Morning Routine (if not done yet)
10:30 AM  → Priority Check #1
1:00 PM   → Priority Check #2
4:00 PM   → Priority Check #3
6:00 PM   → Evening Shutdown ← YOU SAW THIS
```

The "Step 2 of 4" you saw = **Brain Dump at 6pm**

---

## 📊 Full Week View

### MONDAY
- 8am+ Morning Routine
- 10:30am, 1pm, 4pm Check-ins
- 6pm Evening Shutdown
- **Focus:** Client work - start week strong

### TUESDAY (TODAY)
- 8am+ Morning Routine
- 10:30am, 1pm, 4pm Check-ins
- 6pm Evening Shutdown
- **Focus:** Client work + sales

### WEDNESDAY
- 8am+ Morning Routine
- 10:30am, 1pm, 4pm Check-ins
- 6pm Evening Shutdown
- **Focus:** Content creation day

### THURSDAY
- 8am+ Morning Routine
- 10:30am, 1pm, 4pm Check-ins
- 6pm Evening Shutdown
- **Focus:** Client work + follow-ups

### FRIDAY
- 8am+ Morning Routine
- 10:30am, 1pm, 4pm Check-ins
- 6pm Evening Shutdown
- **Focus:** Wrap up + admin

### SATURDAY
- 8am+ Morning Routine (optional work day)
- Check-ins still run if you're working
- 6pm Evening Shutdown

### SUNDAY
- Morning Routine suggests: Weekly planning
- **Recommended:** Do weekly planning session (see Foundation.Docs/WEEKLY_PLANNING_SESSION.md)

---

## 🔧 Customizing Times

### Change Evening Shutdown Time

Edit this file:
```
~/Library/LaunchAgents/com.brandedflow.evening.plist
```

Find:
```xml
<key>Hour</key>
<integer>18</integer>  <!-- 18 = 6pm -->
```

Change to:
- 17 = 5pm
- 19 = 7pm
- 20 = 8pm

Then reload:
```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.evening.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.evening.plist
```

### Change Priority Check-in Times

Edit this file:
```
~/Library/LaunchAgents/com.brandedflow.priority.plist
```

Find the `StartCalendarInterval` section with 3 time blocks.

Change hours/minutes, then reload:
```bash
launchctl unload ~/Library/LaunchAgents/com.brandedflow.priority.plist
launchctl load ~/Library/LaunchAgents/com.brandedflow.priority.plist
```

### Change Morning Start Time (Currently 8am)

Edit:
```
~/brandedflow/automation-system/morning_routine_v2.py
```

Find line ~75:
```python
if current_hour < 8:  # Change this number
```

Change to 7, 9, 10, etc.

---

## 📂 Where Everything Is Saved

### Daily Tracker Files
```
~/brandedflow/automation-system/tracker/2025-11-26.txt
```

Contains:
- Morning routine timestamp
- Your 3 priorities
- Completion timestamps
- Brain dump
- Biggest win
- Tomorrow's Priority 1

### Active Work Configuration
```
~/brandedflow/automation-system/active_work.json
```

Contains:
- Your clients (AQR, Luxe, etc)
- Common tasks per client
- Recurring business tasks
- Recurring admin tasks
- Day-of-week defaults

**Edit this file** to update your suggestions.

---

## 🎯 What Each File Does

| File | Purpose |
|------|---------|
| `morning_routine_v2.py` | Main morning script (smart suggestions) |
| `priority_tracker.py` | Check-in script (shows your priorities) |
| `evening_shutdown.py` | End-of-day closure (brain dump, wins) |
| `priority_suggester.py` | Analyzes your work, suggests priorities |
| `active_work.json` | Your clients, tasks, day focus |
| `com.brandedflow.morning.plist` | Auto-run morning routine |
| `com.brandedflow.priority.plist` | Auto-run check-ins |
| `com.brandedflow.evening.plist` | Auto-run evening shutdown |

---

## ⚙️ Technical Details

**Morning Routine Trigger:**
- Runs every 5 minutes via `StartInterval: 300`
- Smart check: won't run twice in one day
- Won't run before 8am

**Priority Check-ins:**
- Scheduled via `StartCalendarInterval`
- Run at exact times (10:30am, 1pm, 4pm)

**Evening Shutdown:**
- Scheduled via `StartCalendarInterval`
- Runs at 6pm daily

All times are based on your local system time (macOS).

---

## 🚀 Quick Commands

**Test morning routine:**
```bash
python3 ~/brandedflow/automation-system/morning_routine_v2.py
```

**Test priority check:**
```bash
python3 ~/brandedflow/automation-system/priority_tracker.py
```

**Test evening shutdown:**
```bash
python3 ~/brandedflow/automation-system/evening_shutdown.py
```

**See what's running:**
```bash
launchctl list | grep brandedflow
```

**View today's tracker:**
```bash
cat ~/brandedflow/automation-system/tracker/$(date +%Y-%m-%d).txt
```

---

## 💡 Pro Tips

1. **Evening shutdown at 6pm** is when you brain dump for TODAY
2. **Brain dump is required** - you can't skip it
3. **Tomorrow's P1** from evening shutdown = your morning suggestion tomorrow
4. **Edit active_work.json** when you get new clients or change focus
5. **Check tracker files** to see patterns in your completion rate
