# Project Configuration Document
## The Constitution - Stable, Long-Term Project Context

> **Purpose**: This document contains stable, long-term information that serves as the "constitution" for the BrandedFlow project. Update sparingly - only when fundamental aspects change.

---

## Project Overview

### Project Name
BrandedFlow

### Main Goal & Vision
BrandedFlow is a comprehensive business operations and client management system designed to streamline agency workflows, automate repetitive tasks, and maintain high-quality client deliverables through the DOE (Design, Orchestrate, Execute) methodology.

### Business Context
- **Business Type**: Digital agency/consultancy providing web development, automation, and AI integration services
- **Target Audience**: Small to medium businesses needing web presence, automation, and digital transformation
- **Core Services**:
  - Website development and design
  - Business automation and workflow optimization
  - AI integration and intelligent systems
  - Client onboarding and management
- **Brand Identity**: Professional, efficient, modern, technology-forward

---

## Technical Stack

### Core Framework
- **Primary Language**: Python (automation, backends)
- **Secondary Language**: TypeScript/JavaScript (frontends, Next.js projects)
- **Automation Framework**: n8n, CrewAI, MCP servers
- **Database**: Various (client-specific, PostgreSQL preferred)
- **Hosting**: Netlify (primary for client sites), self-hosted (internal systems)

### Required Technologies
- **Languages**: Python 3.11+, TypeScript 5.0+, Node.js 18+
- **Automation Tools**: n8n (workflow orchestration), CrewAI (agent coordination)
- **MCP Protocol**: Custom MCP servers for deterministic operations
- **Version Control**: Git
- **IDE**: Cursor IDE with Claude Code integration

### Third-Party Services & Integrations
- **Claude API**: AI assistance and automation
- **Netlify**: Hosting and deployment
- **Various Client APIs**: CRM, email, scheduling systems (client-specific)

---

## Architecture Decisions

### DOE Method Framework
The entire project follows the DOE (Directive, Orchestrate, Execute) methodology:
1. **Check Directive Phase**: Check for existing directive in `systems/doe-engine/directives/`, create blueprint if coding work needed
2. **Orchestration Phase**: Follow directive, get approval for blueprint, use scripts/MCPs for deterministic work
3. **Execution Phase**: Implement according to approved blueprint or execute deterministic scripts/MCP servers

### Repository Structure (MANDATORY)
Only these root-level folders are permitted:
- `clients/` - Client-specific projects and configurations
- `company/` - Internal company operations (brand, finances, sales, etc.)
- `docs/` - Documentation, processes, training materials
- `automations/` - Automation scripts, workflows, MCPs, integrations
- `systems/` - Core systems (automation-engine, doe-engine, trackers, etc.)
- `templates/` - Reusable templates for clients and projects
- `cursor/` - DOE dispatcher entrypoints (Node) for task routing
  - Note: this is intentionally root-level (called by humans/CI/agents)
  - No client deliverables should be placed here
  - This folder is treated as a system entrypoint
  - Keep minimal and stable
- `scripts/` - Repo guardrails + deterministic checks (shell scripts)

### Key Architectural Patterns
- **Separation of Concerns**: Clients, company, documentation, automation, and systems strictly separated
- **Deterministic Execution**: All automations must be repeatable and predictable
- **Context Isolation**: New chat sessions for unrelated topics to prevent context pollution
- **Self-Annealing**: Systems learn from errors and update themselves

---

## Automation & Integration Requirements

### Automation Reliability
- All automations must be deterministic (same input = same output)
- Error handling and retry logic required
- Comprehensive logging for debugging
- Pre-flight checks before execution
- Self-annealing when errors occur

### Integration Testing
- All integrations tested in staging before production
- API rate limits respected
- Error scenarios handled gracefully
- Timeout handling implemented
- Data validation at all boundaries

### Tool Selection Hierarchy
1. **MCP Servers**: For recurring, deterministic tasks
2. **n8n Workflows**: For multi-step automation and scheduling
3. **CrewAI Agents**: For multi-agent collaboration and complex orchestration
4. **Execution Scripts**: For one-off or simple deterministic operations

---

## File & Folder Structure Standards

