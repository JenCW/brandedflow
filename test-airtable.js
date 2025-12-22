// Quick Airtable connection test
// Run with: node test-airtable.js

const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY || 'YOUR_KEY_HERE';
const AIRTABLE_BASE_ID = 'appKXCMh5gJ1AvS6Z';
const AIRTABLE_TABLE_NAME = 'Leads';

async function testAirtable() {
  try {
    console.log('Testing Airtable connection...');
    console.log('Base ID:', AIRTABLE_BASE_ID);
    console.log('Table:', AIRTABLE_TABLE_NAME);

    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            Email: 'test@test.com',
            Name: 'Test Lead',
            Phone: '555-1234',
            Status: 'New',
          },
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log('✅ SUCCESS! Lead created:', data.id);
    } else {
      console.log('❌ FAILED!');
      console.log('Error:', JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
}

testAirtable();
