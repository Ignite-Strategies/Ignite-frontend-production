import { useNavigate } from 'react-router-dom';
import { Users, Mail, FileText, Lightbulb, TrendingUp, Send, BarChart3, UserCircle, Plus, MessageSquare } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { mockContacts, mockPersonTypes } from '../../data/mockData';
import PageHeader from '../../components/PageHeader';

export default function Engage() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);

  // Mock engagement metrics
  const engagementMetrics = {
    campaignsSent: 12,
    activeCampaigns: 3,
    openRate: 68,
    responseRate: 24,
  };

  // Action cards focused on engagement activities
  const actionCards = [
    {
      id: 'outreach',
      title: 'Outreach',
      description: 'Send campaigns and engage',
      icon: <Mail className="h-6 w-6" />,
      cta: 'Engage Contacts',
      color: 'bg-orange-500',
      route: '/outreach',
    },
    {
      id: 'campaigns',
      title: 'Campaigns',
      description: 'View and manage campaigns',
      icon: <Send className="h-6 w-6" />,
      cta: 'View Campaigns',
      color: 'bg-blue-500',
      route: '/outreach',
    },
    {
      id: 'insights',
      title: 'Insights',
      description: 'What people actually said',
      icon: <MessageSquare className="h-6 w-6" />,
      cta: 'View Insights',
      color: 'bg-indigo-500',
      route: '/engage/insights',
    },
    {
      id: 'contacts',
      title: 'Contacts',
      description: 'Manage your contacts',
      icon: <Users className="h-6 w-6" />,
      cta: 'Manage Contacts',
      color: 'bg-green-500',
      route: '/contacts',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Engage"
        subtitle="Let's connect, engage, and win deals"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Engagement Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Users className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Total Contacts</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">{mockContacts.total}</p>
        </div>

        {/* Active Campaigns */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Send className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm font-medium text-orange-900">Active Campaigns</h3>
          </div>
          <p className="text-2xl font-bold text-orange-900">{engagementMetrics.activeCampaigns}</p>
        </div>

        {/* Open Rate */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">Open Rate</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{engagementMetrics.openRate}%</p>
        </div>

        {/* Response Rate */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-medium text-purple-900">Response Rate</h3>
          </div>
          <p className="text-2xl font-bold text-purple-900">{engagementMetrics.responseRate}%</p>
        </div>
      </div>

      {/* Persona Builder */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserCircle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Personas</h2>
              <p className="text-sm text-gray-600">Your target client profiles</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/personas/builder')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Build Persona
          </button>
        </div>

        {/* Persona Cards - showing actual personas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {/* Capital Partner */}
          <div
            className="bg-white border-2 border-red-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/personas')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">David Chen</h3>
                <p className="text-xs text-gray-500">Capital Partner</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Ares Capital</p>
            <p className="text-xs text-gray-500 line-clamp-2">
              Managing complex deal structures requires rapid legal document turnaround
            </p>
          </div>

          {/* Portfolio Manager */}
          <div
            className="bg-white border-2 border-orange-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/personas')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Sarah Martinez</h3>
                <p className="text-xs text-gray-500">Portfolio Manager</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Orion Holdings</p>
            <p className="text-xs text-gray-500 line-clamp-2">
              Overseeing multiple portfolio companies means constant legal document review
            </p>
          </div>

          {/* Investment Director */}
          <div
            className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => navigate('/personas')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <UserCircle className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Michael Thompson</h3>
                <p className="text-xs text-gray-500">Investment Director</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">Meridian Partners</p>
            <p className="text-xs text-gray-500 line-clamp-2">
              Due diligence processes require extensive legal document management
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/personas')}
          className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
        >
          View All Personas →
        </button>
      </div>

      {/* Ecosystem Summary */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ecosystem</h2>
            <p className="text-sm text-gray-600">Your business relationships</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Collaborators */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-orange-900">Collaborators</h3>
                <p className="text-xs text-orange-700">Strategic partnerships</p>
              </div>
              <p className="text-2xl font-bold text-orange-900">{mockContacts.ecosystem.Collaborator}</p>
            </div>
          </div>

          {/* Vendors */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-blue-900">Vendors</h3>
                <p className="text-xs text-blue-700">Service providers</p>
              </div>
              <p className="text-2xl font-bold text-blue-900">{mockContacts.ecosystem.Vendor}</p>
            </div>
          </div>

          {/* Partners */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-purple-900">Partners</h3>
                <p className="text-xs text-purple-700">Key relationships</p>
              </div>
              <p className="text-2xl font-bold text-purple-900">{mockContacts.ecosystem.Partner}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/setup/ecosystem')}
          className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center justify-center gap-2"
        >
          View Full Ecosystem →
        </button>
      </div>

      {/* 4-Card Action Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actionCards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(card.route)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
          >
            <div className={`${card.color} p-6 text-white rounded-t-xl`}>
              <div className="flex items-center gap-3 mb-2">
                {card.icon}
                <h3 className="text-lg font-bold">{card.title}</h3>
              </div>
              <p className="text-sm text-white/90">{card.description}</p>
            </div>
            <div className="p-6">
              <button className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors">
                {card.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
