import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Plus, Send, Users, FileText, Trash2, Edit2, Eye, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import CampaignAnalytics from './CampaignAnalytics';

export default function EmailCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'draft', 'sent'
  const [activeTab, setActiveTab] = useState('campaigns'); // 'campaigns' or 'analytics'

  // Mock campaigns data
  useEffect(() => {
    setCampaigns([
      {
        id: 1,
        name: 'Q1 Capital Partner Outreach',
        status: 'sent',
        sentDate: '2025-01-15',
        contactList: { name: 'Capital Partners', totalContacts: 12 },
        subject: 'Streamlining Legal Operations for Capital Partners',
        openRate: 75.0,
        clickRate: 18.5,
        responseRate: 18.5,
      },
      {
        id: 2,
        name: 'Portfolio Manager Newsletter',
        status: 'draft',
        sentDate: null,
        contactList: { name: 'Portfolio Managers', totalContacts: 8 },
        subject: 'Monthly Legal Insights for Portfolio Managers',
      },
      {
        id: 3,
        name: 'NDA Services Follow-up',
        status: 'sent',
        sentDate: '2025-01-20',
        contactList: { name: 'Active Clients', totalContacts: 24 },
        subject: 'Efficient NDA Management for Your Portfolio Companies',
        openRate: 68.5,
        clickRate: 15.2,
        responseRate: 12.8,
      },
    ]);
  }, []);

  const filteredCampaigns = campaigns.filter(campaign => {
    if (filter === 'all') return true;
    return campaign.status === filter;
  });

  const draftCount = campaigns.filter(c => c.status === 'draft').length;
  const sentCount = campaigns.filter(c => c.status === 'sent').length;

  const handleDelete = (campaignId, campaignName) => {
    if (!window.confirm(`Are you sure you want to delete "${campaignName}"?`)) {
      return;
    }
    setCampaigns(campaigns.filter(c => c.id !== campaignId));
  };

  const handleViewCampaign = (campaign) => {
    if (campaign.status === 'draft') {
      navigate('/outreach/campaign-creator', {
        state: { campaignId: campaign.id }
      });
    } else {
      // View results/analytics for sent campaigns
      navigate('/outreach/analytics', {
        state: { campaignId: campaign.id }
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Email Campaigns"
        subtitle="Manage and track your email outreach campaigns"
        backTo="/outreach"
        backLabel="Back to Outreach"
        actions={
          <button
            onClick={() => navigate('/outreach/campaign-creator')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('campaigns')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'campaigns'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Mail className="h-4 w-4 inline mr-2" />
          Campaigns
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
            activeTab === 'analytics'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <BarChart3 className="h-4 w-4 inline mr-2" />
          Campaign Analytics
        </button>
      </div>

      {/* Analytics Tab Content */}
      {activeTab === 'analytics' && (
        <CampaignAnalytics />
      )}

      {/* Campaigns Tab Content */}
      {activeTab === 'campaigns' && (
        <>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">Total Campaigns</p>
              <p className="text-3xl font-bold text-blue-900">{campaigns.length}</p>
            </div>
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-900 mb-1">Drafts</p>
              <p className="text-3xl font-bold text-yellow-900">{draftCount}</p>
            </div>
            <Edit2 className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-900 mb-1">Sent</p>
              <p className="text-3xl font-bold text-green-900">{sentCount}</p>
            </div>
            <Send className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-t-xl shadow-md p-4 border-b border-gray-200 mb-0">
        <div className="flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'all'
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All ({campaigns.length})
          </button>
          <button
            onClick={() => setFilter('draft')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'draft'
                ? 'bg-yellow-100 text-yellow-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Drafts ({draftCount})
          </button>
          <button
            onClick={() => setFilter('sent')}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === 'sent'
                ? 'bg-green-100 text-green-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Sent ({sentCount})
          </button>
        </div>
      </div>

      {/* Campaigns List */}
      <div className="bg-white rounded-b-xl shadow-md">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center">
            <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filter === 'all' ? 'No campaigns yet' : `No ${filter} campaigns`}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === 'all'
                ? 'Create your first campaign to get started'
                : `You don't have any ${filter} campaigns`}
            </p>
            {filter === 'all' && (
              <button
                onClick={() => navigate('/outreach/campaign-creator')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Campaign
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-6 hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {campaign.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-700'
                          : campaign.status === 'sent'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {campaign.status === 'draft' ? '📝 Draft' : '✅ Sent'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Contact List:</span>
                        <p className="text-gray-600">
                          {campaign.contactList?.name || 'No list assigned'} ({campaign.contactList?.totalContacts || 0} contacts)
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Subject:</span>
                        <p className="text-gray-600">
                          {campaign.subject || 'No subject'}
                        </p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">
                          {campaign.status === 'sent' ? 'Sent:' : 'Created:'}
                        </span>
                        <p className="text-gray-600">
                          {campaign.sentDate 
                            ? new Date(campaign.sentDate).toLocaleDateString()
                            : new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Performance Metrics for Sent Campaigns */}
                    {campaign.status === 'sent' && campaign.openRate && (
                      <div className="flex gap-6 text-sm mt-3">
                        <div>
                          <span className="text-gray-500">Open Rate:</span>
                          <span className="ml-2 font-medium text-blue-600">{campaign.openRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Click Rate:</span>
                          <span className="ml-2 font-medium text-purple-600">{campaign.clickRate}%</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Response Rate:</span>
                          <span className="ml-2 font-medium text-green-600">{campaign.responseRate}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 ml-6">
                    {campaign.status === 'draft' ? (
                      <button
                        onClick={() => handleViewCampaign(campaign)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={() => handleViewCampaign(campaign)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        View Results
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDelete(campaign.id, campaign.name)}
                      className="px-4 py-2 border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition font-medium flex items-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
        </>
      )}
    </div>
  );
}
