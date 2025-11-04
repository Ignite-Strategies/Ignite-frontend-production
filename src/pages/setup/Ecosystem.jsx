import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Inline Entity Input - appears when you click to add
function InlineEntityInput({ onAdd, onCancel }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim());
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        type="text"
        placeholder="Enter player name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="flex-1 px-3 py-1.5 text-sm border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
        autoFocus
      />
      <button
        type="submit"
        className="px-3 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
      >
        Add
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="px-3 py-1.5 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Cancel
      </button>
    </form>
  );
}

// Category Node Component - shows category with entities underneath
function CategoryNode({ 
  type, 
  icon, 
  name, 
  description,
  goal,
  entities, 
  position, 
  onAddEntity, 
  onDeleteEntity 
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeInputIndex, setActiveInputIndex] = useState(null);

  const handleAdd = (entityName, index) => {
    if (entityName.trim()) {
      onAddEntity(type, { name: entityName.trim() });
      setActiveInputIndex(null);
    }
  };

  // Always show at least 3 slots, plus any extras beyond 3
  const minSlots = 3;
  const totalSlots = Math.max(minSlots, entities.length);
  const hasMoreThan3 = entities.length > minSlots;

  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div className="relative">
        {/* Category Circle */}
        <div
          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all shadow-lg ${
            entities.length > 0
              ? 'bg-orange-500 text-white'
              : 'bg-white border-2 border-gray-300 text-gray-600 hover:border-orange-400'
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="text-2xl mb-1">{icon}</span>
          <span className="text-xs font-semibold text-center px-1">{name}</span>
        </div>

        {/* Entity Count Badge */}
        {entities.length > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-orange-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-orange-600">{entities.length}</span>
          </div>
        )}

        {/* Expanded Panel - shows below category */}
        {isExpanded && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-72 bg-white rounded-lg shadow-xl border-2 border-orange-200 p-4 z-10">
            <div className="mb-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{name}</h4>
              <p className="text-xs text-gray-500 mb-2">{description}</p>
              {goal && (
                <div className="bg-orange-50 border border-orange-200 rounded px-2 py-1.5">
                  <p className="text-xs font-medium text-orange-900 mb-0.5">Goal:</p>
                  <p className="text-xs text-orange-700">{goal}</p>
                </div>
              )}
            </div>

            {/* Always show 3 slots minimum */}
            <div className="space-y-2 mb-3">
              {Array.from({ length: Math.min(minSlots, totalSlots) }).map((_, index) => {
                const entity = entities[index];
                
                if (activeInputIndex === index) {
                  return (
                    <InlineEntityInput
                      key={`input-${index}`}
                      onAdd={(name) => handleAdd(name, index)}
                      onCancel={() => setActiveInputIndex(null)}
                    />
                  );
                }
                
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm border ${
                      entity
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-gray-50 border-gray-200 border-dashed'
                    }`}
                  >
                    {entity ? (
                      <>
                        <span className="text-gray-900 font-medium">{entity.name}</span>
                        <button
                          onClick={() => onDeleteEntity(type, index)}
                          className="text-gray-400 hover:text-red-500 text-lg leading-none ml-2"
                        >
                          ×
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-gray-400 italic">Enter player name...</span>
                        <button
                          onClick={() => setActiveInputIndex(index)}
                          className="text-orange-500 hover:text-orange-600 text-sm font-medium"
                        >
                          Add
                        </button>
                      </>
                    )}
                  </div>
                );
              })}

              {/* Show additional entities if more than 3 */}
              {hasMoreThan3 && (
                <div className="space-y-2 max-h-40 overflow-y-auto border-t border-gray-200 pt-2 mt-2">
                  {entities.slice(minSlots).map((entity, index) => {
                    const actualIndex = minSlots + index;
                    if (activeInputIndex === actualIndex) {
                      return (
                        <InlineEntityInput
                          key={`input-${actualIndex}`}
                          onAdd={(name) => handleAdd(name, actualIndex)}
                          onCancel={() => setActiveInputIndex(null)}
                        />
                      );
                    }
                    return (
                      <div
                        key={entity.id || actualIndex}
                        className="flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2 text-sm border border-orange-200"
                      >
                        <span className="text-gray-900 font-medium">{entity.name}</span>
                        <button
                          onClick={() => onDeleteEntity(type, actualIndex)}
                          className="text-gray-400 hover:text-red-500 text-lg leading-none ml-2"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Add more field button if we have 3+ */}
              {entities.length >= minSlots && (
                <button
                  onClick={() => setActiveInputIndex(entities.length)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 border-dashed mt-2"
                >
                  + Add Field
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Visual Ecosystem Map Component
function EcosystemMap({ ecosystemData, relationshipTypes, onAddEntity, onDeleteEntity }) {
  // Calculate positions for 6 categories in a circle around center
  const centerX = 50;
  const centerY = 50;
  const radius = 38; // Percentage from center - larger for more ecosystem feel
  
  const positions = relationshipTypes.map((_, index) => {
    const angle = (index * 2 * Math.PI) / relationshipTypes.length - Math.PI / 2; // Start from top
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  return (
    <div className="relative w-full" style={{ height: '700px', minHeight: '700px' }}>
      {/* Background ecosystem pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="ecosystem-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="#f97316" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ecosystem-pattern)" />
        </svg>
      </div>

      {/* SVG for connection lines - more visible ecosystem connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
        {relationshipTypes.map((type, index) => {
          const pos = positions[index];
          const entities = ecosystemData[type.id] || [];
          
          return (
            <g key={type.id}>
              {/* Always show connection line, but styled differently based on content */}
              <line
                x1={`${centerX}%`}
                y1={`${centerY}%`}
                x2={`${pos.x}%`}
                y2={`${pos.y}%`}
                stroke={entities.length > 0 ? "#f97316" : "#e5e7eb"}
                strokeWidth={entities.length > 0 ? "3" : "2"}
                strokeDasharray={entities.length > 0 ? "0" : "8,4"}
                opacity={entities.length > 0 ? "0.4" : "0.2"}
              />
              {/* Pulsing dot for active connections */}
              {entities.length > 0 && (
                <circle
                  cx={`${(centerX + pos.x) / 2}%`}
                  cy={`${(centerY + pos.y) / 2}%`}
                  r="4"
                  fill="#f97316"
                  opacity="0.6"
                >
                  <animate
                    attributeName="opacity"
                    values="0.6;1;0.6"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="4;6;4"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {/* Center Circle - Your Company */}
      <div
        className="absolute"
        style={{
          left: `${centerX}%`,
          top: `${centerY}%`,
          transform: 'translate(-50%, -50%)',
          zIndex: 1
        }}
      >
        <div className="relative">
          {/* Outer glow ring */}
          <div className="absolute inset-0 rounded-full bg-orange-400 opacity-20 blur-xl animate-pulse"></div>
          <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex flex-col items-center justify-center shadow-2xl border-4 border-white">
            <span className="text-5xl mb-2">🏢</span>
            <span className="text-sm font-bold text-white">Your Business</span>
          </div>
        </div>
      </div>

      {/* Category Nodes */}
      {relationshipTypes.map((type, index) => (
        <CategoryNode
          key={type.id}
          type={type.id}
          icon={type.icon}
          name={type.name}
          description={type.description}
          goal={type.goal}
          entities={ecosystemData[type.id] || []}
          position={positions[index]}
          onAddEntity={onAddEntity}
          onDeleteEntity={onDeleteEntity}
        />
      ))}
    </div>
  );
}

// Main Ecosystem Component
export default function Ecosystem() {
  const navigate = useNavigate();
  const [ecosystemData, setEcosystemData] = useState({
    collaborators: [],
    connectors: [],
    platforms: [],
    institutions: [],
    communities: []
  });

  const relationshipTypes = [
    { 
      id: 'collaborators', 
      name: 'Collaborators', 
      description: 'People or firms you work with to deliver value',
      goal: 'Partnerships, joint delivery, co-creation',
      icon: '🤝' 
    },
    { 
      id: 'connectors', 
      name: 'Connectors', 
      description: 'People who introduce you to clients or partners',
      goal: 'Referrals, warm introductions, access',
      icon: '🔗' 
    },
    { 
      id: 'platforms', 
      name: 'Platforms', 
      description: 'Tools or systems that amplify you',
      goal: 'Distribution, reach, automation',
      icon: '⚙️' 
    },
    { 
      id: 'institutions', 
      name: 'Institutions', 
      description: 'Formal orgs tied to your space (associations, event hosts, licensing bodies)',
      goal: 'Credibility, compliance, industry standing, speaking opportunities',
      icon: '🏢' 
    },
    { 
      id: 'communities', 
      name: 'Communities', 
      description: 'Networks where your clients or peers gather',
      goal: 'Engagement, visibility, relationships',
      icon: '👥' 
    }
  ];

  // Load and hydrate data immediately on mount
  useEffect(() => {
    const savedData = localStorage.getItem('ecosystemData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.ecosystemData) {
          setEcosystemData(data.ecosystemData);
        }
      } catch (e) {
        console.error('Error loading ecosystem data:', e);
      }
    } else {
      // Demo data for first-time users
      const demoData = {
        collaborators: [
          { id: 1, name: 'Design Studio Co' },
          { id: 2, name: 'Tech Solutions Inc' },
          { id: 3, name: 'Marketing Partners' }
        ],
        connectors: [
          { id: 4, name: 'Sarah Johnson' },
          { id: 5, name: 'Mike Chen' },
          { id: 6, name: 'Lisa Martinez' }
        ],
        platforms: [
          { id: 7, name: 'Google Ads' },
          { id: 8, name: 'LinkedIn' },
          { id: 9, name: 'Stripe' }
        ],
        institutions: [
          { id: 10, name: 'State Bar Association' },
          { id: 11, name: 'Chamber of Commerce' },
          { id: 12, name: 'Industry Alliance' },
          { id: 13, name: 'TechCrunch Disrupt' },
          { id: 14, name: 'SXSW Conference' }
        ],
        communities: [
          { id: 15, name: 'Tech Founders Slack' },
          { id: 16, name: 'LinkedIn Pro Group' },
          { id: 17, name: 'Local Business Network' }
        ]
      };
      setEcosystemData(demoData);
      // Save demo data
      localStorage.setItem('ecosystemData', JSON.stringify({
        ecosystemData: demoData,
        timestamp: new Date().toISOString()
      }));
    }
  }, []);

  // Auto-save whenever data changes
  useEffect(() => {
    const dataToSave = {
      ecosystemData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('ecosystemData', JSON.stringify(dataToSave));
  }, [ecosystemData]);

  const handleAddEntity = (type, entity) => {
    setEcosystemData(prev => ({
      ...prev,
      [type]: [...(prev[type] || []), { ...entity, id: Date.now() }]
    }));
  };

  const handleDeleteEntity = (type, index) => {
    setEcosystemData(prev => ({
      ...prev,
      [type]: (prev[type] || []).filter((_, i) => i !== index)
    }));
  };

  const getTotalEntities = () => {
    return Object.values(ecosystemData).reduce((sum, entities) => sum + (entities?.length || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/growth-dashboard')}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                ← Back to Dashboard
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Ecosystem Map</h1>
                <p className="text-gray-600">Map the players in your business ecosystem</p>
              </div>
            </div>
            {getTotalEntities() > 0 && (
              <div className="text-right">
                <div className="text-2xl font-bold text-orange-600">{getTotalEntities()}</div>
                <div className="text-sm text-gray-500">Players mapped</div>
              </div>
            )}
          </div>

          {/* Visual Ecosystem Map */}
          <div className="bg-gray-50 rounded-xl p-8 border-2 border-dashed border-gray-200 mb-6">
            <EcosystemMap
              ecosystemData={ecosystemData}
              relationshipTypes={relationshipTypes}
              onAddEntity={handleAddEntity}
              onDeleteEntity={handleDeleteEntity}
            />
          </div>

          {/* Instructions */}
          <div className="text-center text-sm text-gray-500">
            <p>Click any category circle to add players. Each player is simply a name.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
