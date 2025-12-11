/**
 * Trigger Client Research
 * Automatically triggers comprehensive market and business research after client intake
 * This is THE MOST CRITICAL automation - everything else depends on this
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Triggers comprehensive ChatGPT Deep Research for client: market analysis, competitive analysis, buyer personas, and strategic recommendations. This research informs ALL subsequent decisions (brand, website, automations).',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    research_type: {
      type: 'string',
      required: false,
      default: 'full',
      description: 'Type of research: full (market + competitive + personas + strategy) or partial'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, research_type = 'full' } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    let profile = {};
    
    if (await fs.pathExists(profilePath)) {
      profile = await fs.readJson(profilePath);
    } else {
      return {
        success: false,
        error: 'Client profile not found. Run process-client-intake first.',
        client_name
      };
    }

    const businessName = profile.business_name || client_name;
    const industry = profile.industry || 'Not specified';
    const location = profile.location || profile.target_market || 'Not specified';
    const services = profile.services || [];
    const websiteUrl = profile.website_url || profile.client_specific_ids?.website_url;

    // Load intake data for research context
    const intakeDir = path.join(PROJECT_ROOT, 'clients', client_name, '01_intake');
    let intakeData = '';
    
    if (await fs.pathExists(intakeDir)) {
      const files = await fs.readdir(intakeDir);
      const intakeFiles = files.filter(f => f.endsWith('.txt') || f.endsWith('.md'));
      for (const file of intakeFiles) {
        const content = await fs.readFile(path.join(intakeDir, file), 'utf-8');
        intakeData += content + '\n\n';
      }
    }

    // Create research directory
    const researchDir = path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research');
    await fs.ensureDir(researchDir);

    // Prepare research prompts for ChatGPT Deep Research
    const researchPrompts = {
      // PHASE 1: Market & Competitive Analysis
      phase1_market_research: {
        title: 'Market & Competitive Analysis',
        prompt: `You are conducting deep research for ${businessName}, a ${industry} business${location !== 'Not specified' ? ` located in ${location}` : ''}.

CLIENT INFORMATION:
${intakeData}

RESEARCH OBJECTIVES:
1. Current market analysis for ${industry} industry
2. Identify current market trends and emerging trends
3. Analyze profitability of the industry based on location (${location}) and surrounding competition
4. Identify 5 competitors most aligned with ${businessName}
5. Competitive analysis to identify:
   - Industry gaps or niches that can be exploited
   - Areas that could be profitable if explored
   - Competitive advantages/disadvantages
6. Current company status deep dive (if ${businessName} exists online at ${websiteUrl || 'N/A'}):
   - What works
   - What doesn't work
   - What can be improved
   - What should be addressed that would drive customers away
7. Current target market analysis
8. Buyer persona identification based on service offerings

SERVICES OFFERED:
${services.length > 0 ? services.map(s => `- ${s}`).join('\n') : 'To be determined'}

DELIVERABLES NEEDED:
- Comprehensive market analysis report
- Trend identification (current + emerging)
- Profitability assessment
- 5 competitor profiles with analysis
- Gap/niche opportunities
- Company status review (if applicable)
- Target market recommendations
- Initial buyer persona insights

This research will inform ALL brand, website, and automation decisions. Be thorough and specific.`,
        output_file: path.join(researchDir, '01-market-competitive-analysis.md')
      },

      // PHASE 2: Buyer Personas (feeds from Phase 1)
      phase2_buyer_personas: {
        title: 'Buyer Personas Development',
        prompt: `Based on the market and competitive analysis for ${businessName}, create detailed buyer personas.

CONTEXT:
- Industry: ${industry}
- Location: ${location}
- Services: ${services.join(', ')}
- Market analysis completed (see Phase 1 report)

CREATE 3-5 TARGET MARKET/BUYER PERSONAS including:
1. Demographics and firmographics
2. Service offerings they need/want
3. Likes and dislikes
4. Purchasing history patterns
5. Contract negotiation styles
6. How they typically secure services from service-based companies
7. Typical process to convert into a paying customer
8. Pain points and motivations
9. Preferred communication channels
10. Decision-making factors

Each persona should be detailed enough to inform:
- Brand messaging and tone
- Website content and structure
- Marketing strategies
- Sales approach
- Automation workflows

Prioritize personas based on profitability and conversion potential.`,
        output_file: path.join(researchDir, '02-buyer-personas.md'),
        depends_on: '01-market-competitive-analysis.md'
      },

      // PHASE 3: Strategic Recommendations (feeds from Phase 1 & 2)
      phase3_strategy: {
        title: 'Strategic Path Forward',
        prompt: `Based on the market analysis and buyer personas for ${businessName}, identify the best path forward.

CONTEXT:
- Market analysis completed (Phase 1)
- Buyer personas developed (Phase 2)
- Industry: ${industry}
- Location: ${location}
- Services: ${services.join(', ')}

IDENTIFY:
1. Best path to obtain more leads:
   - Channel recommendations
   - Messaging strategies
   - Content strategies
   - Outreach approaches

2. Best path to convert more customers:
   - Conversion optimization opportunities
   - Sales process improvements
   - Objection handling strategies
   - Trust-building tactics

3. Focus areas (gaps/niches):
   - Specific niches to target
   - Market gaps to exploit
   - Competitive advantages to leverage
   - Areas to avoid

4. Brand positioning recommendations:
   - How to position as authority
   - Unique value propositions
   - Messaging framework
   - Brand personality recommendations

5. Website recommendations:
   - Structure and pages needed
   - Content focus areas
   - Conversion elements
   - SEO opportunities

6. Automation priorities:
   - Which automations will have highest ROI
   - Lead generation priorities
   - Nurture sequence focus
   - Client communication needs

This strategy will directly inform:
- Brand identity and guidelines
- Website structure and content
- Automation selection and setup
- Marketing approach
- Sales process

Be specific and actionable.`,
        output_file: path.join(researchDir, '03-strategic-recommendations.md'),
        depends_on: ['01-market-competitive-analysis.md', '02-buyer-personas.md']
      }
    };

    // Save research prompts for ChatGPT execution
    const promptsFile = path.join(researchDir, 'research-prompts.json');
    await fs.writeJson(promptsFile, researchPrompts, { spaces: 2 });

    // Create research execution guide
    const executionGuide = `# Research Execution Guide - ${businessName}

## CRITICAL: This Research Informs EVERYTHING

This research is the foundation for:
- Brand identity and guidelines
- Website structure and content
- Automation selection
- Marketing strategy
- Sales approach
- Content strategy

## Research Phases

### Phase 1: Market & Competitive Analysis
**ChatGPT Prompt:** See \`research-prompts.json\` → \`phase1_market_research.prompt\`

**Steps:**
1. Open ChatGPT Pro
2. Create new Project: "${businessName} - Market Research"
3. Paste Phase 1 prompt from \`research-prompts.json\`
4. Run Deep Research (this may take 5-30 minutes)
5. Download report as markdown
6. Save to: \`01-market-competitive-analysis.md\`

**What You Get:**
- Market analysis
- Trend identification
- Competitor analysis (5 competitors)
- Gap/niche opportunities
- Company status review (if applicable)
- Initial buyer insights

---

### Phase 2: Buyer Personas
**ChatGPT Prompt:** See \`research-prompts.json\` → \`phase2_buyer_personas.prompt\`

**Steps:**
1. In same ChatGPT Project
2. Upload Phase 1 report to context
3. Paste Phase 2 prompt
4. Run analysis
5. Download report
6. Save to: \`02-buyer-personas.md\`

**What You Get:**
- 3-5 detailed buyer personas
- Purchasing behavior
- Conversion process
- Communication preferences

---

### Phase 3: Strategic Recommendations
**ChatGPT Prompt:** See \`research-prompts.json\` → \`phase3_strategy.prompt\`

**Steps:**
1. In same ChatGPT Project
2. Upload Phase 1 AND Phase 2 reports to context
3. Paste Phase 3 prompt
4. Run analysis
5. Download report
6. Save to: \`03-strategic-recommendations.md\`

**What You Get:**
- Lead generation strategies
- Conversion optimization
- Brand positioning
- Website recommendations
- Automation priorities

---

## After Research Complete

Once all 3 phases are complete:
1. Run: \`process-research-findings.js\` MCP
2. This will:
   - Extract key insights
   - Generate brand guidelines
   - Create website structure recommendations
   - Identify automation priorities
   - Update client profile with research data

---

## Research Status

- [ ] Phase 1: Market & Competitive Analysis
- [ ] Phase 2: Buyer Personas
- [ ] Phase 3: Strategic Recommendations
- [ ] Research findings processed
- [ ] Brand guidelines generated
- [ ] Website structure recommended
- [ ] Automation priorities identified

---

**Last Updated:** ${new Date().toISOString()}
`;

    await fs.writeFile(path.join(researchDir, 'EXECUTION_GUIDE.md'), executionGuide);

    // Update client profile
    if (!profile.research) profile.research = {};
    profile.research.status = 'pending';
    profile.research.research_type = research_type;
    profile.research.research_dir = researchDir;
    profile.research.prompts_file = promptsFile;
    profile.research.phases = {
      phase1_market: { status: 'pending', file: null },
      phase2_personas: { status: 'pending', file: null, depends_on: 'phase1_market' },
      phase3_strategy: { status: 'pending', file: null, depends_on: ['phase1_market', 'phase2_personas'] }
    };
    profile.research.triggered_date = new Date().toISOString();
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-trigger-client-research';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      research_type,
      research_directory: researchDir,
      prompts_file: promptsFile,
      execution_guide: path.join(researchDir, 'EXECUTION_GUIDE.md'),
      phases: {
        phase1: {
          title: 'Market & Competitive Analysis',
          prompt_file: promptsFile,
          output_file: researchPrompts.phase1_market_research.output_file,
          status: 'ready_for_chatgpt'
        },
        phase2: {
          title: 'Buyer Personas',
          prompt_file: promptsFile,
          output_file: researchPrompts.phase2_buyer_personas.output_file,
          depends_on: 'phase1',
          status: 'pending_phase1'
        },
        phase3: {
          title: 'Strategic Recommendations',
          prompt_file: promptsFile,
          output_file: researchPrompts.phase3_strategy.output_file,
          depends_on: ['phase1', 'phase2'],
          status: 'pending_phase1_and_phase2'
        }
      },
      message: `Research workflow triggered for ${businessName}. This is THE MOST CRITICAL automation - all brand, website, and automation decisions depend on this research.`,
      next_steps: [
        '1. Open ChatGPT Pro',
        '2. Create Project: "' + businessName + ' - Market Research"',
        '3. Run Phase 1 prompt (from research-prompts.json)',
        '4. Download report → Save to 01-market-competitive-analysis.md',
        '5. Run Phase 2 (with Phase 1 in context)',
        '6. Run Phase 3 (with Phase 1 & 2 in context)',
        '7. Once complete, run process-research-findings.js MCP'
      ],
      critical_note: 'This research informs EVERYTHING: brand identity, website structure, automation selection, marketing strategy. Do not skip or rush this step.'
    };
  }
};

