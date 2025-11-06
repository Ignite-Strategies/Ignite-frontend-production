import { useNavigate } from 'react-router-dom';
import { Upload, Users, List, Building2, Filter, ArrowRight } from 'lucide-react';

export default function ContactsHub() {
  const navigate = useNavigate();

  // 6 Core Contact Management Actions
  const coreActions = [
    {
      id: 'upload',
      title: 'Contact Upload',
      description: 'Add contacts manually or via CSV',
      route: '/contacts/upload',
      icon: Upload,
      color: 'blue',
      gradient: 'from-blue-50 to-blue-100',
      border: 'border-blue-200',
      hover: 'hover:border-blue-400 hover:shadow-lg'
    },
    {
      id: 'view',
      title: 'View Contacts',
      description: 'See all your contacts in a table',
      route: '/contacts/list',
      icon: Users,
      color: 'indigo',
      gradient: 'from-indigo-50 to-indigo-100',
      border: 'border-indigo-200',
      hover: 'hover:border-indigo-400 hover:shadow-lg'
    },
    {
      id: 'lists',
      title: 'Contact Lists',
      description: 'Manage all your contact lists',
      route: '/contacts/list-manager',
      icon: List,
      color: 'purple',
      gradient: 'from-purple-50 to-purple-100',
      border: 'border-purple-200',
      hover: 'hover:border-purple-400 hover:shadow-lg'
    },
    {
      id: 'view-lists',
      title: 'View Lists',
      description: 'View and manage specific lists',
      route: '/contacts/list-manager', // Opens list manager, then click into specific list
      icon: List,
      color: 'pink',
      gradient: 'from-pink-50 to-pink-100',
      border: 'border-pink-200',
      hover: 'hover:border-pink-400 hover:shadow-lg',
      note: 'Access from Contact Lists page'
    },
    {
      id: 'business',
      title: 'Add Business',
      description: 'Manage prospect/client companies',
      route: '/contacts/companies',
      icon: Building2,
      color: 'green',
      gradient: 'from-green-50 to-green-100',
      border: 'border-green-200',
      hover: 'hover:border-green-400 hover:shadow-lg'
    },
    {
      id: 'pipeline',
      title: 'See Deal Pipeline',
      description: 'Visual pipeline management',
      route: '/contacts/deal-pipelines',
      icon: Filter,
      color: 'orange',
      gradient: 'from-orange-50 to-orange-100',
      border: 'border-orange-200',
      hover: 'hover:border-orange-400 hover:shadow-lg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            👥 People Hub
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your contacts, lists, companies, and pipelines
          </p>
        </div>

        {/* Core Actions Grid - 6 Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {coreActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                onClick={() => navigate(action.route)}
                className={`bg-gradient-to-br ${action.gradient} p-6 rounded-xl border-2 ${action.border} ${action.hover} transition text-left group`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-${action.color}-500 text-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{action.title}</h3>
                  </div>
                  <ArrowRight className={`h-5 w-5 text-${action.color}-600 opacity-0 group-hover:opacity-100 transition`} />
                </div>
                <p className="text-sm text-gray-700 mb-2">{action.description}</p>
                {action.note && (
                  <p className="text-xs text-gray-500 italic">{action.note}</p>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Quick Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">Contact Upload:</strong> Add contacts one-by-one or bulk via CSV
            </div>
            <div>
              <strong className="text-gray-900">View Contacts:</strong> See all contacts in a searchable table
            </div>
            <div>
              <strong className="text-gray-900">Contact Lists:</strong> Create and manage lists for campaigns
            </div>
            <div>
              <strong className="text-gray-900">View Lists:</strong> Open specific lists to see contacts
            </div>
            <div>
              <strong className="text-gray-900">Add Business:</strong> Manage prospect/client companies
            </div>
            <div>
              <strong className="text-gray-900">Deal Pipeline:</strong> Visual kanban view of contacts by stage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
