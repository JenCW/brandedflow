# MCP File Structure Guide

## Two Types of Files

### 1. Reusable MCPs (The Tools)
**Location:** `automations/mcps/` (preferred) or `systems/mcp-server/automations/` (fallback)

These are the **reusable automation tools** that can be used for any client:
- The actual MCP code (JavaScript files)
- Shared across all clients
- Called via HTTP API
- Examples: `create-client-folder.js`, `copy-website-template.js`, `setup-lead-magnet.js`

**Structure:**
```
automations/
  mcps/
    create-client-folder.js      ← Reusable MCP
    copy-website-template.js     ← Reusable MCP
    setup-lead-magnet.js         ← Reusable MCP
    setup-client-onboarding.js   ← Reusable MCP
```

**Note:** MCP server in `systems/mcp-server/` loads MCPs from `automations/mcps/` at runtime.

### 2. Client-Specific Automation Files (The Configs/Outputs)
**Location:** `clients/{client-name}/04_automation/`

These are **client-specific files** created BY the MCPs:
- n8n workflow JSON files (client-specific configuration)
- Client assets (PDFs, images, etc.)
- Client documentation
- Client-specific configurations

**Structure:**
```
clients/
  dental-bunny/
    04_automation/
      workflows/
        lead-magnet-workflow.json    ← Client-specific n8n workflow
        onboarding-workflow.json     ← Client-specific n8n workflow
      assets/
        lead-magnet.pdf              ← Client-specific PDF
      docs/
        README.md                    ← Client documentation
        setup-instructions.md        ← Client-specific instructions
      config/
        airtable-base-id.txt         ← Client's Airtable base ID
        brevo-list-id.txt            ← Client's Brevo list ID
```

## How They Work Together

### Example: Setting up Lead Magnet for Dental Bunny

**Step 1: MCP (Reusable Tool)**
- Location: `automations/mcps/setup-lead-magnet.js`
- This is the reusable code that sets up lead magnets for ANY client

**Step 2: MCP Creates Client Files**
- MCP is called with: `{ client_name: "dental-bunny", ... }`
- MCP creates files in: `clients/dental-bunny/04_automation/`
  - `workflows/lead-magnet-workflow.json` (client-specific n8n workflow)
  - `assets/lead-magnet.pdf` (client-specific PDF)
  - `docs/README.md` (client documentation)

**Result:**
- ✅ Reusable MCP code stays in `automation-library/mcps/`
- ✅ Client-specific files go in `clients/dental-bunny/04_automation/`

## The Flow

```
1. Directive says: "Use MCP: setup-lead-magnet"
   ↓
2. AI calls MCP: POST /run { automation: "setup-lead-magnet", params: { client_name: "dental-bunny" } }
   ↓
3. MCP (reusable code) executes:
   - Creates Airtable base
   - Sets up Brevo
   - Creates n8n workflow
   - Generates PDF
   ↓
4. MCP saves client-specific files to:
   clients/dental-bunny/04_automation/
   - workflows/lead-magnet-workflow.json
   - assets/lead-magnet.pdf
   - docs/README.md
   ↓
5. Done! Reusable MCP code unchanged, client files created
```

## Summary

- **Reusable MCPs** = The tools (in `automations/mcps/` - preferred location)
- **Client automation files** = The outputs/configs (in `clients/{client-name}/04_automation/`)
- **MCP Server** = Runtime server in `systems/mcp-server/` that loads MCPs from `automations/mcps/`

The MCP is the recipe, the client folder is where the meal gets served.

