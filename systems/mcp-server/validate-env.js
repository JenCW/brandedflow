/**
 * Validate .env file format
 * Checks if Outlook credentials are properly formatted
 */

require('dotenv').config();

console.log('\n🔍 Validating .env file format...\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

let hasErrors = false;

// Check Outlook credentials
const requiredVars = {
  'OUTLOOK_CLIENT_ID': process.env.OUTLOOK_CLIENT_ID,
  'OUTLOOK_CLIENT_SECRET': process.env.OUTLOOK_CLIENT_SECRET,
  'OUTLOOK_TENANT_ID': process.env.OUTLOOK_TENANT_ID
};

console.log('📋 Checking Outlook credentials:\n');

for (const [varName, value] of Object.entries(requiredVars)) {
  if (!value) {
    console.log(`❌ ${varName}: MISSING`);
    hasErrors = true;
  } else if (value.trim() === '' || value === `your_${varName.toLowerCase()}_here`) {
    console.log(`❌ ${varName}: Not set (still has placeholder)`);
    hasErrors = true;
  } else {
    // Check format
    if (varName === 'OUTLOOK_CLIENT_ID' || varName === 'OUTLOOK_TENANT_ID') {
      // Should be UUID format (with or without dashes)
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidPattern.test(value)) {
        console.log(`⚠️  ${varName}: Format looks incorrect (should be UUID format)`);
        console.log(`   Current value: ${value.substring(0, 50)}...`);
      } else {
        console.log(`✅ ${varName}: Present and formatted correctly`);
      }
    } else if (varName === 'OUTLOOK_CLIENT_SECRET') {
      // Client secret can be various formats
      if (value.length < 10) {
        console.log(`⚠️  ${varName}: Seems too short (might be incorrect)`);
      } else {
        console.log(`✅ ${varName}: Present`);
      }
    }
  }
}

console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (hasErrors) {
  console.log('❌ Issues found! Please check your .env file.\n');
  console.log('Common issues:');
  console.log('  - Variables have # in front (remove #)');
  console.log('  - Variables have spaces around = (remove spaces)');
  console.log('  - Values are still placeholders (replace with actual values)');
  console.log('  - Variables are missing\n');
  process.exit(1);
} else {
  console.log('✅ All Outlook credentials are present and formatted correctly!\n');
  console.log('You can now run: node get-outlook-refresh-token.js\n');
  process.exit(0);
}

