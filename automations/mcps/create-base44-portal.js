/**
 * Create Base44 Portal
 * Creates a new Base44 client portal with OAuth setup and current pricing/services
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates a new Base44 client portal, sets up OAuth access, and configures with current pricing/services',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    portal_name: {
      type: 'string',
      required: false,
      description: 'Custom portal name (defaults to business name)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, portal_name } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Check for Base44 API key
    const base44ApiKey = process.env.BASE44_API_KEY;
    if (!base44ApiKey) {
      return {
        success: true,
        skipped: true,
        message: 'Base44 API key not configured. Skipping portal creation. Add BASE44_API_KEY to .env to enable.',
        client_name
      };
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    let profile = {};
    
    if (await fs.pathExists(profilePath)) {
      profile = await fs.readJson(profilePath);
    } else {
      return {
        success: false,
        error: 'Client profile not found. Run process-client-intake first.',
        client_name
      };
    }

    const businessName = profile.business_name || client_name.split('-').map(w => 
      w.charAt(0).toUpperCase() + w.slice(1)
    ).join(' ');
    const portalDisplayName = portal_name || `${businessName} - Client Portal`;

    // Load current pricing/services from company docs
    const pricingPath = path.join(PROJECT_ROOT, 'company', 'sales', 'PRICING_AND_SERVICES.md');
    let pricingInfo = {
      last_updated: null,
      services: [],
      pricing_summary: 'Current pricing and services available upon request.'
    };
    
    if (await fs.pathExists(pricingPath)) {
      const pricingContent = await fs.readFile(pricingPath, 'utf-8');
      // Extract last updated date
      const lastUpdatedMatch = pricingContent.match(/\*\*Last Updated:\*\* (.+)/);
      if (lastUpdatedMatch) {
        pricingInfo.last_updated = lastUpdatedMatch[1];
      }
      // Extract pricing summary section
      const pricingSummaryMatch = pricingContent.match(/## Pricing Summary([\s\S]*?)(?=---|$)/);
      if (pricingSummaryMatch) {
        pricingInfo.pricing_summary = pricingSummaryMatch[1].trim();
      }
      // Store full content reference
      pricingInfo.full_content_path = pricingPath;
    }

    // Check if portal already exists
    if (profile.client_specific_ids?.base44_portal_id) {
      return {
        success: true,
        skipped: true,
        message: `Client already has a Base44 portal: ${profile.client_specific_ids.base44_portal_id}`,
        client_name,
        portal_id: profile.client_specific_ids.base44_portal_id,
        portal_name: profile.client_specific_ids.base44_portal_name
      };
    }

    // Base44 Workflow:
    // 1. Add client in Base44 admin panel
    // 2. Base44 automatically sends OAuth sign-on link to client
    // 3. Client signs in via OAuth
    // 4. Client gets their own portal access
    
    // TODO: If Base44 has API for client creation:
    // Base44 API: https://api.base44.com/v1/clients (or similar)
    // Method: POST
    // Headers: { 'Authorization': `Bearer ${base44ApiKey}`, 'Content-Type': 'application/json' }
    // Body: {
    //   name: businessName,
    //   email: profile.contact_email,
    //   client_name: client_name,
    //   ...
    // }
    // Base44 will automatically send OAuth sign-on email to client
    
    // For now, create a reminder file for manual setup in Base44 admin

    // Create reminder file for Base44 admin setup
    const reminderContent = `# Base44 Client Setup Reminder

**Client:** ${businessName}
**Client Name (slug):** ${client_name}
**Contact Email:** ${profile.contact_email || 'Not provided'}

## Action Required

1. Go to Base44 Admin Panel
2. Add new client:
   - Name: ${businessName}
   - Email: ${profile.contact_email || '[TO BE FILLED]'}
   - Client Slug: ${client_name}
3. Base44 will automatically send OAuth sign-on link to client
4. Client signs in via OAuth and gets their portal access

## Client Information for Base44

- **Business Name:** ${businessName}
- **Industry:** ${profile.industry || 'Not specified'}
- **Services:** ${profile.services?.join(', ') || 'Not specified'}
- **Contact Email:** ${profile.contact_email || 'Not provided'}
- **Contact Phone:** ${profile.contact_phone || 'Not provided'}

## Portal Configuration

- **Portal Name:** ${portalDisplayName}
- **OAuth:** Enabled (Base44 handles automatically)
- **Pricing Info:** Current pricing from PRICING_AND_SERVICES.md
- **Services:** ${profile.services?.join(', ') || 'To be determined'}

## iAnswering.ai Status

${profile.automations?.ai_receptionist?.status 
  ? `- Status: ${profile.automations.ai_receptionist.status}\n- Phone: ${profile.automations.ai_receptionist.phone_number || 'Pending assignment'}`
  : '- Not set up yet'}

---

**Created:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Next:** Add client in Base44 admin panel → Base44 sends OAuth link automatically
`;

    const reminderPath = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables', 'base44-setup-reminder.md');
    await fs.ensureDir(path.dirname(reminderPath));
    await fs.writeFile(reminderPath, reminderContent);

    // Update client profile (portal ID will be added after you set it up in Base44 admin)
    if (!profile.client_specific_ids) {
      profile.client_specific_ids = {};
    }
    // Don't create placeholder ID - will be added when you set up in Base44 admin
    profile.client_specific_ids.base44_portal_name = portalDisplayName;
    profile.client_specific_ids.base44_setup_status = 'pending_admin_setup';
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-create-base44-portal';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      portal_name: portalDisplayName,
      reminder_file: reminderPath,
      message: `Base44 setup reminder created for ${client_name}. Add client in Base44 admin panel - Base44 will automatically send OAuth sign-on link.`,
      next_steps: [
        '1. Go to Base44 Admin Panel',
        '2. Add client: ' + businessName + (profile.contact_email ? ` (${profile.contact_email})` : ''),
        '3. Base44 automatically sends OAuth sign-on email to client',
        '4. Client signs in and gets their portal access',
        '5. Update client profile with portal ID after setup'
      ],
      important_note: 'Base44 handles OAuth automatically when you add client in admin panel. Each client gets their own isolated portal.'
    };
  }
};

