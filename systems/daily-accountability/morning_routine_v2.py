#!/usr/bin/env python3
"""
Morning Routine V2 - Smart Suggestions
Shows you relevant options, you just pick what fits
"""

import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# Add current directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))
from priority_suggester import suggest_priorities

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

def show_choice_list(title, prompt, options):
    """Show a list of options to choose from"""
    # AppleScript list choice dialog
    options_str = '", "'.join(options)
    script = f'''
    choose from list {{"{options_str}"}} with prompt "{prompt}" with title "{title}"
    '''
    result = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    choice = result.stdout.strip()

    # Handle cancellation
    if choice == "false" or not choice:
        return None

    return choice

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

def run_morning_routine():
    """Run the complete morning startup routine"""

    # Check time - don't run before 8am
    current_hour = datetime.now().hour
    if current_hour < 8:
        return

    # Check if already run today
    if has_run_today():
        send_notification(
            "Morning Routine",
            "Already done today. Get to work!",
            sound=False
        )
        return

    mark_routine_started()

    # Welcome
    send_notification(
        "Branded + Flow | Good Morning!",
        "Let's set your priorities (this'll be quick)",
        sound=True
    )
    time.sleep(2)

    # Get smart suggestions
    suggestions = suggest_priorities()

    # Show context first
    current_date = datetime.now().strftime("%B %d, %Y")
    current_day = datetime.now().strftime("%A")
    current_time = datetime.now().strftime("%I:%M %p")

    context_msg = f"📅 {current_day}, {current_date}\n🕐 {current_time}\n\n"

    if suggestions['incomplete_from_yesterday']:
        context_msg += "⚠️  INCOMPLETE FROM YESTERDAY:\n"
        for task in suggestions['incomplete_from_yesterday'][:2]:
            context_msg += f"• {task}\n"
        context_msg += "\n"

    if suggestions['day_context']:
        context_msg += f"🎯 Focus: {suggestions['day_context'].get('focus', '')}\n"

    context_msg += "\nNext: Pick your 3 priorities"

    send_dialog(f"Branded + Flow | Morning Routine | {current_date}", context_msg)
    time.sleep(1)

    # Priority 1 - Revenue
    p1_intro = f"💰 PRIORITY 1 = REVENUE\n{current_day}, {current_date}\n\nPick your #1 money-making priority:"
    p1_options = suggestions['revenue_options'][:6]
    p1_options.append("✏️  Write my own")

    priority_1 = show_choice_list(f"Branded + Flow | Priority 1 | {current_date}", p1_intro, p1_options)

    if not priority_1:
        send_notification("Branded + Flow", "Morning routine cancelled", sound=False)
        return

    if "Write my own" in priority_1:
        priority_1 = get_text_input(f"Branded + Flow | Priority 1 Custom | {current_date}", "Type your revenue priority:")

    # Priority 2 - Business Building
    p2_intro = f"📈 PRIORITY 2 = BUSINESS BUILDING\n{current_day}, {current_date}\n\nPick your #2 growth priority:"
    p2_options = suggestions['business_options'][:6]
    p2_options.append("✏️  Write my own")

    priority_2 = show_choice_list(f"Branded + Flow | Priority 2 | {current_date}", p2_intro, p2_options)

    if not priority_2:
        priority_2 = "No Priority 2 set"
    elif "Write my own" in priority_2:
        priority_2 = get_text_input(f"Branded + Flow | Priority 2 Custom | {current_date}", "Type your business priority:")

    # Priority 3 - Admin
    p3_intro = f"📋 PRIORITY 3 = ADMIN\n{current_day}, {current_date}\n\nPick your #3 admin priority:"
    p3_options = suggestions['admin_options'][:6]
    p3_options.append("✏️  Write my own")
    p3_options.append("⏭️  Skip Priority 3")

    priority_3 = show_choice_list(f"Branded + Flow | Priority 3 | {current_date}", p3_intro, p3_options)

    if not priority_3 or "Skip" in priority_3:
        priority_3 = "No Priority 3 set"
    elif "Write my own" in priority_3:
        priority_3 = get_text_input(f"Branded + Flow | Priority 3 Custom | {current_date}", "Type your admin priority:")

    # Save priorities
    today_file = get_today_file()
    with open(today_file, 'a') as f:
        f.write(f"\n=== TODAY'S PRIORITIES ===\n")
        f.write(f"Priority 1 (Revenue): {priority_1}\n")
        f.write(f"Priority 2 (Business): {priority_2}\n")
        f.write(f"Priority 3 (Admin): {priority_3}\n")
        f.write(f"\n")

    # Show summary
    summary = (
        f"✅ YOUR PRIORITIES - {current_day}\n"
        f"{current_date}\n\n"
        f"🎯 P1: {priority_1}\n\n"
        f"🎯 P2: {priority_2}\n\n"
        f"🎯 P3: {priority_3}\n\n"
        "START WITH P1.\n"
        "No email/social until it's done!"
    )

    send_dialog(f"Branded + Flow | Your Day | {current_date}", summary)

    # Mark complete
    with open(today_file, 'a') as f:
        timestamp = datetime.now().strftime("%H:%M:%S")
        f.write(f"morning_routine_completed: {timestamp}\n")

    # Final push
    send_notification(
        "Branded + Flow | Let's Go!",
        f"P1: {priority_1[:50]}...",
        sound=True
    )

if __name__ == "__main__":
    run_morning_routine()
