# AI WORKFLOW GUIDE FOR BRANDED + FLOW
**Last Updated:** November 25, 2024

---

## IS CLAUDE CODE THE RIGHT TOOL FOR YOU?

**YES.** Here's why:

Your screenshot shows you're using **Claude Code** (the AI-native IDE that integrates directly with VSCode). This is the BEST tool for your specific needs because:

1. **Persistent Context:** Unlike web chat, your project files stay in context across sessions
2. **MCP Integration:** Built-in support for MCP servers (you already created one in <1 hour)
3. **GitHub Integration:** Auto-commits preserve your work
4. **Multi-File Awareness:** Claude can see your entire project structure
5. **No Chat Chaos:** Everything lives in one project, not scattered across 50 web chats

**You do NOT need RAG** (Retrieval Augmented Generation). RAG is for:
- Large teams managing 1,000+ documents
- Semantic search across massive knowledge bases
- Real-time retrieval from constantly updating sources

**You need:** Rolling context + selective retrieval (which Claude Code provides natively)

---

## YOUR CURRENT SETUP (WHAT YOU'RE DOING RIGHT)

From your screenshot, you have:
- ✅ Claude Code running in VSCode
- ✅ MCP server created (`zsh mcp-server` terminals visible)
- ✅ Git integration (commits visible in left sidebar)
- ✅ Multiple terminal sessions for different tasks
- ✅ Markdown documentation habit

**This is already a professional setup.** You don't need to change tools.

---

## THE COMPLETE AI TOOL STACK (WHICH AI FOR WHAT)

### ChatGPT Pro ($20/mo) - Deep Research & Initial Client Analysis
**Use for:**
- Competitive analysis (Deep Research feature)
- Market research reports
- Buyer persona development
- Industry trend analysis

**How to use:**
1. Create a ChatGPT Project per client
2. Upload onboarding questionnaire
3. Request: "Conduct deep research on [industry] competitive landscape. Focus on: gaps, trends, positioning opportunities."
4. Download the report (markdown or PDF)
5. Upload to NotebookLM for synthesis

**When NOT to use:**
- Building code (use Claude Code)
- Technical debugging (use Claude Code)
- Creating MCPs (use Claude Code)

---

### Claude Code (VSCode) - All Coding, MCP Development, Technical Work
**Use for:**
- Writing MCP servers
- Building n8n workflow logic
- Debugging automation code
- Creating technical documentation
- API integrations

**How to use:**
1. Open your brandedflow project in VSCode with Claude Code
2. Create context files: `INIT.md`, `context.md` per client
3. Start sessions by referencing context: "See INIT.md for project overview. Today I'm building [X]."
4. Let Claude see your entire project structure
5. Commit changes daily (automated via cron)

**Best practices:**
- One Claude Code project = your entire business
- Subfolders for: `/clients`, `/mcp-servers`, `/templates`, `/docs`
- Context files updated after each session
- Git commits preserve history
- Use terminal for running MCP servers

**When NOT to use:**
- Market research (use ChatGPT Deep Research)
- Presentation design (use Gamma)
- Document synthesis (use NotebookLM)

---

### NotebookLM (Free) - Research Synthesis & Fact-Checking
**Use for:**
- Synthesizing multiple research documents
- Creating source-grounded client reports
- Fact-checking AI-generated content
- Building comprehensive knowledge from uploaded sources

**How to use:**
1. Create a NotebookLM notebook per client
2. Upload: ChatGPT research report, competitor websites, client brand docs
3. Ask: "What are the top 3 market gaps this client could exploit?"
4. Responses will cite specific sources (reduces hallucination)
5. Use outputs in your client deliverables

**Unique capability:** NotebookLM shows which uploaded source supports each claim (unlike ChatGPT/Claude which generate freely)

