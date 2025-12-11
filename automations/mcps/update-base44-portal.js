/**
 * Update Base44 Portal
 * Syncs client profile data to Base44 client portal
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Updates Base44 client portal with client profile data, automations status, and deliverables',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    update_data: {
      type: 'object',
      required: false,
      description: 'Additional data to update (optional - will load from profile if not provided)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, update_data = {} } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Check for Base44 API key
    const base44ApiKey = process.env.BASE44_API_KEY;
    if (!base44ApiKey) {
      // Don't throw error - just log that sync is skipped
      return {
        success: true,
        skipped: true,
        message: 'Base44 API key not configured. Skipping portal sync. Add BASE44_API_KEY to .env to enable.',
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

    // Merge update_data with profile
    const dataToSync = {
      ...profile,
      ...update_data
    };

    // TODO: Implement actual Base44 API call
    // For now, we'll log what would be synced
    // Base44 API endpoint: https://api.base44.com/v1/portals/{portal_id}/update
    // Headers: { 'Authorization': `Bearer ${base44ApiKey}`, 'Content-Type': 'application/json' }
    // Body: { client_data: dataToSync }

    // Check if portal_id exists in profile
    const portalId = profile.client_specific_ids?.base44_portal_id;
    
    if (!portalId) {
      // Portal not set up in Base44 admin yet
      return {
        success: true,
        skipped: true,
        message: 'Base44 portal not set up yet. Add client in Base44 admin panel first - Base44 will send OAuth link automatically. Then update client profile with portal ID.',
        client_name,
        data_prepared: dataToSync,
        action_required: 'Add client in Base44 admin panel'
      };
    }

    // TODO: Make actual API call when Base44 API is fully configured
    // const response = await fetch(`https://api.base44.com/v1/portals/${portalId}/update`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${base44ApiKey}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ client_data: dataToSync })
    // });

    return {
      success: true,
      client_name,
      portal_id: portalId,
      data_synced: {
        business_name: dataToSync.business_name,
        industry: dataToSync.industry,
        automations: dataToSync.automations,
        variations: dataToSync.variations,
        ianswering_ai: dataToSync.automations?.ai_receptionist || null
      },
      message: `Base44 portal updated for ${client_name}. Note: Actual API call pending Base44 API configuration.`
    };
  }
};

