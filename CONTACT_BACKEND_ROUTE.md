# Contact Backend Route - Universal Create

## Route: `POST /api/contacts/universal-create`

### Purpose
Single route that handles contact creation with 3 separate mutations:
1. **Contact Upsert** - Create or update contact
2. **Company Upsert** - Create or update company (if provided)
3. **Pipeline Upsert** - Create or update pipeline (if provided)

### Request Body

```json
{
  "contact": {
    "companyId": "companyHQId-here",  // Required - CompanyHQId
    "firstName": "John",               // Required
    "lastName": "Doe",                 // Required
    "goesBy": "Johnny",                // Optional
    "email": "john@example.com",       // Optional
    "phone": "555-1234",               // Optional
    "title": "CEO",                    // Optional
    "notes": "...",                    // Optional
    "buyerDecision": "...",            // Optional
    "howMet": "...",                   // Optional
    "photoURL": "..."                  // Optional
  },
  "company": {                         // Optional - null if no company
    "companyHQId": "companyHQId-here",
    "companyName": "Acme Corp",        // Required if company provided
    "address": "...",                  // Optional
    "industry": "..."                  // Optional
  },
  "pipeline": {                        // Optional - null if no pipeline
    "pipeline": "prospect",            // Required if pipeline provided
    "stage": "interest"                // Optional
  }
}
```

### Response

```json
{
  "success": true,
  "contact": {
    "id": "contact-id",
    "firstName": "John",
    "lastName": "Doe",
    "contactCompanyId": "company-id",  // Set if company was created/linked
    // ... other contact fields
  },
  "company": {
    "id": "company-id",
    "companyName": "Acme Corp",
    // ... other company fields
  },
  "pipeline": {
    "id": "pipeline-id",
    "contactId": "contact-id",
    "pipeline": "prospect",
    "stage": "interest"
  }
}
```

### Implementation Flow

1. **Validate Request**
   - Check `companyHQId` exists
   - Validate required contact fields (firstName, lastName)
   - Validate company if provided (companyName required)
   - Validate pipeline if provided (pipeline type required)

2. **Contact Upsert**
   - Create or update Contact record
   - Set `companyId` = `companyHQId` (tenant scope)
   - Return contact ID

3. **Company Upsert (if provided)**
   - If `company.companyName` provided:
     - Find existing Company by `companyName` + `companyHQId`
     - If exists, use existing Company ID
     - If not, create new Company with `companyHQId`
   - Link Contact to Company: `contact.contactCompanyId = company.id`
   - Update Contact record

4. **Pipeline Upsert (if provided)**
   - If `pipeline.pipeline` provided:
     - Find existing Pipeline by `contactId`
     - If exists, update Pipeline record
     - If not, create new Pipeline record
     - Set `pipeline` and `stage` (if provided)

5. **Return Response**
   - Return contact, company (if created), and pipeline (if created)

### Error Handling

```json
{
  "success": false,
  "error": "Error message here",
  "errors": ["Field-specific errors"]
}
```

### Example Implementation (Pseudocode)

```javascript
// routes/universalContactCreateRoute.js

app.post('/api/contacts/universal-create', async (req, res) => {
  try {
    const { contact, company, pipeline } = req.body;
    const companyHQId = contact.companyId;
    
    // 1. Validate
    if (!contact.firstName || !contact.lastName) {
      return res.status(400).json({ success: false, error: 'First name and last name required' });
    }
    
    // 2. Contact Upsert
    const contactRecord = await prisma.contact.upsert({
      where: { 
        // Upsert logic - maybe by email + companyHQId?
        // Or always create new?
      },
      update: { ...contact },
      create: { ...contact, companyId: companyHQId }
    });
    
    // 3. Company Upsert (if provided)
    let companyRecord = null;
    if (company && company.companyName) {
      companyRecord = await prisma.company.upsert({
        where: {
          companyName_companyHQId: {
            companyName: company.companyName,
            companyHQId: companyHQId
          }
        },
        update: { ...company },
        create: { ...company, companyHQId }
      });
      
      // Link contact to company
      await prisma.contact.update({
        where: { id: contactRecord.id },
        data: { contactCompanyId: companyRecord.id }
      });
    }
    
    // 4. Pipeline Upsert (if provided)
    let pipelineRecord = null;
    if (pipeline && pipeline.pipeline) {
      pipelineRecord = await prisma.pipeline.upsert({
        where: { contactId: contactRecord.id },
        update: { ...pipeline },
        create: { ...pipeline, contactId: contactRecord.id }
      });
    }
    
    // 5. Return response
    res.json({
      success: true,
      contact: contactRecord,
      company: companyRecord,
      pipeline: pipelineRecord
    });
    
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
```

### Notes

- **Contact-First**: Contact is always created first
- **Separate Upserts**: Company and Pipeline are upserted separately
- **Association**: Company is linked to Contact via `contactCompanyId`
- **Pipeline**: Pipeline is linked to Contact via `contactId` (one-to-one)
- **Multi-Tenancy**: All records scoped to `companyHQId`

---

**Last Updated**: January 2025  
**Status**: Architecture defined, implementation pending  
**Priority**: High - Core to contact creation flow

