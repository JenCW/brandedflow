"""
Netlify Deployment Integration
"""

import os
import sys
import subprocess
from pathlib import Path

# Add parent to path for base import
sys.path.insert(0, str(Path(__file__).parent.parent))
from base import BaseIntegration

def deploy_to_netlify(task_id: str, ack_token: str, payload: dict) -> dict:
    """Deploy site to Netlify"""
    integration = BaseIntegration()
    
    # Validate token
    validation = integration.validate_token(ack_token)
    if not validation:
        raise ValueError("Invalid ACK token")
    
    netlify_token = os.getenv('NETLIFY_AUTH_TOKEN')
    if not netlify_token:
        raise ValueError("NETLIFY_AUTH_TOKEN not set")
    
    site_dir = payload.get('site_dir')
    if not site_dir:
        raise ValueError("Missing site_dir in payload")
    
    project_root = Path(__file__).parent.parent.parent.parent.parent
    target_dir = project_root / site_dir
    
    if not target_dir.exists():
        raise ValueError(f"Site directory not found: {target_dir}")
    
    try:
        result = subprocess.run(
            ['netlify', 'deploy', '--dir', str(target_dir), '--prod'],
            capture_output=True,
            text=True,
            timeout=300,
            env={**os.environ, 'NETLIFY_AUTH_TOKEN': netlify_token}
        )
        
        if result.returncode == 0:
            integration.log_operation(task_id, 'netlify_deploy', 'success')
            return {'success': True, 'output': result.stdout}
        else:
            integration.log_operation(task_id, 'netlify_deploy', 'failed', result.stderr)
            return {'success': False, 'error': result.stderr}
    
    except FileNotFoundError:
        raise ValueError("Netlify CLI not found")
    except subprocess.TimeoutExpired:
        raise ValueError("Netlify deployment timed out")
