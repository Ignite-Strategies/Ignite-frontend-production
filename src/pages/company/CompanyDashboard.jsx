import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const containerId = localStorage.getItem('containerId');
  const adminId = localStorage.getItem('adminId');
  
  // Dashboard data state
  const [dashboardData, setDashboardData] = useState({
    totalLeads: 0,
    totalCustomers: 0,
    forecastedRevenue: 0,
    financialHealth: 'Good',
    manpowerUtilization: 0,
    bdPipelineValue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (containerId) {
      loadDashboardData();
    }
  }, [containerId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('📊 Loading company dashboard data...');
      
      // For now, use hardcoded data since we don't have enough real data yet
      const hardcodedData = {
        totalLeads: 47,
        totalCustomers: 23,
        forecastedRevenue: 285000,
        financialHealth: 'Good',
        manpowerUtilization: 78,
        bdPipelineValue: 125000
      };
      
      setDashboardData(hardcodedData);
      
      // TODO: Replace with real API calls when we have more data
      // const [leadsRes, customersRes, pipelineRes] = await Promise.all([
      //   api.get(`/prospects?companyId=${containerId}`),
      //   api.get(`/customers?companyId=${containerId}`),
      //   api.get(`/bdPipeline/${containerId}`)
      // ]);
      
    } catch (error) {
      console.error('❌ Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of your business performance</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/businesspoint-law-proposal')}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
              >
                ← Back to Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* CRM Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Leads Card */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📊</div>
              <div className="text-right">
                <div className="text-3xl font-bold">{dashboardData.totalLeads}</div>
                <div className="text-blue-100 text-sm">Total Leads</div>
              </div>
            </div>
            <div className="text-blue-100 text-sm">
              Prospects in your pipeline
            </div>
          </div>

          {/* Total Customers Card */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">👥</div>
              <div className="text-right">
                <div className="text-3xl font-bold">{dashboardData.totalCustomers}</div>
                <div className="text-green-100 text-sm">Total Customers</div>
              </div>
            </div>
            <div className="text-green-100 text-sm">
              Active customer base
            </div>
          </div>

          {/* Forecasted Revenue Card */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">💰</div>
              <div className="text-right">
                <div className="text-3xl font-bold">${(dashboardData.forecastedRevenue / 1000).toFixed(0)}K</div>
                <div className="text-purple-100 text-sm">Forecasted Revenue</div>
              </div>
            </div>
            <div className="text-purple-100 text-sm">
              Expected quarterly revenue
            </div>
          </div>
        </div>

        {/* Main Pillar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {/* Goals Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🎯</div>
                <h2 className="text-xl font-bold">Goals</h2>
              </div>
              <div className="text-purple-100 text-sm">Revenue targets & progress</div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">$285K</div>
                <div className="text-gray-600 text-sm">Annual Target</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Quarterly Goal</span>
                  <span className="font-semibold">$71.3K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold text-green-600">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">On Track</span>
                  <span className="font-semibold text-green-600">Yes</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/bd/goals')}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* Financial Health Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">💚</div>
                <h2 className="text-xl font-bold">Financial Health</h2>
              </div>
              <div className="text-green-100 text-sm">Overall financial status</div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{dashboardData.financialHealth}</div>
                <div className="text-gray-600 text-sm">Current Status</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Revenue Growth</span>
                  <span className="font-semibold text-green-600">+12.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Profit Margin</span>
                  <span className="font-semibold text-green-600">24.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cash Flow</span>
                  <span className="font-semibold text-green-600">Positive</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/cost')}
                className="w-full mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* Manpower Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">👨‍💼</div>
                <h2 className="text-xl font-bold">Manpower</h2>
              </div>
              <div className="text-blue-100 text-sm">Team efficiency & capacity</div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{dashboardData.manpowerUtilization}%</div>
                <div className="text-gray-600 text-sm">Utilization Rate</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Team Members</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Productivity Score</span>
                  <span className="font-semibold text-blue-600">8.2/10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Capacity Available</span>
                  <span className="font-semibold text-green-600">22%</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/human')}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>

          {/* Business Development Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow">
            <div className="bg-gradient-to-r from-red-500 to-orange-600 p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">🚀</div>
                <h2 className="text-xl font-bold">Business Development</h2>
              </div>
              <div className="text-red-100 text-sm">Revenue growth & pipeline</div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red-600 mb-2">${(dashboardData.bdPipelineValue / 1000).toFixed(0)}K</div>
                <div className="text-gray-600 text-sm">Pipeline Value</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Deals</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Win Rate</span>
                  <span className="font-semibold text-green-600">68%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg Deal Size</span>
                  <span className="font-semibold">$10.4K</span>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/bd/goals')}
                className="w-full mt-6 bg-gradient-to-r from-red-500 to-orange-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-red-600 hover:to-orange-700 transition-colors"
              >
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/bd/pipeline')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl">📈</div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">View Pipeline</div>
                <div className="text-sm text-gray-600">Manage deals</div>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/bd/events')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl">📅</div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Events</div>
                <div className="text-sm text-gray-600">Plan outreach</div>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/bd/content')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl">📝</div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Content</div>
                <div className="text-sm text-gray-600">Create content</div>
              </div>
            </button>
            
            <button
              onClick={() => navigate('/bd/ads')}
              className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="text-2xl">🎯</div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Google Ads</div>
                <div className="text-sm text-gray-600">Manage campaigns</div>
              </div>
            </button>
          </div>
        </div>

        {/* Note about data */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <div className="text-blue-500 text-xl">ℹ️</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Data Status</h4>
              <p className="text-blue-800 text-sm">
                Dashboard shows sample data. Real metrics will appear as you add customers, prospects, and pipeline entries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
