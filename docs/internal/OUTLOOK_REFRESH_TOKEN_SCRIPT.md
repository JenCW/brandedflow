# Outlook Refresh Token Helper Script

## Quick Start

1. **Add your credentials to `.env`** (if not already done):
   ```bash
   OUTLOOK_CLIENT_ID=your_client_id
   OUTLOOK_CLIENT_SECRET=your_client_secret
   OUTLOOK_TENANT_ID=your_tenant_id
   ```

2. **Run the script:**
   ```bash
   cd systems/mcp-server
   node get-outlook-refresh-token.js
   ```

3. **Follow the prompts:**
   - Browser will open automatically
   - Sign in with your Microsoft account
   - Authorize the app
   - Copy your refresh token

4. **Add refresh token to `.env`:**
   ```bash
   OUTLOOK_REFRESH_TOKEN=your_refresh_token_here
   ```

---

## What the Script Does

1. ✅ Starts a local server on port 4000
2. ✅ Opens your browser automatically
3. ✅ Handles the OAuth flow
4. ✅ Exchanges authorization code for tokens
5. ✅ Shows you your refresh token
6. ✅ Closes automatically after 30 seconds

---

## Requirements

- Node.js installed
- `express` package (should already be installed in `systems/mcp-server/`)
- Credentials in `.env` file:
  - `OUTLOOK_CLIENT_ID`
  - `OUTLOOK_CLIENT_SECRET`
  - `OUTLOOK_TENANT_ID`

---

## Troubleshooting

### "Missing credentials in .env file"
- **Solution**: Make sure you've added all three values to `.env`:
  - `OUTLOOK_CLIENT_ID`
  - `OUTLOOK_CLIENT_SECRET`
  - `OUTLOOK_TENANT_ID`

### "Port 4000 already in use"
- **Solution**: 
  - Close any other apps using port 4000
  - Or modify the script to use a different port

### "Could not auto-open browser"
- **Solution**: 
  - Manually open: `http://localhost:4000`
  - The script will still work

### "No refresh token received"
- **Solution**: 
  - Make sure you included `offline_access` in OAuth scopes
  - The script includes this automatically
  - Check Azure Portal → API permissions → Grant admin consent

### "Authorization error"
- **Solution**: 
  - Check that redirect URI in Azure Portal matches: `http://localhost:4000/auth/outlook/callback`
  - Make sure you granted admin consent for permissions
  - Verify Client ID, Secret, and Tenant ID are correct

---

## Security Notes

- ⚠️ **Keep your refresh token secure!**
- Store it in `.env` file (already in `.gitignore`)
- Never commit it to git
- Don't share it publicly

---

## After Getting Your Refresh Token

1. Add it to `.env`:
   ```bash
   OUTLOOK_REFRESH_TOKEN=your_refresh_token_here
   ```

2. Restart your MCP server (if running):
   ```bash
   npm start
   ```

3. You're done! The refresh token will be used to get new access tokens automatically.

---

**Last Updated:** December 8, 2024

