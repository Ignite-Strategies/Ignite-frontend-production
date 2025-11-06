import { useNavigate } from 'react-router-dom';
import { Upload, List, Building2, Filter, Plus, Users } from 'lucide-react';

export default function ContactsHub() {
  const navigate = useNavigate();

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
            👥 Contacts Hub
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your contacts, companies, and pipelines
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* Upload Individual Contact */}
          <button
            onClick={() => navigate('/contacts/upload')}
            className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 text-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">➕ Upload Individual</h3>
                <p className="text-sm text-gray-600">Add single contact</p>
              </div>
            </div>
            <p className="text-sm text-blue-700">Manually enter or CSV upload</p>
          </button>

          {/* Create List */}
          <button
            onClick={() => navigate('/contacts/list-builder')}
            className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <List className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">📋 Create List</h3>
                <p className="text-sm text-gray-600">Segment contacts</p>
              </div>
            </div>
            <p className="text-sm text-purple-700">Build targeted contact lists</p>
          </button>

          {/* Add Business */}
          <button
            onClick={() => navigate('/contacts/companies')}
            className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border-2 border-indigo-200 hover:border-indigo-400 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-500 text-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">🏢 Add Business</h3>
                <p className="text-sm text-gray-600">Manage companies</p>
              </div>
            </div>
            <p className="text-sm text-indigo-700">Add prospect/client companies</p>
          </button>

          {/* See Deal Pipeline */}
          <button
            onClick={() => navigate('/contacts/deal-pipelines')}
            className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition text-left group"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                <Filter className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">📊 See Deal Pipeline</h3>
                <p className="text-sm text-gray-600">Track deals</p>
              </div>
            </div>
            <p className="text-sm text-green-700">View pipeline stages</p>
          </button>
        </div>

        {/* Additional Options */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">More Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* View All Contacts */}
            <button
              onClick={() => navigate('/contacts/list')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition text-left flex items-center"
            >
              <Users className="h-5 w-5 text-blue-600 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900">👥 View All Contacts</h4>
                <p className="text-sm text-gray-600">See all contacts</p>
              </div>
            </button>

            {/* Manage Lists */}
            <button
              onClick={() => navigate('/contacts/list-manager')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition text-left flex items-center"
            >
              <List className="h-5 w-5 text-purple-600 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900">📋 Manage Lists</h4>
                <p className="text-sm text-gray-600">View and edit lists</p>
              </div>
            </button>

            {/* Manual Entry */}
            <button
              onClick={() => navigate('/contacts/manual')}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition text-left flex items-center"
            >
              <Plus className="h-5 w-5 text-emerald-600 mr-3" />
              <div>
                <h4 className="font-semibold text-gray-900">✏️ Manual Entry</h4>
                <p className="text-sm text-gray-600">Enter contact details</p>
              </div>
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">💡 Contact Management</h4>
              <p className="text-sm text-blue-800">
                Upload contacts, create lists, add companies, and track your deal pipeline. All contacts are scoped to your company (CompanyHQId) for secure multi-tenant data isolation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
