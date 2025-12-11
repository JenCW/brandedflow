# DOCUMENTATION UPDATE CHECKLIST
**Last Updated:** December 3, 2024

Quick reference guide for "what gets updated where" when things change.

---

## 🎯 SOURCE OF TRUTH HIERARCHY

**Priority 1: CONTEXT.md** (always current)
- Update when: Priorities change, client status changes, urgent deadlines
- Location: [docs/CONTEXT.md](../../docs/CONTEXT.md)
- Frequency: Daily/weekly as needed

**Priority 2: Status Docs** (updated regularly)
- CLIENT_STATUS.md - Client pipeline and deliverables
- DECISIONS_LOG.md - Major business decisions
- Frequency: When changes occur

**Priority 3: Detailed Docs** (updated when systems change)
- TECH_STACK.md, QUICK_STARTS.md, OPERATIONS_MANUAL.md
- Frequency: Monthly or when fundamentals change

---

## 📋 WHAT TO UPDATE WHEN

### When You Win/Lose a Client
- [ ] Update [docs/CLIENT_STATUS.md](../../docs/CLIENT_STATUS.md) - Add to pipeline or move to active/lost
- [ ] Update [docs/CONTEXT.md](../../docs/CONTEXT.md) - Update active clients section
- [ ] Update revenue tracking in company/accounting/ (if won)
- [ ] Update portfolio/case studies (after delivery)

### When You Add/Change a Service
- [ ] Update [docs/QUICK_STARTS.md](../../docs/QUICK_STARTS.md) - Service definition
- [ ] Update [docs/TECH_STACK.md](../../docs/TECH_STACK.md) - If new tool required
- [ ] Update pricing in templates/proposals/
- [ ] Update company/website/ content (when site is built)

### When You Make a Major Decision
- [ ] Add entry to [docs/DECISIONS_LOG.md](../../docs/DECISIONS_LOG.md) - Use template at bottom
- [ ] Update [docs/CONTEXT.md](../../docs/CONTEXT.md) - If affects current priorities
- [ ] Update affected docs (TECH_STACK, OPERATIONS_MANUAL, etc.)

### When Priorities Change
- [ ] Update [docs/CONTEXT.md](../../docs/CONTEXT.md) - Current priorities section
- [ ] Update todo lists/task tracking
- [ ] Update daily-accountability system goals (if needed)

### When You Add a New Tool
- [ ] Update [docs/TECH_STACK.md](../../docs/TECH_STACK.md) - Add to relevant category
- [ ] Update [docs/TECH_STACK.md](../../docs/TECH_STACK.md) - Monthly cost breakdown
- [ ] Update [docs/AI_WORKFLOW_GUIDE.md](../../docs/AI_WORKFLOW_GUIDE.md) - If AI tool
- [ ] Update [docs/DECISIONS_LOG.md](../../docs/DECISIONS_LOG.md) - Why chosen

### When You Build an MCP/Automation
- [ ] Create documentation in automations/
- [ ] Update [docs/QUICK_STARTS.md](../../docs/QUICK_STARTS.md) - If client-facing
- [ ] Update [docs/OPERATIONS_MANUAL.md](../../docs/OPERATIONS_MANUAL.md) - If internal workflow
- [ ] Update [docs/CONTEXT.md](../../docs/CONTEXT.md) - If affects current capabilities

### When Tech Stack Changes
- [ ] Update [docs/TECH_STACK.md](../../docs/TECH_STACK.md) - Tool added/removed/changed
- [ ] Update [docs/DECISIONS_LOG.md](../../docs/DECISIONS_LOG.md) - Why changed
- [ ] Update [docs/CONTEXT.md](../../docs/CONTEXT.md) - If affects current stack
- [ ] Update affected client docs if impacts delivery

### When Organizing Documentation
- [ ] Follow directive: `systems/doe-engine/directives/organize-documentation.md`
- [ ] Move general guides to `company/operations/[category]/guides/`
- [ ] Organize client docs in `clients/[client-name]/[project]/docs/`
- [ ] Delete superseded/temporary files
- [ ] Update README files in both locations
- [ ] Update this checklist if new patterns discovered

### Weekly Review (Recommended)
- [ ] Review [docs/CONTEXT.md](../../docs/CONTEXT.md) - Still accurate?
- [ ] Review [docs/CLIENT_STATUS.md](../../docs/CLIENT_STATUS.md) - Pipeline current?
- [ ] Update priorities for upcoming week
- [ ] Archive old versions if major changes made

### Monthly Review (Recommended)
- [ ] Review all docs for accuracy
- [ ] Archive outdated docs to docs/archive/
- [ ] Update revenue/financial tracking
- [ ] Review "Decisions to Revisit" section in DECISIONS_LOG.md

---

## 🗂️ FILE LOCATIONS QUICK REFERENCE

### Must Update Often
- `docs/CONTEXT.md` - Master context (update daily/weekly)
- `docs/CLIENT_STATUS.md` - Client pipeline (update when status changes)
- `company/accounting/` - Financial tracking (update daily)

### Update When Changes
- `docs/DECISIONS_LOG.md` - Major decisions (add entry when made)
- `docs/TECH_STACK.md` - Tool changes (update when tools change)
- `docs/QUICK_STARTS.md` - Service changes (update when services change)

### Update Rarely
- `docs/OPERATIONS_MANUAL.md` - How to run business (update when process changes)
- `docs/MASTER_BRAND_GUIDE.md` - Brand identity (update when brand evolves)
- `docs/AI_WORKFLOW_GUIDE.md` - AI tool usage (update when workflow changes)

### Reference Only (Don't Update)
- `docs/INIT.md` - Session starter (static instructions)
- `README.md` - Project navigation (only update if structure changes)

---

## ⚠️ COMMON MISTAKES TO AVOID

1. **Don't update old files** - If you see "(1)" or "(2)" in filename, you're editing the wrong file
2. **Don't skip CONTEXT.md** - It's the one file that MUST always be current
3. **Don't forget DECISIONS_LOG** - If you made a significant decision, log it immediately
4. **Don't let CLIENT_STATUS drift** - Update within 24 hours of status change
5. **Don't update multiple places** - Check this list first to know what actually needs updating

---

## 🔄 AUTOMATION OPPORTUNITIES (Future Phase 4)

Ideas for reducing manual updates:
- Git hook to prompt for CONTEXT.md update on commit
- Script to generate CLIENT_STATUS.md from Airtable CRM
- Daily reminder to review/update CONTEXT.md
- Automated changelog from git commits
- MCP to check if docs match current reality

---

## 📝 VERSION HISTORY

**December 3, 2024** - Created checklist during folder reorganization
