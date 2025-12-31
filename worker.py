#!/usr/bin/env python3
"""
DOE Dispatcher Worker
Polls for queued tasks and executes Python execution scripts
"""

import os
import sys
import json
import time
import sqlite3
import subprocess
import requests
import re
from pathlib import Path
from datetime import datetime

PROJECT_ROOT = Path(__file__).parent
DB_PATH = PROJECT_ROOT / 'db.sqlite'
MCP_URL = os.getenv('MCP_URL', 'http://localhost:3001')
API_KEY = os.getenv('MCP_API_KEY', 'key1')

# Task type to script mapping
TASK_SCRIPTS = {
    'deploy-project': 'systems/doe-engine/execution/deploy_project.py',
    'import-site': 'systems/doe-engine/execution/import_site.py',
}

def get_db():
    """Get database connection"""
    return sqlite3.connect(DB_PATH)

def classify_error(stderr):
    """Classify error type (transient, infrastructure, script)"""
    if not stderr:
        return 'unknown'
    
    stderr_lower = stderr.lower()
    
    # Transient errors
    transient_patterns = [
        r'connection.*timeout',
        r'rate.*limit',
        r'temporary.*error',
        r'network.*error',
        r'503',
        r'502',
        r'429',
    ]
    
    for pattern in transient_patterns:
        if re.search(pattern, stderr_lower):
            return 'transient'
    
    # Infrastructure errors
    infra_patterns = [
        r'file.*not.*found',
        r'permission.*denied',
        r'no.*such.*file',
        r'environment.*variable',
        r'missing.*config',
        r'config.*error',
    ]
    
    for pattern in infra_patterns:
        if re.search(pattern, stderr_lower):
            return 'infrastructure'
    
    # Script errors
    script_patterns = [
        r'syntax.*error',
        r'indentation.*error',
        r'nameerror',
        r'typeerror',
        r'attributeerror',
        r'import.*error',
    ]
    
    for pattern in script_patterns:
        if re.search(pattern, stderr_lower):
            return 'script'
    
    return 'unknown'

def log_task(db, task_id, log_type, content):
    """Log task output"""
    db.execute(
        'INSERT INTO task_logs (task_id, log_type, content) VALUES (?, ?, ?)',
        (task_id, log_type, content)
    )
    db.commit()

def update_task_status(db, task_id, status, attempts=None):
    """Update task status"""
    if attempts is not None:
        db.execute(
            'UPDATE tasks SET status = ?, attempts = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            (status, attempts, task_id)
        )
    else:
        db.execute(
            'UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            (status, task_id)
        )
    db.commit()

def get_ack_token(db, task_id):
    """Get ACK token for task"""
    result = db.execute(
        'SELECT ack_token FROM acks WHERE task_id = ? ORDER BY created_at DESC LIMIT 1',
        (task_id,)
    ).fetchone()
    
    return result[0] if result else None

def record_failure(db, task_id, error_type, classification, stdout, stderr, attempts):
    """Record failure and create anneal bundle via API"""
    try:
        response = requests.post(
            f'{MCP_URL}/tasks/{task_id}/failure',
            headers={'X-API-Key': API_KEY, 'Content-Type': 'application/json'},
            json={
                'error_type': error_type,
                'classification': classification,
                'stdout': stdout,
                'stderr': stderr,
                'attempts': attempts
            },
            timeout=10
        )
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f'⚠️  Failed to record failure: {e}')
        return None

def run_fix_script(db, task_id, fix_script_path):
    """Run fix script if it exists"""
    if not fix_script_path or not (PROJECT_ROOT / fix_script_path).exists():
        return False
    
    print(f'🔧 Running fix script: {fix_script_path}')
    
    try:
        result = subprocess.run(
            [sys.executable, str(PROJECT_ROOT / fix_script_path)],
            capture_output=True,
            text=True,
            timeout=60,
            cwd=str(PROJECT_ROOT)
        )
        
        if result.returncode == 0:
            log_task(db, task_id, 'fix_stdout', result.stdout)
            print(f'✅ Fix script succeeded')
            return True
        else:
            log_task(db, task_id, 'fix_stderr', result.stderr)
            print(f'❌ Fix script failed: {result.stderr[:200]}')
            return False
    except Exception as e:
        print(f'❌ Error running fix script: {e}')
        return False

