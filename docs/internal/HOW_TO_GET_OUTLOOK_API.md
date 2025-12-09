# How to Get Outlook API Credentials

## ⚠️ Important: Outlook Uses OAuth 2.0 (Not a Simple API Key)

Outlook doesn't use a simple API key like other services. Instead, you need to:
1. Register an app in Azure Portal
2. Get Client ID, Client Secret, and Tenant ID
3. Set up OAuth 2.0 authentication
4. Generate a refresh token (one-time setup)

---

## Step-by-Step Guide

### Step 1: Access Azure Portal

1. Go to: https://portal.azure.com/
2. Sign in with your Microsoft account (the one you use for Outlook)

### Step 2: Register a New Application

1. In Azure Portal, search for **"Microsoft Entra ID"** (or **"Azure Active Directory"**)
2. Click on **"App registrations"** in the left sidebar
3. Click **"+ New registration"** button (top left)

### Step 3: Configure Your App

Fill in the registration form:

- **Name**: `Branded Flow Automation` (or any name you want)
- **Supported account types**: 
  - Choose **"Accounts in this organizational directory only"** (if using work/school account)
  - OR **"Accounts in any organizational directory and personal Microsoft accounts"** (if using personal Outlook)
- **Redirect URI**: 
  - Platform: **Web** ← Choose "Web" (NOT "Public client" or "SPA")
  - URI: `http://localhost:4000/auth/outlook/callback`
  - (This is for your MCP server - adjust if your server runs on a different port)
  - **Why "Web"?** Your MCP server is a server-side application that handles OAuth callbacks, not a single-page app or public client

4. Click **"Register"**

### Step 4: Get Your Client ID and Tenant ID

After registration, you'll be on the app's **Overview** page:

