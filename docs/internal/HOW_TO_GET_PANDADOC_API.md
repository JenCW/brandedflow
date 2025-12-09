# How to Get Your PandaDoc API Key

## Quick Steps

1. **Log into PandaDoc**
   - Go to: https://app.pandadoc.com/
   - Sign in with your account

2. **Navigate to Developer Dashboard**
   - Click **"Developer Dashboard"** in the left sidebar
   - If you don't see it, you may need to upgrade your plan (see below)

3. **Generate API Key**
   - Go to **"API Keys"** section
   - Click **"Create API Key"** or **"Generate New Key"**
   - Choose:
     - **Sandbox Key** (for testing) - Available on Business & Enterprise plans
     - **Production Key** (for live use) - Requires Enterprise plan

4. **Copy Your API Key**
   - Copy the key immediately (you won't see it again!)
   - It will look like: `your_api_key_here_1234567890abcdef`

5. **Get Your Workspace ID**
   - In the Developer Dashboard, find your **Workspace ID**
   - It will look like: `workspace_1234567890abcdef` or just a number

6. **Add to .env File**
   ```bash
   cd systems/mcp-server
   # Edit .env file
   PANDADOC_API_KEY=your_api_key_here
   PANDADOC_WORKSPACE_ID=your_workspace_id_here
   ```

---

## Detailed Instructions

### Step 1: Access Developer Dashboard

1. Log into PandaDoc: https://app.pandadoc.com/
2. Look for **"Developer Dashboard"** in the left sidebar menu
3. If you don't see it:
   - You may need to upgrade your plan
   - Or it might be under **Settings** → **Integrations** → **API**

### Step 2: Check Your Plan

**Sandbox API:**
- ✅ Available on **Business** plan ($49/month)
- ✅ Available on **Enterprise** plan (custom pricing)

**Production API:**
- ❌ NOT available on Business plan
- ✅ Requires **Enterprise** plan (custom pricing)

**For your use case (sending proposals to clients):**
- You need **Production API** (live proposals)
- Requires **Enterprise plan**

### Step 3: Generate API Key

1. In Developer Dashboard, click **"API Keys"** tab
2. Click **"Create API Key"** or **"Generate New Key"**
3. Give it a name (e.g., "Branded Flow Automation")
4. Select **Production** (if you have Enterprise) or **Sandbox** (for testing)
5. Click **"Generate"**
6. **COPY THE KEY IMMEDIATELY** - You won't see it again!

### Step 4: Get Workspace ID

1. In Developer Dashboard, look for **"Workspace ID"** or **"Account ID"**
2. It's usually displayed at the top of the page
3. Or go to **Settings** → **Account** → **Workspace Settings**
4. Copy the Workspace ID

### Step 5: Add to Your .env File

1. Open your `.env` file:
   ```bash
   cd /Users/jencortez-walters/brandedflow/systems/mcp-server
   open .env
   ```

2. Find the PandaDoc section:
   ```bash
   # PandaDoc - Proposals
   PANDADOC_API_KEY=your_pandadoc_key_here
   PANDADOC_WORKSPACE_ID=your_workspace_id_here
   ```

3. Replace with your actual values:
   ```bash
   PANDADOC_API_KEY=your_actual_api_key_here
   PANDADOC_WORKSPACE_ID=your_actual_workspace_id_here
   ```

4. Save the file

5. Restart your MCP server (if running):
   ```bash
   npm start
   ```

---

## Important Notes

### Plan Requirements
- **Sandbox API**: Business plan ($49/month) or Enterprise
- **Production API**: Enterprise plan only (custom pricing)
- **For sending real proposals**: You need Production API + Enterprise plan

### Usage Limits
- Each document created via API = 1 usage credit
- Enterprise plans include usage credits per year
- Additional credits can be purchased if needed

### Security
- ⚠️ **Treat your API key like a password!**
- Anyone with it can create, send, and manage documents in your account
- Store it securely in `.env` file (already in `.gitignore`)
- Never commit it to git
- Rotate it regularly for security

### Testing
- Start with **Sandbox API** to test your MCPs
- Switch to **Production API** when ready for live proposals
- Sandbox documents don't count toward usage limits

---

## Troubleshooting

### "I don't see Developer Dashboard"
- **Solution**: You may need to upgrade to Business or Enterprise plan
- Check: Settings → Account → Plan

### "I can only create Sandbox keys"
- **Solution**: Production API requires Enterprise plan
- Contact PandaDoc sales to upgrade

### "Where is my Workspace ID?"
- **Solution**: 
  - Check Developer Dashboard header
  - Or: Settings → Account → Workspace Settings
  - Or: Look in the URL when logged in (sometimes visible)

### "API key doesn't work"
- **Solution**: 
  - Make sure you copied the entire key (no spaces)
  - Check if you're using Sandbox vs Production
  - Verify your plan includes API access
  - Check for typos in `.env` file

---

## Next Steps

1. ✅ Get your API key (follow steps above)
2. ✅ Add to `.env` file
3. ✅ Test with the `create-proposal-from-template` MCP
4. ✅ Create your first proposal via API!

---

## Resources

- **PandaDoc API Docs**: https://developers.pandadoc.com/
- **API Help Center**: https://support.pandadoc.com/en/articles/9714958-pandadoc-api
- **Authentication Guide**: https://developers.pandadoc.com/reference/auth-overview

---

**Last Updated:** December 8, 2024

