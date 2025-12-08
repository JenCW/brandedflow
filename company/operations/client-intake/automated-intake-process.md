# Automated Client Intake Process

## Overview

Client fills out intake form → Data goes to Airtable → MCP processes → Client profile created automatically.

## Setup (One-Time)

### Step 1: Create Airtable Base

**Base Name:** "Client Intake"

**Table:** "Intake Forms"

**Fields:**
- Client Name (Single line text)
- Business Name (Single line text)
- Industry (Single select)
- Target Market (Single line text)
- Website Platform (Single select: Static HTML, Wix, WordPress, Custom, None)
- Email Provider (Single select: Outlook, Gmail, Custom)
- CRM (Single select: Airtable, HubSpot, Salesforce, Other, None)
- Design Style (Single select: Modern/Bright, Dark/Luxury, Custom)
- Services Needed (Multiple select: Website, Lead Magnet, Onboarding, etc.)
- Contact Email (Email)
- Contact Phone (Phone)
- Custom Requirements (Long text)
- Status (Single select: New, Processing, Complete)

### Step 2: Create Airtable Form View

1. Create form view in Airtable
2. Share form link with clients
3. Form submissions automatically go to Airtable

### Step 3: Set Up Automation

**Option A: n8n Workflow**
- Trigger: New record in Airtable "Intake Forms" table
- Action: Call MCP `process-client-intake` with Airtable data
- Result: Client profile created automatically

**Option B: Manual Trigger**
- You review intake in Airtable
- Manually trigger MCP: `process-client-intake` with `{ source: "airtable", intake_data: {...} }`
- Result: Client profile created

## Process Flow

```
Client fills Airtable form
    ↓
Data saved to Airtable
    ↓
n8n detects new record (or you trigger manually)
    ↓
MCP: process-client-intake called
    ↓
Client folder created
    ↓
Client profile created with variations
    ↓
Portal updated (if applicable)
    ↓
Ready for automations
```

## MCP Usage

### Automatic (via n8n):
```javascript
// n8n workflow calls:
POST /run
{
  "automation": "process-client-intake",
  "params": {
    "client_name": "dental-bunny",
    "source": "airtable",
    "intake_data": {
      "business_name": "Dental Bunny",
      "website": "wix",
      "email": "gmail",
      "crm": "hubspot",
      "design_style": "modern-bright",
      "industry": "dental"
    }
  }
}
```

### Manual:
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "process-client-intake",
    "params": {
      "client_name": "dental-bunny",
      "source": "airtable",
      "intake_data": { /* from Airtable */ }
    }
  }'
```

## Benefits

- ✅ Automated: Client fills form, profile created automatically
- ✅ Consistent: Same process every time
- ✅ Complete: All variations captured upfront
- ✅ Ready: Client ready for automations immediately

