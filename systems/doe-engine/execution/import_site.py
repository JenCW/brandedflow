#!/usr/bin/env python3
"""
Import Site Execution Script
Validates ACK token, unzips site, and deploys to Netlify
"""

import os
import sys
import json
import zipfile
import shutil
import subprocess
import requests
from pathlib import Path

MCP_URL = os.getenv('MCP_URL', 'http://localhost:3001')

def validate_token(ack_token):
    """Validate ACK token via MCP endpoint"""
    try:
        response = requests.get(
            f'{MCP_URL}/mcp/validate-ack',
            params={'ack_token': ack_token},
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f'❌ Token validation failed: {e}', file=sys.stderr)
        return None

def main():
    if len(sys.argv) < 3:
        print('Usage: import_site.py <task_id> <ack_token> [payload_json]', file=sys.stderr)
        sys.exit(1)
    
    task_id = sys.argv[1]
    ack_token = sys.argv[2]
    payload_json = sys.argv[3] if len(sys.argv) > 3 else '{}'
    
    print(f'📋 Task ID: {task_id}')
    print(f'🔐 Validating token...')
    
    # Validate token FIRST
    validation = validate_token(ack_token)
    if not validation or not validation.get('ok'):
        print(f'❌ Token validation failed', file=sys.stderr)
        sys.exit(1)
    
    print(f'✅ Token validated')
    
    # Parse payload
    try:
        payload = json.loads(payload_json)
        zip_path = payload.get('zip')
        site_dir = payload.get('site_dir')
    except Exception as e:
        print(f'❌ Invalid payload JSON: {e}', file=sys.stderr)
        sys.exit(1)
    
    if not zip_path or not site_dir:
        print(f'❌ Missing required payload fields: zip, site_dir', file=sys.stderr)
        sys.exit(1)
    
    project_root = Path(__file__).parent.parent.parent.parent
    
    # Check if zip exists
    zip_file = project_root / zip_path
    if not zip_file.exists():
        print(f'❌ Zip file not found: {zip_file}', file=sys.stderr)
        sys.exit(1)
    
    # Extract to sites directory
    sites_dir = project_root / 'sites'
    sites_dir.mkdir(exist_ok=True)
    
    target_dir = project_root / site_dir
    target_dir.parent.mkdir(parents=True, exist_ok=True)
    
    print(f'📦 Extracting {zip_file.name} to {site_dir}...')
    
    try:
        # Remove existing directory if it exists
        if target_dir.exists():
            shutil.rmtree(target_dir)
        
        # Extract zip
        with zipfile.ZipFile(zip_file, 'r') as zip_ref:
            zip_ref.extractall(target_dir)
        
        print(f'✅ Extracted to {target_dir}')
    except Exception as e:
        print(f'❌ Failed to extract zip: {e}', file=sys.stderr)
        sys.exit(1)
    
    # Deploy to Netlify if token is available
    netlify_token = os.getenv('NETLIFY_AUTH_TOKEN')
    if netlify_token:
        print(f'🌐 Deploying to Netlify...')
        
        # Check for Netlify site ID in client folder
        site_id_file = None
        parts = site_dir.split('/')
        if len(parts) >= 2 and parts[0] == 'sites':
            client_name = parts[1] if len(parts) > 1 else None
            if client_name:
                netlify_config = project_root / 'clients' / client_name / '03_website' / 'netlify'
                if netlify_config.exists():
                    site_id_file = netlify_config
        
        # Use Netlify CLI if available, otherwise API
        try:
            # Try CLI first
            result = subprocess.run(
                ['netlify', 'deploy', '--dir', str(target_dir), '--prod'],
                capture_output=True,
                text=True,
                timeout=300,
                env={**os.environ, 'NETLIFY_AUTH_TOKEN': netlify_token}
            )
            
            if result.returncode == 0:
                print(f'✅ Netlify deployment successful')
            else:
                print(f'⚠️  Netlify CLI deployment failed: {result.stderr}', file=sys.stderr)
                print(f'  (Site extracted successfully, but deployment failed)')
        except FileNotFoundError:
            print(f'⚠️  Netlify CLI not found, skipping deployment')
            print(f'  (Site extracted to {target_dir})')
        except subprocess.TimeoutExpired:
            print(f'⚠️  Netlify deployment timed out', file=sys.stderr)
            sys.exit(1)
    else:
        print(f'ℹ️  NETLIFY_AUTH_TOKEN not set, skipping Netlify deployment')
        print(f'  (Site extracted to {target_dir})')
    
    print(f'✅ Import completed successfully')
    sys.exit(0)

if __name__ == '__main__':
    main()
