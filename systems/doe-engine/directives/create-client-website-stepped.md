# DIRECTIVE: Create Client Website - Stepped Approval Process

## 1. GOAL
Build and deploy a professional, conversion-optimized website using a stepped, iterative approval process. Each step must be approved before proceeding. Nothing deploys until ALL steps are approved. ROI tracking begins at deployment.

## 2. THE PROCESS (8 Steps)

### Step 1: Site Plan & Wireframe ✅
**MCP:** `create-website-design-brief`

**What It Does:**
- Creates simple, understandable site plan (proposal-style, NOT technical)
- Creates wireframe in plain language
- Defines user journey
- Lists pages and their purpose

**Approval Required:** Yes - Must approve before Step 2

**Iteration:** Can iterate for 24+ hours, regenerate as needed

**Output:**
- `03_website/01-site-plan.md`
- `03_website/02-wireframe.md`

---

### Step 2: Design Guide ✅
**MCP:** `create-design-guide`

**What It Does:**
- Defines color palette
- Selects typography (fonts)
- Describes look & feel
- Creates visual mockup description

**Approval Required:** Yes - Must approve before Step 3

**Iteration:** Can iterate for 24+ hours, regenerate as needed

**Output:**
- `03_website/03-design-guide.md`
- `03_website/04-mockup-description.md`

---

### Step 3: Website Copy ✅
**MCP:** `generate-website-copy`

**What It Does:**
- Generates all headlines
- Creates all body text
- Writes all CTAs
- Creates form copy

**Approval Required:** Yes - Must approve before Step 4

**Iteration:** Can iterate for 24+ hours, regenerate as needed

**Output:**
- `03_website/05-website-copy.md`

---

### Step 4: Features (Animations, Integrations, Dynamic Elements) ✅
**MCP:** `add-website-features`

**What It Does:**
- Lists animations
- Defines integrations (CRM, email, calendar, etc.)
- Describes dynamic elements (quote calculators, forms, etc.)
- Provides technical implementation notes

**Approval Required:** Yes - Must approve before Step 5

**Iteration:** Can iterate for 24+ hours, regenerate as needed

**Output:**
- `03_website/06-website-features.md`

---

### Step 5: Client Review ✅
**MCP:** `prepare-client-review`

**What It Does:**
- Prepares complete website preview
- Creates client review link
- Sets up feedback collection

**Approval Required:** Yes - Must approve before Step 6 (Deployment)

**Iteration:** Client reviews, you make adjustments, iterate as needed

**Output:**
- Client review package

---

### Step 6: Deploy to Netlify ✅
**MCP:** `deploy-website-netlify`

**What It Does:**
- Deploys website to Netlify
- Creates Netlify CMS
- **STARTS analytics tracking**
- **STARTS ROI tracking**

**Critical:** This is when ROI tracking begins. Everything from here forward is about proving value.

**Output:**
- Deployed website
- CMS configured
- Analytics active

---

### Step 7: Forms & Database ✅
**MCP:** `setup-website-forms-database`

**What It Does:**
- Creates contact forms
- Links forms to integrations (Airtable, email)
- Deploys database
- Activates contact capture
- Tracks all submissions for ROI

**Output:**
- Forms active
- Database deployed
- Contact capture working

---

### Step 8: SEO Implementation ✅
**MCP:** `setup-website-seo`

**What It Does:**
- Sets up Semrush integration (recommended)
- Configures Google Analytics
- Sets up Google Search Console
- Implements on-page SEO
- Completes technical SEO
- Starts keyword tracking
- **Begins SEO ROI tracking**

**Output:**
- SEO fully configured
- Keyword tracking active
- ROI tracking active

---

## 3. APPROVAL WORKFLOW

### How It Works
1. **Complete Step** → MCP generates deliverables
2. **Review** → Review the deliverables
3. **Iterate** → Make changes, regenerate if needed (can take 24+ hours)
4. **Approve** → Use MCP: `approve-website-step` with step number
5. **Next Step** → System unlocks next step

### Approval MCP
**MCP:** `approve-website-step`

**Parameters:**
- `client_name` (required)
- `step` (required): "step1", "step2", "step3", "step4", "step5"
- `notes` (optional): Approval notes or changes made

**What It Does:**
- Updates client profile status
- Unlocks next step
- Records approval date
- Allows notes/comments

### Status Tracking
Each step has a status in `client-profile.json`:
- `not_started` - Step hasn't been initiated
- `stepX_ready_for_review` - Step complete, awaiting approval
- `stepX_approved` - Step approved, next step unlocked
- `deployed` - Website is live
- `seo_active` - SEO tracking active

---

## 4. KEY PRINCIPLES

