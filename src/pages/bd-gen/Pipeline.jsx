import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Inbox, Plus } from 'lucide-react';
import Navigation from '../../components/Navigation';

// Pipeline stages
const dealStages = [
  { key: 'interested', label: 'Interested', color: 'bg-blue-100' },
  { key: 'had-meeting', label: 'Had Meeting', color: 'bg-purple-100' },
  { key: 'contract-negotiations', label: 'Contract Negotiations', color: 'bg-orange-100' },
  { key: 'contract-signed', label: 'Contract Signed', color: 'bg-green-100' }
];

// Demo contacts to hydrate the pipeline
const demoContacts = [
  // Prospects - Interested
  { id: '1', name: 'David Chen', company: 'TechStart Industries', title: 'CEO', stage: 'interested', type: 'prospects', value: 45000, source: 'LinkedIn' },
  { id: '2', name: 'Sarah Martinez', company: 'Digital Marketing Pro', title: 'Marketing Director', stage: 'interested', type: 'prospects', value: 32000, source: 'Event' },
  { id: '3', name: 'Michael Thompson', company: 'Growth Solutions LLC', title: 'Business Development Manager', stage: 'interested', type: 'prospects', value: 28000, source: 'Website' },
  
  // Prospects - Had Meeting
  { id: '4', name: 'Jennifer Wilson', company: 'Enterprise Solutions Group', title: 'VP of Operations', stage: 'had-meeting', type: 'prospects', value: 65000, source: 'Referral' },
  { id: '5', name: 'Robert Lee', company: 'Innovation Labs', title: 'Founder', stage: 'had-meeting', type: 'prospects', value: 55000, source: 'LinkedIn' },
  { id: '6', name: 'Amanda Brown', company: 'Strategic Consulting Inc', title: 'Managing Partner', stage: 'had-meeting', type: 'prospects', value: 48000, source: 'Event' },
  
  // Prospects - Contract Negotiations
  { id: '7', name: 'James Davis', company: 'Premier Business Services', title: 'CEO', stage: 'contract-negotiations', type: 'prospects', value: 75000, source: 'LinkedIn' },
  { id: '8', name: 'Lisa Anderson', company: 'Summit Consulting Group', title: 'Operations Director', stage: 'contract-negotiations', type: 'prospects', value: 85000, source: 'Referral' },
  
  // Prospects - Contract Signed
  { id: '9', name: 'Thomas Williams', company: 'Success Partners LLC', title: 'Founder', stage: 'contract-signed', type: 'prospects', value: 95000, source: 'LinkedIn' },
  { id: '10', name: 'Emily Johnson', company: 'Global Business Hub', title: 'VP Business Development', stage: 'contract-signed', type: 'prospects', value: 68000, source: 'Event' },
  
  // Tech Partners - Interested
  { id: '11', name: 'Alex Rodriguez', company: 'CloudTech Solutions', title: 'CTO', stage: 'interested', type: 'tech-partners', value: 0, source: 'Partnership' },
  { id: '12', name: 'Maria Garcia', company: 'DataSync Platforms', title: 'CEO', stage: 'interested', type: 'tech-partners', value: 0, source: 'Partnership' },
  
  // Tech Partners - Had Meeting
  { id: '13', name: 'Michael Chen', company: 'DevOps Innovations', title: 'Founder', stage: 'had-meeting', type: 'tech-partners', value: 0, source: 'Partnership' },
  { id: '14', name: 'Jessica Park', company: 'AI Integration Labs', title: 'CTO', stage: 'had-meeting', type: 'tech-partners', value: 0, source: 'Partnership' },
  
  // Tech Partners - Contract Negotiations
  { id: '15', name: 'Ryan Kim', company: 'Automation Systems Co', title: 'CEO', stage: 'contract-negotiations', type: 'tech-partners', value: 0, source: 'Partnership' },
  
  // Tech Partners - Contract Signed
  { id: '16', name: 'Sarah Kim', company: 'DevOps Partners', title: 'Partner', stage: 'contract-signed', type: 'tech-partners', value: 0, source: 'Partnership' },
  
  // Collaborators - Interested
  { id: '17', name: 'Patricia Moore', company: 'Legal Services Corp', title: 'Founder', stage: 'interested', type: 'collaborators', value: 0, source: 'Referral' },
  { id: '18', name: 'Daniel White', company: 'Marketing Agency Pro', title: 'Creative Director', stage: 'interested', type: 'collaborators', value: 0, source: 'Referral' },
  
  // Collaborators - Had Meeting
  { id: '19', name: 'Rachel Green', company: 'Content Marketing Studio', title: 'Owner', stage: 'had-meeting', type: 'collaborators', value: 0, source: 'Referral' },
  { id: '20', name: 'Chris Taylor', company: 'Design Co', title: 'Founder', stage: 'had-meeting', type: 'collaborators', value: 0, source: 'Event' },
  
  // Collaborators - Contract Negotiations
  { id: '21', name: 'Jordan Smith', company: 'PR & Communications', title: 'Managing Partner', stage: 'contract-negotiations', type: 'collaborators', value: 0, source: 'Referral' },
  
  // Collaborators - Contract Signed
  { id: '22', name: 'Morgan Lee', company: 'Brand Strategy Group', title: 'Principal', stage: 'contract-signed', type: 'collaborators', value: 0, source: 'Referral' },
];

