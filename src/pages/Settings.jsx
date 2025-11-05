import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

export default function Settings() {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState({
    companyName: '',
    industry: '',
    website: '',
    foundedYear: ''
  });

  const handleSave = () => {
    localStorage.setItem('companyData', JSON.stringify(companyData));
    alert('Company settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-gray-600">Manage your company setup and assessments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Company Setup Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Company Setup</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  value={companyData.companyName}
                  onChange={(e) => setCompanyData({...companyData, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Acme Corp"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                <input
                  type="text"
                  value={companyData.industry}
                  onChange={(e) => setCompanyData({...companyData, industry: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Technology, Legal, Healthcare"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={companyData.website}
                  onChange={(e) => setCompanyData({...companyData, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., https://acme.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Founded Year</label>
                <input
                  type="number"
                  value={companyData.foundedYear}
                  onChange={(e) => setCompanyData({...companyData, foundedYear: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2020"
                />
              </div>
              
              <button
                onClick={handleSave}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Save Company Settings
              </button>
            </div>
          </div>

          {/* Growth Assessment Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">📊</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Growth Assessment</h2>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-4">
                Complete our comprehensive growth assessment to analyze your revenue, human capital, and target acquisition needs.
              </p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-green-900 mb-2">What you'll analyze:</h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Revenue flow and unit economics</li>
                  <li>• Team capacity and utilization</li>
                  <li>• Target acquisition requirements</li>
                  <li>• Growth gap analysis</li>
                </ul>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/assessment')}
              className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Start Growth Assessment →
            </button>
          </div>

          {/* BD Baseline Assessment Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">🎯</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">BD Baseline Assessment</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 mb-4">
                  Establish your current BD baseline to understand where you're starting from and set realistic growth targets.
                </p>
                
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <h3 className="font-semibold text-red-900 mb-2">Current state analysis:</h3>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Social media following and engagement</li>
                    <li>• Email list size and quality</li>
                    <li>• Website traffic and conversion</li>
                    <li>• Active leads and pipeline</li>
                    <li>• Current BD spend and channels</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <button
                  onClick={() => navigate('/bd-baseline-assessment')}
                  className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                >
                  Start BD Baseline →
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

