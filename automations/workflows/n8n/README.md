# n8n Workflows (MVP) — Branded+Flow Command Center

These workflows implement the **business automation layer**:
- **Airtable is the command center**
- **Everything lands in Airtable first**
- iAnswering.ai + website forms become **Activities + Leads**
- Follow-ups draft/send via **Brevo (marketing)** and **Outlook (ops)**

## Prerequisites
- Airtable base created using: `company/operations/airtable/MASTER_BASE_SCHEMA.md`
- Tables exist: `Clients`, `Leads`, `Activities`, `Tasks` (minimum)
- Optional: `Campaigns`, `Content`

## Workflow 1: Mortgage Lead Intake (Webhook or Airtable trigger)
**File:** `mortgage-lead-intake-webhook.json`

**Purpose:** ingest leads from websites/landing pages/ads into Airtable, then kick off follow-up.

**Input (minimum JSON):**
```json
{
  "client_id": "enzo-mortgages",
  "lead_type": "mortgage_rate_quote",
  "source": "website_form",
  "landing_page_url": "https://example.com/landing/va-loan",
  "utm_source": "google",
  "utm_campaign": "va-loan-search",
  "first_name": "Jen",
  "last_name": "Cortez",
  "email": "jen@example.com",
  "phone": "+19495551234"
}
```

**Core steps:**
1. Receive payload (Webhook) OR detect new record (Airtable Trigger)
2. Resolve `client_id` → link to `Clients`
3. Upsert `Leads` (match by email/phone + client)
4. Create `Activities` row (`type=Form`, `provider=Netlify/Website`)
5. Create `Tasks` row (“Contact lead”) if needed
6. Send instant follow-up:
   - Brevo email (marketing)
   - Optional: SMS via your chosen SMS provider (future)

## Workflow 2: iAnswering.ai Activity Ingest (Webhook)
**File:** `ianswering-activity-ingest-webhook.json`

**Purpose:** turn calls/SMS into **Activities**, link to the correct Lead, and trigger follow-up logic.

**Core steps:**
1. Receive iAnswering event payload
2. Identify lead by phone/email
3. Upsert Lead if it doesn’t exist
4. Create `Activities` (type=Call/SMS, transcript, recording URL)
5. Update Lead status/last_activity_at

## Workflow 3: Daily Digest + Speed-to-Lead Alerts
**File:** `daily-digest-speed-to-lead.json`

**Purpose:** keep you on top of the business without babysitting.

**Core steps:**
1. Schedule (every morning + every X minutes)
2. Query Airtable for:
   - leads with `status=New` older than N minutes
   - tasks due today / overdue
3. Send digest:
   - Outlook email to you
   - Optional: Slack/SMS later

## Notes
- These JSON exports are templates; you’ll replace credentials + base/table IDs inside n8n.
- Keep all “routing logic” in Airtable fields (`client_id`, `lead_type`, `status`, flags).

