# Bootstrap Branch Cleanup Guide

## Overview

The bootstrap branches (`bootstrap/enzo-mortgages-20251221` and `bootstrap/habibi-20251221`) were temporary branches created to set up new clients. They have been merged into `main` and are no longer needed.

## Safety Check

Before deleting, verify:

1. ✅ Both branches have been merged into `main`
2. ✅ Netlify is configured to deploy from `main` (not bootstrap branch)
3. ✅ All important code is in `main` branch

## Delete Bootstrap Branches

### Option 1: Delete from GitHub (Recommended)

**For Enzo Mortgages branch:**
```bash
git push origin --delete bootstrap/enzo-mortgages-20251221
```

**For Habibi branch:**
```bash
git push origin --delete bootstrap/habibi-20251221
```

### Option 2: Delete Both at Once

```bash
git push origin --delete bootstrap/enzo-mortgages-20251221 bootstrap/habibi-20251221
```

## Verify Deletion

After running the delete commands:

```bash
git fetch --prune
git branch -r
```

You should **NOT** see:
- `origin/bootstrap/enzo-mortgages-20251221`
- `origin/bootstrap/habibi-20251221`

## What This Does

- ✅ Removes the branches from GitHub
- ✅ Keeps all code safe (it's already in `main`)
- ✅ Cleans up repository structure
- ✅ Prevents confusion about which branch to use

## What This Does NOT Do

- ❌ Does NOT delete any code (it's all in `main`)
- ❌ Does NOT affect local branches (if you have them)
- ❌ Does NOT affect `main` branch

## Local Cleanup (Optional)

If you have local copies of these branches, you can delete them:

```bash
# Check if you have local bootstrap branches
git branch | grep bootstrap

# If you see them, delete locally:
git branch -d bootstrap/enzo-mortgages-20251221
git branch -d bootstrap/habibi-20251221

# Force delete if needed (if not fully merged locally):
git branch -D bootstrap/enzo-mortgages-20251221
git branch -D bootstrap/habibi-20251221
```

## After Cleanup

1. ✅ Verify Netlify is deploying from `main`
2. ✅ Test that deployments still work
3. ✅ Update any remaining documentation references

## Rollback (If Needed)

If you accidentally delete and need to restore:

```bash
# Recreate from the merge commit
git checkout -b bootstrap/enzo-mortgages-20251221 dbbdfbc
git push origin bootstrap/enzo-mortgages-20251221
```

But this shouldn't be necessary since everything is in `main`.

