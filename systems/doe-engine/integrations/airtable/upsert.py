"""
Airtable Integration
"""

import os
import requests
import sys
from pathlib import Path
from typing import Dict, Any, Optional

# Add parent to path for base import
sys.path.insert(0, str(Path(__file__).parent.parent))
from base import BaseIntegration

def upsert_to_airtable(task_id: str, ack_token: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """Upsert data to Airtable"""
    integration = BaseIntegration()
    
    # Validate token
    validation = integration.validate_token(ack_token)
    if not validation:
        raise ValueError("Invalid ACK token")
    
    api_key = os.getenv('AIRTABLE_API_KEY')
    base_id = os.getenv('AIRTABLE_BASE_ID')
    
    if not api_key or not base_id:
        raise ValueError("AIRTABLE_API_KEY or AIRTABLE_BASE_ID not set")
    
    table_name = payload.get('table', 'Tasks')
    records = payload.get('records', [])
    
    if not records:
        return {'success': False, 'error': 'No records provided'}
    
    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/json'
    }
    
    url = f'https://api.airtable.com/v0/{base_id}/{table_name}'
    
    try:
        # Upsert records
        response = requests.patch(
            url,
            json={'records': records},
            headers=headers,
            timeout=30
        )
        response.raise_for_status()
        
        integration.log_operation(task_id, 'airtable_upsert', 'success', f'{len(records)} records')
        return {'success': True, 'response': response.json()}
    
    except Exception as e:
        integration.log_operation(task_id, 'airtable_upsert', 'failed', str(e))
        return {'success': False, 'error': str(e)}
