#!/usr/bin/env node

/**
 * Branded + Flow MCP Server
 * HTTP server for executing deterministic operations (DOE method execution layer)
 */

require('dotenv').config();
const express = require('express');
const fs = require('fs-extra');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 4000;
const API_KEYS = (process.env.MCP_API_KEYS || 'key1').split(',');
const PROJECT_ROOT = process.env.PROJECT_ROOT || process.cwd();

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

// Start Server
async function start() {
  await loadAutomations();
  
  app.listen(PORT, () => {
    console.log('');
    console.log('🚀 Branded + Flow MCP Server');
    console.log(`📡 Listening on http://localhost:${PORT}`);
    console.log(`📋 Loaded ${Object.keys(automations).length} automations`);
    console.log('');
    console.log('Available endpoints:');
    console.log(`  GET  /health - Health check`);
    console.log(`  GET  /automations - List all automations`);
    console.log(`  POST /run - Execute an automation`);
    console.log('');
  });
}

start().catch(console.error);

