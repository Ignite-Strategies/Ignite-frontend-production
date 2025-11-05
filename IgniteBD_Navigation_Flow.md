# IgniteBD Navigation Flow / User Experience

## Overview

This document outlines the complete user navigation flow for IgniteBD, following the **Attract → Engage → Nurture** framework. The flow is designed to guide users through onboarding and into the core BD tools.

**Primary Flows:**
1. **New users (onboarding)**: Splash → Signup → Profile Setup → Company Setup → Growth Dashboard
2. **Returning users (perfect scenario)**: Splash → Welcome (hydrate) → Growth Dashboard
3. **Edge case**: Tokens lost → Splash → Signin (rare)

**Dashboard is home base** - Once fully set up, users always return to Dashboard via Welcome hydration.

**Reference**: See `Ignitebd_stack_devguide.md` for technical stack details.

---

## Entry Point: Splash Page

### Route: `/` (Splash)

**Purpose**: Branding + Authentication Check

**What happens:**
1. Displays branding (IgniteGrowth Engine logo, tagline)
2. Shows splash screen for ~2 seconds
3. Checks for Firebase tokens stored locally (Firebase SDK reads from internal browser storage)
4. Routes based on auth state:
   - **If tokens exist** → Route to `/welcome` (hydration hub) ⬅️ **PRIMARY FLOW**
   - **If no tokens** → Route to `/signup` (new user flow) ⬅️ **PRIMARY FLOW**

**Key Points:**
- Splash page is the starting point for all users
- Firebase SDK automatically checks for tokens in browser storage
- No API calls at this stage - purely client-side auth check
- Branding-focused experience
- **Primary paths**: Has tokens → Welcome | No tokens → Signup

---

## Primary Authentication Flow

### Signup (`/signup`) - PRIMARY FLOW

**Purpose**: New user registration (primary path for users without tokens)

**What happens:**
- User enters email + password (or uses Google OAuth)
- Firebase creates auth account
- **DisplayName Parsing**: Firebase provides `displayName` - parse it:
  - `firstName`: `displayName?.split(' ')[0]` (first word)
  - `lastName`: `displayName?.split(' ')[1]` (second word, if exists)
- Backend creates **Owner** record with `firebaseId` (via `POST /api/owner/create`)
- Owner record initially has:
  - `firebaseId` ✅
  - `email` ✅
  - `name` (may be null if displayName not provided)
  - No `companyHQId` initially - Owner links to CompanyHQ via `ownerId` on CompanyHQ model
- Stores in localStorage:
  - `firebaseId`
  - `ownerId` (Owner record ID)
  - `firebaseToken` (ID token for API calls)

**Routing:**
- Success → `/welcome` (universal hydrator)

**Note on DisplayName Parsing:**
- Firebase `displayName` is typically "First Last" format
- Parse: `firstName = displayName.split(' ')[0]`, `lastName = displayName.split(' ')[1]`
- Handle null/undefined: Use optional chaining `displayName?.split(' ')[0]`
- If displayName not provided, firstName/lastName will be null (user fills in profile setup)

---

## Welcome / Hydration Hub

### Route: `/welcome` - PRIMARY FLOW (Returning Users)

**Purpose**: Universal hydration and routing hub (central routing point)

**Perfect Scenario (Returning Users):**
- User has tokens → Splash routes to Welcome
- Welcome hydrates user data → Routes directly to Growth Dashboard
- **Dashboard is home base** - all returning users land here

**What happens:**
1. Calls `GET /api/owner/hydrate` with Firebase token (Bearer auth) - TODO: Create this route
2. Backend returns full Owner data:
   - `owner` object (with personhood fields: name, email, photoURL)
   - `companyHQ` object (if they own one - via `ownerId` on CompanyHQ)
   - `ownedCompanies` array (CompanyHQs where ownerId matches)
   - `managedCompanies` array (CompanyHQs where managerId matches)
   - Related data (contacts, pipelines, etc.)
3. Frontend caches to localStorage:
   - `ownerId` - Owner record ID
   - `owner` - Full Owner object (JSON)
   - `companyHQId` - CompanyHQ ID (if exists - from ownedCompanies[0])
   - `companyHQ` - Full CompanyHQ object (JSON)

