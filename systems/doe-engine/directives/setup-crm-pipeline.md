# DIRECTIVE: Setup CRM & Pipeline System

## 1. GOAL
Set up complete CRM system: Airtable base → Deal pipeline → Contact database → Reporting dashboard → Automation workflows

## 2. INPUTS
- **Client Name**: From user request
- **Client Folder**: `clients/{client-name}/04_automation/`
- **Sales Process**: From `clients/{client-name}/01_intake/*.txt` (sales process, stages)
- **Tech Stack**:
  - Airtable - CRM database
  - Base44 - Team access portal
  - n8n - Automation workflows (optional)
  - Brevo - Email integration (optional)

## 3. PROCESS

### Phase 1: Airtable Base Setup
1. **Create CRM base**
   - Base name: "{Client Name} - CRM"
   - Tables: Contacts, Deals, Companies, Activities, Notes
   - Use script: `execution/create-crm-base.py` (if exists)
   - Note: If client already has Airtable, use existing base

2. **Configure Contacts table**
   - Fields: Name, Email, Phone, Company, Status, Source, Created Date, Last Contact
   - Views: All Contacts, New Leads, Active Clients, Archived
   - Use script: `execution/setup-contacts-table.py` (if exists)

3. **Configure Deals table**
   - Fields: Deal Name, Contact, Company, Value, Stage, Probability, Close Date, Owner
   - Link to Contacts table
   - Use script: `execution/setup-deals-table.py` (if exists)

4. **Configure Companies table**
   - Fields: Company Name, Industry, Website, Employees, Contacts (linked)
   - Link to Contacts and Deals
   - Use script: `execution/setup-companies-table.py` (if exists)

### Phase 2: Pipeline Configuration
1. **Define pipeline stages**
   - Based on client sales process from intake
   - Common stages: Lead, Qualified, Proposal, Negotiation, Closed Won, Closed Lost
   - Customize based on client needs
   - Use script: `execution/configure-pipeline-stages.py` (if exists)

2. **Set up deal pipeline view**
   - Kanban view by stage
   - Filter by owner, date, value
   - Sort by close date, value
   - Use script: `execution/create-pipeline-view.py` (if exists)

3. **Configure deal value and probability**
   - Set default probability by stage
   - Calculate weighted pipeline value
   - Create formulas for forecasting

### Phase 3: Reporting Dashboard
1. **Create dashboard views**
   - Pipeline summary (total value, deals by stage)
   - Revenue forecast (weighted by probability)
   - Activity tracking (calls, emails, meetings)
   - Conversion metrics (lead to close rate)
   - Use script: `execution/create-dashboard-views.py` (if exists)

2. **Set up automated reports**
   - Weekly pipeline report
   - Monthly revenue forecast
   - Activity summary
   - Configure in Airtable or n8n
   - Use script: `execution/setup-automated-reports.py` (if exists)

### Phase 4: Automation Setup
1. **Lead capture automation**
   - Trigger: Form submission or manual entry
   - Action: Create contact in Airtable, assign owner, send notification
   - Configure in n8n or Airtable automation
   - Use script: `execution/create-lead-capture-automation.py` (if exists)

2. **Stage progression reminders**
   - Trigger: Deal in stage for X days
   - Action: Send reminder email to owner
   - Configure in n8n
   - Use script: `execution/create-stage-reminders.py` (if exists)

3. **Weekly pipeline reports**
   - Trigger: Every Monday
   - Action: Generate report, email to team
   - Configure in n8n
   - Use script: `execution/create-weekly-reports.py` (if exists)

### Phase 5: Base44 Portal Integration
1. **Create team portal**
   - Portal: "{Client Name} - CRM Access"
   - Access: Team members, read/write permissions
   - Link: Airtable base embedded or linked
   - Use script: `execution/create-crm-portal.py` (if exists)

2. **Configure portal views**
   - Dashboard access
   - Pipeline view
   - Contact search
   - Report access

### Phase 6: Documentation
1. **Create client documentation**
   - File: `clients/{client-name}/04_automation/docs/crm-README.md`
   - Include: How to access CRM, how to add contacts, how to manage deals
   - Include: Pipeline stages explained, reporting guide
   - Include: Automation workflows, troubleshooting

2. **Create training materials**
   - Video walkthrough (if possible)
   - Step-by-step guides for common tasks
   - Best practices guide

## 4. OUTPUTS
- Complete CRM system in: `clients/{client-name}/04_automation/`
- Files:
  - `docs/crm-README.md` - Documentation
  - Airtable base configured
- Integrations:
  - Airtable CRM base with all tables
  - Pipeline configured with stages
  - Reporting dashboard created
  - Automation workflows active
  - Base44 portal for team access
- Deliverables:
  - Contacts database
  - Deal pipeline
  - Reporting dashboard
  - Automation workflows
  - Documentation and training

## 5. EXECUTION SCRIPTS
- `execution/create-crm-base.py` - Creates Airtable CRM base
- `execution/setup-contacts-table.py` - Configures Contacts table
- `execution/setup-deals-table.py` - Configures Deals table
- `execution/setup-companies-table.py` - Configures Companies table
- `execution/configure-pipeline-stages.py` - Sets up pipeline stages
- `execution/create-pipeline-view.py` - Creates pipeline Kanban view
- `execution/create-dashboard-views.py` - Creates reporting views
- `execution/setup-automated-reports.py` - Sets up automated reporting
- `execution/create-lead-capture-automation.py` - Creates lead capture workflow
- `execution/create-stage-reminders.py` - Creates stage progression reminders
- `execution/create-weekly-reports.py` - Creates weekly report automation
- `execution/create-crm-portal.py` - Creates Base44 portal

## 6. EDGE CASES
- **Client already has Airtable**: Use existing base, add CRM tables
- **Custom sales process**: Customize pipeline stages based on client needs
- **Multiple team members**: Configure permissions and ownership
- **Existing contacts**: Import existing contact list (CSV format)
- **Integration with other tools**: May need to connect to email, calendar, etc.
- **Data migration**: If moving from another CRM, plan migration process
- **Reporting needs**: Customize reports based on client KPIs

## 7. LEARNINGS
- Pipeline stages should match client's actual sales process
- Deal probability should be realistic (not overly optimistic)
- Reporting dashboard should show actionable metrics
- Automation should reduce manual work, not add complexity
- Team training is critical for adoption
- Regular data cleanup is important (archived deals, inactive contacts)
- Integration with email/calendar improves workflow

---
**Last Updated:** December 7, 2024
**Status:** Draft - For Review
**Created By:** AI Assistant (based on QUICK_STARTS.md and CRM best practices)

