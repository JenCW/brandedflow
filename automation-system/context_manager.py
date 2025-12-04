#!/usr/bin/env python3
"""
Context Manager - Automates updates to important context files
Helps ensure CONTEXT.md and related docs stay current
"""

import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path
import json

# Configuration
PROJECT_ROOT = Path(__file__).parent.parent
DOCS_DIR = PROJECT_ROOT / "docs"
CONTEXT_FILE = DOCS_DIR / "CONTEXT.md"
CLIENT_STATUS_FILE = DOCS_DIR / "CLIENT_STATUS.md"
DECISIONS_LOG_FILE = DOCS_DIR / "DECISIONS_LOG (1).md"
UPDATE_CHECKLIST = PROJECT_ROOT / "company" / "operations" / "UPDATE_CHECKLIST.md"

# Checklist prompts based on UPDATE_CHECKLIST.md
CHECKLIST_PROMPTS = {
    'client_won': [
        'Update CLIENT_STATUS.md - Add to active clients',
        'Update CONTEXT.md - Update active clients section',
        'Update revenue tracking in company/accounting/',
        'Update portfolio/case studies (after delivery)'
    ],
    'client_lost': [
        'Update CLIENT_STATUS.md - Move to lost/pipeline',
        'Update CONTEXT.md - Remove from active clients'
    ],
    'service_added': [
        'Update QUICK_STARTS.md - Add service definition',
        'Update TECH_STACK.md - If new tool required',
        'Update pricing in templates/proposals/',
        'Update company/website/ content (when site is built)'
    ],
    'decision_made': [
        'Add entry to DECISIONS_LOG.md - Use template',
        'Update CONTEXT.md - If affects current priorities',
        'Update affected docs (TECH_STACK, OPERATIONS_MANUAL, etc.)'
    ],
    'priority_changed': [
        'Update CONTEXT.md - Current priorities section',
        'Update todo lists/task tracking',
        'Update daily-accountability system goals (if needed)'
    ],
    'tool_added': [
        'Update TECH_STACK.md - Add to relevant category',
        'Update TECH_STACK.md - Monthly cost breakdown',
        'Update AI_WORKFLOW_GUIDE.md - If AI tool',
        'Update DECISIONS_LOG.md - Why chosen'
    ],
    'mcp_built': [
        'Create documentation in automation-library/',
        'Update QUICK_STARTS.md - If client-facing',
        'Update OPERATIONS_MANUAL.md - If internal workflow',
        'Update CONTEXT.md - If affects current capabilities'
    ],
    'tech_changed': [
        'Update TECH_STACK.md - Tool added/removed/changed',
        'Update DECISIONS_LOG.md - Why changed',
        'Update CONTEXT.md - If affects current stack',
        'Update affected client docs if impacts delivery'
    ]
}

