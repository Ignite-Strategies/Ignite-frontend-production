import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function Ads() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Dummy Google Ads account data
  const accountData = {
    name: "Ignite BD Campaigns",
    customerId: "123-456-7890",
    isTestAccount: false,
    campaigns: 8,
    adGroups: 24,
    keywords: 156,
    monthlySpend: 2400,
    leads: 47,
    costPerLead: 51
  };

  // Campaign data
  const campaigns = [
    {
      id: 1,
      name: "BD Services - Search",
      status: "Active",
      budget: 500,
      spent: 320,
      impressions: 12500,
      clicks: 245,
      ctr: 1.96,
      cpc: 1.31,
      conversions: 8,
      costPerConversion: 40
    },
    {
      id: 2,
      name: "Business Development - Display",
      status: "Active", 
      budget: 300,
      spent: 180,
      impressions: 45000,
      clicks: 180,
      ctr: 0.40,
      cpc: 1.00,
      conversions: 5,
      costPerConversion: 36
    },
    {
      id: 3,
      name: "Growth Consulting - LinkedIn",
      status: "Paused",
      budget: 200,
      spent: 95,
      impressions: 8500,
      clicks: 95,
      ctr: 1.12,
      cpc: 1.00,
      conversions: 3,
      costPerConversion: 32
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'campaigns', label: 'Campaigns', icon: '📊' },
    { id: 'keywords', label: 'Keywords', icon: '🔍' },
    { id: 'ads', label: 'Ads', icon: '📝' },
    { id: 'audiences', label: 'Audiences', icon: '👥' },
    { id: 'tools', label: 'Tools', icon: '🛠️' }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value) => {
    return `${value.toFixed(2)}%`;
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-900">{accountData.campaigns}</div>
          <div className="text-sm text-blue-600">Active Campaigns</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-900">{formatCurrency(accountData.monthlySpend)}</div>
          <div className="text-sm text-green-600">Monthly Spend</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-900">{accountData.leads}</div>
          <div className="text-sm text-purple-600">Leads Generated</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-orange-900">{formatCurrency(accountData.costPerLead)}</div>
          <div className="text-sm text-orange-600">Cost Per Lead</div>
        </div>
      </div>

      {/* Recent Campaigns */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Campaigns</h3>
        <div className="space-y-4">
          {campaigns.slice(0, 3).map((campaign) => (
            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <div className="text-gray-600">Spend</div>
                  <div className="font-semibold">{formatCurrency(campaign.spent)} / {formatCurrency(campaign.budget)}</div>
                </div>
                <div>
                  <div className="text-gray-600">CTR</div>
                  <div className="font-semibold">{formatPercent(campaign.ctr)}</div>
                </div>
                <div>
                  <div className="text-gray-600">CPC</div>
                  <div className="font-semibold">{formatCurrency(campaign.cpc)}</div>
                </div>
                <div>
                  <div className="text-gray-600">Conversions</div>
                  <div className="font-semibold">{campaign.conversions}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Campaign Management</h3>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Create Campaign
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CTR</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPC</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {campaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(campaign.budget)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(campaign.spent)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatPercent(campaign.ctr)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(campaign.cpc)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{campaign.conversions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-red-600 hover:text-red-900 mr-3">Edit</button>
                    <button className="text-gray-600 hover:text-gray-900">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderKeywords = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Keyword Management</h3>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Add Keywords
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Top Performing Keywords</h4>
          <div className="space-y-3">
            {[
              { keyword: "business development services", cpc: 2.45, conversions: 12 },
              { keyword: "growth consulting", cpc: 3.20, conversions: 8 },
              { keyword: "startup advisor", cpc: 1.85, conversions: 15 },
              { keyword: "scaling business", cpc: 2.10, conversions: 9 }
            ].map((item, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{item.keyword}</div>
                  <div className="text-sm text-gray-600">{item.conversions} conversions</div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.cpc)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Keyword Suggestions</h4>
          <div className="space-y-3">
            {[
              "BD strategy consultant",
              "business growth expert", 
              "startup scaling advisor",
              "revenue growth specialist"
            ].map((keyword, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-gray-900">{keyword}</div>
                <button className="text-sm text-red-600 hover:text-red-800">Add</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Google Ads Tools</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-3xl mb-3">🎯</div>
          <h4 className="font-semibold text-gray-900 mb-2">Keyword Planner</h4>
          <p className="text-sm text-gray-600 mb-4">Find the right keywords for your BD campaigns</p>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Launch Tool
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-3xl mb-3">📊</div>
          <h4 className="font-semibold text-gray-900 mb-2">Performance Grader</h4>
          <p className="text-sm text-gray-600 mb-4">Analyze your campaign performance</p>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Launch Tool
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-3xl mb-3">💰</div>
          <h4 className="font-semibold text-gray-900 mb-2">Budget Optimizer</h4>
          <p className="text-sm text-gray-600 mb-4">Optimize your ad spend allocation</p>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Launch Tool
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-4xl">🚀</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{accountData.name}</h1>
                  <p className="text-gray-600">Google Ads Campaign Management</p>
                  <p className="text-sm text-gray-500">Customer ID: {accountData.customerId}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{formatCurrency(accountData.monthlySpend)}</div>
                <div className="text-sm text-gray-500">Monthly Spend</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {selectedTab === 'overview' && renderOverview()}
            {selectedTab === 'campaigns' && renderCampaigns()}
            {selectedTab === 'keywords' && renderKeywords()}
            {selectedTab === 'tools' && renderTools()}
            {selectedTab === 'ads' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ad Management</h3>
                <p className="text-gray-600">Create and manage your Google Ads</p>
              </div>
            )}
            {selectedTab === 'audiences' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Audience Management</h3>
                <p className="text-gray-600">Target the right people for your BD campaigns</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}