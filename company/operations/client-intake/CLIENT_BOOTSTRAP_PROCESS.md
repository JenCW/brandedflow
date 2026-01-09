# Client Bootstrap (Deterministic) — Solo Agency Standard

**Goal:** Create a new client in a repeatable way: folders + profile + website template + environment setup.

This is the repo-level onboarding (not the Base44/contract workflow).

---

## 1) Create client folder + profile

### Option A (recommended): use the MCP automation
- Automation: `create-client-folder`
- Inputs:
  - `client_name` (kebab-case)
  - `display_name` (optional)

### Option B: run the deterministic script
```bash
python3 automations/scripts/bootstrap_client.py <client-slug> --name "<Client Display Name>" --website-template static
```

Supported templates:
- `static` (brochure)
- `nextjs` (feature-heavy)
- `none` (no website files copied)

Outputs:
- `clients/<client>/client-profile.json` (single source of truth)
- standard folders (admin/intake/brand/assets/website/forms/automations/delivery/archive)

---

## 2) Copy website template (if not done already)

Use MCP automation:
- Automation: `copy-website-template`
- Inputs:
  - `client_name`
  - `template`: `static` or `nextjs`

Output:
- `clients/<client>/04_website/` populated from `templates/`

---

## 3) Airtable + n8n wiring

1. Create the client row in Airtable `Clients` table (use `client_id` = folder name).
2. Create/confirm Airtable base + tables per:
   - `company/operations/airtable/MASTER_BASE_SCHEMA.md`
3. In Netlify for the client site:
   - set Airtable env vars (and `CLIENT_ID` for Next.js template)
4. Import the n8n templates:
   - `automations/workflows/n8n/*`

---

## 4) Git + Deploy (manual control)

This repo is **manual-commit by default** (no scripts should auto-commit/push).

Typical flow:
```bash
git checkout -b bootstrap/<client>
git add -A
git commit -m "Bootstrap client: <client>"
git push -u origin bootstrap/<client>
```

