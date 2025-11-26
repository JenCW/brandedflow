#!/usr/bin/env python3
"""
Morning Routine Automation
Guides you through your daily startup routine with notifications
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

def send_dialog(title, message, buttons=["OK"]):
    """Send a dialog box that requires clicking"""
    button_list = '", "'.join(buttons)
    script = f'''
    display dialog "{message}" with title "{title}" buttons {{"{button_list}"}} default button "{buttons[0]}"
    '''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    return result.stdout.strip()

def get_text_input(title, prompt, default_text=""):
    """Get text input from user via dialog"""
    script = f'''
    text returned of (display dialog "{prompt}" with title "{title}" default answer "{default_text}")
    '''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    return result.stdout.strip()

def get_today_file():
    """Get today's tracker file path"""
    today = datetime.now().strftime("%Y-%m-%d")
    return TRACKER_DIR / f"{today}.txt"

def has_run_today():
    """Check if morning routine has run today"""
    today_file = get_today_file()
    if today_file.exists():
        with open(today_file, 'r') as f:
            content = f.read()
            return "morning_routine_started" in content
    return False

def mark_routine_started():
    """Mark that morning routine has started"""
    today_file = get_today_file()
    timestamp = datetime.now().strftime("%H:%M:%S")
    with open(today_file, 'a') as f:
        f.write(f"morning_routine_started: {timestamp}\n")

def get_yesterday_file():
    """Get yesterday's tracker file if it exists"""
    from datetime import timedelta
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    yesterday_file = TRACKER_DIR / f"{yesterday}.txt"
    return yesterday_file if yesterday_file.exists() else None

def run_morning_routine():
    """Run the complete morning startup routine"""

    # Check time - don't run before 8am
    current_hour = datetime.now().hour
    if current_hour < 8:
        # Too early, silently exit
        return

    # Check if already run today
    if has_run_today():
        send_notification(
            "Morning Routine",
            "You've already done your morning routine today. Get to work!",
            sound=False
        )
        return

    mark_routine_started()

    # Welcome message
    send_notification(
        "Good Morning!",
        "Time for your 15-minute startup routine",
        sound=True
    )
    time.sleep(2)

    # Step 1: Check yesterday
    yesterday_file = get_yesterday_file()
    if yesterday_file:
        message = "Step 1: Review yesterday's priorities\n\nDid you complete your 3 priorities?\nWhat got in the way?\nWhat worked well?"
    else:
        message = "Step 1: Fresh start!\n\nThis is your first tracked day.\nLet's make it count."

    send_dialog("Morning Routine - Step 1 of 4", message)
    time.sleep(1)

    # Step 2: Set today's priorities - with text input
    send_dialog(
        "Morning Routine - Step 2 of 5",
        "Let's set your 3 priorities for today.\n\n"
        "Priority 1 = Revenue (client work, sales, money-making)\n"
        "Priority 2 = Business (content, systems, growth)\n"
        "Priority 3 = Admin (invoicing, emails, cleanup)\n\n"
        "Next screens: You'll type each one."
    )
    time.sleep(1)

    # Get Priority 1
    priority_1 = get_text_input(
        "Priority 1 - Revenue",
        "What's your #1 revenue priority today?\n\n"
        "Examples:\n"
        "• Finish AQR kitchen design\n"
        "• Send Luxe proposal\n"
        "• Follow up with 3 leads\n\n"
        "Type it:"
    )

    # Get Priority 2
    priority_2 = get_text_input(
        "Priority 2 - Business Building",
        "What's your #2 business-building priority?\n\n"
        "Examples:\n"
        "• Post 2 Instagram reels\n"
        "• Update pricing doc\n"
        "• Build email template\n\n"
        "Type it:"
    )

    # Get Priority 3
    priority_3 = get_text_input(
        "Priority 3 - Admin",
        "What's your #3 admin priority?\n\n"
        "Examples:\n"
        "• Send 2 invoices\n"
        "• Schedule next week calls\n"
        "• File receipts\n\n"
        "Type it:"
    )

    # Save priorities to file
    today_file = get_today_file()
    with open(today_file, 'a') as f:
        f.write(f"\n=== TODAY'S PRIORITIES ===\n")
        f.write(f"Priority 1 (Revenue): {priority_1}\n")
        f.write(f"Priority 2 (Business): {priority_2}\n")
        f.write(f"Priority 3 (Admin): {priority_3}\n")
        f.write(f"\n")

    # Step 3: Time blocks
    time_1 = get_text_input(
        "Time Block - Priority 1",
        f"When will you do:\n\"{priority_1}\"\n\n"
        "Example: 9am-11am\n\n"
        "Type time block:"
    )

    time_2 = get_text_input(
        "Time Block - Priority 2",
        f"When will you do:\n\"{priority_2}\"\n\n"
        "Example: 1pm-2pm\n\n"
        "Type time block:"
    )

    time_3 = get_text_input(
        "Time Block - Priority 3",
        f"When will you do:\n\"{priority_3}\"\n\n"
        "Example: 4pm-5pm\n\n"
        "Type time block:"
    )

    # Save time blocks
    with open(today_file, 'a') as f:
        f.write(f"=== TIME BLOCKS ===\n")
        f.write(f"{time_1}: {priority_1}\n")
        f.write(f"{time_2}: {priority_2}\n")
        f.write(f"{time_3}: {priority_3}\n")
        f.write(f"\n")

    time.sleep(1)

    # Step 4: Quick checks
    send_dialog(
        "Morning Routine - Step 4 of 5",
        "Quick checks:\n\n"
        "✓ Client deliverables due this week?\n"
        "✓ Follow-ups needed today?\n"
        "✓ Any fires to put out?\n\n"
        "Think about these for a second."
    )
    time.sleep(1)

    # Step 5: Show summary
    summary = (
        "YOUR PLAN FOR TODAY:\n\n"
        f"🎯 Priority 1 ({time_1}):\n{priority_1}\n\n"
        f"🎯 Priority 2 ({time_2}):\n{priority_2}\n\n"
        f"🎯 Priority 3 ({time_3}):\n{priority_3}\n\n"
        "START WITH PRIORITY 1.\n"
        "No email, no social media until it's done!"
    )

    send_dialog("Morning Routine - Your Day", summary)

    # Save completion
    with open(today_file, 'a') as f:
        timestamp = datetime.now().strftime("%H:%M:%S")
        f.write(f"morning_routine_completed: {timestamp}\n")

    # Final motivation
    send_notification(
        "Let's Go!",
        f"Priority 1: {priority_1}",
        sound=True
    )

if __name__ == "__main__":
    run_morning_routine()
