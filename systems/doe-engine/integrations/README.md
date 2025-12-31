# DOE Integration Framework

Extensible integration framework for connecting with external services (n8n, Airtable, Base44, Netlify, etc.).

## Architecture

Each integration is a Python module under `systems/doe-engine/integrations/` that provides functions to interact with external services.

## Base Integration Pattern

All integrations should:
- Accept `task_id`, `ack_token`, and `payload` parameters
- Validate the ACK token before making external API calls
- Log operations and return results

## Adding a New Integration

1. Create a new directory: `systems/doe-engine/integrations/{service_name}/`
2. Create `__init__.py` and main integration file
3. Follow the pattern below:

```python
from .base import BaseIntegration

class MyIntegration(BaseIntegration):
    def execute(self, task_id, ack_token, payload):
        # Validate token
        if not self.validate_token(ack_token):
            raise ValueError("Invalid token")
        
        # Your integration logic here
        # Use env vars for API keys: os.getenv('MY_SERVICE_API_KEY')
        
        return {"success": True, "result": "..."}
```

4. Document required environment variables in this README
5. Update worker.py to include the integration if it needs to be called automatically

## Available Integrations

### Netlify
- **Location**: `netlify/deploy.py`
- **Env vars**: `NETLIFY_AUTH_TOKEN`
- **Usage**: Deploy sites to Netlify

### n8n
- **Location**: `n8n/trigger.py`
- **Env vars**: `N8N_WEBHOOK_URL`
- **Usage**: Trigger n8n workflows via webhook

### Airtable
- **Location**: `airtable/upsert.py`
- **Env vars**: `AIRTABLE_API_KEY`, `AIRTABLE_BASE_ID`
- **Usage**: Upsert data to Airtable

### Base44
- **Location**: `base44/upsert.py`
- **Env vars**: `BASE44_API_KEY`
- **Usage**: Upsert data to Base44 API

## Usage in Execution Scripts

Execution scripts can import and use integrations:

```python
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).parent.parent / 'integrations'))

from n8n.trigger import trigger_workflow

result = trigger_workflow(task_id, ack_token, payload)
```
