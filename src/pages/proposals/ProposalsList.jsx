import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function ProposalsList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock proposals data - in Phase 2, this will come from API
  const proposals = [
    {
      id: 'businesspoint-law',
      name: 'BusinessPoint Law',
      company: 'BusinessPoint Law Firm',
      status: 'active',
      date: '2024-01-15',
      total: 50000,
      description: 'Comprehensive 12-month business development roadmap for debt-to-liquidity conversion services.'
    },
    // More proposals can be added here
  ];

  const filteredProposals = proposals.filter(proposal =>
    proposal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    proposal.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.draft}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Proposals</h1>
            <p className="text-gray-600">View and manage your business proposals</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/proposals/service-library')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              Service Library
            </button>
            <button
              onClick={() => navigate('/proposals/create')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              + Create Proposal
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search proposals by name, company, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Proposals Grid */}
        {filteredProposals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg mb-2">No proposals found</p>
            <p className="text-sm text-gray-400">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first proposal to get started'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProposals.map((proposal) => (
              <div
                key={proposal.id}
                onClick={() => navigate(`/proposals/${proposal.id}`)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-red-300 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-red-600 transition-colors">
                      {proposal.name}
                    </h3>
                    <p className="text-sm text-gray-500">{proposal.company}</p>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {proposal.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Total Value</p>
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(proposal.total)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">Date</p>
                    <p className="text-sm font-medium text-gray-700">
                      {new Date(proposal.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>

                <button className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors">
                  View Proposal →
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

