import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Phone, Briefcase, FileText, Filter, Info, CheckCircle, Plus, X } from 'lucide-react';
import { mapFormToContact, mapFormToCompany, mapFormToPipeline, validateContactForm, getPipelineStages } from '../../services/contactFieldMapper';
import api from '../../lib/api';

export default function ContactManual() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Required
    firstName: '',
    lastName: '',
    
    // Basic contact info
    goesBy: '',
    email: '',
    phone: '',
    title: '',
    
    // Company
    companyName: '',
    companyAddress: '',
    companyIndustry: '',
    
    // Pipeline
    pipeline: '',
    stage: '',
    
    // Additional
    notes: '',
    buyerDecision: '',
    howMet: '',
    photoURL: ''
  });
  
  const [saving, setSaving] = useState(false);
  const [pipelineStages, setPipelineStages] = useState([]);
  const [pipelineConfig, setPipelineConfig] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdContact, setCreatedContact] = useState(null);

  // Fetch pipeline config on mount
  useEffect(() => {
    const fetchPipelineConfig = async () => {
      try {
        // Try to fetch from backend
        const response = await api.get('/api/pipelines/config');
        if (response.data.success && response.data.pipelines) {
          setPipelineConfig(response.data.pipelines);
          console.log('✅ Pipeline config loaded from backend:', response.data.pipelines);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.warn('⚠️ Could not fetch pipeline config from backend, using defaults:', err.message);
        // Fallback to default config (matches backend config/pipelineConfig.js)
        setPipelineConfig({
          prospect: ['interest', 'meeting', 'proposal', 'negotiation', 'qualified'],
          client: ['onboarding', 'active', 'renewal', 'upsell'],
          collaborator: ['initial', 'active', 'partnership'],
          institution: ['awareness', 'engagement', 'partnership']
        });
      }
    };
    
    fetchPipelineConfig();
  }, []);

  // Update stages when pipeline changes
  useEffect(() => {
    if (formData.pipeline && pipelineConfig) {
      const stages = pipelineConfig[formData.pipeline] || [];
      setPipelineStages(stages);
      
      // Reset stage if current stage not in new pipeline
      if (formData.stage && !stages.includes(formData.stage)) {
        setFormData(prev => ({ ...prev, stage: '' }));
      }
    } else {
      setPipelineStages([]);
    }
  }, [formData.pipeline, pipelineConfig]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear errors and success when user types
    if (errors.length > 0) {
      setErrors([]);
    }
    if (showSuccess) {
      setShowSuccess(false);
      setCreatedContact(null);
    }
  };

  const handleAddAnother = () => {
    // Reset form but keep pipeline selection
    setFormData({
      firstName: '',
      lastName: '',
      goesBy: '',
      email: '',
      phone: '',
      title: '',
      companyName: '',
      companyAddress: '',
      companyIndustry: '',
      pipeline: formData.pipeline, // Keep pipeline selection
      stage: '',
      notes: '',
      buyerDecision: '',
      howMet: '',
      photoURL: ''
    });
    setShowSuccess(false);
    setCreatedContact(null);
    setErrors([]);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDismissSuccess = () => {
    setShowSuccess(false);
    setCreatedContact(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    
    // Validate
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setSaving(true);

    try {
      // Get CompanyHQ ID from localStorage
      const companyHQId = localStorage.getItem('companyHQId');
      
      if (!companyHQId) {
        alert('Company not found. Please set up your company first.');
        navigate('/company/create-or-choose');
        return;
      }

      // Map form data to models
      const contactData = mapFormToContact(formData, companyHQId);
      const companyData = mapFormToCompany(formData, companyHQId);
      const pipelineData = mapFormToPipeline(formData);

      // Call universal contact create route
      // This route handles: 1. Contact upsert, 2. Company upsert, 3. Pipeline upsert
      const response = await api.post('/api/contacts/universal-create', {
        contact: contactData,
        company: companyData, // Can be null
        pipeline: pipelineData // Can be null
      });

      console.log('✅ Contact created:', response.data);

      // Show success state inline
      setCreatedContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        title: formData.title,
        pipeline: formData.pipeline,
        stage: formData.stage
      });
      setShowSuccess(true);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Contact creation error:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Failed to create contact. Please try again.';
      alert(errorMessage);
      setErrors([errorMessage]);
    } finally {
      setSaving(false);
    }
  };

  const pipelineOptions = pipelineConfig ? Object.keys(pipelineConfig) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate('/contacts/upload')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Upload Options
        </button>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ➕ Add Contact Manually
        </h1>
        <p className="text-gray-600">
          Enter contact information - all fields in one place
        </p>
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">Please fix the following errors:</h3>
          <ul className="list-disc list-inside text-sm text-red-800">
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className={`bg-white rounded-xl shadow-lg p-8 ${showSuccess ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="space-y-8">
          
          {/* Required Fields Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Required Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Basic Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="goesBy" className="block text-sm font-medium text-gray-700 mb-2">
                  Goes By / Preferred Name
                </label>
                <input
                  type="text"
                  id="goesBy"
                  name="goesBy"
                  value={formData.goesBy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nickname or preferred name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="h-4 w-4 inline mr-1" />
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="h-4 w-4 inline mr-1" />
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Job title or role"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
                  <Building2 className="h-4 w-4 inline mr-1" />
                  Business Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Company or organization name"
                />
                <p className="mt-1 text-xs text-gray-500">Company will be created/upserted separately and linked to this contact</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Address
                  </label>
                  <input
                    type="text"
                    id="companyAddress"
                    name="companyAddress"
                    value={formData.companyAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label htmlFor="companyIndustry" className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <input
                    type="text"
                    id="companyIndustry"
                    name="companyIndustry"
                    value={formData.companyIndustry}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Industry or sector"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pipeline Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Deal Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="pipeline" className="block text-sm font-medium text-gray-700 mb-2">
                  <Filter className="h-4 w-4 inline mr-1" />
                  Pipeline Type
                </label>
                <select
                  id="pipeline"
                  name="pipeline"
                  value={formData.pipeline}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select pipeline...</option>
                  {pipelineOptions.map(pipeline => (
                    <option key={pipeline} value={pipeline}>
                      {pipeline.charAt(0).toUpperCase() + pipeline.slice(1)}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">Optional - can be set later</p>
              </div>
              {formData.pipeline && pipelineStages.length > 0 && (
                <div>
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-2">
                    Pipeline Stage
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select stage...</option>
                    {pipelineStages.map(stage => (
                      <option key={stage} value={stage}>
                        {stage.charAt(0).toUpperCase() + stage.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  <FileText className="h-4 w-4 inline mr-1" />
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell us what may be important to a deal, relationship context, or any other relevant information..."
                />
                <p className="mt-1 text-xs text-gray-500">
                  <Info className="h-3 w-3 inline mr-1" />
                  Include information that may be important to a deal or relationship
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="howMet" className="block text-sm font-medium text-gray-700 mb-2">
                    How We Met
                  </label>
                  <input
                    type="text"
                    id="howMet"
                    name="howMet"
                    value={formData.howMet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Conference, Referral, LinkedIn"
                  />
                </div>
                <div>
                  <label htmlFor="buyerDecision" className="block text-sm font-medium text-gray-700 mb-2">
                    Buyer Decision Type
                  </label>
                  <input
                    type="text"
                    id="buyerDecision"
                    name="buyerDecision"
                    value={formData.buyerDecision}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Senior Person, Product User"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-2">
                  Photo URL
                </label>
                <input
                  type="url"
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8 pt-6 border-t">
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Contact'}
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Only First Name and Last Name are required. All other fields are optional and can be added or updated later.
        </p>
      </div>
    </div>
  );
}
