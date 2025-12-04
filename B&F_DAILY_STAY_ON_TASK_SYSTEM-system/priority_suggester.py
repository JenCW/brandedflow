#!/usr/bin/env python3
"""
Smart Priority Suggester
Analyzes your active work and suggests relevant priorities
"""

import json
import random
from datetime import datetime
from pathlib import Path

# Configuration
HOME = Path.home()
WORK_FILE = HOME / "brandedflow" / "automation-system" / "active_work.json"
TRACKER_DIR = HOME / "brandedflow" / "automation-system" / "tracker"

def load_active_work():
    """Load the active work configuration"""
    with open(WORK_FILE, 'r') as f:
        return json.load(f)

def get_yesterday_priorities():
    """Get what was incomplete yesterday"""
    from datetime import timedelta
    yesterday = (datetime.now() - timedelta(days=1)).strftime("%Y-%m-%d")
    yesterday_file = TRACKER_DIR / f"{yesterday}.txt"

    if not yesterday_file.exists():
        return []

    incomplete = []
    with open(yesterday_file, 'r') as f:
        content = f.read()

        # Extract priorities that weren't marked done
        priorities = {}
        for i in range(1, 4):
            if f"Priority {i} (Revenue):" in content:
                for line in content.split('\n'):
                    if line.startswith(f'Priority {i} (Revenue):'):
                        priorities[i] = line.split(':', 1)[1].strip()
            elif f"Priority {i} (Business):" in content:
                for line in content.split('\n'):
                    if line.startswith(f'Priority {i} (Business):'):
                        priorities[i] = line.split(':', 1)[1].strip()
            elif f"Priority {i} (Admin):" in content:
                for line in content.split('\n'):
                    if line.startswith(f'Priority {i} (Admin):'):
                        priorities[i] = line.split(':', 1)[1].strip()

        # Check which weren't completed
        for i, priority in priorities.items():
            if f"priority_{i}_done" not in content:
                incomplete.append(priority)

    return incomplete

def suggest_priorities():
    """Generate smart priority suggestions"""
    work = load_active_work()
    today = datetime.now().strftime("%A")

    suggestions = {
        'revenue': [],
        'business': [],
        'admin': []
    }

    # Get yesterday's incomplete tasks
    incomplete = get_yesterday_priorities()

    # Add incomplete tasks to suggestions (highest priority)
    for task in incomplete[:2]:  # Max 2 carryovers
        suggestions['revenue'].append(f"[YESTERDAY] {task}")

    # Revenue suggestions from active clients
    active_clients = [c for c in work['active_clients'] if c['status'] == 'active']
    proposal_clients = [c for c in work['active_clients'] if c['status'] == 'proposal_sent']

    for client in active_clients:
        suggestions['revenue'].extend(client['common_tasks'][:3])

    # Follow-ups for proposals
    for client in proposal_clients:
        suggestions['revenue'].append(f"Follow up: {client['name']}")

    # Business building suggestions
    suggestions['business'] = work['recurring_business_tasks'][:6]

    # Admin suggestions
    suggestions['admin'] = work['recurring_admin_tasks'][:6]

    # Day-specific context
    day_context = work['day_of_week_defaults'].get(today, {})

    return {
        'revenue_options': suggestions['revenue'][:8],
        'business_options': suggestions['business'][:8],
        'admin_options': suggestions['admin'][:8],
        'day_context': day_context,
        'incomplete_from_yesterday': incomplete
    }

def format_for_display(suggestions):
    """Format suggestions for display in dialog"""
    output = []

    if suggestions['incomplete_from_yesterday']:
        output.append("⚠️  INCOMPLETE FROM YESTERDAY:")
        for task in suggestions['incomplete_from_yesterday']:
            output.append(f"  • {task}")
        output.append("")

    output.append(f"📅 Today is {datetime.now().strftime('%A')}")
    if suggestions['day_context']:
        output.append(f"Focus: {suggestions['day_context'].get('focus', '')}")
        output.append(f"Suggested P1: {suggestions['day_context'].get('suggested_priority_1', '')}")
    output.append("")

    output.append("💰 REVENUE OPTIONS:")
    for i, task in enumerate(suggestions['revenue_options'][:5], 1):
        output.append(f"{i}. {task}")
    output.append("")

    output.append("📈 BUSINESS BUILDING OPTIONS:")
    for i, task in enumerate(suggestions['business_options'][:5], 1):
        output.append(f"{i}. {task}")
    output.append("")

    output.append("📋 ADMIN OPTIONS:")
    for i, task in enumerate(suggestions['admin_options'][:5], 1):
        output.append(f"{i}. {task}")

    return "\n".join(output)

if __name__ == "__main__":
    suggestions = suggest_priorities()
    print(format_for_display(suggestions))
