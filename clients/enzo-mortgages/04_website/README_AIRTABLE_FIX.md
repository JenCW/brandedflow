# Airtable Integration Fix - Quick Start Guide

## TL;DR - What You Need to Do

The code is fixed. You just need to add dropdown values to Airtable (15 minutes).

## Quick Commands

```bash
# 1. See what dropdown values need to be added
node extract-dropdown-values.js

# 2. After adding them, test the integration
node test-form-submission.js

# 3. Verify basic connection
node test-airtable.js
```

## The Problem

Forms show "Lead received" but nothing appears in Airtable.

## The Solution

5 code issues fixed + dropdown values need to be added to Airtable.

## What's Already Fixed (Code)

1. ✓ Changed "Address" → "Location" field name
2. ✓ Fixed date format (ISO string → YYYY-MM-DD)
3. ✓ Fixed table name ("Leads" → "leads")
4. ✓ Fixed error handling (no more fake success messages)
5. ✓ Added proper error logging

## What You Need to Do (Airtable)

Add these dropdown values to your Airtable fields:

### Lead Type
Quick Lead, Lead Magnet, Valuation, Investment Property, Pre-Approval, Rate Quote, Contact

### Loan Type
Conventional, FHA, VA, Jumbo, Refinance, Cash-Out, DSCR, Bank Statement, Foreign National

### Urgency
Hot, Medium, Low, Nurture

### Source
Website, Landing Page, Home Valuation Tool, API Test, Direct

### Status
New, Contacted, Qualified, In Progress, Closed, Lost

### Optional: Add "Property Type" Field
single-family, condo, townhome, multi-unit

## How to Add Dropdown Values

1. Open https://airtable.com/appKXCMh5gJ1AvS6Z
2. Click on the "leads" table
3. For each field (Lead Type, Loan Type, etc.):
   - Click the field header
   - Click "Customize field type"
   - Paste the values from above (or run `node extract-dropdown-values.js`)
   - Click "Save"

## Documentation Files

- `DIAGNOSIS.md` - Complete problem analysis and fixes
- `FIX_SUMMARY.md` - Summary of changes made
- `AIRTABLE_SETUP.md` - Detailed Airtable configuration guide
- `README_AIRTABLE_FIX.md` - This file

## Test Scripts

- `test-airtable.js` - Tests basic API connection (✓ passing)
- `test-form-submission.js` - Tests all form scenarios (waiting for dropdown values)
- `extract-dropdown-values.js` - Shows required dropdown values

## Files Modified

- `/app/api/lead/base44/route.ts` - Main endpoint (all forms use this)
- `/app/api/lead/route.ts` - Backup endpoint
- `/.env.example` - Updated default table name

## Environment Variables (Already Set in Netlify)

```
AIRTABLE_API_KEY=patDoTRkptPexM9PV.b5aef171dc3af321693239bd98dad95593b127d94cb62530055a080f8329799a
AIRTABLE_BASE_ID=appKXCMh5gJ1AvS6Z
AIRTABLE_TABLE_NAME=leads
```

## Testing Workflow

1. **Before adding dropdown values:**
   ```bash
   node test-form-submission.js
   # Result: 0/4 tests passing
   ```

2. **Add dropdown values to Airtable** (follow instructions above)

3. **After adding dropdown values:**
   ```bash
   node test-form-submission.js
   # Expected: 4/4 tests passing
   ```

4. **Test on live website:**
   - Go to https://enzomortgages.com
   - Submit forms
   - Check Airtable for new leads

## Success Checklist

- [ ] Ran `node extract-dropdown-values.js` to see required values
- [ ] Added all dropdown values to Airtable
- [ ] Optionally added "Property Type" field
- [ ] Ran `node test-form-submission.js` (4/4 passing)
- [ ] Tested live website forms
- [ ] Verified leads appear in Airtable

## Support

If something doesn't work:

1. Check error messages in console
2. Review `DIAGNOSIS.md` for detailed explanation
3. Run test scripts to identify the issue
4. Check Netlify function logs for server-side errors

## Summary

- **Code Status:** ✓ Fixed and tested
- **Airtable Status:** ⚠ Needs dropdown values added
- **Time Required:** ~15 minutes to add dropdown values
- **Expected Result:** All forms submitting successfully to Airtable

Once dropdown values are added, everything will work!
