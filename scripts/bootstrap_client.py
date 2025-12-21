#!/usr/bin/env python3
import argparse, datetime, os, re, subprocess, sys
from pathlib import Path

FOLDERS = [
  "01_admin", "02_intake", "03_brand_assets", "04_website",
  "05_forms", "06_automations", "07_delivery"
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

def run(cmd, cwd=None):
  subprocess.run(cmd, cwd=cwd, check=True)

def slug(s):
  s = s.strip().lower()
  s = re.sub(r"[^a-z0-9\-]", "-", s)
  s = re.sub(r"-+", "-", s).strip("-")
  return s

def main():
  ap = argparse.ArgumentParser()
  ap.add_argument("client_code")
  ap.add_argument("--name", required=True, help="Client display name")
  ap.add_argument("--base", default="clients", help="Base folder (default: clients)")
  args = ap.parse_args()

  client_code = slug(args.client_code)
  client_name = args.name.strip()
  today = datetime.date.today().strftime("%Y%m%d")
  branch = f"bootstrap/{client_code}-{today}"

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

  # Git workflow
  try:
    run(["git", "checkout", "-b", branch])
  except subprocess.CalledProcessError:
    print(f"❌ Error: Failed to create git branch '{branch}'")
    print("   Make sure you're in a git repository and the branch doesn't already exist.")
    sys.exit(1)

  try:
    run(["git", "add", str(client_root)])
  except subprocess.CalledProcessError:
    print(f"❌ Error: Failed to stage files in {client_root}")
    sys.exit(1)

  try:
    run(["git", "commit", "-m", f"Bootstrap client: {client_code}"])
  except subprocess.CalledProcessError:
    print(f"❌ Error: Failed to commit changes")
    print("   There may be no changes to commit, or git is not properly configured.")
    sys.exit(1)

  try:
    run(["git", "push", "-u", "origin", branch])
  except subprocess.CalledProcessError:
    print(f"❌ Error: Failed to push branch '{branch}' to origin")
    print("   Check your git remote configuration and network connection.")
    sys.exit(1)

  # Open PR via gh (recommended)
  try:
    run(["gh", "pr", "create",
         "--title", f"Bootstrap client: {client_code}",
         "--body", f"Creates standard folder skeleton + DOE files for {client_name}.",
         "--base", "main"])
    print("✅ PR opened.")
  except subprocess.CalledProcessError:
    print("⚠️ Couldn't run `gh pr create`. Install/login to gh, or open PR manually in GitHub.")
    print("   Install: brew install gh")
    print("   Login:   gh auth login")
    sys.exit(1)

if __name__ == "__main__":
  main()
