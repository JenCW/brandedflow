# File Cleanup System - Prevents File Accumulation

## The Problem You Identified

**You're right to be concerned:**
- ❌ Files can accumulate and conflict
- ❌ Outdated files can show incorrect information
- ❌ Duplicate files can cause confusion
- ❌ System can get messy over time

**We need:**
- ✅ Conflict detection
- ✅ Superseded file handling
- ✅ Duplicate detection
- ✅ Automatic cleanup

---

## File Cleanup System

### What It Does

**Every time Daily Ops runs:**
1. **Detects conflicts** - Similar/conflicting items
2. **Handles superseded** - Archives old superseded files
3. **Detects duplicates** - Finds duplicate files
4. **Cleans old files** - Archives old temporary files

**Result:**
- ✅ No file accumulation
- ✅ Conflicts flagged for resolution
- ✅ Superseded files archived
- ✅ System stays clean

---

## Conflict Detection

### How It Works

**Detects:**
- Similar decisions (70%+ similarity)
- Similar tasks (70%+ similarity)
- Conflicting information

**What Happens:**
- Conflicts written to `conflicts.md`
- Flagged on dashboard
- You review and resolve

**Example:**
```
Decision 1: "Use client profile for proposals"
Decision 2: "Use client profile for proposal customization"
→ Detected as conflict (similar)
→ Flagged for your review
```

---

## Superseded File Handling

### How It Works

**Tracks:**
- Decision versions
- When decisions were superseded
- Which version is current

**What Happens:**
- Old superseded decisions archived after 7 days
- Current version shown on dashboard
- Old versions archived (not deleted)

**Example:**
```
Decision v1: "Use Typeform for intake" (superseded)
Decision v2: "Use Airtable for intake" (current)
→ v1 archived after 7 days
→ Only v2 shown on dashboard
```

---

## Duplicate Detection

### How It Works

**Detects:**
- Files with similar names
- Multiple versions of same file
- Potential duplicates

**What Happens:**
- Duplicates flagged
- Warning if too many duplicates
- You review and clean up

**Example:**
```
file-v1.md
file-v2.md
file-final.md
→ Detected as duplicates
→ Flagged for review
```

---

## Old File Cleanup

### How It Works

**Finds:**
- Old temporary files (*.tmp, *.bak, *.old)
- Files older than 30 days
- Unused files

**What Happens:**
- Old files archived (not deleted)
- Keeps system clean
- Preserves history

**Example:**
```
old-backup.md (45 days old)
→ Archived to archive/
→ Removed from active files
```

---

## Automatic Cleanup

### When It Runs

**Every Daily Ops run:**
- Detects conflicts
- Archives superseded files
- Detects duplicates
- Cleans old files

**Result:**
- ✅ System stays clean
- ✅ No file accumulation
- ✅ Conflicts flagged
- ✅ Outdated files archived

---

## What You'll See

### Dashboard Shows

**Conflicts:**
- Similar/conflicting items
- Flagged for your review
- You resolve manually

**Superseded:**
- Old versions archived
- Only current shown
- History preserved

**Duplicates:**
- Potential duplicates flagged
- You review and clean up

---

## Your Workflow

### Daily

**Morning:**
1. Double-click Dashboard.app
2. See conflicts (if any)
3. Resolve conflicts
4. Review duplicates (if any)
5. Clean up if needed

**During Day:**
- System automatically:
  - Detects conflicts
  - Archives superseded
  - Flags duplicates
  - Cleans old files

**Evening:**
- Review any remaining issues
- Clean up if needed
- System stays clean

---

## Summary

### The System Prevents

- ✅ File accumulation
- ✅ Conflicting information
- ✅ Outdated files showing
- ✅ Duplicate files
- ✅ System getting messy

### The System Does

- ✅ Detects conflicts automatically
- ✅ Archives superseded files
- ✅ Flags duplicates
- ✅ Cleans old files
- ✅ Keeps system clean

**Your system will stay clean and organized!**

---

**Last Updated:** December 8, 2024
**Status:** Active - File Cleanup System Implemented

