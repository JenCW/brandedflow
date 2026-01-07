# Systems Folder

This folder contains the working code and directives for Branded+Flow operations.

## Structure

### `mcp-server/`
MCP server that runs automations. Contains working code for:
- Client folder creation
- Website template copying
- Client profile management
- Base44 portal updates
- Other automation tools

**How to use:** Start with `npm start` in the `mcp-server/` directory. Server runs on port 4000.

### `doe-engine/`
DOE (Directive-Orchestrate-Execute) method implementation.

**`directives/`** - Business process instructions (8-10 essential directives):
- `build-client-website.md` - Build client websites (static HTML or framework-based)
- `create-client-proposal.md` - Create and send client proposals
- `setup-client-onboarding.md` - Setup client onboarding process
- `setup-crm-pipeline.md` - Setup CRM and pipeline system
- `setup-email-marketing.md` - Setup email marketing
- `setup-lead-magnet-automation.md` - Setup lead magnet automation
- `deploy-project.md` - Deploy projects to Netlify
- `import-company-website-files.md` - Import website files from external sources

**`execution/`** - Working Python/JavaScript scripts:
- `deploy_project.py` - Deploy projects
- `import_site.py` - Import website files
- Other execution scripts

**`integrations/`** - Integration code:
- `airtable/` - Airtable integration
- `base44/` - Base44 integration
- `n8n/` - n8n integration
- `netlify/` - Netlify integration

## How It Works

1. **Directives** = Instructions for business processes (what to do)
2. **MCP Server** = Tools that execute the work (how to do it)
3. **Execution Scripts** = Deterministic scripts for specific tasks
4. **Integrations** = Code for connecting to external services

## Usage

When you need to do something:
1. Check `doe-engine/directives/` for a directive that matches your task
2. Follow the directive's process
3. The directive will reference MCPs or execution scripts to use
4. MCP server runs the automations
5. Result: Reliable, consistent output

That's it. Simple and clean.
