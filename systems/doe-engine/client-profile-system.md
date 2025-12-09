# Client Profile System: Carrying Variations Through All Directives

## The Problem

Every client has variations:
- Design style (modern-bright vs dark-luxury)
- Tech stack (Wix vs static HTML, Gmail vs Outlook, HubSpot vs Airtable)
- Target market (young professionals vs luxury buyers)
- Industry (dental vs remodeling vs fine dining)
- Custom requirements (animations, integrations, etc.)

**Current issue:** Each directive detects variations independently, doesn't share information.

**Solution needed:** Create a **client profile** that stores all variations, used by ALL directives.

## The Solution: Client Profile System

### Structure

Each client gets a **profile file** that stores all their variations:

```
clients/
  dental-bunny/
    01_intake/
    02_brand/
    03_website/
    04_automation/
    client-profile.json    ← NEW: Stores all variations
```

### Client Profile Format

```json
{
  "client_name": "dental-bunny",
  "business_name": "Dental Bunny",
  "industry": "dental",
  "target_market": "young-professionals",
  
  "variations": {
    "design_style": "modern-bright-editorial",
    "tech_stack": {
      "website": "wix",
      "email": "gmail",
      "crm": "existing-hubspot",
      "cms": null
    },
    "existing_tools": {
      "crm": "hubspot",
      "email": "gmail",
      "website": "wix",
      "calendar": "google-calendar"
    },
    "custom_requirements": {
      "animations": true,
      "integrations": ["live-chat", "dynamic-content"],
      "no_website_change": true
    },
    "brand": {
      "colors": ["#FF6B9D", "#C8E6C9", "#FFF9C4"],
      "typography": "Montserrat",
      "tone": "friendly, approachable, modern"
    }
  },
  
  "client_specific_ids": {
    "airtable_base_id": "appABC123def456",
    "netlify_site_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "n8n_webhook_url": "https://n8n.example.com/webhook/dental-bunny",
    "pandadoc_workspace_id": "workspace_xyz789",
    "base44_portal_id": "portal_abc123"
  },
  
  "automations": {
    "website": {
      "status": "not_needed",
      "reason": "Client uses Wix, no changes needed"
    },
    "lead_magnet": {
      "status": "pending",
      "variations": {
        "crm_integration": "hubspot",
        "email_provider": "gmail"
      }
    },
    "onboarding": {
      "status": "pending",
      "variations": {
        "portal_type": "base44",
        "crm_integration": "hubspot"
      }
    }
  },
  
  "last_updated": "2024-12-07",
  "updated_by": "ai-assistant"
}
```

## How It Works

### Step 1: First Directive Detects Variations

**When you ask:** "Build website for Dental Bunny"

**What I do:**
1. Check for client profile → Doesn't exist yet
2. Read intake/brand files → Detect variations
3. Create client profile → Store all variations
4. Use profile → Build website with variations
5. Save profile → `clients/dental-bunny/client-profile.json`

### Step 2: Subsequent Directives Use Profile

**When you ask:** "Set up Lead Magnet for Dental Bunny"

**What I do:**
1. Check for client profile → ✅ Found `client-profile.json`
2. Read profile → "Uses HubSpot, Gmail, Wix, modern-bright style"
3. Use profile → Automatically adapt Lead Magnet directive
4. No need to detect again → Profile has all info
5. Update profile → Add Lead Magnet status

### Step 3: All Directives Reference Profile

**Every directive:**
1. Checks for `client-profile.json` first
2. Uses variations from profile
3. Updates profile with automation status
4. Carries variations through automatically

## Updated Directive Structure

### All Directives Now Start With:

```markdown
## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. Check for: `clients/{client-name}/client-profile.json`
2. If exists: Load profile, use variations from profile
3. If not: Detect variations from intake/brand files, create profile
4. Use profile variations throughout process

### Client Profile Variations Used:
- Design style: {from profile}
- Tech stack: {from profile}
- Existing tools: {from profile}
- Target market: {from profile}
- Custom requirements: {from profile}
```

## Example Flow

### Scenario: Dental Bunny