**When NOT to use:**
- Creating original content (it synthesizes, doesn't generate)
- Building code
- Real-time web search

---

### Gamma (Free tier, Pro $8/mo) - Client-Facing Presentations
**Use for:**
- Research presentations for clients
- Proposals
- Brand strategy documents
- Quick Start deliverables

**How to use:**
1. Paste ChatGPT research report or your outline
2. Select "Generate presentation"
3. Gamma auto-creates slides with design
4. Spend 8-10 min manual polish (formatting, images)
5. Export as PDF or share link

**When to upgrade to Pro ($8/mo):**
- Need to remove Gamma branding
- Want custom templates
- Exporting >3 presentations/month

**When NOT to use:**
- Technical documentation (use markdown)
- Code examples (use Claude Code artifacts)

---

### Claude.ai Web (Free with Pro limits) - Quick Questions & Brainstorming
**Use for:**
- One-off questions not tied to a project
- Brainstorming business names, taglines
- Quick content edits
- Strategy discussions (like this conversation)

**When NOT to use:**
- Anything requiring multi-session context (use Claude Code)
- Building code (use Claude Code)
- Client-specific work (use Claude Code project)

---

## THE AI CHEAT SHEET YOU ASKED FOR

| Task | Best AI Tool | Second Best | Why |
|------|-------------|------------|-----|
| **Competitive research** | ChatGPT Deep Research | Claude.ai web search | Deep Research analyzes 100+ sources in one shot |
| **Building MCPs** | Claude Code | Claude.ai API | Claude Code sees your full project, handles multi-file edits |
| **Client presentations** | Gamma + Claude | Canva + ChatGPT | Gamma generates slides from text in 60 sec |
| **Email sequences** | Claude Code | ChatGPT Pro | Claude better at maintaining tone across multi-message sequences |
| **Debugging automation** | Claude Code | ChatGPT Pro | Claude superior at reading code context |
| **Brand strategy** | ChatGPT Deep Research → Claude synthesis | Claude alone | Deep Research finds data, Claude synthesizes into strategy |
| **Social media posts** | Claude | ChatGPT | Claude more natural, less "AI-sounding" |
| **Document synthesis** | NotebookLM | Claude + uploaded docs | NotebookLM cites sources, reduces hallucination |
| **API integration code** | Claude Code | Cursor | Claude Code has MCP native support |
| **Image generation** | ChatGPT DALL-E | Midjourney | DALL-E integrated in ChatGPT workflow |
| **Video scripts** | Claude | ChatGPT | Claude better at structure and pacing |
| **SQL queries** | Claude Code | ChatGPT | Claude better at complex multi-table logic |
| **n8n workflows** | Claude Code | ChatGPT | Claude understands n8n nodes better |

---

## WORKFLOW FOR CLIENT PROJECT (START TO FINISH)

### Phase 1: Research (ChatGPT Deep Research)
1. Client fills onboarding questionnaire
2. Create ChatGPT Project: "Client: [Name]"
3. Upload questionnaire
4. Run Deep Research: "Analyze [industry] competitive landscape, identify market gaps, recommend positioning"
5. Download report (markdown)

### Phase 2: Synthesis (NotebookLM)
1. Create NotebookLM notebook: "Client: [Name] Research"
2. Upload ChatGPT report + competitor websites + client docs
3. Ask: "What are the top 3 strategic opportunities?"
4. Ask: "Create detailed buyer persona based on sources"
5. Export answers

### Phase 3: Strategy Document (Gamma)
1. Paste ChatGPT research + NotebookLM insights into Gamma
2. Generate presentation: "Brand Strategy for [Client Name]"
3. Polish formatting (8-10 min)
4. Export PDF + shareable link

### Phase 4: Automation Build (Claude Code)
1. Open brandedflow project in Claude Code
2. Navigate to `/clients/[client-name]/`
3. Create `context.md` with research summary
4. Reference context: "See context.md. Build lead-magnet-deploy MCP for this client."
5. Claude builds MCP using project structure
6. Test MCP
7. Commit to GitHub

### Phase 5: Delivery (Base44 Portal)
1. Run `client-onboarding` MCP (auto-creates portal)
2. Upload research presentation to portal
3. Upload automation documentation
4. Send portal login to client
5. Done

**Total Time:**
- Without AI: 12-16 hours
- With AI: 2-3 hours
- With MCPs: 45 minutes

---

## CONTEXT PRESERVATION SYSTEM (NO RAG NEEDED)

### Problem You Had:
"I used to get myself in a complete tizzy trying to find decisions made in various chats. Chaotic mess that cost me time and money and caused me frustration and ultimately had me spiraling."

### Solution:
**One project, multiple context files, daily commits.**

### Folder Structure:
```
/Users/jen/brandedflow/           # Your main project
├── INIT.md                        # Overall business context (this gets pasted at start of sessions)
├── OPERATIONS_MANUAL.md           # How to run the business
├── DECISIONS_LOG.md               # Chronological decision history
│
├── /clients/
│   ├── /acme-corp/
│   │   ├── context.md            # Running summary of this client
│   │   ├── onboarding.md         # Their questionnaire responses
│   │   ├── /research/            # Downloaded ChatGPT reports
│   │   └── /deliverables/        # Final files
│   │
│   └── /widgets-inc/
│       └── ...same structure
│
├── /mcp-servers/
│   ├── /mini-research-sprint/
│   │   ├── index.js
│   │   ├── package.json
│   │   └── README.md
│   │
│   ├── /call-screening-setup/
│   └── /lead-magnet-deploy/
│
├── /templates/
│   ├── service-agreement.md
│   ├── proposal-template.md
│   ├── onboarding-questionnaire.md
│   └── warm-outreach-email.md
│
└── /docs/
    ├── mcp-development-guide.md
    ├── sales-process.md
    └── client-delivery-checklist.md
```

### Daily Workflow:
**8am - Start Day:**
1. Open Claude Code project
2. Read INIT.md to refresh on overall business
3. Check DECISIONS_LOG.md for yesterday's decisions
4. Start work

**During Day:**
- Working on client → open `/clients/[name]/context.md`
- Building MCP → Claude Code sees entire `/mcp-servers/` folder
- Creating template → save to `/templates/`

**6pm - End Day:**
1. Update relevant context.md files with today's decisions
2. Update DECISIONS_LOG.md with new decisions
3. Git commit happens automatically at 11pm
4. Done

### Starting New Session in Claude Code:
Instead of: "Hey Claude, I'm building an automation agency..."

You paste: 
```
See INIT.md for full business context.
See /clients/acme-corp/context.md for this client's info.
Today I'm building the lead-magnet-deploy MCP for Acme Corp.
```

Claude now has ALL context instantly. No re-explaining.

### Git Automation (Set This Up):
Create `.git-auto-commit.sh`:
```bash
#!/bin/bash
cd /Users/jen/brandedflow
git add .
git commit -m "Daily update: $(date +%Y-%m-%d)"
git push origin main
```

Schedule daily at 11pm:
```bash
crontab -e
# Add this line:
0 23 * * * /Users/jen/brandedflow/.git-auto-commit.sh
```

Now every day at 11pm, all your work commits to GitHub automatically.

---

## WHEN YOU ACTUALLY NEED RAG

You'll know you need RAG when:
1. Managing 25+ concurrent clients
2. Each client has 50+ documents
3. You need instant semantic search ("Find all clients in healthcare who mentioned email marketing")
4. You're building a client-facing search tool

**Until then:** Your current system (Claude Code + context files + NotebookLM) handles everything.

**If you decide you need RAG later:**
- Pinecone (vector database): $70/mo
- LangChain + OpenAI embeddings: $50-100/mo
- Custom setup time: 2-3 weeks

**ROI check:** RAG only worth it if managing time for 25+ clients > $120/mo + 2 weeks setup time.

---

## TROUBLESHOOTING COMMON ISSUES

### "Claude Code doesn't remember previous session"
**Fix:** Update context.md files at end of each session. Start next session with "See context.md."

### "I built an MCP but it doesn't work"
**Fix:** Run in terminal, check error logs. Claude Code can debug by seeing the terminal output.

### "ChatGPT Deep Research gives generic results"
**Fix:** Be more specific in query. Include competitor URLs, specific questions, target metrics.

### "NotebookLM responses are too short"
**Fix:** Ask follow-up questions, request expansion, cite specific sources.

### "Gamma presentations look generic"
**Fix:** Spend 8-10 min manual polish. Change colors, add images, adjust layout.

### "I lost a decision I made 2 weeks ago"
**Fix:** Check DECISIONS_LOG.md. If not there, search GitHub commit history.

---

## MODEL COMPARISON (WHEN TO USE WHICH)

### Claude Sonnet 4 (Your Current Model)
**Best for:**
- Strategic thinking
- Complex reasoning
- MCP development
- Technical writing
- Code generation with context

**Use when:** Task requires multi-step logic, deep analysis, or maintaining tone

### ChatGPT-4o (via ChatGPT Pro)
**Best for:**
- Deep Research (unique feature)
- Image generation (DALL-E integration)
- Real-time web browsing
- Plugin ecosystem

**Use when:** Need comprehensive research, images, or real-time data

### Gemini 2.0 Flash
**Best for:**
- Extremely fast responses
- Multimodal tasks (video, audio, images together)
- Real-time data processing

**Use when:** Speed matters more than depth

### GPT-4 Turbo (via API)
**Best for:**
- High-volume automated tasks
- Structured data extraction
- JSON outputs

**Use when:** Building automated systems that call AI programmatically

---

## YOUR SPECIFIC QUESTIONS ANSWERED

### "Is Claude Code the best method for my needs?"
**YES.** You're already set up correctly. Don't change.

### "Do I need RAG?"
**NO.** Not until 25+ clients or 1,000+ documents.

### "How do I never lose context again?"
**This system:**
1. INIT.md = business overview
2. context.md per client = client-specific
3. DECISIONS_LOG.md = chronological decisions
4. Daily Git commits = version history
5. Start sessions by referencing context files

### "Should I keep using ChatGPT for research?"
**YES.** Deep Research is genuinely better than Claude for competitive analysis. Use ChatGPT for research, Claude Code for everything else.

### "What about images and videos?"
**Images:** ChatGPT DALL-E (best), Midjourney (more artistic), Leonardo.ai (free alternative)  
**Videos:** Runway ML (generative), Descript (editing), Loom (screen recording)  
**Video AI:** HeyGen (AI avatars), Synthesia (corporate videos)

---

## NEXT STEPS

1. **Save these files to your Claude Code project:**
   - INIT.md
   - OPERATIONS_MANUAL.md
   - AI_WORKFLOW_GUIDE.md (this file)
   - DECISIONS_LOG.md

2. **Set up Git auto-commit** (script above)

3. **Create client template:**
   - `/clients/_TEMPLATE/context.md`
   - Copy for each new client

4. **Test the workflow:**
   - Pick one warm lead
   - Run through Phase 1-5 above
   - Document issues
   - Refine

5. **Build mini-research-sprint MCP** using Claude Code this week

---

You're not missing anything. You're already using the right tools. Now just systematize.
