# How to Add Videos/Photos from iPhone Messages to Website

## The Challenge
Videos and photos in iPhone Messages aren't automatically synced to iCloud Drive or Photos. You need to manually save/export them.

## Option 1: Save to Photos, Then Export (Easiest)

### Step 1: Save from Messages on iPhone
1. Open Messages app on your iPhone
2. Find the conversation with the videos/photos
3. Long-press on each video/photo you want
4. Tap **"Save"** (saves to Photos app)

### Step 2: Export from Photos on Mac
1. Open **Photos app** on your Mac
2. Find the videos you just saved
3. Select the videos you want
4. Go to **File → Export → Export [X] Photos**
5. Choose format and location
6. Export to: `/Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website/images/Work-pics-and-vids`

---

## Option 2: AirDrop Direct to Website Folder

### Step 1: On iPhone
1. Open Messages
2. Long-press on video/photo
3. Tap **Share**
4. Tap **AirDrop**
5. Select your Mac

### Step 2: On Mac
1. When AirDrop notification appears, click **Accept**
2. The file will download to your Downloads folder
3. Move it to: `/Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website/images/Work-pics-and-vids`

Or, when AirDrop asks where to save, choose the website folder directly.

---

## Option 3: Use iPhone File Sharing (If Connected)

### Step 1: Connect iPhone
1. Connect iPhone to Mac via USB cable
2. Trust the computer on iPhone if prompted

### Step 2: Use Image Capture
1. Open **Image Capture** app (built into Mac)
2. Select your iPhone
3. Select videos/photos you want
4. Choose destination folder: `clients/aq-remodeling/03_website/images/Work-pics-and-vids`
5. Click **Import**

---

## Option 4: Use Finder (macOS Catalina+)

1. Connect iPhone via USB
2. Open **Finder**
3. Click on your iPhone in sidebar
4. Go to **Files** tab
5. If Messages files are accessible, drag them to website folder

---

## Option 5: iCloud Messages Sync (If Enabled)

If you have Messages in iCloud enabled:
1. Videos might sync to Messages app on Mac
2. Open **Messages app** on Mac
3. Find the conversation
4. Right-click video → **Save Attachment**
5. Save to website folder

---

## Quickest Method (Recommended)

**Use AirDrop:**
1. iPhone: Open Messages → Long-press video → Share → AirDrop → Your Mac
2. Mac: Accept AirDrop → Save directly to website folder when prompted
3. Or save to Downloads, then drag to website folder

**Website folder path:**
```
/Users/jencortez-walters/brandedflow/clients/aq-remodeling/03_website/images/Work-pics-and-vids
```

---

## After Adding Videos

Once videos are in the folder, you can:
1. Add them to portfolio.html
2. Create video testimonials section
3. Deploy: `cd 03_website && netlify deploy --prod`

Need help adding specific videos to specific pages? Let me know!