class ContextManager:
    def __init__(self):
        self.project_root = PROJECT_ROOT
        self.docs_dir = DOCS_DIR
        
    def get_file_last_modified(self, file_path):
        """Get last modified date of a file"""
        if not file_path.exists():
            return None
        return datetime.fromtimestamp(file_path.stat().st_mtime)
    
    def check_context_age(self):
        """Check how old CONTEXT.md is"""
        if not CONTEXT_FILE.exists():
            return None, "CONTEXT.md not found!"
        
        last_modified = self.get_file_last_modified(CONTEXT_FILE)
        days_old = (datetime.now() - last_modified).days
        
        if days_old > 7:
            return days_old, f"⚠️ CONTEXT.md is {days_old} days old - should be updated weekly"
        elif days_old > 3:
            return days_old, f"ℹ️ CONTEXT.md is {days_old} days old - consider updating"
        else:
            return days_old, f"✅ CONTEXT.md is current ({days_old} days old)"
    
    def check_decisions_pending(self):
        """Check if there are decisions in DECISIONS_LOG that need review"""
        if not DECISIONS_LOG_FILE.exists():
            return []
        
        with open(DECISIONS_LOG_FILE, 'r') as f:
            content = f.read()
        
        pending = []
        if "Decisions to Revisit" in content:
            # Simple check - look for review dates
            lines = content.split('\n')
            in_section = False
            for line in lines:
                if "Decisions to Revisit" in line:
                    in_section = True
                    continue
                if in_section and line.strip().startswith('-'):
                    pending.append(line.strip())
        
        return pending
    
    def suggest_updates(self):
        """Suggest what needs updating based on file ages and git changes"""
        suggestions = []
        
        # Check CONTEXT.md age
        days_old, message = self.check_context_age()
        if days_old and days_old > 3:
            suggestions.append({
                'file': 'CONTEXT.md',
                'priority': 'high' if days_old > 7 else 'medium',
                'reason': message,
                'action': 'Review and update current priorities, client status, and recent decisions'
            })
        
        # Check for recent git changes that might need documentation
        try:
            result = subprocess.run(
                ['git', 'log', '--since', '3 days ago', '--name-only', '--pretty=format:%h %s'],
                cwd=self.project_root,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if result.returncode == 0 and result.stdout:
                changed_files = result.stdout.split('\n')
                client_changes = [f for f in changed_files if 'clients/' in f]
                if client_changes:
                    suggestions.append({
                        'file': 'CLIENT_STATUS.md',
                        'priority': 'medium',
                        'reason': 'Recent client file changes detected',
                        'action': 'Update CLIENT_STATUS.md if client status changed'
                    })
        except:
            pass  # Git not available or not a git repo
        
        return suggestions
    
    def update_context_date(self):
        """Update the 'Last Updated' date in CONTEXT.md"""
        if not CONTEXT_FILE.exists():
            return False
        
        with open(CONTEXT_FILE, 'r') as f:
            content = f.read()
        
        today = datetime.now().strftime("%B %d, %Y")
        
        # Update the date line
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if line.startswith('**Last Updated:**'):
                lines[i] = f'**Last Updated:** {today}'
                break
        
        with open(CONTEXT_FILE, 'w') as f:
            f.write('\n'.join(lines))
        
        return True
    
    def generate_status_report(self):
        """Generate a status report of all context files"""
        report = {
            'timestamp': datetime.now().isoformat(),
            'files': {}
        }
        
        files_to_check = {
            'CONTEXT.md': CONTEXT_FILE,
            'CLIENT_STATUS.md': CLIENT_STATUS_FILE,
            'DECISIONS_LOG.md': DECISIONS_LOG_FILE,
        }
        
        for name, path in files_to_check.items():
            if path.exists():
                last_modified = self.get_file_last_modified(path)
                days_old = (datetime.now() - last_modified).days
                status = 'current' if days_old <= 3 else ('warning' if days_old <= 7 else 'outdated')
                report['files'][name] = {
                    'exists': True,
                    'path': str(path.relative_to(self.project_root)),
                    'last_modified': last_modified.isoformat() if last_modified else None,
                    'days_old': days_old,
                    'status': status,
                    'description': self._get_file_description(name)
                }
            else:
                report['files'][name] = {
                    'exists': False,
                    'path': str(path.relative_to(self.project_root)) if path else None
                }
        
        # Add suggestions
        report['suggestions'] = self.suggest_updates()
        
        return report
    
    def _get_file_description(self, filename):
        """Get description for a file"""
        descriptions = {
            'CONTEXT.md': 'Master context file - your "start here" document',
            'CLIENT_STATUS.md': 'Client pipeline and status tracking',
            'DECISIONS_LOG.md': 'Chronological decision history'
        }
        return descriptions.get(filename, 'Documentation file')
    
    def save_status_json(self, output_path=None):
        """Save status report as JSON file for dashboard"""
        if output_path is None:
            output_path = self.project_root / "automation-system" / "status.json"
        
        report = self.generate_status_report()
        
        with open(output_path, 'w') as f:
            json.dump(report, f, indent=2)
        
        return output_path
    
    def show_checklist_prompt(self, change_type):
        """Show relevant checklist items for a specific change type"""
        if change_type not in CHECKLIST_PROMPTS:
            print(f"❌ Unknown change type: {change_type}")
            return
        
        items = CHECKLIST_PROMPTS[change_type]
        print(f"\n📋 CHECKLIST: {change_type.replace('_', ' ').title()}")
        print("="*60)
        
        checked = []
        for i, item in enumerate(items, 1):
            print(f"\n{i}. {item}")
            response = input("   ✅ Done? (y/n/skip): ").strip().lower()
            if response == 'y':
                checked.append(i)
                print("   ✓ Marked as done")
        
        print(f"\n✅ Completed {len(checked)}/{len(items)} items")
        return checked
    
    def detect_changes(self):
        """Detect what type of changes were made based on git"""
        try:
            result = subprocess.run(
                ['git', 'diff', '--name-only', 'HEAD'],
                cwd=self.project_root,
                capture_output=True,
                text=True,
                timeout=5
            )
            
            if result.returncode != 0 or not result.stdout:
                return []
            
            changed_files = result.stdout.strip().split('\n')
            detected_changes = []
            
            # Check for client changes
            if any('clients/' in f for f in changed_files):
                detected_changes.append('client_won')
            
            # Check for service/quick start changes
            if any('QUICK_STARTS' in f.upper() for f in changed_files):
                detected_changes.append('service_added')
            
            # Check for tech stack changes
            if any('TECH_STACK' in f.upper() for f in changed_files):
                detected_changes.append('tech_changed')
            
            # Check for MCP/automation changes
            if any('automation' in f.lower() or 'mcp' in f.lower() for f in changed_files):
                detected_changes.append('mcp_built')
            
            return detected_changes
        except:
            return []
    
    def interactive_update(self):
        """Interactive mode for updating context files"""
        print("\n" + "="*60)
        print("BRANDED + FLOW - Context Manager")
        print("="*60 + "\n")
        
        # Show current status
        days_old, message = self.check_context_age()
        print(f"📄 CONTEXT.md Status: {message}\n")
        
        # Show suggestions
        suggestions = self.suggest_updates()
        if suggestions:
            print("💡 Suggested Updates:")
            for i, suggestion in enumerate(suggestions, 1):
                priority_icon = "🔴" if suggestion['priority'] == 'high' else "🟡"
                print(f"  {priority_icon} {suggestion['file']}: {suggestion['reason']}")
                print(f"     → {suggestion['action']}\n")
        else:
            print("✅ All context files appear current!\n")
        
        # Show pending decisions
        pending = self.check_decisions_pending()
        if pending:
            print("📋 Decisions to Revisit:")
            for item in pending[:5]:  # Show first 5
                print(f"  • {item}")
            print()
        
        # Detect changes and show prompts
        detected = self.detect_changes()
        if detected:
            print("🔍 Detected changes:")
            for change in detected:
                print(f"  • {change.replace('_', ' ').title()}")
            print()
            show_prompt = input("Show checklist prompts for these changes? (y/n): ").strip().lower()
            if show_prompt == 'y':
                for change in detected:
                    self.show_checklist_prompt(change)
        
        # Options
        print("\n" + "="*60)
        print("Options:")
        print("  1. Update CONTEXT.md 'Last Updated' date")
        print("  2. View full status report")
        print("  3. Show checklist for a change type")
        print("  4. Open UPDATE_CHECKLIST.md")
        print("  5. Exit")
        
        choice = input("\nChoose an option (1-5): ").strip()
        
        if choice == '1':
            if self.update_context_date():
                print("✅ Updated CONTEXT.md date!")
            else:
                print("❌ Failed to update")
        elif choice == '2':
            report = self.generate_status_report()
            print("\n" + json.dumps(report, indent=2))
        elif choice == '3':
            print("\nAvailable change types:")
            for i, change_type in enumerate(CHECKLIST_PROMPTS.keys(), 1):
                print(f"  {i}. {change_type.replace('_', ' ').title()}")
            try:
                selection = int(input("\nSelect (1-{}): ".format(len(CHECKLIST_PROMPTS))))
                change_type = list(CHECKLIST_PROMPTS.keys())[selection - 1]
                self.show_checklist_prompt(change_type)
            except (ValueError, IndexError):
                print("Invalid selection")
        elif choice == '4':
            if sys.platform == 'darwin':
                subprocess.run(['open', str(UPDATE_CHECKLIST)])
            elif sys.platform == 'win32':
                subprocess.run(['start', str(UPDATE_CHECKLIST)], shell=True)
            else:
                print(f"File location: {UPDATE_CHECKLIST}")
        elif choice == '5':
            print("Goodbye!")
        else:
            print("Invalid choice")

def main():
    manager = ContextManager()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == 'check':
            days_old, message = manager.check_context_age()
            print(message)
        elif command == 'update-date':
            if manager.update_context_date():
                print("✅ Updated CONTEXT.md date")
            else:
                print("❌ Failed to update")
        elif command == 'report':
            report = manager.generate_status_report()
            print(json.dumps(report, indent=2))
        elif command == 'update-json':
            output_path = manager.save_status_json()
            print(f"✅ Status saved to: {output_path}")
        elif command == 'suggest':
            suggestions = manager.suggest_updates()
            for s in suggestions:
                print(f"{s['file']}: {s['reason']}")
        elif command == 'prompt':
            if len(sys.argv) > 2:
                change_type = sys.argv[2]
                manager.show_checklist_prompt(change_type)
            else:
                print("Available change types:")
                for change_type in CHECKLIST_PROMPTS.keys():
                    print(f"  - {change_type}")
                print("\nUsage: context_manager.py prompt <change_type>")
        else:
            print("Usage: context_manager.py [check|update-date|report|update-json|suggest|prompt]")
    else:
        manager.interactive_update()

if __name__ == "__main__":
    main()

