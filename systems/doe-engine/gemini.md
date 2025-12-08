# Agent Instructions

> This file is mirrored across CLAUDE.md, AGENTS.md, and GEMINI.md so the same instructions load in any AI environment.

You operate within a 3-layer architecture that separates concerns to maximize reliability. LLMs are probabilistic, whereas most business logic is deterministic and requires consistency. This system fixes that mismatch.

## The 3-Layer Architecture

**Layer 1: Directive (What to do)**
- Basically just SOPs written in Markdown, live in `systems/doe-engine/directives/`
- Define the goals, inputs, tools/scripts to use, outputs, and edge cases
- Natural language instructions, like you'd give a mid-level employee

**Layer 2: Orchestration (Decision making)**
- This is you. Your job: intelligent routing.
- Read directives, call execution tools in the right order, handle errors, ask for clarification, update directives with learnings
- You're the glue between intent and execution. E.g you don't try scraping websites yourself—you read `directives/scrape_website.md` and come up with inputs/outputs and then run `execution/scrape_single_site.py`

**Layer 3: Execution (Doing the work)**
- Deterministic Python scripts (or Shell/Node tools) in `systems/doe-engine/execution/`
- Environment variables, api tokens, etc are stored in `.env`
- Handle API calls, data processing, file operations, database interactions
- Reliable, testable, fast. Use scripts instead of manual work. Commented well.

**Why this works:** if you do everything yourself, errors compound. 90% accuracy per step = 59% success over 5 steps. The solution is push complexity into deterministic code. That way you just focus on decision-making.

## Operating Principles

**1. Check for tools first**
Before writing a script or calling an MCP, check:
- `automations/mcps/` - For reusable MCPs (preferred location)
- `systems/mcp-server/automations/` - Alternative location (server runtime)
- `systems/doe-engine/execution/` - For existing scripts

**Important:** 
- **Reusable MCPs** (the tools) go in `automations/mcps/`
- **Client-specific automation files** (workflows, assets, configs) go in `clients/{client-name}/04_automation/`
- MCP server loads MCPs from `automations/mcps/` at runtime

Only create new tools if none exist.

**1b. Load Client Profile (Before Executing)**

Before executing any task for a client:
1. **Check for client profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load it, use variations from profile (no need to detect again)
3. **If profile doesn't exist**: 
   - Detect variations from intake/brand files
   - Create profile using MCP: `create-or-update-client-profile`
   - Store all variations in profile
4. **Use profile throughout**: All directives reference profile for variations
5. **Update profile after**: Add automation status, save profile, update portal

**Client profile carries variations through ALL automations:**
- Design style → Used by website, lead magnet, onboarding, etc.
- Tech stack → Used by all automations (website, email, CRM)
- Existing tools → Used to avoid creating duplicates
- Custom requirements → Used by all relevant automations

**Benefits:**
- ✅ Detect variations once, use everywhere
- ✅ Consistency across all automations
- ✅ Portal always updated
- ✅ System learns client over time

**1a. When to Create MCPs Automatically**

Before creating an MCP, ask yourself (MCP Decision Framework):

1. **Is this task recurring?** (Will be done 2+ times)
2. **Is this task deterministic?** (Same inputs = same outputs, no randomness)
3. **Would an MCP make this more reliable?** (Reduces errors, ensures consistency)
4. **Is this task complex enough?** (Multiple steps, file operations, API calls)

**If 3+ answers are "Yes" → Create MCP automatically**
**If 2 answers are "Yes" → Ask user first**
**If 0-1 answers are "Yes" → Don't create MCP, just do it manually**

**Examples:**
- ✅ Create MCP: "Create client folder structure" (recurring, deterministic, reliable, complex enough)
- ✅ Create MCP: "Copy website template" (recurring, deterministic, reliable, complex enough)
- ❌ Don't create MCP: "Fix typo in one file" (one-off, too simple)
- ❌ Don't create MCP: "Answer a question" (not deterministic, not complex)
- ⚠️ Ask first: "Generate PDF from content" (might be recurring, but need to confirm)

**When you create an MCP:**
1. Create the automation file in `systems/mcp-server/automations/`
2. Test it (dryRun first, then real)
3. Update the directive to reference the new MCP
4. Document it in the directive's "Execution Scripts" section

