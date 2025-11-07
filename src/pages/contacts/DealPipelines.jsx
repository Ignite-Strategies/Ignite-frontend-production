import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PageHeader from '../../components/PageHeader';
import api from '../../lib/api';

const fallbackPipelineConfig = {
  prospect: ['interest', 'meeting', 'proposal', 'contract', 'contract-signed'],
  client: ['kickoff', 'work-started', 'work-delivered', 'sustainment', 'renewal', 'terminated-contract'],
  collaborator: ['interest', 'meeting', 'moa', 'agreement'],
  institution: ['interest', 'meeting', 'moa', 'agreement']
};

const pipelineDescriptions = {
  prospect: 'Move prospects from first touch to signed contract',
  client: 'Track delivery, sustainment, and renewal motions',
  collaborator: 'Manage strategic partners and MOAs',
  institution: 'Guide institutional relationships through formal agreements'
};

const pipelineStyles = {
  prospect: {
    background: 'bg-blue-50',
    border: 'border-blue-300',
    text: 'text-blue-700',
    chip: 'bg-blue-100 text-blue-700',
    ring: 'ring-blue-400',
    icon: '🧲'
  },
  client: {
    background: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    chip: 'bg-green-100 text-green-700',
    ring: 'ring-green-400',
    icon: '🤝'
  },
  collaborator: {
    background: 'bg-purple-50',
    border: 'border-purple-300',
    text: 'text-purple-700',
    chip: 'bg-purple-100 text-purple-700',
    ring: 'ring-purple-400',
    icon: '🤝'
  },
  institution: {
    background: 'bg-orange-50',
    border: 'border-orange-300',
    text: 'text-orange-700',
    chip: 'bg-orange-100 text-orange-700',
    ring: 'ring-orange-400',
    icon: '🏛️'
  }
};

const stageStyles = {
  interest: { header: 'bg-blue-100', text: 'text-blue-700', emoji: '👀' },
  meeting: { header: 'bg-purple-100', text: 'text-purple-700', emoji: '🤝' },
  proposal: { header: 'bg-indigo-100', text: 'text-indigo-700', emoji: '📄' },
  contract: { header: 'bg-orange-100', text: 'text-orange-700', emoji: '📝' },
  'contract-signed': { header: 'bg-green-100', text: 'text-green-700', emoji: '✅' },
  kickoff: { header: 'bg-blue-100', text: 'text-blue-700', emoji: '🚀' },
  'work-started': { header: 'bg-amber-100', text: 'text-amber-700', emoji: '🔧' },
  'work-delivered': { header: 'bg-indigo-100', text: 'text-indigo-700', emoji: '📦' },
  sustainment: { header: 'bg-teal-100', text: 'text-teal-700', emoji: '🌱' },
  renewal: { header: 'bg-green-100', text: 'text-green-700', emoji: '🔁' },
  'terminated-contract': { header: 'bg-red-100', text: 'text-red-700', emoji: '⛔' },
  moa: { header: 'bg-purple-100', text: 'text-purple-700', emoji: '📜' },
  agreement: { header: 'bg-green-100', text: 'text-green-700', emoji: '✅' },
  unassigned: { header: 'bg-gray-100', text: 'text-gray-600', emoji: '📌' }
};

const formatLabel = (value) =>
  value
    ? value
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : '';

