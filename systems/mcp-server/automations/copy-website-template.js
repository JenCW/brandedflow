/**
 * Copy Website Template
 * Copies a canonical website template into a client folder
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Copies a website template from /templates into clients/<client>/04_website',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    template: {
      type: 'string',
      required: false,
      default: 'static',
      description: 'Template to use: "static" or "nextjs"'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, template = 'static' } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const templateDir =
      template === 'nextjs'
        ? path.join(PROJECT_ROOT, 'templates', 'client-website-nextjs')
        : path.join(PROJECT_ROOT, 'templates', 'client-website-static');

    const targetDir = path.join(PROJECT_ROOT, 'clients', client_name, '04_website');

    // Check if source exists
    if (!await fs.pathExists(templateDir)) {
      throw new Error(`Template not found: ${templateDir}`);
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
    await fs.copy(templateDir, targetDir);

    return {
      success: true,
      client_name,
      template,
      source_path: templateDir,
      target_path: targetDir,
      message: `Copied website template (${template}) to ${client_name}`
    };
  }
};

