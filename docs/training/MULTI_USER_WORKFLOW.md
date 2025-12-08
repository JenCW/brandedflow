# Multi-User Collaboration Workflow

## Overview

How multiple people can work on Branded + Flow projects simultaneously without conflicts.

---

## 🎯 Core Principles

### 1. Git is the Foundation
- All work tracked in Git
- Pull before starting
- Commit frequently
- Clear commit messages

### 2. Client Profile is Single Source of Truth
- One profile per client
- All team members use same profile
- Updates are additive (don't overwrite)

### 3. Directives Are Shared
- All team members follow same directives
- Directives are living documents (improve over time)
- Updates benefit everyone

### 4. Communication is Key
- Document decisions
- Update CONTEXT.md with current state
- Coordinate on same clients

---

## 🔄 Daily Workflow

### Starting Your Day

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Check CONTEXT.md**
   - See current priorities
   - See what others are working on
   - Understand current state

3. **Check active work**
   - `systems/daily-accountability/active_work.json`
   - See what's in progress
   - Avoid duplicate work

### Working on a Task

1. **Check if client profile exists**
   - `clients/{client-name}/client-profile.json`
   - If exists: Load it, use variations
   - If not: Create it (or coordinate with team)

2. **Follow the directive**
   - Read directive fully
   - Use client profile variations
   - Call MCPs as needed

3. **Update as you go**
   - Update profile when you discover new variations
   - Update CONTEXT.md if affects priorities
   - Commit frequently

### Ending Your Day

1. **Commit your work**
   ```bash
   git add .
   git commit -m "Clear description of what you did"
   git push origin main
   ```

2. **Update active work**
   - Mark tasks complete
   - Update status
   - Note what's pending

---

## 👥 Working on Same Client

### Scenario: Two People Working on Same Client

**Person A:** Building website  
**Person B:** Setting up automation

### How to Handle

**Option 1: Sequential (Recommended)**
- Person A finishes website → Commits → Updates profile
- Person B pulls → Sees website complete → Starts automation
- Uses profile variations automatically

**Option 2: Parallel (If Different Areas)**
- Person A: Works on `03_website/`
- Person B: Works on `04_automation/`
- Both update profile (additive, not overwriting)
- Coordinate via CONTEXT.md or chat

### Profile Updates

**Profile updates are additive:**
```json
// Person A adds:
"automations": {
  "website": { "status": "completed" }
}

// Person B adds (doesn't overwrite):
"automations": {
  "website": { "status": "completed" },
  "lead_magnet": { "status": "in_progress" }
}
```

**Rule:** Always read profile first, then update (don't overwrite).

---

## 🔐 Conflict Resolution

### Git Conflicts

**If you get a merge conflict:**

1. **Don't panic** - Git conflicts are normal
2. **Read the conflict** - See what changed
3. **Resolve carefully** - Keep both changes if possible
4. **Test after resolving** - Make sure everything works
5. **Commit resolution** - Clear message about what you did

### Profile Conflicts

**If two people update profile simultaneously:**

**Solution:** Profile updates are JSON merges
- MCP handles merging automatically
- Last write wins for same field
- Different fields merge together

**Best practice:** Pull before updating profile.

### Directive Conflicts

**If two people update same directive:**

**Solution:** Git merge
- Review both changes
- Keep improvements from both
- Test the merged directive
- Document what changed

---

## 📋 Communication Protocol

### Daily Standup (Optional)

**What to share:**
- What you're working on
- What you completed
- Any blockers
- Client variations discovered

**Where:**
- `docs/internal/CONTEXT.md` (current priorities)
- `systems/daily-accountability/active_work.json` (active work)
- Git commit messages (what changed)

### Documenting Decisions

**When you make a decision:**
1. Update `docs/internal/DECISIONS_LOG.md`
2. Explain: What, why, when
3. Commit with clear message

**Example:**
```markdown
**December 7, 2024**
- **Decision:** Use Wix for Dental Bunny (not static HTML)
- **Why:** Client already uses Wix, easier integration
- **Impact:** Updated build-client-website directive to handle Wix
```

### Updating CONTEXT.md

**Update when:**
- Priorities change
- New client added
- Major system change
- Status updates

**Don't update for:**
- Small file edits
- Routine tasks
- Internal notes

---

## 🛠️ Tools for Collaboration

### Git

**Essential commands:**
```bash
git pull          # Get latest changes
git status         # See what changed
git add .          # Stage changes
git commit -m ""   # Commit with message
git push           # Share changes
```

**Branch strategy:**
- `main` branch = Production
- Feature branches = For experiments (optional)
- Merge to main when ready

### Client Profiles

**Location:** `clients/{client-name}/client-profile.json`

**Rules:**
- Always read before updating
- Updates are additive
- Don't overwrite others' work
- Commit after updating

### Directives

**Location:** `systems/doe-engine/directives/`

**Rules:**
- Read before using
- Update with learnings (ask first)
- Don't delete or overwrite
- Improve over time

---

## 📊 Tracking Work

### Active Work File

**Location:** `systems/daily-accountability/active_work.json`

**Contains:**
- What's in progress
- Who's working on what
- Status of tasks

**Update when:**
- Starting a task
- Completing a task
- Blocked on something

### CONTEXT.md

**Location:** `docs/internal/CONTEXT.md`

**Contains:**
- Current priorities
- Active clients
- System status

**Update when:**
- Priorities change
- New client added
- Major updates

---

## 🚨 Common Scenarios

### Scenario 1: Same Client, Different Tasks

**Person A:** Building website  
**Person B:** Setting up CRM

**Solution:**
- Work in different folders (`03_website/` vs `04_automation/`)
- Both can update profile (different sections)
- Pull before starting, commit when done
- No conflicts expected

### Scenario 2: Same Task, Different Approaches

**Person A:** Tries approach A  
**Person B:** Tries approach B

**Solution:**
- Communicate first (check CONTEXT.md)
- Coordinate via chat or CONTEXT.md
- Choose one approach
- Document why in DECISIONS_LOG.md

### Scenario 3: Profile Update Conflict

**Person A:** Updates profile with website status  
**Person B:** Updates profile with automation status

**Solution:**
- MCP handles merging automatically
- Both updates saved
- No manual conflict resolution needed

### Scenario 4: Directive Improvement

**Person A:** Improves directive based on experience  
**Person B:** Also improves same directive

**Solution:**
- Git merge both improvements
- Keep best parts of both
- Test merged directive
- Document what changed

---

## ✅ Best Practices

### Do's

✅ **Pull before starting** - Get latest changes  
✅ **Check profile first** - Don't duplicate work  
✅ **Update profile after** - Document what you did  
✅ **Commit frequently** - Small, clear commits  
✅ **Communicate** - Update CONTEXT.md, clear commit messages  
✅ **Test after merging** - Make sure everything works  
✅ **Document decisions** - Update DECISIONS_LOG.md

### Don'ts

❌ **Don't work on same file simultaneously** - Coordinate first  
❌ **Don't overwrite profile** - Read first, update additively  
❌ **Don't skip pulling** - Always get latest changes  
❌ **Don't commit without message** - Clear messages help everyone  
❌ **Don't delete others' work** - Review before deleting  
❌ **Don't work in isolation** - Update CONTEXT.md, communicate

---

## 🎯 Summary

**Multi-user workflow:**
1. ✅ Git tracks everything
2. ✅ Client profiles are single source of truth
3. ✅ Directives are shared and improved
4. ✅ Communication via CONTEXT.md and commits
5. ✅ Profile updates are additive (no conflicts)
6. ✅ System handles variations automatically

**Result:**
- Multiple people can work simultaneously
- No conflicts (Git + additive profiles)
- Consistency maintained
- System improves for everyone

---

**The system is designed for collaboration. Git + profiles + directives = smooth multi-user workflow.**