**First automation:** "Build website for Dental Bunny"

**My process:**
1. Check profile → Not found
2. Read intake → "Uses Wix, Gmail, HubSpot"
3. Read brand → "Modern, bright, young professionals"
4. Create profile → Store all variations
5. Build website → Adapt for Wix (no static HTML)
6. Save profile → `clients/dental-bunny/client-profile.json`

**Profile created:**
```json
{
  "variations": {
    "tech_stack": { "website": "wix", "email": "gmail", "crm": "hubspot" },
    "design_style": "modern-bright",
    "target_market": "young-professionals"
  },
  "automations": {
    "website": { "status": "not_needed", "reason": "Uses Wix" }
  }
}
```

**Second automation:** "Set up Lead Magnet for Dental Bunny"

**My process:**
1. Check profile → ✅ Found
2. Read profile → "Uses HubSpot, Gmail, modern-bright"
3. Follow Lead Magnet directive → Use HubSpot (not Airtable), Gmail (not Outlook)
4. Adapt automatically → No need to detect again
5. Update profile → Add Lead Magnet status

**Third automation:** "Set up Onboarding for Dental Bunny"

**My process:**
1. Check profile → ✅ Found
2. Read profile → "Uses HubSpot, Gmail, modern-bright"
3. Follow Onboarding directive → Use HubSpot, adapt for Gmail
4. Adapt automatically → Variations already known
5. Update profile → Add Onboarding status

## Portal Integration

### Base44 Portal Gets Updated

**When profile is created/updated:**
1. MCP: `update-base44-portal` gets called
2. Portal receives: Client profile data
3. Portal displays: All variations, automation status
4. Portal shows: What's configured, what's pending

**Portal shows:**
- Client: Dental Bunny
- Design Style: Modern, Bright, Editorial
- Tech Stack: Wix, Gmail, HubSpot
- Automations:
  - Website: Not needed (uses Wix)
  - Lead Magnet: ✅ Active (HubSpot, Gmail)
  - Onboarding: ⏳ Pending
  - Email Marketing: ⏳ Pending

## MCP for Client Profile

### MCP: `create-or-update-client-profile`

```javascript
{
  "automation": "create-or-update-client-profile",
  "params": {
    "client_name": "dental-bunny",
    "variations": {
      "design_style": "modern-bright",
      "tech_stack": { "website": "wix", "email": "gmail", "crm": "hubspot" }
    }
  }
}
```

**What it does:**
- Creates profile if doesn't exist
- Updates profile if exists
- Saves to `clients/{client-name}/client-profile.json`
- Updates Base44 portal

## Benefits

### 1. No Repeated Detection
- Detect variations once
- Store in profile
- All directives use profile
- No need to detect again

### 2. Consistency Across Automations
- All automations use same variations
- Website, Lead Magnet, Onboarding all consistent
- No conflicting configurations

### 3. Portal Always Updated
- Portal shows current client state
- All variations visible
- Automation status tracked

### 4. System Learns
- Profile gets richer over time
- Each automation adds to profile
- System knows client better

## Updated Workflow

### Every Directive Now:

```markdown
## 2. INPUTS & CLIENT PROFILE

### Step 1: Load Client Profile
1. Check: `clients/{client-name}/client-profile.json`
2. If exists: Load and use variations
3. If not: Detect from intake/brand, create profile
4. Use profile throughout process

### Step 2: Adapt Based on Profile
- Design style: {from profile}
- Tech stack: {from profile}
- Existing tools: {from profile}
- Custom requirements: {from profile}

### Step 3: Update Profile
- Add automation status
- Update variations if discovered new ones
- Save profile
- Update portal
```

## Summary

**The system now:**
1. ✅ Creates client profile on first automation
2. ✅ Stores all variations in profile
3. ✅ All directives use profile automatically
4. ✅ Portal gets updated with profile
5. ✅ Variations carry through all automations
6. ✅ No repeated detection needed
7. ✅ Consistency across all automations

**Result:** One source of truth (client profile) used by all directives, portal always updated, variations carried through automatically.

