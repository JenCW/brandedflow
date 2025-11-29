#!/usr/bin/env python3
"""
Priority Tracker - Check in on your daily priorities
Sends periodic reminders and tracks completion
"""

import os
import subprocess
import time
from datetime import datetime
from pathlib import Path

# Configuration
HOME = Path.home()
TRACKER_DIR = HOME / "brandedflow" / "automation-system" / "tracker"
TRACKER_DIR.mkdir(parents=True, exist_ok=True)

def send_notification(title, message, sound=True):
    """Send a native macOS notification"""
    sound_flag = "default" if sound else ""
    script = f'''
    display notification "{message}" with title "{title}" sound name "{sound_flag}"
    '''
    subprocess.run(['osascript', '-e', script], check=False)

def send_dialog(title, message, buttons=["Yes", "Not Yet"]):
    """Send a dialog box that requires clicking"""
    button_list = '", "'.join(buttons)
    script = f'''
    display dialog "{message}" with title "{title}" buttons {{"{button_list}"}} default button "{buttons[0]}"
    '''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    return result.stdout.strip()

def get_today_file():
    """Get today's tracker file path"""
    today = datetime.now().strftime("%Y-%m-%d")
    return TRACKER_DIR / f"{today}.txt"

def get_saved_priorities():
    """Get the priorities that were set this morning"""
    today_file = get_today_file()
    priorities = {1: None, 2: None, 3: None}

    if today_file.exists():
        with open(today_file, 'r') as f:
            content = f.read()
            for line in content.split('\n'):
                if line.startswith('Priority 1 (Revenue):'):
                    priorities[1] = line.replace('Priority 1 (Revenue):', '').strip()
                elif line.startswith('Priority 2 (Business):'):
                    priorities[2] = line.replace('Priority 2 (Business):', '').strip()
                elif line.startswith('Priority 3 (Admin):'):
                    priorities[3] = line.replace('Priority 3 (Admin):', '').strip()

    return priorities

def get_priority_status():
    """Check which priorities are marked complete"""
    today_file = get_today_file()
    completed = []
    if today_file.exists():
        with open(today_file, 'r') as f:
            content = f.read()
            if "priority_1_done" in content:
                completed.append(1)
            if "priority_2_done" in content:
                completed.append(2)
            if "priority_3_done" in content:
                completed.append(3)
    return completed

def mark_priority_done(priority_num):
    """Mark a priority as complete"""
    today_file = get_today_file()
    timestamp = datetime.now().strftime("%H:%M:%S")
    with open(today_file, 'a') as f:
        f.write(f"priority_{priority_num}_done: {timestamp}\n")

def priority_checkup():
    """Check in on priority progress"""
    completed = get_priority_status()
    priorities = get_saved_priorities()

    current_date = datetime.now().strftime("%B %d, %Y")
    current_time = datetime.now().strftime("%I:%M %p")

    if len(completed) == 3:
        send_notification(
            "All Priorities Done!",
            "You crushed all 3 priorities today. You're done.",
            sound=True
        )
        return

    # Figure out what's next
    if 1 not in completed:
        next_priority = 1
        priority_text = priorities[1] if priorities[1] else "your #1 revenue priority"
        message = f"💰 PRIORITY 1 CHECK-IN\n{current_time}\n\nHave you completed:\n\"{priority_text}\"\n\nDone?"
    elif 2 not in completed:
        next_priority = 2
        priority_text = priorities[2] if priorities[2] else "your #2 business-building priority"
        message = f"📈 PRIORITY 2 CHECK-IN\n{current_time}\n\nPriority 1 is done! Nice.\n\nHave you completed:\n\"{priority_text}\"\n\nDone?"
    else:
        next_priority = 3
        priority_text = priorities[3] if priorities[3] else "your #3 admin priority"
        message = f"📋 PRIORITY 3 CHECK-IN\n{current_time}\n\nTwo down, one to go!\n\nHave you completed:\n\"{priority_text}\"\n\nDone?"

    response = send_dialog(
        f"Priority {next_priority} Check | {current_date}",
        message,
        buttons=["Done", "Still Working", "Skipping"]
    )

    if "Done" in response:
        mark_priority_done(next_priority)
        send_notification(
            f"Priority {next_priority} Complete!",
            f"✓ {len(completed) + 1}/3 priorities done today",
            sound=True
        )

        if len(completed) + 1 == 3:
            send_notification(
                "Day Complete!",
                "All 3 priorities done. You can rest easy tonight.",
                sound=True
            )
    elif "Skipping" in response:
        mark_priority_done(next_priority)  # Mark as done so we move forward
        with open(get_today_file(), 'a') as f:
            f.write(f"priority_{next_priority}_skipped: {datetime.now().strftime('%H:%M:%S')}\n")
        send_notification(
            "Priority Skipped",
            "Noted. Moving to next priority.",
            sound=False
        )
    else:
        send_notification(
            "Keep Going",
            "You got this. Stay focused.",
            sound=False
        )

if __name__ == "__main__":
    priority_checkup()
