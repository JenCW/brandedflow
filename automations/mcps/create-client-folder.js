/**
 * Create Client Folder Structure
 * Creates the standard 01-05 folder structure for a new client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates standard client folder structure (01_intake, 02_brand, 03_website, 04_automation, 05_deliverables)',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case (e.g., "dental-bunny")'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name } = params;

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
      '01_intake',
      '02_brand',
      '03_website',
      '04_automation',
      '05_deliverables',
      '99_archive'
    ];

    for (const folder of folders) {
      const folderPath = path.join(clientDir, folder);
      await fs.ensureDir(folderPath);
    }

    // Create README.txt in each folder
    const readmeContent = `Client: ${client_name}\nFolder: ${folders.find(f => clientDir.includes(f)) || 'root'}\n`;
    
    for (const folder of folders) {
      const readmePath = path.join(clientDir, folder, 'README.txt');
      await fs.writeFile(readmePath, readmeContent);
    }

    return {
      success: true,
      client_name,
      path: clientDir,
      folders_created: folders,
      message: `Created client folder structure for ${client_name}`
    };
  }
};

