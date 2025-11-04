import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function ServiceLibrary() {
  const navigate = useNavigate();
  const [services, setServices] = useState([
    // Default services based on your examples
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

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Setup', 'Enrichment', 'Foundation', 'Integration', 'CLE'];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Setup',
    defaultDurationWeeks: 2,
    defaultDeliverables: [''],
    defaultPrice: 0,
    tags: ['']
  });

  const handleAddService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      name: formData.name,
      description: formData.description,
      category: formData.category,
      defaultDurationWeeks: formData.defaultDurationWeeks,
      defaultDeliverables: formData.defaultDeliverables.filter(d => d.trim()),
      defaultPrice: formData.defaultPrice,
      tags: formData.tags.filter(t => t.trim()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingService) {
      setServices(services.map(s => s.id === editingService.id ? { ...newService, id: editingService.id } : s));
      setEditingService(null);
    } else {
      setServices([...services, newService]);
    }

    setShowAddForm(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: 'Setup',
      defaultDurationWeeks: 2,
      defaultDeliverables: [''],
      defaultPrice: 0,
      tags: ['']
    });
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      category: service.category || 'Setup',
      defaultDurationWeeks: service.defaultDurationWeeks,
      defaultDeliverables: service.defaultDeliverables.length > 0 ? service.defaultDeliverables : [''],
      defaultPrice: service.defaultPrice,
      tags: service.tags && service.tags.length > 0 ? service.tags : ['']
    });
    setShowAddForm(true);
  };

  const handleDelete = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.tags && service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addDeliverableField = () => {
    setFormData({ ...formData, defaultDeliverables: [...formData.defaultDeliverables, ''] });
  };

  const updateDeliverable = (index, value) => {
    const updated = [...formData.defaultDeliverables];
    updated[index] = value;
    setFormData({ ...formData, defaultDeliverables: updated });
  };

  const removeDeliverable = (index) => {
    const updated = formData.defaultDeliverables.filter((_, i) => i !== index);
    setFormData({ ...formData, defaultDeliverables: updated.length > 0 ? updated : [''] });
  };

  const addTagField = () => {
    setFormData({ ...formData, tags: [...formData.tags, ''] });
  };

  const updateTag = (index, value) => {
    const updated = [...formData.tags];
    updated[index] = value;
    setFormData({ ...formData, tags: updated });
  };

  const removeTag = (index) => {
    const updated = formData.tags.filter((_, i) => i !== index);
    setFormData({ ...formData, tags: updated.length > 0 ? updated : [''] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Service Library</h1>
            <p className="text-gray-600">Define reusable services that can be added to proposals</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/proposals')}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Proposals
            </button>
            <button
              onClick={() => {
                resetForm();
                setEditingService(null);
                setShowAddForm(true);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              + Add Service
            </button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400">🔍</span>
            </div>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
            ))}
          </select>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="mb-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="e.g., Platform Setup"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {categories.filter(c => c !== 'all').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Describe what this service includes..."
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (Weeks)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.defaultDurationWeeks}
                    onChange={(e) => setFormData({ ...formData, defaultDurationWeeks: parseInt(e.target.value) || 1 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Price ($)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.defaultPrice}
                    onChange={(e) => setFormData({ ...formData, defaultPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Deliverables</label>
                <div className="space-y-2">
                  {formData.defaultDeliverables.map((deliverable, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={deliverable}
                        onChange={(e) => updateDeliverable(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Deliverable name..."
                      />
                      {formData.defaultDeliverables.length > 1 && (
                        <button
                          onClick={() => removeDeliverable(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addDeliverableField}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    + Add Deliverable
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <div className="space-y-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={tag}
                        onChange={(e) => updateTag(index, e.target.value)}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tag..."
                      />
                      {formData.tags.length > 1 && (
                        <button
                          onClick={() => removeTag(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={addTagField}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    + Add Tag
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddService}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  {editingService ? 'Update Service' : 'Create Service'}
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingService(null);
                    resetForm();
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                      {service.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {service.defaultDurationWeeks} week{service.defaultDurationWeeks !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-500 mb-2">Deliverables:</p>
                <div className="flex flex-wrap gap-1">
                  {service.defaultDeliverables.slice(0, 3).map((deliverable, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {deliverable}
                    </span>
                  ))}
                  {service.defaultDeliverables.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{service.defaultDeliverables.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Default Price</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${service.defaultPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              {service.tags && service.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-1">
                  {service.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(service)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500 text-lg mb-2">No services found</p>
            <p className="text-sm text-gray-400">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first service to get started'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

