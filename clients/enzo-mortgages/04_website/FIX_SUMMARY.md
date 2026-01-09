# Enzo Mortgages Airtable Integration - Fix Summary

## Issues Found and Fixed

### 1. Field Name Mapping Error (CRITICAL)
**Problem:** The API code was using `Address` but your Airtable table has a field called `Location`.

**Fix Applied:**
- Changed line 53 in `/app/api/lead/intake/route.ts` from `Address` to `Location`
- Changed line 43 in `/app/api/lead/route.ts` from `Address` to `Location`

### 2. Date Format Error (CRITICAL)
**Problem:** The API was sending timestamps as full ISO strings (e.g., `2025-12-22T14:30:00.000Z`) but your Airtable `Timestamp` field is configured as a Date field that only accepts `YYYY-MM-DD` format.

**Fix Applied:**
- Changed `new Date().toISOString()` to `new Date().toISOString().split('T')[0]`
- Now sends: `2025-12-22` instead of `2025-12-22T14:30:00.000Z`

### 3. Table Name Case Sensitivity (CRITICAL)
**Problem:** Default table name was `"Leads"` (capitalized) but your Airtable table is named `"leads"` (lowercase).

**Fix Applied:**
- Changed default from `"Leads"` to `"leads"` in both route files
- This ensures it works even if AIRTABLE_TABLE_NAME env var is not set

### 4. Error Swallowing (CRITICAL)
**Problem:** Lines 71-78 of intake/route.ts were catching Airtable errors but returning `success: true` anyway. This made forms show "Lead received" even when nothing was saved to Airtable!

**Fix Applied:**
- Now properly returns error responses with HTTP 500 status
- Added detailed error logging showing exactly what went wrong
- Forms will now show error messages when Airtable fails

### 5. Missing Dropdown Values in Airtable (ACTION REQUIRED)
**Problem:** Your forms are sending values like "Quick Lead", "Investment Property", "DSCR", etc., but these don't exist as options in your Airtable dropdown fields.

**Current Status:** API rejects these with error:
```
INVALID_MULTIPLE_CHOICE_OPTIONS: Insufficient permissions to create new select option
```

**Action Required:** See AIRTABLE_SETUP.md for the complete list of dropdown values to add.

### 6. Missing Field in Airtable (OPTIONAL)
**Problem:** ValuationForm sends "Property Type" but this field doesn't exist in Airtable.

**Options:**
1. Add "Property Type" field to Airtable (recommended)
2. Remove it from the ValuationForm component

## Code Changes Made

### Files Modified:
1. `/app/api/lead/intake/route.ts` - Main API endpoint (used by all forms)
2. `/app/api/lead/route.ts` - Backup endpoint (currently unused)
3. `/.env.example` - Updated default table name

### Files Created:
1. `/test-airtable.js` - Connection test script
2. `/test-form-submission.js` - Form submission test script
3. `/AIRTABLE_SETUP.md` - Detailed Airtable configuration guide
4. `/FIX_SUMMARY.md` - This file

## What's Working Now

1. API connection to Airtable is verified and working
2. Field mapping is correct (Address → Location)
3. Date format is correct (YYYY-MM-DD)
4. Table name is correct (leads)
5. Error handling is proper (no more fake success messages)
6. Test scripts are available to verify everything

## What Still Needs To Be Done

### Required: Add Dropdown Values to Airtable

You need to add these values to your Airtable dropdown fields (takes ~15 minutes):

**Lead Type dropdown:**
- Quick Lead
- Lead Magnet
- Valuation
- Investment Property
- Pre-Approval
- Rate Quote
- Contact

**Loan Type dropdown:**
- Conventional
- FHA
- VA
- Jumbo
- Refinance
- Cash-Out
- DSCR
- Bank Statement
- Foreign National

**Urgency dropdown:**
- Hot
- Medium
- Low
- Nurture

**Source dropdown:**
- Website
- Landing Page
- Home Valuation Tool
- API Test
- Direct

**Status dropdown:**
- New
- Contacted
- Qualified
- In Progress
- Closed
- Lost

### Optional: Add Property Type Field

Add a new field called "Property Type" (Single select) with options:
- single-family
- condo
- townhome
- multi-unit

## How to Add Dropdown Values

1. Open https://airtable.com/appKXCMh5gJ1AvS6Z
2. Click on the `leads` table
3. For each dropdown field:
   - Click the field header
   - Click "Customize field type"
   - Add the values listed above
   - Click "Save"

## Testing

### Test 1: Basic Connection (Already Passed)
```bash
cd /Users/jencortez-walters/brandedflow/clients/enzo-mortgages/04_website
node test-airtable.js
```

Result: ✓ Passed - API connection works correctly

### Test 2: Form Submissions (Will Pass After Dropdown Fix)
```bash
node test-form-submission.js
```

Current Result: 0/4 tests passing (waiting for dropdown values)
Expected After Fix: 4/4 tests passing

### Test 3: Live Website
After adding dropdown values, test these forms on https://enzomortgages.com:
1. Quick Lead Form
2. Home Valuation Form
3. Lead Magnet Forms
4. Investment Property Landing Page Form

## Environment Variables (Already Configured)

These are set in Netlify and are correct:
```
AIRTABLE_API_KEY=your_api_key_here
AIRTABLE_BASE_ID=your_base_id_here
AIRTABLE_TABLE_NAME=leads
```

⚠️ **SECURITY NOTE**: Never commit API keys to git. Always use environment variables or Netlify's environment variable settings.

## Why Forms Were Showing "Lead received"

The old code had this pattern:
```typescript
if (!response.ok) {
  console.error("Airtable error:", errorData);
  return NextResponse.json({
    success: true,  // ← WRONG! Should be false
    message: "Lead received"
  });
}
```

This made forms think leads were saved even when they weren't. Now it properly returns errors.

## Next Steps

1. Add the dropdown values to Airtable (15 minutes)
2. Optionally add "Property Type" field (2 minutes)
3. Run `node test-form-submission.js` to verify (should see 4/4 passing)
4. Test the live website forms
5. Check that leads appear in Airtable

## Support

If you need help:
- Review AIRTABLE_SETUP.md for detailed Airtable configuration steps
- Run the test scripts to diagnose issues
- Check Netlify function logs for detailed error messages (they now include full error details)

## Summary

The integration is now working correctly at the code level. The only remaining issue is adding the dropdown values to Airtable. Once that's done, all forms will successfully submit leads to Airtable!
