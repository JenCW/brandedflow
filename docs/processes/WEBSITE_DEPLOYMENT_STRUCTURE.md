# Website Deployment Structure Guide

**Last Updated:** December 5, 2025

## 🎯 Key Questions Answered

### Can PDFs be in a Netlify deployment folder?

**Yes, but with caveats:**
- ✅ **Public PDFs** (downloadable resources, brochures) → Include in website folder
- ❌ **Internal/confidential PDFs** (proposals, contracts) → Keep in client folder or Base44 portal

**Best Practice:** Only include files needed for the website to function publicly.

### What should be in a Netlify deployment folder?

**Essential Files:**
- HTML files (`.html`)
- CSS files (`.css`) in `css/` folder
- JavaScript files (`.js`) in `js/` folder
- Images (`.jpg`, `.png`, `.webp`, `.svg`) in `images/` folder
- Fonts (if self-hosted)
- Public PDFs (if linked/downloadable from website)
- `robots.txt`, `sitemap.xml` (SEO files)

**Should NOT be in deployment:**
- Client deliverables (proposals, contracts, internal docs)
- Source files (`.psd`, `.ai`, `.sketch`)
- Development files (`.git`, `node_modules`, build configs)
- Confidential documents

---

## 📁 Recommended Folder Structure

### For Each Client Project

```
clients/{client-name}/
├── 04_website/                 # ← Website project (static OR Next.js)
│   ├── index.html
│   ├── about.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
│
├── 01_Proposal.pdf             # Client deliverables
├── 02_Contract.pdf
├── 03_Research_Report.pdf
├── design-files/
│   └── brand-assets/
└── README.md
```

### Why This Structure?

**✅ Benefits:**
1. **Clean Deployments:** Deploy `04_website/` consistently across clients
2. **Automation Ready:** Scripts know exactly what to deploy
3. **Netlify CMS Compatible:** CMS works best with dedicated website folders
4. **Base44 Integration:** Deliverables stay separate, go in client portal
5. **Version Control:** Website files and deliverables tracked separately

---

## 🤖 Automation Considerations

### For Future MCPs/Automations

**Website Deployment Automation:**
```bash
# Deploy website folder (static sites)
netlify deploy --dir=clients/{client-name}/04_website

# Next.js sites are configured via netlify.toml inside 04_website/
# and deployed via Git push (recommended).

# Or drag 04_website/ folder to Netlify UI (static sites)
```

**Client Portal (Base44) Automation:**
- Deliverables (PDFs, docs) → Upload to Base44 portal
- Website files → Deploy to Netlify
- Clear separation = easier automation

**Netlify CMS (Decap CMS):**
- CMS stores content in markdown files
- These go in `04_website/` (part of the site)
- Different from client deliverables

---

## 🔄 Migration from Old Structure

### If Website Files Are Mixed with Deliverables

**Before:**
```
clients/luxe-fine-dining/
├── index.html          # Website file
├── css/                # Website file
├── 01_Proposal.pdf     # Deliverable
└── 02_Contract.pdf    # Deliverable
```

**After:**
```
clients/luxe-fine-dining/
├── 04_website/         # ← All website files here
│   ├── index.html
│   └── css/
├── 01_Proposal.pdf     # Deliverables stay in root
└── 02_Contract.pdf
```

**Migration Steps:**
1. Create `04_website/` folder
2. Move HTML, CSS, JS, images to `04_website/`
3. Keep PDFs, proposals, docs in root
4. Update any internal links/references

---

## ⚠️ Legacy Note

Some older clients may still use `clients/{client-name}/website/`. Treat that as legacy and migrate to `04_website/` when you touch the site.

---

## 📋 Checklist for New Clients

When creating a new client project:

- [ ] Create `clients/{client-name}/` folder
- [ ] Create `clients/{client-name}/04_website/` folder
- [ ] Put all website files (HTML, CSS, JS) in `04_website/` (or use the Next.js template)
- [ ] Put deliverables (PDFs, proposals) in root `clients/{client-name}/`
- [ ] Add a deployment note in the client `00_links.md` (or a README in `04_website/`)
- [ ] Document in `docs/internal/CLIENT_STATUS.md`

---

## 🎯 Real-World Example: Luxe Fine Dining

**Current Structure:**
```
clients/luxe-fine-dining/
├── 04_website/                 # ← Deploy this to Netlify
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── README.md
│
├── 01_Catering_Sales_Kit.pdf   # → Goes to Base44 portal
├── 02_Website_Architecture.pdf
├── 03_Automation_Workflows.pdf
└── DESIGN_SUMMARY.md
```

**Deployment:**
- Drag `website/` folder → Netlify
- Upload PDFs → Base44 client portal
- Clean separation = easy automation

---

## 🔗 Related Documentation

- [TECH_STACK.md](./TECH_STACK.md) - Netlify setup details
- [CLIENT_STATUS.md](./CLIENT_STATUS.md) - Client tracking
- [AI_RULES.md](../AI_RULES.md) - Folder structure rules

---

**Questions?** This structure optimizes for:
- ✅ Clean Netlify deployments
- ✅ Base44 client portal integration
- ✅ Future automation/MCP development
- ✅ Netlify CMS compatibility