def process_task(db, task):
    """Process a single task"""
    task_id = task['id']
    task_type = task['task_type']
    payload_json = task['payload_json']
    
    print(f'\n📋 Processing task: {task_id} ({task_type})')
    
    # Get ACK token
    ack_token = get_ack_token(db, task_id)
    if not ack_token:
        print(f'⚠️  No ACK token found for task {task_id}')
        update_task_status(db, task_id, 'failed')
        return
    
    # Get script path
    script_path = TASK_SCRIPTS.get(task_type)
    if not script_path:
        print(f'❌ No script mapping for task_type: {task_type}')
        update_task_status(db, task_id, 'failed')
        return
    
    full_script_path = PROJECT_ROOT / script_path
    if not full_script_path.exists():
        print(f'❌ Script not found: {full_script_path}')
        update_task_status(db, task_id, 'failed')
        return
    
    # Get directive for retry config
    directive = db.execute(
        'SELECT retry_config, auto_anneal, fix_script FROM directives WHERE id = ?',
        (task['directive_id'],)
    ).fetchone()
    
    retry_config = json.loads(directive[0]) if directive and directive[0] else {'count': 2, 'backoff_ms': 5000}
    auto_anneal = directive[1] == 1 if directive else False
    fix_script = directive[2] if directive else None
    
    # Execute script
    attempts = task['attempts']
    max_attempts = retry_config.get('count', 2) + 1
    
    while attempts < max_attempts:
        attempts += 1
        print(f'🔄 Attempt {attempts}/{max_attempts}')
        
        # Build command
        cmd = [sys.executable, str(full_script_path), task_id, ack_token]
        if payload_json:
            cmd.append(payload_json)
        
        try:
            result = subprocess.run(
                cmd,
                capture_output=True,
                text=True,
                timeout=300,
                cwd=str(PROJECT_ROOT)
            )
            
            # Log output
            if result.stdout:
                log_task(db, task_id, 'stdout', result.stdout)
            if result.stderr:
                log_task(db, task_id, 'stderr', result.stderr)
            
            if result.returncode == 0:
                print(f'✅ Task {task_id} succeeded')
                update_task_status(db, task_id, 'succeeded', attempts)
                return
            else:
                print(f'❌ Task {task_id} failed (exit code {result.returncode})')
                
                # Classify error
                classification = classify_error(result.stderr)
                print(f'📊 Error classification: {classification}')
                
                # If last attempt, record failure
                if attempts >= max_attempts:
                    error_type = 'execution_failed'
                    record_failure(db, task_id, error_type, classification, result.stdout, result.stderr, attempts)
                    
                    # Try auto-anneal if enabled
                    if auto_anneal and fix_script:
                        print(f'🔧 Auto-anneal enabled, running fix script...')
                        if run_fix_script(db, task_id, fix_script):
                            # Fix succeeded, requeue
                            print(f'✅ Fix successful, requeuing task')
                            update_task_status(db, task_id, 'queued', attempts)
                            return
                    
                    # Mark as needs_anneal (already done by record_failure endpoint)
                    update_task_status(db, task_id, 'needs_anneal', attempts)
                    return
                
                # Wait before retry (exponential backoff)
                if attempts < max_attempts:
                    backoff_ms = retry_config.get('backoff_ms', 5000) * (2 ** (attempts - 1))
                    print(f'⏳ Waiting {backoff_ms}ms before retry...')
                    time.sleep(backoff_ms / 1000.0)
        
        except subprocess.TimeoutExpired:
            print(f'⏱️  Task {task_id} timed out')
            log_task(db, task_id, 'stderr', 'Task execution timed out after 300 seconds')
            update_task_status(db, task_id, 'failed', attempts)
            record_failure(db, task_id, 'timeout', 'transient', '', 'Task execution timed out', attempts)
            return
        
        except Exception as e:
            print(f'❌ Error executing task: {e}')
            log_task(db, task_id, 'stderr', str(e))
            update_task_status(db, task_id, 'failed', attempts)
            record_failure(db, task_id, 'execution_error', 'infrastructure', '', str(e), attempts)
            return

def main():
    """Main worker loop"""
    print('🚀 DOE Dispatcher Worker')
    print(f'📡 MCP URL: {MCP_URL}')
    print(f'📁 Project root: {PROJECT_ROOT}')
    print('⏳ Polling for tasks...\n')
    
    while True:
        try:
            db = get_db()
            db.row_factory = sqlite3.Row
            
            # Get queued tasks
            tasks = db.execute(
                'SELECT * FROM tasks WHERE status = ? ORDER BY created_at ASC LIMIT 1',
                ('queued',)
            ).fetchall()
            
            if tasks:
                task = dict(tasks[0])
                
                # Mark as running
                update_task_status(db, task['id'], 'running')
                db.close()
                
                # Process task
                process_task(get_db(), task)
            else:
                db.close()
                time.sleep(2)  # Poll every 2 seconds
        
        except KeyboardInterrupt:
            print('\n\n👋 Worker stopped')
            break
        except Exception as e:
            print(f'❌ Error in worker loop: {e}')
            import traceback
            traceback.print_exc()
            time.sleep(5)

if __name__ == '__main__':
    main()
