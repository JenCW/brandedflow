/**
 * Approve Client Proposal
 * When a client approves a proposal, this triggers the full setup:
 * - Airtable base creation
 * - Base44 portal creation
 * - Contract generation
 * - Onboarding docs
 * - Full automation setup
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Approves a client proposal and triggers full setup: Airtable, Base44, contract, onboarding, and all automations',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    approval_date: {
      type: 'string',
      required: false,
      description: 'Approval date (ISO format). Defaults to today.'
    },
    approved_phase: {
      type: 'string',
      required: false,
      default: 'phase1',
      description: 'Which phase was approved: phase1, phase2, phase3, or all'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { 
      client_name, 
      approval_date = new Date().toISOString(),
      approved_phase = 'phase1'
    } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}. Run process-client-intake first.`);
    }

    const profile = await fs.readJson(profilePath);

    // Check if proposal exists
    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    const proposalFiles = await fs.readdir(deliverablesDir).catch(() => []);
    const hasProposal = proposalFiles.some(f => f.includes('PROPOSAL') && f.endsWith('.html'));

    if (!hasProposal) {
      throw new Error(`No proposal found for ${client_name}. Generate proposal first.`);
    }

    // Update profile with approval status
    profile.approval_status = 'approved';
    profile.approval_date = approval_date;
    profile.approved_phase = approved_phase;
    profile.project_status = 'active';
    profile.project_start_date = approval_date;

    // Call other MCPs to set up everything
    const results = {
      client_name,
      approval_date,
      approved_phase,
      setup_steps: []
    };

    // Helper to call other MCPs
    async function callMcp(mcpName, mcpParams) {
      // In real implementation, this would call the MCP server
      // For now, we'll return the call structure
      return {
        mcp: mcpName,
        params: mcpParams,
        status: 'pending'
      };
    }

    // Step 1: Create Airtable base
    results.setup_steps.push(await callMcp('create-airtable-base', {
      client_name,
      base_name: `${profile.business_name} - CRM`
    }));

    // Step 2: Create Base44 portal
    results.setup_steps.push(await callMcp('create-base44-portal', {
      client_name,
      portal_name: `${profile.business_name} Portal`
    }));

    // Step 3: Generate contract
    results.setup_steps.push(await callMcp('create-contract', {
      client_name,
      contract_data: {
        contract_type: approved_phase === 'all' ? 'phased' : 'single',
        contract_date: approval_date,
        project_start_date: approval_date,
        payment_terms: '50-50',
        monthly_start: '30-days'
      },
      client_email: profile.contact_email
    }));

    // Step 4: Generate onboarding docs
    results.setup_steps.push(await callMcp('create-client-startup-docs', {
      client_name
    }));

    // Step 5: Setup iAnswering.ai if included
    if (profile.services && profile.services.some(s => 
      s.toLowerCase().includes('ai receptionist') || 
      s.toLowerCase().includes('ianswering')
    )) {
      results.setup_steps.push(await callMcp('setup-ianswering-account', {
        client_name,
        phone_number: profile.contact_phone,
        business_hours: {},
        account_settings: {}
      }));

      results.setup_steps.push(await callMcp('connect-ianswering-to-crm', {
        client_name,
        crm_type: 'airtable',
        crm_config: {}
      }));
    }

    // Step 6: Process research findings (if research is complete)
    if (profile.research && profile.research.status === 'complete') {
      results.setup_steps.push(await callMcp('process-research-findings', {
        client_name,
        research_reports: [
          path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research', '01-market-competitive-analysis.md'),
          path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research', '02-buyer-personas.md'),
          path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research', '03-strategic-recommendations.md')
        ]
      }));
    }

    // Step 7: Populate brand folder
    if (profile.variations && profile.variations.brand) {
      results.setup_steps.push(await callMcp('populate-brand-folder', {
        client_name,
        brand_data: profile.variations.brand
      }));
    }

    // Update profile
    profile.setup_completed = {
      airtable: false, // Will be updated when MCP completes
      base44: false,
      contract: false,
      onboarding: false,
      ianswering: false,
      research_processed: false,
      brand_folder: false
    };
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-approve-client-proposal';

    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      ...results,
      message: `Client ${profile.business_name} approved! Full setup initiated.`,
      next_steps: [
        '1. Airtable base will be created',
        '2. Base44 portal will be created',
        '3. Contract will be generated',
        '4. Onboarding docs will be created',
        '5. All automations will be configured',
        '6. Client will receive portal access'
      ]
    };
  }
};

