#!/usr/bin/env node

/**
 * Form Submission Test Script
 * This simulates actual form submissions from the website
 */

const BASE_ID = "appKXCMh5gJ1AvS6Z";
const TABLE_NAME = "leads";
const API_TOKEN = "patDoTRkptPexM9PV.b5aef171dc3af321693239bd98dad95593b127d94cb62530055a080f8329799a";

async function testFormSubmission(testName, formData) {
  console.log(`\n--- ${testName} ---`);
  console.log("Form data:", JSON.stringify(formData, null, 2));

  const airtableFields = {
    Email: formData.email,
    Status: "New",
    Timestamp: new Date().toISOString().split('T')[0],
  };

  if (formData.name) airtableFields.Name = formData.name;
  if (formData.phone) airtableFields.Phone = formData.phone;
  if (formData.leadType) airtableFields["Lead Type"] = formData.leadType;
  if (formData.loanType) airtableFields["Loan Type"] = formData.loanType;
  if (formData.urgency) airtableFields.Urgency = formData.urgency;
  if (formData.source) airtableFields.Source = formData.source;
  if (formData.address) airtableFields.Location = formData.address;
  if (formData.propertyType) airtableFields["Property Type"] = formData.propertyType;

  console.log("\nAirtable fields:", JSON.stringify(airtableFields, null, 2));

  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fields: airtableFields }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("✗ FAILED");
      console.error("  Status:", response.status, response.statusText);
      console.error("  Error:", JSON.stringify(error, null, 2));

      if (error.error?.type === "INVALID_MULTIPLE_CHOICE_OPTIONS") {
        console.error("\n⚠ IMPORTANT: The dropdown field values don't exist in Airtable!");
        console.error("  You need to either:");
        console.error("  1. Add these values to the dropdown options in Airtable, OR");
        console.error("  2. Update the API token to have permission to create new options");
      }
      return null;
    }

    const record = await response.json();
    console.log("✓ SUCCESS - Record created!");
    console.log("  Record ID:", record.id);
    return record.id;

  } catch (error) {
    console.error("✗ FAILED with exception:", error.message);
    return null;
  }
}

async function cleanup(recordIds) {
  console.log("\n--- Cleanup ---");
  for (const id of recordIds) {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
          },
        }
      );

      if (response.ok) {
        console.log(`✓ Deleted record ${id}`);
      }
    } catch (error) {
      console.log(`✗ Failed to delete ${id}`);
    }
  }
}

async function runTests() {
  console.log("=== Form Submission Test Suite ===");
  const recordIds = [];

  // Test 1: QuickLeadForm submission
  const record1 = await testFormSubmission("QuickLeadForm Submission", {
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    leadType: "Quick Lead",
    loanType: "Conventional",
    urgency: "Low",
    source: "Website"
  });
  if (record1) recordIds.push(record1);

  // Test 2: ValuationForm submission
  const record2 = await testFormSubmission("ValuationForm Submission", {
    email: "jane@example.com",
    phone: "555-5678",
    leadType: "Valuation",
    address: "123 Main St, Newport Beach, CA",
    propertyType: "single-family",
    urgency: "Medium",
    source: "Home Valuation Tool"
  });
  if (record2) recordIds.push(record2);

  // Test 3: LeadMagnet submission
  const record3 = await testFormSubmission("LeadMagnet Submission", {
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "555-9999",
    leadType: "Lead Magnet",
    loanType: "DSCR",
    source: "Landing Page",
    urgency: "Nurture"
  });
  if (record3) recordIds.push(record3);

  // Test 4: Investment landing page
  const record4 = await testFormSubmission("Investment Landing Page", {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "555-7777",
    leadType: "Investment Property",
    loanType: "DSCR",
    source: "Landing Page",
    urgency: "Hot"
  });
  if (record4) recordIds.push(record4);

  // Cleanup
  if (recordIds.length > 0) {
    await cleanup(recordIds);
  }

  console.log("\n=== Test Summary ===");
  console.log(`Total tests: 4`);
  console.log(`Successful: ${recordIds.length}`);
  console.log(`Failed: ${4 - recordIds.length}`);

  if (recordIds.length === 4) {
    console.log("\n✓ All tests passed! The form integration is working correctly.");
  } else {
    console.log("\n⚠ Some tests failed. Check the errors above for details.");
  }
}

runTests().catch(console.error);