**Routing Logic:**
1. **If no ownerId** → Redirect to `/signup` (shouldn't happen)
2. **If no name (firstName/lastName)** → Redirect to `/profilesetup` ⬅️ **ONBOARDING TRIGGER**
3. **If no companyHQ (no ownedCompanies)** → Redirect to `/company/create-or-choose` ⬅️ **ONBOARDING TRIGGER**
4. **If all complete (perfect scenario)** → Route directly to `/growth-dashboard` ⬅️ **DASHBOARD (HOME BASE)**

**Key Points:**
- Welcome page is the central routing hub (like Events CRM pattern)
- **Perfect scenario**: Hydrates → Routes directly to Dashboard (home base)
- **Onboarding needed**: Routes to missing setup steps (Profile or Company)
- Only complete profiles reach Dashboard
- Hydrates all necessary data for the session

---

## Edge Case: Signin (`/signin`)

**⚠️ EDGE CASE - Rare scenario**

**When this happens:**
- User cleared browser storage (hard refresh, incognito session expired)
- User has Firebase account but tokens lost from local storage
- **Very rare** - should not be primary path

**What happens:**
- User signs in with email/password or Google OAuth
- Firebase authenticates user
- Backend finds/creates **Owner** record (via `POST /api/owner/create`)
- Stores auth data in localStorage (same as signup)

**Routing:**
- Success → `/welcome` (universal hydrator)

**Note**: Signin is an edge case. Primary flows are:
1. **New users (onboarding)**: Splash → Signup → Profile Setup → Company Setup → Growth Dashboard
2. **Returning users (perfect scenario)**: Splash → Welcome (hydrate) → Growth Dashboard
3. **Edge case**: Tokens lost → Splash → Signin (rare)

**Dashboard is home base** - Once fully set up, all returning users land at Dashboard via Welcome hydration.

---

## Onboarding Flow

### 3. Profile Setup (`/profilesetup`)

**Why we're here:**
- Owner record exists but `name` (or firstName/lastName) is null
- Need to collect owner's personal info

**What happens:**
- Form collects: `firstName`, `lastName`, `email`, `phone`, `role`, `goals`
- Calls `PUT /api/owner/:ownerId/profile` with these fields
- Updates Owner record with personhood data (name is built from firstName/lastName)

**Routing:**
- Success → `/company/create-or-choose` (or back to `/welcome` for re-hydration check)

---

### 4. Company Create or Choose (`/company/create-or-choose`)

**Why we're here:**
- User has profile but no `companyHQId` (tenant identifier)
- Need to create or join a CompanyHQ (tenant)

**Options:**
1. **Create New CompanyHQ** → `/company/create`
2. **Join Existing CompanyHQ** → `/company/join` (enter company code or invite)

**What happens:**
- If creating: Backend creates CompanyHQ with `ownerId` (links to Owner)
- If joining: Backend links Owner to existing CompanyHQ (via `ownerId` or `managerId`)
- Caches companyHQ to localStorage

**Routing:**
- Success → `/companyprofile` (company profile setup)

---

### 5. Company Profile (`/companyprofile`)

**What happens:**
- User fills in company details (name, address, industry, revenue, etc.)
- Updates CompanyHQ record with company data
- Completes company setup

**Routing:**
- Success → `/growth-dashboard` (main dashboard)

---

## Main Application Flow

### 6. Growth Dashboard (`/growth-dashboard`)

**Dashboard is home base** - All returning users land here after Welcome hydration.

**Fully hydrated owner:**
- ✅ Owner record with personhood (name, email)
- ✅ CompanyHQ ownership (`ownerId` on CompanyHQ references Owner)
- ✅ Can now use the platform

**This is the main hub** for accessing:
- **Attract** stack (content, ads, SEO, branding)
- **Engage** stack (outreach, email campaigns, events)
- **Nurture** stack (relationship management)

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ SPLASH (/)                                                   │
│ • Branding display                                          │
│ • Check Firebase tokens (local storage)                     │
└─────────────────┬───────────────────────────────────────────┘
                  │
        ┌─────────┴──────────┐
        │                    │
    Has token           No token
        │                    │
        ▼                    ▼
┌─────────────────┐   ┌─────────────┐
│   WELCOME       │   │   SIGNUP    │
│   (/welcome)    │   │   (/signup) │
│                 │   └──────┬──────┘
│ Hydrate User    │          │
│ Check missing   │          │ Creates User
│                 │          │ Stores tokens
└──────┬──────────┘          │
       │                     │
       │                     ▼
       │              ┌─────────────┐
       │              │   WELCOME   │
       │              │   (/welcome)│
       │              └──────┬──────┘
       │                     │
       │        ┌────────────┴──────────┐
       │        │                       │
       │   No firstName            Has firstName
       │        │                       │
       │        ▼                       ▼
       │  ┌─────────────┐        Check companyHQId
       │  │ PROFILE SETUP│        │
       │  │(/profilesetup)│        └──────┬──────┐
       │  │              │                 │      │
       │  │ Fill in:     │      No companyHQId  Has companyHQId
       │  │ • firstName   │                 │      │
       │  │ • lastName    │                 ▼      ▼
       │  │ • email       │         COMPANY CREATE    DASHBOARD
       │  │ • phone       │         OR CHOOSE         ✅
       │  │              │         (/company/...)   (/growth-dashboard)
       │  │ PATCH /api/   │                 │
       │  │ user/:userId  │                 │
       │  └──────┬────────┘                 │
       │         │                           │
       │         └───────────┬───────────────┘
       │                     │
       │                     ▼
       │         ┌─────────────────────┐
       │         │ COMPANY PROFILE    │
       │         │ (/companyprofile)  │
       │         └──────────┬─────────┘
       │                    │
       │                    ▼
       │         ┌─────────────────────┐
       │         │   GROWTH DASHBOARD  │
       │         │   (/growth-dashboard)│
       │         │         ✅          │
       │         └─────────────────────┘
       │
       └─────────────────────────────────┐
                                        │
                                        ▼
                            ┌─────────────────────┐
                            │   GROWTH DASHBOARD  │
                            │   (/growth-dashboard)│
                            │         ✅          │
                            └─────────────────────┘
```

---

## Key localStorage Values

After complete hydration:
- `firebaseId` - Firebase auth ID
- `ownerId` - Owner record ID
- `companyHQId` - CompanyHQ ID (tenant identifier - from ownedCompanies[0])
- `firebaseToken` - Firebase ID token (for API calls)
- `owner` - Full Owner object (JSON)
- `companyHQ` - Full CompanyHQ object (JSON)
- `email` - Owner's email

---

## Attract → Engage → Nurture Flow

Once authenticated and on the Growth Dashboard, users can navigate the three core stacks:

### Attract Stack
- **Content** (`/content`) - Blog posts, content planning
- **Ads** (`/ads`) - Google Ads campaigns
- **SEO** (`/seo`) - SEO optimization tools
- **Branding** (`/branding-hub`) - Personal/professional branding

### Engage Stack
- **Outreach** (`/outreach`) - Email campaigns, templates
- **Events** (`/events`) - Event management
- **Meetings** (`/meetings`) - Meeting scheduling & analytics

### Nurture Stack
- **Contacts** (`/contacts`) - Contact management & lists
- **Proposals** (`/proposals`) - Proposal builder
- **Relationships** (`/relationship`) - Relationship dashboard

---

## Protected Routes

**Automatic Protection via Axios Config** (`src/lib/api.js`):

The axios instance automatically protects all API calls:
1. **Request Interceptor**: Automatically adds Firebase token to all requests
   - Gets token from `firebaseAuth.currentUser.getIdToken()`
   - Adds `Authorization: Bearer <token>` header to every request
   - No manual token handling needed in components

2. **Response Interceptor**: Handles authentication errors
   - On 401 (Unauthorized) → Automatically clears localStorage and redirects to `/signup`
   - Logs all API requests/responses for debugging

**Client-Side Route Protection** (optional):
- Routes can check for `firebaseToken` in localStorage before rendering
- If missing → Redirect to `/splash`
- Most protection happens automatically via axios interceptor

**Backend Protection**:
- All protected backend routes use `verifyFirebaseToken` middleware
- Verifies the Bearer token sent by axios interceptor
- Returns 401 if token is invalid/expired (axios handles redirect)

**Public Routes** (no protection needed):
- `/`, `/splash`, `/signup`, `/signin` - Public access
- All other routes are protected by axios config + backend middleware

---

---

## Common Issues & Solutions

### "Stuck in loop"
- Clear localStorage and start fresh signup
- Check that each step is setting the required fields
- Verify Welcome hydration is working correctly

### "Owner not found"
- Check if Owner record was created during signup
- Verify `firebaseId` matches between Firebase and database
- Ensure `/api/owner/create` is being called

### "Token expired"
- Firebase SDK should auto-refresh tokens
- Check that `firebaseToken` in localStorage is being updated
- Re-authenticate if token is invalid

---

## Notes

- **Pattern Recognition**: This flow follows the Events CRM pattern (`ignitestrategescrm-frontend`) with:
  - Splash → Welcome (hydration) → Routes based on what's missing
  - Welcome page as universal routing hub
  - Only complete profiles see Dashboard

- **Firebase Token Storage**: Firebase SDK stores tokens in browser's internal storage (not localStorage), but we also store `firebaseToken` in localStorage for API calls

- **Multi-Tenancy**: All data scoped to `companyHQId` (tenant identifier) - owners must have a CompanyHQ before accessing main features
- **Terminology**: 
  - `companyHQId` = tenant identifier (CompanyHQ - the owner's company)
  - `ownerId` = Owner record ID (references Owner model, stored on CompanyHQ)
  - `companyId` = prospect/client company (used in Contact model - the company the contact works for)
- **Architecture**: Owner model is the universal personhood entity - not User. CompanyHQ has `ownerId` that references Owner.

---

**Last Updated**: January 2025  
**Related Docs**: `Ignitebd_stack_devguide.md`, `IGNITE_ARCHITECTURE.md`, `FIREBASE-AUTH-AND-USER-MANAGEMENT.md`

