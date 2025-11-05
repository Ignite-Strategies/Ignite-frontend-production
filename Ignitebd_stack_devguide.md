# IgniteBD Stack Development Guide

## Premise

**IgniteBD is a business development platform designed to help professional services clients with systematic outreach, relationship building, and growth acceleration.**

The core mission: **Attract → Engage → Nurture**

- **Attract**: Build awareness through content, branding, SEO, and advertising
- **Engage**: Convert prospects into meaningful relationships through outreach, events, and personalized campaigns
- **Nurture**: Maintain and deepen relationships to drive long-term business growth

---

## Stack Overview

### Landing Page: `ignitebd-landing`
- **Type**: Static HTML site
- **Purpose**: Marketing/landing page with company information
- **Functionality**: Links to demo version of the stack
- **Deployment**: Separate repo (likely Vercel or static hosting)

### Frontend: `Ignite-frontend-production`
- **Framework**: React 18 with Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Authentication**: Firebase Auth (client SDK)
- **Deployment**: Vercel
- **Production URL**: https://growth.ignitestrategies.co (subdomain)
- **Port**: 5173 (development)

### Backend: `ignitebd-backend`
- **Runtime**: Node.js 20+ with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Firebase Admin SDK (server-side)
- **File Upload**: Multer (local storage)
- **Deployment**: Render
- **Production URL**: https://ignitebd-backend.onrender.com
- **Port**: 4000 (development)

### Database
- **Type**: PostgreSQL
- **ORM**: Prisma
- **Schema**: See `IGNITE_ARCHITECTURE.md` for complete schema documentation
- **Migrations**: Prisma migrations (`prisma migrate dev`)

---

## Architecture Principles

### Core Architecture Pattern
**Contact + Company First Architecture** - Designed to drive business growth through systematic relationship management.

See `IGNITE_ARCHITECTURE.md` for complete architecture documentation including:
- Multi-tenancy via `CompanyHQId`
- Contact as universal personhood
- Pipeline/stage tracking
- Company relationships (prospect/client companies)

### Key Concepts

1. **Multi-Tenancy**: Everything scoped to `CompanyHQId` (root container)
2. **Universal Personhood**: Contacts represent people across their entire journey
3. **Pipeline Tracking**: Intentional pipeline/stage state management
4. **Company Hierarchy**: CompanyHQ (tenant) vs Company (prospect/client)

---

## Authentication & User Management

### Firebase Authentication Standard
Complete Firebase authentication and user management follows a universal standard across all Ignite builds.

See `FIREBASE-AUTH-AND-USER-MANAGEMENT.md` for:
- Firebase middleware setup
- User creation/hydration routes
- Token verification patterns
- Frontend authentication flow

### Key Patterns

**Pattern A: Entity Creation** (`/api/user/create`)
- Find or create user by Firebase ID
- Called after Firebase sign-in
- No token required (public route)

**Pattern B: Entity Hydration** (`/api/user/hydrate`)
- Load full user profile by Firebase ID
- Requires Firebase token verification
- Used for dashboard/homepage hydration

### Entity Model
- **IgniteBD**: `User` model → `routes/User/userCreateRoute.js`
- Universal personhood connected via Firebase UID

---

## Project Structure

### High-Level Overview

**Frontend** (`Ignite-frontend-production`):
- React app organized by feature pages (auth, contacts, attract, engage, nurture, etc.)
- Core infrastructure: Firebase config, API client, context for state management
- Component library for layout and navigation
- **Note**: Structure may quickly get deplicated as BD tools are implemented

**Backend** (`ignitebd-backend`):
- Express server with routes organized by entity (Owner, User, Company, etc.)
- Prisma ORM for database access
- Firebase middleware for authentication
- Services for business logic calculations

### BD Tools Implementation

We're implementing various BD tools that will be integrated into the backend:

- **Backend Services/Mutations**: Some tools will be driven by backend services that mutate data and perform calculations (e.g., assessment calculations, revenue calculations, target acquisition)
- **CRM Recall Functions**: Other tools are primarily recall functions for CRM data (e.g., contact lists, company information, pipeline tracking)

