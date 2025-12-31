#!/usr/bin/env node
/**
 * Cursor Task Starter
 * Posts tasks to dispatcher, requires ACK, and polls for completion
 */

const readline = require('readline');
const https = require('https');
const http = require('http');

const MCP_URL = process.env.MCP_URL || 'http://localhost:3001';
const API_KEY = process.env.MCP_API_KEY || 'key1';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const httpModule = urlObj.protocol === 'https:' ? https : http;
    
    const req = httpModule.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.error || body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${body}`));
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function createTask(task_type, project_id, task_id, actor_id, payload_json) {
  console.log(`📋 Creating task: ${task_id} (${task_type})`);
  
  const response = await makeRequest(
    `${MCP_URL}/tasks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      }
    },
    {
      task_type,
      project_id,
      task_id,
      actor_id,
      payload_json
    }
  );
  
  return response;
}

async function acknowledgeTask(task_id, actor_id, answers) {
  console.log(`\n📝 Acknowledging task...`);
  
  const response = await makeRequest(
    `${MCP_URL}/mcp/acknowledge`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      }
    },
    {
      task_id,
      actor_id,
      answers_json: answers
    }
  );
  
  return response;
}

async function getTaskStatus(task_id) {
  const response = await makeRequest(
    `${MCP_URL}/tasks/${task_id}/status`,
    {
      method: 'GET',
      headers: {
        'X-API-Key': API_KEY
      }
    }
  );
  
  return response;
}

function displayDirective(directive) {
  console.log('\n' + '='.repeat(60));
  console.log(`DIRECTIVE: ${directive.task_type} (v${directive.version})`);
  console.log('='.repeat(60));
  console.log(directive.content);
  console.log('='.repeat(60));
  
  if (directive.require_ack) {
    console.log('\n⚠️  This task requires acknowledgment');
  }
  
  if (directive.retry) {
    console.log(`\n🔄 Retry config: ${directive.retry.count} attempts, ${directive.retry.backoff_ms}ms backoff`);
  }
}

async function requireAck() {
  let ack = '';
  while (ack !== 'ACK') {
    ack = await question('\n⚠️  Type "ACK" (all caps) to acknowledge and continue: ');
    if (ack !== 'ACK') {
      console.log('❌ Invalid acknowledgment. Please type exactly "ACK" (all caps).');
    }
  }
  console.log('✅ Acknowledged');
}

function printTokenPreview(token) {
  if (token && token.length > 20) {
    const preview = token.substring(0, 10) + '...' + token.substring(token.length - 10);
    console.log(`🔐 Token preview: ${preview}`);
  }
}

async function pollTaskStatus(task_id) {
  console.log('\n⏳ Polling for task completion...');
  
  const maxAttempts = 300; // 5 minutes max
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const status = await getTaskStatus(task_id);
      
      if (status.task.status === 'succeeded') {
        console.log('\n✅ Task completed successfully!');
        if (status.logs && status.logs.length > 0) {
          console.log('\n📋 Task Logs:');
          status.logs.forEach(log => {
            const prefix = log.log_type === 'stderr' ? '⚠️ ' : '  ';
            console.log(`${prefix}[${log.log_type}] ${log.content.substring(0, 200)}`);
          });
        }
        return { success: true, status };
      } else if (status.task.status === 'failed' || status.task.status === 'needs_anneal') {
        console.log(`\n❌ Task ${status.task.status}`);
        if (status.logs && status.logs.length > 0) {
          console.log('\n📋 Task Logs:');
          status.logs.forEach(log => {
            const prefix = log.log_type === 'stderr' ? '❌ ' : '  ';
            console.log(`${prefix}[${log.log_type}] ${log.content.substring(0, 200)}`);
          });
        }
        return { success: false, status };
      }
      
      // Still running
      process.stdout.write('.');
      attempts++;
      await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
      
    } catch (error) {
      console.error(`\n❌ Error polling status: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
  
  console.log('\n⏱️  Polling timeout - task may still be running');
  return { success: false, timeout: true };
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 4) {
    console.error('Usage: start-task.js <task_type> <project_id> <task_id> <actor_id> [payload_json]');
    process.exit(1);
  }
  
  const [task_type, project_id, task_id, actor_id, payload_json] = args;
  
  try {
    // Create task
    const taskResponse = await createTask(task_type, project_id, task_id, actor_id, payload_json || '{}');
    
    if (!taskResponse.ok) {
      console.error(`❌ Failed to create task: ${taskResponse.error}`);
      process.exit(1);
    }
    
    const directive = taskResponse.directive;
    
    // Display directive
    displayDirective(directive);
    
    // Require ACK if needed
    if (directive.require_ack) {
      await requireAck();
      
      // Acknowledge task
      const ackResponse = await acknowledgeTask(task_id, actor_id, null);
      
      if (!ackResponse.ok) {
        console.error(`❌ Failed to acknowledge task: ${ackResponse.error}`);
        process.exit(1);
      }
      
      printTokenPreview(ackResponse.ack_token);
      console.log(`⏰ Token expires at: ${new Date(ackResponse.expires_at).toLocaleString()}`);
    }
    
    // Poll for completion
    const result = await pollTaskStatus(task_id);
    
    rl.close();
    
    if (result.success) {
      process.exit(0);
    } else {
      process.exit(1);
    }
    
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}`);
    rl.close();
    process.exit(1);
  }
}

main();
