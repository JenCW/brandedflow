# DIRECTIVE: Build Client Website

## 1. GOAL
Build and deploy a professional, conversion-optimized website for a client (static HTML or framework-based), following Branded+Flow standards. Supports both direct Cursor builds and imports from vibe coding platforms (Replit/GetMocha).

## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. **Check for profile**: `clients/{client-name}/client-profile.json`
2. **If profile exists**: Load variations from profile, use throughout process
3. **If profile doesn't exist**: 
   - Detect variations from intake/brand files
   - Create profile using MCP: `create-or-update-client-profile`
   - Use profile going forward

### Step 2: Use Profile Variations
- **Design style**: From profile (or detect if new)
- **Tech stack**: From profile (website, CRM)
- **Existing tools**: From profile
- **Target market**: From profile
- **Custom requirements**: From profile

### Required Inputs
- **Client Name**: From user request (e.g., "Dental Bunny")
- **Client Folder**: `clients/{client-name}/03_website/`
- **Content Source**: 
  - `clients/{client-name}/01_intake/*.txt` (business info, services, existing tools)
  - `clients/{client-name}/02_brand/*.txt` (brand colors, style, tone, design preferences)
  - `clients/{client-name}/client-profile.json` (variations - preferred source)

### Variations to Detect (If Profile Doesn't Exist)

**Design Style:**
- Options: "modern-bright-editorial", "dark-luxury-flowy", "custom", or from brand file
- Default: Check brand file, ask if unclear
- **Action**: Use appropriate template or custom build based on style

**Template Source:**
- Options: "aq-remodeling" (dark/luxury), "branded-flow" (modern/bright), "custom", "none"
- Default: "aq-remodeling" (but check if design style matches)
- **Action**: If design style doesn't match template, use custom build or appropriate template

**Tech Stack:**
- **Website Build Method**: 
  - Options: "cursor-direct" (build directly in Cursor), "replit-import" (build in Replit, import to Cursor), "getmocha-import" (build in GetMocha, import to Cursor)
  - Default: "cursor-direct" (unless user specifies otherwise)
  - **Action**: Follow appropriate build/import process
- **Website Type**: 
  - Options: "static-html" (simple HTML/CSS/JS), "nextjs" (Next.js framework), "react-vite" (React/Vite)
  - Default: "static-html" (unless framework needed for complex features)
  - Detection: Check imported files (package.json) or user preference
  - **Action**: Adapt process for chosen type
- **CRM**: 
  - Options: "airtable" (default), "existing-{name}", "none"
  - Detection: Check intake file for "Uses CRM: HubSpot" or similar
  - **Action**: Integrate with existing CRM or create new Airtable

**Target Market/Customer Journey:**
- Detection: Check intake file for target audience
- **Action**: Adapt customer journey, messaging, and flow accordingly

### Detection Process
1. Read intake file → Check for existing tools, preferences, requirements
2. Read brand file → Check for design style, colors, tone
3. Compare design style with template → Decide if template matches or custom needed
4. Ask user if unclear or conflicting information

## 3. PROCESS

### Phase 1: Setup & Load Profile
1. **Load client profile**
   - Use MCP: `load-client-profile` with `{ client_name: "{client-name}" }`
   - If profile exists: Use variations from profile
   - If profile doesn't exist: Detect variations, create profile

2. **Determine build method** (from profile or user)
   - **If "cursor-direct"**: Build directly in Cursor (proceed to Step 3)
   - **If "replit-import" or "getmocha-import"**: User builds in platform, then import (skip to Phase 2: Import section)

3. **Verify client folder exists** (for cursor-direct builds only)
   - Location: `clients/{client-name}/03_website/` (or `04_website/` if client uses that structure)
   - If not: Create it (ask user to confirm client name first)
   - Use MCP: `create-client-folder`

4. **Check profile for website status** (for cursor-direct builds only)
   - If profile shows `automations.website.status: "not_needed"`: Skip website build, inform user
   - If profile shows `automations.website.status: "completed"`: Check if update needed
   - If profile shows no website status: Proceed with build

5. **Select template or custom build** (for cursor-direct builds only, based on profile)
   - **From profile**: `variations.design_style` and `variations.tech_stack.website`
   - **If design style matches AQ template** (dark/luxury): Use `aq-remodeling` template
   - **If design style matches Branded+Flow** (modern/bright): Use `branded-flow` template
   - **If design style is custom**: Build from scratch
   - Use MCP: `copy-website-template` (if using template) or custom build

6. **Gather client information** (for cursor-direct builds only)
   - Read: `clients/{client-name}/01_intake/*.txt`
   - Read: `clients/{client-name}/02_brand/*.txt`
   - Extract: Business name, services, contact info, brand colors, tagline
   - Use script: `execution/extract-client-info.py` (if exists)

### Phase 2: Build or Import

**Note:** If build method is "replit-import" or "getmocha-import", skip to "If Replit/GetMocha Import" section below.

