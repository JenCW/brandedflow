/**
 * Helper Script: Get Outlook Refresh Token
 * 
 * This script helps you get your Outlook refresh token for OAuth 2.0.
 * Run this once to get your refresh token, then add it to your .env file.
 * 
 * Usage:
 *   node get-outlook-refresh-token.js
 * 
 * Make sure you have:
 *   - OUTLOOK_CLIENT_ID in .env
 *   - OUTLOOK_CLIENT_SECRET in .env
 *   - OUTLOOK_TENANT_ID in .env
 */

const express = require('express');
const http = require('http');
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 4000;
const CALLBACK_URL = `http://localhost:${PORT}/auth/outlook/callback`;

// Get credentials from .env
const CLIENT_ID = process.env.OUTLOOK_CLIENT_ID;
const CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET;
const TENANT_ID = process.env.OUTLOOK_TENANT_ID;


// Validate credentials
if (!CLIENT_ID || !CLIENT_SECRET || !TENANT_ID) {
  console.error('\n❌ Missing credentials in .env file!\n');
  console.error('Please make sure you have:');
  console.error('  - OUTLOOK_CLIENT_ID');
  console.error('  - OUTLOOK_CLIENT_SECRET');
  console.error('  - OUTLOOK_TENANT_ID');
  console.error('\nAdd them to: systems/mcp-server/.env\n');
  process.exit(1);
}

// OAuth scopes
const SCOPES = [
  'Mail.Read',
  'Mail.Send',
  'Mail.ReadWrite',
  'User.Read',
  'offline_access' // Important for refresh token!
].join(' ');

