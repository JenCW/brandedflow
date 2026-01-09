/**
 * Create Client Folder Structure
 * Creates the standard Branded+Flow client folder structure for a new client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates standard client folder structure (01_admin, 02_intake, 02_brand, 03_brand_assets, 04_website, 05_forms, 06_automations, 07_delivery, 99_archive) + client-profile.json',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case (e.g., "dental-bunny")'
    },
    display_name: {
      type: 'string',
      required: false,
      description: 'Client display name (e.g., "Dental Bunny")'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, display_name } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Validate client name format (lowercase-kebab-case)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(client_name)) {
      throw new Error('client_name must be in lowercase-kebab-case format');
    }

    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);

    // Check if client folder already exists
    if (await fs.pathExists(clientDir)) {
      throw new Error(`Client folder already exists: ${clientDir}`);
    }

    // Create folder structure
    const folders = [
      '01_admin',
      '02_intake',
      '02_brand',
      '03_brand_assets',
      '04_website',
      '05_forms',
      '06_automations',
      '07_delivery',
      '99_archive'
    ];

    for (const folder of folders) {
      const folderPath = path.join(clientDir, folder);
      await fs.ensureDir(folderPath);
    }

    for (const folder of folders) {
      const readmePath = path.join(clientDir, folder, 'README.txt');
      const readmeContent = `Client: ${display_name || client_name}\nclient_id: ${client_name}\nFolder: ${folder}\n`;
      await fs.writeFile(readmePath, readmeContent);
    }

    // Create minimal client-profile.json (single source of truth for routing/config)
    const profilePath = path.join(clientDir, 'client-profile.json');
    await fs.writeJson(
      profilePath,
      {
        client_id: client_name,
        display_name: display_name || client_name,
        industry: null,
        website: {
          template: null,
          netlify_site_id: null,
          url: null
        },
        automations: {
          lead_intake: {
            airtable_base_id: null,
            airtable_table: 'Leads'
          }
        }
      },
      { spaces: 2 }
    );

    return {
      success: true,
      client_name,
      path: clientDir,
      folders_created: folders,
      message: `Created client folder structure + client-profile.json for ${client_name}`
    };
  }
};