**If Cursor Direct Build:**
1. **Build website** (static HTML or framework-based)
   - **Static HTML**: Create HTML/CSS/JS files directly
   - **Framework-based**: Create Next.js/React structure with components
   - Apply design style from profile
   - Focus on UI design, animations, visual excellence

**If Replit/GetMocha Import:**
1. **Follow import process** (see `import-company-website-files.md` directive)
   - User provides ZIP or extracted files
   - Extract and identify framework type (check package.json)
   - Import to client folder, preserve structure
   - Adapt for Netlify deployment

### Phase 3: Content Customization
1. **Update content** (for static HTML) OR **Update components** (for framework-based)
   - Update all pages/components: Business name, services, descriptions
   - Update meta tags: Title, description, keywords (SEO)
   - Update contact information: Phone, email, address
   - Update forms: Contact form setup for Netlify Forms
   - Use script: `execution/customize-website-content.py` (if exists and applicable)

2. **Update styling**
   - **Static HTML**: Update CSS files, apply brand colors
   - **Framework-based**: Update Tailwind/CSS modules, apply brand colors
   - Update typography if specified
   - Maintain responsive design
   - Use script: `execution/update-website-styling.py` (if exists and applicable)

3. **Update SEO elements**
   - Meta tags (title, description, keywords)
   - Open Graph tags (social sharing)
   - Schema.org markup (LocalBusiness, etc.)
   - robots.txt and sitemap.xml (or dynamic generation for frameworks)
   - Use script: `execution/update-seo-elements.py` (if exists and applicable)

### Phase 4: Integration Setup
1. **Form integration**
   - Ensure forms have `data-netlify="true"` attribute
   - Add `name="contact"` and `method="POST"` attributes
   - Add hidden `form-name` input and honeypot field for spam protection
   - Update JavaScript to submit to Netlify Forms AND Airtable (if configured)
   - Test form submission (if possible)
   - Document form field mappings for CRM

2. **Google Analytics setup**
   - Add GA4 tracking code to ALL HTML pages (placeholder: `G-XXXXXXXXXX`)
   - Create `build.js` script that replaces placeholder with `GOOGLE_ANALYTICS_ID` env var
   - Add build command to `netlify.toml`: `command = "node build.js"`
   - Document GA property ID requirement in setup docs
   - Note: Client needs to provide GA property ID in Netlify environment variables

3. **CRM integration preparation**
   - **Airtable**: Add webhook URL to form submission JavaScript
   - **Base44**: Create Netlify function `netlify/functions/submit-to-base44.js`
   - Configure Netlify Forms webhook to trigger Base44 function
   - Document form field structure
   - Note integration points for Airtable/CRM/Base44
   - Create integration notes file (`docs/NETLIFY_SETUP.md`)

4. **Netlify CMS setup** (if client needs content management)
   - Create `admin/config.yml` with content types (pages, testimonials, portfolio, FAQs)
   - Create `admin/index.html` for CMS access
   - Document Git Gateway setup in Netlify dashboard
   - Note: Requires Netlify Identity + Git Gateway enabled

### Phase 5: Validation & Testing
1. **Validate structure**
   - Check: All required files exist
   - Check: Folder structure follows rules (no root violations)
   - Check: Naming conventions (lowercase-kebab-case)
   - Use script: `execution/validate-website-structure.py` (if exists)

2. **Test locally**
   - **Static HTML**: Open index.html in browser or use local server (`python3 -m http.server 8000`)
   - **Framework-based**: 
     - Next.js: Run `npm run dev` (starts dev server, usually on localhost:3000)
     - React/Vite: Run `npm run dev` (starts dev server, usually on localhost:5173)
     - Note: `npm run dev` is for development, `npm run build` is for production
   - Check all links/pages work
   - Verify responsive design (mobile, tablet, desktop)
   - Check forms and interactive elements

3. **Prepare for deployment**
   - Ensure: `robots.txt` exists (or is generated)
   - Ensure: `sitemap.xml` exists (or is generated)
   - Ensure: `netlify.toml` is properly configured:
     - **Static HTML**: Build command (if needed), publish directory
     - **Framework-based**: Build command (`npm run build`), publish directory (`.next` for Next.js, `dist` for Vite)
   - Ensure: Forms have `data-netlify="true"` attribute (for static HTML) or proper Netlify Forms setup (for frameworks)
   - Ensure: Environment variables documented
   - Ensure: All images are optimized (if possible)
   - Create: `docs/NETLIFY_SETUP.md` with environment variable setup instructions
   - Use script: `execution/prepare-netlify-deployment.py` (if exists and applicable)

## 4. OUTPUTS
- Complete website in: `clients/{client-name}/03_website/` (or `04_website/`)

**For Static HTML:**
- Files:
  - `index.html` (home page)
  - `about.html`, `services.html`, `contact.html`, etc.
  - `css/style.css` (all styling)
  - `js/script.js` (if needed)
  - `robots.txt` (SEO)
  - `sitemap.xml` (SEO)

