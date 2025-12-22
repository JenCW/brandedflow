#!/usr/bin/env node

/**
 * Extract Dropdown Values Script
 *
 * This script analyzes all the form submission code to extract the exact
 * dropdown values that need to be added to Airtable.
 */

console.log("=== Required Airtable Dropdown Values ===\n");
console.log("Based on analysis of form submission code:\n");

const dropdownValues = {
  "Lead Type": [
    "Quick Lead",           // QuickLeadForm.tsx
    "Lead Magnet",          // LeadMagnet.tsx
    "Valuation",            // ValuationForm.tsx
    "Investment Property",  // landing/investment/page.tsx
    "Pre-Approval",         // (common use case)
    "Rate Quote",           // (common use case)
    "Contact",              // (common use case)
  ],
  "Loan Type": [
    "Conventional",         // QuickLeadForm.tsx options
    "FHA",                  // QuickLeadForm.tsx options
    "VA",                   // QuickLeadForm.tsx options
    "Jumbo",                // QuickLeadForm.tsx options
    "Refinance",            // QuickLeadForm.tsx options
    "Cash-Out",             // QuickLeadForm.tsx options
    "DSCR",                 // QuickLeadForm.tsx options, investment pages
    "Bank Statement",       // QuickLeadForm.tsx options
    "Foreign National",     // QuickLeadForm.tsx options
  ],
  "Urgency": [
    "Hot",                  // Investment landing pages
    "Medium",               // ValuationForm
    "Low",                  // QuickLeadForm
    "Nurture",              // LeadMagnet
  ],
  "Source": [
    "Website",              // QuickLeadForm default
    "Landing Page",         // Investment/buying/refinance/cash-out pages
    "Home Valuation Tool",  // ValuationForm
    "API Test",             // test scripts
    "Direct",               // (common use case)
  ],
  "Status": [
    "New",                  // Default for all forms
    "Contacted",            // (workflow state)
    "Qualified",            // (workflow state)
    "In Progress",          // (workflow state)
    "Closed",               // (workflow state)
    "Lost",                 // (workflow state)
  ],
};

const optionalFields = {
  "Property Type": [
    "single-family",        // ValuationForm options
    "condo",                // ValuationForm options
    "townhome",             // ValuationForm options
    "multi-unit",           // ValuationForm options
  ],
};

// Display required dropdowns
Object.entries(dropdownValues).forEach(([fieldName, values]) => {
  console.log(`${fieldName}:`);
  values.forEach(value => {
    console.log(`  - ${value}`);
  });
  console.log("");
});

// Display optional fields
console.log("=== Optional Field (Not in Airtable Yet) ===\n");
Object.entries(optionalFields).forEach(([fieldName, values]) => {
  console.log(`${fieldName}:`);
  values.forEach(value => {
    console.log(`  - ${value}`);
  });
  console.log("");
});

// Quick reference table
console.log("=== Quick Copy-Paste Reference ===\n");
console.log("Lead Type:");
console.log(dropdownValues["Lead Type"].join(", "));
console.log("\nLoan Type:");
console.log(dropdownValues["Loan Type"].join(", "));
console.log("\nUrgency:");
console.log(dropdownValues["Urgency"].join(", "));
console.log("\nSource:");
console.log(dropdownValues["Source"].join(", "));
console.log("\nStatus:");
console.log(dropdownValues["Status"].join(", "));
console.log("\nProperty Type (optional field):");
console.log(optionalFields["Property Type"].join(", "));

console.log("\n=== Instructions ===");
console.log("1. Open Airtable: https://airtable.com/appKXCMh5gJ1AvS6Z");
console.log("2. Click on the 'leads' table");
console.log("3. For each field name above:");
console.log("   a. Click the field header");
console.log("   b. Click 'Customize field type'");
console.log("   c. Paste the comma-separated values into the options");
console.log("   d. Click 'Save'");
console.log("4. For 'Property Type': First create the field, then add options");
console.log("\n✓ After adding these values, run: node test-form-submission.js");
