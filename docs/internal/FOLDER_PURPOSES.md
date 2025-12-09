# Folder Purposes - Complete Guide

## Root Level Folders (Only 6 Allowed)

### 1. `clients/` - Client Work
**Purpose:** All client projects and deliverables
**Structure:**
```
clients/
├── {client-name}/
│   ├── 01_intake/        # Everything FROM client
│   ├── 02_brand/         # Brand identity, logos, assets
│   ├── 03_website/       # LIVE website files
│   ├── 04_automation/    # Client-specific automations
│   ├── 05_deliverables/  # Everything TO client
│   └── 99_archive/       # Old versions (never delete)
```

**What Goes Here:**
- Client websites
- Client automations (n8n workflows, scripts)
- Client deliverables (proposals, mockups, presentations)
- Client brand assets
- Client intake materials

**What Does NOT Go Here:**
- Company operations
- Reusable templates
- Internal documentation

---

### 2. `company/` - Company Operations
**Purpose:** YOUR business operations (Branded + Flow)
**Structure:**
```
company/
├── brand/              # BrandedFlow brand kit
├── operations/         # SOPs, workflows, tech stack
├── sales/              # Sales materials, pricing
├── accounting/         # Financial tracking
├── proposals/          # Proposal templates
└── website/            # brandedflow.com (to be built)
```

**What Goes Here:**
- Your brand assets
- Your operations documentation
- Your sales materials
- Your financial records
- Your company website

**What Does NOT Go Here:**
- Client work
- Reusable automation code
- System code

---

### 3. `docs/` - Documentation
**Purpose:** Strategic business documentation and knowledge vault
**Structure:**
```
docs/
├── internal/           # Internal-only docs (rules, context, strategy)
├── training/           # Training materials
├── processes/          # Company SOPs, operation manuals
├── archive/            # Old/unused docs
└── automation-library/ # MCP documentation (reference only)
```

**What Goes Here:**
- Business strategy docs
- Operations manuals
- Training materials
- Decision logs
- Context files
- Process documentation

**What Does NOT Go Here:**
- Client work
- Code/scripts
- Brand assets

---

### 4. `automations/` - Reusable Automation Code
**Purpose:** Reusable automation code that can be used across clients
**Structure:**
```
automations/
├── mcps/               # Reusable MCP code
├── workflows/          # Reusable n8n workflows
└── prompts/            # Reusable AI prompts
```

**What Goes Here:**
- MCPs that can be reused
- n8n workflow templates
- AI prompt templates
- Automation scripts (reusable)

**What Does NOT Go Here:**
- Client-specific automations (goes in `clients/{client}/04_automation/`)
- System code (goes in `systems/`)
- Documentation (goes in `docs/`)

---

### 5. `systems/` - Operational Systems
**Purpose:** Active running systems and operational code
**Structure:**
```
systems/
├── automation-engine/  # Daily ops engine (Python)
├── mcp-server/         # MCP server (Node.js)
├── dashboard/          # Dashboard generator
├── doe-engine/         # DOE method directives
├── context-engine/     # Context management
├── trackers/           # Auto-generated logs
└── logs/               # System logs
```

**What Goes Here:**
- Active running systems
- Automation engines
- Dashboard generators
- System logs
- Operational code

**What Does NOT Go Here:**
- Client work
- Company operations
- Documentation

---

### 6. `templates/` - Templates
**Purpose:** Reusable templates for websites, presentations, etc.
**Structure:**
```
templates/
├── client-website-template/  # Website template (based on AQR)
└── gamma-templates/          # Presentation templates
```

**What Goes Here:**
- Website templates
- Presentation templates
- Document templates
- Design templates

**What Does NOT Go Here:**
- Client-specific files
- Active code
- Documentation

---

## Quick Decision Tree

**Where does this go?**

1. **Is it client work?** → `clients/{client-name}/`
2. **Is it YOUR company stuff?** → `company/`
3. **Is it documentation?** → `docs/`
4. **Is it reusable automation code?** → `automations/`
5. **Is it a running system?** → `systems/`
6. **Is it a template?** → `templates/`

---

## Important Rules

### ❌ NEVER Create Root-Level Folders
Only these 6 folders exist at root level. Everything else goes INSIDE one of these.

### ❌ NEVER Use CAPS or Underscores
- ✅ `client-website-template/`
- ❌ `Client_Website_Template/`
- ❌ `CLIENT_WEBSITE_TEMPLATE/`

### ✅ Always Use Lowercase Kebab-Case
- Files: `lowercase-kebab-case.md`
- Folders: `lowercase-kebab-case/`

---

## Examples

**Client website:** `clients/aq-remodeling/03_website/`
**Company brand:** `company/brand/`
**Reusable MCP:** `automations/mcps/create-client-folder.js`
**Daily ops system:** `systems/automation-engine/`
**Training docs:** `docs/training/`
**Website template:** `templates/client-website-template/`

---

**Last Updated:** December 8, 2024

