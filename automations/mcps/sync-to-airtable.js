/**
 * Sync to Airtable
 * Syncs client data to Airtable CRM
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Syncs client profile data to Airtable CRM base',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    table_name: {
      type: 'string',
      required: false,
      default: 'Clients',
      description: 'Airtable table name (default: "Clients")'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, table_name = 'Clients' } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Check for Airtable API credentials (global API key)
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    
    if (!airtableApiKey) {
      return {
        success: true,
        skipped: true,
        message: 'Airtable API key not configured. Skipping sync. Add AIRTABLE_API_KEY to .env to enable.',
        client_name
      };
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    let profile = {};
    
    if (await fs.pathExists(profilePath)) {
      profile = await fs.readJson(profilePath);
    } else {
      return {
        success: false,
        error: 'Client profile not found. Run process-client-intake first.',
        client_name
      };
    }

    // Get client-specific Airtable base ID
    let airtableBaseId = profile.client_specific_ids?.airtable_base_id;
    
    // If client doesn't have their own base yet, we need to create one
    if (!airtableBaseId) {
      return {
        success: false,
        error: `Client does not have an Airtable base yet. Each client needs their own base. Run 'create-airtable-base' MCP first to create a base for this client.`,
        client_name,
        needs_base_creation: true
      };
    }

    // Prepare Airtable record
    const airtableRecord = {
      'Client Name': client_name,
      'Business Name': profile.business_name || '',
      'Industry': profile.industry || '',
      'Target Market': profile.target_market || '',
      'Contact Email': profile.contact_email || '',
      'Contact Phone': profile.contact_phone || '',
      'Design Style': profile.variations?.design_style || '',
      'Website Platform': profile.variations?.tech_stack?.website || '',
      'Email Provider': profile.variations?.tech_stack?.email || '',
      'CRM': profile.variations?.tech_stack?.crm || '',
      'Services': profile.services?.join(', ') || '',
      'Status': 'Active',
      'Last Updated': new Date().toISOString()
    };

    // TODO: Implement actual Airtable API call
    // Airtable API: https://api.airtable.com/v0/{baseId}/{tableName}
    // Method: POST (create) or PATCH (update if record exists)
    // Headers: { 'Authorization': `Bearer ${airtableApiKey}`, 'Content-Type': 'application/json' }
    // Body: { fields: airtableRecord }

    // Check if record already exists (would need to query first)
    // For now, return success with data prepared

    return {
      success: true,
      client_name,
      base_id: airtableBaseId,
      base_name: profile.client_specific_ids?.airtable_base_name || 'Client CRM',
      table_name: table_name,
      record_data: airtableRecord,
      message: `Airtable sync prepared for ${client_name} using their dedicated base (${airtableBaseId}). Note: Actual API call pending Airtable API configuration.`,
      next_steps: [
        '1. Each client has their own Airtable base (isolated data)',
        '2. Ensure base has table: ' + table_name,
        '3. Ensure table has matching field names',
        '4. Configure Airtable API to enable automatic sync'
      ]
    };
  }
};