As these tools are developed, they'll be added to the backend routes and services as needed.

---

## Development Setup

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Firebase project (for authentication)
- Git

### Frontend Setup

```bash
cd Ignite-frontend-production

# Install dependencies
npm install

# No environment variables needed for frontend
# Firebase config is hardcoded in src/config/firebaseConfig.js

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

**Frontend runs on**: http://localhost:5173

### Backend Setup

```bash
cd ignitebd-backend

# Install dependencies
npm install

# Copy environment template
cp .local.env.example .env

# Set up environment variables (for local development)
# DATABASE_URL="postgresql://..."
# FIREBASE_SERVICE_ACCOUNT_KEY="{\"type\":\"service_account\",...}"
# OPENAI_API_KEY="sk-..." (optional, for AI features)
# SESSION_SECRET="your-secret-key" (optional, defaults to 'devdevdev')
# PORT=4000

# Note: Production values are stored in Render environment variables:
# - DATABASE_URL
# - FIREBASE_SERVICE_ACCOUNT_KEY
# - OPENAI_API_KEY

# Generate Prisma client
npm run db:generate

# Push schema to database (or run migrations)
npm run db:push
# OR
npm run db:migrate

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start
```

**Backend runs on**: http://localhost:4000

### Database Setup

```bash
# Generate Prisma client (after schema changes)
npm run db:generate

# Push schema changes (development)
npm run db:push

# Create migration (production-ready)
npm run db:migrate

