# DIRECTIVE: Build Branded+Flow Website

## 1. GOAL
Build and deploy a high-performance, aesthetic static website for Branded+Flow.

## 2. INPUTS
- **Location**: `company/website/`
- **Tech Stack**: Vite (Vanilla JS), CSS3, Netlify.
- **Content Source**: `company/website/website copy/Branded_Flow_Website_Brief.md` (Definitive Copy).
- **Design Vibe**: "Intelligence-Powered, Deep Navy & Gold".
- **Brand Identity**:
    - *Primary Bg*: Deep Navy (`#0d1f3d`).
    - *Primary Accent*: Cyan/Teal (`#00bcd4`).
    - *Secondary Accent*: Gold (`#f4c430`).
    - *Typography*: Inter (Modern, Clean).
    - *Tone*: Human, direct, calming, decisive (see Brief).
    - *Tagline*: "Intelligence-Powered Branding & Automation".

## 3. PROCESS
1.  **Develop**:
    *   Update `style.css` to use the Official Palette (Navy #0d1f3d, Cyan #00bcd4, Gold #f4c430).
    *   Update `index.html` to reflect `INIT (2).md` services (Quick Starts, not just generic).
    *   Ensure "Luxe/Premium" feel is maintained but with correct colors.
3.  **Content**:
    *   Hero Section: Value proposition ("Automating the Chaos").
    *   Services: "Quick Starts", "Managed Services".
    *   Footer: Simple contact/socials.
4.  **Verify**:
    *   Build locally (`npm run build`).
    *   Check for console errors.

## 4. OUTPUTS
- A fully functional local build in `company/website/dist/`.
- Ready for Netlify deployment.

## 5. EDGE CASES
- **Node Modules**: Ensure `node_modules` is git-ignored.
- **Routing**: If multi-page, ensure Vite config handles it. (Start single page).
