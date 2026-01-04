#!/usr/bin/env node

/**
 * Branded + Flow MCP Server
 * HTTP server for executing deterministic operations (DOE method execution layer)
 */

require('dotenv').config();
const express = require('express');
const fs = require('fs-extra');
const path = require('path');
const jwt = require('jsonwebtoken');
const Database = require('./db-helper');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3001; // Default to 3001 for dispatcher
const API_KEYS = (process.env.MCP_API_KEYS || 'key1').split(',');
const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd();
const MCP_SECRET = process.env.MCP_SECRET;

// SQLite Database
const dbPath = path.join(PROJECT_ROOT, 'db.sqlite');
let db;

// Load all automations from automations/ directory
// First check automations/mcps/ (preferred), then fall back to local automations/
const automations = {};

async function loadAutomations() {
  // Preferred location: automations/mcps/ at project root
  const preferredDir = path.join(PROJECT_ROOT, 'automations', 'mcps');
  
  // Fallback: local automations/ directory
  const localDir = path.join(__dirname, 'automations');
  
  // Try preferred location first
  let automationsDir = preferredDir;
  if (!await fs.pathExists(preferredDir)) {
    automationsDir = localDir;
    if (!await fs.pathExists(localDir)) {
      await fs.ensureDir(localDir);
      console.log('📁 Created automations directory');
      return;
    }
  }
  
  if (!await fs.pathExists(automationsDir)) {
    await fs.ensureDir(automationsDir);
    console.log('📁 Created automations directory');
    return;
  }

  const files = await fs.readdir(automationsDir);
  const jsFiles = files.filter(f => f.endsWith('.js'));

  for (const file of jsFiles) {
    try {
      const automation = require(path.join(automationsDir, file));
      const name = path.basename(file, '.js');
      automations[name] = automation;
      console.log(`✅ Loaded automation: ${name}`);
    } catch (error) {
      console.error(`❌ Failed to load ${file}:`, error.message);
    }
  }
}

// API Key Middleware
function validateApiKey(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ 
      ok: false, 
      error: 'Missing X-API-Key header' 
    });
  }

  if (!API_KEYS.includes(apiKey)) {
    return res.status(403).json({ 
      ok: false, 
      error: 'Invalid API key' 
    });
  }

  next();
}

// Health Check
app.get('/health', (req, res) => {
  res.json({ 
    ok: true, 
    status: 'running',
    automations: Object.keys(automations),
    timestamp: new Date().toISOString()
  });
});

// List Available Automations
app.get('/automations', validateApiKey, (req, res) => {
  const list = Object.keys(automations).map(name => {
    const automation = automations[name];
    return {
      name,
      description: automation.description || 'No description',
      params: automation.params || {}
    };
  });

  res.json({ ok: true, automations: list });
});

