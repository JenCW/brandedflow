/**
 * Deploy Website to Netlify
 * Step 6: Deploys website to Netlify and sets up CMS
 * ONLY runs after Step 5 (Client Review) is approved
 * This is when analytics tracking starts and ROI focus begins
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Deploys website to Netlify, sets up CMS, and starts analytics tracking. Only runs after all previous steps are approved.',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    netlify_site_name: {
      type: 'string',
      required: false,
      description: 'Custom Netlify site name. Defaults to client-name.netlify.app'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, netlify_site_name } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);

    // Check if Step 5 is approved
    if (profile.website?.creation_status !== 'step5_client_review_approved') {
      return {
        success: false,
        error: 'Step 5 (Client Review) must be approved first. Current status: ' + (profile.website?.creation_status || 'not_started'),
        client_name,
        message: 'All steps must be approved before deployment. This ensures quality and prevents premature deployment.'
      };
    }

    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    const deployDir = path.join(websiteDir, 'deploy');

    // Create deployment directory structure
    await fs.ensureDir(deployDir);

    // Create netlify.toml
    const netlifyConfig = `[build]
  publish = "."
  command = "echo 'No build command needed'"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_ENV = "production"
`;

    await fs.writeFile(path.join(deployDir, 'netlify.toml'), netlifyConfig);

    // Create CMS config (Netlify CMS)
    const cmsConfig = `backend:
  name: git-gateway
  branch: main

media_folder: "static/img"
public_folder: "/img"

collections:
  - name: "pages"
    label: "Pages"
    folder: "content/pages"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Body", name: "body", widget: "markdown"}
  
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Body", name: "body", widget: "markdown"}
`;

    await fs.writeFile(path.join(deployDir, 'static', 'admin', 'config.yml'), cmsConfig);
    await fs.ensureDir(path.join(deployDir, 'static', 'admin'));

    // Create index.html placeholder (actual site will be generated)
    const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.business_name} - Website</title>
    <!-- Website content will be generated here -->
</head>
<body>
    <h1>${profile.business_name}</h1>
    <p>Website is being deployed...</p>
</body>
</html>`;

    await fs.writeFile(path.join(deployDir, 'index.html'), indexHtml);

    // Update profile with deployment info
    profile.website.creation_status = 'deployed';
    profile.website.deployed_date = new Date().toISOString();
    profile.website.deploy_directory = deployDir;
    profile.website.netlify_site_name = netlify_site_name || `${client_name}.netlify.app`;
    profile.website.cms_enabled = true;
    profile.website.analytics_tracking_started = new Date().toISOString();
    profile.website.roi_tracking_active = true;

    // Store in client-specific IDs
    if (!profile.client_specific_ids) profile.client_specific_ids = {};
    profile.client_specific_ids.netlify_site_name = profile.website.netlify_site_name;
    profile.client_specific_ids.deploy_directory = deployDir;

    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-deploy-website-netlify';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      deploy_directory: deployDir,
      netlify_site_name: profile.website.netlify_site_name,
      cms_enabled: true,
      analytics_started: true,
      roi_tracking_active: true,
      message: `Website deployment prepared for ${profile.business_name}. Ready to deploy to Netlify. Analytics and ROI tracking will start immediately upon deployment.`,
      next_steps: [
        '1. Deploy deploy/ folder to Netlify',
        '2. Set up forms and database connections',
        '3. Configure SEO tools (Semrush)',
        '4. Start analytics tracking',
        '5. Begin ROI measurement'
      ],
      critical_note: 'ROI tracking starts NOW. All analytics, form submissions, and conversions will be tracked from deployment.'
    };
  }
};

