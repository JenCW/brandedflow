require('dotenv').config();

const express = require('express');
const bodyParser = require('express').json;
const path = require('path');

const { authMiddleware } = require('./middleware/auth');
const github = require('./adapters/github');
const netlify = require('./adapters/netlify');
const airtable = require('./adapters/airtable');
const n8n = require('./adapters/n8n');

const examples = require('./examples');

const app = express();
app.use(bodyParser());

// Allowlist of automations that can be run
const ALLOWLIST = {
  'bump-deps': true,
  'deploy-netlify': true
};

app.get('/', (req, res) => {
  res.send('BrandedFlow MCP server. POST /run with X-API-Key header to trigger automations.');
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

// Run a named automation from examples (requires API key)
app.post('/run', authMiddleware(), async (req, res) => {
  try {
    const { automation, params, dryRun } = req.body;
    if (!automation) return res.status(400).json({ error: 'automation required' });
    if (!ALLOWLIST[automation]) return res.status(403).json({ error: `automation "${automation}" not in allowlist` });
    if (!examples[automation]) return res.status(404).json({ error: 'automation not found' });
    
    const result = await examples[automation]({ 
      adapters: { github, netlify, airtable, n8n }, 
      params,
      dryRun: dryRun === true
    });
    
    res.json({ ok: true, dryRun: dryRun === true, result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`MCP server listening on http://localhost:${PORT}`);
});
