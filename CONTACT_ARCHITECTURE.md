# Contact Architecture - Contact-First Design

## Core Principles

### 1. Contact-First Architecture
- **Contacts are primary** - They exist independently
- **Companies are associations** - Like HubSpot, companies are separate entities linked to contacts
- **Never bolt company data onto contacts** - Company info lives in Company model, referenced via association

### 2. Multi-Tenancy: CompanyHQId
- **All contacts attached to `companyHQId`** (NOT `ownerId`)
- `companyHQId` = Root container for all tenant data
- Contacts are scoped by `companyHQId` for data isolation

### 3. Contact + Company Relationship
- Contact has `companyId` field → References Company model
- Company model has `companyHQId` field → Nested under tenant
- Contact is associated to Company, but always under CompanyHQId

---

## Contact Model Schema

### Required Fields (Minimum for First Upload)
- `firstName` - **Required**
- `lastName` - **Required**
- `companyHQId` - **Required** (tenant identifier)

### Basic Contact Info
- `goesBy` - Preferred name/nickname
- `email` - Email address
- `phone` - Phone number
- `title` - Job title

### Company Association
- `companyId` - Reference to Company model (optional - can be null)
- Company is upserted separately when contact is created/updated

### Pipeline/Tracking
- Pipeline relationship (via Pipeline model)
- `pipeline` - Pipeline type (prospect, client, etc.)
- `stage` - Current stage

---

## Upsert Logic

### On Contact Upload/Create:

1. **Validate Required Fields**
   - `firstName` and `lastName` required
   - `companyHQId` must exist (from localStorage/auth)

2. **Upsert Contact**
   - Create or update Contact record
   - Attach to `companyHQId` (tenant)
   - If `companyId` provided, associate to existing Company
   - If `companyId` not provided but company name exists, create/find Company first

3. **Company Upsert (Separate)**
   - If contact has company name, upsert Company model separately
   - Company has its own `companyHQId` (same tenant)
   - After Company upsert, link Contact to Company via `companyId`

4. **Pipeline Association**
   - Optionally create Pipeline record for contact
   - Link via `contactId`

---

## Data Flow

```
Contact Upload/CSV
    ↓
Validate: firstName, lastName, companyHQId
    ↓
Upsert Contact (with companyHQId)
    ↓
If company name provided:
    → Upsert Company (separate, with companyHQId)
    → Link Contact to Company (set companyId)
    ↓
Contact ready (under CompanyHQId, optionally linked to Company)
```

---

## Key Rules

1. **Contact-First**: Contacts exist independently, companies are associations
2. **CompanyHQId Required**: All contacts must have `companyHQId` (tenant scope)
3. **Separate Upserts**: Company is upserted separately, not embedded in contact
4. **Association Pattern**: Contact → Company via `companyId` reference
5. **Minimum Fields**: firstName + lastName required for first upload

---

## API Endpoints Needed

### Contact Routes
```
POST   /api/contacts              → Create contact (body: { companyHQId, firstName, lastName, ... })
PUT    /api/contacts/:id          → Update contact
GET    /api/contacts?companyHQId=xxx → List contacts for tenant
GET    /api/contacts/:id          → Get single contact
```

### Company Routes (Separate)
```
POST   /api/companies             → Upsert company (body: { companyHQId, companyName, ... })
GET    /api/companies?companyHQId=xxx → List companies for tenant
```

### Contact Upload Flow
```
POST   /api/contacts/upload       → Bulk upload contacts (CSV)
                                     - Parses CSV
                                     - Validates required fields
                                     - Upserts contacts (with companyHQId)
                                     - Upserts companies separately
                                     - Links contacts to companies
```

---

## Frontend Implementation

### ContactUpload Component
- CSV template: `First Name, Last Name, Email, Phone, Company, Title`
- On upload:
  1. Parse CSV
  2. Map fields to Contact model
  3. Add `companyHQId` from localStorage
  4. POST to `/api/contacts/upload` (bulk)
  5. Backend handles company upsert and linking

### ContactsHub Component
- Fetches contacts: `GET /api/contacts?companyHQId=xxx`
- Displays contacts with company association
- Shows empty state if no contacts

---

## Next Steps

1. **Backend**: Create Contact model with `companyHQId` field
2. **Backend**: Create Company model with `companyHQId` field
3. **Backend**: Implement Contact routes (POST, GET, PUT)
4. **Backend**: Implement Company upsert logic (separate from contact)
5. **Backend**: Create bulk upload endpoint `/api/contacts/upload`
6. **Frontend**: Wire up ContactUpload to backend API
7. **Frontend**: Update ContactsHub to display real data

---

**Last Updated**: January 2025  
**Status**: Architecture defined, implementation pending  
**Priority**: High - Core to BD platform functionality

