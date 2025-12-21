# Mortgage Lead Processing - Setup Guide

## Overview

This guide sets up the complete flow:
**Airtable Form → Airtable → n8n → MCP Server → Email Notification**

---

## Step 1: Configure MCP Server

### 1.1 Install Dependencies

```bash
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
npm install
```

### 1.2 Update `.env` File

Add these variables to your `.env` file (create one if it doesn't exist):

```bash
# MCP Security - API keys that allow access
MCP_API_KEYS=your-secret-key-here

# Server Port
PORT=4000

# Project Root
PROJECT_ROOT=/Users/jencortez-walters/brandedflow

# ============================================
# MORTGAGE LEAD NOTIFICATIONS
# ============================================

# Notification Method (email or sms)
NOTIFICATION_METHOD=email

# Email to receive notifications
NOTIFICATION_EMAIL=his-email@example.com

# SMTP Configuration (for email notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password-here
```

**For Gmail:**
- Don't use your regular password
- Generate an App Password: https://myaccount.google.com/apppasswords
- Use that App Password in `SMTP_PASS`

### 1.3 Start MCP Server

```bash
npm start
```

Server should run on `http://localhost:4000`

### 1.4 Test MCP Server

```bash
# Health check
curl http://localhost:4000/health

# List automations (should show process-mortgage-lead)
curl -X GET http://localhost:4000/automations \
  -H "X-API-Key: your-secret-key-here"
```

---

## Step 2: Configure Airtable

### 2.1 Create Base

- **Base Name:** `Mortgage Leads`
- **Table Name:** `Mortgage Leads`

### 2.2 Create Fields

| Field Name | Field Type | Notes |
|------------|-----------|--------|
| Name | Single line text | - |
| Phone | Phone number | - |
| Email | Email | - |
| City | Single line text | - |
| Situation | Long text | - |
| Created Time | Created time | Auto-populated |

### 2.3 Create Form

1. In Airtable, click "Form" view
2. Customize form fields (all except Created Time)
3. Copy the form URL
4. Share this URL for lead collection

---

## Step 3: Configure n8n Workflow

### 3.1 Create New Workflow

Name: `Mortgage Lead Processor`

### 3.2 Node 1: Airtable Trigger

- **Node Type:** Airtable Trigger
- **Operation:** Record Created
- **Base:** Select your "Mortgage Leads" base
- **Table:** Select "Mortgage Leads" table

### 3.3 Node 2: HTTP Request (Call MCP Server)

- **Node Type:** HTTP Request
- **Method:** POST
- **URL:** `http://localhost:4000/run`
- **Authentication:** None (using header)
- **Headers:**
  ```json
  {
    "X-API-Key": "your-secret-key-here",
    "Content-Type": "application/json"
  }
  ```
- **Body:**
  ```json
  {
    "automation": "process-mortgage-lead",
    "params": {
      "lead_name": "={{$json.fields.Name}}",
      "lead_phone": "={{$json.fields.Phone}}",
      "lead_email": "={{$json.fields.Email}}",
      "lead_city": "={{$json.fields.City}}",
      "lead_situation": "={{$json.fields.Situation}}"
    },
    "dryRun": false
  }
  ```

### 3.4 Node 3 (Optional): Error Handling

Add an **IF** node to check if MCP call succeeded:
- **Condition:** `{{$json.ok}}` equals `true`
- **True branch:** Continue (or log success)
- **False branch:** Send error alert

---

## Step 4: Test the Flow

### 4.1 Test MCP Directly

```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: your-secret-key-here" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "process-mortgage-lead",
    "params": {
      "lead_name": "John Doe",
      "lead_phone": "555-1234",
      "lead_email": "john@example.com",
      "lead_city": "Los Angeles",
      "lead_situation": "Looking to refinance"
    },
    "dryRun": false
  }'
```

Expected response:
```json
{
  "ok": true,
  "automation": "process-mortgage-lead",
  "result": {
    "success": true,
    "lead": {
      "name": "John Doe",
      "phone": "555-1234",
      "email": "john@example.com",
      "city": "Los Angeles"
    },
    "notification_sent": true,
    "notification_method": "email",
    "recipient": "his-email@example.com",
    "timestamp": "2024-01-01T12:00:00.000Z"
  }
}
```

### 4.2 Test End-to-End

1. Fill out the Airtable form
2. Check n8n execution log (should show success)
3. Check the notification email inbox
4. Verify email contains all lead details

---

## Step 5: Production Checklist

- [ ] MCP Server running on localhost:4000
- [ ] `.env` file configured with real credentials
- [ ] Airtable base and form created
- [ ] n8n workflow activated
- [ ] Test lead submitted successfully
- [ ] Notification email received
- [ ] Email contains correct lead information

---

## Troubleshooting

### MCP Server Won't Start
- Check `.env` file exists
- Verify all npm packages installed
- Check port 4000 is not in use

### Email Not Sending
- Verify SMTP credentials in `.env`
- For Gmail: use App Password, not regular password
- Check SMTP_HOST and SMTP_PORT are correct
- Check MCP server logs for errors

### n8n Can't Connect to MCP
- Verify MCP server is running (check http://localhost:4000/health)
- Verify X-API-Key header matches value in `.env`
- Check n8n HTTP Request node configuration

### Airtable Trigger Not Firing
- Verify Airtable connection in n8n
- Check workflow is activated (not just saved)
- Test by creating a record manually in Airtable

---

## Advanced: Running MCP Server as Background Service

### Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start MCP server with PM2
cd /Users/jencortez-walters/brandedflow/systems/mcp-server
pm2 start index.js --name "mcp-server"

# Auto-start on system boot
pm2 startup
pm2 save
```

### Check Status

```bash
pm2 status
pm2 logs mcp-server
```

---

## Alternative: SMS Notifications (Future)

To use SMS instead of email:

1. Update `.env`:
   ```bash
   NOTIFICATION_METHOD=sms
   TWILIO_ACCOUNT_SID=your-account-sid
   TWILIO_AUTH_TOKEN=your-auth-token
   TWILIO_FROM_PHONE=+1234567890
   NOTIFICATION_PHONE=+1234567890
   ```

2. Update `process-mortgage-lead.js` to add SMS support (Twilio)

3. Install Twilio: `npm install twilio`

---

## Flow Diagram

```
┌─────────────────┐
│  Airtable Form  │
│   (Public URL)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Airtable     │
│  (New Record)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│       n8n       │
│    (Trigger)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   MCP Server    │
│  (Automation)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Email Sent ✅  │
│   (SMTP/Gmail)  │
└─────────────────┘
```

