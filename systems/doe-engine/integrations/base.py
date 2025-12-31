"""
Base Integration Class
Provides common functionality for all integrations
"""

import os
import requests
from typing import Optional, Dict, Any

MCP_URL = os.getenv('MCP_URL', 'http://localhost:3001')

class BaseIntegration:
    """Base class for integrations"""
    
    @staticmethod
    def validate_token(ack_token: str) -> Optional[Dict[str, Any]]:
        """Validate ACK token via MCP endpoint"""
        try:
            response = requests.get(
                f'{MCP_URL}/mcp/validate-ack',
                params={'ack_token': ack_token},
                timeout=10
            )
            response.raise_for_status()
            result = response.json()
            return result if result.get('ok') else None
        except Exception:
            return None
    
    @staticmethod
    def log_operation(task_id: str, operation: str, status: str, details: str = ''):
        """Log integration operation"""
        print(f'[{operation}] Task: {task_id}, Status: {status}')
        if details:
            print(f'  Details: {details}')
