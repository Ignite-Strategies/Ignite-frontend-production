import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function ProposalBuilder() {
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const isEditing = !!proposalId;

  // Mock service library - in production, this would come from API
  const [serviceLibrary, setServiceLibrary] = useState([
    {
      id: 'setup-platform',
      name: 'Platform Setup',
      description: 'Build company settings on platform, integrate email, set up tenant',
      category: 'Setup',
      defaultDurationWeeks: 2,
      defaultDeliverables: [
        'Company Settings Configured',
        'Email Integration Complete',
        'Dedicated Tenant Deployed'
      ],
      defaultPrice: 5000,
      tags: ['setup', 'integration', 'platform']
    },
    {
      id: 'enrich-prospects',
      name: 'Enrich First 150 Prospects',
      description: 'Parse LinkedIn/CSV contacts, verify emails via Hunter.io, map to personas, add to pipeline',
      category: 'Enrichment',
      defaultDurationWeeks: 3,
      defaultDeliverables: [
        '150 Enriched Contacts',
        'Email Verification Complete',
        'Contact → Persona Mapping',
        'Campaign-Ready Lists'
      ],
      defaultPrice: 7500,
      tags: ['enrichment', 'data', 'prospects']
    },
    {
      id: 'foundation-building',
      name: 'Foundation Building',
      description: 'Build strategic and creative foundation for BD success',
      category: 'Foundation',
      defaultDurationWeeks: 3,
      defaultDeliverables: [
        '3 Target Personas',
        '6 Outreach Templates',
        '6 Event / CLE Plans',
        '5 SEO Blog Posts',
        '25-Slide CLE Deck',
        'CLE Landing Page'
      ],
      defaultPrice: 12000,
      tags: ['foundation', 'content', 'strategy']
    },
    {
      id: 'integrations',
      name: 'Microsoft Integrations',
      description: 'Connect Microsoft ecosystem to Ignite for automation',
      category: 'Integration',
      defaultDurationWeeks: 2,
      defaultDeliverables: [
        'Microsoft Graph OAuth Setup',
        'Teams Meeting Automation',
        'Hunter.io Enrichment Setup',
        'Contact Upload + Tagging'
      ],
      defaultPrice: 6000,
      tags: ['integration', 'microsoft', 'automation']
    },
    {
      id: 'cle-addon',
      name: 'CLE Add-On',
      description: 'Additional CLE content and event planning',
      category: 'CLE',
      defaultDurationWeeks: 2,
      defaultDeliverables: [
        'Additional CLE Decks',
        'Event Planning Support',
        'CLE Content Creation'
      ],
      defaultPrice: 4000,
      tags: ['cle', 'events', 'content']
    }
  ]);

  const [proposal, setProposal] = useState({
    clientName: '',
    clientCompany: '',
    purpose: '',
    serviceInstances: [],
    phases: []
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedServiceTemplate, setSelectedServiceTemplate] = useState(null);
  const [phaseName, setPhaseName] = useState('');
  const [editingPhase, setEditingPhase] = useState(null);

  // Load proposal if editing
  useEffect(() => {
    if (isEditing) {
      // In production: fetch proposal from API
      // For now, load from localStorage or mock
    }
  }, [isEditing, proposalId]);

  const categories = ['all', ...new Set(serviceLibrary.map(s => s.category))];

  const filteredServices = serviceLibrary.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddService = (serviceTemplate) => {
    setSelectedServiceTemplate(serviceTemplate);
    setShowServiceModal(true);
  };

  const handleConfirmAddService = (customizations = {}) => {
    const newServiceInstance = {
      id: `service-instance-${Date.now()}`,
      serviceTemplateId: selectedServiceTemplate.id,
      phaseId: customizations.phaseId || null,
      customName: customizations.customName,
      customDescription: customizations.customDescription,
      durationWeeks: customizations.durationWeeks || selectedServiceTemplate.defaultDurationWeeks,
      deliverables: customizations.deliverables || [...selectedServiceTemplate.defaultDeliverables],
      price: customizations.price || selectedServiceTemplate.defaultPrice
    };

    setProposal({
      ...proposal,
      serviceInstances: [...proposal.serviceInstances, newServiceInstance]
    });

    setShowServiceModal(false);
    setSelectedServiceTemplate(null);
  };

  const handleRemoveService = (serviceInstanceId) => {
    setProposal({
      ...proposal,
      serviceInstances: proposal.serviceInstances.filter(s => s.id !== serviceInstanceId)
    });
  };

  const handleCreatePhase = () => {
    if (!phaseName.trim()) return;

    const phaseId = `phase-${Date.now()}`;
    const newPhase = {
      id: phaseId,
      name: phaseName,
      services: []
    };

    setProposal({
      ...proposal,
      phases: [...proposal.phases, newPhase]
    });

    setPhaseName('');
  };

  const handleAssignToPhase = (serviceInstanceId, phaseId) => {
    setProposal({
      ...proposal,
      serviceInstances: proposal.serviceInstances.map(s =>
        s.id === serviceInstanceId ? { ...s, phaseId } : s
      )
    });
  };

  const handleRemovePhase = (phaseId) => {
    // Unassign services from this phase
    setProposal({
      ...proposal,
      phases: proposal.phases.filter(p => p.id !== phaseId),
      serviceInstances: proposal.serviceInstances.map(s =>
        s.phaseId === phaseId ? { ...s, phaseId: null } : s
      )
    });
  };

  // Group services by phase
  const servicesByPhase = proposal.serviceInstances.reduce((acc, service) => {
    const phaseId = service.phaseId || 'unassigned';
    if (!acc[phaseId]) acc[phaseId] = [];
    acc[phaseId].push(service);
    return acc;
  }, {});

  // Auto-generate phases from services (optional helper)
  const autoGeneratePhases = () => {
    // Group services by category to suggest phases
    const servicesByCategory = proposal.serviceInstances.reduce((acc, service) => {
      const template = serviceLibrary.find(t => t.id === service.serviceTemplateId);
      const category = template?.category || 'Other';
      if (!acc[category]) acc[category] = [];
      acc[category].push(service);
      return acc;
    }, {});

    // Create phases from categories
    const newPhases = Object.entries(servicesByCategory).map(([category, services]) => {
      const phaseId = `phase-${category.toLowerCase()}-${Date.now()}`;
      return {
        id: phaseId,
        name: category === 'Foundation' ? 'Foundation Building' : 
              category === 'Enrichment' ? 'Enrichment' :
              category === 'Integration' ? 'Integrations' :
              category === 'CLE' ? 'CLE Add-On' :
              category === 'Setup' ? 'Setup' : category
      };
    });

    // Update proposal with new phases and assign services
    const updatedServiceInstances = proposal.serviceInstances.map(service => {
      const template = serviceLibrary.find(t => t.id === service.serviceTemplateId);
      const category = template?.category || 'Other';
      const phase = newPhases.find(p => 
        (category === 'Foundation' && p.name === 'Foundation Building') ||
        (category === 'Enrichment' && p.name === 'Enrichment') ||
        (category === 'Integration' && p.name === 'Integrations') ||
        (category === 'CLE' && p.name === 'CLE Add-On') ||
        (category === 'Setup' && p.name === 'Setup') ||
        p.name === category
      );
      return {
        ...service,
        phaseId: phase?.id || null
      };
    });

    setProposal({
      ...proposal,
      phases: [...proposal.phases, ...newPhases],
      serviceInstances: updatedServiceInstances
    });
  };

  // Generate timeline from services
  const generateTimeline = () => {
    if (proposal.serviceInstances.length === 0) return [];

    // Group by phase
    const phasedServices = proposal.phases.map(phase => ({
      phase,
      services: proposal.serviceInstances.filter(s => s.phaseId === phase.id)
    })).filter(({ services }) => services.length > 0);

    // Add unassigned
    const unassigned = proposal.serviceInstances.filter(s => !s.phaseId);
    if (unassigned.length > 0) {
      phasedServices.push({
        phase: { id: 'unassigned', name: 'Unassigned' },
        services: unassigned
      });
    }

    let currentWeek = 1;
    const timeline = [];

    phasedServices.forEach(({ phase, services }) => {
      if (services.length === 0) return;

      // Phase duration is the max of all services (services can run in parallel)
      const phaseDuration = Math.max(...services.map(s => s.durationWeeks));
      const phaseStart = currentWeek;
      const phaseEnd = currentWeek + phaseDuration - 1;

      // Calculate total deliverables for this phase
      const allDeliverables = services.flatMap(s => s.deliverables);

      timeline.push({
        phaseId: phase.id,
        phaseName: phase.name,
        startWeek: phaseStart,
        endWeek: phaseEnd,
        durationWeeks: phaseDuration,
        services: services.map(s => {
          const template = serviceLibrary.find(t => t.id === s.serviceTemplateId);
          return {
            ...s,
            templateName: template?.name || 'Unknown Service'
          };
        }),
        deliverables: allDeliverables
      });

      currentWeek = phaseEnd + 1;
    });

    return timeline;
  };

  const timeline = generateTimeline();
  const totalPrice = proposal.serviceInstances.reduce((sum, s) => sum + s.price, 0);

  const handleSaveProposal = () => {
    // In production: POST to API
    console.log('Saving proposal:', proposal);
    alert('Proposal saved! (In production, this would save to the database)');
    navigate('/proposals');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isEditing ? 'Edit Proposal' : 'Create New Proposal'}
              </h1>
              <p className="text-gray-600">Select services from your library and organize them into phases</p>
            </div>
            <button
              onClick={() => navigate('/proposals')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>

          {/* Client Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  value={proposal.clientName}
                  onChange={(e) => setProposal({ ...proposal, clientName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={proposal.clientCompany}
                  onChange={(e) => setProposal({ ...proposal, clientCompany: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="BusinessPoint Law"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <textarea
                value={proposal.purpose}
                onChange={(e) => setProposal({ ...proposal, purpose: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Describe the purpose of this proposal..."
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Service Library */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Service Library</h2>
                <button
                  onClick={() => navigate('/proposals/service-library')}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Manage Services →
                </button>
              </div>

              {/* Search and Filter */}
              <div className="mb-4 flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All' : cat}</option>
                  ))}
                </select>
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-red-300 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {service.category}
                          </span>
                          <span className="text-xs text-gray-500">
                            {service.defaultDurationWeeks}w
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-gray-900">
                        ${service.defaultPrice.toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleAddService(service)}
                        className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phases */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Phases</h2>
                <div className="flex gap-2">
                  {proposal.serviceInstances.length > 0 && proposal.serviceInstances.filter(s => !s.phaseId).length > 0 && (
                    <button
                      onClick={autoGeneratePhases}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      title="Auto-organize services into phases by category"
                    >
                      Auto-Organize
                    </button>
                  )}
                  <input
                    type="text"
                    value={phaseName}
                    onChange={(e) => setPhaseName(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCreatePhase()}
                    placeholder="Phase name..."
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleCreatePhase}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    + Add Phase
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {proposal.phases.map((phase) => {
                  const phaseServices = proposal.serviceInstances.filter(s => s.phaseId === phase.id);
                  return (
                    <div key={phase.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900">{phase.name}</h3>
                        <button
                          onClick={() => handleRemovePhase(phase.id)}
                          className="text-red-600 hover:text-red-700 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      {phaseServices.length === 0 ? (
                        <p className="text-sm text-gray-500">No services assigned yet</p>
                      ) : (
                        <div className="space-y-2">
                          {phaseServices.map((service) => {
                            const template = serviceLibrary.find(t => t.id === service.serviceTemplateId);
                            return (
                              <div key={service.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">
                                    {service.customName || template?.name || 'Unknown'}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {service.durationWeeks} weeks • ${service.price.toLocaleString()}
                                  </p>
                                </div>
                                <button
                                  onClick={() => handleRemoveService(service.id)}
                                  className="text-red-600 hover:text-red-700 text-sm"
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Unassigned Services */}
                {proposal.serviceInstances.filter(s => !s.phaseId).length > 0 && (
                  <div className="border border-yellow-200 bg-yellow-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-3">Unassigned Services</h3>
                    <div className="space-y-2">
                      {proposal.serviceInstances.filter(s => !s.phaseId).map((service) => {
                        const template = serviceLibrary.find(t => t.id === service.serviceTemplateId);
                        return (
                          <div key={service.id} className="flex items-center justify-between bg-white p-2 rounded">
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                {service.customName || template?.name || 'Unknown'}
                              </p>
                              <p className="text-xs text-gray-500">
                                {service.durationWeeks} weeks • ${service.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <select
                                value=""
                                onChange={(e) => {
                                  if (e.target.value) {
                                    handleAssignToPhase(service.id, e.target.value);
                                  }
                                }}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="">Assign to phase...</option>
                                {proposal.phases.map(phase => (
                                  <option key={phase.id} value={phase.id}>{phase.name}</option>
                                ))}
                              </select>
                              <button
                                onClick={() => handleRemoveService(service.id)}
                                className="text-red-600 hover:text-red-700 text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Timeline & Summary */}
          <div className="space-y-6">
            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Timeline</h2>
              {timeline.length === 0 ? (
                <p className="text-sm text-gray-500">Add services to see timeline</p>
              ) : (
                <div className="space-y-4">
                  {timeline.map((item) => (
                    <div key={item.phaseId} className="border-l-4 border-red-500 pl-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.phaseName}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {item.durationWeeks} week{item.durationWeeks !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        Weeks {item.startWeek}-{item.endWeek}
                      </p>
                      <div className="space-y-1 mb-2">
                        {item.services.map((service) => (
                          <p key={service.id} className="text-xs text-gray-500">
                            • {service.templateName} ({service.durationWeeks}w)
                          </p>
                        ))}
                      </div>
                      {item.deliverables && item.deliverables.length > 0 && (
                        <div className="mt-2 pt-2 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-700 mb-1">Deliverables:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.deliverables.slice(0, 3).map((deliverable, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {deliverable}
                              </span>
                            ))}
                            {item.deliverables.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                +{item.deliverables.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {timeline.length > 0 && (
                    <div className="pt-4 border-t border-gray-200 mt-4">
                      <p className="text-sm font-medium text-gray-700">
                        Total Duration: {timeline[timeline.length - 1].endWeek} weeks
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Services</span>
                  <span className="font-medium">{proposal.serviceInstances.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phases</span>
                  <span className="font-medium">{proposal.phases.length}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-lg font-bold text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveProposal}
              disabled={!proposal.clientName || !proposal.clientCompany || proposal.serviceInstances.length === 0}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Save Proposal
            </button>
          </div>
        </div>

        {/* Service Customization Modal */}
        {showServiceModal && selectedServiceTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Add Service</h2>
              <p className="text-gray-600 mb-6">
                You can customize this service or use defaults. Assign it to a phase or leave unassigned.
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    defaultValue={selectedServiceTemplate.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Custom name (optional)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    defaultValue={selectedServiceTemplate.defaultDurationWeeks}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input
                    type="number"
                    defaultValue={selectedServiceTemplate.defaultPrice}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign to Phase (Optional)</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                    <option value="">Unassigned</option>
                    {proposal.phases.map(phase => (
                      <option key={phase.id} value={phase.id}>{phase.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleConfirmAddService()}
                  className="flex-1 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Add with Defaults
                </button>
                <button
                  onClick={() => setShowServiceModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

