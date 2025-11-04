import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, FileCheck, Plus, TrendingUp, CheckCircle, Clock, DollarSign } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function CloseDeals() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('proposals'); // 'proposals' or 'contracts'

  // Mock data - in Phase 2, this will come from API
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
    {
      id: 'acme-ventures',
      name: 'Acme Ventures',
      company: 'Acme Ventures LLC',
      status: 'draft',
      date: '2024-01-20',
      total: 75000,
      description: 'Strategic partnership development and deal execution support.'
    },
  ];

  const contracts = [
    {
      id: 'strategic-investments',
      name: 'Strategic Investments LLC',
      company: 'Strategic Investments LLC',
      status: 'negotiation',
      date: '2024-01-18',
      total: 85000,
      description: 'Legal services contract for portfolio company support.',
      stage: 'contract-negotiations'
    },
    {
      id: 'premier-capital',
      name: 'Premier Capital',
      company: 'Premier Capital',
      status: 'signed',
      date: '2024-01-10',
      total: 95000,
      description: '12-month retainer agreement for business development services.',
      stage: 'contract-signed'
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-blue-100 text-blue-700 border-blue-200',
      draft: 'bg-gray-100 text-gray-700 border-gray-200',
      approved: 'bg-green-100 text-green-700 border-green-200',
      negotiation: 'bg-orange-100 text-orange-700 border-orange-200',
      signed: 'bg-green-100 text-green-700 border-green-200',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status] || styles.draft}`}>
        {status === 'signed' ? 'Contract Signed' : status === 'negotiation' ? 'In Negotiation' : status}
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

  // Calculate metrics
  const metrics = {
    totalProposals: proposals.length,
    activeProposals: proposals.filter(p => p.status === 'active').length,
    totalContracts: contracts.length,
    contractsInNegotiation: contracts.filter(c => c.status === 'negotiation').length,
    contractsSigned: contracts.filter(c => c.status === 'signed').length,
    totalValue: [...proposals, ...contracts].reduce((sum, item) => sum + item.total, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Close Deals"
        subtitle="Manage proposals and contracts to close more deals"
        backTo="/growth-dashboard"
        backLabel="Back to Dashboard"
      />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Active Proposals</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">{metrics.activeProposals}</p>
          <p className="text-xs text-blue-700 mt-1">of {metrics.totalProposals} total</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5 text-orange-600" />
            <h3 className="text-sm font-medium text-orange-900">In Negotiation</h3>
          </div>
          <p className="text-2xl font-bold text-orange-900">{metrics.contractsInNegotiation}</p>
          <p className="text-xs text-orange-700 mt-1">contracts pending</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">Signed Contracts</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{metrics.contractsSigned}</p>
          <p className="text-xs text-green-700 mt-1">deals closed</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-purple-600" />
            <h3 className="text-sm font-medium text-purple-900">Total Pipeline Value</h3>
          </div>
          <p className="text-2xl font-bold text-purple-900">{formatCurrency(metrics.totalValue)}</p>
          <p className="text-xs text-purple-700 mt-1">across all deals</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('proposals')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'proposals'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileText className="h-4 w-4 inline mr-2" />
              Proposals ({metrics.totalProposals})
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-4 py-2 font-medium text-sm transition-colors ${
                activeTab === 'contracts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <FileCheck className="h-4 w-4 inline mr-2" />
              Contracts ({metrics.totalContracts})
            </button>
          </div>
          <button
            onClick={() => navigate('/proposals')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            {activeTab === 'proposals' ? 'New Proposal' : 'New Contract'}
          </button>
        </div>

        {/* Proposals Tab Content */}
        {activeTab === 'proposals' && (
          <div className="space-y-4">
            {proposals.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No proposals yet</p>
                <p className="text-sm text-gray-400 mb-6">Create your first proposal to get started</p>
                <button
                  onClick={() => navigate('/proposals')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                >
                  Create Proposal
                </button>
              </div>
            ) : (
              proposals.map((proposal) => (
                <div
                  key={proposal.id}
                  onClick={() => navigate(`/proposals/${proposal.id}`)}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{proposal.name}</h3>
                        {getStatusBadge(proposal.status)}
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{proposal.company}</p>
                      <p className="text-sm text-gray-600">{proposal.description}</p>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(proposal.total)}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(proposal.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Contracts Tab Content */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            {contracts.length === 0 ? (
              <div className="text-center py-12">
                <FileCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">No contracts yet</p>
                <p className="text-sm text-gray-400 mb-6">Contracts will appear here as proposals move to negotiation</p>
              </div>
            ) : (
              contracts.map((contract) => (
                <div
                  key={contract.id}
                  onClick={() => navigate(`/proposals/${contract.id}`)}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{contract.name}</h3>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{contract.company}</p>
                      <p className="text-sm text-gray-600">{contract.description}</p>
                      {contract.stage && (
                        <div className="mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            Stage: {contract.stage === 'contract-negotiations' ? 'Negotiations' : 'Signed'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-2xl font-bold text-gray-900">{formatCurrency(contract.total)}</p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(contract.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => navigate('/proposals')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Create Proposal</h3>
              <p className="text-sm text-gray-600">Start a new proposal</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate('/bdpipeline')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">View Pipeline</h3>
              <p className="text-sm text-gray-600">Track all deals</p>
            </div>
          </div>
        </div>

        <div
          onClick={() => navigate('/outreach/analytics')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Deal Analytics</h3>
              <p className="text-sm text-gray-600">Win rates & metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

