# DIRECTIVE: Normalize Lead Data to Airtable Schema

## 1. GOAL
Normalize and map raw form submission data to match Airtable schema format exactly. This ensures all lead data from different form sources (VA loan forms, QuickLeadForm, buying landing pages, etc.) is consistently formatted and accepted by Airtable without rejection errors.

## 2. INPUTS
- **Location**: API route files (e.g., `clients/{client-name}/04_website/app/api/lead/intake/route.ts`)
- **Format**: TypeScript/Next.js API routes receiving JSON form submissions
- **Required**: 
  - Airtable schema definition (field names and allowed values)
  - Form submission data (timeline, credit score, income, loan amount, etc.)
  - Existing API route handling lead intake
- **Optional**: 
  - Multiple form sources (VA loan form, QuickLeadForm, buying landing page)
  - Historical data that needs normalization

## 3. PROCESS

### Phase 1: Orchestration (Decision Making)

1. **Check for existing directive** (this one)
2. **For coding/development work:**
   - Create detailed blueprint with:
     * Objectives: Map all form values to Airtable schema format
     * Proposed Changes: Add normalization functions, update urgency calculation, update Airtable field assignments
     * Logic/Edge Cases: Handle all form variations, missing data, invalid values
     * FE/BE Separation: Backend API route only (no frontend changes)
     * Dependencies: Airtable schema definition, existing API route
   - **WAIT FOR EXPLICIT HUMAN APPROVAL** before proceeding to execution
3. **Handle errors and self-anneal:**
   - When errors occur: Fix code → Test → Update this directive with learnings
   - When Airtable schema changes: Update normalization functions
   - Document fixes in workflow_state.md or this directive's "Learnings" section

### Phase 2: Execution

1. **If blueprint approved:** Implement according to approved blueprint
2. **Create normalization functions:**
   - `normalizeTimeline()` - Maps all timeline formats to Airtable values
   - `calculatePriceLoanRange()` - Converts loan amounts to price bands
   - `calculateCreditBand()` - Converts credit scores to credit bands
   - `calculateDownPaymentBand()` - Converts down payment % to bands
   - `calculateIncomeBand()` - Converts income to income bands
   - `normalizePropertyType()` - Maps property types to Airtable format
3. **Update urgency calculation:**
   - Use normalized timeline values for urgency scoring
   - Ensure urgency calculation works with all form formats
4. **Update Airtable field assignments:**
   - Use normalized values for all Airtable fields
   - Map to exact Airtable schema field names
5. **Verify outputs** match expected Airtable schema format
6. **Self-anneal:** Update directive with any learnings from execution

## 4. OUTPUTS
- **Modified API route** with normalization functions
- **Normalized data** sent to Airtable matching schema exactly
- **Urgency calculation** working correctly for all form formats
- **No Airtable rejection errors** due to field/value mismatches

## 5. EXECUTION SCRIPTS
- None (code changes directly in API route)
- Future: Could create shared normalization utility if used across multiple clients

## 6. EDGE CASES

### Timeline Normalization
- **VA loan form values**: `"immediately"`, `"1-3-months"`, `"3-6-months"`, `"6-plus-months"`
- **QuickLeadForm values**: `"asap"`, `"1-3months"`, `"3-6months"`, `"6plus"`, `"exploring"`
- **Buying landing page values**: `"ASAP"`, `"1-3 months"`, `"3-6 months"`, `"Just exploring"`
- **Airtable schema values**: `"ASAP"`, `"0–30 days"`, `"31–60 days"`, `"61–90 days"`, `"90+ days"`, `"Just researching"`
- **Unknown values**: Use original value if not in map (fallback)

