# Ignite Contact Architecture

**Last Updated**: January 2025  
**Status**: ✅ Fully Implemented - Backend routes, frontend forms, and pipeline triggers active  
**Priority**: High - Contact management is core to BD platform

---

## Architecture Overview

### Contact Model - Universal Personhood Container

**Contact** = Universal personhood container that represents a person across their entire journey

**Core Fields:**
- `id` - Contact ID
- `companyId` - CompanyHQId (tenant identifier - direct relationship)
- `firstName`, `lastName`, `goesBy` - Name fields
- `email`, `phone`, `title` - Contact info
- `contactCompanyId` - Reference to Company (the company they work for)
- `buyerDecision` - Buyer decision maker type (dropdown: Senior Person, Product User, Has Money)
- `howMet` - How we met/know this person (dropdown: Personal Relationship, Referral, Met at Event/Conference, Cold Outreach)
- `notes` - Notes/context about the contact
- `pipeline` - Pipeline relationship (one-to-one via Pipeline model)

**Removed Fields:**
- ~~`photoURL`~~ - Removed (will be scraped/enriched automatically)

### Pipeline Model - Intentional Pipeline State

**Pipeline** = Separate model that hosts pipeline and stage fields

**Fields:**
- `pipeline` - Pipeline type (string: 'prospect', 'client', 'collaborator', 'institution')
- `stage` - Current stage (string value from pipeline config)
- `contactId` - Unique reference to Contact (one Pipeline per Contact)

**Pipeline Stages:**

**Prospect:**
- `interest` - Initial interest expressed
- `meeting` - Meeting scheduled/held
- `proposal` - Proposal sent
- `contract` - Contract in progress
- `contract-signed` - Contract signed → **AUTO-CONVERTS TO CLIENT**

**Client:**
- `kickoff` - Project kickoff
- `work-started` - Work has started
- `work-delivered` - Work delivered
- `sustainment` - Sustainment phase
- `renewal` - Renewal (upsell - starting new work)
- `terminated-contract` - Contract terminated

**Collaborator & Institution:**
- `interest` - Initial interest
- `meeting` - Meeting scheduled/held
- `moa` - Memorandum of Agreement
- `agreement` - Formal agreement

**Pipeline Triggers:**
- When a contact reaches `contract-signed` in prospect pipeline → **automatically converts** to `client` pipeline with `kickoff` stage
- Handled by `PipelineTriggerService`

### Company Model - Prospect/Client Companies

**Company** = Companies that contacts work for (prospect/client companies)

**Fields:**
- `id` - Company ID
- `companyHQId` - CompanyHQId (scoped to tenant - multi-tenancy)
- `companyName` - Company name
- `address` - Company address (optional - will be scraped)
- `industry` - Industry/sector (optional - can be inferred)
- `website` - Website URL (inferred from email domain or manually entered)
- `revenue` - Revenue (optional)
- `yearsInBusiness` - Years in business (optional)
- `proposalId`, `contractId`, `invoiceId` - Document references

**Company Enrichment:**
- Website URL automatically inferred from contact email domain
- Example: `joel.gulick@businesspointlaw.com` → `https://www.businesspointlaw.com`
- Handled by `CompanyEnrichmentService`

---

## Backend Implementation

### Contact Routes (All Implemented ✅)

```
GET    /api/contacts?companyHQId=xxx              → List all contacts for company
GET    /api/contacts?companyHQId=xxx&pipeline=xxx → List contacts by pipeline
GET    /api/contacts?companyHQId=xxx&stage=xxx    → List contacts by stage
GET    /api/contacts/:contactId                   → Get single contact
POST   /api/contacts                               → Create contact
POST   /api/contacts/universal-create              → Create contact + company + pipeline (used by ContactManual form)
PUT    /api/contacts/:contactId                   → Update contact (with pipeline trigger support)
DELETE /api/contacts/:contactId                   → Delete contact
```

### Config Routes

```
GET    /api/pipelines/config                       → Get pipeline config, buyerDecision types, howMet types
```

### Contact Creation Flow

**Universal Create Route** (`POST /api/contacts/universal-create`):

1. **Validate** CompanyHQId exists
2. **Create/Find Company** (if companyName provided):
   - Find existing company by name
   - If not found, create new Company record
   - **Auto-infer website** from contact email if not provided
3. **Create Contact** with Company link
4. **Create Pipeline** (if pipeline/stage provided)
5. **Return** Contact with relations (pipeline, contactCompany)

**Pipeline Trigger:**
- If pipeline update sets stage to `contract-signed` → automatically converts to `client` pipeline with `kickoff` stage

---

## Frontend Implementation

### ContactManual Form (`/contacts/manual`)

**Form Fields:**

**Required:**
- First Name *
- Last Name *

**Contact Info:**
- Goes By / Preferred Name
- Email
- Phone
- Job Title

**Company Info:**
- Business Name
- Company Website URL (optional - can be inferred from email)
- Industry (optional - can be inferred)

**Pipeline:**
- Pipeline Type (dropdown: prospect, client, collaborator, institution)
- Pipeline Stage (dropdown - dynamic based on pipeline selection)

**Additional:**
- Notes (textarea)
- How We Met (dropdown: Personal Relationship, Referral, Met at Event/Conference, Cold Outreach)
- Buyer Decision Type (dropdown: Senior Person, Product User, Has Money)

**Features:**
- Pre-filled with test data (Joel Gulick)
- Fetches pipeline config, buyerDecision, and howMet options from backend
- Auto-submits to `/api/contacts/universal-create`
- Shows success state after creation

