/**
 * Process Research Findings
 * Processes completed research and generates brand guidelines, website recommendations, and automation priorities
 * This connects research → brand → website → automations
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Processes completed research findings and generates brand guidelines, website structure, automation priorities, and strategic recommendations. This connects research to all subsequent work.',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name } = params;

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
        error: 'Client profile not found.',
        client_name
      };
    }

    const researchDir = path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research');
    
    if (!await fs.pathExists(researchDir)) {
      return {
        success: false,
        error: 'Research directory not found. Run trigger-client-research first.',
        client_name
      };
    }

    // Load research reports
    const phase1File = path.join(researchDir, '01-market-competitive-analysis.md');
    const phase2File = path.join(researchDir, '02-buyer-personas.md');
    const phase3File = path.join(researchDir, '03-strategic-recommendations.md');

    let phase1Content = '';
    let phase2Content = '';
    let phase3Content = '';

    if (await fs.pathExists(phase1File)) {
      phase1Content = await fs.readFile(phase1File, 'utf-8');
    } else {
      return {
        success: false,
        error: 'Phase 1 research not found. Complete market analysis first.',
        client_name
      };
    }

    if (await fs.pathExists(phase2File)) {
      phase2Content = await fs.readFile(phase2File, 'utf-8');
    }

    if (await fs.pathExists(phase3File)) {
      phase3Content = await fs.readFile(phase3File, 'utf-8');
    }

    // Extract key insights from research
    const insights = {
      market_trends: extractSection(phase1Content, ['trend', 'emerging', 'market trend']),
      competitive_gaps: extractSection(phase1Content, ['gap', 'niche', 'opportunity', 'exploit']),
      buyer_personas: phase2Content ? extractPersonas(phase2Content) : [],
      strategic_recommendations: phase3Content ? extractRecommendations(phase3Content) : {},
      brand_positioning: phase3Content ? extractSection(phase3Content, ['brand', 'positioning', 'authority', 'messaging']) : '',
      website_recommendations: phase3Content ? extractSection(phase3Content, ['website', 'structure', 'pages', 'content']) : '',
      automation_priorities: phase3Content ? extractSection(phase3Content, ['automation', 'workflow', 'priority']) : ''
    };

    // Generate brand guidelines from research
    const brandGuidelines = {
      client_name: client_name,
      business_name: profile.business_name || client_name,
      generated_date: new Date().toISOString(),
      based_on_research: true,
      
      // Brand Positioning (from research)
      positioning: {
        market_position: insights.brand_positioning || 'To be determined from research',
        unique_value_proposition: extractUniqueValue(phase3Content),
        authority_angle: extractAuthority(phase3Content),
        competitive_differentiation: insights.competitive_gaps
      },
      
      // Brand Personality (from buyer personas)
      personality: {
        tone: extractTone(phase2Content, phase3Content),
        voice: extractVoice(phase2Content, phase3Content),
        style: extractStyle(phase1Content, phase3Content),
        messaging_framework: extractMessaging(phase3Content)
      },
      
      // Visual Identity Recommendations
      visual_identity: {
        design_style: recommendDesignStyle(insights),
        color_palette_recommendations: recommendColors(insights),
        typography_recommendations: recommendTypography(insights),
        logo_style: recommendLogoStyle(insights)
      },
      
      // Content Strategy
      content_strategy: {
        key_messages: extractKeyMessages(phase3Content),
        content_themes: extractContentThemes(insights),
        content_types: recommendContentTypes(insights),
        seo_focus: extractSEO(phase3Content)
      }
    };

    // Generate website structure recommendations
    const websiteStructure = {
      recommended_pages: extractWebsitePages(phase3Content),
      content_focus: extractWebsiteContent(phase3Content),
      conversion_elements: extractConversionElements(phase3Content),
      seo_optimization: extractSEO(phase3Content),
      user_journey: mapUserJourney(phase2Content, phase3Content)
    };

    // Generate automation priorities
    const automationPriorities = {
      high_priority: extractHighPriorityAutomations(phase3Content, insights),
      medium_priority: extractMediumPriorityAutomations(phase3Content, insights),
      recommended_quick_starts: recommendQuickStarts(insights, profile),
      integration_needs: extractIntegrationNeeds(phase3Content)
    };

    // Save all outputs
    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    await fs.ensureDir(deliverablesDir);

    // Save brand guidelines
    const brandGuidelinesPath = path.join(deliverablesDir, 'brand-guidelines-from-research.json');
    await fs.writeJson(brandGuidelinesPath, brandGuidelines, { spaces: 2 });

    // Save website structure
    const websiteStructurePath = path.join(deliverablesDir, 'website-structure-recommendations.json');
    await fs.writeJson(websiteStructurePath, websiteStructure, { spaces: 2 });

    // Save automation priorities
    const automationPrioritiesPath = path.join(deliverablesDir, 'automation-priorities.json');
    await fs.writeJson(automationPrioritiesPath, automationPriorities, { spaces: 2 });

    // Update brand folder with research-based recommendations
    const brandDir = path.join(PROJECT_ROOT, 'clients', client_name, '02_brand');
    await fs.ensureDir(brandDir);

    const brandFromResearch = `# Brand Guidelines - ${profile.business_name || client_name}
**Generated from Research:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Based on:** Market analysis, competitive research, buyer personas, strategic recommendations

---

## Brand Positioning

${brandGuidelines.positioning.market_position}

**Unique Value Proposition:**
${brandGuidelines.positioning.unique_value_proposition || 'To be determined'}

**Authority Angle:**
${brandGuidelines.positioning.authority_angle || 'To be determined'}

---

## Brand Personality

**Tone:** ${brandGuidelines.personality.tone || 'To be determined'}
**Voice:** ${brandGuidelines.personality.voice || 'To be determined'}
**Style:** ${brandGuidelines.personality.style || 'To be determined'}

---

## Visual Identity Recommendations

**Design Style:** ${brandGuidelines.visual_identity.design_style || 'To be determined'}
**Color Palette:** ${brandGuidelines.visual_identity.color_palette_recommendations || 'To be determined'}
**Typography:** ${brandGuidelines.visual_identity.typography_recommendations || 'To be determined'}

---

## Content Strategy

**Key Messages:**
${brandGuidelines.content_strategy.key_messages || 'To be determined'}

**Content Themes:**
${brandGuidelines.content_strategy.content_themes || 'To be determined'}

---

**Note:** These guidelines are based on comprehensive market research and should inform all brand, website, and marketing decisions.
`;

    await fs.writeFile(path.join(brandDir, 'brand-guidelines-from-research.md'), brandFromResearch);

    // Update client profile with research findings
    profile.research.status = 'completed';
    profile.research.completed_date = new Date().toISOString();
    profile.research.findings = {
      brand_guidelines: brandGuidelinesPath,
      website_structure: websiteStructurePath,
      automation_priorities: automationPrioritiesPath
    };
    
    // Update brand variations from research
    if (!profile.variations) profile.variations = {};
    if (!profile.variations.brand) profile.variations.brand = {};
    
    profile.variations.brand.positioning = brandGuidelines.positioning;
    profile.variations.brand.personality = brandGuidelines.personality;
    profile.variations.brand.visual_identity = brandGuidelines.visual_identity;
    profile.variations.brand.content_strategy = brandGuidelines.content_strategy;
    profile.variations.brand.research_based = true;
    
    // Update website recommendations
    if (!profile.website) profile.website = {};
    profile.website.structure_recommendations = websiteStructure;
    profile.website.research_based = true;
    
    // Update automation priorities
    if (!profile.automations) profile.automations = {};
    profile.automations.priorities = automationPriorities;
    profile.automations.research_based = true;
    
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-process-research-findings';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    // Auto-sync to Base44 if portal exists
    if (profile.client_specific_ids && profile.client_specific_ids.base44_portal_id) {
      // Research findings will trigger Base44 sync automatically
      // The sync-folder-to-base44 watcher will detect the changes
      console.log('Base44 portal exists - research findings will sync automatically');
    }

    return {
      success: true,
      client_name,
      research_processed: true,
      outputs: {
        brand_guidelines: brandGuidelinesPath,
        website_structure: websiteStructurePath,
        automation_priorities: automationPrioritiesPath,
        brand_folder_updated: path.join(brandDir, 'brand-guidelines-from-research.md')
      },
      message: `Research findings processed for ${client_name}. Brand guidelines, website structure, and automation priorities generated. Base44 portal will sync automatically. All subsequent work should reference these research-based recommendations.`,
      next_steps: [
        '1. Review brand guidelines (brand-guidelines-from-research.json)',
        '2. Review website structure recommendations',
        '3. Review automation priorities',
        '4. Use these recommendations to build brand identity',
        '5. Use these recommendations to structure website',
        '6. Use these priorities to select and build automations'
      ],
      critical_note: 'All brand, website, and automation decisions should now reference these research-based recommendations. This research is the foundation for everything.'
    };
  }
};

// Helper functions to extract insights from research
function extractSection(content, keywords) {
  if (!content) return '';
  // Simple extraction - in production, use more sophisticated NLP
  const lines = content.split('\n');
  const relevant = lines.filter(line => 
    keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()))
  );
  return relevant.join('\n').substring(0, 1000);
}

function extractPersonas(content) {
  if (!content) return [];
  // Extract persona sections
  const personaMatches = content.match(/#+\s*Persona\s*\d+|#+\s*Buyer\s*Persona/gi);
  return personaMatches ? personaMatches.length : 0;
}

function extractRecommendations(content) {
  if (!content) return {};
  return {
    lead_generation: extractSection(content, ['lead', 'generation', 'obtain']),
    conversion: extractSection(content, ['convert', 'conversion', 'customer']),
    focus_areas: extractSection(content, ['gap', 'niche', 'focus', 'target'])
  };
}

function extractUniqueValue(content) {
  return extractSection(content, ['unique', 'value', 'proposition', 'different']);
}

function extractAuthority(content) {
  return extractSection(content, ['authority', 'expert', 'leader', 'trusted']);
}

function extractTone(personasContent, strategyContent) {
  const combined = (personasContent || '') + (strategyContent || '');
  if (combined.includes('professional')) return 'professional';
  if (combined.includes('friendly')) return 'friendly';
  if (combined.includes('luxury')) return 'luxury';
  return 'professional';
}

function extractVoice(personasContent, strategyContent) {
  const combined = (personasContent || '') + (strategyContent || '');
  if (combined.includes('conversational')) return 'conversational';
  if (combined.includes('authoritative')) return 'authoritative';
  return 'conversational';
}

function extractStyle(marketContent, strategyContent) {
  const combined = (marketContent || '') + (strategyContent || '');
  if (combined.includes('modern') || combined.includes('bright')) return 'modern-bright-editorial';
  if (combined.includes('luxury') || combined.includes('dark')) return 'dark-luxury-flowy';
  return 'modern-bright-editorial';
}

function extractMessaging(content) {
  return extractSection(content, ['messaging', 'message', 'communication']);
}

function recommendDesignStyle(insights) {
  // Logic to recommend design style based on research
  if (insights.brand_positioning?.includes('luxury')) return 'dark-luxury-flowy';
  return 'modern-bright-editorial';
}

function recommendColors(insights) {
  // Logic to recommend colors based on industry/personas
  return 'To be determined from research analysis';
}

function recommendTypography(insights) {
  return 'To be determined from research analysis';
}

function recommendLogoStyle(insights) {
  return 'To be determined from research analysis';
}

function extractKeyMessages(content) {
  return extractSection(content, ['message', 'key', 'main']);
}

function extractContentThemes(insights) {
  return insights.market_trends || 'To be determined';
}

function recommendContentTypes(insights) {
  return ['blog', 'social', 'email', 'case studies'];
}

function extractSEO(content) {
  return extractSection(content, ['seo', 'search', 'ranking', 'keyword']);
}

function extractWebsitePages(content) {
  return ['Home', 'About', 'Services', 'Contact']; // Default, should be extracted from research
}

function extractWebsiteContent(content) {
  return extractSection(content, ['website', 'content', 'pages']);
}

function extractConversionElements(content) {
  return extractSection(content, ['convert', 'cta', 'form', 'booking']);
}

function mapUserJourney(personasContent, strategyContent) {
  return 'To be mapped from buyer personas';
}

function extractHighPriorityAutomations(strategyContent, insights) {
  const automations = [];
  if (strategyContent?.includes('lead')) automations.push('Lead Magnet + Delivery');
  if (strategyContent?.includes('email')) automations.push('Email Marketing');
  if (strategyContent?.includes('phone') || strategyContent?.includes('call')) automations.push('AI Receptionist');
  return automations;
}

function extractMediumPriorityAutomations(strategyContent, insights) {
  return ['CRM & Pipeline Setup', 'Social Media Content'];
}

function recommendQuickStarts(insights, profile) {
  // Recommend Quick Starts based on research and client needs
  const recommended = [];
  if (profile.services?.includes('Website')) recommended.push('Website Launch System');
  if (profile.services?.includes('Lead Magnet')) recommended.push('Lead Magnet + Delivery System');
  if (profile.services?.includes('AI Receptionist')) recommended.push('AI Receptionist Setup');
  return recommended;
}

function extractIntegrationNeeds(content) {
  return extractSection(content, ['integration', 'connect', 'sync']);
}

