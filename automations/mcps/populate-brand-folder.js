/**
 * Populate Brand Folder
 * Auto-populates 02_brand folder with colors, typography, tone from client profile
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Populates client brand folder (02_brand) with colors, typography, tone, and brand personality from profile',
  
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
    const profilePath = path.join(clientDir, 'client-profile.json');
    const brandDir = path.join(clientDir, '02_brand');

    // Load client profile
    if (!await fs.pathExists(profilePath)) {
      return {
        success: false,
        error: 'Client profile not found. Run process-client-intake first.',
        client_name
      };
    }

    const profile = await fs.readJson(profilePath);
    await fs.ensureDir(brandDir);

    const filesCreated = [];

    // Create brand-colors.txt
    if (profile.variations?.brand?.colors) {
      const colors = Array.isArray(profile.variations.brand.colors) 
        ? profile.variations.brand.colors 
        : [profile.variations.brand.colors];
      
      const colorsContent = `# Brand Colors for ${profile.business_name || client_name}

${colors.map(c => `- ${c}`).join('\n')}

## Usage Notes
- Primary colors: ${colors[0] || 'Not specified'}
- Secondary colors: ${colors.slice(1).join(', ') || 'Not specified'}
`;
      await fs.writeFile(path.join(brandDir, 'brand-colors.txt'), colorsContent);
      filesCreated.push('brand-colors.txt');
    }

    // Create brand-typography.txt
    if (profile.variations?.brand?.typography) {
      const typographyContent = `# Typography for ${profile.business_name || client_name}

**Primary Font:** ${profile.variations.brand.typography}

## Font Stack
- Primary: ${profile.variations.brand.typography}
- Fallback: System fonts (Arial, Helvetica, sans-serif)

## Usage Notes
- Use for headings and body text
- Maintain consistent typography across all materials
`;
      await fs.writeFile(path.join(brandDir, 'brand-typography.txt'), typographyContent);
      filesCreated.push('brand-typography.txt');
    }

    // Create brand-personality-tone.txt
    if (profile.variations?.brand?.tone || profile.variations?.design_style) {
      const toneContent = `# Brand Personality & Tone for ${profile.business_name || client_name}

## Brand Tone
${profile.variations?.brand?.tone || 'Not specified'}

## Design Style
${profile.variations?.design_style || 'Not specified'}

## Target Market
${profile.target_market || 'Not specified'}

## Brand Personality
${profile.variations?.brand?.tone ? 
  `The brand voice should be: ${profile.variations.brand.tone}` : 
  'To be defined'}

## Communication Guidelines
- Maintain consistent tone across all communications
- Reflect brand personality in all client-facing materials
- Align messaging with target market: ${profile.target_market || 'general'}
`;
      await fs.writeFile(path.join(brandDir, 'brand-personality-tone.txt'), toneContent);
      filesCreated.push('brand-personality-tone.txt');
    }

    // Create brand-summary.txt (overview)
    const summaryContent = `# Brand Summary for ${profile.business_name || client_name}

**Client:** ${client_name}
**Business Name:** ${profile.business_name || client_name}
**Industry:** ${profile.industry || 'Not specified'}
**Target Market:** ${profile.target_market || 'Not specified'}

## Design Style
${profile.variations?.design_style || 'Not specified'}

## Brand Colors
${profile.variations?.brand?.colors ? 
  (Array.isArray(profile.variations.brand.colors) ? 
    profile.variations.brand.colors.join(', ') : 
    profile.variations.brand.colors) : 
  'Not specified'}

## Typography
${profile.variations?.brand?.typography || 'Not specified'}

## Brand Tone
${profile.variations?.brand?.tone || 'Not specified'}

## Tech Stack
- Website: ${profile.variations?.tech_stack?.website || 'Not specified'}
- Email: ${profile.variations?.tech_stack?.email || 'Not specified'}
- CRM: ${profile.variations?.tech_stack?.crm || 'Not specified'}

## Last Updated
${profile.last_updated || new Date().toISOString()}
`;
    await fs.writeFile(path.join(brandDir, 'brand-summary.txt'), summaryContent);
    filesCreated.push('brand-summary.txt');

    // Auto-sync to Base44 if portal exists
    if (profile.client_specific_ids && profile.client_specific_ids.base44_portal_id) {
      // Brand folder updates will trigger Base44 sync automatically
      // The sync-folder-to-base44 watcher will detect the changes
      console.log('Base44 portal exists - brand folder updates will sync automatically');
    }

    return {
      success: true,
      client_name,
      brand_dir: brandDir,
      files_created: filesCreated,
      message: `Brand folder populated for ${client_name}. Created ${filesCreated.length} file(s). Base44 portal will sync automatically.`,
      next_steps: [
        'Brand files created in 02_brand/ folder',
        'Base44 portal will update automatically',
        'Continue with website and automation setup'
      ]
    };
  }
};

