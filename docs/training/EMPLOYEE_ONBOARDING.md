# Employee Onboarding: Branded + Flow Methods & Systems

**For:** New team members  
**Purpose:** Understand how we work, automate through Cursor, and maintain consistency

---

## 🎯 The Foundation: DOE Method

### What is DOE?

**DOE = Directive, Orchestrate, Execute**

It's a 3-layer system that separates decision-making from execution:

1. **Directive** = The recipe (instructions in Markdown)
2. **Orchestrate** = The chef (AI makes decisions)
3. **Execute** = The tools (MCPs do the work)

### Why We Use It

**Problem:** AI assistants are 90% accurate, but over 5 steps that becomes 59% success rate.

**Solution:** Push complexity into deterministic tools (MCPs). AI orchestrates, tools execute.

**Result:** 95%+ reliability, consistent quality, system improves over time.

---

## 🏗️ How It Works

### Example: Building a Client Website

**Step 1: Check Directive**
- Location: `systems/doe-engine/directives/build-client-website.md`
- Contains: Goals, inputs, process, outputs, edge cases

**Step 2: Load Client Profile**
- Location: `clients/{client-name}/client-profile.json`
- Contains: All client variations (design style, tech stack, existing tools)
- Used by: ALL directives automatically

**Step 3: Use MCPs (Tools)**
- Location: `automations/mcps/`
- Examples: `create-client-folder.js`, `copy-website-template.js`
- Called via: HTTP API to MCP server

**Step 4: Execute**
- MCPs do the actual work (create folders, copy files, etc.)
- AI orchestrates (decides which MCPs to call, handles errors)
- Result: Reliable, consistent output

---

## 📁 File Structure

### Root Level (Only 6 Folders)
- `clients/` - All client work
- `company/` - Company operations
- `docs/` - Documentation
- `automation-library/` - Reusable automation
- `systems/` - Operational systems
- `templates/` - Templates

**Rule:** Never create folders at root level.

### Client Structure
```
clients/{client-name}/
  01_intake/          - Client information
  02_brand/           - Brand assets, colors, style
  03_website/         - Website files
  04_automation/      - Automation files (workflows, configs)
  05_deliverables/    - Proposals, PDFs, final deliverables
  99_archive/         - Old files
  client-profile.json - All client variations (used by all directives)
```

### Key Locations
- **Directives:** `systems/doe-engine/directives/`
- **MCPs:** `automations/mcps/`
- **MCP Server:** `systems/mcp-server/`
- **Rules:** `MASTER_RULES.md` (root), `docs/internal/AI_RULES.md`

---

## 🤖 Working with Cursor

### Before Starting Any Task

1. **Read MASTER_RULES.md** - Complete rules
2. **Check for directive** - `systems/doe-engine/directives/{task-name}.md`
3. **Load client profile** - If working with a client
4. **Follow the directive** - Step by step

### The 3-Question Test

Before using DOE, ask:
1. Will this be done again? (Recurring)
2. Is this complex? (Multiple steps)
3. Does consistency matter? (Same quality every time)

**2+ "Yes" = Use DOE**  
**0-1 "Yes" = Do it directly**

### When You Ask Cursor to Do Something

**Cursor's process:**
1. Assesses task (3-question test)
2. Checks for directive
3. Loads client profile (if client work)
4. Uses MCPs to execute
5. Updates profile/documentation

**Your job:**
- Ask clearly what you want
- Review what Cursor creates
- Provide feedback
- Let the system learn and improve

---

## 🔧 MCPs (The Tools)

### What Are MCPs?

**MCP = Model Context Protocol** (in our case, HTTP-callable automation tools)

They're reusable tools that do deterministic work:
- Create client folders
- Copy templates
- Generate PDFs
- Update profiles
- Integrate with APIs

### How to Use MCPs

**Via Cursor:**
- Cursor automatically calls MCPs when following directives
- You don't need to call them manually

**Manually (if needed):**
```bash
curl -X POST http://localhost:4000/run \
  -H "X-API-Key: key1" \
  -H "Content-Type: application/json" \
  -d '{
    "automation": "create-client-folder",
    "params": { "client_name": "dental-bunny" }
  }'
```

### Available MCPs

**Client Management:**
- `create-client-folder` - Creates folder structure
- `process-client-intake` - Processes intake, creates profile
- `load-client-profile` - Loads client profile
- `create-or-update-client-profile` - Updates profile

**Website:**
- `copy-website-template` - Copies template
- `extract-client-info` - Extracts info from files

**Proposals:**
- `create-proposal-from-template` - Creates proposal

**More MCPs added as needed**

---

## 📋 Client Profile System

### What It Is

Each client has a profile file: `clients/{client-name}/client-profile.json`

**Contains:**
- Design style (modern-bright vs dark-luxury)
- Tech stack (Wix, Gmail, HubSpot, etc.)
- Existing tools
- Automation status
- Custom requirements

### Why It Matters

**First automation for a client:**
- Detects variations
- Creates profile
- Stores all variations

**Subsequent automations:**
- Loads profile
- Uses variations automatically
- No need to detect again
- Consistency across all automations

### Example Profile