**For Framework-based (Next.js/React):**
- Files:
  - `package.json` (with dependencies)
  - `app/` or `src/` directory (framework structure)
  - Framework config files (`next.config.mjs`, `vite.config.ts`, etc.)
  - `public/` directory (static assets)
  - `robots.txt` (or dynamic generation)
  - `sitemap.xml` (or dynamic generation)
- Documentation:
  - `README.md` (deployment instructions, form setup, etc.)
  - `docs/NETLIFY_SETUP.md` (environment variables, integrations setup)
- Build Files:
  - `netlify.toml` (build settings, redirects, environment variable notes)
  - `build.js` (if needed for static HTML - replaces environment variable placeholders)
- Integration Files:
  - `netlify/functions/submit-to-base44.js` (if Base44 integration needed)
  - `admin/config.yml` and `admin/index.html` (if Netlify CMS needed)
- Client Profile Updated:
  - `clients/{client-name}/client-profile.json` updated with website status
  - Portal updated with website information
- Ready for deployment to Netlify

## 5. EXECUTION (MCPs to Use)

### Client Profile MCPs
- `load-client-profile` - Loads client profile with all variations
- `create-or-update-client-profile` - Creates/updates profile with variations

### Website Build MCPs
- `create-client-folder` - Creates client folder structure
- `copy-website-template` - Copies template (if using template)
- `extract-client-info` - Extracts info from intake/brand files
- `customize-website-content` - Updates content (if static HTML)
- `update-website-styling` - Updates styling (if static HTML)

### Import MCPs (for Replit/GetMocha imports)
- Follow `import-company-website-files.md` directive for import process

### Portal MCPs
- `update-base44-portal` - Updates portal with client profile and automation status

## 6. EDGE CASES & VARIATIONS

### Design Style Variations
- **Modern/Bright/Editorial**: Use bright colors, bold typography, editorial layouts, animations
  - Template: Use `branded-flow` template or custom build
  - Customer journey: Fast-paced, dynamic, engaging
- **Dark/Luxury/Flowy**: Use dark backgrounds, elegant typography, water animations
  - Template: Use `aq-remodeling` template
  - Customer journey: Sophisticated, slow-paced, premium
- **Custom style**: Ask user for specific requirements, build custom

### Tech Stack Variations
- **Client has existing CRM** (HubSpot, Salesforce, etc.):
  - Skip Airtable creation
  - Integrate with existing CRM instead
  - Use MCP: `integrate-existing-crm` with CRM type parameter
- **Website built in Replit/GetMocha**:
  - User builds in vibe coding platform
  - Import using `import-company-website-files.md` directive
  - Then proceed with integration setup (Phase 4)
- **Framework-based vs Static HTML**:
  - Use static HTML for simple brochure sites (faster, easier)
  - Use framework-based (Next.js/React) for complex features, calculators, multi-step forms
  - Both work with Netlify deployment
- **Client already has website**:
  - Ask if they want to replace or enhance
  - If enhance: Create enhancement plan, don't overwrite

### Standard Edge Cases
- **Client folder doesn't exist**: Ask user to confirm name, create if needed
- **No intake/brand files**: Use generic placeholder content, note in output
- **Custom colors not provided**: Use default Branded+Flow palette or ask user
- **Netlify deployment**: User handles manually (drag-and-drop) or via CLI
- **Google Analytics**: Client must provide GA property ID (can't create for them)
- **Forms**: Must test after deployment to Netlify (Netlify Forms requires deployment)
- **Images**: Client may need to provide images, or use placeholders
- **Worker Videos**: NEVER include videos showing workers, construction in progress, or behind-the-scenes footage. These are unprofessional and hurt brand perception. Replace with:
  - Professional, high-end finished project photos
  - Photorealistic, classy, modern AI-generated images if needed
  - Images should be luxury, middle-class high-end aesthetic
  - Optimized for Google and AI search engine ranking (high-quality, descriptive alt text, proper file names)

## 7. LEARNINGS & PROFILE UPDATES

### After Completing This Automation:
1. **Update client profile** with website status:
   - Use MCP: `create-or-update-client-profile`
   - Add: `automations.website.status: "completed"` or `"not_needed"`
   - Add: `automations.website.tech_stack: "{platform}"`
   - Add: `automations.website.deployment: "{method}"`

2. **Update portal** with website information:
   - Use MCP: `update-base44-portal`
   - Include: Website status, platform, deployment info

### General Learnings:
- Always check client profile first (may have variations already detected)
- Client profile carries variations through all automations
- Support both static HTML and framework-based websites
- Support both direct Cursor builds and imports from Replit/GetMocha
- If client has existing website, check if changes needed
- Always update profile after completing automation
- Portal should reflect current client state

---
**Last Updated:** December 7, 2024
**Status:** Draft - For Review
**Created By:** AI Assistant (based on QUICK_STARTS.md and existing processes)

