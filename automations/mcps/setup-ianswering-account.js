/**
 * Setup iAnswering.ai Account
 * Creates and configures iAnswering.ai account for a client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates and configures iAnswering.ai account for client, sets up phone number, call routing, and basic settings',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    phone_number: {
      type: 'string',
      required: false,
      description: 'Existing phone number to use (if not provided, will assign new number)'
    },
    business_hours: {
      type: 'object',
      required: false,
      description: 'Business hours configuration { timezone, hours: { monday: "9am-5pm", ... } }'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, phone_number, business_hours } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Check for iAnswering.ai API credentials
    const iansweringApiKey = process.env.IANSWERING_AI_API_KEY || process.env.IANSWERING_API_KEY;
    const iansweringAccountId = process.env.IANSWERING_ACCOUNT_ID;
    
    if (!iansweringApiKey || !iansweringAccountId) {
      return {
        success: true,
        skipped: true,
        message: 'iAnswering.ai API credentials not configured. Skipping setup. Add IANSWERING_AI_API_KEY and IANSWERING_ACCOUNT_ID to .env to enable.',
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

    const businessName = profile.business_name || client_name.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');

    // TODO: Implement actual iAnswering.ai API call
    // iAnswering.ai API: https://api.ianswering.ai/v1/accounts/{account_id}/clients
    // Method: POST
    // Headers: { 'Authorization': `Bearer ${iansweringApiKey}`, 'Content-Type': 'application/json' }
    // Body: {
    //   client_name: businessName,
    //   phone_number: phone_number,
    //   business_hours: business_hours,
    //   industry: profile.industry,
    //   ...
    // }

    // For now, create configuration file
    const iansweringConfig = {
      client_name: client_name,
      business_name: businessName,
      account_id: iansweringAccountId,
      phone_number: phone_number || 'pending_assignment',
      business_hours: business_hours || null,
      industry: profile.industry || null,
      created_date: new Date().toISOString(),
      status: 'pending_setup'
    };

    // Save config
    const automationDir = path.join(PROJECT_ROOT, 'clients', client_name, '04_automation');
    await fs.ensureDir(automationDir);
    const configPath = path.join(automationDir, 'ianswering-config.json');
    await fs.writeJson(configPath, iansweringConfig, { spaces: 2 });

    // Update client profile
    if (!profile.automations) profile.automations = {};
    profile.automations.ai_receptionist = {
      status: 'pending_setup',
      account_id: iansweringAccountId,
      phone_number: phone_number || 'pending_assignment',
      config_path: configPath
    };
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-setup-ianswering-account';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      account_id: iansweringAccountId,
      phone_number: phone_number || 'pending_assignment',
      config_path: configPath,
      message: `iAnswering.ai account configuration created for ${client_name}. Note: Actual account creation pending iAnswering.ai API configuration.`,
      next_steps: [
        '1. Configure iAnswering.ai API to enable automatic account creation',
        '2. Phone number will be assigned automatically',
        '3. Call scripts will be customized based on client profile',
        '4. CRM integration will be set up (from client profile)'
      ]
    };
  }
};

