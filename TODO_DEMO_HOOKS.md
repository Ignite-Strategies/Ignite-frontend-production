# TODO: Demo Hooks Cleanup

## Issue
Two demo/placeholder hooks are currently in use but don't actually work:

### 1. `useDynamics` Hook
- **Location**: `src/hooks/useDynamics.js`
- **Used in**: `src/pages/contacts/Companies.jsx`
- **Problem**: Returns error "Dynamics 365 integration not yet implemented"
- **Impact**: "Sync from Dynamics 365" button doesn't work

### 2. `useMicrosoftGraph` Hook
- **Location**: `src/hooks/useMicrosoftGraph.js`
- **Used in**: `src/pages/contacts/ContactManageHome.jsx`
- **Problem**: Returns error "Microsoft Graph integration not yet implemented"
- **Impact**: "Sync from Email" button doesn't work

## Options to Fix
1. **Remove hooks and UI** - Remove the hooks and disable/remove the sync buttons
2. **Implement real integrations** - Connect to actual Dynamics 365 and Microsoft Graph APIs
3. **Disable features** - Comment out or conditionally hide the sync functionality

## Related Files
- `src/hooks/useDynamics.js`
- `src/hooks/useMicrosoftGraph.js`
- `src/pages/contacts/Companies.jsx` (line 4, 10, 13-18)
- `src/pages/contacts/ContactManageHome.jsx` (line 6, 12, 18-24)

## Status
⚠️ **Not blocking** - Features are demo placeholders, marked for future implementation

