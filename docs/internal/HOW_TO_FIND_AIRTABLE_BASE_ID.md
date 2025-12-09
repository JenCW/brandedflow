# How to Find Your Airtable Base ID

## Quick Method (Easiest!)

### Step 1: Open Your Airtable Base
1. Go to: https://airtable.com/
2. Log in
3. Open the base you want to use

### Step 2: Look at the URL
When you're viewing your base, the URL will look like this:

```
https://airtable.com/appXXXXXXXXXXXXXX/tblYYYYYYYYYYYYYY/viwZZZZZZZZZZZZZZZ
```

**The Base ID is the part that starts with `app`** - that's `appXXXXXXXXXXXXXX` in the example above.

### Step 3: Copy It
- Copy everything from `app` to the end of that segment (before the next `/`)
- Example: If URL is `https://airtable.com/app1234567890abcd/tbl...`
- Your Base ID is: `app1234567890abcd`

---

## Method 2: Using Airtable API Documentation

### Step 1: Go to API Docs
1. Go to: https://airtable.com/api
2. Log in if prompted

### Step 2: Select Your Base
- Click on the base you want to use
- The API documentation page will open

### Step 3: Find Base ID
- Look at the **introduction section** at the top
- The Base ID will be listed there
- It will look like: `appXXXXXXXXXXXXXX`

---

## Visual Guide

**URL Structure:**
```
https://airtable.com/[BASE_ID]/[TABLE_ID]/[VIEW_ID]
         ↑
    This is your Base ID!
```

**Example:**
```
https://airtable.com/appabc123def456/tblxyz789/viwqwe012
                    ↑
              Base ID = appabc123def456
```

---

## Add to Your .env File

Once you have your Base ID:

1. **Open your `.env` file:**
   ```bash
   cd /Users/jencortez-walters/brandedflow/systems/mcp-server
   open .env
   ```

2. **Find the Airtable section:**
   ```bash
   # Airtable - CRM
   AIRTABLE_API_KEY=your_airtable_key_here
   AIRTABLE_BASE_ID=appXXXXXXXXXX
   ```

3. **Replace with your actual Base ID:**
   ```bash
   AIRTABLE_BASE_ID=appabc123def456
   ```
   (Use your actual Base ID, not this example!)

4. **Save the file**

---

## How to Get Your Airtable API Key

While you're at it, you'll also need your API Key:

### Step 1: Go to Account Settings
1. Click your profile picture (top right)
2. Click **"Account"**

### Step 2: Generate API Key
1. Scroll down to **"Developer options"** or **"API"** section
2. Click **"Generate API key"** or **"Create new token"**
3. Give it a name (e.g., "Branded Flow Automation")
4. Select permissions:
   - ✅ **Read data**
   - ✅ **Write data** (if you need to create/update records)
5. Click **"Create token"**
6. **COPY IT IMMEDIATELY** - You won't see it again!

### Step 3: Add to .env
```bash
AIRTABLE_API_KEY=patXXXXXXXXXXXXXX
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
```

---

## Important Notes

### Base ID Format
- Always starts with `app`
- Usually 14-17 characters long
- Example: `appabc123def456`

### API Key Format
- Starts with `pat` (Personal Access Token)
- Usually 40+ characters long
- Example: `patabc123def456...`

### Multiple Bases
- Each Airtable base has its own Base ID
- If you have multiple bases, you'll need different Base IDs
- You can use the same API key for all bases

### Security
- ⚠️ **Treat your API key like a password!**
- Store it securely in `.env` file (already in `.gitignore`)
- Never commit it to git
- Rotate it regularly for security

---

## Troubleshooting

### "I can't find the Base ID in the URL"
- **Solution**: Make sure you're viewing the base (not just the workspace)
- Click on the base name to open it
- The URL should show `/app.../` after `airtable.com/`

### "The URL doesn't have 'app' in it"
- **Solution**: You might be on the workspace page, not the base page
- Click into the actual base
- The URL should change to include the Base ID

### "I have multiple bases, which one do I use?"
- **Solution**: Use the Base ID for the base you want to automate
- If you're setting up CRM automation, use your CRM base
- If you're setting up client data, use your client data base
- You can add multiple bases to `.env` if needed (with different variable names)

### "Where do I find my API key?"
- **Solution**: 
  - Profile picture → Account → Developer options → Generate API key
  - Or: https://airtable.com/account

---

## Quick Checklist

- [ ] Open your Airtable base
- [ ] Copy Base ID from URL (starts with `app`)
- [ ] Get API key from Account settings
- [ ] Add both to `.env` file:
  ```bash
  AIRTABLE_API_KEY=pat...
  AIRTABLE_BASE_ID=app...
  ```
- [ ] Save `.env` file
- [ ] Restart MCP server (if running)

---

## Example .env Entry

```bash
# Airtable - CRM
AIRTABLE_API_KEY=patabc123def456ghi789jkl012mno345pqr678stu901vwx234yz
AIRTABLE_BASE_ID=appabc123def456
```

---

## Resources

- **Airtable API Docs**: https://airtable.com/api
- **Airtable API Reference**: https://airtable.com/developers/web/api/introduction
- **Airtable Account Settings**: https://airtable.com/account

---

**Last Updated:** December 8, 2024

