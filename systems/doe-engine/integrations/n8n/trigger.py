"""
n8n Webhook Integration
"""

import os
import requests
import sys
from pathlib import Path
from typing import Dict, Any

# Add parent to path for base import
sys.path.insert(0, str(Path(__file__).parent.parent))
from base import BaseIntegration

def trigger_workflow(task_id: str, ack_token: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """Trigger n8n workflow via webhook"""
    integration = BaseIntegration()
    
    # Validate token
    validation = integration.validate_token(ack_token)
    if not validation:
        raise ValueError("Invalid ACK token")
    
    webhook_url = os.getenv('N8N_WEBHOOK_URL')
    if not webhook_url:
        raise ValueError("N8N_WEBHOOK_URL not set")
    
    try:
        response = requests.post(
            webhook_url,
            json={
                'task_id': task_id,
                'ack_token': ack_token[:20] + '...',  # Don't send full token
                'payload': payload
            },
            timeout=30
        )
        response.raise_for_status()
        
        integration.log_operation(task_id, 'n8n_trigger', 'success')
        return {'success': True, 'response': response.json()}
    
    except Exception as e:
        integration.log_operation(task_id, 'n8n_trigger', 'failed', str(e))
        return {'success': False, 'error': str(e)}
