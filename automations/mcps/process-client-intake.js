/**
 * Process Client Intake
 * Takes intake data (from Airtable, manual input, or file) and creates client profile
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Processes client intake data and creates/updates client profile and folder structure',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    intake_data: {
      type: 'object',
      required: false,
      description: 'Intake data object (if from Airtable or manual)'
    },
    source: {
      type: 'string',
      required: false,
      default: 'file',
      description: 'Source: "file", "airtable", or "manual"'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, intake_data = {}, source = 'file' } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    const clientDir = path.join(PROJECT_ROOT, 'clients', client_name);
    const profilePath = path.join(clientDir, 'client-profile.json');

    // Load intake data
    let intake = {};

    if (source === 'file') {
      // Read from intake file
      const intakeDir = path.join(clientDir, '01_intake');
      if (await fs.pathExists(intakeDir)) {
        const intakeFiles = await fs.readdir(intakeDir);
        const txtFiles = intakeFiles.filter(f => f.endsWith('.txt'));
        if (txtFiles.length > 0) {
          const content = await fs.readFile(
            path.join(intakeDir, txtFiles[0]), 
            'utf-8'
          );
          // Parse intake file (simple extraction - can be enhanced)
          intake = parseIntakeFile(content);
        }
      }
    } else if (source === 'airtable' || source === 'manual') {
      // Use provided intake_data
      intake = intake_data;
    }

    // Extract variations from intake
    const variations = extractVariations(intake, client_name);

    // Create or update profile
    const profile = {
      client_name,
      business_name: intake.business_name || client_name.split('-').map(w => 
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' '),
      industry: intake.industry || extractIndustry(client_name),
      target_market: intake.target_market || 'general',
      variations,
      automations: {},
      last_updated: new Date().toISOString(),
      updated_by: 'mcp-process-client-intake'
    };

    // Load existing profile if exists
    if (await fs.pathExists(profilePath)) {
      const existing = await fs.readJson(profilePath);
      profile.automations = existing.automations || {};
      profile.business_name = existing.business_name || profile.business_name;
    }

    // Ensure client directory exists
    await fs.ensureDir(clientDir);

    // Create folder structure if doesn't exist
    const folders = ['01_intake', '02_brand', '03_website', '04_automation', '05_deliverables', '99_archive'];
    for (const folder of folders) {
      const folderPath = path.join(clientDir, folder);
      if (!await fs.pathExists(folderPath)) {
        await fs.ensureDir(folderPath);
        await fs.writeFile(
          path.join(folderPath, 'README.txt'),
          `Client: ${client_name}\nFolder: ${folder}\n`
        );
      }
    }

    // Save profile
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    // Check which folders were actually created
    const foldersCreated = [];
    for (const folder of folders) {
      const folderPath = path.join(clientDir, folder);
      if (!await fs.pathExists(folderPath)) {
        foldersCreated.push(folder);
      }
    }

    return {
      success: true,
      client_name,
      profile_path: profilePath,
      profile,
      folders_created: foldersCreated,
      message: `Client intake processed and profile created for ${client_name}`
    };
  }
};

// Helper functions
function parseIntakeFile(content) {
  const lines = content.split('\n');
  const intake = {};
  
  for (const line of lines) {
    const lower = line.toLowerCase();
    if (lower.includes('business name:')) {
      intake.business_name = line.split(':')[1]?.trim();
    }
    if (lower.includes('website:') || lower.includes('uses website:')) {
      intake.website = extractValue(line, ['wix', 'wordpress', 'static', 'custom']);
    }
    if (lower.includes('email:') || lower.includes('uses email:')) {
      intake.email = extractValue(line, ['gmail', 'outlook', 'custom']);
    }
    if (lower.includes('crm:') || lower.includes('uses crm:')) {
      intake.crm = extractValue(line, ['airtable', 'hubspot', 'salesforce', 'existing']);
    }
    if (lower.includes('industry:')) {
      intake.industry = line.split(':')[1]?.trim();
    }
    if (lower.includes('target market:') || lower.includes('target audience:')) {
      intake.target_market = line.split(':')[1]?.trim();
    }
  }
  
  return intake;
}

function extractValue(line, options) {
  const lower = line.toLowerCase();
  for (const option of options) {
    if (lower.includes(option.toLowerCase())) {
      return option;
    }
  }
  return null;
}

function extractVariations(intake, client_name) {
  const variations = {
    design_style: null,
    tech_stack: {
      website: intake.website || 'static-html',
      email: intake.email || 'outlook',
      crm: intake.crm || 'airtable'
    },
    existing_tools: {},
    custom_requirements: {}
  };

  // Detect existing tools
  if (intake.crm && intake.crm !== 'airtable') {
    variations.existing_tools.crm = intake.crm;
    variations.tech_stack.crm = `existing-${intake.crm}`;
  }

  if (intake.email && intake.email !== 'outlook') {
    variations.existing_tools.email = intake.email;
    variations.tech_stack.email = intake.email;
  }

  if (intake.website && intake.website !== 'static-html') {
    variations.existing_tools.website = intake.website;
    variations.tech_stack.website = intake.website;
  }

  return variations;
}

function extractIndustry(client_name) {
  // Simple extraction from client name
  const name = client_name.toLowerCase();
  if (name.includes('dental')) return 'dental';
  if (name.includes('remodel') || name.includes('construction')) return 'construction';
  if (name.includes('dining') || name.includes('restaurant')) return 'restaurant';
  return 'general';
}

