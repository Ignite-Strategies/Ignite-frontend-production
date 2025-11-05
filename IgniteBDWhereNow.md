# IgniteBD Where Now - Current Status

**Date**: November 5, 2025

---

## Current State

### ✅ Completed Setup
- Architecture schema set up to onboard Adam
- Firebase authentication successful
- Profile route deployed (`PUT /api/owner/:id/profile`)

### 🚧 In Progress
- **Creating routes one at a time** - Building out backend routes systematically
- **Hydration route needs work** - User restarted computer, hydration route needs to function properly

---

## Immediate Next Steps

### 1. Owner Hydrate Route (`GET /api/owner/hydrate`)
**Status**: Needs to be created/verified

**What it should do:**
- Find Owner by Firebase ID (from verified token)
- Return full Owner data with:
  - `owner` object (name, email, photoURL)
  - `ownedCompanies` array (CompanyHQs where ownerId matches)
  - `managedCompanies` array (CompanyHQs where managerId matches)
  - Related CompanyHQ data

**Frontend Usage:**
- Welcome.jsx calls this route to hydrate Owner data
- Routes based on what's missing (name, companyHQ)

---

### 2. User Dashboard (New Repo)
**Purpose**: See about Adam - diagnostic/admin tool

**What it should do:**
- View Owner data for debugging
- Check Firebase ↔ Owner database sync
- Verify displayName/email crossover
- Upsert Owner records if Firebase data got out of sync

**Considerations:**
- May need Prisma to upsert if Firebase crossover stuff got jacked
- Display name/email might not match between Firebase and Owner record
- Need to look for other indicators to route users to profile setup

---

### 3. Profile Routing Logic
**Current Issue**: Need better indicators for when to route to profile

**What to check:**
- Owner record exists but `name` is null/empty
- Owner record has `name` but it's incomplete (e.g., just email prefix)
- Firebase `displayName` exists but Owner `name` is null
- Other indicators that profile needs completion

**Profile Route**: `PUT /api/owner/:ownerId/profile` (already deployed)

---

## Architecture Context

### Owner Model
- `id` - Owner record ID
- `firebaseId` - Firebase auth ID (unique)
- `name` - Full name (from displayName or firstName/lastName)
- `email` - Email address
- `photoURL` - Profile photo
- Links to CompanyHQ via `ownerId` on CompanyHQ model

### CompanyHQ Model
- `id` - CompanyHQ ID (tenant identifier)
- `ownerId` - References Owner.id (required)
- `managerId` - References Owner.id (optional)
- All data scoped to CompanyHQId

---

## Route Status

### Backend Routes
- ✅ `POST /api/owner/create` - Create/find Owner by firebaseId
- ✅ `PUT /api/owner/:id/profile` - Update Owner profile
- 🚧 `GET /api/owner/hydrate` - Hydrate Owner with full data (needs work)

### Frontend Routes
- ✅ Splash → Checks tokens, routes to Welcome or Signup
- ✅ Signup → Creates Owner, routes to Welcome
- ✅ Welcome → Hydrates Owner, routes based on what's missing
- ✅ Profile Setup → Updates Owner profile
- 🚧 Company Create/Choose → Needs to be built

---

## Firebase ↔ Owner Sync Issues

**Potential Issues:**
- Firebase `displayName` might not sync to Owner `name`
- Firebase `email` might not match Owner `email`
- Owner record might exist but missing personhood data

**Solutions:**
- User Dashboard can upsert Owner records
- Check Firebase data against Owner record
- Update Owner from Firebase data if mismatch
- Use multiple indicators to determine if profile needs completion

---

## Next Actions

1. **Fix/Optimize Hydration Route** - Ensure `GET /api/owner/hydrate` works properly
2. **Create User Dashboard** - New repo for admin/diagnostic tool
3. **Improve Profile Routing Logic** - Better indicators for when profile is incomplete
4. **Firebase Sync Verification** - Ensure displayName/email crossover works correctly

---

**Ready to get started!** 🚀

