import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useDynamics } from '../../hooks/useDynamics';

export default function Companies() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useLocalStorage('companies', []);
  const [contacts] = useLocalStorage('contacts', []);
  const { syncAccounts, loading } = useDynamics();

  const handleSync = async () => {
    const result = await syncAccounts();
    if (result.success) {
      const updated = JSON.parse(localStorage.getItem('companies') || '[]');
      setCompanies(updated);
      alert(`Companies synced from Dynamics 365 — ${result.count} new entries.`);
    }
  };

  // Count contacts per company
  const getContactCount = (companyName) => {
    return contacts.filter(c => c.company === companyName).length;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/bd-central"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Business Development
      </Link>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Companies</h1>
          <p className="text-gray-600">Companies synced from Dynamics 365 CRM</p>
        </div>
        <button
          onClick={handleSync}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Sync from Dynamics 365
        </button>
      </div>

      {/* Companies Grid */}
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => {
            const contactCount = getContactCount(company.name);
            const openOpportunities = company.opportunities?.length || 0;
            
            return (
              <div key={company.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-sm text-gray-500">{company.industry}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      Contacts
                    </span>
                    <span className="font-medium text-gray-900">{contactCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      Opportunities
                    </span>
                    <span className="font-medium text-gray-900">{openOpportunities}</span>
                  </div>
                  {company.location && (
                    <div className="text-sm text-gray-500">
                      📍 {company.city}, {company.state}
                    </div>
                  )}
                  {company.employees && (
                    <div className="text-sm text-gray-500">
                      👥 {company.employees.toLocaleString()} employees
                    </div>
                  )}
                </div>

                {/* Opportunities List */}
                {openOpportunities > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs font-medium text-gray-500 mb-2">Open Opportunities:</p>
                    <div className="space-y-1">
                      {company.opportunities?.slice(0, 2).map((opp) => (
                        <div key={opp.id} className="text-xs text-gray-600">
                          • {opp.name} ({opp.stage}) - ${opp.value?.toLocaleString()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => navigate(`/companies/${company.id}`)}
                  className="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <Building2 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No companies yet</p>
          <p className="text-sm text-gray-400 mb-6">Sync from Dynamics 365 to get started</p>
          <button
            onClick={handleSync}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium"
          >
            {loading ? 'Syncing...' : 'Sync from Dynamics 365'}
          </button>
        </div>
      )}
    </div>
  );
}

