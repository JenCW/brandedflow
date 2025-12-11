/**
 * Create Design Guide
 * Step 2: Aesthetics, colors, fonts, look & feel
 * Only runs after Step 1 (Site Plan) is approved
 */

const fs = require('fs-extra');
const path = require('path');

module.exports = {
  description: 'Creates design guide with colors, fonts, and look & feel. Step 2 of website creation (only after site plan approved)',
  
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

    // Check if Step 1 is approved
    if (profile.website?.creation_status !== 'step1_site_plan_approved') {
      return {
        success: false,
        error: 'Step 1 (Site Plan) must be approved first. Current status: ' + (profile.website?.creation_status || 'not_started'),
        client_name
      };
    }

    const websiteDir = path.join(PROJECT_ROOT, 'clients', client_name, '03_website');
    await fs.ensureDir(websiteDir);
    const brandDir = path.join(PROJECT_ROOT, 'clients', client_name, '02_brand');
    
    // Get brand info from profile or brand folder
    const brandColors = profile.variations?.brand?.colors || [];
    const brandTone = profile.variations?.brand?.tone || profile.variations?.brand?.personality || 'professional';
    const typography = profile.variations?.brand?.typography || 'Clean sans-serif';
    const designStyle = profile.variations?.design_style || 'modern-bright-editorial';

    // Create design guide (simple, understandable)
    const designGuide = `# Design Guide - ${profile.business_name}

## What This Is
This shows what your website will look like: colors, fonts, and overall feel. Think of it like choosing paint colors and furniture style for a house.

## Color Palette

${brandColors.length > 0 ? brandColors.map((color, i) => {
  const role = i === 0 ? 'Primary (main color)' : i === 1 ? 'Accent (highlights)' : 'Supporting color';
  return `**${role}:** ${color}`;
}).join('\n') : `**Primary Color:** To be determined
**Accent Color:** To be determined
**Background:** White or light gray`}

## Typography (Fonts)

**Headlines:** ${getHeadlineFont(typography, designStyle)}
**Body Text:** ${getBodyFont(typography)}
**Why these fonts:** ${getFontReasoning(brandTone, designStyle)}

## Look & Feel

**Overall Style:** ${getStyleDescription(designStyle)}
**Brand Personality:** ${brandTone}
**Mood:** ${getMoodDescription(brandTone, designStyle)}

## Visual Examples

### Buttons
- Style: ${getButtonStyle(designStyle)}
- Colors: ${brandColors[0] || 'Primary color'} for main buttons
- Hover effect: ${getHoverEffect(designStyle)}

### Images
- Style: ${getImageStyle(designStyle)}
- Filters: ${getImageFilters(designStyle)}

### Spacing
- Generous padding around content
- Easy to read on all devices
- Clean, uncluttered look

## Mobile vs Desktop

**Mobile:**
- Larger touch targets
- Stacked layout
- Simplified navigation

**Desktop:**
- More horizontal space
- Side-by-side content where appropriate
- Full navigation menu

## Next Steps
1. Review this design guide
2. Approve to move to Step 3 (Website Copy)
3. We'll write all the text for your site

---
**Created:** ${new Date().toLocaleDateString()}
**Status:** Awaiting Approval - Step 2 of Website Creation
`;

    // Create visual mockup description (since we can't generate images, we describe them)
    const mockupDescription = `# Visual Mockup Description - ${profile.business_name}

## Home Page Mockup

**Header:**
- Background: ${brandColors[0] || 'Dark color'}
- Logo/Name: White text, ${getHeadlineFont(typography, designStyle)}
- Navigation: White links

**Hero Section:**
- Background: ${getHeroBackground(designStyle)}
- Headline: ${brandColors[0] || 'Primary color'} or white, large ${getHeadlineFont(typography, designStyle)}
- Subheadline: ${getSubheadlineColor(designStyle)}
- Button: ${brandColors[1] || brandColors[0] || 'Accent color'} background, white text

**Features Section:**
- White background
- Icons or images in ${brandColors[0] || 'Primary color'}
- Text in dark gray, ${getBodyFont(typography)}

**Footer:**
- Dark background (${brandColors[0] || 'Dark color'})
- White text
- Links in ${brandColors[1] || 'Accent color'}

## Overall Feel
${getOverallFeelDescription(designStyle, brandTone)}

---
**Note:** This is a description of the visual design. Actual mockups can be created if needed.
**Status:** Awaiting Approval - Step 2 of Website Creation
`;

    // Save files
    await fs.writeFile(path.join(websiteDir, '03-design-guide.md'), designGuide);
    await fs.writeFile(path.join(websiteDir, '04-mockup-description.md'), mockupDescription);

    // Update profile
    profile.website.creation_status = 'step2_design_guide';
    profile.website.design_guide_created = new Date().toISOString();
    profile.website.design_guide_path = path.join(websiteDir, '03-design-guide.md');
    profile.last_updated = new Date().toISOString();
    profile.updated_by = 'mcp-create-design-guide';
    await fs.writeJson(profilePath, profile, { spaces: 2 });

    return {
      success: true,
      client_name,
      design_guide_path: path.join(websiteDir, '03-design-guide.md'),
      mockup_path: path.join(websiteDir, '04-mockup-description.md'),
      message: `Design guide created for ${profile.business_name}. Review and approve to move to Step 3 (Website Copy).`,
      next_step: 'Review design guide. Approve to move to website copy generation.',
      status: 'step2_design_guide_ready_for_review'
    };
  }
};

