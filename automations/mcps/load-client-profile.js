/**
 * Load Client Profile
 * Reads client profile for use in directives
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Loads client profile with all variations and automation status',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');

    if (!await fs.pathExists(profilePath)) {
      return {
        success: false,
        client_name,
        profile: null,
        message: `No profile found for ${client_name}. Create one first.`
      };
    }

    const profile = await fs.readJson(profilePath);

    return {
      success: true,
      client_name,
      profile,
      message: `Loaded profile for ${client_name}`
    };
  }
};

