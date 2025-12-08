# DIRECTIVE: Setup Email Marketing System

## 1. GOAL
Set up complete email marketing system: Brevo platform setup → Email templates → Welcome sequence → Monthly newsletter → Subscriber management

## 2. INPUTS
- **Client Name**: From user request
- **Client Folder**: `clients/{client-name}/04_automation/`
- **Client Info**: From `clients/{client-name}/01_intake/*.txt` and `02_brand/*.txt`
- **Email Content**: Welcome sequence content, newsletter template content
- **Tech Stack**:
  - Brevo - Email marketing platform
  - Airtable - Subscriber management (optional)
  - n8n - Automation workflows (optional)

## 3. PROCESS

### Phase 1: Brevo Account Setup
1. **Create Brevo account or use existing**
   - Verify: Client has Brevo account or needs one created
   - Configure: Sender information, domain verification (if needed)
   - Create list: "{Client Name} - Email Subscribers"
   - Use script: `execution/setup-brevo-account.py` (if exists)
   - Note: Client may need to provide Brevo API key

2. **Configure sender settings**
   - Sender name: Client business name
   - Sender email: Client email address
   - Reply-to: Client email address
   - Verify domain (if required by Brevo)

### Phase 2: Email Template Creation
1. **Create welcome sequence templates (3-5 emails)**
   - Email 1: Welcome (immediate)
   - Email 2: Introduction to services (1 day delay)
   - Email 3: Value proposition (3 days delay)
   - Email 4: Social proof/testimonials (5 days delay)
   - Email 5: Call to action (7 days delay)
   - Customize: Client name, services, brand colors, tone
   - Use script: `execution/create-email-templates.py` (if exists)

2. **Create monthly newsletter template**
   - Structure: Header, Featured content, Updates, CTA, Footer
   - Customize: Client branding, content sections
   - Make it reusable for monthly sends
   - Use script: `execution/create-newsletter-template.py` (if exists)

3. **Create additional templates (5 total)**
   - Promotional email template
   - Announcement email template
   - Educational/content email template
   - Re-engagement email template
   - Customize all with client branding

### Phase 3: Automation Setup
1. **Create welcome sequence automation**
   - Trigger: New subscriber added to list
   - Sequence: Send welcome emails with delays
   - Configure in Brevo automation or n8n workflow
   - Use script: `execution/create-welcome-automation.py` (if exists)

2. **Create monthly newsletter automation**
   - Schedule: Monthly (e.g., first Tuesday of month)
   - Process: Send newsletter template to all subscribers
   - Configure in Brevo or n8n
   - Use script: `execution/create-newsletter-automation.py` (if exists)

3. **Create engagement tracking**
   - Track: Opens, clicks, unsubscribes
   - Set up: Re-engagement campaigns for inactive subscribers
   - Configure in Brevo

### Phase 4: Subscriber Management
1. **Setup Airtable integration (optional)**
   - Sync subscribers between Brevo and Airtable
   - Track: Subscriber status, engagement metrics, tags
   - Use script: `execution/setup-subscriber-sync.py` (if exists)

2. **Create subscriber import process**
   - Document: How to import existing subscribers
   - Format: CSV with Name, Email, Tags
   - Process: Import to Brevo list

### Phase 5: Documentation & Training
1. **Create client documentation**
   - File: `clients/{client-name}/04_automation/docs/email-marketing-README.md`
   - Include: How to access Brevo, how to send emails, how to view metrics
   - Include: Template customization guide, subscriber management
   - Include: Best practices, sending guidelines

2. **Create training materials**
   - Video walkthrough (if possible)
   - Step-by-step guide for common tasks
   - Troubleshooting guide

## 4. OUTPUTS
- Complete email marketing system in: `clients/{client-name}/04_automation/`
- Files:
  - `docs/email-marketing-README.md` - Documentation
  - Email templates configured in Brevo
- Integrations:
  - Brevo account configured with lists and templates
  - Welcome sequence automation active
  - Monthly newsletter automation scheduled
  - Airtable integration (if configured)
- Deliverables:
  - 5 email templates (welcome sequence + newsletter)
  - Automation workflows
  - Subscriber management system
  - Documentation and training

## 5. EXECUTION SCRIPTS
- `execution/setup-brevo-account.py` - Creates Brevo account/list
- `execution/create-email-templates.py` - Creates email templates
- `execution/create-newsletter-template.py` - Creates newsletter template
- `execution/create-welcome-automation.py` - Creates welcome sequence
- `execution/create-newsletter-automation.py` - Creates monthly newsletter automation
- `execution/setup-subscriber-sync.py` - Syncs Brevo with Airtable

## 6. EDGE CASES
- **Client already has Brevo**: Use existing account, create new list
- **No existing subscribers**: Document import process for future
- **Domain verification required**: Client needs to verify domain in Brevo
- **Email deliverability**: Ensure sender reputation is good, use SPF/DKIM
- **Template customization**: Templates should be easy to update
- **Unsubscribe compliance**: Ensure unsubscribe links are in all emails
- **Monthly newsletter content**: Client needs to provide content monthly (or managed service)

## 7. LEARNINGS
- Welcome sequences should be spaced: Immediate, 1 day, 3 days, 5 days, 7 days
- Email templates should be mobile-responsive
- Always include unsubscribe link for compliance
- Track engagement metrics to optimize sequences
- Monthly newsletter should be consistent in format
- Subscriber management is critical - keep list clean
- Email deliverability depends on sender reputation

---
**Last Updated:** December 7, 2024
**Status:** Draft - For Review
**Created By:** AI Assistant (based on QUICK_STARTS.md and email marketing best practices)

