/**
 * Create Website Design Brief
 * Creates a simple, understandable site plan and wireframe (proposal-style, not technical)
 * This is Step 1 of the website creation process
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates a simple, understandable website design brief with site plan and wireframe in proposal-style format (not technical wireframes)',
  
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
    if (!await fs.pathExists(profilePath)) {
      throw new Error(`Client profile not found for ${client_name}`);
    }

    const profile = await fs.readJson(profilePath);
    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    await fs.ensureDir(websiteDir);

    // Get research-based recommendations if available
    const researchDir = path.join(PROJECT_ROOT, 'clients', client_name, '01_intake', 'research');
    let websiteStructure = profile.website?.structure_recommendations || {
      pages: ['Home', 'About', 'Services', 'Contact'],
      focus_areas: [],
      conversion_elements: []
    };

    // Create simple, understandable site plan (proposal-style)
    const sitePlan = `# Website Site Plan - ${profile.business_name}

## What This Is
This is a simple plan for your website. Think of it like a blueprint for a house - it shows what goes where, but in words you can understand.

## Your Website's Purpose
${profile.website?.purpose || 'To attract new customers and make it easy for them to work with you.'}

## Main Pages (What Visitors Will See)

${websiteStructure.pages.map((page, i) => `
### ${i + 1}. ${page} Page
**What it does:** ${getPagePurpose(page, profile)}
**What visitors will see:**
${getPageContent(page, profile)}
`).join('\n')}

## How Visitors Will Move Through Your Site

${createUserJourney(profile)}

## What Makes People Take Action

${websiteStructure.conversion_elements?.map(el => `- ${el}`).join('\n') || '- Clear call-to-action buttons\n- Contact forms\n- Service inquiry options'}

## Special Features Needed

${getSpecialFeatures(profile)}

## Next Steps
1. Review this plan
2. Approve to move to design (colors, fonts, look & feel)
3. We'll create visual mockups based on this plan

---
**Created:** ${new Date().toLocaleDateString()}
**Status:** Awaiting Approval - Step 1 of Website Creation
`;

    // Create simple wireframe (proposal-style, not technical)
    const wireframe = `# Website Wireframe - ${profile.business_name}

## What This Is
This shows where things go on each page, but in simple terms anyone can understand.

${websiteStructure.pages.map(page => `
## ${page} Page Layout

**Top Section (Header):**
- Your business name/logo
- Navigation menu (links to other pages)
- Phone number or "Get Started" button

**Main Section:**
${getPageLayout(page, profile)}

**Bottom Section (Footer):**
- Contact information
- Social media links
- Legal links (Privacy Policy, Terms)

`).join('\n')}

## Mobile View
On phones, everything stacks vertically:
- Header at top
- Content in middle
- Footer at bottom
- Navigation becomes a menu button

## Desktop View
On computers:
- Header across top
- Content in center (max width for readability)
- Sidebar or columns if needed
- Footer across bottom

---
**Note:** This is a simple layout plan. Actual design (colors, fonts, images) comes next.
**Status:** Awaiting Approval - Step 1 of Website Creation
`;

    // Save files
    await fs.writeFile(path.join(websiteDir, '01-site-plan.md'), sitePlan);
    await fs.writeFile(path.join(websiteDir, '02-wireframe.md'), wireframe);

    // Update profile
    profile.website = profile.website || {};
    profile.website.creation_status = 'step1_site_plan';
    profile.website.site_plan_created = new Date().toISOString();
    profile.website.site_plan_path = path.join(websiteDir, '01-site-plan.md');
    profile.website.wireframe_path = path.join(websiteDir, '02-wireframe.md');
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-create-website-design-brief';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      site_plan_path: path.join(websiteDir, '01-site-plan.md'),
      wireframe_path: path.join(websiteDir, '02-wireframe.md'),
      message: `Website design brief created for ${profile.business_name}. Review and approve to move to Step 2 (Design).`,
      next_step: 'Review site plan and wireframe. Approve to move to aesthetics and design guide.',
      status: 'step1_site_plan_ready_for_review'
    };
  }
};

function getPagePurpose(page, profile) {
  const purposes = {
    'Home': 'The first page visitors see. Shows who you are and what you do.',
    'About': 'Tells your story and why people should choose you.',
    'Services': 'Lists what you offer and how it helps customers.',
    'Contact': 'Makes it easy for people to reach you.',
    'Blog': 'Shows your expertise and helps with search rankings.',
    'Portfolio': 'Shows examples of your work.'
  };
  return purposes[page] || 'Provides important information to visitors.';
}

function getPageContent(page, profile) {
  if (page === 'Home') {
    return `- Big headline that says what you do
- Short description of your business
- Main call-to-action button
- Key benefits or features
- Social proof (testimonials, reviews)`;
  }
  if (page === 'Services') {
    return `- List of services you offer
- Description of each service
- How each service helps customers
- Pricing or "Get Quote" buttons`;
  }
  return `- Relevant information for this page
- Clear headings and easy-to-read text
- Call-to-action buttons`;
}

function createUserJourney(profile) {
  return `**Step 1:** Visitor lands on Home page
**Step 2:** They learn about you (About page or Home)
**Step 3:** They see what you offer (Services page)
**Step 4:** They decide to contact you (Contact page or form)
**Step 5:** You follow up and convert them to a customer`;
}

function getPageLayout(page, profile) {
  if (page === 'Home') {
    return `**Hero Section (Top):**
- Large headline
- Subheadline
- Main button (e.g., "Get Started" or "Contact Us")

**Features Section:**
- 3-4 key benefits or features
- Icons or images
- Short descriptions

**Social Proof Section:**
- Testimonials or reviews
- Client logos (if applicable)

**Call-to-Action Section:**
- Another button to take action
- Contact information`;
  }
  return `**Content Section:**
- Main heading
- Body text with information
- Images if needed
- Call-to-action button`;
}

function getSpecialFeatures(profile) {
  const features = [];
  if (profile.services?.some(s => s.toLowerCase().includes('catering'))) {
    features.push('- Quote calculator (based on event size and date)');
    features.push('- Online reservation/booking system');
  }
  if (profile.services?.some(s => s.toLowerCase().includes('ai receptionist'))) {
    features.push('- Phone number prominently displayed');
    features.push('- "Call Now" buttons');
  }
  if (profile.services?.some(s => s.toLowerCase().includes('appointment'))) {
    features.push('- Calendar integration for booking');
  }
  return features.length > 0 ? features.join('\n') : '- Standard contact forms\n- Service inquiry forms';
}

