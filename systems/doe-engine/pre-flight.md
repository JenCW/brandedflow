# PRE-FLIGHT CHECK (MANDATORY)

Before generating or modifying anything, confirm:

1. **Directive exists?** → If task is recurring/complex, directive must be read first
2. **Client profile loaded?** → If client work, load `clients/{name}/client-profile.json` first
3. **Tool layer selected?** → MCP / n8n workflow / CrewAI agent / execution script - which one?
4. **Tool available?** → MCP connected? n8n workflow exists? CrewAI configured? Script in execution/?
5. **Execution method correct?** → Use existing tool, don't rewrite. Check `automations/mcps/`, `automations/workflows/`, `systems/doe-engine/execution/`
6. **Folder structure correct?** → No root folders. Only: clients/, company/, docs/, automations/, systems/, templates/
7. **Self-annealing logged?** → If error/variation occurred, call `log-self-annealing` MCP
8. **Documentation updated?** → CONTEXT.md and DECISIONS_LOG.md if relevant
9. **Pre-flight referenced?** → If you cannot confirm you read this, work is invalid

**If any check fails → STOP. Fix it. Then proceed.**

**This gate cannot be bypassed.**

---

## Tool Selection Logic

**Use MCP when:**
- Recurring, deterministic task
- Need standardized tool integration
- Accessing external services/APIs

**Use n8n workflow when:**
- Multi-step automation needed
- Scheduled/recurring workflows
- Client-specific automation config

**Use CrewAI when:**
- Multi-agent collaboration needed
- Complex task orchestration
- Research/analysis requiring multiple agents

**Use execution script when:**
- Deterministic Python/Node operation
- One-off or simple automation
- No MCP/n8n/CrewAI needed
