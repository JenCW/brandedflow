/**
 * Create Proposal From Template
 * Creates a customized proposal from template for a client
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates a customized proposal from template, fills in client details, generates PDF',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    services: {
      type: 'array',
      required: true,
      description: 'Array of services to include in proposal'
    },
    pricing: {
      type: 'object',
      required: true,
      description: 'Pricing information { total: number, deposit: number, payment_structure: string }'
    },
    timeline: {
      type: 'string',
      required: false,
      description: 'Project timeline (e.g., "1-2 weeks")'
    },
    template_source: {
      type: 'string',
      required: false,
      default: 'company/proposals/Proposal template.pdf',
      description: 'Path to proposal template'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { 
      client_name, 
      services, 
      pricing, 
      timeline = '1-2 weeks',
      template_source = 'company/proposals/Proposal template.pdf'
    } = params;

    if (!client_name || !services || !pricing) {
      throw new Error('client_name, services, and pricing are required');
    }

    // Load client profile if exists
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    let clientInfo = {};
    
    if (await fs.pathExists(profilePath)) {
      const profile = await fs.readJson(profilePath);
      clientInfo = {
        business_name: profile.business_name || client_name.split('-').map(w => 
          w.charAt(0).toUpperCase() + w.slice(1)
        ).join(' '),
        contact_email: profile.contact_email,
        variations: profile.variations || {}
      };
    } else {
      // Try to read from intake file
      const intakeDir = path.join(PROJECT_ROOT, 'clients', client_name, '01_intake');
      if (await fs.pathExists(intakeDir)) {
        const intakeFiles = await fs.readdir(intakeDir);
        const txtFiles = intakeFiles.filter(f => f.endsWith('.txt'));
        if (txtFiles.length > 0) {
          const intakeContent = await fs.readFile(
            path.join(intakeDir, txtFiles[0]), 
            'utf-8'
          );
          // Simple extraction (can be enhanced)
          clientInfo.business_name = client_name.split('-').map(w => 
            w.charAt(0).toUpperCase() + w.slice(1)
          ).join(' ');
        }
      }
    }

    // Create proposal content
    const proposalDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const proposalContent = {
      client_name,
      business_name: clientInfo.business_name || client_name,
      date: proposalDate,
      services,
      pricing,
      timeline,
      contact_email: clientInfo.contact_email || '[TO BE FILLED]'
    };

    // Save proposal data
    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    await fs.ensureDir(deliverablesDir);

    const proposalFileName = `proposal-${new Date().toISOString().split('T')[0]}.md`;
    const proposalPath = path.join(deliverablesDir, proposalFileName);

    // Check if iAnswering.ai is included
    const includesAIReceptionist = services.some(s => 
      s.toLowerCase().includes('ai receptionist') || 
      s.toLowerCase().includes('ianswering') ||
      s.toLowerCase().includes('receptionist')
    );

    // Create markdown proposal
    const markdown = `# Proposal for ${clientInfo.business_name}

**Date:** ${proposalDate}
**Status:** Draft - Ready for Review

## Services Included

${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${includesAIReceptionist ? `
### ⭐ AI Receptionist (iAnswering.ai) - Our Biggest Selling Point!

**What You Get:**
- 24/7 phone answering service
- Lead qualification and routing
- Appointment booking integration
- Call transcription and delivery
- CRM integration (automatic lead capture)

**Setup:** Included in proposal
**Ongoing:** iAnswering.ai subscription (separate from this proposal)
` : ''}

## Investment

**Total:** $${pricing.total}
**Deposit:** $${pricing.deposit || pricing.total * 0.5}
**Payment Structure:** ${pricing.payment_structure || '50% deposit, 50% on delivery'}

${pricing.setup_fee ? `**Setup Fee:** $${pricing.setup_fee.toFixed(2)}` : ''}
${pricing.monthly_fee ? `**Monthly Fee:** $${pricing.monthly_fee.toFixed(2)}/month` : ''}

## Timeline

${timeline}

## Next Steps

1. Review this proposal
2. Approve via PandaDoc (link will be sent)
3. Pay deposit to begin
4. Receive portal access for project updates
${includesAIReceptionist ? '5. iAnswering.ai account will be set up automatically' : ''}

---

**Note:** This is a draft proposal. Review and approve to proceed.
`;

    await fs.writeFile(proposalPath, markdown);

    return {
      success: true,
      client_name,
      proposal_path: proposalPath,
      proposal_content: proposalContent,
      message: `Proposal created for ${client_name}. Ready for review.`
    };
  }
};

