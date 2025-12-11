/**
 * Create Client Startup Documentation
 * Generates client-specific startup documentation from profile and intake data
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates client-specific startup documentation including project overview, next steps, and portal access',
  
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
    const deliverablesDir = path.join(clientDir, '05_deliverables');

    // Load client profile
    if (!await fs.pathExists(profilePath)) {
      return {
        success: false,
        error: 'Client profile not found. Run process-client-intake first.',
        client_name
      };
    }

    const profile = await fs.readJson(profilePath);
    await fs.ensureDir(deliverablesDir);

    const businessName = profile.business_name || client_name.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');

    // Create START_HERE.md - Client startup guide
    const startHereContent = `# Welcome to Branded + Flow - ${businessName}

**Project Start Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Client:** ${businessName}
**Project Status:** Active

---

## 🎯 Project Overview

**Industry:** ${profile.industry || 'Not specified'}
**Target Market:** ${profile.target_market || 'Not specified'}
**Design Style:** ${profile.variations?.design_style || 'To be determined'}

## 📋 Services Included

${profile.services && profile.services.length > 0 
  ? profile.services.map((s, i) => `${i + 1}. ${s}`).join('\n')
  : 'Services to be confirmed'}

## 🔑 Portal Access

**Base44 Client Portal:** ${profile.client_specific_ids?.base44_portal_id 
  ? `Portal ID: ${profile.client_specific_ids.base44_portal_id}` 
  : 'Portal will be created during onboarding'}

${profile.client_specific_ids?.base44_portal_name 
  ? `**Portal Name:** ${profile.client_specific_ids.base44_portal_name}` 
  : ''}

## 📁 Project Structure

Your project is organized in the following folders:
- \`01_intake/\` - Initial client information
- \`02_brand/\` - Brand assets, colors, typography, tone
- \`03_website/\` - Website files (if applicable)
- \`04_automation/\` - Automation workflows and configurations
- \`05_deliverables/\` - Final deliverables and documentation
- \`99_archive/\` - Archived files and old versions

## 🚀 Next Steps

1. **Review Brand Assets** - Check \`02_brand/\` folder for colors, typography, and brand personality
2. **Access Portal** - Base44 portal access will be provided (OAuth setup in progress)
3. **Review Deliverables** - Check \`05_deliverables/\` folder for proposals, contracts, and project docs
4. **Stay Updated** - All updates will be posted to your Base44 portal

## 📞 Contact

**Your Contact Email:** ${profile.contact_email || 'To be confirmed'}
**Project Manager:** Branded + Flow Team

---

## 📝 Project Notes

${profile.variations?.custom_requirements?.special_notes || 'No special notes at this time.'}

---

**Last Updated:** ${profile.last_updated || new Date().toISOString()}
`;

    const startHerePath = path.join(deliverablesDir, 'START_HERE.md');
    await fs.writeFile(startHerePath, startHereContent);

    // Create PROJECT_OVERVIEW.md
    const overviewContent = `# Project Overview - ${businessName}

## Client Information

- **Business Name:** ${businessName}
- **Industry:** ${profile.industry || 'Not specified'}
- **Target Market:** ${profile.target_market || 'Not specified'}
- **Contact Email:** ${profile.contact_email || 'Not specified'}
- **Contact Phone:** ${profile.contact_phone || 'Not specified'}

## Brand Identity

### Design Style
${profile.variations?.design_style || 'To be determined'}

### Brand Colors
${profile.variations?.brand?.colors 
  ? (Array.isArray(profile.variations.brand.colors) 
    ? profile.variations.brand.colors.join(', ') 
    : profile.variations.brand.colors)
  : 'To be determined'}

### Typography
${profile.variations?.brand?.typography || 'To be determined'}

### Brand Tone
${profile.variations?.brand?.tone || 'To be determined'}

## Tech Stack

- **Website Platform:** ${profile.variations?.tech_stack?.website || 'Not specified'}
- **Email Provider:** ${profile.variations?.tech_stack?.email || 'Not specified'}
- **CRM:** ${profile.variations?.tech_stack?.crm || 'Not specified'}

## Services & Automations

${profile.services && profile.services.length > 0 
  ? profile.services.map(s => `- ${s}`).join('\n')
  : 'Services to be confirmed'}

### Automation Status

${Object.keys(profile.automations || {}).length > 0
  ? Object.entries(profile.automations).map(([key, value]) => 
    `- **${key}:** ${value.status || 'pending'}`
  ).join('\n')
  : 'No automations started yet'}

## Portal & Access

- **Base44 Portal ID:** ${profile.client_specific_ids?.base44_portal_id || 'Not created yet'}
- **Portal Status:** ${profile.client_specific_ids?.base44_portal_id ? 'Active' : 'Pending creation'}

---

**Last Updated:** ${profile.last_updated || new Date().toISOString()}
`;

    const overviewPath = path.join(deliverablesDir, 'PROJECT_OVERVIEW.md');
    await fs.writeFile(overviewPath, overviewContent);

    return {
      success: true,
      client_name,
      files_created: [
        'START_HERE.md',
        'PROJECT_OVERVIEW.md'
      ],
      deliverables_dir: deliverablesDir,
      message: `Client startup documentation created for ${client_name}`
    };
  }
};

