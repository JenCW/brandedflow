/**
 * Add Website Features
 * Step 4: Animations, integrations, dynamic elements
 * Only runs after Step 3 (Website Copy) is approved
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Adds animations, integrations, and dynamic elements to website. Step 4 of website creation (only after copy approved)',
  
  params: {
    client_name: {
      type: 'string',
      required: true,
      description: 'Client name in lowercase-kebab-case'
    },
    features: {
      type: 'object',
      required: false,
      description: 'Features to add: animations, integrations, dynamic_elements'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { client_name, features = {} } = params;

    if (!client_name) {
      throw new Error('client_name is required');
    }

    // Load client profile
    const profilePath = path.join(PROJECT_ROOT, 'clients', client_name, 'client-profile.json');
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);

    // Check if Step 3 is approved
    if (profile.website?.creation_status !== 'step3_website_copy_approved') {
      return {
        success: false,
        error: 'Step 3 (Website Copy) must be approved first. Current status: ' + (profile.website?.creation_status || 'not_started'),
        client_name
      };
    }

    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    await fs.ensureDir(websiteDir);

    // Determine features based on profile and services
    const animations = features.animations || getDefaultAnimations(profile);
    const integrations = features.integrations || getDefaultIntegrations(profile);
    const dynamicElements = features.dynamic_elements || getDefaultDynamicElements(profile);

    // Create features document
    const featuresDoc = `# Website Features - ${profile.business_name}

## What This Is
This document lists all the interactive features, animations, and integrations that will be added to your website.

## Animations

${animations.map(anim => `### ${anim.name}
**What it does:** ${anim.description}
**Where it appears:** ${anim.location}
**Why we're using it:** ${anim.reason}
`).join('\n')}

## Integrations

${integrations.map(int => `### ${int.name}
**What it does:** ${int.description}
**How it works:** ${int.how_it_works}
**What it connects to:** ${int.connects_to}
`).join('\n')}

## Dynamic Elements

${dynamicElements.map(elem => `### ${elem.name}
**What it does:** ${elem.description}
**How it works:** ${elem.how_it_works}
**User experience:** ${elem.user_experience}
`).join('\n')}

## Technical Implementation Notes

${getTechnicalNotes(profile, animations, integrations, dynamicElements)}

## Next Steps
1. Review all features
2. Approve to move to Step 5 (Client Review)
3. Client will review entire website before deployment

---
**Created:** ${new Date().toLocaleDateString()}
**Status:** Awaiting Approval - Step 4 of Website Creation
`;

    // Save file
    await fs.writeFile(path.join(websiteDir, '06-website-features.md'), featuresDoc);

    // Update profile
    profile.website.creation_status = 'step4_features';
    profile.website.features_created = new Date().toISOString();
    profile.website.features_path = path.join(websiteDir, '06-website-features.md');
    profile.website.features = {
      animations,
      integrations,
      dynamic_elements: dynamicElements
    };
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-add-website-features';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      features_path: path.join(websiteDir, '06-website-features.md'),
      features: {
        animations: animations.length,
        integrations: integrations.length,
        dynamic_elements: dynamicElements.length
      },
      message: `Website features added for ${profile.business_name}. Review and approve to move to Step 5 (Client Review).`,
      next_step: 'Review all features. Approve to send to client for review.',
      status: 'step4_features_ready_for_review'
    };
  }
};

function getDefaultAnimations(profile) {
  const animations = [
    {
      name: 'Smooth Scroll',
      description: 'When clicking navigation links, page scrolls smoothly instead of jumping',
      location: 'Navigation menu',
      reason: 'Better user experience, feels more polished'
    },
    {
      name: 'Fade In on Scroll',
      description: 'Content fades in as user scrolls down the page',
      location: 'All sections',
      reason: 'Draws attention to content, feels modern'
    }
  ];

  if (profile.variations?.animations === 'yes' || profile.services?.some(s => s.toLowerCase().includes('animation'))) {
    animations.push({
      name: 'Hover Effects',
      description: 'Buttons and links change appearance when mouse hovers over them',
      location: 'All buttons and links',
      reason: 'Interactive feedback, shows elements are clickable'
    });
  }

  return animations;
}

function getDefaultIntegrations(profile) {
  const integrations = [];

  // CRM Integration
  if (profile.variations?.tech_stack?.crm === 'airtable' || profile.services?.some(s => s.toLowerCase().includes('crm'))) {
    integrations.push({
      name: 'Airtable CRM',
      description: 'All form submissions automatically go to Airtable database',
      how_it_works: 'When someone fills out a form, their information is instantly added to your CRM',
      connects_to: 'Airtable base'
    });
  }

  // Email Integration
  if (profile.variations?.tech_stack?.email === 'gmail' || profile.variations?.tech_stack?.email === 'outlook') {
    integrations.push({
      name: 'Email Notifications',
      description: 'You get an email when someone contacts you through the website',
      how_it_works: 'Form submissions trigger an email to your inbox',
      connects_to: profile.variations?.tech_stack?.email || 'Email provider'
    });
  }

  // Calendar Integration
  if (profile.variations?.tech_stack?.calendar) {
    integrations.push({
      name: 'Calendar Booking',
      description: 'Visitors can book appointments directly from the website',
      how_it_works: 'Calendar widget shows your availability, visitors select a time',
      connects_to: profile.variations?.tech_stack?.calendar
    });
  }

  // iAnswering.ai Integration
  if (profile.services?.some(s => s.toLowerCase().includes('ai receptionist') || s.toLowerCase().includes('ianswering'))) {
    integrations.push({
      name: 'iAnswering.ai Phone System',
      description: 'Phone number on website connects to AI receptionist',
      how_it_works: 'When visitors click "Call Now", it connects to your AI receptionist',
      connects_to: 'iAnswering.ai account'
    });
  }

  // OpenTable or similar
  if (profile.services?.some(s => s.toLowerCase().includes('reservation') || s.toLowerCase().includes('booking'))) {
    integrations.push({
      name: 'Reservation System',
      description: 'Online reservation/booking system',
      how_it_works: 'Visitors can book tables or appointments directly on the website',
      connects_to: 'Reservation platform'
    });
  }

  return integrations;
}

function getDefaultDynamicElements(profile) {
  const elements = [];

  // Quote Calculator
  if (profile.services?.some(s => s.toLowerCase().includes('catering') || s.toLowerCase().includes('quote'))) {
    elements.push({
      name: 'Quote Calculator',
      description: 'Interactive calculator that gives instant quotes based on event details',
      how_it_works: 'Visitor enters event size, date, time. Calculator shows estimated price.',
      user_experience: 'Instant pricing without waiting for a callback'
    });
  }

  // Contact Forms
  elements.push({
    name: 'Contact Forms',
    description: 'Forms that capture visitor information',
    how_it_works: 'Visitor fills out form, information goes to CRM and triggers email notification',
    user_experience: 'Easy way for visitors to reach out'
  });

  // Live Chat (if chatbot service)
  if (profile.services?.some(s => s.toLowerCase().includes('chatbot'))) {
    elements.push({
      name: 'Website Chatbot',
      description: 'AI chatbot that answers questions 24/7',
      how_it_works: 'Chatbot appears in corner, visitors can ask questions, chatbot responds',
      user_experience: 'Instant answers, no waiting'
    });
  }

  return elements;
}

function getTechnicalNotes(profile, animations, integrations, dynamicElements) {
  return `**Animation Library:** CSS transitions and JavaScript for smooth effects
**Integration Method:** API connections and webhooks
**Form Handling:** Serverless functions (Netlify Functions)
**Database:** Airtable for CRM data
**Analytics:** Google Analytics and custom tracking (to be set up on deployment)`;
}

