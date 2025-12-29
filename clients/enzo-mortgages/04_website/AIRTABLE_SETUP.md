# Airtable Setup Guide for Enzo Mortgages

## Current Status
The API integration is working correctly, but the dropdown field options need to be configured in Airtable.

## Issue Found
The forms are trying to submit values that don't exist as options in your Airtable dropdown fields. When the API tries to create a record with a non-existent dropdown value, Airtable rejects it with error: "Insufficient permissions to create new select option".

## Required Airtable Configuration

### Table: `leads` (lowercase)
Base ID: `appKXCMh5gJ1AvS6Z`
Table ID: `tblkZ8IzQaPLU8GAf`

### Existing Fields (Verified)
- Name (Single line text)
- Email (Email)
- Phone (Phone number)
- Lead Type (Single select)
- Loan Type (Single select)
- Urgency (Single select)
- Location (Single select)
- Source (Single select)
- Status (Single select)
- Timestamp (Date)
- Foreign National (Checkbox)
- Emergency (Checkbox)
- Valuation (Checkbox)

### Required Dropdown Values

Add these values to the corresponding dropdown fields in Airtable:

#### Lead Type
- Quick Lead
- Lead Magnet
- Valuation
- Investment Property
- Pre-Approval
- Rate Quote
- Contact

#### Loan Type
- Conventional
- FHA
- VA
- Jumbo
- Refinance
- Cash-Out
- DSCR
- Bank Statement
- Foreign National

#### Urgency
- Hot
- Medium
- Low
- Nurture

#### Source
- Website
- Landing Page
- Home Valuation Tool
- API Test
- Direct

#### Location
This field can accept any text value representing property addresses. No specific dropdown options needed if you change it to a text field instead of select.

#### Status
- New
- Contacted
- Qualified
- In Progress
- Closed
- Lost

### Missing Field (Optional)
The ValuationForm tries to send "Property Type" but this field doesn't exist in your Airtable. You have two options:

**Option 1: Add the field to Airtable (Recommended)**
1. Open your Airtable base
2. Add a new field called "Property Type" (Single select)
3. Add these options:
   - single-family
   - condo
   - townhome
   - multi-unit

**Option 2: Remove it from the form**
Update ValuationForm.tsx to not send this field.

## How to Add Dropdown Values in Airtable

1. Open your Airtable base: https://airtable.com/appKXCMh5gJ1AvS6Z
2. Click on the `leads` table
3. For each dropdown field (Lead Type, Loan Type, etc.):
   - Click on the field header
   - Click "Customize field type"
   - Add the values listed above in the "Choices" section
   - Click "Save"

## Alternative: Update API Token Permissions

Instead of manually adding values, you can create a new API token with permission to create dropdown options:

1. Go to https://airtable.com/create/tokens
2. Create a new token with these scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
   - `schema.bases:write` (This allows creating new dropdown options)
3. Add the access to your base
4. Update the token in Netlify environment variables

## Testing

After adding the dropdown values, run this test to verify everything works:

```bash
cd /Users/jencortez-walters/brandedflow/clients/enzo-mortgages/04_website
node test-form-submission.js
```

You should see all 4 tests pass.

## Environment Variables

Make sure these are set in Netlify:

```
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=leads
```

⚠️ **SECURITY NOTE**: Never commit API keys to git. Always use environment variables or Netlify's environment variable settings.

## Summary of Code Fixes Applied

1. Changed field mapping from "Address" → "Location" to match Airtable
2. Fixed Timestamp format from ISO string to YYYY-MM-DD date format
3. Changed default table name from "Leads" → "leads" (lowercase)
4. Added proper error logging (no longer swallowing errors)
5. Fixed error responses to return actual errors instead of fake success

## What's Working Now

- API connection is verified and working
- Field mapping is correct
- Date format is correct
- Error handling is proper
- Test scripts are available

## What Needs To Be Done

1. Add the dropdown values to Airtable (15 minutes)
2. Optionally add "Property Type" field to Airtable (2 minutes)
3. Test the forms on the live website

Once the dropdown values are added, leads will flow into Airtable successfully!