### ContactsHub (`/contacts`)

**Current State:**
- ✅ Loads without crashing
- ✅ Shows empty state when no contacts
- ✅ Navigation hub for contact management features

**Features:**
- Upload Individual Contact
- Create List
- Add Business
- See Deal Pipeline
- View All Contacts
- Manage Lists
- Manual Entry

---

## Services

### PipelineTriggerService

**Location:** `ignitebd-backend/services/PipelineTriggerService.js`

**Function:** Automatically converts contacts when pipeline stages trigger conversions

**Current Triggers:**
- `contract-signed` (prospect) → `client` pipeline with `kickoff` stage

**Usage:** Integrated into contact update route - automatically checks and applies triggers when pipeline/stage is updated

### CompanyEnrichmentService

**Location:** `ignitebd-backend/services/CompanyEnrichmentService.js`

**Functions:**
- `extractDomainFromEmail(email)` - Extracts domain from email
- `inferWebsiteFromEmail(email)` - Infers `https://www.domain.com` from email
- `enrichCompanyFromEmail(companyData, contactEmail)` - Enriches company with inferred website

**Usage:** Automatically called during contact creation when company is created

---

## Multi-Tenancy

**CompanyHQId-First Storage & Hydration:**

- **Everything stored under CompanyHQId** (the root container)
- All contacts, companies scoped to `companyId` (CompanyHQId)
- `companyId` = CompanyHQId = The customer company's tenant identifier
- Each tenant's data is isolated by their CompanyHQId
- **Company records (prospect/client companies) are nested under CompanyHQId** via `companyHQId` field

**Hydration:**
- **Hydrate by CompanyHQId** - direct relationship, clean and simple
- **Owner is NOT a Contact** - ownerId is on CompanyHQ model, so Contact queries won't include owner data
- **Always filter by CompanyHQId** in all queries for security/isolation

---

## Key Principles

1. **Multi-Tenancy**: All contacts scoped to CompanyHQId (tenant isolation)
2. **Universal Personhood**: One Contact record represents a person across their entire journey
3. **Pipeline Tracking**: Pipeline state lives in Pipeline model (intentional, not direct fields)
4. **Company Association**: Contacts linked to Companies (prospect/client companies) they work for
5. **Auto-Enrichment**: Website URLs inferred from email domains automatically
6. **Pipeline Triggers**: Automatic conversions based on stage changes (contract-signed → client)
7. **Smart Defaults**: Dropdowns for buyerDecision and howMet prevent user confusion

---

## Implementation Status

### ✅ Completed (Phase 1 - MVP)

1. ✅ **Backend: Contact routes** - All CRUD operations implemented
2. ✅ **Backend: Pipeline config route** - Exposes pipeline stages, buyerDecision, howMet configs
3. ✅ **Backend: PipelineTriggerService** - Auto-conversion on contract-signed
4. ✅ **Backend: CompanyEnrichmentService** - Auto-infer website from email
5. ✅ **Frontend: ContactManual form** - Full form with all fields, dropdowns, validation
6. ✅ **Frontend: ContactsHub** - Navigation hub for contact management
7. ✅ **Schema: Company model** - Added `website` field
8. ✅ **Schema: Contact model** - Added `notes` field, removed `photoURL`

### ⏳ Next Steps (Phase 2)

1. ⏳ **Frontend: Contact list display** - Show contacts in table view
2. ⏳ **Frontend: Contact detail view** - View/edit individual contacts
3. ⏳ **Frontend: Pipeline/stage management UI** - Move contacts through pipeline
4. ⏳ **Backend: CSV upload** - Bulk import contacts
5. ⏳ **Frontend: Contact search/filter** - Advanced filtering

---

## Database Schema

### Contact Model
```prisma
model Contact {
  id               String       @id @default(cuid())
  companyId        String       // CompanyHQId
  firstName        String?
  lastName         String?
  goesBy           String?
  email            String?
  phone            String?
  title            String?
  contactCompanyId String?      // Reference to Company
  buyerDecision    String?      // Buyer type (from buyerconfig.js)
  howMet           String?      // How we met (from howMetConfig.js)
  notes            String?      // Notes/context
  contactListId    String?
  createdAt        DateTime     @default(now())
  updatedAt        DateTime     @updatedAt
  companyHQ        CompanyHQ    @relation(fields: [companyId], references: [id])
  contactCompany   Company?     @relation(fields: [contactCompanyId], references: [id])
  pipeline         Pipeline?
}
```

### Company Model
```prisma
model Company {
  id              String    @id @default(cuid())
  companyHQId     String    // CompanyHQId
  companyName     String
  address         String?
  industry        String?
  website         String?   // Inferred from email or manually entered
  revenue         Float?
  yearsInBusiness Int?
  proposalId      String?
  contractId      String?
  invoiceId       String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  companyHQ       CompanyHQ @relation(fields: [companyHQId], references: [id], onDelete: Cascade)
  contacts        Contact[]
}
```

### Pipeline Model
```prisma
model Pipeline {
  id        String   @id @default(cuid())
  contactId String   @unique
  pipeline  String   // 'prospect', 'client', 'collaborator', 'institution'
  stage     String   // Stage value from pipeline config
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  contact   Contact  @relation(fields: [contactId], references: [id], onDelete: Cascade)
}
```

---

**Status**: ✅ Production Ready - Contact management fully functional with auto-enrichment and pipeline triggers!