// Execute Automation
app.post('/run', validateApiKey, async (req, res) => {
  const { automation: automationName, params = {}, dryRun = false } = req.body;

  if (!automationName) {
    return res.status(400).json({ 
      ok: false, 
      error: 'Missing "automation" parameter' 
    });
  }

  if (!automations[automationName]) {
    return res.status(404).json({ 
      ok: false, 
      error: `Automation "${automationName}" not found`,
      available: Object.keys(automations)
    });
  }

  const automation = automations[automationName];

  try {
    console.log(`🚀 Executing: ${automationName} (dryRun: ${dryRun})`);
    
    if (dryRun) {
      return res.json({
        ok: true,
        dryRun: true,
        message: `Would execute: ${automationName}`,
        params
      });
    }

    // Execute the automation
    const result = await automation.execute(params, { PROJECT_ROOT, dryRun });
    
    res.json({
      ok: true,
      dryRun: false,
      automation: automationName,
      result
    });

  } catch (error) {
    console.error(`❌ Error executing ${automationName}:`, error);
    res.status(500).json({
      ok: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// ============================================
// DOE DISPATCHER: Database Setup
// ============================================

function initDatabase() {
  if (!MCP_SECRET) {
    console.error('⚠️  MCP_SECRET not set in .env - required for JWT signing');
    console.error('⚠️  Dispatcher endpoints will not work without MCP_SECRET');
  }
  
  db = new Database(dbPath);
  
  // Create tables (async)
  (async () => {
    try {
      await db.exec(`
    CREATE TABLE IF NOT EXISTS directives (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_type TEXT NOT NULL,
      project_id TEXT NOT NULL,
      version INTEGER NOT NULL,
      content TEXT NOT NULL,
      require_ack INTEGER NOT NULL DEFAULT 0,
      auto_anneal INTEGER NOT NULL DEFAULT 0,
      retry_config TEXT,
      fix_script TEXT,
      owner TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(task_type, project_id, version)
    );
    
    CREATE TABLE IF NOT EXISTS acks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      actor_id TEXT NOT NULL,
      ack_token TEXT NOT NULL,
      token_string TEXT NOT NULL,
      directive_version INTEGER NOT NULL,
      answers_json TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );
    
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      task_type TEXT NOT NULL,
      project_id TEXT NOT NULL,
      directive_id INTEGER,
      status TEXT NOT NULL DEFAULT 'pending',
      payload_json TEXT,
      ack_id INTEGER,
      attempts INTEGER NOT NULL DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (directive_id) REFERENCES directives(id),
      FOREIGN KEY (ack_id) REFERENCES acks(id)
    );
    
    CREATE TABLE IF NOT EXISTS task_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      log_type TEXT NOT NULL,
      content TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );
    
    CREATE TABLE IF NOT EXISTS failures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      error_type TEXT NOT NULL,
      classification TEXT NOT NULL,
      stdout TEXT,
      stderr TEXT,
      attempts INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );
    
    CREATE TABLE IF NOT EXISTS anneal_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      aid TEXT NOT NULL UNIQUE,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      completed_at DATETIME,
      FOREIGN KEY (task_id) REFERENCES tasks(id)
    );
    
    CREATE INDEX IF NOT EXISTS idx_tasks_status ON tasks(status);
    CREATE INDEX IF NOT EXISTS idx_acks_token ON acks(token_string);
    CREATE INDEX IF NOT EXISTS idx_acks_expires ON acks(expires_at);
      `);
      console.log('✅ Database initialized');
    } catch (error) {
      console.error('❌ Database initialization error:', error);
      process.exit(1);
    }
  })();
}

// Parse front-matter from directive markdown
function parseDirectiveFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    return { frontMatter: {}, body: content };
  }
  
  const frontMatterText = match[1];
  const body = match[2];
  const frontMatter = {};
  
  // Simple YAML parsing (basic key: value)
  frontMatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Handle nested objects (basic parsing)
      if (key === 'retry') {
        // Parse retry config
        const countMatch = value.match(/count:\s*(\d+)/);
        const backoffMatch = value.match(/backoff_ms:\s*(\d+)/);
        value = JSON.stringify({
          count: countMatch ? parseInt(countMatch[1]) : 2,
          backoff_ms: backoffMatch ? parseInt(backoffMatch[1]) : 5000
        });
      } else if (value === 'true') value = 1;
      else if (value === 'false') value = 0;
      else if (/^\d+$/.test(value)) value = parseInt(value);
      
      frontMatter[key] = value;
    }
  });
  
  return { frontMatter, body };
}

