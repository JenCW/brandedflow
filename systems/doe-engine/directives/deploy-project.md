---
id: deploy-project
task_type: deploy
project_id: brandedflow
version: 1
require_ack: true
auto_anneal: true
retry:
  count: 2
  backoff_ms: 5000
fix_script: systems/doe-engine/execution/fix_deploy_project.py
owner: jen
---

# Deploy Project - Directive

## Goal

Safely deploy a site or release artifact to production.

## Steps

1. Confirm artifact or site zip exists in `releases/` or client folder
2. Create DB backup (if applicable)
3. Run migrations (if applicable)
4. Deploy to target environment
5. Run smoke tests to verify deployment
6. On failure, follow self-anneal flow

## Edge Cases

- If DB migration locks > 0.5s, abort and notify owner
- If artifact missing, create anneal bundle
- If deployment fails, retry according to retry config

## Outputs

- Deployment status
- Deployment logs
- Error details (if failed)
