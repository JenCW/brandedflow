/**
 * Generate SEO Report
 * Creates comprehensive SEO report for client dashboard
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Generates comprehensive SEO report combining rankings, traffic, and recommendations for Base44 portal',
  
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

    // Load latest ranking data if exists
    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    let rankingData = null;
    let roiData = null;
    
    // Find latest ranking file
    if (await fs.pathExists(deliverablesDir)) {
      const files = await fs.readdir(deliverablesDir);
      const rankingFiles = files.filter(f => f.startsWith('seo-rankings-'));
      if (rankingFiles.length > 0) {
        const latestRanking = rankingFiles.sort().reverse()[0];
        rankingData = await fs.readJson(path.join(deliverablesDir, latestRanking));
      }
      
      // Find latest ROI file
      const roiFiles = files.filter(f => f.startsWith('roi-'));
      if (roiFiles.length > 0) {
        const latestROI = roiFiles.sort().reverse()[0];
        roiData = await fs.readJson(path.join(deliverablesDir, latestROI));
      }
    }

    const businessName = profile.business_name || client_name;
    const websiteUrl = profile.website_url || profile.client_specific_ids?.website_url || 'Not deployed';

    // Generate comprehensive SEO report
    const seoReport = {
      client_name: client_name,
      business_name: businessName,
      website_url: websiteUrl,
      report_date: new Date().toISOString(),
      
      // Executive Summary
      executive_summary: {
        seo_health_score: rankingData?.seo_health?.overall_score || 'Not calculated',
        keywords_in_top_10: rankingData?.summary?.keywords_in_top_10 || 0,
        organic_traffic: rankingData?.traffic?.organic_search_visits || 0,
        traffic_growth: rankingData?.traffic?.organic_search_visits_change || 0,
        top_ranking_keyword: rankingData?.top_performing_keywords?.[0]?.keyword || 'None',
        recommendations_count: rankingData?.keywords_needing_optimization?.length || 0
      },
      
      // Keyword Performance
      keyword_performance: {
        total_keywords_tracked: rankingData?.summary?.total_keywords || 0,
        keywords_in_top_10: rankingData?.summary?.keywords_in_top_10 || 0,
        keywords_in_top_3: rankingData?.summary?.keywords_in_top_3 || 0,
        average_position: rankingData?.summary?.average_position || null,
        top_keywords: rankingData?.top_performing_keywords?.slice(0, 10) || [],
        keywords_to_optimize: rankingData?.keywords_needing_optimization?.slice(0, 5) || []
      },
      
      // Traffic Analysis
      traffic_analysis: {
        organic_search_visits: rankingData?.traffic?.organic_search_visits || 0,
        traffic_change_percentage: rankingData?.traffic?.organic_search_visits_change || 0,
        top_landing_pages: rankingData?.traffic?.top_landing_pages?.slice(0, 5) || [],
        top_keywords_driving_traffic: rankingData?.traffic?.top_keywords_driving_traffic?.slice(0, 5) || []
      },
      
      // SEO Health
      seo_health: rankingData?.seo_health || {
        overall_score: null,
        technical_seo: { score: null, issues: [] },
        on_page_seo: { score: null, issues: [] },
        off_page_seo: { score: null, backlinks: 0, domain_authority: null },
        content_quality: { score: null, issues: [] }
      },
      
      // Recommendations
      recommendations: [
        ...(rankingData?.keywords_needing_optimization?.slice(0, 3).map(k => ({
          type: 'keyword_optimization',
          priority: 'high',
          keyword: k.keyword,
          current_position: k.current_position,
          target_position: 10,
          action: `Optimize content and build backlinks for "${k.keyword}"`
        })) || []),
        ...(rankingData?.seo_health?.technical_seo?.issues?.slice(0, 2).map(issue => ({
          type: 'technical_seo',
          priority: 'medium',
          issue: issue,
          action: `Fix technical SEO issue: ${issue}`
        })) || []),
        ...(rankingData?.seo_health?.on_page_seo?.issues?.slice(0, 2).map(issue => ({
          type: 'on_page_seo',
          priority: 'medium',
          issue: issue,
          action: `Improve on-page SEO: ${issue}`
        })) || [])
      ],
      
      // ROI Connection (if available)
      roi_connection: roiData ? {
        leads_from_organic_search: roiData.leads?.by_source?.website || 0,
        conversions_from_organic: 0, // Calculate from ROI data
        revenue_from_organic: 0 // Calculate from ROI data
      } : null
    };

    // Save report
    const reportFilePath = path.join(deliverablesDir, `seo-report-${new Date().toISOString().split('T')[0]}.json`);
    await fs.writeJson(reportFilePath, seoReport, { spaces: 2 });

    // Generate markdown report for Base44
    const markdownReport = `# SEO Performance Report - ${businessName}

**Report Date:** ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
**Website:** ${websiteUrl}

---

## 📊 Executive Summary

- **SEO Health Score:** ${seoReport.executive_summary.seo_health_score}/100
- **Keywords in Top 10:** ${seoReport.executive_summary.keywords_in_top_10}
- **Organic Traffic:** ${seoReport.executive_summary.organic_traffic.toLocaleString()} visits
- **Traffic Growth:** ${seoReport.executive_summary.traffic_growth > 0 ? '+' : ''}${seoReport.executive_summary.traffic_growth}%
- **Top Ranking Keyword:** "${seoReport.executive_summary.top_ranking_keyword}"

---

## 🎯 Keyword Performance

**Total Keywords Tracked:** ${seoReport.keyword_performance.total_keywords_tracked}
**Keywords in Top 10:** ${seoReport.keyword_performance.keywords_in_top_10}
**Keywords in Top 3:** ${seoReport.keyword_performance.keywords_in_top_3}
**Average Position:** ${seoReport.keyword_performance.average_position || 'Not ranked'}

### Top Performing Keywords
${seoReport.keyword_performance.top_keywords.map((k, i) => `${i + 1}. "${k.keyword}" - Position ${k.current_position}`).join('\n') || 'None yet'}

### Keywords Needing Optimization
${seoReport.keyword_performance.keywords_to_optimize.map((k, i) => `${i + 1}. "${k.keyword}" - Currently ${k.current_position || 'Not ranked'}`).join('\n') || 'None'}

---

## 📈 Traffic Analysis

**Organic Search Visits:** ${seoReport.traffic_analysis.organic_search_visits.toLocaleString()}
**Traffic Change:** ${seoReport.traffic_analysis.traffic_change_percentage > 0 ? '+' : ''}${seoReport.traffic_analysis.traffic_change_percentage}%

### Top Landing Pages
${seoReport.traffic_analysis.top_landing_pages.map((p, i) => `${i + 1}. ${p.page} - ${p.visits} visits`).join('\n') || 'No data yet'}

---

## 🔧 SEO Health

**Overall Score:** ${seoReport.seo_health.overall_score || 'Not calculated'}/100

- **Technical SEO:** ${seoReport.seo_health.technical_seo.score || 'Not calculated'}/100
- **On-Page SEO:** ${seoReport.seo_health.on_page_seo.score || 'Not calculated'}/100
- **Off-Page SEO:** ${seoReport.seo_health.off_page_seo.score || 'Not calculated'}/100
- **Content Quality:** ${seoReport.seo_health.content_quality.score || 'Not calculated'}/100

---

## 💡 Recommendations

${seoReport.recommendations.map((r, i) => `### ${i + 1}. ${r.action}\n**Priority:** ${r.priority}\n**Type:** ${r.type}`).join('\n\n') || 'No recommendations at this time.'}

---

**Next Update:** ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
`;

    const markdownPath = path.join(deliverablesDir, `seo-report-${new Date().toISOString().split('T')[0]}.md`);
    await fs.writeFile(markdownPath, markdownReport);

    return {
      success: true,
      client_name,
      seo_report: seoReport,
      report_files: {
        json: reportFilePath,
        markdown: markdownPath
      },
      message: `SEO report generated for ${client_name}. Ready for Base44 portal display.`,
      base44_data: seoReport // This will be sent to Base44 portal
    };
  }
};

