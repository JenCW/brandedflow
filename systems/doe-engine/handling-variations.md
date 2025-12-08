# Handling Variations and Customizations

## The Problem

Not every task is the same:
- Different design styles (modern/bright vs dark/luxury)
- Different tech stacks (Gmail vs Outlook, Wix vs static, existing CRM)
- Different target markets/customer journeys
- Company work vs client work

## The Solution: Parameters and Variations

### 1. Directives Should Have Parameters

Directives should accept parameters that customize behavior:

```markdown
## 2. INPUTS
- **Client Name**: From user request
- **Design Style**: 
  - Options: "modern-bright-editorial", "dark-luxury-flowy", "custom"
  - Default: Check brand file or ask user
- **Tech Stack**:
  - Website: "static-html" (default), "wix", "wordpress", "custom"
  - Email: "outlook" (default), "gmail", "custom"
  - CRM: "airtable" (default), "existing-{name}", "none"
- **Template Source**: 
  - Options: "aq-remodeling" (default), "branded-flow", "custom", "none"
```

### 2. MCPs Should Accept Configuration

MCPs should be flexible and accept parameters:

```javascript
// MCP: build-website
{
  "automation": "build-website",
  "params": {
    "client_name": "dental-bunny",
    "design_style": "modern-bright-editorial",  // ← Customization
    "template_source": "none",                  // ← No template
    "tech_stack": "static-html",
    "target_market": "young-professionals",      // ← Different journey
    "animations": true,                          // ← Custom feature
    "integrations": ["dynamic-content", "live-chat"]
  }
}
```

### 3. Detection and Edge Cases

Before executing, detect variations:

```markdown
## 6. EDGE CASES & VARIATIONS

### Design Style Variations
- **Modern/Bright/Editorial**: Use bright colors, bold typography, editorial layouts
- **Dark/Luxury/Flowy**: Use dark backgrounds, elegant typography, water animations
- **Custom**: Ask user for design requirements

### Tech Stack Variations
- **Client has existing CRM**: Use their CRM, don't create new Airtable
- **Client uses Gmail**: Configure for Gmail, not Outlook
- **Client uses Wix**: Create Wix-specific setup, not static HTML
- **Client has existing website**: Ask if they want to replace or enhance

### Detection Process
1. Check client intake file for existing tools/tech stack
2. Check brand file for design style preferences
3. Ask user if unclear
4. Adapt process accordingly
```

## Real Examples

### Example 1: Company Website (Branded + Flow)

**Scenario:** You want modern, bright, editorial website with animations

**What I do:**
1. Check directive: `build-branded-flow-website.md` (different from client directive)
2. Detect: This is company work, not client work
3. Parameters:
   - `design_style`: "modern-bright-editorial"
   - `template_source`: "none" (custom build)
   - `animations`: true
   - `integrations`: ["dynamic-content"]
4. Execute: Build custom website, don't use AQ template
5. Result: Custom website matching your style

### Example 2: Dental Bunny with Existing CRM

**Scenario:** Dental Bunny already has a CRM, uses Gmail, wants Wix website

**What I do:**
1. Check directive: `build-client-website.md`
2. Detect variations:
   - Read intake file → "Uses existing CRM: HubSpot"
   - Read intake file → "Email: Gmail"
   - Read intake file → "Website: Wix preferred"
3. Adapt process:
   - Skip Airtable setup (they have HubSpot)
   - Configure for Gmail (not Outlook)
   - Create Wix setup (not static HTML)
4. Execute: Customized process
5. Result: Website matches their existing tools

## The Framework

### Step 1: Detect Variations (Before Starting)

**Check for:**
- Existing tools/tech stack (from intake file)
- Design preferences (from brand file)
- Custom requirements (from user request)

**Ask if unclear:**
- "I see Dental Bunny uses HubSpot. Should I integrate with that instead of creating Airtable?"
- "What design style do you want? Modern/bright or dark/luxury?"

### Step 2: Adapt Directive Parameters

**Modify the process based on variations:**
- Different template source (or no template)
- Different tech stack integrations
- Different design approach
- Different customer journey

### Step 3: Use Flexible MCPs

**MCPs should accept configuration:**
```javascript
{
  "automation": "setup-crm",
  "params": {
    "client_name": "dental-bunny",
    "crm_type": "existing-hubspot",  // ← Variation
    "integration_method": "api"      // ← How to connect
  }
}
```

### Step 4: Handle Edge Cases

**Document what to do:**
- Client has existing tools → Integrate, don't create new
- Different design style → Use appropriate template/custom build
- Different tech stack → Adapt integrations

## Updated Directive Structure

Directives should include:

```markdown
## 2. INPUTS & VARIATIONS

### Required Inputs
- Client name
- Content sources

### Optional Variations (Detect or Ask)
- **Design Style**: modern-bright | dark-luxury | custom
- **Tech Stack**: 
  - Website: static-html | wix | wordpress | custom
  - Email: outlook | gmail | custom
  - CRM: airtable | existing-{name} | none
- **Template Source**: aq-remodeling | branded-flow | custom | none
- **Target Market**: (affects customer journey)

### Detection Process
1. Read intake file → Check for existing tools
2. Read brand file → Check for design preferences
3. Ask user if unclear
```

## MCP Flexibility

MCPs should handle variations:

```javascript
// Example: setup-crm MCP
module.exports = {
  async execute(params, { PROJECT_ROOT }) {
    const { client_name, crm_type = 'airtable' } = params;
    
    if (crm_type === 'existing-hubspot') {
      // Integrate with existing HubSpot
      return await integrateHubSpot(params);
    } else if (crm_type === 'existing-salesforce') {
      // Integrate with existing Salesforce
      return await integrateSalesforce(params);
    } else {
      // Default: Create new Airtable
      return await createAirtable(params);
    }
  }
};
```

## Summary

**The system should:**
1. ✅ Detect variations (existing tools, preferences, requirements)
2. ✅ Adapt directives based on variations
3. ✅ Use flexible MCPs that accept configuration
4. ✅ Ask user when unclear
5. ✅ Handle edge cases gracefully

**Not:**
- ❌ Assume one template fits all
- ❌ Force same tech stack for everyone
- ❌ Ignore existing tools
- ❌ Use same design style for everything

