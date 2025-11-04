import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Plus, Send, Users, FileText, List, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function OutreachHome() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Load campaigns from API
    // const fetchCampaigns = async () => {
    //   setLoading(true);
    //   const response = await api.get('/campaigns');
    //   setCampaigns(response.data);
    //   setLoading(false);
    // };
    // fetchCampaigns();
  }, []);

  const metrics = {
    totalCampaigns: campaigns.length,
    activeCampaigns: campaigns.filter(c => c.status === 'active' || c.status === 'sent').length,
    totalRecipients: campaigns.reduce((sum, c) => sum + (c.contactList?.totalContacts || 0), 0),
    responseRate: 18.5,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Outreach Dashboard"
        subtitle="Send campaigns and personal outreach"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Campaign Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <button
          onClick={() => navigate('/outreach')}
          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 hover:border-blue-400 hover:shadow-md transition text-left"
        >
          <div className="flex items-center mb-2">
            <Mail className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{metrics.totalCampaigns}</p>
              <p className="text-sm text-blue-700">Total Campaigns</p>
            </div>
          </div>
        </button>
        <button
          onClick={() => navigate('/outreach')}
          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:border-green-400 hover:shadow-md transition text-left"
        >
          <div className="flex items-center mb-2">
            <Send className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">{metrics.activeCampaigns}</p>
              <p className="text-sm text-green-700">Active Campaigns</p>
            </div>
          </div>
        </button>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-2">
            <Users className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-purple-900">{metrics.totalRecipients}</p>
              <p className="text-sm text-purple-700">Total Recipients</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center mb-2">
            <TrendingUp className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-orange-900">{metrics.responseRate}%</p>
              <p className="text-sm text-orange-700">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Set Up Your Engagement */}
      <div 
        className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 transition cursor-pointer mb-8"
        onClick={() => navigate('/outreach/campaign-creator')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-indigo-500 text-white rounded-xl flex items-center justify-center mr-4">
              <Plus className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Set Up Your Engagement</h2>
              <p className="text-gray-600">Create campaigns and outreach strategies</p>
            </div>
          </div>
          <span className="inline-flex items-center text-indigo-600 font-semibold text-lg">
            Get Started →
          </span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Contact Lists */}
          <button
            onClick={() => navigate('/contact-list-manager')}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-lg border-2 border-indigo-200 hover:border-indigo-400 transition text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center mr-3">
                <List className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Contact Lists</h3>
                <p className="text-sm text-gray-600">Manage lists</p>
              </div>
            </div>
            <p className="text-sm text-indigo-700">Create and manage contact segments</p>
          </button>

          {/* Templates */}
          <button
            onClick={() => navigate('/outreach/templates')}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-lg border-2 border-purple-200 hover:border-purple-400 transition text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
                <p className="text-sm text-gray-600">Email templates</p>
              </div>
            </div>
            <p className="text-sm text-purple-700">Create reusable email templates</p>
          </button>

          {/* Analytics */}
          <button
            onClick={() => navigate('/outreach/analytics')}
            className="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center mr-3">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                <p className="text-sm text-gray-600">Email performance</p>
              </div>
            </div>
            <p className="text-sm text-orange-700">Track opens, clicks, and engagement</p>
          </button>

          {/* Individual Email */}
          <button
            onClick={() => navigate('/outreach/individual-email')}
            className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-lg border-2 border-emerald-200 hover:border-emerald-400 transition text-left"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-lg flex items-center justify-center mr-3">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Individual Email</h3>
                <p className="text-sm text-gray-600">Send 1:1 email</p>
              </div>
            </div>
            <p className="text-sm text-emerald-700">Send personal emails manually</p>
          </button>
        </div>
      </div>

      {/* Draft Campaigns */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Draft Campaigns</h3>
        {campaigns.filter(c => c.status === 'draft').length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No draft campaigns</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.filter(c => c.status === 'draft').map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => {
                  navigate('/outreach/campaign-creator', { 
                    state: { campaignId: campaign.id } 
                  });
                }}
                className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
                    {campaign.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {campaign.contactList?.name || 'No list'} ({campaign.contactList?.totalContacts || 0} contacts)
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    {campaign.subject}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sent Campaigns */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Sent Campaigns</h3>
        {campaigns.filter(c => c.status === 'sent').length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No sent campaigns yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.filter(c => c.status === 'sent').map((campaign) => (
              <div
                key={campaign.id}
                onClick={() => {
                  navigate('/outreach/campaign-dashboard', { 
                    state: { campaignId: campaign.id } 
                  });
                }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">{campaign.name}</h4>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                    {campaign.status}
                  </span>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {campaign.contactList?.name || 'No list'} ({campaign.contactList?.totalContacts || 0} contacts)
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Sent: {campaign.sentDate || 'N/A'}
                  </div>
                </div>
                <div className="mt-4 text-xs text-gray-500">
                  Click to view results & analytics
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

