# Setup Automatic Deployment (Git → Netlify)

## Current Status

**Right now:** You have to manually run `netlify deploy --prod` every time you make changes.

**After setup:** Every time you run `git push`, Netlify will automatically deploy your site! 🚀

---

## How to Set It Up

### Step 1: Make Sure Your Code is on GitHub

First, check if your code is pushed to GitHub:

```bash
cd /Users/jencortez-walters/brandedflow
git remote -v
```

**If you see a GitHub URL** (like `https://github.com/yourusername/brandedflow.git`), you're good! Skip to Step 2.

**If you don't see a GitHub URL**, you need to:
1. Create a repository on GitHub
2. Add it as a remote:
   ```bash
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

---

### Step 2: Connect Netlify to GitHub

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Log in to your account

2. **Add New Site from Git**
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose **"GitHub"** (or GitLab/Bitbucket if you use those)

3. **Authorize Netlify**
   - Netlify will ask for permission to access your GitHub
   - Click **"Authorize Netlify"**
   - You may need to enter your GitHub password

4. **Select Your Repository**
   - Find and select your repository (probably `brandedflow` or similar)
   - Click on it

5. **Configure Build Settings**
   
   Netlify will ask for:
   - **Base directory:** Leave blank (or type `clients/aq-remodeling/03_website` if the whole repo)
   - **Build command:** Leave blank (no build needed for static HTML)
   - **Publish directory:** Type `clients/aq-remodeling/03_website` (or just `.` if you're deploying from the website folder)
   
   **Important:** If your whole repo is `brandedflow` but the website is in `clients/aq-remodeling/03_website`, you need to set:
   - **Base directory:** `clients/aq-remodeling/03_website`
   - **Publish directory:** `.` (or leave blank)

6. **Click "Deploy site"**

---

### Step 3: Verify It Works

1. **Make a small change** to any file (like add a comment)
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. **Go to Netlify Dashboard** → Your site → **"Deploys"** tab
4. **You should see a new deploy starting automatically!** 🎉

---

## Alternative: If Your Repo is Just the Website Folder

If you have a separate Git repo just for the website (not the whole brandedflow repo):

1. In Netlify, when selecting the repository:
   - **Base directory:** Leave blank
   - **Publish directory:** `.` (current directory)
   - **Build command:** Leave blank

---

## Troubleshooting

**"Netlify can't find my repo"**
- Make sure the repo is public, OR
- Make sure you've authorized Netlify to access your private repos

**"Deploy fails"**
- Check the deploy logs in Netlify
- Make sure the "Publish directory" is correct
- Make sure all your files are committed and pushed to GitHub

**"Changes not deploying"**
- Make sure you're pushing to the branch Netlify is watching (usually `main` or `master`)
- Check Netlify settings → Build & deploy → Branch to deploy

---

## After Setup

Once connected, **every time you run:**
```bash
git add .
git commit -m "Your message"
git push origin main
```

**Netlify will automatically:**
1. Detect the push
2. Pull the latest code
3. Deploy it to your site
4. Update your live website

**No more manual `netlify deploy` needed!** 🎉

---

## Quick Check: Is It Already Set Up?

To check if auto-deploy is already working:

1. Go to Netlify Dashboard → Your Site
2. Click **"Site settings"** → **"Build & deploy"**
3. Look for **"Continuous Deployment"** section
4. If you see a GitHub repo listed, **you're already set up!** ✅

If you see "Manual deploys" or nothing, follow the steps above.

