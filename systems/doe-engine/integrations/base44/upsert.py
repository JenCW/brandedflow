"""
Base44 API Integration
"""

import os
import requests
import sys
from pathlib import Path
from typing import Dict, Any

# Add parent to path for base import
sys.path.insert(0, str(Path(__file__).parent.parent))
from base import BaseIntegration

def upsert_to_base44(task_id: str, ack_token: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """Upsert data to Base44 API"""
    integration = BaseIntegration()
    
    # Validate token
    validation = integration.validate_token(ack_token)
    if not validation:
        raise ValueError("Invalid ACK token")
    
    api_key = os.getenv('BASE44_API_KEY')
    if not api_key:
        raise ValueError("BASE44_API_KEY not set")
    
    # Base44 API endpoint (adjust as needed)
    api_url = payload.get('api_url', 'https://api.base44.com/v1/upsert')
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'task_id': task_id,
        **payload.get('data', {})
    }
    
    try:
        response = requests.post(
            api_url,
            json=data,
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        
        integration.log_operation(task_id, 'base44_upsert', 'success')
        return {'success': True, 'response': response.json()}
    
    except Exception as e:
        integration.log_operation(task_id, 'base44_upsert', 'failed', str(e))
        return {'success': False, 'error': str(e)}