```json
{
  "client_name": "dental-bunny",
  "variations": {
    "design_style": "modern-bright-editorial",
    "tech_stack": {
      "website": "wix",
      "email": "gmail",
      "crm": "hubspot"
    }
  },
  "automations": {
    "website": { "status": "not_needed" },
    "lead_magnet": { "status": "active" }
  }
}
```

**All directives automatically use these variations.**

---

## 🎨 Handling Variations

### Every Client Is Different

**Variations we handle:**
- Design styles (modern vs luxury)
- Tech stacks (Wix vs static HTML)
- Existing tools (HubSpot vs Airtable)
- Target markets (young professionals vs luxury buyers)

### How We Handle It

**Client Profile System:**
- Stores all variations upfront
- All directives use profile automatically
- No repeated detection
- Consistency across automations

**Flexible Directives:**
- Directives adapt based on profile
- Same process, different parameters
- Maintains reliability

---

## 🔄 The Workflow

### Typical Task Flow

```
You ask: "Build website for Dental Bunny"
    ↓
Cursor checks: Directive exists? ✅
    ↓
Cursor loads: Client profile ✅
    ↓
Cursor reads: Profile says "Uses Wix" ✅
    ↓
Cursor adapts: Skip static HTML, use Wix setup ✅
    ↓
Cursor calls: MCPs to do the work ✅
    ↓
Cursor updates: Profile with website status ✅
    ↓
Done: Website configured for Wix ✅
```

### Key Points

- **Directive** = What to do (the recipe)
- **Profile** = Client variations (the ingredients)
- **MCPs** = Tools that do work (the kitchen equipment)
- **Cursor** = Orchestrator (the chef)

---

## 📚 Key Documents

### Must Read
- `MASTER_RULES.md` - Complete rules (root level)
- `docs/internal/CONTEXT.md` - Current project state
- `systems/doe-engine/gemini.md` - DOE architecture

### Reference
- `docs/internal/AI_RULES.md` - Detailed AI rules
- `systems/doe-engine/directives/` - All directives
- `automations/mcps/` - All MCPs

---

## 🚀 Getting Started

### Your First Task

1. **Read this document** ✅
2. **Read MASTER_RULES.md**
3. **Ask Cursor to do something** (e.g., "Create client folder for test-client")
4. **Watch how it works** - Cursor follows directive, uses MCPs
5. **Learn by doing** - System gets better with use

### Common Tasks

**Create client:**
- "Process intake for [client-name]"
- Cursor: Loads intake, creates profile, ready for automations

**Build website:**
- "Build website for [client-name]"
- Cursor: Checks profile, adapts for their tech stack, builds

**Set up automation:**
- "Set up Lead Magnet for [client-name]"
- Cursor: Uses profile variations, sets up with their CRM/email

---

## 👥 Multi-User Collaboration

### How Multiple People Work Together

**Git Workflow:**
- All work in same repository
- Git tracks changes
- Commit frequently with clear messages

**Client Profile Locking:**
- If editing same client, communicate
- Profile updates are additive (don't overwrite)
- Check profile before making changes

**Communication:**
- Document decisions in `docs/internal/DECISIONS_LOG.md`
- Update `docs/internal/CONTEXT.md` with current state
- Use clear commit messages

### Best Practices

1. **Pull before starting** - Get latest changes
2. **Check profile first** - Don't duplicate work
3. **Update profile after** - Document what you did
4. **Commit frequently** - Small, clear commits
5. **Communicate** - If working on same client, coordinate

---

## 💡 Key Principles

### 1. Client Profile is Single Source of Truth
- All variations stored there
- All directives use it
- Always check profile first

### 2. Directives Are Living Documents
- They improve over time
- Learn from variations
- Get more flexible

### 3. MCPs Are Reusable Tools
- One MCP, many uses
- Deterministic (same input = same output)
- Testable and reliable

### 4. System Learns and Improves
- Each variation makes system smarter
- Directives get better
- Reliability increases

---

## ❓ Common Questions

**Q: Do I need to know how MCPs work?**  
A: No. Cursor calls them automatically when following directives.

**Q: What if a client has custom requirements?**  
A: System adapts. Profile stores variations, directives handle them.

**Q: Can I create new directives?**  
A: Yes, but ask first. Directives are living documents.

**Q: What if something breaks?**  
A: System self-anneals. Fix the MCP, update the directive, system improves.

**Q: How do I know what to do?**  
A: Read the directive. It tells you everything.

---

## 📞 Getting Help

**If confused:**
1. Read the directive
2. Check the client profile
3. Ask Cursor to explain
4. Review MASTER_RULES.md

**If something breaks:**
1. Check the error message
2. Fix the MCP (if MCP issue)
3. Update the directive (if process issue)
4. Document the fix

---

## 🎯 Summary

**The system:**
- Uses DOE method (Directive → Orchestrate → Execute)
- Stores client variations in profiles
- Uses MCPs for reliable execution
- Learns and improves over time
- Maintains consistency across all work

**Your role:**
- Ask clearly what you want
- Let the system work
- Review and provide feedback
- Trust the process

**Result:**
- Reliable, consistent work
- Faster delivery
- Better quality
- System that improves

---

**Welcome to Branded + Flow! The system does the heavy lifting, you focus on the important decisions.**

