# DIRECTIVE: Setup Client Onboarding Automation

## 1. GOAL
Automate client onboarding process: Contract signed → Base44 portal created → Welcome sequence → Document collection → Task reminders

## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. **Check for profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load variations from profile (CRM, email, design style)
3. **If profile doesn't exist**: 
   - Read intake file for client info
   - Create profile if needed

### Required Inputs
- **Client Name**: From user request (for new client onboarding)
- **Client Folder**: `clients/{client-name}/04_automation/`
- **Contract Source**: Signed contract (PDF or e-signature platform)
- **Client Info**: From profile (preferred) or `clients/{client-name}/01_intake/*.txt`
- **Tech Stack**: From client profile (or defaults):
  - Base44 - Client portal
  - CRM: From profile (Airtable, HubSpot, Salesforce, etc.)
  - Email: From profile (Brevo, Gmail, Outlook, etc.)
  - n8n - Workflow automation
  - E-signature platform (if applicable)

## 3. PROCESS

### Phase 1: Base44 Portal Setup
1. **Create client portal**
   - Portal name: "{Client Name} - Client Portal"
   - Configure: Branding, access settings, folder structure
   - Create folders: Documents, Resources, Deliverables, Communication
   - Use script: `execution/create-base44-portal.py` (if exists)
   - Note: May need to do this manually via Base44 interface

2. **Setup portal structure**
   - Welcome packet folder
   - Onboarding checklist
   - Document request templates
   - Resource library
   - Use script: `execution/setup-portal-structure.py` (if exists)

### Phase 2: CRM Setup (from profile)
1. **Load client profile**
   - Use MCP: `load-client-profile` with `{ client_name: "{client-name}" }`
   - Extract: CRM type from profile

2. **Setup CRM** (based on profile)
   - **If profile shows Airtable**: Create onboarding tracking base
   - **If profile shows HubSpot**: Use HubSpot for onboarding tracking
   - **If profile shows Salesforce**: Use Salesforce for onboarding tracking
   - Use MCP: `setup-onboarding-crm` with CRM type from profile
   - Tables/Fields: Clients, Tasks, Documents, Communications (adapted for CRM type)

2. **Create onboarding checklist template**
   - Standard tasks: Welcome email sent, Portal access granted, Documents requested, etc.
   - Customize based on client type/service
   - Use script: `execution/create-checklist-template.py` (if exists)

### Phase 3: Email Sequence Setup (from profile)
1. **Determine email provider** (from profile)
   - **If profile shows Brevo**: Create Brevo email templates
   - **If profile shows Gmail**: Configure Gmail for email sequences
   - **If profile shows Outlook**: Configure Outlook for email sequences
   - Use MCP: `setup-onboarding-emails` with provider from profile

2. **Create email templates**
   - Welcome email (immediate)
   - Portal access email (with login instructions)
   - Document request email (with checklist)
   - Reminder emails (for incomplete tasks)
   - Personalize with client name and service details

3. **Configure email sequence**
   - Welcome → Portal Access → Document Request → Reminders
   - Set delays between emails
   - Use design style from profile (modern-bright vs dark-luxury)

### Phase 4: n8n Workflow Creation
1. **Create workflow file**
   - Location: `clients/{client-name}/04_automation/workflows/onboarding-workflow.json`
   - Template: `automations/workflows/onboarding-template.json` (if exists)
   - Use script: `execution/create-onboarding-workflow.py` (if exists)

2. **Configure workflow steps**:
   - **Trigger**: Contract signed (e-signature webhook or manual trigger)
   - **Step 1**: Create Base44 portal
   - **Step 2**: Add client to Airtable (Clients table)
   - **Step 3**: Create onboarding tasks in Airtable
   - **Step 4**: Send welcome email (Brevo)
   - **Step 5**: Send portal access email (Brevo)
   - **Step 6**: Schedule document request email (Brevo - 1 day delay)
   - **Step 7**: Set up task reminders (n8n schedule)
   - Use script: `execution/configure-onboarding-workflow.py` (if exists)

3. **Deploy and test workflow**
   - Import to n8n
   - Configure credentials
   - Test with sample client
   - Verify all steps execute correctly

### Phase 5: Documentation
1. **Create client documentation**
   - File: `clients/{client-name}/04_automation/docs/onboarding-README.md`
   - Include: How to trigger onboarding, what happens, how to access portal
   - Include: Troubleshooting guide, manual steps if needed

2. **Update Base44 portal**
   - Add onboarding automation info
   - Include: How it works, what to expect, support contact

## 4. OUTPUTS
- Complete onboarding automation in: `clients/{client-name}/04_automation/`
- Files:
  - `workflows/onboarding-workflow.json` - n8n workflow
  - `docs/onboarding-README.md` - Documentation
  - Portal structure configured in Base44
- Integrations:
  - Base44 portal created and configured
  - Airtable base with onboarding tracking
  - Brevo email sequences configured
  - n8n workflow deployed and active
- Deliverables:
  - Welcome packet (in portal)
  - Onboarding checklist (in portal and Airtable)
  - Document request templates

## 5. EXECUTION (MCPs to Use)

### Client Profile MCPs
- `load-client-profile` - Loads client variations
- `create-or-update-client-profile` - Updates profile with onboarding status

### Portal MCPs
- `create-base44-portal` - Creates Base44 portal
- `setup-portal-structure` - Sets up portal folders and structure

### CRM MCPs (from profile)
- `setup-onboarding-crm` - Sets up CRM for onboarding (Airtable, HubSpot, Salesforce - from profile)

### Email MCPs (from profile)
- `setup-onboarding-emails` - Sets up email templates (Brevo, Gmail, Outlook - from profile)

### Workflow MCPs
- `create-onboarding-workflow` - Creates n8n workflow
- `configure-onboarding-workflow` - Configures workflow steps

### Documentation MCPs
- `create-checklist-template` - Creates onboarding checklist
- `update-base44-portal` - Updates portal with onboarding info

## 6. EDGE CASES
- **Client already has portal**: Use existing portal, add onboarding structure
- **Contract not signed yet**: Can set up automation, trigger manually when ready
- **E-signature platform integration**: May need to configure webhook from e-signature platform
- **Multiple clients onboarding**: Workflow should handle multiple simultaneous onboardings
- **Portal creation fails**: Have manual process as backup
- **Email delivery issues**: Check Brevo API limits, sender verification
- **Task reminders**: Configure appropriate delay (e.g., 3 days, 7 days)

## 7. LEARNINGS & PROFILE UPDATES

### After Completing This Automation:
1. **Update client profile** with onboarding status:
   - Use MCP: `create-or-update-client-profile`
   - Add: `automations.onboarding.status: "active"`
   - Add: `automations.onboarding.crm: "{crm_type}"` (from profile)
   - Add: `automations.onboarding.email: "{email_provider}"` (from profile)

2. **Update portal** with onboarding information:
   - Use MCP: `update-base44-portal`
   - Include: Portal access, onboarding status, checklist

### General Learnings:
- Always check client profile first (variations already detected)
- Use profile for CRM and email (consistency)
- Profile carries variations through all automations
- Always test workflow end-to-end before going live
- Base44 portal creation may need manual steps (API limitations)
- Onboarding checklist should be customizable per client type
- Email sequences should be spaced appropriately (immediate, 1 day, 3 days, etc.)
- Document request automation should be clear and easy for clients
- Task reminders help ensure nothing falls through cracks
- Portal structure should be intuitive for clients

---
**Last Updated:** December 7, 2024
**Status:** Draft - For Review
**Created By:** AI Assistant (based on QUICK_STARTS.md and onboarding best practices)

