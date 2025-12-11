# Simple Git Commit Guide

## The 3-Step Process (Always the Same)

### Step 1: Stage Your Changes
```bash
git add .
```
This tells Git: "I want to save these changes"

### Step 2: Commit Your Changes
```bash
git commit -m "Describe what you changed"
```
This saves the changes with a message

### Step 3: Push to GitHub/Netlify
```bash
git push origin main
```
This uploads your changes so they go live

---

## For This Specific Fix

Since we just fixed `contact.html`, here's what to run:

```bash
cd /Users/jencortez-walters/brandedflow
git add clients/aq-remodeling/03_website/contact.html
git commit -m "Fix contact.html: Update phone numbers and contact info to Nia Prinia's details"
git push origin main
```

---

## What Each Command Does

- **`git add .`** = "Save everything I changed"
- **`git add filename`** = "Save just this one file"
- **`git commit -m "message"`** = "Actually save it with this description"
- **`git push origin main`** = "Upload it to the internet"

---

## If Something Goes Wrong

**If you see "commit in progress":**
```bash
git reset
```
This cancels the commit and lets you start over.

**If you want to see what changed:**
```bash
git status
```

**If you want to see what files changed:**
```bash
git diff
```

---

## That's It!

Just remember: **Add → Commit → Push**

