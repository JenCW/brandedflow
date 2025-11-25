#!/usr/bin/env node

// Quick smoke test for MCP server
const http = require('http');

const tests = [
  {
    name: 'Health check',
    method: 'GET',
    path: '/health',
    headers: {},
    expectStatus: 200
  },
  {
    name: 'Run without API key (should fail)',
    method: 'POST',
    path: '/run',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ automation: 'deploy-netlify' }),
    expectStatus: 401
  },
  {
    name: 'Run with invalid automation (should fail)',
    method: 'POST',
    path: '/run',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': 'key1' },
    body: JSON.stringify({ automation: 'nonexistent' }),
    expectStatus: 404
  },
  {
    name: 'Dry-run bump-deps (should succeed)',
    method: 'POST',
    path: '/run',
    headers: { 'Content-Type': 'application/json', 'X-API-Key': 'key1' },
    body: JSON.stringify({ automation: 'bump-deps', params: { owner: 'test', repo: 'test' }, dryRun: true }),
    expectStatus: 200
  }
];

async function runTests(host = 'localhost', port = 4000) {
  console.log(`Running smoke tests against http://${host}:${port}\n`);
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const response = await httpRequest(host, port, test);
      if (response.status === test.expectStatus) {
        console.log(`✓ ${test.name} (${response.status})`);
        passed++;
      } else {
        console.log(`✗ ${test.name} (expected ${test.expectStatus}, got ${response.status})`);
        failed++;
      }
    } catch (err) {
      console.log(`✗ ${test.name} (error: ${err.message})`);
      failed++;
    }
  }
  
  console.log(`\n${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

function httpRequest(host, port, test) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: host,
      port,
      path: test.path,
      method: test.method,
      headers: test.headers
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body: data });
      });
    });
    
    req.on('error', reject);
    if (test.body) req.write(test.body);
    req.end();
  });
}

const host = process.argv[2] || 'localhost';
const port = parseInt(process.argv[3] || '4000', 10);
runTests(host, port);
