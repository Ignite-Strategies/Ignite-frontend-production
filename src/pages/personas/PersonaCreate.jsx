import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function PersonaCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    age: '',
    location: '',
    companySize: '',
    painPoints: '',
    goals: '',
    channels: '',
    budget: '',
    decisionProcess: '',
    objections: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save to backend
    // For now, just console log and navigate back
    console.log('New Persona Created:', formData);
    alert('Persona created successfully!');
    navigate('/personas');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/personas"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Personas
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Client Persona</h1>
        <p className="text-gray-600 mb-8">Define a detailed profile for capital partners, portfolio managers, or other key client types</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., David Chen - Capital Partner"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title/Role <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Debt Financing Capital Partner, Portfolio Manager"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g., Ares Capital, Orion Holdings"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Age Range
              </label>
              <select
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., New York, NY"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Size
              </label>
              <select
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Company Size</option>
                <option value="Small (1-50 employees)">Small (1-50 employees)</option>
                <option value="Medium (51-200 employees)">Medium (51-200 employees)</option>
                <option value="Large (201-1000 employees)">Large (201-1000 employees)</option>
                <option value="Enterprise (1000+ employees)">Enterprise (1000+ employees)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Legal Services Budget
              </label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Budget Range</option>
                <option value="Under $50K/year">Under $50K/year</option>
                <option value="$50K - $150K/year">$50K - $150K/year</option>
                <option value="$150K - $500K/year">$150K - $500K/year</option>
                <option value="$500K - $1M/year">$500K - $1M/year</option>
                <option value="$1M+/year">$1M+/year</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Pain Points <span className="text-red-500">*</span>
            </label>
            <textarea
              name="painPoints"
              value={formData.painPoints}
              onChange={handleChange}
              placeholder="What legal challenges do they face? What problems are they trying to solve? e.g., Managing complex deal structures requires rapid legal document turnaround..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="4"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Goals <span className="text-red-500">*</span>
            </label>
            <textarea
              name="goals"
              value={formData.goals}
              onChange={handleChange}
              placeholder="What are they trying to achieve? What success looks like to them? e.g., Accelerate deal execution while maintaining compliance..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Channels <span className="text-red-500">*</span>
            </label>
            <textarea
              name="channels"
              value={formData.channels}
              onChange={handleChange}
              placeholder="Where do they spend time? How do they prefer to be contacted? e.g., Industry conferences (ACLI, BDC forums), LinkedIn, direct referrals..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Decision Process
            </label>
            <textarea
              name="decisionProcess"
              value={formData.decisionProcess}
              onChange={handleChange}
              placeholder="How do they make decisions? Who else is involved? e.g., Executive-level decision with input from legal and business development..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Common Objections
            </label>
            <textarea
              name="objections"
              value={formData.objections}
              onChange={handleChange}
              placeholder="What concerns or objections do they typically have? e.g., Concerned about cost and time investment. Wants to see clear ROI..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
            />
          </div>
          
          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate('/personas')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Create Persona
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

