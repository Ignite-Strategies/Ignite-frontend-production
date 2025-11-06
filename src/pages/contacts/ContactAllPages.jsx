import { useNavigate } from 'react-router-dom';
import { Eye, FileText, Users, Upload, List, Filter, Building2, Calendar } from 'lucide-react';

export default function ContactAllPages() {
  const navigate = useNavigate();

  const contactPages = [
    {
      name: 'ContactsHub',
      route: '/contacts',
      description: 'Main contacts hub - action center with quick links',
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      status: 'Active'
    },
    {
      name: 'ContactManageHome',
      route: '/contacts/manage-home',
      description: 'View all contacts - the main contact list view',
      icon: <Users className="h-6 w-6" />,
      color: 'indigo',
      status: 'Active'
    },
    {
      name: 'ContactUpload',
      route: '/contacts/upload',
      description: 'Upload contacts via CSV or add manually',
      icon: <Upload className="h-6 w-6" />,
      color: 'green',
      status: 'Active'
    },
    {
      name: 'ContactManual',
      route: '/contacts/manual',
      description: 'Manual contact entry form',
      icon: <FileText className="h-6 w-6" />,
      color: 'purple',
      status: 'Active'
    },
    {
      name: 'ContactListManager',
      route: '/contacts/list-manager',
      description: 'Manage contact lists and groups',
      icon: <List className="h-6 w-6" />,
      color: 'orange',
      status: 'Active'
    },
    {
      name: 'ContactListView',
      route: '/contacts/list-view',
      description: 'View contacts in a specific list',
      icon: <Filter className="h-6 w-6" />,
      color: 'orange',
      status: 'Active'
    },
    {
      name: 'ContactListDetail',
      route: '/contacts/list-detail',
      description: 'Detailed view of a contact list',
      icon: <Eye className="h-6 w-6" />,
      color: 'pink',
      status: 'Active'
    },
    {
      name: 'ContactListBuilder',
      route: '/contacts/list-builder',
      description: 'Build and create new contact lists',
      icon: <Building2 className="h-6 w-6" />,
      color: 'teal',
      status: 'Active'
    },
    {
      name: 'ContactManageHome',
      route: '/contacts/manage-home',
      description: 'Contact management home page',
      icon: <Users className="h-6 w-6" />,
      color: 'cyan',
      status: 'Active'
    },
    {
      name: 'Companies',
      route: '/contacts/companies',
      description: 'Manage prospect/client companies',
      icon: <Building2 className="h-6 w-6" />,
      color: 'blue',
      status: 'Active'
    },
    {
      name: 'DealPipelines',
      route: '/contacts/deal-pipelines',
      description: 'Manage deal pipelines and stages',
      icon: <Filter className="h-6 w-6" />,
      color: 'purple',
      status: 'Active'
    },
    {
      name: 'DemoContactList',
      route: '/contacts/demo-list',
      description: 'Demo contact list component',
      icon: <Users className="h-6 w-6" />,
      color: 'gray',
      status: 'Active'
    }
  ];

  const getColorClasses = (color, isActive) => {
    const colors = {
      blue: isActive ? 'border-blue-500 bg-blue-50 hover:bg-blue-100' : 'border-blue-200 bg-blue-50/50 hover:bg-blue-50',
      green: isActive ? 'border-green-500 bg-green-50 hover:bg-green-100' : 'border-green-200 bg-green-50/50 hover:bg-green-50',
      purple: isActive ? 'border-purple-500 bg-purple-50 hover:bg-purple-100' : 'border-purple-200 bg-purple-50/50 hover:bg-purple-50',
      indigo: isActive ? 'border-indigo-500 bg-indigo-50 hover:bg-indigo-100' : 'border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50',
      orange: isActive ? 'border-orange-500 bg-orange-50 hover:bg-orange-100' : 'border-orange-200 bg-orange-50/50 hover:bg-orange-50',
      pink: isActive ? 'border-pink-500 bg-pink-50 hover:bg-pink-100' : 'border-pink-200 bg-pink-50/50 hover:bg-pink-50',
      teal: isActive ? 'border-teal-500 bg-teal-50 hover:bg-teal-100' : 'border-teal-200 bg-teal-50/50 hover:bg-teal-50',
      cyan: isActive ? 'border-cyan-500 bg-cyan-50 hover:bg-cyan-100' : 'border-cyan-200 bg-cyan-50/50 hover:bg-cyan-50'
    };
    return colors[color] || 'border-gray-200 bg-gray-50 hover:bg-gray-100';
  };

  const handlePageClick = (page) => {
    // Navigate to all pages - routes are now enabled for inspection
    navigate(page.route);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/growth-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎨 Contact Pages Inspector
          </h1>
          <p className="text-gray-600 text-lg">
            Review and inspect all contact-related pages - clean house mode
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-gray-900">{contactPages.length}</div>
            <div className="text-sm text-gray-600">Total Pages</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-green-600">
              {contactPages.filter(p => p.status === 'Active').length}
            </div>
            <div className="text-sm text-gray-600">Active Routes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold text-orange-600">
              {contactPages.filter(p => p.status === 'Route disabled').length}
            </div>
            <div className="text-sm text-gray-600">Disabled Routes</div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactPages.map((page, index) => {
            const isActive = page.status === 'Active';
            return (
              <button
                key={index}
                onClick={() => handlePageClick(page)}
                className={`p-6 border-2 rounded-xl transition-all text-left group ${getColorClasses(page.color, isActive)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 rounded-lg ${
                    isActive 
                      ? `bg-${page.color}-100 text-${page.color}-600` 
                      : `bg-gray-100 text-gray-400`
                  }`}>
                    {page.icon}
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    isActive 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {page.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {page.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {page.description}
                </p>
                
                <div className="text-xs text-gray-500 font-mono bg-gray-100 rounded px-2 py-1 inline-block">
                  {page.route}
                </div>
              </button>
            );
          })}
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h3 className="font-bold text-yellow-900 mb-2">🧹 Clean House Mode</h3>
          <p className="text-sm text-yellow-800 mb-2">
            Use this page to review all contact pages. Click active routes to navigate, or review disabled routes to decide what to keep/remove.
          </p>
          <ul className="text-xs text-yellow-700 list-disc list-inside space-y-1">
            <li><strong>Active</strong> - Routes are enabled and working</li>
            <li><strong>Route disabled</strong> - Component exists but route not defined in App.jsx</li>
            <li>Review each page to determine if it's needed or should be removed</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

