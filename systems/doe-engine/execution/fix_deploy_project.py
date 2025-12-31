#!/usr/bin/env python3
"""
Fix Deploy Project Script
Safe fixes for deployment issues (creates missing directories)
"""

import sys
from pathlib import Path

def main():
    project_root = Path(__file__).parent.parent.parent.parent
    
    print(f'🔧 Running safe fixes...')
    
    fixes_applied = False
    
    # Create releases directory if missing
    releases_dir = project_root / 'releases'
    if not releases_dir.exists():
        releases_dir.mkdir(parents=True, exist_ok=True)
        print(f'✅ Created releases directory: {releases_dir}')
        fixes_applied = True
    
    # Create sites directory if missing
    sites_dir = project_root / 'sites'
    if not sites_dir.exists():
        sites_dir.mkdir(parents=True, exist_ok=True)
        print(f'✅ Created sites directory: {sites_dir}')
        fixes_applied = True
    
    if fixes_applied:
        print(f'✅ Fixes applied successfully')
        sys.exit(0)
    else:
        print(f'ℹ️  No fixes needed (directories already exist)')
        sys.exit(1)  # Exit with 1 to indicate no fix was needed (but not an error)

if __name__ == '__main__':
    main()
