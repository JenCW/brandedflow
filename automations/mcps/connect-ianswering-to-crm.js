/**
 * Connect iAnswering.ai to CRM
 * Connects iAnswering.ai to client's CRM (from profile) for lead capture
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Connects iAnswering.ai to client CRM (Airtable, HubSpot, Salesforce) for automatic lead capture',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    crm_type: {
      type: 'string',
      required: false,
      description: 'CRM type (if not provided, will use from client profile)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, crm_type } = params;

    if (!client_name) {
      throw new Error('client_name is required');
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

    // Get CRM type from profile or param
    const clientCrm = crm_type || profile.variations?.tech_stack?.crm || 'airtable';
    
    if (!clientCrm || clientCrm === 'none') {
      return {
        success: false,
        error: 'No CRM configured for client. Please set up CRM first.',
        client_name
      };
    }

    // Check for iAnswering.ai API credentials
    const iansweringApiKey = process.env.IANSWERING_AI_API_KEY || process.env.IANSWERING_API_KEY;
    const iansweringAccountId = process.env.IANSWERING_ACCOUNT_ID;
    
    if (!iansweringApiKey || !iansweringAccountId) {
      return {
        success: true,
        skipped: true,
        message: 'iAnswering.ai API credentials not configured. Skipping CRM connection.',
        client_name,
        crm_type: clientCrm
      };
    }

    // Get CRM credentials based on type
    let crmCredentials = {};
    if (clientCrm === 'airtable' || clientCrm.includes('airtable')) {
      crmCredentials = {
        type: 'airtable',
        api_key: process.env.AIRTABLE_API_KEY,
        base_id: process.env.AIRTABLE_BASE_ID || profile.client_specific_ids?.airtable_base_id
      };
    } else if (clientCrm === 'hubspot' || clientCrm.includes('hubspot')) {
      crmCredentials = {
        type: 'hubspot',
        api_key: process.env.HUBSPOT_API_KEY || profile.client_specific_ids?.hubspot_api_key
      };
    } else if (clientCrm === 'salesforce' || clientCrm.includes('salesforce')) {
      crmCredentials = {
        type: 'salesforce',
        api_key: process.env.SALESFORCE_API_KEY || profile.client_specific_ids?.salesforce_api_key
      };
    }

    // TODO: Implement actual iAnswering.ai API call to connect CRM
    // iAnswering.ai API: https://api.ianswering.ai/v1/accounts/{account_id}/integrations/crm
    // Method: POST
    // Body: { crm_type, credentials, ... }

    // Save integration config
    const automationDir = path.join(PROJECT_ROOT, 'clients', client_name, '04_automation');
    await fs.ensureDir(automationDir);
    const integrationPath = path.join(automationDir, 'ianswering-crm-integration.json');
    
    const integrationConfig = {
      client_name: client_name,
      crm_type: clientCrm,
      connected_date: new Date().toISOString(),
      status: 'pending_connection',
      crm_credentials_configured: !!crmCredentials.api_key
    };
    
    await fs.writeJson(integrationPath, integrationConfig, { spaces: 2 });

    // Update profile
    if (!profile.automations) profile.automations = {};
    if (!profile.automations.ai_receptionist) {
      profile.automations.ai_receptionist = {};
    }
    profile.automations.ai_receptionist.crm_integration = {
      crm_type: clientCrm,
      status: 'pending_connection',
      integration_path: integrationPath
    };
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-connect-ianswering-to-crm';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      crm_type: clientCrm,
      integration_path: integrationPath,
      message: `iAnswering.ai CRM integration configured for ${client_name}. Note: Actual connection pending iAnswering.ai API configuration.`,
      next_steps: [
        `1. iAnswering.ai will connect to ${clientCrm}`,
        '2. Leads from calls will automatically be added to CRM',
        '3. Call transcripts will be stored in CRM',
        '4. Qualification status will sync to CRM'
      ]
    };
  }
};

