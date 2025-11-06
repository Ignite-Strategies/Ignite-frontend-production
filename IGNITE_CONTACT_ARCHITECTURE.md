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

### ContactsHub (`/contacts`) - Main Navigation Hub

**Purpose**: Central entry point for all contact management features

**6 Core Actions:**
1. **Contact Upload** → `/contacts/upload` - Add contacts (manual or CSV)
2. **View Contacts** → `/contacts/list` - See all contacts in table view
3. **Contact Lists** → `/contacts/list-manager` - Manage all contact lists
4. **View Lists** → `/contacts/list-manager` - View specific lists (accessed from list manager)
5. **Add Business** → `/contacts/companies` - Manage prospect/client companies
6. **See Deal Pipeline** → `/contacts/deal-pipelines` - Visual pipeline management

**Status**: ✅ Refactored - Clean 6-action structure

---

## Contact Pages Architecture

### Core Contact Management Pages

| Page | Route | Purpose | Status |
|------|-------|---------|--------|
| **ContactsHub** | `/contacts` | Main navigation hub (6 core actions) | ✅ Refactored |
| **ContactUpload** | `/contacts/upload` | Entry point for adding contacts | ✅ Working |
| **ContactManual** | `/contacts/manual` | Manual contact entry form | ✅ Working |
| **ContactList** | `/contacts/list` | View all contacts (table view) | ✅ Working |
| **ContactListManager** | `/contacts/list-manager` | Manage all contact lists | ✅ Working |
| **ContactListBuilder** | `/contacts/list-builder` | Build new lists (wizard) | ✅ Working |
| **ContactListView** | `/contacts/list-view` | Select contacts for list | ✅ Working |
| **ContactListDetail** | `/contacts/list-detail/:id` | View specific list | ✅ Working |
| **ContactManageHome** | `/contacts/manage-home` | ⚠️ Campaign lists (overlaps) | ⚠️ Deprecate |
| **Companies** | `/contacts/companies` | Manage businesses | ✅ Working |
| **DealPipelines** | `/contacts/deal-pipelines` | Pipeline visualization | ✅ Working |

### Page Responsibilities

**1. Contact Upload (`/contacts/upload`)**
- Entry point for adding contacts
- Routes to: ContactManual (manual entry) or CSV upload flow
- Status: ✅ Working

**2. View Contacts (`/contacts/list`)**
- Fetches all contacts from `/api/contacts?companyHQId=xxx`
- Displays in table with search and pipeline filters
- Shows: Name, Email, Phone, Company, Pipeline, Stage
- Status: ✅ Working

**3. Contact Lists (`/contacts/list-manager`)**
- Main list management hub
- Shows all contact lists for the org
- Conflict detection (sent in campaign, in draft, etc.)
- Actions: Use, Resolve Conflicts, Duplicate, Delete, Unassign
- Routes to CampaignCreator when using a list
- Status: ✅ Working

**4. View Lists (`/contacts/list-detail/:listId`)**
- View and manage a specific contact list
- Hydrates contacts for a specific list
- Shows list details and all contacts in that list
- Can edit list, remove contacts, etc.
- Status: ✅ Working
- Route: Accessed from ContactListManager

**5. Add Business (`/contacts/companies`)**
- Manage prospect/client companies
- View all companies, add new, edit details
- Status: ✅ Working
- Note: Companies are also auto-created when adding contacts

**6. See Deal Pipeline (`/contacts/deal-pipelines`)**
- Visual kanban/board view of contacts by pipeline stage
- Filter by persona, pipeline type
- Visual pipeline management
- Status: ✅ Working

### Supporting Pages (Internal Use)

**ContactListBuilder (`/contacts/list-builder`)**
- Build new contact lists (wizard flow)
- Step 1: Select list type (All Contacts, Org Members, Event Contacts, Custom)
- Step 2: Routes to ContactListView to select contacts
- Step 3: Creates list and routes to ContactListManager
- Status: ✅ Working

**ContactListView (`/contacts/list-view`)**
- Select contacts for list building
- Shows contacts based on list type
- Allows selecting/deselecting contacts
- Creates list from selected contacts
- Status: ✅ Working
- Access: From ContactListBuilder

**ContactManageHome (`/contacts/manage-home`)**
- ⚠️ **DEPRECATED/OVERLAPPING** - Campaign lists management
- Similar to ContactListManager but focused on campaign lists
- Status: ⚠️ Needs consolidation - overlaps with ContactListManager
- Action: Consider removing or merging into ContactListManager

### List Management Consolidation

**Current Problem**: Lists were scattered across multiple pages
- ContactListManager - Main management ✅
- ContactListBuilder - Creation wizard ✅
- ContactListView - Selection interface ✅
- ContactListDetail - List detail view ✅
- ContactManageHome - ⚠️ Overlaps with ContactListManager

**Solution**: 
- **ContactListManager** = Main hub for all list operations
- **ContactListBuilder** = Creation flow (wizard)
- **ContactListDetail** = View specific list (from manager)
- **ContactListView** = Selection interface (internal, from builder)
- **ContactManageHome** = ⚠️ Deprecate or merge into ContactListManager

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

### ✅ Completed (Phase 2)

1. ✅ **Frontend: Contact list display** - ContactList page shows all contacts in table
2. ✅ **Frontend: ContactsHub refactor** - Clean 6-action navigation structure
3. ✅ **Frontend: Navigation consolidation** - Clear routing, no duplicate pages

### ⏳ Next Steps (Phase 3)

1. ⏳ **Frontend: Contact detail view** - View/edit individual contacts
2. ⏳ **Frontend: Pipeline/stage management UI** - Move contacts through pipeline
3. ⏳ **Backend: CSV upload** - Bulk import contacts
4. ⏳ **Frontend: Contact search/filter** - Advanced filtering
5. ⏳ **Consolidate ContactManageHome** - Merge into ContactListManager or deprecate

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

