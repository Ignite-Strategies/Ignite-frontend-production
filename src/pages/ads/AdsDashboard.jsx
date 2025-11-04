import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, ExternalLink, Users } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AdsDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({
    totalCampaigns: 0,
    activeSpend: "0.00",
    ctr: "0%",
    conversions: 0,
    avgCpc: "$0.00"
  });
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);

  // Demo campaign data - focused on Google Ads
  const demoCampaigns = [
    {
      id: 1,
      name: "BD Services - Search Campaign",
      status: "Active",
      budget: 500,
      spent: 320,
      impressions: 12500,
      clicks: 245,
      ctr: 1.96,
      cpc: 1.31,
      conversions: 8,
      costPerConversion: 40,
      landingPage: "https://ignitestrategies.co/growth-dashboard",
      headline1: "Scale Your Business Development",
      headline2: "Expert BD Strategy & Growth",
      headline3: "Proven Revenue Growth Methods",
      description1: "Transform your business development process with data-driven strategies and expert guidance.",
      description2: "Join 500+ companies using our proven BD framework to accelerate growth.",
      personaId: "persona-1", // Connected to persona
      personaName: "BD Decision Makers"
    },
    {
      id: 2,
      name: "Growth Consulting - Display Campaign",
      status: "Active",
      budget: 300,
      spent: 180,
      impressions: 45000,
      clicks: 180,
      ctr: 0.40,
      cpc: 1.00,
      conversions: 5,
      costPerConversion: 36,
      landingPage: "https://ignitestrategies.co/services",
      headline1: "Transform Your BD Process",
      headline2: "Proven Methods for Revenue Growth",
      headline3: "Expert Growth Consulting",
      description1: "Get expert guidance on scaling your business development and revenue growth.",
      description2: "Data-driven strategies that work for companies like yours.",
      personaId: "persona-2",
      personaName: "Growth-Focused CEOs"
    }
  ];

  useEffect(() => {
    // Load demo data
    setSummary({
      totalCampaigns: demoCampaigns.length,
      activeSpend: "500.00",
      ctr: "1.18%",
      conversions: 13,
      avgCpc: "$1.16"
    });
    setCampaigns(demoCampaigns);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'Draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Ads Dashboard"
        subtitle="Manage your advertising campaigns"
        backTo="/ads"
        backLabel="← Back to Ads Hub"
        actions={
          <button
            onClick={() => navigate('/ads/create')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow-lg flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Create Campaign
          </button>
        }
      />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow border-2 border-transparent hover:border-blue-500 transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Total Campaigns</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              📊
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.totalCampaigns}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-2 border-transparent hover:border-green-500 transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Active Spend</h3>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              💰
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">${summary.activeSpend}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-2 border-transparent hover:border-purple-500 transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Click-Through Rate</h3>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              📈
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.ctr}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-2 border-transparent hover:border-indigo-500 transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Conversions</h3>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              ✅
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.conversions}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border-2 border-transparent hover:border-orange-500 transition">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-600">Avg CPC</h3>
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              💵
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{summary.avgCpc}</p>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Campaigns</h2>
        </div>

        {campaigns.length === 0 ? (
          <div className="p-12 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No campaigns yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating your first ad campaign.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate('/ads/create')}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Campaign
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impressions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Spend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <tr 
                    key={campaign.id} 
                    className="hover:bg-gray-50 cursor-pointer transition"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-xs text-gray-500 truncate max-w-xs">{campaign.landingPage}</div>
                      {campaign.personaName && (
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="h-3 w-3 text-blue-500" />
                          <span className="text-xs text-blue-600">{campaign.personaName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.budget.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.impressions.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {campaign.clicks.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${campaign.spent.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/ads/campaign/${campaign.id}`);
                        }}
                        className="text-blue-600 hover:text-blue-900 mr-3 flex items-center gap-1"
                      >
                        <Eye className="h-4 w-4" />
                        View Ad Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

