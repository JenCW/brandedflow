#!/usr/bin/env python3
"""
Branded + Flow MCP Server
HTTP server for executing deterministic operations (DOE method execution layer)
"""

import os
import sys
import json
import importlib.util
from pathlib import Path
from datetime import datetime
from flask import Flask, request, jsonify
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

PORT = int(os.getenv('PORT', 4000))
API_KEYS = os.getenv('MCP_API_KEYS', 'key1').split(',')
PROJECT_ROOT = Path(os.getenv('PROJECT_ROOT', os.getcwd()))

# Load all automations from automations/ directory
automations = {}


def load_automations():
    """Load all Python automation modules from automations/mcps/"""
    # Preferred location: automations/mcps/ at project root
    preferred_dir = PROJECT_ROOT / 'automations' / 'mcps'
    
    # Fallback: local automations/ directory
    local_dir = Path(__file__).parent / 'automations'
    
    # Try preferred location first
    automations_dir = preferred_dir if preferred_dir.exists() else local_dir
    
    if not automations_dir.exists():
        automations_dir.mkdir(parents=True, exist_ok=True)
        print('📁 Created automations directory')
        return
    
    # Load all .py files
    for file in automations_dir.glob('*.py'):
        if file.name == '__init__.py':
            continue
            
        try:
            # Load the module
            spec = importlib.util.spec_from_file_location(file.stem, file)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
            
            # Get the automation name (filename without .py)
            name = file.stem
            automations[name] = module
            print(f'✅ Loaded automation: {name}')
        except Exception as error:
            print(f'❌ Failed to load {file.name}: {error}')


def validate_api_key():
    """Validate API key from request headers"""
    api_key = request.headers.get('X-API-Key')
    
    if not api_key:
        return jsonify({
            'ok': False,
            'error': 'Missing X-API-Key header'
        }), 401
    
    if api_key not in API_KEYS:
        return jsonify({
            'ok': False,
            'error': 'Invalid API key'
        }), 403
    
    return None


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'ok': True,
        'status': 'running',
        'automations': list(automations.keys()),
        'timestamp': datetime.now().isoformat()
    })


@app.route('/automations', methods=['GET'])
def list_automations():
    """List all available automations"""
    error_response = validate_api_key()
    if error_response:
        return error_response
    
    automations_list = []
    for name, module in automations.items():
        automation_info = {
            'name': name,
            'description': getattr(module, 'description', 'No description'),
            'params': getattr(module, 'params', {})
        }
        automations_list.append(automation_info)
    
    return jsonify({'ok': True, 'automations': automations_list})


@app.route('/run', methods=['POST'])
def run_automation():
    """Execute an automation"""
    error_response = validate_api_key()
    if error_response:
        return error_response
    
    data = request.get_json() or {}
    automation_name = data.get('automation')
    params = data.get('params', {})
    dry_run = data.get('dryRun', False)
    
    if not automation_name:
        return jsonify({
            'ok': False,
            'error': 'Missing "automation" parameter'
        }), 400
    
    if automation_name not in automations:
        return jsonify({
            'ok': False,
            'error': f'Automation "{automation_name}" not found',
            'available': list(automations.keys())
        }), 404
    
    module = automations[automation_name]
    
    try:
        print(f'🚀 Executing: {automation_name} (dryRun: {dry_run})')
        
        if dry_run:
            return jsonify({
                'ok': True,
                'dryRun': True,
                'message': f'Would execute: {automation_name}',
                'params': params
            })
        
        # Execute the automation
        context = {
            'PROJECT_ROOT': str(PROJECT_ROOT),
            'dryRun': dry_run
        }
        
        result = module.execute(params, context)
        
        return jsonify({
            'ok': True,
            'dryRun': False,
            'automation': automation_name,
            'result': result
        })
    
    except Exception as error:
        print(f'❌ Error executing {automation_name}: {error}')
        response = {
            'ok': False,
            'error': str(error)
        }
        if os.getenv('NODE_ENV') == 'development':
            import traceback
            response['stack'] = traceback.format_exc()
        
        return jsonify(response), 500


if __name__ == '__main__':
    load_automations()
    
    print('')
    print('🚀 Branded + Flow MCP Server')
    print(f'📡 Listening on http://localhost:{PORT}')
    print(f'📋 Loaded {len(automations)} automations')
    print('')
    print('Available endpoints:')
    print('  GET  /health - Health check')
    print('  GET  /automations - List all automations')
    print('  POST /run - Execute an automation')
    print('')
    
    app.run(host='0.0.0.0', port=PORT, debug=False)