### Root Structure (MANDATORY)
```
brandedflow/
├── clients/               # Client projects (5+ active clients)
│   ├── [client-name]/    # Individual client folders
│   │   ├── client-profile.json
│   │   └── [numbered sections: 01_admin, 02_intake, etc.]
├── company/              # Internal operations
│   ├── accounting/
│   ├── brand/
│   ├── finances/
│   ├── operations/
│   ├── proposals/
│   ├── sales/
│   └── website/
├── docs/                 # Documentation
│   ├── archive/
│   ├── automation-library/
│   ├── incoming/
│   ├── internal/
│   ├── processes/
│   ├── reference/
│   ├── tech-stack/
│   └── training/
├── automations/          # Automation assets
│   ├── integrations/
│   ├── library/
│   ├── mcps/
│   ├── scripts/
│   └── workflows/
├── systems/              # Core systems
│   ├── automation-engine/
│   ├── automation-system/
│   ├── context-automation/
│   ├── context-engine/
│   ├── dashboard/
│   ├── doe-engine/
│   ├── logs/
│   ├── mcp-server/
│   └── trackers/
├── templates/            # Reusable templates
│   ├── client-website-template/
│   ├── demos/
│   └── gamma-templates/
├── cursor/               # DOE dispatcher entrypoints (task routing)
├── scripts/              # Repo guardrails (deterministic checks)
├── .cursorrules          # Enforcement rules (DOE Method)
├── project_config.md     # This file (stable context)
└── workflow_state.md     # Dynamic state tracking
```

---

## Quality Assurance Standards

### Code Quality Requirements
- **NO code without checking directive or creating approved blueprint**
- **NO probabilistic execution** - only deterministic
- **NO context mixing** - new chats for new topics
- **NO skipping documentation** - maintain project_config.md and workflow_state.md
- **NO untyped code** - use proper type hints (Python) and TypeScript
- **NO aesthetic compromises** - output must be beautiful and marketable

### Pre-Flight Checks (MANDATORY)
Before ANY action:
1. Check if directive exists for recurring/complex tasks
2. Load client-profile.json if client work
3. Select correct tool layer (MCP/n8n/CrewAI/script)
4. Verify tool availability
5. Use existing tools, don't rewrite
6. Verify folder structure compliance
7. Log self-annealing if errors occurred
8. Update documentation (CONTEXT.md, DECISIONS_LOG.md)

---

## Client Management

### Active Clients
- AQ Remodeling
- Dental Bunny
- Habibi
- iAnswering AI
- Luxe Fine Dining

### Client Folder Requirements
Each client folder must contain:
- `client-profile.json` - Client metadata and configuration
- Numbered sections for organization (01_admin, 02_intake, etc.)
- Project-specific documentation
- Client-specific assets and deliverables

---

## Deployment & CI/CD

### Client Sites
- **Primary Host**: Netlify
- **Build Tool**: Next.js (App Router)
- **Deployment**: Automated via Git push
- **Requirements**: netlify.toml, environment variables, SEO optimization

### Internal Systems
- **Automation Systems**: Self-hosted (local/VPC)
- **n8n Workflows**: Self-hosted for data privacy
- **MCP Servers**: Local execution for security

---

## Important Rules & Constraints

### DOE Method Enforcement
- `.cursorrules` file is MANDATORY and auto-loaded
- `systems/doe-engine/pre-flight.md` contains pre-flight checklist
- Directive check REQUIRED before any code generation (check for directive, create blueprint if coding work needed)
- Approval REQUIRED before moving to Construct phase
- Only deterministic execution in Execute phase

### Documentation Requirements
- `project_config.md` (this file) - Stable, long-term context
- `workflow_state.md` - Current phase, tasks, learnings
- `CONTEXT.md` - Master context file in docs/internal/
- `.context.md` files - Directory-specific context (as needed)
- `client-profile.json` - Client-specific metadata

### Prohibited Actions
- Creating root-level folders outside the 6 approved folders
- Mixing contexts in single chat sessions
- Skipping directive check for non-trivial tasks
- Using probabilistic methods in Execute phase
- Adding dependencies without approval
- Leaving placeholder content or incomplete features

---

## Key Features & Milestones

### Phase 1: Foundation (Completed)
- ✅ DOE Method framework established
- ✅ Repository structure organized
- ✅ Client folders created and organized
- ✅ Automation systems framework built
- ✅ Rules and enforcement mechanisms in place

### Phase 2: Optimization (Current)
- Remove legacy systems (daily ops - completed)
- Standardize documentation
- Create client-profile.json files
- Enhance automation reliability
- Improve self-annealing mechanisms

### Phase 3: Scale (Future)
- Expand client portfolio
- Build reusable automation library
- Create standardized client onboarding
- Develop advanced AI agent systems
- Scale internal operations

---

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2025-12-21 | Initial creation from template | Claude Code |
| 2025-12-21 | Populated with BrandedFlow specifics | Claude Code |

---

**Last Updated**: 2025-12-21
**Maintained By**: BrandedFlow Team