1. **No Deployment Until All Approved** - Website doesn't go live until Step 5 is approved
2. **ROI Starts at Deployment** - Analytics and ROI tracking begin immediately upon deployment (Step 6)
3. **Iteration is Expected** - Take your time, be particular, iterate as needed (24+ hours is fine)
4. **Simple & Understandable** - Site plans and wireframes are in plain language, not technical
5. **ROI-Focused** - Everything from deployment forward is about proving value

---

## 5. INPUTS & CLIENT PROFILE

### Required Inputs
- **Client Name**: From user request
- **Client Profile**: `clients/{client-name}/client-profile.json`
- **Research Findings**: From `01_intake/research/` (if available)
- **Brand Guidelines**: From `02_brand/` (if available)

### Client Profile Usage
- Load profile at start: `load-client-profile` MCP
- Use variations throughout process
- Update profile after each step approval
- Track status in profile: `website.creation_status`

---

## 6. EXECUTION (MCPs to Use)

### Website Creation MCPs
1. `create-website-design-brief` - Step 1
2. `create-design-guide` - Step 2
3. `generate-website-copy` - Step 3
4. `add-website-features` - Step 4
5. `prepare-client-review` - Step 5
6. `approve-website-step` - Approval workflow
7. `deploy-website-netlify` - Step 6
8. `setup-website-forms-database` - Step 7
9. `setup-website-seo` - Step 8

### Supporting MCPs
- `load-client-profile` - Load client profile
- `update-base44-portal` - Sync updates to portal
- `sync-folder-to-base44` - Auto-sync folder changes

---

## 7. OUTPUTS

### Step 1 Outputs
- `03_website/01-site-plan.md`
- `03_website/02-wireframe.md`

### Step 2 Outputs
- `03_website/03-design-guide.md`
- `03_website/04-mockup-description.md`

### Step 3 Outputs
- `03_website/05-website-copy.md`

### Step 4 Outputs
- `03_website/06-website-features.md`

### Step 5 Outputs
- Client review package

### Step 6 Outputs
- Deployed website on Netlify
- CMS configured
- Analytics tracking active

### Step 7 Outputs
- Forms active
- Database deployed
- Contact capture working

### Step 8 Outputs
- SEO fully configured
- Keyword tracking active
- ROI tracking active

---

## 8. ROI TRACKING (Starts at Deployment)

**What Gets Tracked:**
- Website traffic (organic, direct, referral)
- Form submissions
- Contact inquiries
- Conversions
- Revenue attribution
- Keyword rankings
- SEO performance

**Tools:**
- Google Analytics
- Semrush (keyword rankings)
- Custom tracking (form submissions, conversions)
- Airtable (contact database)

**Reporting:**
- Weekly keyword ranking reports
- Monthly SEO performance
- Quarterly ROI analysis
- Conversion tracking
- Revenue attribution

---

## 9. SELF-ANNEALING

### When Something Doesn't Work
1. **Identify the issue** - Which step failed? What was wrong?
2. **Fix the MCP** - Update the execution script
3. **Test the fix** - Regenerate the step
4. **Update this directive** - Document what was learned
5. **Update client profile** - Note the fix in profile

### Learning Updates
- If site plan format doesn't work → Update `create-website-design-brief`
- If design guide needs changes → Update `create-design-guide`
- If copy needs adjustment → Update `generate-website-copy`
- If approval workflow breaks → Update `approve-website-step`
- If deployment fails → Update `deploy-website-netlify`

### Profile Updates
After each step:
- Update `website.creation_status`
- Record approval date
- Note any learnings
- Update Base44 portal

---

## 10. EDGE CASES

### Client Wants Changes After Approval
- Can still make changes
- Re-generate the step
- Re-approve if needed
- Update profile

### Step Takes Longer Than Expected
- No time limit
- Iterate as needed
- Take 24+ hours if needed
- Only approve when satisfied

### Client Rejects at Step 5
- Make adjustments
- Re-generate affected steps
- Re-approve
- Don't deploy until approved

### Deployment Fails
- Check Netlify configuration
- Verify all files present
- Check for errors
- Fix and re-deploy

---

## 11. NOTES

- **PandaDoc Removed** - No longer using PandaDoc
- **Semrush Recommended** - Best tool for comprehensive SEO tracking
- **ROI is Everything** - From deployment forward, it's all about proving value
- **Iteration Welcome** - Take your time, be particular, iterate as needed
- **Simple Language** - Site plans and wireframes are understandable, not technical

---

**Last Updated:** December 8, 2024
**Status:** Active - This is the standard process
**Replaces:** Old `build-client-website.md` directive (which was single-step)






