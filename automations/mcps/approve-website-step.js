/**
 * Approve Website Step
 * Manages the approval workflow for each website creation step
 * Allows iteration and multiple reviews before approval
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Approves a specific step in the website creation process. Allows iteration before moving to next step.',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    step: {
      type: 'string',
      required: true,
      description: 'Step to approve: step1, step2, step3, step4, step5'
    },
    notes: {
      type: 'string',
      required: false,
      description: 'Optional notes about the approval or changes made'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, step, notes } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    if (!step) {
      throw new Error('step is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);

    // Validate step progression
    const stepOrder = {
      'step1': 'step1_site_plan',
      'step2': 'step2_design_guide',
      'step3': 'step3_website_copy',
      'step4': 'step4_features',
      'step5': 'step5_client_review'
    };

    const currentStatus = profile.website?.creation_status || 'not_started';
    const requiredStatus = stepOrder[step];

    if (!requiredStatus) {
      throw new Error(`Invalid step: ${step}. Must be step1, step2, step3, step4, or step5`);
    }

    // Check if current step matches
    if (currentStatus !== requiredStatus && !currentStatus.includes('_approved')) {
      return {
        success: false,
        error: `Cannot approve ${step}. Current status is ${currentStatus}. Step must be in ${requiredStatus} state first.`,
        current_status: currentStatus,
        required_status: requiredStatus
      };
    }

    // Update status to approved
    const approvedStatus = requiredStatus + '_approved';
    profile.website.creation_status = approvedStatus;
    profile.website[`${step}_approved_date`] = new Date().toISOString();
    if (notes) {
      profile.website[`${step}_approval_notes`] = notes;
    }

    // Determine next step
    const nextSteps = {
      'step1': {
        next: 'step2',
        next_action: 'Create design guide (colors, fonts, look & feel)',
        mcp: 'create-design-guide'
      },
      'step2': {
        next: 'step3',
        next_action: 'Generate website copy (all text content)',
        mcp: 'generate-website-copy'
      },
      'step3': {
        next: 'step4',
        next_action: 'Add animations, integrations, dynamic elements',
        mcp: 'add-website-features'
      },
      'step4': {
        next: 'step5',
        next_action: 'Prepare for client review',
        mcp: 'prepare-client-review'
      },
      'step5': {
        next: 'deploy',
        next_action: 'Deploy to Netlify and set up CMS',
        mcp: 'deploy-website'
      }
    };

    const nextStepInfo = nextSteps[step];

    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-approve-website-step';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      step_approved: step,
      approved_status: approvedStatus,
      next_step: nextStepInfo.next,
      next_action: nextStepInfo.next_action,
      next_mcp: nextStepInfo.mcp,
      message: `Step ${step} approved for ${profile.business_name}. Ready to proceed to ${nextStepInfo.next_action}.`,
      can_proceed: true
    };
  }
};

