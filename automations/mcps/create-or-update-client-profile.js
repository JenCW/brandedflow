/**
 * Create or Update Client Profile
 * Stores client variations that all directives can use
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates or updates client profile with variations (design style, tech stack, existing tools, etc.)',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    variations: {
      type: 'object',
      required: false,
      description: 'Client variations (design_style, tech_stack, existing_tools, etc.)'
    },
    automation_status: {
      type: 'object',
      required: false,
      description: 'Status of specific automation (website, lead_magnet, etc.)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, variations = {}, automation_status = {} } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);
    const profilePath = path.join(clientDir, 'client-profile.json');

    // Load existing profile or create new
    let profile = {
      client_name,
      business_name: client_name.split('-').map(w => 
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' '),
      variations: {},
      automations: {},
      last_updated: new Date().toISOString(),
      updated_by: 'mcp-server'
    };

    if (await fs.pathExists(profilePath)) {
      const existing = await fs.readJson(profilePath);
      profile = { ...profile, ...existing };
    }

    // Update variations
    if (Object.keys(variations).length > 0) {
      profile.variations = { ...profile.variations, ...variations };
    }

    // Update automation status
    if (Object.keys(automation_status).length > 0) {
      profile.automations = { ...profile.automations, ...automation_status };
    }

    // Update metadata
    profile.last_updated = new Date().toISOString();

    // Ensure client directory exists
    await fs.ensureDir(clientDir);

    // Save profile
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      profile_path: profilePath,
      profile,
      message: `Client profile ${await fs.pathExists(profilePath) ? 'updated' : 'created'} for ${client_name}`
    };
  }
};