function getHeadlineFont(typography, designStyle) {
  if (designStyle === 'dark-luxury-flowy') return 'Elegant serif (Cormorant Garamond)';
  if (typography.includes('serif')) return 'Elegant serif font';
  return 'Bold sans-serif (Montserrat, Poppins)';
}

function getBodyFont(typography) {
  if (typography.includes('serif')) return 'Readable serif';
  return 'Clean sans-serif (Inter, Open Sans)';
}

function getFontReasoning(tone, style) {
  if (tone === 'luxury' || style === 'dark-luxury-flowy') {
    return 'Elegant fonts convey sophistication and quality';
  }
  return 'Clean, modern fonts are easy to read and professional';
}

function getStyleDescription(style) {
  const styles = {
    'modern-bright-editorial': 'Modern, clean, bright, magazine-like',
    'dark-luxury-flowy': 'Sophisticated, elegant, dark with gold accents',
    'minimal-clean': 'Simple, minimal, lots of white space',
    'bold-vibrant': 'Bold colors, energetic, eye-catching'
  };
  return styles[style] || 'Professional and modern';
}

function getMoodDescription(tone, style) {
  if (tone === 'luxury') return 'Sophisticated, premium, exclusive';
  if (tone === 'friendly') return 'Welcoming, approachable, warm';
  if (tone === 'professional') return 'Trustworthy, reliable, expert';
  return 'Professional and inviting';
}

function getButtonStyle(style) {
  if (style === 'dark-luxury-flowy') return 'Rounded, elegant, gold accents';
  return 'Rounded corners, modern, clear';
}

function getHoverEffect(style) {
  if (style === 'dark-luxury-flowy') return 'Slight glow, color brightens';
  return 'Color darkens, slight lift effect';
}

function getImageStyle(style) {
  if (style === 'dark-luxury-flowy') return 'Elegant, high-quality, warm tones';
  return 'Bright, clear, professional';
}

function getImageFilters(style) {
  if (style === 'dark-luxury-flowy') return 'Warm, slightly desaturated';
  return 'Natural, vibrant';
}

function getHeroBackground(style) {
  if (style === 'dark-luxury-flowy') return 'Dark with subtle pattern';
  return 'Light or gradient';
}

function getSubheadlineColor(style) {
  if (style === 'dark-luxury-flowy') return 'Light gray or gold';
  return 'Dark gray';
}

function getOverallFeelDescription(style, tone) {
  if (style === 'dark-luxury-flowy' && tone === 'luxury') {
    return 'Sophisticated, elegant, premium. Like a high-end restaurant or luxury brand.';
  }
  if (tone === 'friendly') {
    return 'Welcoming, approachable, warm. Easy to connect with.';
  }
  return 'Professional, modern, trustworthy. Builds confidence.';
}