// Build authorization URL
const AUTH_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize?` +
  `client_id=${CLIENT_ID}` +
  `&response_type=code` +
  `&redirect_uri=${encodeURIComponent(CALLBACK_URL)}` +
  `&response_mode=query` +
  `&scope=${encodeURIComponent(SCOPES)}` +
  `&state=outlook-oauth-${Date.now()}`;

// Express route to handle callback
app.get('/auth/outlook/callback', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    res.send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ Authorization Error</h1>
          <p>${error}</p>
          <p>${req.query.error_description || ''}</p>
          <p><a href="/">Try Again</a></p>
        </body>
      </html>
    `);
    console.error('\n❌ Authorization error:', error);
    server.close();
    return;
  }

  if (!code) {
    res.send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ No authorization code received</h1>
          <p><a href="/">Try Again</a></p>
        </body>
      </html>
    `);
    console.error('\n❌ No authorization code received');
    server.close();
    return;
  }

  try {
    // Exchange authorization code for tokens
    const tokenUrl = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
    const tokenParams = new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: code,
      redirect_uri: CALLBACK_URL,
      grant_type: 'authorization_code',
      scope: SCOPES
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: tokenParams.toString()
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      res.send(`
        <html>
          <head><title>Error</title></head>
          <body style="font-family: Arial; padding: 40px; text-align: center;">
            <h1 style="color: red;">❌ Token Exchange Error</h1>
            <p>${tokenData.error}: ${tokenData.error_description || ''}</p>
            <p><a href="/">Try Again</a></p>
          </body>
        </html>
      `);
      console.error('\n❌ Token exchange error:', tokenData.error);
      console.error('Details:', tokenData.error_description);
      server.close();
      return;
    }

    const { access_token, refresh_token, expires_in } = tokenData;

    if (!refresh_token) {
      res.send(`
        <html>
          <head><title>Error</title></head>
          <body style="font-family: Arial; padding: 40px; text-align: center;">
            <h1 style="color: red;">❌ No Refresh Token</h1>
            <p>Make sure you included 'offline_access' in your OAuth scopes.</p>
            <p><a href="/">Try Again</a></p>
          </body>
        </html>
      `);
      console.error('\n❌ No refresh token received!');
      console.error('Make sure you included "offline_access" in your OAuth scopes.');
      server.close();
      return;
    }

    // Success! Show the refresh token
    res.send(`
      <html>
        <head><title>Success!</title></head>
        <body style="font-family: Arial; padding: 40px; max-width: 800px; margin: 0 auto;">
          <h1 style="color: green;">✅ Success!</h1>
          <p>Your refresh token has been generated.</p>
          
          <h2>Refresh Token:</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; word-break: break-all; font-family: monospace;">
            ${refresh_token}
          </div>
          
          <h2>Next Steps:</h2>
          <ol>
            <li>Copy the refresh token above</li>
            <li>Add it to your <code>.env</code> file:</li>
          </ol>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; margin: 20px 0;">
            OUTLOOK_REFRESH_TOKEN=${refresh_token}
          </div>
          
          <p><strong>⚠️ Keep this token secure! Don't share it publicly.</strong></p>
          
          <p style="margin-top: 30px;">
            <button onclick="navigator.clipboard.writeText('${refresh_token}')" 
                    style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
              Copy Refresh Token
            </button>
          </p>
          
          <p style="margin-top: 20px; color: #666;">
            Access token expires in: ${expires_in} seconds<br>
            (You'll use the refresh token to get new access tokens)
          </p>
        </body>
      </html>
    `);

    // Also show in console
    console.log('\n✅ SUCCESS! Refresh token received!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('REFRESH TOKEN:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(refresh_token);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📋 Add this to your .env file:');
    console.log(`OUTLOOK_REFRESH_TOKEN=${refresh_token}\n`);
    console.log('⚠️  Keep this token secure! Don\'t share it publicly.\n');
    console.log('Access token expires in:', expires_in, 'seconds');
    console.log('(You\'ll use the refresh token to get new access tokens)\n');

    // Close server after 30 seconds
    setTimeout(() => {
      console.log('Closing server...');
      server.close();
      process.exit(0);
    }, 30000);

  } catch (error) {
    res.send(`
      <html>
        <head><title>Error</title></head>
        <body style="font-family: Arial; padding: 40px; text-align: center;">
          <h1 style="color: red;">❌ Error</h1>
          <p>${error.message}</p>
          <p><a href="/">Try Again</a></p>
        </body>
      </html>
    `);
    console.error('\n❌ Error:', error.message);
    server.close();
  }
});

// Home route - redirect to OAuth
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Outlook OAuth</title></head>
      <body style="font-family: Arial; padding: 40px; text-align: center;">
        <h1>Outlook OAuth Setup</h1>
        <p>Click the button below to authorize and get your refresh token.</p>
        <p><a href="${AUTH_URL}" style="display: inline-block; padding: 15px 30px; background: #0078d4; color: white; text-decoration: none; border-radius: 5px; font-size: 18px;">Authorize with Outlook</a></p>
        <p style="margin-top: 30px; color: #666; font-size: 14px;">
          This will open Microsoft's login page.<br>
          After you sign in and authorize, you'll be redirected back here.
        </p>
      </body>
    </html>
  `);
});

// Start server
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('\n🚀 Outlook OAuth Helper Script');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('✅ Server started on http://localhost:' + PORT);
  console.log('\n📋 Next steps:');
  console.log('   1. Open your browser to: http://localhost:' + PORT);
  console.log('   2. Click "Authorize with Outlook"');
  console.log('   3. Sign in with your Microsoft account');
  console.log('   4. Authorize the app');
  console.log('   5. Copy your refresh token\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Auto-open browser (macOS)
  const url = `http://localhost:${PORT}`;
  exec(`open "${url}"`, (error) => {
    if (error) {
      console.log('⚠️  Could not auto-open browser. Please open manually:');
      console.log('   ' + url + '\n');
    }
  });
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n❌ Port 4000 is already in use!\n');
    console.error('This usually means:');
    console.error('  - Your MCP server is already running');
    console.error('  - Another instance of this script is running');
    console.error('  - Another app is using port 4000\n');
    console.error('Solutions:');
    console.error('  1. Stop the MCP server: Press Ctrl+C in the terminal running it');
    console.error('  2. Kill the process using port 4000:');
    console.error('     lsof -ti:4000 | xargs kill -9');
    console.error('  3. Or use a different port (modify PORT in the script)\n');
    process.exit(1);
  } else {
    console.error('\n❌ Server error:', err.message);
    process.exit(1);
  }
});

// Handle server close
server.on('close', () => {
  console.log('\n✅ Server closed. You can now add the refresh token to your .env file.\n');
});

// Handle Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down...\n');
  server.close();
  process.exit(0);
});