# Open Prisma Studio (database GUI)
npm run db:studio
```

### Environment Variables

**Backend** (Render is source of truth for production):
- `DATABASE_URL` - PostgreSQL connection string
- `FIREBASE_SERVICE_ACCOUNT_KEY` - Firebase Admin SDK service account JSON (masked in Render)
- `OPENAI_API_KEY` - OpenAI API key for AI-powered features (masked in Render)
- `SESSION_SECRET` - Secret for cookie sessions (optional, defaults to 'devdevdev' in development)
- `PORT` - Server port (default: 4000, set automatically by Render in production)

**Note**: Environment variables in Render are masked for security. Use the eye icon (👁️) to reveal values when needed.

**Frontend**: No environment variables - Firebase config is hardcoded in `src/config/firebaseConfig.js`

---

## Development Workflow

### Local Development

1. **Start Database**: Ensure PostgreSQL is running
2. **Start Backend**: `cd ignitebd-backend && npm run dev`
3. **Start Frontend**: `cd Ignite-frontend-production && npm run dev`
4. **Proxy Configuration**: Frontend Vite config proxies `/api/*` to `http://localhost:4000`

### API Integration

All API calls go through `src/lib/api.js`:
- **Development**: Base URL `/api` (proxied to `http://localhost:4000` via Vite)
- **Production**: Base URL should point to `https://ignitebd-backend.onrender.com/api`
- **Note**: Frontend at `growth.ignitestrategies.co` connects to backend at `ignitebd-backend.onrender.com`
- Axios instance with interceptors
- Request/response logging
- Cookie-based auth support (`withCredentials: true`)

### Code Organization

**Frontend Pages** follow the **Attract → Engage → Nurture** flow:
- **Attract**: Content, Ads, SEO, Branding
- **Engage**: Outreach, Email Campaigns, Events
- **Nurture**: Relationship management, ongoing communication

**Backend Routes** follow entity-based organization:
- `routes/[Entity]/[entity]CreateRoute.js` - Create/find entity
- `routes/[Entity]/[entity]HydrateRoute.js` - Hydrate entity by Firebase ID
- Additional CRUD routes as needed

---

## Deployment Architecture

```
┌─────────────────────────────────┐
│   ignitebd-landing (HTML)       │
│   Marketing/Landing Page         │
│   - Company info                │
│   - Links to demo               │
└────────────┬────────────────────┘
             │
             │ Links to demo
             ▼
┌─────────────────────────────────┐
│   growth.ignitestrategies.co     │
│   Ignite-frontend-production     │
│   (React App - Vercel)          │
└────────────┬────────────────────┘
             │
             │ API calls
             ▼
┌─────────────────────────────────┐
│   ignitebd-backend.onrender.com │
│   ignitebd-backend              │
│   (Express API - Render)        │
└────────────┬────────────────────┘
             │
             │ Database queries
             ▼
┌─────────────────────────────────┐
│   PostgreSQL Database           │
│   (Prisma ORM)                  │
└─────────────────────────────────┘
```

### Deployment Flow

1. **Landing Page** (`ignitebd-landing`): Static HTML site with company information
2. **Frontend App** (`growth.ignitestrategies.co`): Main React application (demo/production)
3. **Backend API** (`ignitebd-backend.onrender.com`): Express API server
4. **Database**: PostgreSQL with Prisma ORM

---

## Build & Deployment

### Frontend Build

```bash
npm run build
```

**Output**: `dist/` directory with optimized production build

**Deployment**: 
- Vercel (automatic from Git)
- `vercel.json` configures SPA routing (all routes → `index.html`)

### Backend Build

```bash
npm run build
```

**Build Process**:
1. Generates Prisma client (`prisma generate`)
2. Pushes schema to database (`prisma db push`)

**Deployment**:
- Render (from Git)
- Environment variables set in Render dashboard
- `FIREBASE_SERVICE_ACCOUNT_KEY` must be set in Render

### Production URLs

- **Landing Page**: `ignitebd-landing` repo (separate deployment)
- **Frontend (Main App)**: https://growth.ignitestrategies.co (subdomain)
- **Backend API**: https://ignitebd-backend.onrender.com

**Note**: The landing page (`ignitebd-landing`) serves as the marketing site and links to the demo version hosted at `growth.ignitestrategies.co`.

---

## Key Development Patterns

### 1. Company Setup & Management

**Create CompanyHQ** (Tenant Container):
```javascript
POST /api/companyhq/create
Headers: { Authorization: "Bearer <firebaseToken>" }
Body: {
  companyName: "Ignite Strategies",
  ownerId: "owner-id",
  whatYouDo: "Business acquisition services...",
  companyStreet: "2604 N. George Mason Dr.",
  companyCity: "Arlington",
  companyState: "VA 22207",
  companyWebsite: "https://www.ignitestrategies.co",
  companyIndustry: "Professional Services",
  companyAnnualRev: "0-100k",  // Range string
  yearsInBusiness: "2-5",      // Range string
  teamSize: "just-me"
}
```

**Response**: Returns `companyHQ` object → Store in localStorage as `companyHQId` and `companyHQ`

**Routes**:
- `/company/create-or-choose` - Choose to create or join company
- `/companyprofile` - Company profile form (creates CompanyHQ)
- `/company/create-success` - Success page after creation

### 2. Contact Management

**Create Contact** (Manual Entry):
```javascript
POST /api/contacts
Headers: { Authorization: "Bearer <firebaseToken>" }
Body: {
  companyId: "company-hq-id",  // CompanyHQId from localStorage
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "555-1234",
  contactCompany: { companyName: "Acme Corp" },  // Prospect/client company
  status: "Prospect",
  stage: "New",
  lastTouch: "2025-01-15",
  nextTouch: "2025-01-22",
  notes: "Met at conference"
}
```

**Contact Creation Routes**:
- `/contacts/upload` - Choose manual or CSV upload
- `/contacts/manual` - Manual entry form (one contact at a time)
- `/contacts` - Contact list/hub

**Hydrate Contacts**:
```javascript
GET /api/contacts?companyId=xxx  // CompanyHQId
GET /api/contacts?companyId=xxx&pipeline=prospect
GET /api/contacts?companyId=xxx&stage=prospect-meeting
```

### 2. Authentication & Onboarding Flow

**Complete Flow:**
1. **User signs in** (Firebase client SDK) → `/signup` or `/signin`
2. **Create/Find Owner** (`POST /api/owner/create`) → Stores `ownerId` in localStorage
3. **Welcome Hydration** (`GET /api/owner/hydrate` with Bearer token) → Routes based on completeness:
   - **No name** → `/profilesetup` (fallback name collection)
   - **No CompanyHQ** → `/company/create-or-choose` (company setup required)
   - **All complete** → `/growth-dashboard` (home base)
4. **Company Creation** (`POST /api/companyhq/create`) → Stores `companyHQId` and `companyHQ` in localStorage
5. **Dashboard** → Uses `companyHQ` from localStorage for personalization

**localStorage Keys:**
- `ownerId` - Owner ID
- `owner` - Full Owner object (JSON)
- `companyHQId` - CompanyHQ ID (tenant identifier)
- `companyHQ` - Full CompanyHQ object (JSON)
- `firebaseToken` - Firebase ID token for API calls

**Protected Routes** (use `verifyFirebaseToken` middleware)

### 3. Dashboard Personalization

**Growth Dashboard** (`/growth-dashboard`):
- Reads `companyHQ` from localStorage for personalization
- Displays company name in header: `{companyName} Growth Dashboard`
- Shows `SetupWizard` component for new companies (guides through: Company → Contacts → Assessment → Outreach)
- Quick Actions: Check Pipeline, Add Contact, Send Email
- Requires `companyHQId` in localStorage to function fully

**Setup Wizard**:
- Appears when `hasCompany === true` (companyHQ exists)
- Tracks onboarding progress (Company, Contacts, Assessment, Outreach)
- Auto-hides when all steps complete
- Provides action buttons to navigate to each step

### 4. Multi-Tenancy

**Always filter by CompanyHQId**:
- All queries must include `companyId: companyHQId`
- Get `companyHQId` from localStorage (set during Welcome hydration or Company creation)
- Enforces tenant isolation
- Prevents cross-tenant data access

**CompanyHQ vs Company**:
- **CompanyHQ** = Tenant container (your company - Ignite Strategies)
- **Company** = Prospect/client companies (companies your contacts work for)

### 5. Pipeline Tracking

**Move Contact Through Pipeline**:
```javascript
// Update Pipeline model (conversion)
PUT /api/pipeline/:contactId
Body: {
  pipeline: "client",
  stage: "client-onboarding"
}
```

---

## Testing & Debugging

### Database Testing

```bash
# Test database connection
curl http://localhost:4000/db-test

# Open Prisma Studio
npm run db:studio
```

### API Testing

```bash
# Health check (local)
curl http://localhost:4000/health

# Health check (production)
curl https://ignitebd-backend.onrender.com/health

# Test Firebase auth (requires token)
curl -H "Authorization: Bearer <token>" http://localhost:4000/api/user/hydrate

# Test Firebase auth (production)
curl -H "Authorization: Bearer <token>" https://ignitebd-backend.onrender.com/api/user/hydrate
```

### Frontend Debugging

- React DevTools for component inspection
- Network tab for API calls
- Console logs for Firebase auth state

---

## Related Documentation

- **`IgniteBD_Navigation_Flow.md`** - Complete user navigation flow and experience (Splash → Welcome → Dashboard)
- **`IGNITE_ARCHITECTURE.md`** - Complete architecture, schema, and data flow patterns
- **`FIREBASE-AUTH-AND-USER-MANAGEMENT.md`** - Authentication patterns and user management
- **`README.md`** (frontend) - Quick start and project overview
- **`README.md`** (backend) - API endpoints and development notes

---

## Next Steps

This development guide serves as the foundation for:
- **✅ Navigation Flow Documentation** - See `IgniteBD_Navigation_Flow.md` for complete user experience flow
- **API Documentation** - Complete endpoint reference
- **Component Documentation** - Frontend component library
- **Deployment Guide** - Production deployment procedures

---

**Last Updated**: January 2025  
**Stack Version**: 1.0.0  
**Architecture**: Contact + Company First  
**Multi-Tenancy**: CompanyHQ-scoped  
**Authentication**: Firebase Auth (Universal Standard)  
**Current Status**: ✅ Company creation working, Dashboard personalization active, Contact creation (manual/CSV) implemented

