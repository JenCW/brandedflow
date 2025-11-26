#!/usr/bin/env python3
"""
Evening Shutdown Routine
Helps you close out your day and prepare for tomorrow
"""

import os
import subprocess
import time
from datetime import datetime, timedelta
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

def get_today_file():
    """Get today's tracker file path"""
    today = datetime.now().strftime("%Y-%m-%d")
    return TRACKER_DIR / f"{today}.txt"

def get_tomorrow_file():
    """Get tomorrow's tracker file path"""
    tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
    return TRACKER_DIR / f"{tomorrow}.txt"

def has_shutdown_today():
    """Check if evening shutdown has run today"""
    today_file = get_today_file()
    if today_file.exists():
        with open(today_file, 'r') as f:
            content = f.read()
            return "evening_shutdown_completed" in content
    return False

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

def run_evening_shutdown():
    """Run the evening shutdown routine"""

    # Check if already done
    if has_shutdown_today():
        send_notification(
            "Already Done",
            "You've already done your evening shutdown today.",
            sound=False
        )
        return

    # Get today's score and priorities
    completed = get_priority_status()
    priorities = get_saved_priorities()
    score = len(completed)

    # Build status summary
    status_lines = []
    for i in range(1, 4):
        if priorities[i]:
            status = "✓" if i in completed else "✗"
            status_lines.append(f"{status} {priorities[i]}")
        else:
            status = "✓" if i in completed else "✗"
            status_lines.append(f"{status} Priority {i}")

    # Greeting based on performance
    if score == 3:
        greeting = "Perfect day! All 3 priorities complete."
        emoji = "🎉"
    elif score == 2:
        greeting = "Solid day! 2 out of 3 priorities done."
        emoji = "💪"
    elif score == 1:
        greeting = "One priority done. Tomorrow we do better."
        emoji = "📈"
    else:
        greeting = "Tough day. Let's learn from it."
        emoji = "🔄"

    send_notification(
        "Evening Shutdown Time",
        f"{emoji} {greeting}",
        sound=True
    )
    time.sleep(2)

    # Step 1: Review today - show actual priorities
    current_date = datetime.now().strftime("%B %d, %Y")
    current_day = datetime.now().strftime("%A")

    status_summary = "\n".join(status_lines)
    send_dialog(
        f"Evening Shutdown - Step 1 of 4 | {current_date}",
        f"📊 {current_day}'s Score: {score}/3 priorities\n\n"
        f"{status_summary}\n\n"
        f"Quick reflection:\n"
        f"• What got in the way today?\n"
        f"• What worked well?"
    )
    time.sleep(1)

    # Step 2: Brain dump - REQUIRED
    current_time = datetime.now().strftime("%B %d, %Y at %I:%M %p")

    brain_dump = ""
    while not brain_dump.strip():
        brain_dump = get_text_input(
            f"Evening Shutdown - Step 2 of 4 | {current_time}",
            "📝 BRAIN DUMP (Required)\n\n"
            "Get EVERYTHING out of your head:\n"
            "• What didn't get done?\n"
            "• What's bothering you?\n"
            "• Random thoughts?\n\n"
            "Type it all here (this is required):"
        )

        if not brain_dump.strip():
            send_dialog(
                "Brain Dump Required",
                "You need to brain dump before ending your day.\n\n"
                "Even if it's just 'Nothing on my mind' - type something.\n\n"
                "It helps you sleep better."
            )

    today_file = get_today_file()
    with open(today_file, 'a') as f:
        f.write(f"\n=== BRAIN DUMP ===\n{brain_dump}\n\n")

    time.sleep(1)

    # Step 3: Biggest win
    win = get_text_input(
        f"Evening Shutdown - Step 3 of 4 | {current_date}",
        f"🏆 BIGGEST WIN - {current_day}\n\n"
        "What was your BIGGEST WIN today?\n\n"
        "Even if it was a tough day,\n"
        "what's one thing that went well?\n\n"
        "Type it:"
    )

    today_file = get_today_file()
    with open(today_file, 'a') as f:
        f.write(f"=== BIGGEST WIN ===\n{win}\n\n")

    time.sleep(1)

    # Step 4: Set tomorrow's Priority 1
    tomorrow_date = (datetime.now() + timedelta(days=1)).strftime("%A, %B %d")

    tomorrow_p1 = get_text_input(
        f"Evening Shutdown - Step 4 of 4 | Planning {tomorrow_date}",
        f"🎯 TOMORROW'S PRIORITY 1\n\n"
        f"{tomorrow_date}\n\n"
        "What's the ONE revenue-generating thing\n"
        "that MUST get done tomorrow?\n\n"
        "Type it:"
    )

    tomorrow_file = get_tomorrow_file()
    with open(tomorrow_file, 'a') as f:
        f.write(f"=== TOMORROW'S PRIORITY 1 ===\n{tomorrow_p1}\n"
                f"Set on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")

    # Mark shutdown complete
    today_file = get_today_file()
    timestamp = datetime.now().strftime("%H:%M:%S")
    with open(today_file, 'a') as f:
        f.write(f"evening_shutdown_completed: {timestamp}\n")
        f.write(f"daily_score: {score}/3\n")

    # Final message
    send_notification(
        "Day Closed",
        "You're done. Leave work behind. Rest well.",
        sound=True
    )

if __name__ == "__main__":
    run_evening_shutdown()
