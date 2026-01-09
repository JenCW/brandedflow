# Repo Hygiene Report (Busy-Proof Setup)

**Purpose:** Identify what is canonical vs outdated/duplicate, and define the cleanup actions that stop drift so the repo can support a solo agency running multiple clients + automations.

**Status:** Draft (generated during Phase 0 execution)

---

## 1) Canonical sources of truth (keep)

### Company (Branded+Flow)
- **Constitution (stable project rules):** `project_config.md`
- **Dynamic brain (what’s happening now):** `workflow_state.md`
- **Company voice/positioning (defaults only):** `docs/training/MASTER_BRAND_GUIDE.md`
- **Company visual system (defaults only):** `company/website/site/BRAND_STYLE_GUIDE.md`

### Client-specific (must override company defaults)
For any client deliverable, **agents must read client files first**:
1. `clients/<client>/02_brand/` (tone, positioning, palette, typography, design style)
2. `clients/<client>/03_brand_assets/` (logos, images, fonts)
3. `clients/<client>/01_intake/` or `02_intake/` (requirements, constraints)
4. Only if missing: Branded+Flow defaults (above)

---

## 2) Confirmed duplicates / “looks canonical but isn’t”

### Template copies (OK)
These are templates and **should remain**:
- `templates/project_config.md` (template)
- `templates/workflow_state.md` (template)

### AI rules duplication (needs consolidation)
- **Current “mandatory” AI rules doc:** `docs/internal/AI_RULES.md`
  - Contains outdated references:
    - Points to `docs/CONTEXT.md` (does not exist; current file is `docs/internal/CONTEXT.md`)
    - Mentions `systems/daily-accountability/` as LIVE, but daily ops has been removed per `workflow_state.md`
    - Uses an older client website path: `clients/{client-name}/website/` (current repo uses numbered sections like `03_website/` or `04_website/`)
- **Reference-only AI rules doc:** `docs/reference/AI_RULES_REFERENCE_ONLY.md`
  - Explicitly marked as reference only.

**Action:** make one canonical AI “how to work” doc and mark the rest as archived/reference with hard pointers.

---

## 3) Root structure mismatch (causes constant confusion)

`project_config.md` says only these root folders are permitted:
- `clients/`, `company/`, `docs/`, `automations/`, `systems/`, `templates/`

But the repo root also contains:
- `cursor/` (dispatcher entrypoint)
- `scripts/` (repo safety checks)
- `worker.py` (worker entrypoint)

**Action:** either:
- update `project_config.md` to explicitly allow these as “system entrypoints” (recommended: minimal churn), or
- migrate them under `systems/` and update all references (more churn).

---

## 4) Repo-wide enforcement drift (.cursorrules)

There are multiple `.cursorrules` files:
- `/.cursorrules` (canonical)
- folder-level: `clients/.cursorrules`, `company/.cursorrules`, `docs/.cursorrules`, `systems/.cursorrules`, `templates/.cursorrules`, `automations/.cursorrules`, `company/website/.cursorrules`, `company/website/site/.cursorrules`

**Risk:** folder-level rule files drift over time and become inconsistent, which breaks “undeniable” DOE enforcement.

**Action:** choose one strategy and enforce it deterministically:
- **Strategy A (preferred):** root `.cursorrules` is canonical; folder-level `.cursorrules` are short pointer stubs (stop + open repo root).
- **Strategy B:** folder-level `.cursorrules` are exact generated copies of a canonical header; pre-commit fails if they differ.

---

## 5) Client deployment docs (legitimate per-client copies)
These are not “bad duplicates” — they are per-deployable-site:
- `clients/enzo-mortgages/DEPLOYMENT_GUIDE.md`
- `company/website/site/DEPLOYMENT_GUIDE.md`

---

## 6) Immediate cleanup actions (Phase 0 outcomes)

1. Decide + enforce canonical “live” docs and archive/redirect outdated ones.
2. Align `docs/internal/AI_RULES.md` with current repo reality (or replace it with a canonical ops doc).
3. Resolve root-structure mismatch (update constitution or migrate entrypoints).
4. Implement deterministic guardrails:
   - block new root folders not approved
   - block duplicate “source of truth” files
   - block direct execution bypass (integrate `scripts/check-no-direct-exec.sh`)
   - ensure `.cursorrules` strategy cannot drift

