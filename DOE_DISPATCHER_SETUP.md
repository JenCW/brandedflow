# DOE Dispatcher Setup Guide

This guide covers the DOE Dispatcher system - a unified MCP server with task queuing, ACK tokens, worker execution, and self-annealing.

## Architecture

The system consists of:

1. **MCP Server** (`systems/mcp-server/index.js`) - Unified server with:
   - Existing MCP automations (`/automations`, `/run`) - Direct JavaScript execution
   - New DOE dispatcher endpoints - Task queue with ACK tokens

2. **Python Worker** (`worker.py`) - Polls for queued tasks and executes Python scripts

3. **Execution Scripts** (`systems/doe-engine/execution/`) - Python scripts that validate tokens and perform work

4. **Integration Framework** (`systems/doe-engine/integrations/`) - Extensible integrations for external services

5. **Cursor Helper** (`cursor/start-task.js`) - CLI tool to create tasks, display directives, require ACK

## Setup

### 1. Install Dependencies

```bash
cd systems/mcp-server
npm install
```

This installs:
- `sqlite3` - SQLite database (cross-platform compatible)
- `jsonwebtoken` - JWT token signing
- Existing dependencies (express, fs-extra, etc.)

**Note for Mac/Linux users**: `sqlite3` should install without issues. If you encounter build errors, ensure you have Python and build tools installed:
- macOS: `xcode-select --install`
- Linux: Install `build-essential` or equivalent

### 2. Environment Variables

Create or update `.env` file at repo root:

```bash
# Required for dispatcher
MCP_SECRET=your-secret-key-here-change-this

# MCP Server configuration
MCP_URL=http://localhost:3001
MCP_API_KEY=key1

# Optional: Integration API keys
NETLIFY_AUTH_TOKEN=your-netlify-token
AIRTABLE_API_KEY=your-airtable-key
AIRTABLE_BASE_ID=your-base-id
BASE44_API_KEY=your-base44-key
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/your-id
```

**⚠️ IMPORTANT**: 
- Never commit `.env` file (it's in `.gitignore`)
- `MCP_SECRET` is required for JWT token signing
- Rotate secrets regularly

### 3. Start the Dispatcher Server

```bash
cd systems/mcp-server
node index.js
```

The server will:
- Initialize SQLite database (`db.sqlite` at repo root)
- Seed directives from `systems/doe-engine/directives/*.md`
- Load MCP automations
- Start listening on port 3001 (or PORT from env)

**Note**: The server runs on port 3001 by default (or set via `PORT` env var).

### 4. Start the Worker

In a separate terminal:

```bash
python3 worker.py
```

The worker will:
- Poll for queued tasks every 2 seconds
- Execute Python scripts from `systems/doe-engine/execution/`
- Log output to database
- Handle retries and self-annealing

## Usage

### Creating a Task via Cursor Helper

```bash
node cursor/start-task.js <task_type> <project_id> <task_id> <actor_id> [payload_json]
```

**Example:**
```bash
node cursor/start-task.js import-site brandedflow TASK001 jen '{"zip":"releases/client1.zip","site_dir":"sites/client1"}'
```

**Flow:**
1. Creates task via `POST /tasks`
2. Displays directive content
3. Requires you to type "ACK" if `require_ack=true`
4. Gets ACK token via `POST /mcp/acknowledge`
5. Polls `GET /tasks/:id/status` until completion
6. Displays logs and exits

### Creating a Task Programmatically

```bash
curl -X POST http://localhost:3001/tasks \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "task_type": "deploy-project",
    "project_id": "brandedflow",
    "task_id": "TASK001",
    "actor_id": "jen",
    "payload_json": "{}"
  }'
```

Response includes the directive. Then acknowledge:

```bash
curl -X POST http://localhost:3001/mcp/acknowledge \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "task_id": "TASK001",
    "actor_id": "jen"
  }'
```

Returns `ack_token` (JWT, 15 min TTL).

### Direct MCP Automations (Existing System)

Still available via `/run` endpoint:

```bash
curl -X POST http://localhost:3001/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-client-folder",
    "params": {"client_name": "test-client"}
  }'
```

These are simple utilities that execute immediately (no queue, no ACK tokens).

## API Endpoints

### Dispatcher Endpoints

- `POST /tasks` - Create task, return directive
- `POST /mcp/acknowledge` - Create ACK, issue token
- `GET /mcp/validate-ack?ack_token=...` - Validate token
- `GET /tasks/:id/status` - Get task status and logs
- `POST /tasks/:id/failure` - Record failure, create anneal bundle
- `POST /tasks/:id/anneal-complete` - Mark anneal done, requeue

### MCP Automation Endpoints (Existing)

- `GET /automations` - List available automations
- `POST /run` - Execute automation immediately

## Execution Scripts

All execution scripts in `systems/doe-engine/execution/` must:

1. Accept args: `task_id`, `ack_token`, `[payload_json]`
2. Validate token FIRST via `GET /mcp/validate-ack`
3. Exit 0 on success, 1 on failure
4. Print logs to stdout/stderr

**Example structure:**
```python
import sys
import requests

def validate_token(ack_token):
    response = requests.get(f'{MCP_URL}/mcp/validate-ack', params={'ack_token': ack_token})
    return response.json().get('ok')

def main():
    task_id = sys.argv[1]
    ack_token = sys.argv[2]
    
    if not validate_token(ack_token):
        sys.exit(1)
    
    # Your work here
    sys.exit(0)
```

## Integration Framework

See `systems/doe-engine/integrations/README.md` for details on:
- Adding new integrations
- Integration patterns
- Available integrations (Netlify, n8n, Airtable, Base44)

## Self-Annealing

When a task fails:

1. Worker records failure via `POST /tasks/:id/failure`
2. Server creates anneal bundle in `systems/doe-engine/anneal-tasks/<aid>/`
3. Bundle contains: `failure.json`, `directive.md`, `execution_script.py`, `task_payload.json`
4. Human/LLM reviews bundle and proposes fix
5. After PR merge, call `POST /tasks/:id/anneal-complete` to requeue

## Database Schema

SQLite database (`db.sqlite` at repo root) contains:

- `directives` - Directive definitions
- `tasks` - Task queue
- `acks` - ACK records and tokens
- `task_logs` - Execution logs
- `failures` - Failure records
- `anneal_tasks` - Self-annealing tasks

Database is auto-created on server startup.

## Security

- **Fail-closed**: Execution scripts MUST validate token before doing work
- **Short-lived tokens**: 15 minute TTL
- **Token validation**: JWT signature + database record + directive version check
- **API keys**: Required for all endpoints (via `X-API-Key` header)
- **Secrets**: Never commit `.env` or API keys

## Troubleshooting

### Worker not picking up tasks

- Check worker is running: `python3 worker.py`
- Check task status: `GET /tasks/:id/status`
- Check database: `sqlite3 db.sqlite "SELECT * FROM tasks WHERE status='queued';"`

### Token validation failing

- Check `MCP_SECRET` is set in `.env`
- Check token hasn't expired (15 min TTL)
- Check database has ACK record: `sqlite3 db.sqlite "SELECT * FROM acks WHERE token_string LIKE '%...';"`

### Script execution failing

- Check script exists and is executable
- Check script validates token first
- Check logs: `sqlite3 db.sqlite "SELECT * FROM task_logs WHERE task_id='...';"`

## Next Steps

- Add more directives to `systems/doe-engine/directives/`
- Add more execution scripts to `systems/doe-engine/execution/`
- Add more integrations to `systems/doe-engine/integrations/`
- Configure CI/CD for production deployment
