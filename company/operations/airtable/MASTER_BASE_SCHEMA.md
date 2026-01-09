# Airtable Master Base Schema (Branded+Flow Command Center)

**Goal:** One Airtable base runs the business for *all clients* (leads, activities, campaigns, content, tasks, reporting). Every source lands here first; everything else fans out from here.

This schema is designed to support:
- Mortgage (ads + landing pages + Apply/Quote forms)
- Catering (scraped outbound + inbound calls/SMS + landing pages)
- Any other vertical via `lead_type` + `industry` + linked client configuration

---

## Core identifiers (non-negotiable)

- **`client_id`**: stable slug (e.g. `enzo-mortgages`, `luxe-fine-dining`). Matches folder name under `clients/`.
- **`lead_id`**: stable unique ID for each lead (can be Airtable record ID + optional human-friendly ID).
- **`source`**: where the lead came from (e.g. `netlify_form`, `meta_ads`, `google_ads`, `ianswering_call`, `ianswering_sms`, `scraped`).
- **`lead_type`**: what they want (e.g. `mortgage_rate_quote`, `mortgage_apply`, `mortgage_valuation`, `catering_quote`, `contact`).
- **UTM fields**: `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, plus `landing_page_url`.

---

## Table 1: Clients

**Purpose:** One row per client. Drives routing, branding pointers, and per-client automation settings.

**Key fields:**
- `client_id` (primary; single line text)
- `display_name` (single line)
- `industry` (single select: Mortgage, Catering, etc.)
- `status` (single select: Active, Paused, Completed)
- `website_url` (url)
- `netlify_site_id` (single line)
- `primary_contact_email` (email)
- `primary_contact_phone` (phone)
- `timezone` (single select)
- `brand_folder_path` (single line; e.g. `clients/enzo-mortgages/02_brand/`)
- `brand_assets_path` (single line; e.g. `clients/enzo-mortgages/03_brand_assets/`)

**Automation config fields (recommended):**
- `followup_enabled` (checkbox)
- `default_owner` (single line or collaborator)
- `brevo_list_id` (single line)
- `base44_portal_enabled` (checkbox)

---

## Table 2: Leads

**Purpose:** One row per lead across all clients. All sources upsert into this table first.

**Key fields:**
- `client` (link to Clients)
- `client_id` (formula/lookup from Clients or stored text)
- `status` (single select): New, Contacted, Qualified, Booked, Won, Lost, Nurture
- `lead_type` (single select)
- `source` (single select)
- `created_at` (created time)
- `last_activity_at` (date/time)

**Contact fields:**
- `first_name`, `last_name` (single line)
- `email` (email)
- `phone` (phone)
- `location_text` (single line) — city/zip, or address if appropriate

**Attribution fields:**
- `landing_page_url` (url)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (single line)
- `gclid`, `fbclid` (single line; optional)

**Mortgage-specific fields (optional columns):**
- `loan_type` (single select)
- `urgency` (single select)
- `loan_amount` (number)
- `credit_score_band` (single select)
- `property_value` (number)
- `down_payment` (number)
- `purchase_price` (number)
- `loan_balance` (number)
- `current_rate` (number)
- `refinance_goal` (long text or select)

**Processing flags (for n8n):**
- `needs_processing` (checkbox) — triggers enrichment/follow-up
- `needs_crm_processing` (checkbox) — triggers client-specific shaping if needed
- `raw_payload` (long text) — store JSON string from source for audit/debug

---

## Table 3: Activities

**Purpose:** A complete timeline per lead (calls, SMS, emails, form submits, notes).

**Key fields:**
- `lead` (link to Leads)
- `client` (link to Clients)
- `type` (single select): Form, Call, SMS, Email, Note, Booking
- `direction` (single select): Inbound, Outbound
- `occurred_at` (date/time)
- `summary` (long text)
- `transcript` (long text; optional)
- `recording_url` (url; optional)
- `message_body` (long text; optional)
- `provider` (single select): iAnswering, Brevo, Outlook, Netlify, Meta, Google
- `raw_payload` (long text; JSON string)

---

## Table 4: Tasks

**Purpose:** What *you* must do (or what an agent must draft), driven by lead status and ops workflows.

**Key fields:**
- `client` (link to Clients)
- `lead` (link to Leads; optional)
- `title` (single line)
- `type` (single select): Follow-up, Build, Fix, Content, Ops, Admin
- `priority` (single select): P0, P1, P2
- `status` (single select): Todo, Doing, Blocked, Done
- `due_at` (date/time)
- `owner` (collaborator or single line)
- `agent_draft` (long text) — AI-drafted reply/copy to approve

---

## Table 5: Campaigns

**Purpose:** Track ads + outbound campaigns and tie them to lead outcomes.

**Key fields:**
- `client` (link to Clients)
- `channel` (single select): Meta, Google, SEO, Outbound, Referral, Social
- `name` (single line)
- `status` (single select): Draft, Active, Paused, Ended
- `start_date`, `end_date` (date)
- `utm_campaign` (single line)
- `notes` (long text)

---

## Table 6: Content

**Purpose:** Content calendar (posts, landing pages, blog, emails) with approvals + tracking.

**Key fields:**
- `client` (link to Clients)
- `type` (single select): Social, Email, Blog, Landing, AdCreative
- `platform` (single select): Instagram, LinkedIn, TikTok, YouTube, Facebook
- `status` (single select): Idea, Draft, Approved, Scheduled, Posted
- `publish_at` (date/time)
- `caption` (long text)
- `asset_links` (url or attachments)
- `utm_campaign` (single line)

---

## Minimal MVP (what to build first)

If you want to go live fast, you can start with just:
1. Clients
2. Leads
3. Activities
4. Tasks

Then add Campaigns + Content once the lead engine is stable.