// Seed directives from files
async function seedDirectives() {
  const directivesDir = path.join(PROJECT_ROOT, 'systems', 'doe-engine', 'directives');
  
  if (!await fs.pathExists(directivesDir)) {
    console.log('⚠️  Directives directory not found, skipping seed');
    return;
  }
  
  const files = await fs.readdir(directivesDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  
  for (const file of mdFiles) {
    try {
      const filePath = path.join(directivesDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      const { frontMatter, body } = parseDirectiveFrontMatter(content);
      
      if (!frontMatter.task_type || !frontMatter.project_id) {
        console.log(`⚠️  Skipping ${file} - missing task_type or project_id`);
        continue;
      }
      
      const stmt = db.prepare(`
        INSERT OR REPLACE INTO directives 
        (task_type, project_id, version, content, require_ack, auto_anneal, retry_config, fix_script, owner)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);
      
      await stmt.run(
        frontMatter.task_type,
        frontMatter.project_id || 'brandedflow',
        frontMatter.version || 1,
        body,
        frontMatter.require_ack === 1 || frontMatter.require_ack === 'true' ? 1 : 0,
        frontMatter.auto_anneal === 1 || frontMatter.auto_anneal === 'true' ? 1 : 0,
        frontMatter.retry || null,
        frontMatter.fix_script || null,
        frontMatter.owner || 'jen'
      );
      
      console.log(`✅ Seeded directive: ${frontMatter.task_type}`);
    } catch (error) {
      console.error(`❌ Failed to seed directive ${file}:`, error.message);
    }
  }
}

// ============================================
// DOE DISPATCHER: Endpoints
// ============================================

// POST /tasks - Create task, return directive
app.post('/tasks', validateApiKey, async (req, res) => {
  const { task_type, project_id, task_id, actor_id, payload_json } = req.body;
  
  if (!task_type || !project_id || !task_id || !actor_id) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields: task_type, project_id, task_id, actor_id'
    });
  }
  
  try {
    // Look up directive
    const directiveStmt = db.prepare(`
      SELECT * FROM directives 
      WHERE task_type = ? AND project_id = ?
      ORDER BY version DESC LIMIT 1
    `);
    const directive = await directiveStmt.get(task_type, project_id);
    
    if (!directive) {
      return res.status(404).json({
        ok: false,
        error: `Directive not found for task_type: ${task_type}, project_id: ${project_id}`
      });
    }
    
    // Create task
    const insertTask = db.prepare(`
      INSERT INTO tasks (id, task_type, project_id, directive_id, status, payload_json)
      VALUES (?, ?, ?, ?, 'pending', ?)
    `);
    
    await insertTask.run(task_id, task_type, project_id, directive.id, payload_json || null);
    
    res.json({
      ok: true,
      task_id,
      directive: {
        id: directive.id,
        task_type: directive.task_type,
        version: directive.version,
        content: directive.content,
        require_ack: directive.require_ack === 1,
        auto_anneal: directive.auto_anneal === 1,
        retry: directive.retry_config ? JSON.parse(directive.retry_config) : null,
        fix_script: directive.fix_script
      }
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint')) {
      return res.status(409).json({
        ok: false,
        error: `Task ${task_id} already exists`
      });
    }
    throw error;
  }
});

// POST /mcp/acknowledge - Create ACK, issue token
app.post('/mcp/acknowledge', validateApiKey, async (req, res) => {
  const { task_id, actor_id, answers_json } = req.body;
  
  if (!task_id || !actor_id) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields: task_id, actor_id'
    });
  }
  
  try {
    // Get task and directive
    const taskStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = await taskStmt.get(task_id);
    if (!task) {
      return res.status(404).json({ ok: false, error: 'Task not found' });
    }
    
    const directiveStmt = db.prepare('SELECT * FROM directives WHERE id = ?');
    const directive = await directiveStmt.get(task.directive_id);
    if (!directive) {
      return res.status(404).json({ ok: false, error: 'Directive not found' });
    }
  
  // Generate JWT token (TTL 15 minutes)
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
  const tokenPayload = {
    task_id,
    actor_id,
    directive_id: directive.id,
    directive_version: directive.version,
    exp: Math.floor(expiresAt.getTime() / 1000)
  };
  
  const ack_token = jwt.sign(tokenPayload, MCP_SECRET);
  
  // Store ACK record
  const insertAck = db.prepare(`
    INSERT INTO acks (task_id, actor_id, ack_token, token_string, directive_version, answers_json, expires_at)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  
    const ackResult = await insertAck.run(
      task_id,
      actor_id,
      ack_token,
      ack_token, // Store token string for validation
      directive.version,
      answers_json ? JSON.stringify(answers_json) : null,
      expiresAt.toISOString()
    );
    
    // Update task status to queued
    const updateTask = db.prepare('UPDATE tasks SET status = ?, ack_id = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    await updateTask.run('queued', ackResult.lastInsertRowid, task_id);
    
    res.json({
      ok: true,
      ack_token,
      expires_at: expiresAt.toISOString()
    });
  } catch (error) {
    console.error('Error in /mcp/acknowledge:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// GET /mcp/validate-ack - Validate token
app.get('/mcp/validate-ack', async (req, res) => {
  const { ack_token } = req.query;
  
  if (!ack_token) {
    return res.status(400).json({
      ok: false,
      error: 'Missing ack_token parameter'
    });
  }
  
  try {
    // Verify JWT signature
    const decoded = jwt.verify(ack_token, MCP_SECRET);
    
    // Check database record
    const ackStmt = db.prepare(`
      SELECT a.*, d.version as directive_version 
      FROM acks a
      JOIN tasks t ON a.task_id = t.id
      JOIN directives d ON t.directive_id = d.id
      WHERE a.token_string = ? AND a.expires_at > datetime('now')
    `);
    const ack = await ackStmt.get(ack_token);
    
    if (!ack) {
      return res.status(401).json({
        ok: false,
        error: 'ACK token not found or expired'
      });
    }
    
    // Verify directive version matches
    if (ack.directive_version !== decoded.directive_version) {
      return res.status(401).json({
        ok: false,
        error: 'Directive version mismatch'
      });
    }
    
    res.json({
      ok: true,
      task_id: decoded.task_id,
      actor_id: decoded.actor_id,
      directive_version: decoded.directive_version
    });
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        ok: false,
        error: 'Invalid or expired token'
      });
    }
    throw error;
  }
});

// GET /tasks/:id/status - Get task status and logs
app.get('/tasks/:id/status', validateApiKey, async (req, res) => {
  const { id } = req.params;
  
  try {
    const taskStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = await taskStmt.get(id);
    if (!task) {
      return res.status(404).json({ ok: false, error: 'Task not found' });
    }
    
    const logsStmt = db.prepare('SELECT * FROM task_logs WHERE task_id = ? ORDER BY timestamp ASC');
    const logs = await logsStmt.all(id);
  
    res.json({
      ok: true,
      task: {
        id: task.id,
        task_type: task.task_type,
        status: task.status,
        attempts: task.attempts,
        created_at: task.created_at,
        updated_at: task.updated_at
      },
      logs
    });
  } catch (error) {
    console.error('Error in /tasks/:id/status:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// POST /tasks/:id/failure - Record failure, create anneal bundle
app.post('/tasks/:id/failure', validateApiKey, async (req, res) => {
  const { id } = req.params;
  const { error_type, classification, stdout, stderr, attempts } = req.body;
  
  if (!error_type || !classification) {
    return res.status(400).json({
      ok: false,
      error: 'Missing required fields: error_type, classification'
    });
  }
  
  try {
    // Record failure
    const insertFailure = db.prepare(`
      INSERT INTO failures (task_id, error_type, classification, stdout, stderr, attempts)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    await insertFailure.run(id, error_type, classification, stdout || null, stderr || null, attempts || 0);
    
    // Get task and directive for anneal bundle
    const taskStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
    const task = await taskStmt.get(id);
    const directiveStmt = db.prepare('SELECT * FROM directives WHERE id = ?');
    const directive = await directiveStmt.get(task.directive_id);
  
  // Create anneal bundle
  const aid = `anneal_${Date.now()}_${id}`;
  const annealDir = path.join(PROJECT_ROOT, 'systems', 'doe-engine', 'anneal-tasks', aid);
  
  (async () => {
    try {
      await fs.ensureDir(annealDir);
      
      // Create failure.json
      await fs.writeJSON(path.join(annealDir, 'failure.json'), {
        task_id: id,
        error_type,
        classification,
        stdout,
        stderr,
        attempts,
        timestamp: new Date().toISOString()
      });
      
      // Copy directive
      await fs.writeFile(path.join(annealDir, 'directive.md'), directive.content);
      
      // Copy execution script (if exists)
      if (directive.fix_script) {
        const scriptPath = path.join(PROJECT_ROOT, directive.fix_script);
        if (await fs.pathExists(scriptPath)) {
          await fs.copy(scriptPath, path.join(annealDir, 'execution_script.py'));
        }
      }
      
      // Save task payload
      if (task.payload_json) {
        await fs.writeFile(path.join(annealDir, 'task_payload.json'), task.payload_json);
      }
      
      // Create anneal task record
      const insertAnneal = db.prepare(`
        INSERT INTO anneal_tasks (task_id, aid, status)
        VALUES (?, ?, 'pending')
      `);
      await insertAnneal.run(id, aid);
      
      console.log(`📦 Created anneal bundle: ${aid}`);
    } catch (error) {
      console.error(`❌ Failed to create anneal bundle:`, error);
    }
  })();
  
  // Update task status
  const updateTask = db.prepare('UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
  await updateTask.run('needs_anneal', id);
  
  res.json({
    ok: true,
    aid,
    message: 'Failure recorded and anneal bundle created'
  });
  } catch (error) {
    console.error('Error in /tasks/:id/failure:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// POST /tasks/:id/anneal-complete - Mark anneal done, requeue
app.post('/tasks/:id/anneal-complete', validateApiKey, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Update anneal task status
    const updateAnneal = db.prepare(`
      UPDATE anneal_tasks 
      SET status = 'completed', completed_at = CURRENT_TIMESTAMP
      WHERE task_id = ?
    `);
    await updateAnneal.run(id);
    
    // Requeue task
    const updateTask = db.prepare('UPDATE tasks SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?');
    await updateTask.run('queued', id);
    
    res.json({
      ok: true,
      message: 'Anneal marked complete, task requeued'
    });
  } catch (error) {
    console.error('Error in /tasks/:id/anneal-complete:', error);
    res.status(500).json({ ok: false, error: error.message });
  }
});

// ============================================
// Start Server
// ============================================

async function start() {
  // Initialize database
  initDatabase();
  
  // Seed directives
  await seedDirectives();
  
  // Load automations
  await loadAutomations();
  
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Branded + Flow MCP Server (Unified)');
    console.log(`📡 Listening on http://localhost:${PORT}`);
    console.log(`📋 Loaded ${Object.keys(automations).length} automations`);
    console.log('');
    console.log('Existing endpoints (MCP Automations):');
    console.log(`  GET  /automations - List all automations`);
    console.log(`  POST /run - Execute an automation`);
    console.log('');
    console.log('DOE Dispatcher endpoints:');
    console.log(`  POST /tasks - Create task, return directive`);
    console.log(`  POST /mcp/acknowledge - Create ACK, issue token`);
    console.log(`  GET  /mcp/validate-ack - Validate token`);
    console.log(`  GET  /tasks/:id/status - Get task status`);
    console.log(`  POST /tasks/:id/failure - Record failure`);
    console.log(`  POST /tasks/:id/anneal-complete - Mark anneal done`);
    console.log('');
  });
}

start().catch(console.error);

