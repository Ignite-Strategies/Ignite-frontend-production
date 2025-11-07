import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    icon: '📈'
  },
  client: {
    background: 'bg-green-50',
    border: 'border-green-300',
    text: 'text-green-700',
    chip: 'bg-green-100 text-green-700',
    ring: 'ring-green-400',
    icon: '🏁'
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

  const unassignedContacts = useMemo(() => {
    const set = new Set(activeStages);
    return pipelineContacts.filter((contact) => !set.has(slugify(contact.pipeline?.stage)));
  }, [pipelineContacts, activeStages]);

  const getStageContacts = (stageId) =>
    stageId
      ? pipelineContacts.filter(
          (contact) => slugify(contact.pipeline?.stage) === stageId
        )
      : unassignedContacts;

  const stageIds = activeStages;

  const getPipelineContactCount = (pipelineId) =>
    contacts.filter(
      (contact) => slugify(contact.pipeline?.pipeline) === slugify(pipelineId)
    ).length;

  const handleStageChange = (contactId, nextStageId) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) => {
        if (contact.id !== contactId) return contact;
        const updatedPipeline = {
          ...(contact.pipeline || {}),
          pipeline: selectedPipeline,
          stage: nextStageId || null
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
            Total Contacts:{' '}
            <span className="font-bold text-gray-900">
              {pipelineContacts.length + unassignedContacts.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          {stageIds.map((stageId) => {
            const count = getStageContacts(stageId).length;
            return (
              <div
                key={stageId}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center justify-between"
              >
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {formatLabel(stageId)}
                </div>
                <div className="flex items-baseline gap-1 text-gray-900 font-semibold text-lg">
                  <span>{count}</span>
                  <span className="text-xs font-normal text-gray-500">
                    {count === 1 ? 'contact' : 'contacts'}
                  </span>
                </div>
              </div>
            );
          })}
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm flex items-center justify-between">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Unassigned
            </div>
            <div className="flex items-baseline gap-1 text-gray-900 font-semibold text-lg">
              <span>
                {unassignedContacts.length}
              </span>
              <span className="text-xs font-normal text-gray-500">
                {unassignedContacts.length === 1 ? 'contact' : 'contacts'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pipelineContacts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-gray-500 text-sm"
                    >
                      No contacts in this pipeline yet.
                    </td>
                  </tr>
                ) : (
                  pipelineContacts.map((contact) => {
                    const stageValue = slugify(contact.pipeline?.stage);
                    const selectValue = activeStages.includes(stageValue) ? stageValue : '';
                    return (
                      <tr key={contact.id}>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {getContactDisplayName(contact)}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          {contact.contactCompany?.companyName || '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {contact.title || '—'}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">
                          <select
                            value={selectValue}
                            onChange={(event) =>
                              handleStageChange(contact.id, event.target.value || '')
                            }
                            className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Unassigned</option>
                            {activeStages.map((stageId) => (
                              <option key={stageId} value={stageId}>
                                {formatLabel(stageId)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <button
                            onClick={() => navigate(`/contacts/${contact.id}`)}
                            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          >
                            View Contact
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
