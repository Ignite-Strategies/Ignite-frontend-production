# IgniteBD Navigation Flow - Overview

## Purpose

This is the **index/overview** document for the IgniteBD Navigation Flow. The flow is broken into modular documents for easier reference and maintenance.

**Reference**: See `Ignitebd_stack_devguide.md` for technical stack details.

---

## Modular Documentation

### 1. **Authentication & Entry** (`Navigation_Flow_Auth.md`)
- Splash page (entry point)
- Signup flow
- Signin flow
- Firebase token checking

### 2. **Welcome & Hydration** (`Navigation_Flow_Welcome_Hydration.md`)
- Welcome/Hydration Hub component
- User hydration logic
- Routing based on hydration state
- localStorage management

### 3. **Onboarding Flow** (`Navigation_Flow_Onboarding.md`)
- Profile setup
- Company create/choose
- Company profile setup
- Complete onboarding journey

### 4. **Main Application** (`Navigation_Flow_Application.md`)
- Growth Dashboard
- Attract → Engage → Nurture stacks
- Protected routes
- Main application navigation

---

## Quick Reference

**Complete Flow:**
```
Splash → Auth → Welcome (Hydrate) → Onboarding → Dashboard → Application
```

**Key Routes:**
- `/` - Splash (entry point)
- `/signup` - New user registration
- `/signin` - User authentication
- `/welcome` - Hydration hub (TODO)
- `/profilesetup` - Profile setup
- `/company/create-or-choose` - Company setup
- `/companyprofile` - Company profile
- `/growth-dashboard` - Main dashboard
- Application routes (Attract/Engage/Nurture)

---

## Visual Flow

```
┌─────────┐
│ SPLASH  │ → Check Firebase tokens
└────┬────┘
     │
     ├─→ /signup (new user)
     └─→ /welcome (existing user)
           │
           ├─→ /profilesetup (missing profile)
           ├─→ /company/create-or-choose (missing company)
           └─→ /growth-dashboard (complete)
```

---

## Implementation Status

- ✅ Splash, Signup, Signin
- 🚧 Welcome/Hydration Hub (TODO)
- ✅ Profile Setup
- 🚧 Company Create/Choose (TODO)
- ✅ Company Profile
- ✅ Growth Dashboard

---

**Last Updated**: January 2025  
**Related Docs**: 
- `Navigation_Flow_Auth.md`
- `Navigation_Flow_Welcome_Hydration.md`
- `Navigation_Flow_Onboarding.md`
- `Navigation_Flow_Application.md`
- `Ignitebd_stack_devguide.md`

