import { useNavigate } from 'react-router-dom';
import { Users, MessageSquare, TrendingUp, Map, Plus, Mail, Filter } from 'lucide-react';
import SetupWizard from '../components/SetupWizard';

// Note: Using hardcoded values - focus on UX, not calculations

// Header Summary Component
function HeaderSummary({ targetRevenue, currentRevenue, timeHorizon, onRoadmapClick }) {
  const progressPercent = targetRevenue > 0 ? (currentRevenue / targetRevenue) * 100 : 0;
  const remaining = Math.max(0, targetRevenue - currentRevenue);
  const progressColor = progressPercent >= 75 ? 'from-green-500 to-green-600' : 
                         progressPercent >= 50 ? 'from-yellow-500 to-yellow-600' :
                         'from-red-500 to-red-600';
  
  return (
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {hasCompany ? `${companyName} Growth Dashboard` : 'Growth Dashboard'}
          </h1>
          <p className="text-gray-600">
            {hasCompany ? `Your command center for ${companyName}` : 'Your command center for business development'}
          </p>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              {progressPercent.toFixed(1)}% to goal
            </div>
            <div className="text-sm text-gray-500">
              ${remaining.toLocaleString()} remaining
            </div>
          </div>
          {onRoadmapClick && (
            <button
              onClick={onRoadmapClick}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 shadow-md whitespace-nowrap"
            >
              <Map className="h-4 w-4" />
              BD Roadmap
            </button>
          )}
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Current: ${currentRevenue.toLocaleString()}</span>
          <span>Target: ${targetRevenue.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`bg-gradient-to-r ${progressColor} h-3 rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        Target: ${targetRevenue.toLocaleString()} in {timeHorizon} months
      </div>
    </div>
  );
}

// Stack Card Component
function StackCard({ name, metrics, insight, icon, color, route }) {
  const navigate = useNavigate();
  
  // Get hover color based on base color
  const hoverColors = {
    'bg-blue-500': 'hover:border-blue-400 hover:bg-blue-50 hover:shadow-lg',
    'bg-orange-500': 'hover:border-orange-400 hover:bg-orange-50 hover:shadow-lg',
    'bg-purple-500': 'hover:border-purple-400 hover:bg-purple-50 hover:shadow-lg',
  };
  
  return (
    <div 
      className={`bg-white rounded-xl shadow-md border-2 border-gray-200 ${hoverColors[color]} transition-all duration-300 cursor-pointer group`}
      onClick={() => navigate(route)}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>
        
        {/* Metrics */}
        <div className="mb-5 space-y-2.5">
          {metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="text-gray-600 text-sm font-medium">{metric.label}</span>
              <span className="font-bold text-gray-900 text-base">{metric.value}</span>
            </div>
          ))}
        </div>
        
        {/* Insight Quote */}
        <div className="text-sm text-gray-600 italic border-t border-gray-200 pt-4 bg-gray-50 -mx-6 px-6 pb-6 rounded-b-xl">
          "{insight}"
        </div>
      </div>
    </div>
  );
}

// Main Growth Dashboard Component
export default function GrowthDashboard() {
  const navigate = useNavigate();
  
  // Get real company data from localStorage
  const companyHQ = JSON.parse(localStorage.getItem('companyHQ') || '{}');
  const companyHQId = localStorage.getItem('companyHQId');
  const owner = JSON.parse(localStorage.getItem('owner') || '{}');
  
  // Verify companyHQId matches companyHQ.id
  const hasCompany = companyHQ && companyHQ.id && companyHQId === companyHQ.id;
  const companyName = companyHQ?.companyName || 'Your Company';
  
  // Use real data if available, otherwise show empty state
  // Note: companyAnnualRev is stored as range string (e.g., "0-100k"), not a number
  // For now, we'll use a default target until we have actual revenue data
  const dashboardData = {
    targetRevenue: 1000000, // Default target - will need actual revenue tracking
    currentRevenue: 0, // Will need actual revenue tracking
    timeHorizon: 12
  };

  // 3-Card offense model - Attract, Engage, Nurture
  // Use real data when available, otherwise show empty state
  const stackCards = [
    {
      name: "Attract",
      metrics: hasCompany ? [
        { label: "Upcoming Events", value: "0" },
        { label: "Ads & SEO Active", value: "0" },
        { label: "Content Posts", value: "0" }
      ] : [
        { label: "Upcoming Events", value: "—" },
        { label: "Ads & SEO Active", value: "—" },
        { label: "Content Posts", value: "—" }
      ],
      insight: hasCompany ? "Start building your acquisition channels" : "Set up your company to get started",
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      color: "bg-blue-500",
      route: "/attract"
    },
    {
      name: "Engage",
      metrics: hasCompany ? [
        { label: "Contacts", value: "0" },
        { label: "Events This Month", value: "0" },
        { label: "Meetings Scheduled", value: "0" }
      ] : [
        { label: "Contacts", value: "—" },
        { label: "Events This Month", value: "—" },
        { label: "Meetings Scheduled", value: "—" }
      ],
      insight: hasCompany ? "Start adding contacts and building relationships" : "Set up your company to get started",
      icon: <Users className="h-6 w-6 text-white" />,
      color: "bg-orange-500",
      route: "/persona"
    },
    {
      name: "Nurture",
      metrics: hasCompany ? [
        { label: "Campaigns Active", value: "0" },
        { label: "Newsletters Sent", value: "0" },
        { label: "Response Rate", value: "0%" }
      ] : [
        { label: "Campaigns Active", value: "—" },
        { label: "Newsletters Sent", value: "—" },
        { label: "Response Rate", value: "—" }
      ],
      insight: hasCompany ? "Start nurturing your relationships" : "Set up your company to get started",
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      color: "bg-purple-500",
      route: "/outreach"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
          <strong>Debug:</strong> companyHQId={companyHQId || 'none'}, 
          companyHQ.name={companyName}, 
          hasCompany={hasCompany ? 'true' : 'false'}
        </div>
      )}
      
      {/* Setup Wizard - Show for new companies */}
      {hasCompany && (
        <SetupWizard companyHQ={companyHQ} />
      )}
      
      {/* Welcome Message if no company */}
      {!hasCompany && (
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-yellow-900 mb-2">Welcome to Ignite Strategies!</h2>
          <p className="text-yellow-800 mb-4">
            Set up your company profile to start building customer relationships and maximizing growth.
          </p>
          <button
            onClick={() => navigate('/company/create-or-choose')}
            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition"
          >
            Set Up Company →
          </button>
        </div>
      )}
      
      {/* Header Summary */}
      <HeaderSummary 
        targetRevenue={dashboardData.targetRevenue}
        currentRevenue={dashboardData.currentRevenue}
        timeHorizon={dashboardData.timeHorizon}
        onRoadmapClick={() => navigate('/roadmap')}
      />

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/contacts/manual')}
            className="flex items-center gap-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Add Contact</div>
              <div className="text-sm text-gray-600">Add a new contact to your network</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className="flex items-center gap-4 p-4 bg-purple-50 border-2 border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Filter className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Check Pipeline</div>
              <div className="text-sm text-gray-600">View and manage your contact pipeline</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/outreach')}
            className="flex items-center gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg hover:bg-green-100 hover:border-green-300 transition-all text-left group"
          >
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Send Email</div>
              <div className="text-sm text-gray-600">Send an email to your contacts</div>
            </div>
          </button>
        </div>
      </div>

      {/* Growth Drivers Banner */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Growth Drivers
        </h2>
        <p className="text-xs text-gray-400 text-center max-w-2xl">
          Attract (Ads, SEO, Content) • Engage (Connect, Events) • Nurture (Email Marketing)
        </p>
      </div>

      {/* 3-Card Offense Model */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {stackCards.map((card, index) => (
          <StackCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
