# How to Use Claude Code

**Claude Code is integrated into Cursor IDE - you don't "open" it separately!**

---

## 🚀 Quick Start

### In Cursor IDE:

1. **Open Cursor** (your IDE)
2. **Open your project folder:**
   - File → Open Folder
   - Navigate to `clients/{client-name}/03_website/`

3. **Access Claude Code:**
   - **Press `Cmd+L` (Mac) or `Ctrl+L` (Windows)** - Opens chat panel
   - OR click the chat icon in the sidebar
   - OR use `Cmd+K` for inline edits

4. **Start typing your prompt:**
   ```
   Build a complete static website for [client name]...
   ```

---

## 💬 Three Ways to Use Claude Code in Cursor

### 1. Chat Panel (Cmd+L / Ctrl+L)
- **Best for:** Full conversations, building entire files
- Opens a chat sidebar
- Can see full conversation history
- Can ask follow-up questions

### 2. Inline Edit (Cmd+K / Ctrl+K)
- **Best for:** Quick edits to existing code
- Select code, press Cmd+K
- Claude suggests edits inline
- Great for refactoring

### 3. Composer (Cmd+I / Ctrl+I)
- **Best for:** Multi-file changes
- Opens composer panel
- Can edit multiple files at once
- Great for building entire features

---

## 🎯 For Building Websites: Use Chat (Cmd+L)

**Recommended workflow:**

1. **Open Cursor**
2. **Open your website folder:**
   ```bash
   cd clients/{client-name}/03_website
   # Then in Cursor: File → Open Folder → select 03_website
   ```

3. **Press `Cmd+L`** (or `Ctrl+L` on Windows)

4. **Type your prompt:**
   ```
   Build a complete static website for [client name], a [business type] in [location].
   
   Create:
   - index.html with hero, services, about, contact sections
   - css/style.css with modern responsive design
   - js/script.js with mobile menu and form validation
   - robots.txt and sitemap.xml
   
   Make it production-ready for Netlify.
   ```

5. **Claude Code will:**
   - Create the files in your current folder
   - Write the code
   - You can see it appear in real-time

---

## 🔧 If You Don't Have Cursor

### Option 1: Install Cursor
- Download from [cursor.sh](https://cursor.sh)
- It's free (with Pro option available)
- Works like VS Code but with AI built-in

### Option 2: Use Claude Code Web Interface
- Go to [claude.ai/code](https://claude.ai/code) (if available)
- Upload files or paste code
- Less integrated, but works

### Option 3: Use VS Code + GitHub Copilot
- Similar experience
- But Claude Code is better for this workflow

---

## 📋 Step-by-Step: Building Your First Website

1. **Open Terminal:**
   ```bash
   cd /Users/jencortez-walters/brandedflow
   mkdir -p clients/{client-name}/03_website/{css,js,images}
   ```

2. **Open Cursor:**
   - Open Cursor app
   - File → Open Folder
   - Select `clients/{client-name}/03_website/`

3. **Start Claude Code Chat:**
   - Press `Cmd+L` (Mac) or `Ctrl+L` (Windows)
   - Chat panel opens on the right

4. **Type your prompt:**
   ```
   Build a complete static website for [CLIENT NAME]...
   ```

5. **Watch it build:**
   - Files appear in your folder
   - Code is written
   - You can ask for changes

6. **Test locally:**
   ```bash
   cd clients/{client-name}/03_website
   python3 -m http.server 8000
   # Open http://localhost:8000 in browser
   ```

---

## 🎨 Example: Complete Workflow

**In Cursor, with folder open:**

```
You: Build index.html for a restaurant website with hero, menu, about, contact sections

Claude: [Creates index.html]

You: Now create style.css with elegant restaurant styling, warm colors, responsive

Claude: [Creates css/style.css]

You: Add mobile menu functionality to script.js

Claude: [Creates/updates js/script.js]

You: Make the hero section more dramatic

Claude: [Updates index.html and style.css]
```

---

## ⚡ Keyboard Shortcuts (Mac)

- `Cmd+L` - Open chat panel
- `Cmd+K` - Inline edit selected code
- `Cmd+I` - Composer (multi-file)
- `Cmd+Shift+L` - Focus chat input

**Windows/Linux:**
- Replace `Cmd` with `Ctrl`

---

## 🆘 Troubleshooting

**"I don't see Claude Code"**
- Make sure you're using Cursor (not VS Code)
- Check if you need to sign in to Cursor
- Try restarting Cursor

**"Chat panel won't open"**
- Try `Cmd+L` again
- Check View → Command Palette → "Open Chat"
- Make sure Cursor is updated

**"Claude Code isn't responding"**
- Check internet connection
- Try a simpler prompt first
- Restart Cursor

---

## 💡 Pro Tips

1. **Be specific:** The more detail you give, the better the output
2. **Iterate:** Start simple, then refine
3. **Use context:** Claude Code sees your entire folder, so reference existing files
4. **Ask follow-ups:** "Make it more modern" or "Add animations"
5. **Test as you go:** Open files in browser to see results

---

## 🎯 For Your Workflow

**Best approach:**
1. Open Cursor
2. Open website folder
3. Press `Cmd+L`
4. Start building!

**That's it!** Claude Code is always available in Cursor - just press `Cmd+L` and start chatting.

---

**Need help?** Claude Code can see your entire project, so you can ask:
- "What files do I have?"
- "Show me the structure"
- "Help me build X"

Just start chatting! 🚀

