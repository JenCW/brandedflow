/**
 * Copy Website Template
 * Copies the AQ Remodeling website template to a new client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Copies AQ Remodeling website template to a new client folder',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    source_template: {
      type: 'string',
      required: false,
      default: 'aq-remodeling',
      description: 'Source template client name (default: aq-remodeling)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, source_template = 'aq-remodeling' } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const sourceDir = path.join(PROJECT_ROOT, 'clients', source_template, '03_website');
    const targetDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');

    // Check if source exists
    if (!await fs.pathExists(sourceDir)) {
      throw new Error(`Source template not found: ${sourceDir}`);
    }

    // Check if target already exists
    if (await fs.pathExists(targetDir)) {
      throw new Error(`Target directory already exists: ${targetDir}`);
    }

    // Ensure client folder exists
    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);
    if (!await fs.pathExists(clientDir)) {
      throw new Error(`Client folder does not exist: ${clientDir}. Create it first.`);
    }

    // Copy entire directory
    await fs.copy(sourceDir, targetDir);

    return {
      success: true,
      client_name,
      source_template,
      source_path: sourceDir,
      target_path: targetDir,
      message: `Copied website template from ${source_template} to ${client_name}`
    };
  }
};

