# Enzo Mortgages

## Overview

Enzo Mortgages - "The Ferrari of Home Loans" is a modern mortgage service website built as a full-stack TypeScript application. The project combines a React frontend with an Express backend, using Next.js for server-side rendering capabilities alongside a Vite-powered client application. 

**Brand Identity:**
- Tagline: "The Ferrari of Home Loans"
- Hero Message: "We believe everyone deserves to see dreams come true. Trust is the luxury everyone deserves."
- Design: Professional, trustworthy, approachable, authoritative
- Accent Color: Turquoise (HSL 175 55% 55%)
- Headers: UPPERCASE with tracking-wide

**Service Structure (Rocket Mortgage-style):**
- **Buying**: Conventional, FHA, VA, Jumbo, First-Time Buyers
- **Refinance**: Rate & Term, Cash-Out, Streamline
- **Non-QM**: DSCR, Bank Statement, Foreign National, Asset-Based

**Key Features:**
- 24/7 AI Receptionist availability prominently featured throughout site
- 5-minute callback guarantee messaging
- Interactive tools: Loan Finder, DSCR Calculator, Rate Comparisons
- Lead magnets for email capture and nurturing
- Comprehensive conversion-optimized landing pages

**Mortgage Tools (app/tools/):**
- `/tools/calculator` - MortgageCalculator with Payment, Affordability (DTI-aware), Refinance tabs
- `/tools/down-payment` - Down Payment Assistance programs (CalHFA, MyHome, county/city programs)
- Live rates auto-fetched from FRED API with green/yellow indicator (FRED vs estimate)

**API Endpoints:**
- `/api/rates` - Live mortgage rates (30yr, 15yr, 20yr, FHA, VA, Jumbo) from FRED API with 1-hour cache

**Landing Pages (app/landing/):**
- `/landing/buying` - Full home purchase journey with hero form, benefits, process steps, testimonials, FAQs
- `/landing/refinance` - Refinance savings calculator, goal-based navigation, lead magnet
- `/landing/cash-out` - Home equity access guide with use cases and calculators
- `/landing/investment` - DSCR calculator, investor loan programs, portfolio financing

The design follows modern financial service aesthetics inspired by Stripe, Better.com, and Rocket Mortgage, emphasizing credibility, clear information hierarchy, and accessibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The project has a dual frontend setup:

1. **Next.js App** (`/app` directory): Server-side rendered pages using the App Router pattern with React Server Components support
2. **Vite Client** (`/client` directory): Single-page application for client-side interactivity

**Key Frontend Technologies:**
- React with TypeScript
- TailwindCSS for styling with CSS variables for theming
- shadcn/ui component library (New York style) with Radix UI primitives
- React Query (@tanstack/react-query) for server state management
- Wouter for client-side routing in the Vite app
- React Hook Form with Zod for form validation

**Design System:**
- Typography: Inter (body) and Space Grotesk (headings) from Google Fonts
- Color scheme: HSL-based CSS variables supporting light mode
- Responsive grid system with Tailwind breakpoints (mobile-first)
- Component styling follows the design guidelines in `design_guidelines.md`

### Backend Architecture

**Express Server** (`/server` directory):
- RESTful API architecture with routes prefixed by `/api`
- HTTP server with middleware for JSON parsing and request logging
- Storage abstraction layer (`IStorage` interface) currently using in-memory storage
- Vite dev server integration for development hot module replacement

**API Structure:**
- Routes registered in `server/routes.ts`
- Static file serving handled by `server/static.ts` in production
- Development uses Vite middleware via `server/vite.ts`

### Data Layer

**Database:**
- PostgreSQL database configured via Drizzle ORM
- Schema defined in `shared/schema.ts` using Drizzle's PostgreSQL table definitions
- Drizzle Kit for migrations (output to `/migrations`)
- Zod schemas generated from Drizzle schemas using `drizzle-zod`

**Current Schema:**
- Users table with id, username, and password fields
- UUID primary keys using PostgreSQL's `gen_random_uuid()`

### Build System

- **Development**: `tsx` for running TypeScript server directly, Vite for frontend HMR
- **Production Build**: Custom build script (`script/build.ts`) using esbuild for server bundling and Vite for client
- Output: Server bundle to `dist/index.cjs`, client assets to `dist/public`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Database queries and schema management
- **connect-pg-simple**: PostgreSQL session storage for Express sessions

### UI Framework
- **Radix UI**: Comprehensive set of accessible UI primitives (dialogs, menus, forms, etc.)
- **shadcn/ui**: Pre-styled component library built on Radix
- **Embla Carousel**: Carousel/slider functionality
- **Recharts**: Charting library for data visualization
- **Lucide React**: Icon library

### API & State Management
- **@tanstack/react-query**: Server state caching and synchronization
- **react-hook-form**: Form state management
- **Zod**: Runtime type validation and schema definition

### Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Server-side bundling
- **tsx**: TypeScript execution for Node.js
- **Replit plugins**: Dev banner, cartographer, runtime error overlay