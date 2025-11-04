import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Relationship Type Selector Component
function RelationshipTypeSelector({ selectedTypes, onTypeToggle }) {
  const relationshipTypes = [
    {
      id: 'collaborators',
      name: 'Collaborators',
      description: 'People or firms you work with to deliver value (designers, vendors, subcontractors)',
      icon: '🤝'
    },
    {
      id: 'connectors',
      name: 'Connectors', 
      description: 'People who introduce you to clients or partners (referral sources, community leads)',
      icon: '🔗'
    },
    {
      id: 'platforms',
      name: 'Platforms',
      description: 'Tools or systems that amplify you (Google Ads, Eventbrite, Stripe)',
      icon: '⚙️'
    },
    {
      id: 'institutions',
      name: 'Institutions',
      description: 'Formal orgs tied to your space (associations, banks, licensing bodies)',
      icon: '🏢'
    },
    {
      id: 'communities',
      name: 'Communities',
      description: 'Networks where your clients or peers gather (Slack groups, LinkedIn forums)',
      icon: '👥'
    },
    {
      id: 'events',
      name: 'Events',
      description: 'Physical or digital spaces where you meet prospects (conferences, panels, meetups)',
      icon: '🎯'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {relationshipTypes.map((type) => (
        <div
          key={type.id}
          onClick={() => onTypeToggle(type.id)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
            selectedTypes.includes(type.id)
              ? 'border-orange-500 bg-orange-50 shadow-md'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{type.icon}</span>
            <h3 className="font-semibold text-gray-900">{type.name}</h3>
          </div>
          <p className="text-sm text-gray-600">{type.description}</p>
        </div>
      ))}
    </div>
  );
}

// Entity Builder Component
function EntityBuilder({ relationshipType, entities, onAddEntity, onUpdateEntity, onDeleteEntity }) {
  const [newEntity, setNewEntity] = useState({
    name: '',
    role: '',
    status: 'prospect',
    influence: 5,
    notes: ''
  });

  const handleAddEntity = () => {
    if (newEntity.name.trim()) {
      onAddEntity(relationshipType, newEntity);
      setNewEntity({
        name: '',
        role: '',
        status: 'prospect',
        influence: 5,
        notes: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Entity Form */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Add New {relationshipType.charAt(0).toUpperCase() + relationshipType.slice(1)}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Name (e.g., BridgeBank)"
            value={newEntity.name}
            onChange={(e) => setNewEntity({ ...newEntity, name: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
          <select
            value={newEntity.role}
            onChange={(e) => setNewEntity({ ...newEntity, role: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="">Select Role</option>
            <option value="referral-partner">Referral Partner</option>
            <option value="distribution-channel">Distribution Channel</option>
            <option value="influencer">Influencer</option>
            <option value="compliance">Compliance</option>
            <option value="vendor">Vendor</option>
            <option value="platform">Platform</option>
          </select>
          <select
            value={newEntity.status}
            onChange={(e) => setNewEntity({ ...newEntity, status: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          >
            <option value="prospect">Prospect</option>
            <option value="active">Active</option>
            <option value="dormant">Dormant</option>
          </select>
          <input
            type="number"
            min="1"
            max="10"
            value={newEntity.influence}
            onChange={(e) => setNewEntity({ ...newEntity, influence: parseInt(e.target.value) })}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            placeholder="Influence (1-10)"
          />
          <button
            onClick={handleAddEntity}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Notes (optional)"
            value={newEntity.notes}
            onChange={(e) => setNewEntity({ ...newEntity, notes: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Entities List */}
      {entities.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Current {relationshipType.charAt(0).toUpperCase() + relationshipType.slice(1)}</h4>
          {entities.map((entity, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="font-semibold text-gray-900">{entity.name}</h5>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      entity.status === 'active' ? 'bg-green-100 text-green-800' :
                      entity.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {entity.status}
                    </span>
                    <span className="text-sm text-gray-600">Influence: {entity.influence}/10</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">Role: {entity.role || 'Not specified'}</p>
                  {entity.notes && <p className="text-sm text-gray-500">{entity.notes}</p>}
                </div>
                <button
                  onClick={() => onDeleteEntity(relationshipType, index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Dashboard Summary Component
function EcosystemSummary({ ecosystemData }) {
  const getTotalInfluence = (entities) => {
    return entities.reduce((sum, entity) => sum + entity.influence, 0);
  };

  const getTopEntity = (entities) => {
    if (entities.length === 0) return 'None';
    return entities.reduce((top, entity) => 
      entity.influence > top.influence ? entity : top
    ).name;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Ecosystem Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(ecosystemData).map(([type, entities]) => (
          <div key={type} className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900 capitalize">{type}</h4>
              <span className="text-2xl">
                {type === 'collaborators' ? '🤝' :
                 type === 'connectors' ? '🔗' :
                 type === 'platforms' ? '⚙️' :
                 type === 'institutions' ? '🏢' :
                 type === 'communities' ? '👥' : '🎯'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600"># of Entries:</span>
                <span className="font-semibold">{entities.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Top Entity:</span>
                <span className="font-semibold text-sm">{getTopEntity(entities)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Influence:</span>
                <span className="font-semibold">{getTotalInfluence(entities)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Ecosystem Component
export default function Ecosystem() {
  const navigate = useNavigate();
  const [ecosystemData, setEcosystemData] = useLocalStorage('ecosystemData', {
    collaborators: [],
    connectors: [],
    platforms: [],
    institutions: [],
    communities: [],
    events: []
  });
  const [currentStep, setCurrentStep] = useState('intro');
  const [selectedTypes, setSelectedTypes] = useState([]);

  // Load selected types from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('ecosystemSelectedTypes');
    if (saved) {
      setSelectedTypes(JSON.parse(saved));
    }
  }, []);

  const handleTypeToggle = (typeId) => {
    const updated = selectedTypes.includes(typeId) 
      ? selectedTypes.filter(id => id !== typeId)
      : [...selectedTypes, typeId];
    setSelectedTypes(updated);
    localStorage.setItem('ecosystemSelectedTypes', JSON.stringify(updated));
  };

  const handleAddEntity = (type, entity) => {
    setEcosystemData(prev => ({
      ...prev,
      [type]: [...prev[type], { ...entity, id: Date.now() }]
    }));
  };

  const handleDeleteEntity = (type, index) => {
    setEcosystemData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    alert('Ecosystem data saved successfully!');
    navigate('/growth-dashboard');
  };

  const getTotalEntities = () => {
    return Object.values(ecosystemData).reduce((sum, entities) => sum + entities.length, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Ecosystem Build"
        subtitle="Map your business ecosystem and relationships"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Step 1: Intro Section */}
      {currentStep === 'intro' && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <div className="text-6xl mb-6">🗺️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Map your ecosystem</h2>
          <p className="text-xl text-gray-600 mb-4">
            Take a few minutes to outline the organizations, partners, and platforms that shape how your business grows.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            This isn't about customers — it's about who connects, supports, or enables your work.
          </p>
          <button
            onClick={() => setCurrentStep('types')}
            className="px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-xl hover:bg-orange-600 transition-colors"
          >
            Start Mapping →
          </button>
        </div>
      )}

      {/* Step 2: Relationship Type Selector */}
      {currentStep === 'types' && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Relationship Types</h2>
            <p className="text-gray-600 mb-8">Choose which types of relationships are relevant to your business</p>
          </div>
          
          <RelationshipTypeSelector 
            selectedTypes={selectedTypes}
            onTypeToggle={handleTypeToggle}
          />
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep('intro')}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep('entities')}
              disabled={selectedTypes.length === 0}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next → Add Specific Entities
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Entity Builder */}
      {currentStep === 'entities' && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Specific Entities</h2>
            <p className="text-gray-600 mb-8">Add the specific organizations, people, and platforms in each category</p>
          </div>

          {selectedTypes.map((type) => (
            <div key={type} className="border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 capitalize">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </h3>
              <EntityBuilder
                relationshipType={type}
                entities={ecosystemData[type] || []}
                onAddEntity={handleAddEntity}
                onDeleteEntity={handleDeleteEntity}
              />
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep('types')}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentStep('dashboard')}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              View Summary →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Dashboard View */}
      {currentStep === 'dashboard' && (
        <div className="bg-white rounded-2xl shadow-md p-8 space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ecosystem Summary</h2>
            <p className="text-gray-600 mb-8">
              You've mapped {getTotalEntities()} entities across {selectedTypes.length} relationship types
            </p>
          </div>

          <EcosystemSummary ecosystemData={ecosystemData} />

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentStep('entities')}
              className="px-6 py-3 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Edit
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Ecosystem Map
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

