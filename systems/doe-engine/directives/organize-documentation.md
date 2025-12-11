# Organize Documentation - Directive

## Purpose
Clean up and organize markdown documentation files, separating general/reusable guides from client-specific documentation.

## When to Use
- After completing a client project with multiple documentation files
- When markdown files accumulate in client folders
- When general guides are mixed with client-specific docs
- When files are superseded or redundant

## Process

### Step 1: Identify File Categories

**General/Reusable Files** (move to hub):
- Git workflows
- Deployment guides
- Tool setup (Cloudinary, Netlify, etc.)
- Media handling workflows
- DNS/domain setup
- Troubleshooting guides
- How-to guides applicable to any client

**Client-Specific Files** (keep in client folder):
- Client reports (updates, summaries)
- Project-specific SEO strategies
- Client-facing documents
- Project status documents
- Client-specific requirements/notes

**Temporary/Superseded Files** (delete):
- One-off instructions (RUN_THIS.md, UPLOAD_VIDEOS_NOW.md)
- Duplicate guides (multiple compression guides)
- Superseded by consolidated versions
- Temporary troubleshooting notes

### Step 2: Create Hub Structure

**Location:** `company/operations/[category]/guides/`

**Structure:**
```
company/operations/
  └── [category]/          (e.g., website-creation, client-intake)
      └── guides/
          ├── README.md    (index of all guides)
          ├── guide-1.md
          ├── guide-2.md
          └── ...
```

### Step 3: Consolidate Similar Files

**Before creating new guides:**
1. Check if similar guide exists in hub
2. If exists: Update existing guide with new information
3. If doesn't exist: Create consolidated guide combining related files

**Consolidation Examples:**
- Multiple compression guides → `video-compression.md`
- Multiple Cloudinary guides → `cloudinary-setup.md` + `cloudinary-troubleshooting.md`
- Multiple deployment guides → `deployment-setup.md`
- Multiple DNS guides → `dns-domain-setup.md`

### Step 4: Organize Client Documentation

**Client Reports** (client-facing):
- Location: `clients/[client-name]/[project]/docs/client-reports/`
- Examples: Update summaries, SEO strategies, project reports

**Internal Documentation**:
- Location: `clients/[client-name]/[project]/docs/`
- Examples: Technical notes, internal strategies, workflows

**Update README:**
- Create/update `docs/README.md` with organized structure
- Include quick access links
- Document what goes where

### Step 5: Delete Superseded Files

**Safe to Delete:**
- Files moved to hub (originals)
- Temporary one-off instructions
- Duplicate guides
- Superseded troubleshooting files

**Keep:**
- Client-specific reports (even if similar to other clients)
- Historical documentation (unless explicitly superseded)
- Configuration files

## Output Structure

### Hub Folder (General Guides)
```
company/operations/[category]/guides/
  ├── README.md                    # Index of all guides
  ├── git-workflow.md
  ├── deployment-setup.md
  ├── video-compression.md
  └── ...
```

### Client Folder (Client-Specific)
```
clients/[client-name]/[project]/
  ├── docs/
  │   ├── README.md               # Index
  │   ├── client-reports/          # Client-facing
  │   │   ├── PROJECT_UPDATE.md
  │   │   └── SEO_STRATEGY.md
  │   └── [internal-docs].md      # Internal
  └── [no markdown files at root]
```

## Best Practices

1. **Don't Create Files Unnecessarily**
   - Check if guide already exists before creating
   - Update existing guides rather than creating duplicates
   - Only create if truly needed

2. **Consolidate When Possible**
   - Combine related guides (e.g., all compression methods in one file)
   - Use sections/headings to organize within single file
   - Reduces file count and improves findability

3. **Clear Naming**
   - Use descriptive, lowercase-kebab-case names
   - Include category in name if needed (e.g., `video-compression.md` not `compression.md`)
   - Avoid temporary names (RUN_THIS, FIX_NOW, etc.)

4. **Update Index Files**
   - Always update `README.md` in guides folder
   - Always update `docs/README.md` in client folder
   - Include quick access links

5. **Document Decisions**
   - Note why files were consolidated
   - Document what was deleted and why
   - Update DECISIONS_LOG.md for major organizational changes

## Self-Annealing

**After organizing, document:**
- What worked well
- What could be improved
- Patterns noticed (common file types, frequent issues)
- Suggestions for future organization

**Update this directive with:**
- New patterns discovered
- Better organization methods
- Common mistakes to avoid

## Example: AQ Remodeling Cleanup (Jan 2025)

**What Was Done:**
- Created `company/operations/website-creation/guides/` with 10 consolidated guides
- Moved 5 client reports to `docs/client-reports/`
- Moved 1 internal doc to `docs/`
- Deleted 18 superseded/temporary files
- Updated README files with new structure

**Result:**
- Root folder: Clean (no markdown files)
- General guides: Reusable across all clients
- Client docs: Well-organized and easy to find
- File count: Reduced from 35+ to organized structure

**Learnings:**
- Consolidation works well (10 guides vs 18+ individual files)
- Client reports folder makes client-facing docs easy to find
- README files essential for navigation
- Temporary files should be deleted immediately after use