1. **Copy the Application (client) ID**
   - ✅ **Yes, this is your Client ID!** (They're the same thing)
   - In Azure Portal, it's called "Application (client) ID"
   - In OAuth terms, it's called "Client ID"
   - This is your `OUTLOOK_CLIENT_ID`
   - It looks like: `12345678-1234-1234-1234-123456789abc`

2. **Copy the Directory (tenant) ID**
   - This is your `OUTLOOK_TENANT_ID`
   - It looks like: `87654321-4321-4321-4321-cba987654321`

### Step 5: Create a Client Secret

1. In the left sidebar, click **"Certificates & secrets"**
2. Under **"Client secrets"**, click **"+ New client secret"**
3. Fill in:
   - **Description**: `Branded Flow MCP Server` (or any description)
   - **Expires**: Choose expiration (6 months, 12 months, or never)
4. Click **"Add"**
5. **COPY THE VALUE IMMEDIATELY** - This is your `OUTLOOK_CLIENT_SECRET`
   - ⚠️ **You won't see it again!** Copy it now!
   - It looks like: `abc123~XYZ789...`

### Step 6: Configure API Permissions

1. In the left sidebar, click **"API permissions"**
2. Click **"+ Add a permission"**
3. Select **"Microsoft Graph"**
4. **Choose "Delegated permissions"** ← This is what you need!
   - ✅ **Delegated permissions** = App acts on behalf of the signed-in user (YOU)
   - ❌ **Application permissions** = App acts as itself (not what you need)
   - **Why Delegated?** You're sending emails from YOUR Outlook account, so the app needs to act on YOUR behalf

5. Add these permissions:
   - ✅ **`Mail.Read`** - Read emails
   - ✅ **`Mail.Send`** - Send emails
   - ✅ **`Mail.ReadWrite`** - Read and write emails
   - ✅ **`Calendars.ReadWrite`** - Read and write calendar (if needed)
   - ✅ **`User.Read`** - Read user profile

6. Click **"Add permissions"**
7. **IMPORTANT**: Click **"Grant admin consent for [Your Organization]"** button
   - This approves the permissions (required for the app to work)

### Step 7: Generate Refresh Token (One-Time Setup)

**✅ Use the Helper Script (Easiest Method!)**

A helper script is available to make this super easy:

1. **Make sure you have the first 3 values in `.env`:**
   ```bash
   OUTLOOK_CLIENT_ID=your_client_id
   OUTLOOK_CLIENT_SECRET=your_client_secret
   OUTLOOK_TENANT_ID=your_tenant_id
   ```

2. **Run the helper script:**
   ```bash
   cd systems/mcp-server
   node get-outlook-refresh-token.js
   ```

3. **The script will:**
   - Start a local server on port 4000
   - Open your browser automatically
   - Guide you through the OAuth flow
   - Show you your refresh token
   - Close automatically

4. **Copy the refresh token** and add it to `.env`:
   ```bash
   OUTLOOK_REFRESH_TOKEN=your_refresh_token_here
   ```

**That's it! The script handles everything for you.**

---

#### Alternative: Manual OAuth Flow (If Script Doesn't Work)

If the script doesn't work, you can do it manually:

1. Build the OAuth authorization URL:
   ```
   https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/authorize?
   client_id={CLIENT_ID}
   &response_type=code
   &redirect_uri=http://localhost:4000/auth/outlook/callback
   &response_mode=query
   &scope=Mail.Read Mail.Send Mail.ReadWrite User.Read offline_access
   &state=12345
   ```

2. Replace `{TENANT_ID}` and `{CLIENT_ID}` with your actual values
3. Open this URL in your browser
4. Sign in and authorize
5. You'll be redirected to `http://localhost:4000/auth/outlook/callback?code=...`
6. Copy the `code` from the URL
7. Exchange the code for a refresh token (requires a POST request)

**But the script is much easier - use that instead!**

---

## Add to Your .env File

Once you have all three values:

1. **Open your `.env` file:**
   ```bash
   cd /Users/jencortez-walters/brandedflow/systems/mcp-server
   open .env
   ```

2. **Find the Outlook section:**
   ```bash
   # Outlook - Email Automation
   OUTLOOK_CLIENT_ID=your_outlook_client_id_here
   OUTLOOK_CLIENT_SECRET=your_outlook_client_secret_here
   OUTLOOK_TENANT_ID=your_outlook_tenant_id_here
   OUTLOOK_REFRESH_TOKEN=your_outlook_refresh_token_here
   ```

3. **Replace with your actual values:**
   ```bash
   OUTLOOK_CLIENT_ID=12345678-1234-1234-1234-123456789abc
   OUTLOOK_CLIENT_SECRET=abc123~XYZ789...
   OUTLOOK_TENANT_ID=87654321-4321-4321-4321-cba987654321
   OUTLOOK_REFRESH_TOKEN=0.AX... (from OAuth flow)
   ```

4. **Save the file**

---

## Quick Checklist

- [ ] Register app in Azure Portal
- [ ] Copy Client ID (Application ID)
- [ ] Copy Tenant ID (Directory ID)
- [ ] Create Client Secret (copy value immediately!)
- [ ] Add API permissions (Mail.Read, Mail.Send, etc.)
- [ ] Grant admin consent
- [ ] Generate refresh token (one-time OAuth flow)
- [ ] Add all values to `.env` file
- [ ] Save `.env` file
- [ ] Restart MCP server (if running)

---

## Important Notes

### Account Types
- **Work/School Account**: Use "Accounts in this organizational directory only"
- **Personal Outlook**: Use "Accounts in any organizational directory and personal Microsoft accounts"

### Redirect URI
- Must match exactly: `http://localhost:4000/auth/outlook/callback`
- If your MCP server runs on a different port, update this
- For production, you'll need a real domain

### Client Secret
- ⚠️ **Copy it immediately** - you won't see it again!
- If you lose it, create a new one
- Set expiration based on your security needs

### Refresh Token
- Used to get new access tokens (access tokens expire)
- Refresh tokens can last a long time (or never expire, depending on settings)
- Store securely in `.env` file

### Permissions
- **Delegated permissions**: Act on behalf of the signed-in user
- **Application permissions**: Act as the app itself (requires admin consent)
- For email automation, you usually want **Delegated permissions**

---

## Troubleshooting

### "I can't find Microsoft Entra ID"
- **Solution**: It might be called "Azure Active Directory" in older Azure portals
- Search for "Azure AD" or "Active Directory"

### "I don't see 'App registrations'"
- **Solution**: Make sure you're in the right Azure AD tenant
- You need proper permissions (usually admin or developer role)

### "Redirect URI doesn't work"
- **Solution**: 
  - Make sure it matches exactly (including `http://` vs `https://`)
  - For localhost, use `http://localhost:4000/auth/outlook/callback`
  - No trailing slashes

### "I lost my Client Secret"
- **Solution**: Create a new one in "Certificates & secrets"
- Update your `.env` file with the new secret
- Old secret will stop working after expiration

### "Permissions not working"
- **Solution**: 
  - Make sure you clicked "Grant admin consent"
  - Check that permissions are "Delegated" (not "Application")
  - Wait a few minutes for permissions to propagate

### "How do I get the refresh token?"
- **Solution**: This requires a one-time OAuth flow
- I can create a simple script to help you get it
- Or use a tool like Postman to do the OAuth flow

---

## Need Help Getting the Refresh Token?

**I can create a simple Node.js script that:**
1. Opens a browser for you to authorize
2. Captures the OAuth callback
3. Exchanges the code for a refresh token
4. Shows you the refresh token to copy

**Just ask me to create it!**

---

## Security Best Practices

- ✅ Store credentials in `.env` file (already in `.gitignore`)
- ✅ Never commit credentials to git
- ✅ Rotate Client Secret regularly
- ✅ Use environment-specific secrets (dev vs production)
- ✅ Limit permissions to only what you need
- ✅ Monitor app usage in Azure Portal

---

## Resources

- **Azure Portal**: https://portal.azure.com/
- **Microsoft Graph API Docs**: https://learn.microsoft.com/en-us/graph/
- **Outlook REST API**: https://learn.microsoft.com/en-us/outlook/rest/get-started
- **OAuth 2.0 Flow**: https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow

---

**Last Updated:** December 8, 2024

