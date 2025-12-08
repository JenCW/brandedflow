# DIRECTIVE: Setup AI Receptionist (iAnswering.ai)

## 1. GOAL
Set up iAnswering.ai AI receptionist for a client: Account configuration, custom call scripts, lead qualification flows, appointment booking integration, call transcription delivery.

## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. **Check for profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load variations from profile
3. **If profile doesn't exist**: 
   - Read intake file for client info
   - Create profile if needed

### Required Inputs
- **Client Name**: From user request
- **Client Info**: From profile or intake file
- **Business Type**: For call script customization
- **Qualification Criteria**: What makes a good lead
- **CRM Integration**: From profile (Airtable, HubSpot, Salesforce, etc.)
- **Appointment System**: If applicable (Google Calendar, Calendly, etc.)

### Content Sources
- `clients/{client-name}/client-profile.json` - Client variations (CRM, email, etc.)
- `clients/{client-name}/01_intake/*.txt` - Business info, services
- iAnswering.ai account access (partnership)

## 3. PROCESS

### Phase 1: iAnswering.ai Account Setup
1. **Create/access iAnswering.ai account**
   - Use partnership account access
   - Create sub-account for client (if needed)
   - Configure basic settings
   - Use MCP: `setup-ianswering-account` (if exists)

2. **Configure phone number**
   - Assign phone number to client
   - Set up call routing
   - Configure business hours (if applicable)

### Phase 2: Custom Call Scripts
1. **Create call script**
   - Read client intake: Business type, services, target market
   - Create script: Greeting, qualification questions, responses
   - Customize for client's tone (from brand file or profile)
   - Use MCP: `create-call-script` (if exists)

2. **Configure qualification flows**
   - Define: What makes a qualified lead
   - Set up: Qualification questions
   - Configure: Routing based on qualification
   - Use MCP: `configure-qualification-flow` (if exists)

3. **Set up appointment booking** (if applicable)
   - Integrate: Google Calendar, Calendly, or other
   - Configure: Available time slots
   - Set up: Confirmation process
   - Use MCP: `setup-appointment-booking` (if exists)

### Phase 3: CRM Integration
1. **Connect to CRM** (from client profile)
   - **If Airtable**: Set up Airtable integration
   - **If HubSpot**: Set up HubSpot integration
   - **If Salesforce**: Set up Salesforce integration
   - Use MCP: `connect-ianswering-to-crm` with CRM type from profile

2. **Configure data flow**
   - Call → Lead created in CRM
   - Qualification status → Updated in CRM
   - Appointment → Added to calendar/CRM
   - Use MCP: `configure-crm-data-flow` (if exists)

### Phase 4: Call Transcription & Delivery
1. **Set up transcription delivery**
   - Configure: Email delivery (to client or team)
   - Configure: SMS delivery (if preferred)
   - Set up: n8n workflow for transcription processing
   - Use MCP: `setup-transcription-delivery` (if exists)

2. **Configure notifications**
   - Set up: Real-time notifications for calls
   - Configure: Who gets notified (from client profile)
   - Set up: Notification method (email, SMS, Slack, etc.)

### Phase 5: Testing & Documentation
1. **Test the system**
   - Make test call
   - Verify: Script works, qualification flows work
   - Verify: CRM integration works
   - Verify: Transcription delivery works
   - Use MCP: `test-ianswering-setup` (if exists)

2. **Create client documentation**
   - File: `clients/{client-name}/04_automation/docs/ai-receptionist-README.md`
   - Include: How to access iAnswering.ai, how it works, how to update scripts
   - Include: CRM integration details, notification settings
   - Use MCP: `generate-automation-docs` (if exists)

3. **Update client profile**
   - Add: iAnswering.ai status
   - Add: Phone number, account details
   - Use MCP: `create-or-update-client-profile`

4. **Update portal**
   - Add: iAnswering.ai information to Base44 portal
   - Include: Access details, call logs, settings
   - Use MCP: `update-base44-portal` (if exists)

## 4. OUTPUTS
- Complete AI receptionist setup in: `clients/{client-name}/04_automation/`
- Files:
  - `docs/ai-receptionist-README.md` - Client documentation
  - `config/ianswering-settings.json` - Configuration (if applicable)
- Integrations:
  - iAnswering.ai account configured
  - CRM connected (from client profile)
  - Call scripts customized
  - Qualification flows configured
  - Appointment booking set up (if applicable)
  - Transcription delivery configured
- Client Profile Updated:
  - `automations.ai_receptionist.status: "active"`
  - `automations.ai_receptionist.phone_number: "{number}"`
  - Portal updated with iAnswering.ai info

## 5. EXECUTION (MCPs to Use)

### Client Profile MCPs
- `load-client-profile` - Loads client variations
- `create-or-update-client-profile` - Updates profile with iAnswering.ai status

### iAnswering.ai MCPs
- `setup-ianswering-account` - Creates/configures iAnswering.ai account
- `create-call-script` - Creates custom call script
- `configure-qualification-flow` - Sets up qualification questions
- `setup-appointment-booking` - Configures appointment integration
- `connect-ianswering-to-crm` - Connects to client's CRM (from profile)
- `setup-transcription-delivery` - Configures transcription delivery
- `test-ianswering-setup` - Tests the complete setup

### Documentation MCPs
- `generate-automation-docs` - Creates client documentation
- `update-base44-portal` - Updates portal with iAnswering.ai info

## 6. EDGE CASES
- **Client already has phone system**: Integrate iAnswering.ai, don't replace
- **No appointment system**: Skip appointment booking, focus on lead qualification
- **Different CRM than profile**: Use profile CRM, or ask if they want to switch
- **Multiple phone numbers**: Configure routing for each number
- **Business hours**: Configure availability if client has specific hours
- **Partnership access**: Ensure iAnswering.ai partnership account is accessible

## 7. LEARNINGS & PROFILE UPDATES

### After Completing:
1. **Update client profile** with iAnswering.ai status
2. **Document** call script effectiveness
3. **Note** qualification criteria that work best
4. **Update** portal with call logs and metrics

### General Learnings:
- Always use client profile for CRM integration (consistency)
- Customize call scripts for client's industry and tone
- Test thoroughly before going live
- Document everything for client reference
- Update profile so future automations know iAnswering.ai is active

---
**Last Updated:** December 7, 2024
**Status:** Active
**Created By:** AI Assistant