const slugify = (value) =>
  (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');

const getContactDisplayName = (contact) =>
  contact.goesBy ||
  [contact.firstName, contact.lastName].filter(Boolean).join(' ').trim() ||
  'Unnamed Contact';

export default function DealPipelines() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [pipelineMap, setPipelineMap] = useState(fallbackPipelineConfig);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [selectedPipeline, setSelectedPipeline] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadPipelineConfig = async () => {
      try {
        const response = await api.get('/api/pipelines/config');
        if (isMounted && response.data?.pipelines) {
          setPipelineMap(response.data.pipelines);
        }
      } catch (error) {
        console.warn('⚠️ Falling back to default pipeline config:', error?.message);
        if (isMounted) {
          setPipelineMap(fallbackPipelineConfig);
        }
      } finally {
        if (isMounted) {
          setLoadingConfig(false);
        }
      }
    };

    loadPipelineConfig();
    return () => {
      isMounted = false;
    };
  }, []);

  const pipelineKeys = useMemo(() => Object.keys(pipelineMap), [pipelineMap]);

  useEffect(() => {
    if (!selectedPipeline && pipelineKeys.length > 0) {
      setSelectedPipeline(pipelineKeys[0]);
    }
  }, [pipelineKeys, selectedPipeline]);

  const activeStages = selectedPipeline ? pipelineMap[selectedPipeline] || [] : [];
  const pipelineContacts = useMemo(
    () =>
      contacts.filter(
        (contact) => slugify(contact.pipeline?.pipeline) === slugify(selectedPipeline)
      ),
    [contacts, selectedPipeline]
  );

  const unassignedContacts = useMemo(
    () =>
      pipelineContacts.filter((contact) => {
        const stageSlug = slugify(contact.pipeline?.stage);
        return !activeStages.includes(stageSlug);
      }),
    [pipelineContacts, activeStages]
  );

  const getStageContacts = (stageId) => {
    if (stageId === 'unassigned') {
      return unassignedContacts;
    }
    return pipelineContacts.filter(
      (contact) => slugify(contact.pipeline?.stage) === stageId
    );
  };

  const stageIds = [
    ...activeStages,
    ...(unassignedContacts.length > 0 ? ['unassigned'] : [])
  ];

  const getStageTotal = (stageId) =>
    getStageContacts(stageId).reduce(
      (sum, contact) => sum + (contact.pipeline?.value || contact.dealValue || 0),
      0
    );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount || 0);

  const getPipelineContactCount = (pipelineId) =>
    contacts.filter(
      (contact) => slugify(contact.pipeline?.pipeline) === slugify(pipelineId)
    ).length;

  const getLogicalNextStages = (stageId) => {
    if (!activeStages.length) return [];
    if (stageId === 'unassigned') {
      return [activeStages[0]];
    }
    const currentIndex = activeStages.indexOf(stageId);
    if (currentIndex === -1 || currentIndex === activeStages.length - 1) {
      return [];
    }
    return activeStages.slice(currentIndex + 1);
  };

  const handleStageChange = (contactId, nextStageId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id !== contactId) return contact;
        const updatedPipeline = {
          ...(contact.pipeline || {}),
          pipeline: selectedPipeline,
          stage: nextStageId
        };
        return { ...contact, pipeline: updatedPipeline };
      })
    );
  };

  if (loadingConfig && !selectedPipeline) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Deal Pipelines" subtitle="Loading pipeline configuration..." />
      </div>
    );
  }

  if (pipelineKeys.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <PageHeader title="Deal Pipelines" subtitle="No pipeline configuration available." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Deal Pipelines"
        subtitle="Track deals by pipeline type and stage."
        backTo="/contacts"
        backLabel="Back to People Hub"
        breadcrumbs={[
          { label: 'Growth Dashboard', to: '/growth-dashboard' },
          { label: 'People Hub', to: '/contacts' },
          { label: 'Deal Pipelines' }
        ]}
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineKeys.map((pipelineId) => {
            const styles = pipelineStyles[pipelineId] || pipelineStyles.prospect;
            const isActive = pipelineId === selectedPipeline;
            return (
              <button
                key={pipelineId}
                onClick={() => setSelectedPipeline(pipelineId)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  isActive
                    ? `${styles.border} ${styles.background} ${styles.ring} ring-2 ring-offset-2`
                    : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{styles.icon}</span>
                  <h3
                    className={`font-semibold ${
                      isActive ? styles.text : 'text-gray-900'
                    }`}
                  >
                    {formatLabel(pipelineId)}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {pipelineDescriptions[pipelineId] ||
                    'Track contacts through this engagement flow.'}
                </p>
                <div className={`mt-3 inline-flex px-2 py-1 rounded-full text-xs ${styles.chip}`}>
                  {getPipelineContactCount(pipelineId)}{' '}
                  {getPipelineContactCount(pipelineId) === 1 ? 'contact' : 'contacts'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {formatLabel(selectedPipeline)} Pipeline
            </h2>
            <p className="text-gray-600">
              Move contacts through the engagement stages defined for this pipeline.
            </p>
          </div>
          <div className="text-sm text-gray-600">
            Total Value:{' '}
            <span className="font-bold text-gray-900">
              {formatCurrency(
                activeStages.reduce((sum, stageId) => sum + getStageTotal(stageId), 0)
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stageIds.map((stageId) => {
            const contactsInStage = getStageContacts(stageId);
            const styles = stageStyles[stageId] || stageStyles.unassigned;
            const nextStages = getLogicalNextStages(stageId);
            const nextStageLabel = nextStages.length
              ? formatLabel(nextStages[0])
              : null;

            return (
              <div key={stageId} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className={`p-4 border-b ${styles.header} rounded-t-lg`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{styles.emoji}</span>
                    <h3 className={`font-semibold ${styles.text}`}>
                      {stageId === 'unassigned' ? 'Unassigned' : formatLabel(stageId)}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-700 mb-1">
                    {contactsInStage.length}{' '}
                    {contactsInStage.length === 1 ? 'contact' : 'contacts'}
                  </p>
                  <p className="text-xs font-medium text-gray-800">
                    {formatCurrency(getStageTotal(stageId))}
                  </p>
                </div>

                <div className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                  {contactsInStage.length > 0 ? (
                    <div className="space-y-3">
                      {contactsInStage.map((contact) => (
                        <div
                          key={contact.id}
                          className="bg-gray-50 p-3 rounded border hover:shadow-sm transition-shadow"
                        >
                          <div className="font-medium text-gray-900 mb-1">
                            {getContactDisplayName(contact)}
                          </div>
                          <div className="text-sm text-gray-600">
                            {contact.contactCompany?.companyName || 'No company'}
                          </div>
                          {contact.title && (
                            <div className="text-xs text-gray-500 mt-1">
                              {contact.title}
                            </div>
                          )}
                          {(contact.pipeline?.value || contact.dealValue) && (
                            <div className="text-sm font-semibold text-gray-900 mt-2">
                              {formatCurrency(contact.pipeline?.value || contact.dealValue)}
                            </div>
                          )}

                          {nextStages.length > 0 && (
                            <div className="mt-3">
                              <button
                                onClick={() => handleStageChange(contact.id, nextStages[0])}
                                className={`text-xs px-3 py-1 rounded font-medium hover:opacity-80 transition-colors flex items-center gap-1 w-full justify-center ${styles.header} ${styles.text}`}
                              >
                                <ArrowRight className="h-3 w-3" />
                                Move to {nextStageLabel || 'next stage'}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">{styles.emoji}</div>
                      <p className="text-sm">
                        {stageId === 'unassigned'
                          ? 'No contacts without a stage'
                          : 'No contacts in this stage'}
                      </p>
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

