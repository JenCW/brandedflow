#!/usr/bin/env python3
import argparse, datetime, json, os, re, shutil, sys
from pathlib import Path

FOLDERS = [
  "01_admin",
  "02_intake",
  "02_brand",
  "03_brand_assets",
  "04_website",
  "05_forms",
  "06_automations",
  "07_delivery",
  "99_archive",
]

LINKS_MD = """# {client_name} — Links
- Repo:
- Live Site:
- Domain/DNS:
- Intake Form(s):
- Airtable Base/Table/View:
- n8n Workflows:
- Base44 Portal:
- Notes:
"""

DOE_MD = """# DOE — {client_name}

## Directive
- Goal (done means):
- Primary pages:
- Intake source(s):
- Data destination (Airtable tables):
- Client portal (Base44): yes/no
- Compliance/PII rules:

## Orchestration
- Lead stages:
- Triggers (Airtable → n8n):
- Notifications:
- KPI rollups:

## Execution
- Repo path:
- Deploy target (Replit/Netlify/Vercel):
- Key commands:
- Handoff checklist:
"""

def slug(s):
  s = s.strip().lower()
  s = re.sub(r"[^a-z0-9\-]", "-", s)
  s = re.sub(r"-+", "-", s).strip("-")
  return s

def copy_template(repo_root: Path, template: str, dest: Path):
  if template == "none":
    return
  template_dir = repo_root / "templates" / ("client-website-nextjs" if template == "nextjs" else "client-website-static")
  if not template_dir.exists():
    raise FileNotFoundError(f"Template folder not found: {template_dir}")
  if dest.exists() and any(dest.iterdir()):
    raise FileExistsError(f"Destination already has files: {dest}")
  shutil.copytree(template_dir, dest, dirs_exist_ok=True)

def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("client_code")
  ap.add_argument("--name", required=True, help="Client display name")
  ap.add_argument("--base", default="clients", help="Base folder (default: clients)")
  ap.add_argument("--website-template", choices=["static", "nextjs", "none"], default="static")
  ap.add_argument("--industry", default="", help="Optional industry label (e.g. Mortgage, Catering)")
  args = ap.parse_args()

  client_code = slug(args.client_code)
  client_name = args.name.strip()

  repo_root = Path.cwd()
  client_root = repo_root / args.base / client_code
  client_root.mkdir(parents=True, exist_ok=True)

  # Create folders + .keep so Git tracks them
  for f in FOLDERS:
    d = client_root / f
    d.mkdir(parents=True, exist_ok=True)
    (d / ".keep").write_text("keep\n", encoding="utf-8")

  (client_root / "00_links.md").write_text(LINKS_MD.format(client_name=client_name), encoding="utf-8")
  (client_root / "DOE_directive.md").write_text(DOE_MD.format(client_name=client_name), encoding="utf-8")

  # Create client-profile.json (single source of truth)
  profile_path = client_root / "client-profile.json"
  if not profile_path.exists():
    profile = {
      "client_id": client_code,
      "display_name": client_name,
      "industry": args.industry.strip() or None,
      "paths": {
        "brand": f"clients/{client_code}/02_brand/",
        "brand_assets": f"clients/{client_code}/03_brand_assets/",
        "website": f"clients/{client_code}/04_website/",
        "automations": f"clients/{client_code}/06_automations/"
      },
      "website": {
        "template": args.website_template,
        "netlify_site_id": None,
        "url": None
      },
      "lead_intake": {
        "airtable_base_id": None,
        "airtable_table": "Leads"
      }
    }
    profile_path.write_text(json.dumps(profile, indent=2) + "\n", encoding="utf-8")

  # Optional: copy website template into 04_website
  website_dir = client_root / "04_website"
  copy_template(repo_root, args.website_template, website_dir)

  print("✅ Client bootstrap complete (no git actions were performed).")
  print(f"- Client folder: {client_root}")
  print(f"- Website template: {args.website_template} → {website_dir}")
  print("")
  print("Next steps:")
  print("1) Add client brand guide: clients/<client>/02_brand/")
  print("2) Add logos/assets: clients/<client>/03_brand_assets/")
  print("3) Set Netlify env vars (see template ENV_VARS.md if using nextjs)")
  print("4) Commit when ready (manual): git add -A && git commit -m \"Bootstrap client: <client>\"")

if __name__ == "__main__":
  main()
