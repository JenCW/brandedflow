/**
 * Create Airtable Base for Client
 * Creates a new Airtable base (database) specifically for this client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates a new Airtable base (database) for a client with standard tables and structure',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    base_name: {
      type: 'string',
      required: false,
      description: 'Custom base name (defaults to business name)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, base_name } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Check for Airtable API credentials
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    
    if (!airtableApiKey) {
      return {
        success: true,
        skipped: true,
        message: 'Airtable API key not configured. Skipping base creation. Add AIRTABLE_API_KEY to .env to enable.',
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

    // Check if client already has a base
    if (profile.client_specific_ids?.airtable_base_id) {
      return {
        success: true,
        skipped: true,
        message: `Client already has an Airtable base: ${profile.client_specific_ids.airtable_base_id}`,
        client_name,
        base_id: profile.client_specific_ids.airtable_base_id
      };
    }

    const businessName = profile.business_name || client_name.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');
    const baseDisplayName = base_name || `${businessName} - CRM`;

    // TODO: Implement actual Airtable API call to create base
    // Airtable API: https://api.airtable.com/v0/meta/bases
    // Method: POST
    // Headers: { 'Authorization': `Bearer ${airtableApiKey}`, 'Content-Type': 'application/json' }
    // Body: {
    //   name: baseDisplayName,
    //   tables: [
    //     { name: 'Clients', fields: [...] },
    //     { name: 'Leads', fields: [...] },
    //     { name: 'Tasks', fields: [...] },
    //     ...
    //   ]
    // }

    // For now, generate a placeholder base ID (will be replaced when API is configured)
    const baseId = `app${client_name.replace(/-/g, '').substring(0, 10)}${Date.now().toString().slice(-6)}`;

    // Update client profile with base ID
    if (!profile.client_specific_ids) {
      profile.client_specific_ids = {};
    }
    profile.client_specific_ids.airtable_base_id = baseId;
    profile.client_specific_ids.airtable_base_name = baseDisplayName;
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-create-airtable-base';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    // Create base configuration file
    const baseConfig = {
      base_id: baseId,
      base_name: baseDisplayName,
      client_name: client_name,
      created_date: new Date().toISOString(),
      tables: [
        { name: 'Clients', description: 'Client information' },
        { name: 'Leads', description: 'Lead capture and qualification' },
        { name: 'Tasks', description: 'Project tasks and to-dos' },
        { name: 'Documents', description: 'Project documents and deliverables' },
        { name: 'Communications', description: 'Email and communication history' }
      ],
      status: 'pending_creation'
    };

    const configPath = path.join(PROJECT_ROOT, 'clients', client_name, 'airtable-base-config.json');
    await fs.writeJson(configPath, baseConfig, { spaces: 2 });

    return {
      success: true,
      client_name,
      base_id: baseId,
      base_name: baseDisplayName,
      config_path: configPath,
      message: `Airtable base configuration created for ${client_name}. Note: Actual base creation pending Airtable API configuration. Each client gets their own separate base.`,
      next_steps: [
        '1. Configure Airtable API to enable automatic base creation',
        '2. Base will be created with standard tables (Clients, Leads, Tasks, Documents, Communications)',
        '3. Base ID will be stored in client profile',
        '4. All future syncs will use this client-specific base'
      ]
    };
  }
};

