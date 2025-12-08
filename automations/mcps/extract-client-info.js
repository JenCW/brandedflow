/**
 * Extract Client Information
 * Extracts structured information from client intake and brand files
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Extracts structured information from client intake and brand files',
  
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

    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);
    
    if (!await fs.pathExists(clientDir)) {
      throw new Error(`Client folder does not exist: ${clientDir}`);
    }

    const intakeDir = path.join(clientDir, '01_intake');
    const brandDir = path.join(clientDir, '02_brand');

    const info = {
      client_name,
      business_name: client_name.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      intake: null,
      brand: null,
      extracted: {}
    };

    // Read intake file
    if (await fs.pathExists(intakeDir)) {
      const intakeFiles = await fs.readdir(intakeDir);
      const txtFiles = intakeFiles.filter(f => f.endsWith('.txt'));
      
      if (txtFiles.length > 0) {
        const intakeFile = path.join(intakeDir, txtFiles[0]);
        const content = await fs.readFile(intakeFile, 'utf-8');
        info.intake = content;
        
        // Simple extraction (can be enhanced)
        const lines = content.split('\n');
        for (const line of lines) {
          if (line.toLowerCase().includes('business name:')) {
            info.extracted.business_name = line.split(':')[1]?.trim();
          }
          if (line.toLowerCase().includes('services:')) {
            info.extracted.services = line.split(':')[1]?.trim();
          }
          if (line.toLowerCase().includes('contact:')) {
            info.extracted.contact = line.split(':')[1]?.trim();
          }
        }
      }
    }

    // Read brand file
    if (await fs.pathExists(brandDir)) {
      const brandFiles = await fs.readdir(brandDir);
      const txtFiles = brandFiles.filter(f => f.endsWith('.txt'));
      
      if (txtFiles.length > 0) {
        const brandFile = path.join(brandDir, txtFiles[0]);
        const content = await fs.readFile(brandFile, 'utf-8');
        info.brand = content;
        
        // Simple extraction (can be enhanced)
        const lines = content.split('\n');
        for (const line of lines) {
          if (line.toLowerCase().includes('color') || line.toLowerCase().includes('#')) {
            const colorMatch = line.match(/#[0-9a-fA-F]{6}/);
            if (colorMatch) {
              if (!info.extracted.colors) info.extracted.colors = [];
              info.extracted.colors.push(colorMatch[0]);
            }
          }
        }
      }
    }

    return {
      success: true,
      client_name,
      info,
      message: `Extracted information for ${client_name}`
    };
  }
};

