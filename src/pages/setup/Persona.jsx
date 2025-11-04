import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hydratePersonas, savePersonas } from '../../utils/personaData';
import { DEMO_PERSONAS } from '../../data/demoPersonas';

// Persona Card Component
function PersonaCard({ persona, onEdit, onDelete }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{persona.name}</h3>
          <p className="text-gray-600">{persona.title}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(persona.id)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(persona.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Demographics</h4>
          <p className="text-sm text-gray-600">
            {persona.age} • {persona.location} • {persona.companySize}
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Priorities</h4>
          <p className="text-sm text-gray-600">{persona.priorities}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Goals</h4>
          <p className="text-sm text-gray-600">{persona.goals}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Channels</h4>
          <p className="text-sm text-gray-600">{persona.channels}</p>
        </div>
        
        {persona.pitchStrategy && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">How We Pitch Them</h4>
            <p className="text-sm text-gray-600">{persona.pitchStrategy}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Persona Form Component
function PersonaForm({ persona, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    age: '',
    location: '',
    companySize: '',
    priorities: '',
    goals: '',
    channels: '',
    budget: '',
    decisionProcess: '',
    objections: '',
    pitchStrategy: ''
  });

  useEffect(() => {
    if (persona) {
      setFormData(persona);
    }
  }, [persona]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {persona ? 'Edit Persona' : 'Create New Persona'}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Sarah the Startup Founder"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title/Role</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., CEO, Marketing Director"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
            <select
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Age Range</option>
              <option value="25-34">25-34</option>
              <option value="35-44">35-44</option>
              <option value="45-54">45-54</option>
              <option value="55-64">55-64</option>
              <option value="65+">65+</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., San Francisco, CA"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
            <select
              value={formData.companySize}
              onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            >
              <option value="">Select Company Size</option>
              <option value="1-10 employees">1-10 employees</option>
              <option value="11-50 employees">11-50 employees</option>
              <option value="51-200 employees">51-200 employees</option>
              <option value="201-1000 employees">201-1000 employees</option>
              <option value="1000+ employees">1000+ employees</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
            <select
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select Budget Range</option>
              <option value="Under $10K">Under $10K</option>
              <option value="$10K - $50K">$10K - $50K</option>
              <option value="$50K - $100K">$50K - $100K</option>
              <option value="$100K - $500K">$100K - $500K</option>
              <option value="$500K+">$500K+</option>
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Priorities</label>
          <textarea
            value={formData.priorities}
            onChange={(e) => setFormData({ ...formData, priorities: e.target.value })}
            placeholder="What are they focused on maximizing or achieving? What opportunities or challenges are they prioritizing? (e.g., Looking to maximize ROI, seeking to scale partnerships, etc.)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Goals</label>
          <textarea
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            placeholder="What are they trying to achieve? What success looks like to them?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="3"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Channels</label>
          <textarea
            value={formData.channels}
            onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
            placeholder="Where do they spend time? LinkedIn, email, events, referrals, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="2"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Process</label>
          <textarea
            value={formData.decisionProcess}
            onChange={(e) => setFormData({ ...formData, decisionProcess: e.target.value })}
            placeholder="How do they make decisions? Who else is involved?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Common Objections</label>
          <textarea
            value={formData.objections}
            onChange={(e) => setFormData({ ...formData, objections: e.target.value })}
            placeholder="What concerns or objections do they typically have?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">How We Might Pitch Them</label>
          <textarea
            value={formData.pitchStrategy}
            onChange={(e) => setFormData({ ...formData, pitchStrategy: e.target.value })}
            placeholder="What messaging resonates with them? How should we approach them? What value proposition should we lead with? (e.g., Focus on ROI and time-to-value. Emphasize proven track record with similar companies...)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            rows="3"
          />
        </div>
        
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            {persona ? 'Update Persona' : 'Create Persona'}
          </button>
        </div>
      </form>
    </div>
  );
}

// Main Persona Component
export default function Persona() {
  const navigate = useNavigate();
  const [personas, setPersonas] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPersona, setEditingPersona] = useState(null);

  // Load data on mount - hydrate with demo data if no existing data
  useEffect(() => {
    const hydratedPersonas = hydratePersonas(DEMO_PERSONAS);
    setPersonas(hydratedPersonas);
  }, []);

  const handleSave = (personaData) => {
    let updatedPersonas;
    
    if (editingPersona) {
      // Update existing persona
      updatedPersonas = personas.map(p => 
        p.id === editingPersona.id ? { ...personaData, id: editingPersona.id } : p
      );
    } else {
      // Create new persona
      updatedPersonas = [...personas, { ...personaData, id: Date.now() }];
    }
    
    setPersonas(updatedPersonas);
    savePersonas(updatedPersonas);
    
    setShowForm(false);
    setEditingPersona(null);
  };

  const handleEdit = (personaId) => {
    const persona = personas.find(p => p.id === personaId);
    setEditingPersona(persona);
    setShowForm(true);
  };

  const handleDelete = (personaId) => {
    const updatedPersonas = personas.filter(p => p.id !== personaId);
    setPersonas(updatedPersonas);
    savePersonas(updatedPersonas);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPersona(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Persona Development</h1>
              <p className="text-gray-600">Define and refine your ideal profiles - buyers, collaborators, partners, and more</p>
            </div>
          </div>

          {!showForm ? (
            <div className="space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="text-6xl mb-4">👥</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">All Personas</h2>
                <p className="text-gray-600 mb-8">
                  Create detailed personas for buyers, collaborators, partners, and any key relationships.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Create New Persona
                </button>
              </div>

              {/* Personas Grid */}
              {personas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {personas.map((persona) => (
                    <PersonaCard
                      key={persona.id}
                      persona={persona}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No Personas Yet</h3>
                  <p className="text-gray-600 mb-6">
                    Start by creating your first buyer persona to better understand your target audience.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Create Your First Persona
                  </button>
                </div>
              )}
            </div>
          ) : (
            <PersonaForm
              persona={editingPersona}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
}