export default function Pipeline() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedStage, setSelectedStage] = useState(null);
  const [contactType, setContactType] = useState('all');

  // Hydrate with demo data if contacts are empty
  useEffect(() => {
    if (contacts.length === 0) {
      setContacts(demoContacts);
    }
  }, []);

  // Group contacts by stage
  const dealsData = useMemo(() => {
    const grouped = {};
    dealStages.forEach(stage => {
      grouped[stage.key] = contacts.filter(c => {
        const contactStage = (c.stage || 'interested').toLowerCase()
          .replace(/\s+/g, '-')
          .replace('prospect', 'interested')
          .replace('prospecting', 'interested')
          .replace('warm', 'interested')
          .replace('meeting', 'had-meeting')
          .replace('had-meeting', 'had-meeting')
          .replace('negotiation', 'contract-negotiations')
          .replace('negotiations', 'contract-negotiations')
          .replace('proposal', 'contract-negotiations')
          .replace('client', 'contract-signed')
          .replace('closed-won', 'contract-signed')
          .replace('signed', 'contract-signed');
        return contactStage === stage.key;
      });
    });
    return grouped;
  }, [contacts]);

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageTotal = (stage) => {
    return dealsData[stage]?.reduce((sum, deal) => sum + (deal.value || deal.dealValue || 0), 0) || 0;
  };

  const getStageCount = (stage) => {
    const deals = dealsData[stage] || [];
    if (contactType === 'all') return deals.length;
    return deals.filter(deal => (deal.type || 'prospects') === contactType).length;
  };

  const getFilteredDeals = (stage) => {
    const deals = dealsData[stage] || [];
    if (contactType === 'all') return deals;
    return deals.filter(deal => (deal.type || 'prospects') === contactType);
  };

  const getContactTypeColor = (type) => {
    const contactTypeMap = {
      'prospects': 'bg-blue-100 text-blue-700',
      'collaborators': 'bg-green-100 text-green-700',
      'tech-partners': 'bg-purple-100 text-purple-700',
    };
    return contactTypeMap[type] || 'bg-gray-100 text-gray-700';
  };

  const getContactTypeLabel = (type) => {
    if (type === 'tech-partners') return 'Tech Partner';
    if (type === 'prospects') return 'Prospect';
    return type ? type.charAt(0).toUpperCase() + type.slice(1) : 'Prospect';
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

          {/* Contact Type Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-700">Filter by contact type:</span>
              <div className="flex gap-2">
                {[
                  { key: 'all', label: 'All', color: 'bg-gray-100 text-gray-700' },
                  { key: 'prospects', label: 'Prospects', color: 'bg-blue-100 text-blue-700' },
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

          {/* Add Contacts Button Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Contacts</h3>
                <p className="text-sm text-gray-600">Add new contacts, update existing ones, or import from CSV</p>
              </div>
              <button
                onClick={() => navigate('/contacts')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Go to Contacts
              </button>
            </div>
          </div>

          {/* Stage Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
              {getFilteredDeals(selectedStage)?.length === 0 ? (
                <div className="text-center py-12">
                  <Inbox className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-2">No contacts in this stage</p>
                  <button
                    onClick={() => navigate('/contacts')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Add Contacts
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {getFilteredDeals(selectedStage)?.map((deal) => {
                    const contactTypeValue = deal.type || 'prospects';
                    return (
                      <div key={deal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="font-medium text-gray-900">{deal.company || deal.name || 'Unknown'}</div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContactTypeColor(contactTypeValue)}`}>
                                {getContactTypeLabel(contactTypeValue)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {deal.name || deal.contact || 'Unknown'} {deal.title && `• ${deal.title}`}
                            </div>
                            <div className="text-sm text-gray-500 mt-1">
                              {formatCurrency(deal.value || deal.dealValue || 0)} {deal.source && `• ${deal.source}`}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-lg font-semibold text-gray-900">
                                {formatCurrency(deal.value || deal.dealValue || 0)}
                              </div>
                              {deal.source && (
                                <div className="text-xs text-gray-500 capitalize">
                                  {deal.source}
                                </div>
                              )}
                            </div>
                            <select
                              value={selectedStage}
                              onChange={(e) => {
                                const updated = contacts.map(c => 
                                  c.id === deal.id 
                                    ? { 
                                        ...c, 
                                        stage: e.target.value
                                      }
                                    : c
                                );
                                setContacts(updated);
                                setSelectedStage(e.target.value);
                              }}
                              className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                              {dealStages.map(stage => (
                                <option key={stage.key} value={stage.key}>
                                  {stage.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {contacts.length}
                </div>
                <div className="text-sm text-gray-600">Total Contacts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(getStageTotal('contract-signed'))}
                </div>
                <div className="text-sm text-gray-600">Contract Signed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(dealStages.reduce((sum, stage) => sum + getStageTotal(stage.key), 0))}
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
