# Contact Management System

## Current Status

**Problem**: ContactsHub was trying to fetch from `/api/contacts` but the backend route **DOESN'T EXIST YET** (404 error).

**Solution**: 
- ✅ ContactsHub fetch is **DISABLED** - no hydration attempt
- ✅ Shows empty state - no errors
- ✅ Ready to enable when backend route is created

**Backend Routes Defined** (from `index.js`):
- ✅ `/api/owner/*` - Owner routes
- ✅ `/api/companyhq/*` - CompanyHQ routes  
- ✅ `/api/proposals/*` - Proposal routes
- ❌ `/api/contacts/*` - **NOT DEFINED YET!**

---

## Architecture Overview

### Contact Model (from IGNITE_ARCHITECTURE.md)

**Contact** = Universal personhood container
- `id` - Contact ID
- `companyId` - CompanyHQId (tenant identifier - direct relationship)
- `firstName`, `lastName`, `goesBy` - Name fields
- `email`, `phone`, `title` - Contact info
- `contactCompanyId` - Reference to Company (the company they work for)
- `photoURL` - Profile photo
- `buyerDecision`, `howMet` - Smart scaffolding fields
- `pipeline` - Pipeline relationship (one-to-one via Pipeline model)

**Pipeline Model** - Intentional pipeline state
- `pipeline` - Pipeline type (string: 'prospect', 'client', 'collaborator', etc.)
- `stage` - Current stage (string: 'prospect-interest', 'client-onboarding', etc.)
- `contactId` - Unique reference to Contact

**Company Model** - Prospect/client companies
- Companies that contacts work for
- Nested under CompanyHQId via `companyHQId` field
- Created when a Contact is associated with that company

---

## Frontend Implementation

### ContactsHub (`/contacts`)

**Current State**: 
- ✅ Loads without crashing
- ✅ Shows empty state when no contacts or API unavailable
- ✅ Handles 404 gracefully (no error message, just empty state)
- ✅ Ready for API integration when backend routes are ready

**Features Needed**:
- [ ] Contact list display (table view)
- [ ] Search/filter functionality
- [ ] Contact creation (manual entry)
- [ ] Contact editing
- [ ] Pipeline/stage management
- [ ] Contact company association

---

## Backend Implementation (TODO)

### Contact Routes Needed

```
GET    /api/contacts?companyHQId=xxx              → List all contacts for company
GET    /api/contacts?companyHQId=xxx&pipeline=xxx → List contacts by pipeline
GET    /api/contacts?companyHQId=xxx&stage=xxx    → List contacts by stage
GET    /api/contacts/:contactId                   → Get single contact
POST   /api/contacts                               → Create contact
PUT    /api/contacts/:contactId                   → Update contact
DELETE /api/contacts/:contactId                   → Delete contact
```

### Contact Creation Flow

**When creating a contact:**
1. Create Contact record with `companyId` (CompanyHQId)
2. Create or find Company record (prospect/client company) - nested under CompanyHQId
3. Link Contact to Company via `contactCompanyId`
4. Optionally create Pipeline record with `pipeline` and `stage`

### Contact Hydration

**Hydrate by CompanyHQId:**
- Filter by `companyId = companyHQId` (direct relationship)
- Include `contactCompany` relation (the company they work for)
- Include `pipeline` relation (pipeline/stage state)

---

## Implementation Priority

### Phase 1: Basic Contact Management (MVP)
1. ✅ **ContactsHub loads without crashing** - DONE
2. ⏳ **Backend: GET /api/contacts?companyHQId=xxx** - List contacts
3. ⏳ **Frontend: Display contact list** - Show contacts in table
4. ⏳ **Backend: POST /api/contacts** - Create contact
5. ⏳ **Frontend: Contact creation form** - Manual entry

### Phase 2: Contact Details & Pipeline
6. ⏳ **Backend: GET /api/contacts/:contactId** - Get single contact
7. ⏳ **Frontend: Contact detail view** - View/edit contact
8. ⏳ **Backend: PUT /api/contacts/:contactId** - Update contact
9. ⏳ **Frontend: Pipeline/stage management** - Move contacts through pipeline

### Phase 3: Advanced Features
10. ⏳ **Contact search/filter** - Advanced filtering
11. ⏳ **Contact company management** - Manage prospect/client companies
12. ⏳ **Contact import (CSV)** - Bulk import contacts
13. ⏳ **Contact enrichment** - Auto-fill data from LinkedIn, etc.

---

## Key Principles

1. **Multi-Tenancy**: All contacts scoped to CompanyHQId (tenant isolation)
2. **Universal Personhood**: One Contact record represents a person across their entire journey
3. **Pipeline Tracking**: Pipeline state lives in Pipeline model (intentional, not direct fields)
4. **Company Association**: Contacts linked to Companies (prospect/client companies) they work for
5. **Graceful Degradation**: Frontend works even if backend routes don't exist yet

---

## Next Steps

1. **Backend**: Create Contact routes (start with GET /api/contacts)
2. **Frontend**: Update ContactsHub to display real contact data
3. **Backend**: Create Contact creation route (POST /api/contacts)
4. **Frontend**: Wire up ContactManual form to create contacts
5. **Testing**: Test contact creation and display flow

---

**Last Updated**: January 2025  
**Status**: Frontend ready, backend routes needed  
**Priority**: High - Contact management is core to BD platform

