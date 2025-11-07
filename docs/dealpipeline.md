# Deal Pipeline Guide

## Premise

The Deal Pipeline view gives operators a fast, visual way to see **where contacts currently sit in their engagement journey**.  
For MVP we focus on showing **counts of contacts by pipeline + stage**.  
In MVP2 we will extend each card with **value totals (ARR / contract value)** and richer forecasting.

## Data Sources

1. **Pipeline Configuration**  
   - Defined in `ignitebd-backend/config/pipelineConfig.js`.  
   - `PIPELINE_STAGES` is the single source of truth for available pipeline types and the ordered list of stages.
   - Exposed through `GET /api/pipelines/config`.

2. **Contact Records**  
   - Each `Contact` may have one `Pipeline` child record (`pipeline` + `stage`).  
   - The universal create/update routes (`/api/contacts`, `/api/contacts/universal-create`) upsert the Pipeline entry on the contact’s behalf.
   - Frontend hydration (`GET /api/contacts?companyHQId=...`) always requests the `pipeline` relation so the pipeline board can compute the totals without an additional API round-trip.

3. **Local Hydration Cache**  
   - `localStorage.contacts` caches the most recent contact data.  
   - Deal Pipeline reads from this cache first for instant UI, then background refresh keeps counts accurate.

## Render Behaviour (MVP 1)

1. Fetch pipeline config on mount (fallback to config defaults if the API is unavailable).  
2. Hydrate contacts from local storage (triggering refresh via `/api/contacts`).  
3. Display each pipeline type (prospect, client, collaborator, institution) as a tab.  
4. For the active pipeline, render columns for every stage defined in the config.  
5. Count contacts whose persisted `pipeline.pipeline` and `pipeline.stage` fields match the selected pipeline.  
6. MVP value column displays `$0` (placeholder).  
7. Stage cards support basic progression actions (“Next Stage”) that update the cached copy in local storage (server write will arrive in MVP2).

## MVP2 Enhancements (planned)

- Aggregate **deal value** totals per stage and pipeline (using `Pipeline.value` or a derived metric).  
- Persist stage changes via dedicated pipeline routes.  
- Introduce persona-specific boards (e.g. Capital Partner vs Portfolio Manager) once personas live in data.  
- Merge pipeline board with analytics (conversion rates, aging, leakage).

## Data Model Recap

```prisma
model Pipeline {
  id        String   @id @default(cuid())
  contactId String   @unique
  contact   Contact  @relation(fields: [contactId], references: [id], onDelete: Cascade)

  pipeline  String   // e.g. prospect, client, collaborator, institution
  stage     String   // e.g. interest, meeting, proposal, contract-signed

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- `pipeline` and `stage` values **must** align with `PIPELINE_STAGES` in `pipelineConfig.js`.  
- The backend validates both fields before saving.

## Frontend Responsibilities

- Fetch pipeline config (`api.get('/api/pipelines/config')`).  
- Hydrate contacts (`localStorage.contacts`, fallback to API).  
- Normalise case/human labels when rendering (`interest` → `Interest`).  
- Provide a consistent breadcrumb (“Growth Dashboard → People Hub → Deal Pipeline”) via the shared `PageHeader`.

## Related Links

- `ignitebd-backend/config/pipelineConfig.js`  
- `Ignite-frontend-production/src/pages/contacts/DealPipelines.jsx`  
- `Ignite-frontend-production/Ignitebd_stack_devguide.md`  
- `ignitebd-backend/IGNITE_ARCHITECTURE.md`


