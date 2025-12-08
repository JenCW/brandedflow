# DIRECTIVE: Setup Lead Magnet + Delivery System

## 1. GOAL
Set up complete lead magnet automation: Landing page → Form → CRM → PDF delivery → Email sequence (3-email nurture)

## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. **Check for profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load variations from profile (CRM, email, design style)
3. **If profile doesn't exist**: 
   - Read intake file for client info
   - Create profile if needed

### Required Inputs
- **Client Name**: From user request
- **Client Folder**: `clients/{client-name}/04_automation/`
- **Lead Magnet Content**: 
  - Source: `clients/{client-name}/01_intake/*.txt` (business info, target audience)
  - Output: PDF file (8-12 pages)
- **Email Sequence**: 3-email nurture sequence content
- **Tech Stack**: From client profile (or defaults):
  - Landing page: Netlify (static HTML) or Gamma (from profile)
  - Forms: Netlify Forms (default)
  - CRM: From profile (Airtable, HubSpot, Salesforce, etc.)
  - Email: From profile (Brevo, Gmail, Outlook, etc.)
  - Delivery: Automated via n8n workflow

## 3. PROCESS

### Phase 1: Load Profile & Setup Infrastructure
1. **Load client profile**
   - Use MCP: `load-client-profile` with `{ client_name: "{client-name}" }`
   - Extract: CRM type, email provider, design style from profile

