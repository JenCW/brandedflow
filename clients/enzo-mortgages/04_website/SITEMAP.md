# Enzo Mortgages - Site Plan

## Website Structure Overview

```
enzomortgages.com
│
├── HOME (/)
│   ├── Hero Section (Apply Now, Calculate Payment CTAs)
│   ├── Trust Marquee
│   ├── Live Mortgage Rates
│   ├── Loan Finder Tool
│   ├── Buyer Journey Steps
│   ├── Service Cards (Flip cards)
│   ├── Testimonials Slider
│   ├── Calculator Preview
│   ├── 24/7 Availability Section
│   ├── Why Choose Enzo
│   └── Final CTA
│
├── ABOUT (/about)
│   └── Company story, team, values
│
├── APPLY (/apply)
│   └── Lead capture form → Base44 CRM
│
├── CONTACT (/contact)
│   └── Contact information & form
│
├── LOAN OFFICER (/loan-officer)
│   ├── What Does a Loan Officer Do
│   ├── Mortgage Process Steps (1-6)
│   ├── Core Responsibilities
│   ├── Mortgage Options Guide
│   ├── Documentation Checklist
│   ├── Why Work With Enzo
│   └── FAQs
│
├── SERVICES (/services)
│   │
│   ├── BUYING (/services/buying)
│   │   ├── Conventional Loans (/services/buying/conventional)
│   │   ├── FHA Loans (/services/buying/fha)
│   │   ├── VA Loans (/services/buying/va)
│   │   ├── Jumbo Loans (/services/buying/jumbo)
│   │   └── First-Time Buyers (/services/buying/first-time)
│   │
│   ├── REFINANCE (/services/refinance)
│   │   ├── Rate & Term (/services/refinance/rate-term)
│   │   ├── Cash-Out (/services/refinance/cash-out)
│   │   └── Streamline (/services/refinance/streamline)
│   │
│   └── NON-QM (/services/non-qm)
│       ├── DSCR Loans (/services/non-qm/dscr)
│       ├── Bank Statement (/services/non-qm/bank-statement)
│       ├── Foreign National (/services/non-qm/foreign-national)
│       └── Asset-Based (/services/non-qm/asset-based)
│
├── LANDING PAGES (/landing)
│   ├── Buying Journey (/landing/buying)
│   ├── Refinance (/landing/refinance)
│   ├── Cash-Out (/landing/cash-out)
│   └── Investment Properties (/landing/investment)
│
├── TOOLS (/tools)
│   ├── Mortgage Calculator (/tools/calculator)
│   │   ├── Payment Calculator Tab
│   │   ├── Affordability Calculator Tab (DTI-aware)
│   │   └── Refinance Calculator Tab
│   │
│   └── Down Payment Assistance (/tools/down-payment)
│       ├── CalHFA Programs
│       ├── MyHome Assistance
│       └── County/City Programs
│
├── LOCATIONS (/locations)
│   ├── Santa Ana (/locations/santa-ana) - Headquarters
│   ├── Irvine (/locations/irvine)
│   ├── Newport Beach (/locations/newport-beach)
│   └── Anaheim (/locations/anaheim)
│
└── LEGAL
    └── Privacy Policy (/privacy)
```

---

## Page Descriptions

### Core Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Main landing, all key CTAs, loan finder, testimonials |
| About | `/about` | Company story, Enzo's background, trust building |
| Apply | `/apply` | Lead capture form, pre-qualification |
| Contact | `/contact` | Contact info, inquiry form |
| Loan Officer | `/loan-officer` | Educational content about working with Enzo |

### Service Pages (3 Categories, 12 Sub-pages)

| Category | Sub-pages |
|----------|-----------|
| **Buying** | Conventional, FHA, VA, Jumbo, First-Time |
| **Refinance** | Rate & Term, Cash-Out, Streamline |
| **Non-QM** | DSCR, Bank Statement, Foreign National, Asset-Based |

### Landing Pages (Conversion-Focused)

| Page | Target Audience |
|------|-----------------|
| Buying Journey | Home buyers, step-by-step guide |
| Refinance | Existing homeowners looking to save |
| Cash-Out | Homeowners needing equity access |
| Investment | Real estate investors, DSCR focus |

### Tools (Interactive)

| Tool | Features |
|------|----------|
| Calculator | 3 tabs: Payment, Affordability (43% DTI), Refinance |
| Down Payment | CalHFA, MyHome, county/city programs |

### Locations (4 Cities)

| Location | Focus |
|----------|-------|
| Santa Ana | Headquarters, general OC service |
| Irvine | Master-planned communities, jumbo |
| Newport Beach | Luxury coastal properties |
| Anaheim | Family homes, first-time buyers |

---

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                         HEADER NAV                               │
│  [Home] [Services ▼] [Tools ▼] [About] [Locations ▼] [Apply]    │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
     ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐
     │  SERVICES   │   │    TOOLS    │   │  LOCATIONS  │
     │  Dropdown   │   │  Dropdown   │   │  Dropdown   │
     ├─────────────┤   ├─────────────┤   ├─────────────┤
     │ • Buying    │   │ • Calculator│   │ • Santa Ana │
     │ • Refinance │   │ • Down Pay  │   │ • Irvine    │
     │ • Non-QM    │   │   Assist    │   │ • Newport   │
     └─────────────┘   └─────────────┘   │ • Anaheim   │
                                         └─────────────┘
```

---

## Key User Journeys

### Journey 1: First-Time Home Buyer
```
Home → Loan Finder Tool → "First-Time Buyer" result → 
/services/buying/first-time → Apply
```

### Journey 2: Refinance Seeker
```
Home → Calculator (Refinance tab) → See savings → 
/landing/refinance → Apply
```

### Journey 3: Investor (DSCR)
```
Home → Services (Non-QM) → /services/non-qm/dscr → 
/landing/investment → Apply
```

### Journey 4: Local Search
```
Google "mortgage Newport Beach" → /locations/newport-beach → 
Services → Apply
```

---

## Lead Capture Points

| Location | Form Type | Destination |
|----------|-----------|-------------|
| `/apply` | Full application | Base44 CRM |
| Landing pages | Lead magnet | Base44 + Airtable fallback |
| Calculator | CTA buttons | → `/apply` |
| All service pages | "Get Started" CTA | → `/apply` |
| Availability Section | Phone/callback | Direct contact |

---

## API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `/api/rates` | Live mortgage rates (FRED API, 1hr cache) |
| `/api/lead` | Lead form submissions |

---

## Design Elements

- **Color Scheme**: Dark zinc backgrounds, turquoise (#2FA99F) accents
- **Images**: All grayscale with hover-to-color effect
- **Typography**: UPPERCASE headers with wide tracking
- **Animations**: Parallax backgrounds, fade-in sections, flip cards

---

*Last updated: December 2024*
