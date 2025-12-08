# DIRECTIVE: Create and Send Proposal

## 1. GOAL
Create a professional proposal from template, customize with client details, and send via PandaDoc for signature.

## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. **Check for profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load client info from profile
3. **If profile doesn't exist**: 
   - Read intake file: `clients/{client-name}/01_intake/*.txt`
   - Read deliverables: `clients/{client-name}/05_deliverables/*.md` (if exists)
   - Create profile if needed

### Required Inputs
- **Client Name**: From user request
- **Proposal Template**: `company/proposals/Proposal template.pdf` or Gamma template
- **Client Details**: From profile or intake file
- **Services/Scope**: From user request or deliverables folder
- **Pricing**: From user request or pricing guide

### Content Sources
- `clients/{client-name}/01_intake/*.txt` - Client information
- `clients/{client-name}/05_deliverables/*.md` - Existing deliverables (for reference)
- `clients/{client-name}/client-profile.json` - Client variations and info
- `company/sales/PRICING_AND_SERVICES.md` - Pricing structure

## 3. PROCESS

### Phase 1: Gather Client Information
1. **Load client profile** (if exists)
   - Use MCP: `load-client-profile` with `{ client_name: "{client-name}" }`
   - Extract: Business name, contact info, services needed

2. **Read intake file**
   - Location: `clients/{client-name}/01_intake/*.txt`
   - Extract: Business details, pain points, requirements

3. **Check for existing deliverables**
   - Location: `clients/{client-name}/05_deliverables/`
   - Review: What's already been created (for proposal context)

4. **Get proposal details from user**
   - Services to include
   - Pricing
   - Timeline
   - Custom requirements

### Phase 2: Create Proposal
1. **Choose template**
   - Default: `company/proposals/Proposal template.pdf`
   - Alternative: Gamma template (if user prefers)
   - Use MCP: `create-proposal-from-template` (if exists)

2. **Customize proposal**
   - Replace placeholders with client info
   - Add services and pricing
   - Add timeline
   - Add deliverables
   - Use client's brand colors/style (from profile)

3. **Generate PDF**
   - Create PDF from template
   - Save to: `clients/{client-name}/05_deliverables/proposal-{date}.pdf`
   - Use MCP: `generate-proposal-pdf` (if exists)

### Phase 3: Send via PandaDoc
1. **Upload to PandaDoc**
   - Upload PDF to PandaDoc
   - Set up signature fields
   - Configure email delivery
   - Use MCP: `upload-to-pandadoc` (if exists)

2. **Send for signature**
   - Add recipient email (from profile or intake)
   - Set expiration date (30 days default)
   - Send proposal
   - Track in client folder

3. **Update client profile**
   - Add proposal status to profile
   - Use MCP: `create-or-update-client-profile`
   - Status: `automations.proposal.status: "sent"`
   - Include: Proposal date, PandaDoc link, expiration date

### Phase 4: Documentation
1. **Create proposal record**
   - File: `clients/{client-name}/05_deliverables/proposal-{date}.md`
   - Include: Services, pricing, timeline, status
   - Include: PandaDoc link, sent date, expiration

2. **Update portal** (if applicable)
   - Add proposal to Base44 portal
   - Use MCP: `update-base44-portal` (if exists)

## 4. OUTPUTS
- Proposal PDF: `clients/{client-name}/05_deliverables/proposal-{date}.pdf`
- Proposal record: `clients/{client-name}/05_deliverables/proposal-{date}.md`
- PandaDoc link: For tracking signatures
- Client profile updated: Proposal status added
- Portal updated: Proposal visible in client portal (if applicable)

## 5. EXECUTION (MCPs to Use)

### Client Profile MCPs
- `load-client-profile` - Loads client info
- `create-or-update-client-profile` - Updates profile with proposal status

### Proposal MCPs
- `create-proposal-from-template` - Creates proposal from template
- `generate-proposal-pdf` - Generates PDF from proposal
- `upload-to-pandadoc` - Uploads to PandaDoc and sends

### Portal MCPs
- `update-base44-portal` - Updates portal with proposal info

## 6. EDGE CASES
- **No client profile**: Read from intake file, create profile after
- **No template**: Ask user which template to use, or create custom
- **PandaDoc not set up**: Create PDF, user uploads manually
- **Client email unknown**: Ask user for email address
- **Custom pricing**: Get pricing from user, document in proposal
- **Multiple services**: Include all services in one proposal or separate
- **Urgent proposal**: Prioritize, skip non-essential steps

## 7. LEARNINGS & PROFILE UPDATES

### After Completing:
1. **Update client profile** with proposal status
2. **Document** what worked, what didn't
3. **Note** if client has specific proposal preferences

### General Learnings:
- Always check for existing deliverables (may inform proposal)
- Use client profile for consistent branding
- Document proposal in client folder for reference
- Track proposal status in profile for future reference

---
**Last Updated:** December 7, 2024
**Status:** Active
**Created By:** AI Assistant

