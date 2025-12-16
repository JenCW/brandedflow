# Project Configuration Document
## The Constitution - Stable, Long-Term Project Context

> **Purpose**: This document contains stable, long-term information that serves as the "constitution" for this project. Update sparingly - only when fundamental aspects change.

---

## Project Overview

### Project Name
[Project Name]

### Main Goal & Vision
[Clear description of what this project aims to achieve and why it exists]

### Business Context
[Business objectives, target audience, market positioning, brand identity]

---

## Technical Stack

### Core Framework
- **Frontend Framework**: [Next.js / React / Vue / etc.]
- **Backend Framework**: [Express / FastAPI / Django / etc.]
- **Database**: [PostgreSQL / MongoDB / etc.]
- **Hosting**: [Netlify / Vercel / Self-hosted]
- **Deployment Target**: [Production URL]

### Required Technologies
- **Language(s)**: [TypeScript, Python, etc.]
- **Build Tools**: [Vite, Webpack, etc.]
- **Package Manager**: [npm, yarn, pnpm]
- **Version Control**: Git

### Third-Party Services & Integrations
- [Service Name]: [Purpose and authentication method]
- [API Name]: [Integration details]
- [CRM/External System]: [Connection details]

---

## Architecture Decisions

### Frontend/Backend Separation
- **Frontend Location**: [Path/structure]
- **Backend Location**: [Path/structure]
- **API Communication**: [REST / GraphQL / etc.]
- **Shared Types Location**: [Path to shared schemas]

### Key Architectural Patterns
- [Pattern 1]: [Rationale]
- [Pattern 2]: [Rationale]
- [Specific architectural decisions and why]

---

## Performance Requirements

### Pagespeed Targets
- **Lighthouse Performance Score**: ≥ 90
- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Input Delay (FID)**: < 100ms

### Optimization Strategy
- Image optimization (WebP, lazy loading, responsive images)
- Code splitting and lazy loading
- Bundle size optimization
- CDN usage
- Caching strategies

---

## SEO & SERP Requirements

### SEO Strategy
- **Target Keywords**: [Primary keywords]
- **Keyword Research**: [Source/documentation]
- **Competitor Analysis**: [Key competitors]

### Technical SEO Requirements
- Meta tags (title, description, OG tags)
- Structured data (Schema.org JSON-LD)
- XML sitemap generation
- Robots.txt configuration
- Canonical URLs
- Open Graph and Twitter Card metadata

### Content SEO
- Semantic HTML structure (H1-H6 hierarchy)
- Internal linking strategy
- Alt text for all images
- URL structure and slug optimization

---

## Brand Identity & Style Guidelines

### Brand Personality
- Modern, Editorial, On-Brand, Raw, Edgy, Professional, Stylish

### Design System
- **Primary Colors**: [Color codes]
- **Typography**: [Font families, weights, sizes]
- **Spacing Scale**: [Consistent spacing system]
- **Component Library**: [Storybook / Design tokens location]

### Style Framework & Dependencies
- **CSS Framework**: [Tailwind CSS / styled-components / etc.]
- **UI Component Library**: [Shadcn/ui / Radix UI / etc.]
- **Icons**: [Lucide / Heroicons / etc.]
- **Animations**: [Framer Motion / GSAP / etc.]
- **Additional Style Tools**: [List any additional styling dependencies]

### Visual Standards
- [Specific design principles]
- [Layout guidelines]
- [Responsive breakpoints]
- [Animation guidelines]

---

## File & Folder Structure Standards

### Frontend Structure
```
frontend/
├── components/          # Reusable UI components (outside app/ in Next.js)
│   ├── ui/             # Base UI components
│   └── [feature]/      # Feature-specific components
├── app/                # Next.js app directory (if applicable)
│   ├── [routes]/       # Route handlers
│   └── layout.tsx      # Root layout
├── lib/                # Utility functions
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Backend Structure
```
backend/
├── routes/             # API route handlers
├── services/           # Business logic layer
├── models/             # Data models/schemas
├── actions/            # Specific operation handlers
├── utils/              # Utility functions
└── config/             # Configuration files
```

### Shared Structure
```
shared/
├── schemas/            # Zod/Pydantic schemas
├── types/              # Shared TypeScript types
└── constants/          # Shared constants
```

---

## Quality Assurance Standards

### Testing Requirements
- **Unit Tests**: [Jest / Vitest / Pytest]
- **Integration Tests**: [Framework]
- **E2E Tests**: [Playwright / Cypress]
- **Test Coverage Target**: [Minimum %]

### Code Quality Tools
- **Linter**: [ESLint / Pylint]
- **Formatter**: [Prettier / Black]
- **Type Checking**: [TypeScript strict mode]
- **Pre-commit Hooks**: [Husky / pre-commit]

---

## Deployment & CI/CD

### Netlify Deployment Configuration
- **Build Command**: [Command]
- **Publish Directory**: [Directory]
- **Environment Variables**: [List critical ones]
- **Build Plugins**: [List any Netlify plugins]

### Deployment Checklist
- [ ] All environment variables configured
- [ ] Build succeeds locally
- [ ] SEO metadata verified
- [ ] Pagespeed scores meet targets
- [ ] All integrations tested
- [ ] Error tracking configured
- [ ] Analytics configured

---

## Automation & Integration Requirements

### Automation Reliability
- All automations must be deterministic
- Error handling and retry logic required
- Comprehensive logging for debugging
- Monitoring and alerting setup
- Rollback procedures documented

### Integration Testing
- All integrations must be tested in staging
- API rate limits must be respected
- Error scenarios must be handled gracefully
- Timeout handling implemented
- Data validation at boundaries

---

## Key Features & Milestones

### Phase 1: [Milestone Name]
- [Feature 1]
- [Feature 2]
- **Target Date**: [Date]

### Phase 2: [Milestone Name]
- [Feature 1]
- [Feature 2]
- **Target Date**: [Date]

### Future Roadmap
- [Long-term features or considerations]

---

## Important Notes & Constraints

### Known Limitations
- [Any technical or business constraints]

### Dependencies & Risks
- [Critical dependencies]
- [Potential risks and mitigation strategies]

### Client-Specific Requirements
- [Any client-specific needs or constraints]

---

## Document History

| Date | Change | Author |
|------|--------|--------|
| [Date] | Initial creation | [Name] |
| [Date] | [Change description] | [Name] |

---

**Last Updated**: [Date]
**Maintained By**: [Team/Person]
