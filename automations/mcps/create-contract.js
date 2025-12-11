/**
 * Create Contract
 * Creates a client contract document from provided contract data
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates a client contract document and saves to deliverables folder',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    contract_data: {
      type: 'object',
      required: true,
      description: 'Contract data object with services, pricing, terms, etc.'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, contract_data } = params;

    if (!client_name || !contract_data) {
      throw new Error('client_name and contract_data are required');
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
        contact_email: profile.contact_email || contract_data.client_email
      };
    } else {
      clientInfo.business_name = client_name.split('-').map(w => 
        w.charAt(0).toUpperCase() + w.slice(1)
      ).join(' ');
    }

    // Create contract content
    const contractDate = contract_data.contract_date || new Date().toISOString().split('T')[0];
    const contractDateFormatted = new Date(contractDate).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const services = Array.isArray(contract_data.services) 
      ? contract_data.services 
      : contract_data.services.split('\n').filter(s => s.trim()).map(s => s.trim());

    // Build payment schedule text
    const paymentSchedule = contract_data.payment_schedule.map((p, i) => {
      const dueDate = p.due_date ? new Date(p.due_date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }) : 'Upon receipt';
      return `${i + 1}. **${p.description}:** $${p.amount.toFixed(2)} (Due: ${dueDate})`;
    }).join('\n');

    // Check if iAnswering.ai is included
    const includesAIReceptionist = services.some(s => 
      s.toLowerCase().includes('ai receptionist') || 
      s.toLowerCase().includes('ianswering') ||
      s.toLowerCase().includes('receptionist')
    );

    // Create markdown contract
    const contractMarkdown = `# Contract for ${clientInfo.business_name}

**Contract Date:** ${contractDateFormatted}
**Client Email:** ${contract_data.client_email || clientInfo.contact_email || '[TO BE FILLED]'}
**Status:** Draft - Ready for Signature

## Services Included

${services.map((s, i) => `${i + 1}. ${s}`).join('\n')}

${includesAIReceptionist ? `
### ⭐ AI Receptionist (iAnswering.ai) - Our Biggest Selling Point!

**What's Included:**
- iAnswering.ai account setup and configuration
- Custom call script creation
- CRM integration (automatic lead capture)
- Appointment booking setup (if applicable)
- Call transcription delivery setup

**Ongoing Service:**
- iAnswering.ai subscription (separate from contract amount)
- Ongoing optimization and script updates (if Managed plan)

**Setup Timeline:** Included in project timeline
` : ''}

## Payment Terms

**Total Contract Amount:** $${contract_data.total_amount.toFixed(2)}
**Contract Type:** ${contract_data.contract_type === 'diy' ? 'DIY (One-Time Payment)' : 'Managed (Setup + Monthly)'}

### Payment Schedule

${paymentSchedule}

## Timeline

${contract_data.timeline || 'To be determined'}
${contract_data.start_date ? `**Start Date:** ${new Date(contract_data.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}
${contract_data.delivery_date ? `**Delivery Date:** ${new Date(contract_data.delivery_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}

## Terms & Conditions

**Cancellation Policy:** ${contract_data.cancellation_policy || '30 days notice required'}

${contract_data.additional_terms ? `\n**Additional Terms:**\n${contract_data.additional_terms}` : ''}

${contract_data.expiration_date ? `\n**Contract Expires:** ${new Date(contract_data.expiration_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}` : ''}

---

## Next Steps

1. Review this contract
2. Review contract with client
3. Client signs contract
4. Begin work upon signature

**Note:** Contract is ready for review and signature.
`;

    // Save contract to deliverables folder
    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    await fs.ensureDir(deliverablesDir);

    const contractFileName = `contract-${contractDate}.md`;
    const contractPath = path.join(deliverablesDir, contractFileName);

    await fs.writeFile(contractPath, contractMarkdown);

    // Update client profile with contract status
    if (await fs.pathExists(profilePath)) {
      const profile = await fs.readJson(profilePath);
      if (!profile.automations) profile.automations = {};
      profile.automations.contract = {
        status: 'draft',
        contract_date: contractDate,
        contract_path: contractPath,
        total_amount: contract_data.total_amount,
        contract_type: contract_data.contract_type
      };
      profile.last_updated = new Date().toISOString();
      profile.updated_by = 'mcp-create-contract';
      await fs.writeJson(profilePath, profile, { spaces: 2 });
    }

    return {
      success: true,
      client_name,
      contract_path: contractPath,
      contract_date: contractDate,
      total_amount: contract_data.total_amount,
      message: `Contract created for ${client_name}. Ready for review and signature.`
    };
  }
};

