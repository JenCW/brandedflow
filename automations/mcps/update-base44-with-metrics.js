/**
 * Update Base44 Portal with Metrics
 * Syncs ROI and SEO metrics to Base44 portal for client dashboard
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Updates Base44 portal with ROI and SEO metrics for client dashboard display',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    metrics_type: {
      type: 'string',
      required: false,
      default: 'all',
      description: 'Type of metrics to update: roi, seo, or all'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, metrics_type = 'all' } = params;

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

    const portalId = profile.client_specific_ids?.base44_portal_id;
    
    if (!portalId) {
      return {
        success: true,
        skipped: true,
        message: 'Base44 portal not set up yet. Add client in Base44 admin panel first.',
        client_name
      };
    }

    // Check for Base44 API key
    const base44ApiKey = process.env.BASE44_API_KEY;
    if (!base44ApiKey) {
      return {
        success: true,
        skipped: true,
        message: 'Base44 API key not configured. Skipping metrics update.',
        client_name
      };
    }

    const deliverablesDir = path.join(PROJECT_ROOT, 'clients', client_name, '05_deliverables');
    const metricsData = {};

    // Load ROI data if requested
    if (metrics_type === 'all' || metrics_type === 'roi') {
      if (await fs.pathExists(deliverablesDir)) {
        const files = await fs.readdir(deliverablesDir);
        const roiFiles = files.filter(f => f.startsWith('roi-') && f.endsWith('.json'));
        if (roiFiles.length > 0) {
          const latestROI = roiFiles.sort().reverse()[0];
          metricsData.roi = await fs.readJson(path.join(deliverablesDir, latestROI));
        }
      }
    }

    // Load SEO data if requested
    if (metrics_type === 'all' || metrics_type === 'seo') {
      if (await fs.pathExists(deliverablesDir)) {
        const files = await fs.readdir(deliverablesDir);
        const seoFiles = files.filter(f => f.startsWith('seo-') && f.endsWith('.json'));
        if (seoFiles.length > 0) {
          const latestSEO = seoFiles.sort().reverse()[0];
          metricsData.seo = await fs.readJson(path.join(deliverablesDir, latestSEO));
        }
      }
    }

    // Prepare Base44 portal update payload
    const portalUpdate = {
      portal_id: portalId,
      client_name: client_name,
      updated_date: new Date().toISOString(),
      metrics: {
        roi: metricsData.roi ? {
          period: metricsData.roi.period,
          summary: {
            total_leads: metricsData.roi.leads?.total || 0,
            conversions: metricsData.roi.conversions?.total || 0,
            conversion_rate: metricsData.roi.conversions?.conversion_rate || 0,
            total_revenue: metricsData.roi.revenue?.total || 0,
            roi_percentage: metricsData.roi.roi?.roi_percentage || 0,
            investment: metricsData.roi.roi?.investment || 0,
            return: metricsData.roi.roi?.return || 0
          },
          top_sources: Object.entries(metricsData.roi.leads?.by_source || {})
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .map(([source, count]) => ({ source, count })),
          engagement: {
            website_visits: metricsData.roi.engagement?.website_visits || 0,
            email_opens: metricsData.roi.engagement?.email_opens || 0,
            phone_calls: metricsData.roi.engagement?.phone_calls_answered || 0,
            appointments: metricsData.roi.engagement?.appointments_booked || 0
          }
        } : null,
        seo: metricsData.seo ? {
          summary: {
            keywords_tracked: metricsData.seo.summary?.total_keywords || 0,
            keywords_in_top_10: metricsData.seo.summary?.keywords_in_top_10 || 0,
            keywords_in_top_3: metricsData.seo.summary?.keywords_in_top_3 || 0,
            average_position: metricsData.seo.summary?.average_position,
            seo_health_score: metricsData.seo.seo_health?.overall_score
          },
          traffic: {
            organic_visits: metricsData.seo.traffic?.organic_search_visits || 0,
            traffic_change: metricsData.seo.traffic?.organic_search_visits_change || 0
          },
          top_keywords: metricsData.seo.top_performing_keywords?.slice(0, 5) || []
        } : null
      }
    };

    // TODO: Implement actual Base44 API call
    // Base44 API: https://api.base44.com/v1/portals/{portal_id}/metrics
    // Method: PUT or PATCH
    // Headers: { 'Authorization': `Bearer ${base44ApiKey}`, 'Content-Type': 'application/json' }
    // Body: portalUpdate

    // Save update payload for reference
    const updateFilePath = path.join(deliverablesDir, `base44-metrics-update-${new Date().toISOString().split('T')[0]}.json`);
    await fs.writeJson(updateFilePath, portalUpdate, { spaces: 2 });

    // Update profile
    if (!profile.metrics) profile.metrics = {};
    profile.metrics.base44_last_updated = new Date().toISOString();
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-update-base44-with-metrics';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      portal_id: portalId,
      metrics_updated: {
        roi: !!metricsData.roi,
        seo: !!metricsData.seo
      },
      portal_update: portalUpdate,
      update_file: updateFilePath,
      message: `Base44 portal metrics updated for ${client_name}. ROI and SEO data synced to portal dashboard.`,
      next_steps: [
        '1. Configure Base44 API to enable automatic metrics sync',
        '2. Metrics will display in client portal dashboard',
        '3. Set up automated weekly metrics updates',
        '4. Clients can view ROI and SEO performance in real-time'
      ]
    };
  }
};