### Price/Loan Range Calculation
- **Input**: Raw loan amount, purchase price, home value, or loan balance (string or number)
- **Output**: `"Under 300k"`, `"300k–500k"`, `"500k–750k"`, `"750k–1M"`, `"1M+"`
- **Edge cases**: 
  - Missing data → undefined (don't set field)
  - Invalid number → undefined (don't set field)
  - Multiple values → use first available (loanAmount || purchasePrice || homeValue || loanBalance)

### Credit Band Calculation
- **Input**: Raw credit score (string or number)
- **Output**: `"760+"`, `"720–759"`, `"680–719"`, `"640–679"`, `"Below 640"`, `"Unknown"`
- **Edge cases**:
  - Missing data → undefined (don't set field)
  - Invalid number → `"Unknown"`
  - Score exactly on boundary → use higher band (e.g., 720 → `"720–759"`)

### Down Payment Band Calculation
- **Input**: Down payment amount, purchase price or home value
- **Output**: `"20%+"`, `"10–19%"`, `"5–9%"`, `"Less than 5%"`, `"Unknown"`
- **Edge cases**:
  - Missing down payment or property value → undefined (don't set field)
  - Invalid numbers → `"Unknown"`
  - Zero property value → `"Unknown"` (avoid division by zero)

### Income Band Calculation
- **Input**: Raw income (string or number)
- **Output**: `"150k+"`, `"100k–149k"`, `"75k–99k"`, `"50k–74k"`, `"Under 50k"`, `"Unknown"`
- **Edge cases**:
  - Missing data → undefined (don't set field)
  - Invalid number → `"Unknown"`
  - Income exactly on boundary → use higher band

### Property Type Normalization
- **Input**: Various property type strings
- **Output**: `"Primary Residence"`, `"Second Home"`, `"Investment / Rental"`, `"Multi-Family"`, `"Unknown"`
- **Edge cases**:
  - Missing data → undefined (don't set field)
  - Case-insensitive matching (use `.toLowerCase()`)
  - Partial matches (e.g., "primary" in "Primary Residence")
  - Unknown format → `"Unknown"`

### Urgency Calculation
- **Must use normalized timeline** for scoring
- **Timeline scoring**:
  - `"ASAP"` or `"0–30 days"` → +3 points
  - `"31–60 days"` → +2 points
  - `"61–90 days"` → +1 point
  - `"Just researching"` → -1 point
- **Other factors**: Loan amount, credit score, state, down payment, property type, income (unchanged)

### Airtable Field Mapping
- **Timeline**: Use normalized value (not raw)
- **Price/Loan Range**: Use calculated band (not raw amount)
- **Credit Band**: Use calculated band (not raw score)
- **Down Payment Band**: Use calculated band (not raw amount/percent)
- **Income Band**: Use calculated band (not raw income)
- **Property Type**: Use normalized value (not raw)
- **Keep raw values**: Optionally store raw values in separate fields for reference (e.g., `"Loan Amount"`, `"Credit Score"`)

## 7. LEARNINGS

### Initial Implementation (December 2024)
- **Problem**: Forms send different timeline formats that don't match Airtable schema, causing rejections
- **Solution**: Created normalization functions to map all form formats to Airtable schema values
- **Key insight**: Urgency calculation must also use normalized timeline, not raw timeline values
- **Key insight**: All band calculations (price, credit, down payment, income) must match Airtable schema exactly
- **Key insight**: Property type normalization needed for consistency

### Common Errors
- **Airtable rejection**: Field value doesn't match single-select options → Use normalization
- **Urgency calculation wrong**: Using raw timeline instead of normalized → Always normalize first
- **Missing bands**: Not calculating bands from raw values → Always calculate bands
- **Case sensitivity**: Property type matching fails due to case → Use `.toLowerCase()`

### Best Practices
- **Always normalize before using**: Normalize timeline before urgency calculation AND before Airtable assignment
- **Fallback to original**: If value not in map, use original value (don't fail silently)
- **Handle missing data**: Return `undefined` for missing data (don't set Airtable field)
- **Handle invalid data**: Return `"Unknown"` for invalid numbers (set Airtable field to "Unknown")
- **Keep raw values**: Optionally store raw values in separate fields for debugging/reference
- **Test all form formats**: Verify normalization works for VA loan form, QuickLeadForm, buying landing page

### Schema Changes
- **When Airtable schema changes**: Update normalization functions immediately
- **Document changes**: Update this directive's edge cases section
- **Test thoroughly**: Verify all form formats still work after schema change

---
**Last Updated:** December 2024
**Status:** Active
**Created By:** AI Assistant (after user feedback on missing directive)
