import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AdsHub() {
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(false);
  const [accountData, setAccountData] = useState(null);

  useEffect(() => {
    // Check if Google Ads is connected
    const googleAdsAccountId = localStorage.getItem('googleAdsAccountId');
    setIsConnected(!!googleAdsAccountId);
    
    // Load demo account data if not connected
    if (!googleAdsAccountId) {
      setAccountData({
        name: "Ignite BD Campaigns",
        customerId: "123-456-7890",
        isTestAccount: true,
        campaigns: 0,
        totalSpend: 0
      });
    }
  }, []);

  const handleConnectGoogleAds = () => {
    // TODO: Implement Google Ads OAuth flow
    // For now, just set demo mode
    localStorage.setItem('googleAdsAccountId', 'demo-account');
    setIsConnected(true);
    setAccountData({
      name: "Ignite BD Campaigns",
      customerId: "123-456-7890",
      isTestAccount: false,
      campaigns: 8,
      totalSpend: 2400
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Ads Management"
        subtitle="Create and manage your advertising campaigns"
        backTo="/growth-dashboard"
        backLabel="← Back to Growth Dashboard"
      />

      {/* Connection Status */}
      {!isConnected && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-4xl">🔗</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Connect Your Google Ads Account</h3>
              <p className="text-gray-700 mb-4">
                Connect your Google Ads account to manage campaigns, view performance metrics, and create new ads.
              </p>
              <button
                onClick={handleConnectGoogleAds}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Connect Google Ads
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Account Info */}
      {isConnected && accountData && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-5xl">🚀</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{accountData.name}</h2>
                <p className="text-gray-600">Customer ID: {accountData.customerId}</p>
                {accountData.isTestAccount && (
                  <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-semibold">
                    Test Account
                  </span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                ${accountData.totalSpend?.toLocaleString() || '0'}
              </div>
              <div className="text-sm text-gray-500">Total Spend</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Create Campaign */}
        <button
          onClick={() => navigate('/ads/create')}
          className="group bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all text-left hover:scale-[1.02]"
        >
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-3xl font-bold mb-3">Create Campaign</h3>
          <p className="text-white/90 text-lg mb-4">
            Build a new campaign with AI-powered targeting and persona-based strategy
          </p>
          <div className="flex items-center gap-2 text-white font-semibold">
            <span>Get Started</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </button>

        {/* View Campaigns */}
        <button
          onClick={() => navigate('/ads/dashboard')}
          className="group bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-all text-left hover:scale-[1.02]"
        >
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-3xl font-bold mb-3">View Campaigns</h3>
          <p className="text-white/90 text-lg mb-4">
            See your active campaigns, performance metrics, and manage existing ads
          </p>
          <div className="flex items-center gap-2 text-white font-semibold">
            <span>View All</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </div>
        </button>
      </div>

      {/* Strategy Tools */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategy Tools</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate('/persona')}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-gray-900 mb-2">Persona Development</h3>
            <p className="text-sm text-gray-600">Define your target audience - personas automatically connect to Google Ads audiences</p>
          </button>

          <button
            onClick={() => navigate('/ads/dashboard')}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 mb-2">Campaign Performance</h3>
            <p className="text-sm text-gray-600">View your ad performance, CTR, conversions, and spend metrics</p>
          </button>

          <button
            onClick={() => navigate('/ads/create')}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="text-3xl mb-3">✏️</div>
            <h3 className="font-bold text-gray-900 mb-2">Ad Copy Builder</h3>
            <p className="text-sm text-gray-600">Create ad copy with live preview showing exactly how it appears in search</p>
          </button>
        </div>
      </div>
    </div>
  );
}