2. **Create client automation folder**
   - Location: `clients/{client-name}/04_automation/`
   - Create subfolders: `workflows/`, `assets/`, `docs/`
   - Use MCP: `create-client-folder` (if folder doesn't exist)

3. **Setup CRM** (based on profile)
   - **If profile shows Airtable**: Create new Airtable base
   - **If profile shows existing CRM** (HubSpot, Salesforce): Integrate with existing CRM
   - **If profile shows no CRM**: Create Airtable (default)
   - Use MCP: `setup-crm-base` with CRM type from profile
   - Tables: Leads, Email Sequences, Lead Magnets

4. **Setup Email** (based on profile)
   - **If profile shows Brevo**: Setup Brevo account
   - **If profile shows Gmail**: Configure Gmail integration
   - **If profile shows Outlook**: Configure Outlook integration
   - Use MCP: `setup-email-provider` with provider from profile
   - Create list: "{Client Name} - Lead Magnet Subscribers"
   - Create email templates: Welcome, Nurture 1, Nurture 2, Nurture 3

### Phase 2: Lead Magnet Creation
1. **Generate PDF content**
   - Read: `clients/{client-name}/01_intake/*.txt` (business info, services)
   - Research: Audience pain points, lead magnet topic validation
   - Create: 8-12 page PDF lead magnet
   - Save: `clients/{client-name}/04_automation/assets/lead-magnet.pdf`
   - Use script: `execution/generate-lead-magnet-pdf.py` (if exists)
   - Note: May need to create manually if script doesn't exist

2. **Create landing page**
   - Template: Use AQ Remodeling website structure or create new
   - Customize: Client name, lead magnet title, value proposition, form
   - Deploy: Netlify (static HTML) or Gamma (if preferred)
   - Location: `clients/{client-name}/04_automation/landing-page/` or separate website folder
   - Use script: `execution/create-lead-magnet-landing.py` (if exists)

### Phase 3: Build n8n Workflow
1. **Create workflow file**
   - Location: `clients/{client-name}/04_automation/workflows/lead-magnet-workflow.json`
   - Template: `automations/workflows/lead-magnet-template.json` (if exists)
   - Use script: `execution/create-n8n-workflow.py` (if exists)

2. **Configure workflow steps**:
   - **Trigger**: Form submission (Netlify/Typeform webhook)
   - **Step 1**: Add to Airtable (Leads table)
   - **Step 2**: Send PDF via email (attachment or download link)
   - **Step 3**: Add to Brevo list
   - **Step 4**: Trigger welcome email (Brevo - immediate)
   - **Step 5**: Schedule Nurture 1 (Brevo - 3 days delay)
   - **Step 6**: Schedule Nurture 2 (Brevo - 7 days delay)
   - **Step 7**: Schedule Nurture 3 (Brevo - 14 days delay)
   - Use script: `execution/configure-n8n-workflow.py` (if exists)

3. **Deploy workflow to n8n**
   - Import workflow JSON to n8n
   - Configure credentials (Airtable API, Brevo API, webhook URLs)
   - Activate workflow
   - Test with sample submission

4. **Test workflow end-to-end**
   - Submit test form
   - Verify: Airtable entry created
   - Verify: PDF delivered via email
   - Verify: Added to Brevo list
   - Verify: Welcome email sent
   - Verify: Nurture sequence scheduled
   - Use script: `execution/test-lead-magnet-workflow.py` (if exists)

### Phase 4: Documentation & Delivery
1. **Create client documentation**
   - File: `clients/{client-name}/04_automation/docs/README.md`
   - Include: How it works, how to access, how to update, API keys needed
   - Include: Workflow diagram, troubleshooting guide
   - Use script: `execution/generate-automation-docs.py` (if exists)

2. **Update Base44 portal**
   - Add automation to client portal
   - Include: Access links, documentation, metrics dashboard
   - Include: How to view leads, email performance
   - Use script: `execution/update-base44-portal.py` (if exists)

## 4. OUTPUTS
- Complete automation in: `clients/{client-name}/04_automation/`
- Files:
  - `assets/lead-magnet.pdf` - The PDF lead magnet
  - `workflows/lead-magnet-workflow.json` - n8n workflow
  - `landing-page/` - Landing page files (or link to Gamma)
  - `docs/README.md` - Client documentation
- Integrations:
  - Airtable base configured with Leads table
  - Brevo account configured with list and email templates
  - n8n workflow deployed and active
  - Base44 portal updated with automation info
- Documentation:
  - How it works
  - How to access metrics
  - How to update content
  - Troubleshooting guide

## 5. EXECUTION (MCPs to Use)

### Client Profile MCPs
- `load-client-profile` - Loads client variations
- `create-or-update-client-profile` - Updates profile with automation status

### Infrastructure MCPs
- `create-client-folder` - Creates folder structure
- `setup-crm-base` - Sets up CRM (Airtable, HubSpot, Salesforce - from profile)
- `setup-email-provider` - Sets up email (Brevo, Gmail, Outlook - from profile)

### Lead Magnet MCPs
- `generate-lead-magnet-pdf` - Creates PDF from content
- `create-lead-magnet-landing` - Creates landing page (Netlify or Gamma - from profile)
- `create-n8n-workflow` - Creates n8n workflow from template
- `configure-n8n-workflow` - Configures workflow with client-specific settings
- `test-lead-magnet-workflow` - Tests the complete flow

### Documentation MCPs
- `generate-automation-docs` - Creates client documentation
- `update-base44-portal` - Updates Base44 with automation info

## 6. EDGE CASES & VARIATIONS

### CRM Variations (from profile)
- **Profile shows HubSpot**: Integrate with existing HubSpot, don't create Airtable
- **Profile shows Salesforce**: Integrate with existing Salesforce, don't create Airtable
- **Profile shows Airtable**: Create new Airtable base (default)
- **Profile shows no CRM**: Create Airtable base

### Email Variations (from profile)
- **Profile shows Gmail**: Configure Gmail integration, not Brevo
- **Profile shows Outlook**: Configure Outlook integration, not Brevo
- **Profile shows Brevo**: Setup Brevo account (default)

### Design Style Variations (from profile)
- **Profile shows modern-bright**: Use modern, bright landing page design
- **Profile shows dark-luxury**: Use dark, luxury landing page design
- **Profile shows custom**: Ask for specific design requirements

### Standard Edge Cases
- **PDF generation fails**: Use template, note manual creation needed
- **n8n workflow errors**: Check API keys, webhook URLs, test each step individually
- **Form integration issues**: Verify Netlify Forms webhook setup
- **Email delivery fails**: Check API limits, sender verification
- **Client doesn't have API keys**: Document what's needed, pause until provided
- **Landing page preference**: Use profile preference (Netlify or Gamma)

## 7. LEARNINGS & PROFILE UPDATES

### After Completing This Automation:
1. **Update client profile** with Lead Magnet status:
   - Use MCP: `create-or-update-client-profile`
   - Add: `automations.lead_magnet.status: "active"`
   - Add: `automations.lead_magnet.crm: "{crm_type}"` (from profile)
   - Add: `automations.lead_magnet.email: "{email_provider}"` (from profile)

2. **Update portal** with Lead Magnet information:
   - Use MCP: `update-base44-portal`
   - Include: Automation status, access links, metrics

### General Learnings:
- Always check client profile first (variations already detected)
- Use profile for CRM and email (consistency)
- Profile carries variations through all automations
- Always test workflow end-to-end before delivery
- Keep n8n workflow templates in `automations/workflows/` for reuse
- PDF generation works best with client-specific content from intake
- Always document API keys and credentials securely (never commit to git)
- Base44 portal must be updated for client access
- Email sequences should be spaced: Welcome (immediate), Nurture 1 (3 days), Nurture 2 (7 days), Nurture 3 (14 days)
- Lead scoring can be added later as enhancement

---
**Last Updated:** December 7, 2024
**Status:** Draft - For Review
**Created By:** AI Assistant (based on QUICK_STARTS.md and automation best practices)