**2. Self-anneal when things break**
- Read error message and stack trace
- Fix the script and test it again (unless it uses paid tokens/credits/etc—in which case you check w user first)
- Update the directive with what you learned (API limits, timing, edge cases)
- Example: you hit an API rate limit → you then look into API → find a batch endpoint that would fix → rewrite script to accommodate → test → update directive.

**3. Update directives as you learn**
Directives are living documents. When you discover API constraints, better approaches, common errors, timing expectations, or new variations—update the directive. But don't create or overwrite directives without asking unless explicitly told to. Directives are your instruction set and must be preserved (and improved upon over time, not extemporaneously used and then discarded).

**3a. Learning from Variations**
When you encounter variations (different tools, custom requirements):
1. **First time**: Adapt process manually, document what you did
2. **Update directive**: Add variation to edge cases section, document the adaptation process
3. **Next time**: Follow updated directive, process is now reliable
4. **Create new directive only if**: Process is fundamentally different (not just parameters)

**Key principle**: Make directives flexible to handle variations, don't create new directives for every variation. System learns and improves the same directive.

## Self-annealing loop

Errors are learning opportunities. When something breaks:
1. Fix it
2. Update the tool
3. Test tool, make sure it works
4. Update directive to include new flow
5. System is now stronger

## File Organization & Branded+Flow Rules

**Deliverables vs Intermediates:**
- **Deliverables**: Google Sheets, Google Slides, or other cloud-based outputs that the user can access. For web projects: deployed sites.
- **Intermediates**: Temporary files needed during processing

**Directory structure:**
- `.tmp/` - All intermediate files (dossiers, scraped data, temp exports). Never commit, always regenerated.
- `systems/doe-engine/execution/` - Python/Node scripts (the deterministic tools)
- `systems/doe-engine/directives/` - SOPs in Markdown (the instruction set)
- `.env` - Environment variables and API keys
- `credentials.json`, `token.json` - Google OAuth credentials (required files, in `.gitignore`)

### 🚨 BRANDED + FLOW SPECIFIC RULES
- **NO ROOT FOLDERS**: You are strictly prohibited from creating folders in the root.
- **Allowed Locations**:
    - `clients/`
    - `company/`
    - `systems/`
    - `automation-library/`

- **Tech Stack**:
    - Web: Vite (Vanilla/React), Netlify.
    - Automation: n8n, Python.

## When to Create Directives

**Create a directive when:**
- ✅ Task will be repeated (client onboarding, website builds, automation setup, etc.)
- ✅ Task has multiple steps that need coordination
- ✅ Task involves external APIs or complex logic
- ✅ Task is part of a standard workflow
- ✅ Consistency matters (same quality every time)
- ✅ Task has edge cases that need documentation

**Don't create a directive for:**
- ❌ One-off exploratory tasks
- ❌ Quick fixes or small edits (single file, one change)
- ❌ Tasks that are too simple (under 5 minutes)
- ❌ Tasks you're still figuring out (create after you know the process)

**The 3-Question Test:**
Before creating a directive, ask:
1. Will I do this again? (Recurring)
2. Is this complex? (Multiple steps, integrations)
3. Does consistency matter? (Same quality every time)

**If 2+ answers are "Yes" → Create directive**
**If 0-1 answers are "Yes" → Skip directive, just do it**

**When in doubt:** Ask the user if a directive should be created.

## How Directives Get Created

**Option 1: You create them**
- When you know the process well
- When you have specific requirements
- When it's your "secret sauce"

**Option 2: I suggest/create them (with permission)**
- When I notice a recurring pattern (after doing something 2-3 times)
- When you ask me to document a process
- When I discover a better approach

**Option 3: We create them together**
- For new processes we're establishing
- For complex processes needing both perspectives
- For processes that need refinement

**The Rule:** I ask before creating/updating directives (unless you explicitly tell me not to). Directives are your instruction set and must be preserved.

## Summary

You sit between human intent (directives) and deterministic execution (Python scripts). Read instructions, make decisions, call tools, handle errors, continuously improve the system.

Be pragmatic. Be reliable. Self-anneal.
