# Client Website Template — Next.js (Feature-Heavy)

Use this when a client needs:
- multiple landing pages
- tools/calculators
- API routes (Airtable-first intake)
- dynamic UX + high-end UI

## How to use
1. Copy this folder into: `clients/<client>/04_website/`
2. Set environment variables in Netlify (see `.env.example`)
3. Update `CLIENT_ID` and client branding in `02_brand/` + `03_brand_assets/`
4. Deploy to Netlify from Git

## Lead intake contract (Airtable-first)
This template exposes:
- `POST /api/lead/intake`

Expected JSON payload includes:
- `client_id` (optional; will default to `CLIENT_ID` env var)
- `lead_type`, `source`, `landing_page_url`, `utm_*`
- contact fields (`first_name`, `last_name`, `email`, `phone`)

All leads are written to Airtable first. n8n can then handle follow-ups, portal updates, and client-specific CRM shaping.

