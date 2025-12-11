/**
 * Generate Website Copy
 * Step 3: Creates all website copy (headlines, body text, CTAs)
 * Only runs after Step 2 (Design Guide) is approved
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Generates all website copy including headlines, body text, and CTAs. Step 3 of website creation (only after design guide approved)',
  
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

    // Check if Step 2 is approved
    if (profile.website?.creation_status !== 'step2_design_guide_approved') {
      return {
        success: false,
        error: 'Step 2 (Design Guide) must be approved first. Current status: ' + (profile.website?.creation_status || 'not_started'),
        client_name
      };
    }

    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    await fs.ensureDir(websiteDir);

    // Get pages from site plan
    const sitePlanPath = path.join(websiteDir, '01-site-plan.md');
    let pages = ['Home', 'About', 'Services', 'Contact'];
    if (await fs.pathExists(sitePlanPath)) {
      const sitePlan = await fs.readFile(sitePlanPath, 'utf-8');
      // Extract pages from site plan (simple extraction)
      const pageMatches = sitePlan.match(/### \d+\. (.+?) Page/g);
      if (pageMatches) {
        pages = pageMatches.map(m => m.replace(/### \d+\. (.+?) Page/, '$1'));
      }
    }

    // Generate copy for each page
    const websiteCopy = `# Website Copy - ${profile.business_name}

## What This Is
This is all the text that will appear on your website. Every headline, paragraph, and button.

${pages.map(page => `
## ${page} Page Copy

${generatePageCopy(page, profile)}
`).join('\n')}

## Call-to-Action Buttons

${generateCTAs(profile)}

## Forms

${generateFormCopy(profile)}

---
**Created:** ${new Date().toLocaleDateString()}
**Status:** Awaiting Approval - Step 3 of Website Creation
**Note:** Review all copy carefully. This is what visitors will read.
`;

    // Save file
    await fs.writeFile(path.join(websiteDir, '05-website-copy.md'), websiteCopy);

    // Update profile
    profile.website.creation_status = 'step3_website_copy';
    profile.website.website_copy_created = new Date().toISOString();
    profile.website.website_copy_path = path.join(websiteDir, '05-website-copy.md');
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-generate-website-copy';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      website_copy_path: path.join(websiteDir, '05-website-copy.md'),
      message: `Website copy generated for ${profile.business_name}. Review and approve to move to Step 4 (Animations & Integrations).`,
      next_step: 'Review all copy. Approve to move to animations, integrations, and dynamic elements.',
      status: 'step3_website_copy_ready_for_review'
    };
  }
};

function generatePageCopy(page, profile) {
  const businessName = profile.business_name;
  const industry = profile.industry || 'business';
  const tone = profile.variations?.brand?.tone || 'professional';

  if (page === 'Home') {
    return `**Main Headline:**
${getHeadline(businessName, industry, tone)}

**Subheadline:**
${getSubheadline(businessName, industry)}

**Hero Section Text:**
${getHeroText(businessName, industry, profile)}

**Key Benefits (3-4 points):**
${getKeyBenefits(profile)}

**Social Proof:**
${getSocialProof(profile)}`;
  }

  if (page === 'About') {
    return `**Page Headline:**
About ${businessName}

**Main Story:**
${profile.business_story || `We are ${businessName}, a ${industry} business dedicated to serving our customers with excellence.`}

**Why Choose Us:**
${getWhyChooseUs(profile)}

**Our Values:**
${getValues(profile)}`;
  }

  if (page === 'Services') {
    return `**Page Headline:**
Our Services

**Introduction:**
${getServicesIntro(profile)}

${profile.services?.map(service => `
**${service}:**
${getServiceDescription(service, profile)}
`).join('\n') || 'Services to be detailed'}`;
  }

  if (page === 'Contact') {
    return `**Page Headline:**
Get In Touch

**Introduction:**
Ready to work together? We'd love to hear from you.

**Contact Information:**
- Email: ${profile.contact_email || '[Your email]'}
- Phone: ${profile.contact_phone || '[Your phone]'}

**Form Headline:**
Send Us a Message

**Form Description:**
Fill out the form below and we'll get back to you within 24 hours.`;
  }

  return `**Page Headline:**
${page}

**Content:**
[Content for ${page} page to be developed]`;
}

function getHeadline(businessName, industry, tone) {
  if (tone === 'luxury') return `Experience Excellence with ${businessName}`;
  if (tone === 'friendly') return `Welcome to ${businessName}`;
  return `${businessName} - Your Trusted ${industry.charAt(0).toUpperCase() + industry.slice(1)} Partner`;
}

function getSubheadline(businessName, industry) {
  return `We deliver exceptional ${industry} services that help your business thrive.`;
}

function getHeroText(businessName, industry, profile) {
  return profile.business_story || `At ${businessName}, we're committed to providing the highest quality ${industry} services. Our team brings years of experience and a passion for excellence to every project.`;
}

function getKeyBenefits(profile) {
  const benefits = [
    'Expert team with years of experience',
    'Proven track record of success',
    'Personalized service tailored to your needs',
    'Results that drive your business forward'
  ];
  return benefits.map(b => `- ${b}`).join('\n');
}

function getSocialProof(profile) {
  return `"Working with ${profile.business_name || 'us'} was the best decision we made. They delivered exactly what they promised and more." - Satisfied Client`;
}

function getWhyChooseUs(profile) {
  return `We combine expertise, dedication, and a commitment to your success. Every project is handled with care and attention to detail.`;
}

function getValues(profile) {
  return `- Excellence in everything we do
- Integrity in all our relationships
- Innovation in our approach
- Results that matter`;
}

function getServicesIntro(profile) {
  return `We offer a comprehensive range of services designed to help your business succeed.`;
}

function getServiceDescription(service, profile) {
  return `[Detailed description of ${service} - to be customized based on client needs]`;
}

function generateCTAs(profile) {
  return `**Primary CTA (Main Action):**
${getPrimaryCTA(profile)}

**Secondary CTA (Alternative Action):**
${getSecondaryCTA(profile)}

**Contact CTA:**
Get In Touch

**Service CTA:**
Learn More`;
}

function getPrimaryCTA(profile) {
  if (profile.services?.some(s => s.toLowerCase().includes('quote'))) return 'Get a Quote';
  if (profile.services?.some(s => s.toLowerCase().includes('consultation'))) return 'Schedule Consultation';
  return 'Get Started';
}

function getSecondaryCTA(profile) {
  return 'Learn More';
}

function generateFormCopy(profile) {
  return `**Contact Form:**
- Name field: "Your Name"
- Email field: "Your Email"
- Phone field: "Your Phone (optional)"
- Message field: "Tell us about your project"
- Submit button: "Send Message"

**Service Inquiry Form:**
- Service selection dropdown
- Project details text area
- Preferred contact method
- Submit button: "Request Information"`;
}

