import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function BDPipeline() {
  const navigate = useNavigate();
  
  // Pipeline stages
  const dealStages = [
    { key: 'prospecting', label: 'Prospecting', color: 'bg-gray-100' },
    { key: 'qualification', label: 'Qualification', color: 'bg-blue-100' },
    { key: 'proposal', label: 'Proposal', color: 'bg-yellow-100' },
    { key: 'negotiation', label: 'Negotiation', color: 'bg-orange-100' },
    { key: 'closed-won', label: 'Closed Won', color: 'bg-green-100' },
    { key: 'closed-lost', label: 'Closed Lost', color: 'bg-red-100' }
  ];

  // Sample deals data with contact types
  const [dealsData] = useState({
    'prospecting': [
      { id: 1, company: 'TechCorp Inc', contact: 'John Smith', title: 'CEO', value: 25000, source: 'LinkedIn', stage: 'prospecting', type: 'customers' },
      { id: 2, company: 'StartupXYZ', contact: 'Sarah Johnson', title: 'Founder', value: 15000, source: 'Referral', stage: 'prospecting', type: 'customers' },
      { id: 3, company: 'LawFirm Partners', contact: 'Mike Davis', title: 'Managing Partner', value: 50000, source: 'Event', stage: 'prospecting', type: 'customers' },
      { id: 10, company: 'CloudTech Solutions', contact: 'Alex Rodriguez', title: 'CTO', value: 0, source: 'Partnership', stage: 'prospecting', type: 'tech-partners' },
      { id: 11, company: 'Marketing Agency Pro', contact: 'Jessica Lee', title: 'Founder', value: 0, source: 'Referral', stage: 'prospecting', type: 'collaborators' }
    ],
    'qualification': [
      { id: 4, company: 'Global Solutions', contact: 'Lisa Chen', title: 'VP Operations', value: 35000, source: 'Cold Email', stage: 'qualification', type: 'customers' },
      { id: 5, company: 'Innovation Labs', contact: 'David Wilson', title: 'CTO', value: 20000, source: 'Website', stage: 'qualification', type: 'customers' },
      { id: 12, company: 'Data Analytics Co', contact: 'Michael Chen', title: 'CEO', value: 0, source: 'Partnership', stage: 'qualification', type: 'tech-partners' }
    ],
    'proposal': [
      { id: 6, company: 'Enterprise Corp', contact: 'Jennifer Brown', title: 'Director', value: 75000, source: 'Partnership', stage: 'proposal', type: 'customers' }
    ],
    'negotiation': [
      { id: 7, company: 'MegaCorp Ltd', contact: 'Robert Taylor', title: 'CEO', value: 100000, source: 'Referral', stage: 'negotiation', type: 'customers' }
    ],
    'closed-won': [
      { id: 8, company: 'Success Inc', contact: 'Amanda White', title: 'Founder', value: 30000, source: 'LinkedIn', stage: 'closed-won', type: 'customers' },
      { id: 13, company: 'DevOps Partners', contact: 'Sarah Kim', title: 'Partner', value: 0, source: 'Partnership', stage: 'closed-won', type: 'tech-partners' }
    ],
    'closed-lost': [
      { id: 9, company: 'Failed Startup', contact: 'Tom Black', title: 'CEO', value: 15000, source: 'Cold Email', stage: 'closed-lost', type: 'customers' }
    ]
  });

  const [selectedStage, setSelectedStage] = useState(null);
  const [contactType, setContactType] = useState('all');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageTotal = (stage) => {
    return dealsData[stage]?.reduce((sum, deal) => sum + deal.value, 0) || 0;
  };

  const getStageCount = (stage) => {
    const deals = dealsData[stage] || [];
    if (contactType === 'all') return deals.length;
    return deals.filter(deal => deal.type === contactType).length;
  };

  const getFilteredDeals = (stage) => {
    const deals = dealsData[stage] || [];
    if (contactType === 'all') return deals;
    return deals.filter(deal => deal.type === contactType);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">BD Pipeline</h1>
            <p className="text-gray-600">Click on a stage to view deals in that stage</p>
          </div>

          {/* Contact Type Toggle */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Filter by contact type:</span>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                  { key: 'customers', label: 'Customers', color: 'bg-blue-100 text-blue-700' },
                  { key: 'collaborators', label: 'Collaborators', color: 'bg-green-100 text-green-700' },
                  { key: 'tech-partners', label: 'Tech Partners', color: 'bg-purple-100 text-purple-700' }
                ].map((type) => (
                  <button
                    key={type.key}
                    onClick={() => setContactType(type.key)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      contactType === type.key 
                        ? `${type.color} ring-2 ring-current` 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customer Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Customer Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV File</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <div className="text-gray-500 mb-2">
                    <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">CSV files only</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manual Entry</label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="Contact Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500">
                    <option value="">Select Contact Type</option>
                    <option value="customers">Customers</option>
                    <option value="collaborators">Collaborators</option>
                    <option value="tech-partners">Tech Partners</option>
                  </select>
                  <button className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium">
                    Add Contact
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Stage Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {dealStages.map((stage) => (
              <div
                key={stage.key}
                className={`${stage.color} rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                  selectedStage === stage.key ? 'ring-2 ring-red-500' : ''
                }`}
                onClick={() => setSelectedStage(selectedStage === stage.key ? null : stage.key)}
              >
                <h3 className="font-semibold text-gray-900 mb-1">{stage.label}</h3>
                <div className="text-sm text-gray-600">
                  {getStageCount(stage.key)} deals
                </div>
                <div className="text-sm font-medium text-gray-800">
                  {formatCurrency(getStageTotal(stage.key))}
                </div>
              </div>
            ))}
          </div>

          {/* Selected Stage Details */}
          {selectedStage && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {dealStages.find(s => s.key === selectedStage)?.label} Deals
                </h2>
                <div className="text-sm text-gray-600">
                  {getStageCount(selectedStage)} deals • {formatCurrency(getStageTotal(selectedStage))}
                </div>
              </div>

              {/* Deals List */}
              <div className="space-y-4">
                {getFilteredDeals(selectedStage)?.map((deal) => (
                  <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="font-medium text-gray-900">{deal.company}</div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            deal.type === 'customers' ? 'bg-blue-100 text-blue-700' :
                            deal.type === 'collaborators' ? 'bg-green-100 text-green-700' :
                            deal.type === 'tech-partners' ? 'bg-purple-100 text-purple-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {deal.type === 'tech-partners' ? 'Tech Partner' : deal.type}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">{deal.contact} • {deal.title}</div>
                        <div className="text-sm text-gray-500 mt-1">
                          {formatCurrency(deal.value)} • {deal.source}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">
                          {formatCurrency(deal.value)}
                        </div>
                        <div className="text-xs text-gray-500 capitalize">
                          {deal.source}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Object.values(dealsData).flat().length}
                </div>
                <div className="text-sm text-gray-600">Total Deals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(getStageTotal('closed-won'))}
                </div>
                <div className="text-sm text-gray-600">Closed Won</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(Object.keys(dealsData).reduce((sum, stage) => sum + getStageTotal(stage), 0))}
                </div>
                <div className="text-sm text-gray-600">Total Pipeline Value</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}