#!/usr/bin/env node

/**
 * Airtable Connection Test Script
 * This script tests the Airtable API connection and verifies field mapping
 * 
 * REQUIRES: .env file with AIRTABLE_API_KEY, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME
 */

// Load environment variables
// For local testing, set environment variables or use: dotenv -e .env node test-airtable.js
const BASE_ID = process.env.AIRTABLE_BASE_ID || "appKXCMh5gJ1AvS6Z";
const TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || "leads";
const API_TOKEN = process.env.AIRTABLE_API_KEY;

if (!API_TOKEN) {
  console.error("ERROR: AIRTABLE_API_KEY environment variable is not set!");
  console.error("\nTo run this test locally, you can:");
  console.error("  1. Set environment variables:");
  console.error("     export AIRTABLE_API_KEY=your_api_key_here");
  console.error("     export AIRTABLE_BASE_ID=your_base_id_here");
  console.error("     export AIRTABLE_TABLE_NAME=leads");
  console.error("  2. Or create a .env file and use dotenv-cli:");
  console.error("     npm install -g dotenv-cli");
  console.error("     dotenv -e .env node test-airtable.js");
  console.error("\n⚠️  NEVER commit your .env file or API keys to git!");
  process.exit(1);
}

async function testAirtableConnection() {
  console.log("Testing Airtable Connection...");
  console.log("Base ID:", BASE_ID);
  console.log("Table Name:", TABLE_NAME);
  console.log("API Token:", API_TOKEN.substring(0, 20) + "...");
  console.log("");

  // Test 1: Get table schema to verify field names
  console.log("Test 1: Fetching table schema...");
  try {
    const schemaResponse = await fetch(
      `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!schemaResponse.ok) {
      const error = await schemaResponse.json();
      console.error("Schema fetch failed:", error);
      return;
    }

    const schemaData = await schemaResponse.json();
    const leadsTable = schemaData.tables.find(
      (t) => t.name.toLowerCase() === TABLE_NAME.toLowerCase()
    );

    if (!leadsTable) {
      console.error("Table not found. Available tables:", schemaData.tables.map(t => t.name));
      return;
    }

    console.log("✓ Table found:", leadsTable.name);
    console.log("✓ Table ID:", leadsTable.id);
    console.log("\nAvailable fields:");
    leadsTable.fields.forEach((field) => {
      console.log(`  - ${field.name} (${field.type})`);
    });
    console.log("");
  } catch (error) {
    console.error("Schema test failed:", error.message);
    return;
  }

  // Test 2: Create a test record
  console.log("Test 2: Creating a test record...");
  const testRecord = {
    fields: {
      Name: "Test Lead - API Verification",
      Email: "test@enzomortgages.com",
      Phone: "555-0123",
      // Use only valid select options - omitting Lead Type, Location, Source to test
      Status: "New",
      Timestamp: new Date().toISOString().split('T')[0],
    },
  };

  try {
    const createResponse = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testRecord),
      }
    );

    if (!createResponse.ok) {
      const error = await createResponse.json();
      console.error("✗ Record creation failed:");
      console.error("  Status:", createResponse.status, createResponse.statusText);
      console.error("  Error:", JSON.stringify(error, null, 2));

      if (error.error?.type === "INVALID_REQUEST_BODY") {
        console.error("\nField mapping issues detected!");
        console.error("The fields sent don't match what's in Airtable.");
      }
      return;
    }

    const createdRecord = await createResponse.json();
    console.log("✓ Test record created successfully!");
    console.log("  Record ID:", createdRecord.id);
    console.log("  Fields:", JSON.stringify(createdRecord.fields, null, 2));
    console.log("");

    // Test 3: Cleanup - delete the test record
    console.log("Test 3: Cleaning up test record...");
    const deleteResponse = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${createdRecord.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (deleteResponse.ok) {
      console.log("✓ Test record deleted successfully");
    } else {
      console.log("✗ Failed to delete test record (you may need to delete it manually)");
    }

  } catch (error) {
    console.error("✗ Record creation test failed:", error.message);
    return;
  }

  console.log("\n✓ All tests passed! Airtable integration is working correctly.");
}

// Run the test
testAirtableConnection().catch(console.error);
