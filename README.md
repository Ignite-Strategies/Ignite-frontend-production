# Ignite Activation Frontend

React frontend for the Ignite Activation prototype - demonstrating "Activation Accounting" for founders.

## Stack

- **React 18** with hooks
- **Vite** for blazing-fast dev server
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will run on **http://localhost:5173** by default.

## Project Structure

```
src/
├── context/
│   └── ActivationContext.jsx    # Global state management
├── lib/
│   └── api.js                    # Axios instance with interceptors
├── pages/
│   ├── Splash.jsx                # Landing page: "Are you ready to ignite?"
│   ├── Auth.jsx                  # Mock auth page
│   ├── Home.jsx                  # Main dashboard with Target Revenue Planner
│   ├── Cost.jsx                  # Cost/Ops + Ignite Coefficient
│   ├── Human.jsx                 # Human Capital & Efficiency
│   └── BD/
│       ├── Goals.jsx             # BD Goals & milestones
│       ├── Events.jsx            # Events outreach activation
│       ├── Content.jsx           # Content planning
│       └── Ads.jsx               # Google Ads simulator
├── App.jsx                       # Router setup
├── main.jsx                      # Entry point
└── index.css                     # Tailwind imports
```

## Features

### 🔥 Splash Page (/)
- Big headline: "Are you ready to ignite?"
- Call-to-action buttons: Get Started / Try the Demo
- Three-pillar preview: Plan, Activate, Track

### 🔐 Auth (/auth)
- Mock authentication (no real auth required)
- Email input → sets session cookie → redirects to /home

### 🏠 Home (/home)
- Three clickable pillar cards: Cost/Ops, Human Capital, BD
- **Target Revenue Planner** widget:
  - Inputs: Annual Target, Avg Deal, Win Rate, Sales Cycle
  - Outputs: Deals Needed, Opps Needed, Monthly Target, Starts Per Month

### 💰 Cost/Ops (/cost)
- Input: Previous Revenue, Current Revenue, Reinvestment %
- Calculate **Ignite Coefficient**: `Growth × Reinvestment × Utilization`
- Shows 2-3 tactical recommendations

### ⚡ Human Capital (/human)
- Input: Capacity Units, Actual Units, Planned Contractor Units
- Calculate utilization %
- Save to global context for Coefficient calculation
- Color-coded insights (low/healthy/high utilization)

### 🚀 Business Development (/bd/*)

#### Goals (/bd/goals)
- Set annual and quarterly revenue targets
- Visual progress bar with milestones

#### Events (/bd/events)
- List of mock upcoming events
- Click "Activate Outreach" to generate:
  - Action items (tasks)
  - Priority contacts
  - Email message template

#### Content (/bd/content)
- Generate weekly content plan
- Three slots: Long-form, Short/Visual, Community
- Themes and hashtags

#### Ads (/bd/ads)
- Simulate Google Ads campaign
- Inputs: Budget, CPC, Conversion Rate
- Outputs: Clicks, Leads, CPA
- Tactical recommendations
- Note: "This is a simulator. We'll wire it to Google Ads once OAuth is cleared."

## Design Language

- **Big gradient cards**: `rounded-3xl`, generous padding
- **Emoji icons**: Large (text-6xl) for visual impact
- **Hover effects**: `hover:scale-[1.03]`, shadow transitions
- **Color-coded sections**: Blue (cost), Purple (human), Green (BD)
- **Generous spacing**: Clean, breathable layouts
- **Friendly empty states**: "No data yet — click to see how this works"

## State Management

Uses React Context (`ActivationContext`) to share state across pages:
- `reinvestmentPct` (from Cost page)
- `utilizationPct` (from Human page)
- `annualTarget`, `avgDeal`, `winRate`, `cycleDays` (Target Revenue Planner)
- `goalAnnual`, `goalQuarter` (BD Goals)

## API Integration

All API calls go through `src/lib/api.js`:
- Axios instance with `baseURL` set to `/api` (proxied to http://localhost:4000)
- Request/response interceptors for logging
- `withCredentials: true` for cookie-based auth

## Development Notes

- No external UI libraries (everything hand-rolled with Tailwind)
- Minimal dependencies (React, Router, Axios, Tailwind)
- No real data required - all demo/mock data
- Designed for speed and clarity over production polish

## Vite Proxy

The Vite config proxies `/api/*` requests to `http://localhost:4000`, so you can run frontend and backend separately and they'll communicate seamlessly.

