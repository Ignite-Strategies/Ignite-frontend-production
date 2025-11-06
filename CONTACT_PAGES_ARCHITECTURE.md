# Contact Pages Architecture

**Last Updated**: January 2025  
**Purpose**: Clear mapping of what each contact page does and how they fit together

---

## Core Contact Management Flow

### 1. Contact Upload (`/contacts/upload`)
**Purpose**: Entry point for adding contacts
- **Routes to**: ContactManual (manual entry) or CSV upload flow
- **What it does**: Landing page with two options:
  - Manual entry → `/contacts/manual`
  - CSV upload → (future: CSV parsing flow)
- **Status**: ✅ Working

### 2. View Contacts (`/contacts/list`)
**Purpose**: View all contacts in a table/list format
- **What it does**: 
  - Fetches all contacts from `/api/contacts?companyHQId=xxx`
  - Displays in table with search and pipeline filters
  - Shows: Name, Email, Phone, Company, Pipeline, Stage
- **Status**: ✅ Working (just created)
- **Future**: Add contact detail view, edit functionality

### 3. Contact Lists (`/contacts/list-manager`)
**Purpose**: Manage all contact lists (main list management hub)
- **What it does**:
  - Shows all contact lists for the org
  - Conflict detection (sent in campaign, in draft, etc.)
  - Actions: Use, Resolve Conflicts, Duplicate, Delete, Unassign
  - Routes to CampaignCreator when using a list
- **Status**: ✅ Working
- **Note**: This is THE main list management page

### 4. View Lists (`/contacts/list-detail/:listId`)
**Purpose**: View and manage a specific contact list
- **What it does**:
  - Hydrates contacts for a specific list
  - Shows list details and all contacts in that list
  - Can edit list, remove contacts, etc.
- **Status**: ✅ Working
- **Route**: Accessed from ContactListManager

### 5. Add Business (`/contacts/companies`)
**Purpose**: Manage prospect/client companies
- **What it does**:
  - View all companies
  - Add new companies
  - Edit company details
- **Status**: ✅ Working
- **Note**: Companies are also auto-created when adding contacts

### 6. See Deal Pipeline (`/contacts/deal-pipelines`)
**Purpose**: View contacts organized by pipeline stages
- **What it does**:
  - Kanban/board view of contacts by pipeline stage
  - Filter by persona, pipeline type
  - Visual pipeline management
- **Status**: ✅ Working

---

## Supporting Pages (Internal Use)

### ContactManual (`/contacts/manual`)
**Purpose**: Manual contact entry form
- **What it does**: Full form to create a contact with company and pipeline
- **Status**: ✅ Working
- **Access**: From ContactUpload page

### ContactListBuilder (`/contacts/list-builder`)
**Purpose**: Build new contact lists (wizard flow)
- **What it does**:
  - Step 1: Select list type (All Contacts, Org Members, Event Contacts, Custom)
  - Step 2: Routes to ContactListView to select contacts
  - Step 3: Creates list and routes to ContactListManager
- **Status**: ✅ Working
- **Note**: This is the creation flow, ContactListManager is the management hub

### ContactListView (`/contacts/list-view`)
**Purpose**: Select contacts for list building
- **What it does**:
  - Shows contacts based on list type
  - Allows selecting/deselecting contacts
  - Creates list from selected contacts
- **Status**: ✅ Working
- **Access**: From ContactListBuilder

### ContactManageHome (`/contacts/manage-home`)
**Purpose**: ⚠️ **DEPRECATED/OVERLAPPING** - Campaign lists management
- **What it does**: Similar to ContactListManager but focused on campaign lists
- **Status**: ⚠️ Needs consolidation - overlaps with ContactListManager
- **Action**: Consider removing or merging into ContactListManager

### ContactsHub (`/contacts`)
**Purpose**: Main navigation hub for contact management
- **What it does**: Central entry point with links to all contact features
- **Status**: ⚠️ Needs refactoring - currently has duplicate/confusing options
- **Action**: Simplify to 6 core actions matching user flow

---

## Proposed ContactsHub Structure

**Main Hub** (`/contacts`) should have 6 clear sections:

1. **Contact Upload** → `/contacts/upload`
   - Add contacts (manual or CSV)

2. **View Contacts** → `/contacts/list`
   - See all contacts in table view

3. **Contact Lists** → `/contacts/list-manager`
   - Manage all your contact lists

4. **View Lists** → `/contacts/list-manager` (with list detail view)
   - View and manage specific lists (accessed from list manager)

5. **Add Business** → `/contacts/companies`
   - Manage prospect/client companies

6. **See Deal Pipeline** → `/contacts/deal-pipelines`
   - Visual pipeline management

---

## List Management Consolidation

**Current Problem**: Lists are scattered across multiple pages
- ContactListManager - Main management
- ContactListBuilder - Creation wizard
- ContactListView - Selection interface
- ContactListDetail - List detail view
- ContactManageHome - ⚠️ Overlaps with ContactListManager

**Solution**: 
- **ContactListManager** = Main hub for all list operations
- **ContactListBuilder** = Creation flow (wizard)
- **ContactListDetail** = View specific list (from manager)
- **ContactListView** = Selection interface (internal, from builder)
- **ContactManageHome** = ⚠️ Deprecate or merge into ContactListManager

---

## Page Responsibilities Summary

| Page | Route | Purpose | Status |
|------|-------|---------|--------|
| ContactsHub | `/contacts` | Main navigation hub | ⚠️ Needs refactor |
| ContactUpload | `/contacts/upload` | Entry point for adding contacts | ✅ Working |
| ContactManual | `/contacts/manual` | Manual contact entry form | ✅ Working |
| ContactList | `/contacts/list` | View all contacts (table) | ✅ Working |
| ContactListManager | `/contacts/list-manager` | Manage all contact lists | ✅ Working |
| ContactListBuilder | `/contacts/list-builder` | Build new lists (wizard) | ✅ Working |
| ContactListView | `/contacts/list-view` | Select contacts for list | ✅ Working |
| ContactListDetail | `/contacts/list-detail/:id` | View specific list | ✅ Working |
| ContactManageHome | `/contacts/manage-home` | ⚠️ Campaign lists (overlaps) | ⚠️ Deprecate |
| Companies | `/contacts/companies` | Manage businesses | ✅ Working |
| DealPipelines | `/contacts/deal-pipelines` | Pipeline visualization | ✅ Working |

---

## Next Steps

1. ✅ **Refactor ContactsHub** - Simplify to 6 core actions
2. ⚠️ **Consolidate ContactManageHome** - Merge into ContactListManager or remove
3. ✅ **Update navigation** - Ensure all routes point to correct pages
4. ✅ **Update architecture doc** - Document the clean structure

---

**Status**: Architecture mapped, ready for ContactsHub refactor

