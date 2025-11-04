import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { UserCircle, Building2, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

// Pipeline stages for legal services
const stages = [
  { id: 'interested', name: 'Interested', color: 'bg-blue-100', borderColor: 'border-blue-300', textColor: 'text-blue-700', emoji: '👀' },
  { id: 'had-meeting', name: 'Had Meeting', color: 'bg-purple-100', borderColor: 'border-purple-300', textColor: 'text-purple-700', emoji: '🤝' },
  { id: 'contract-negotiations', name: 'Contract Negotiations', color: 'bg-orange-100', borderColor: 'border-orange-300', textColor: 'text-orange-700', emoji: '📝' },
  { id: 'contract-signed', name: 'Contract Signed', color: 'bg-green-100', borderColor: 'border-green-300', textColor: 'text-green-700', emoji: '✅' }
];

// Persona types (matching the Engage page)
const personaTypes = [
  { 
    id: 'capital-partner', 
    name: 'Capital Partner', 
    color: 'bg-red-100', 
    textColor: 'text-red-700',
    borderColor: 'border-red-300',
    description: 'Investment firms, PE funds, VC firms'
  },
  { 
    id: 'portfolio-manager', 
    name: 'Portfolio Manager', 
    color: 'bg-orange-100', 
    textColor: 'text-orange-700',
    borderColor: 'border-orange-300',
    description: 'Portfolio company managers and executives'
  },
  { 
    id: 'investment-director', 
    name: 'Investment Director', 
    color: 'bg-purple-100', 
    textColor: 'text-purple-700',
    borderColor: 'border-purple-300',
    description: 'Strategic investment and business development directors'
  }
];

export default function DealPipelines() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedPersona, setSelectedPersona] = useState('capital-partner');
  const [selectedStage, setSelectedStage] = useState(null);

  // Mock persona assignments for contacts (in real app, would come from persona data)
  const getPersonaForContact = (contact) => {
    // Mock logic: assign based on title or company type
    if (contact.title?.toLowerCase().includes('partner') || contact.title?.toLowerCase().includes('capital')) {
      return 'capital-partner';
    }
    if (contact.title?.toLowerCase().includes('portfolio') || contact.title?.toLowerCase().includes('manager')) {
      return 'portfolio-manager';
    }
    if (contact.title?.toLowerCase().includes('director') || contact.title?.toLowerCase().includes('investment')) {
      return 'investment-director';
    }
    // Default fallback
    return 'capital-partner';
  };

  // Filter contacts by selected persona
  const personaContacts = useMemo(() => {
    return contacts.filter(c => getPersonaForContact(c) === selectedPersona);
  }, [contacts, selectedPersona]);

  // Get contact count for a specific persona
  const getPersonaContactCount = (personaId) => {
    return contacts.filter(c => getPersonaForContact(c) === personaId).length;
  };

  // Group persona contacts by stage
  const contactsByStage = useMemo(() => {
    const grouped = {};
    stages.forEach(stage => {
      grouped[stage.id] = personaContacts.filter(c => {
        const contactStage = (c.stage || 'Interested').toLowerCase()
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
        return contactStage === stage.id;
      });
    });
    return grouped;
  }, [personaContacts]);

  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStageCount = (stageId) => {
    return contactsByStage[stageId]?.length || 0;
  };

  const getStageTotal = (stageId) => {
    const deals = contactsByStage[stageId] || [];
    return deals.reduce((sum, deal) => sum + (deal.value || deal.dealValue || 0), 0);
  };

  const getLogicalNextStages = (currentStage) => {
    const currentIndex = stages.findIndex(stage => stage.id === currentStage);
    if (currentIndex === -1 || currentIndex === stages.length - 1) return [];
    return stages.slice(currentIndex + 1);
  };

  const handleStageChange = (contactId, newStage) => {
    const updated = contacts.map(c => {
      if (c.id === contactId) {
        const stageName = newStage.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        return { ...c, stage: stageName };
      }
      return c;
    });
    setContacts(updated);
  };

  const currentPersona = personaTypes.find(p => p.id === selectedPersona);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Deal Pipelines"
        subtitle="Track deals by persona type through the engagement journey"
        backTo="/contacts"
        backLabel="← Back to Contacts"
      />

      {/* Persona Selection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Persona Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personaTypes.map((persona) => (
            <button
              key={persona.id}
              onClick={() => {
                setSelectedPersona(persona.id);
                setSelectedStage(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPersona === persona.id
                  ? `${persona.borderColor} ${persona.color} ring-2 ring-current`
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <UserCircle className={`h-6 w-6 ${selectedPersona === persona.id ? persona.textColor : 'text-gray-600'}`} />
                <h3 className={`font-semibold ${selectedPersona === persona.id ? persona.textColor : 'text-gray-900'}`}>
                  {persona.name}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{persona.description}</p>
              <div className="mt-2 text-sm font-medium text-gray-700">
                {getPersonaContactCount(persona.id)} deals
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Stages - HubSpot Style */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {currentPersona?.name} Pipeline
            </h2>
            <p className="text-gray-600">Move contacts through the engagement stages</p>
          </div>
          <div className="text-sm text-gray-600">
            Total Value: <span className="font-bold text-gray-900">
              {formatCurrency(
                stages.reduce((sum, stage) => sum + getStageTotal(stage.id), 0)
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stages.map((stage) => {
            const stageContacts = contactsByStage[stage.id] || [];
            return (
              <div key={stage.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Stage Header */}
                <div className={`p-4 border-b ${stage.color} rounded-t-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{stage.emoji}</span>
                    <h3 className={`font-semibold ${stage.textColor}`}>
                      {stage.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    {stageContacts.length} {stageContacts.length === 1 ? 'deal' : 'deals'}
                  </p>
                  <p className="text-xs font-medium text-gray-800">
                    {formatCurrency(getStageTotal(stage.id))}
                  </p>
                </div>

                {/* Contacts */}
                <div className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                  {stageContacts.length > 0 ? (
                    <div className="space-y-3">
                      {stageContacts.map((contact) => (
                        <div key={contact.id} className="bg-gray-50 p-3 rounded border hover:shadow-sm transition-shadow">
                          <div className="font-medium text-gray-900 mb-1">
                            {contact.name || contact.contact || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-600">
                            {contact.company || 'No company'}
                          </div>
                          {contact.title && (
                            <div className="text-xs text-gray-500 mt-1">
                              {contact.title}
                            </div>
                          )}
                          {(contact.value || contact.dealValue) && (
                            <div className="text-sm font-semibold text-gray-900 mt-2">
                              {formatCurrency(contact.value || contact.dealValue)}
                            </div>
                          )}
                          
                          {/* Forward Arrow - Move to Next Stage */}
                          {getLogicalNextStages(stage.id).length > 0 && (
                            <div className="mt-2">
                              <button
                                onClick={() => {
                                  const nextStage = getLogicalNextStages(stage.id)[0];
                                  handleStageChange(contact.id, nextStage.id);
                                }}
                                className={`text-xs ${stage.color} ${stage.textColor} px-3 py-1 rounded font-medium hover:opacity-80 transition-colors flex items-center gap-1 w-full justify-center`}
                              >
                                <ArrowRight className="h-3 w-3" />
                                Next Stage
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">{stage.emoji}</div>
                      <p className="text-sm">No deals in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

