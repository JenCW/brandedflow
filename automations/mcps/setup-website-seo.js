/**
 * Setup Website SEO
 * Sets up comprehensive SEO including Semrush integration
 * Runs after deployment
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Sets up comprehensive SEO including Semrush integration, keyword tracking, and SEO tools. Runs after website deployment.',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    semrush_api_key: {
      type: 'string',
      required: false,
      description: 'Semrush API key (if available)'
    },
    target_keywords: {
      type: 'array',
      required: false,
      description: 'Target keywords to track'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, semrush_api_key, target_keywords = [] } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);

    // Check if website is deployed
    if (profile.website?.creation_status !== 'deployed') {
      return {
        success: false,
        error: 'Website must be deployed first. Current status: ' + (profile.website?.creation_status || 'not_started'),
        client_name
      };
    }

    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    await fs.ensureDir(websiteDir);

    // Get keywords from research if available
    let keywords = target_keywords;
    if (keywords.length === 0) {
      // Extract from research or generate based on industry
      keywords = generateKeywords(profile);
    }

    // Create SEO strategy document
    const seoStrategy = `# SEO Strategy - ${profile.business_name}

## Overview
Comprehensive SEO implementation to drive organic traffic and prove ROI.

## Target Keywords

${keywords.map((kw, i) => `${i + 1}. **${kw.keyword}** (${kw.difficulty || 'Medium'} difficulty)
   - Search Volume: ${kw.volume || 'To be determined'}
   - Intent: ${kw.intent || 'Informational/Commercial'}
`).join('\n')}

## SEO Tools Setup

### Semrush Integration
**Status:** ${semrush_api_key ? 'API key provided' : 'Manual setup required'}
**Purpose:** 
- Keyword tracking
- Competitor analysis
- Backlink monitoring
- Site audit
- Position tracking

**Setup Steps:**
1. Create Semrush account (if not exists)
2. Add website: ${profile.website?.netlify_site_name || profile.business_name}
3. Set up position tracking for target keywords
4. Configure site audit
5. Set up backlink monitoring

### Google Analytics
**Status:** To be configured
**Purpose:**
- Traffic tracking
- Conversion tracking
- User behavior analysis
- ROI measurement

### Google Search Console
**Status:** To be configured
**Purpose:**
- Search performance
- Indexing status
- Mobile usability
- Core Web Vitals

## SEO Implementation

### On-Page SEO
- [ ] Title tags optimized for target keywords
- [ ] Meta descriptions written
- [ ] Header tags (H1, H2, H3) structured properly
- [ ] Alt text for all images
- [ ] Internal linking structure
- [ ] URL structure optimized
- [ ] Schema markup implemented

### Technical SEO
- [ ] Sitemap.xml created and submitted
- [ ] Robots.txt configured
- [ ] Mobile-responsive (already done)
- [ ] Page speed optimized
- [ ] SSL certificate (Netlify handles)
- [ ] 404 page created

### Content SEO
- [ ] Blog/content strategy (if applicable)
- [ ] Keyword-rich content on all pages
- [ ] Local SEO (if applicable)
- [ ] FAQ section (if applicable)

## Keyword Tracking

**Primary Keywords:**
${keywords.slice(0, 5).map(kw => `- ${kw.keyword}`).join('\n')}

**Long-Tail Keywords:**
${keywords.slice(5).map(kw => `- ${kw.keyword}`).join('\n')}

## Competitor Analysis

**Top 5 Competitors:**
${getCompetitors(profile).map(c => `- ${c}`).join('\n')}

**Tracking:**
- Monitor competitor rankings
- Track competitor backlinks
- Analyze competitor content strategy

## ROI Tracking

**Metrics to Track:**
- Organic traffic growth
- Keyword ranking improvements
- Conversion rate from organic traffic
- Revenue attributed to SEO
- Cost per acquisition (organic)

**Reporting:**
- Weekly keyword ranking reports
- Monthly SEO performance reports
- Quarterly ROI analysis

---
**Created:** ${new Date().toLocaleDateString()}
**Status:** SEO Setup Initiated
**Next:** Implement on-page SEO, set up tracking, begin monitoring
`;

    // Save SEO strategy
    await fs.writeFile(path.join(websiteDir, '07-seo-strategy.md'), seoStrategy);

    // Update profile
    profile.website.seo_setup = {
      status: 'initiated',
      semrush_configured: !!semrush_api_key,
      keywords_tracked: keywords.length,
      tracking_started: new Date().toISOString()
    };
    profile.website.seo_keywords = keywords;
    if (semrush_api_key) {
      if (!profile.client_specific_ids) profile.client_specific_ids = {};
      profile.client_specific_ids.semrush_api_key = semrush_api_key;
    }

    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-setup-website-seo';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      seo_strategy_path: path.join(websiteDir, '07-seo-strategy.md'),
      keywords_tracked: keywords.length,
      semrush_configured: !!semrush_api_key,
      message: `SEO setup initiated for ${profile.business_name}. Semrush ${semrush_api_key ? 'configured' : 'setup required'}. ${keywords.length} keywords to track.`,
      next_steps: [
        '1. Implement on-page SEO elements',
        '2. Set up Semrush tracking (if not done)',
        '3. Configure Google Analytics and Search Console',
        '4. Begin keyword ranking monitoring',
        '5. Start ROI tracking'
      ],
      roi_focus: 'SEO ROI tracking will measure organic traffic growth, conversions, and revenue attribution.'
    };
  }
};

function generateKeywords(profile) {
  const industry = profile.industry || 'business';
  const businessName = profile.business_name || '';
  const location = profile.target_market || '';

  const baseKeywords = [
    { keyword: `${industry} services`, difficulty: 'Medium', intent: 'Commercial' },
    { keyword: `best ${industry}`, difficulty: 'High', intent: 'Commercial' },
    { keyword: `${industry} near me`, difficulty: 'Medium', intent: 'Local' }
  ];

  if (location) {
    baseKeywords.push({ keyword: `${industry} ${location}`, difficulty: 'Medium', intent: 'Local' });
  }

  if (businessName) {
    baseKeywords.push({ keyword: businessName, difficulty: 'Low', intent: 'Brand' });
  }

  return baseKeywords;
}

function getCompetitors(profile) {
  // Extract from research if available
  if (profile.research?.findings?.competitors) {
    return profile.research.findings.competitors;
  }
  // Default competitors (would be extracted from research in real implementation)
  return ['Competitor 1', 'Competitor 2', 'Competitor 3', 'Competitor 4', 'Competitor 5'];
}

