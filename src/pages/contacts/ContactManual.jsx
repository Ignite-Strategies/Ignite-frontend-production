import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Mail, Phone, Briefcase, FileText, Filter, Info, CheckCircle, Plus, X } from 'lucide-react';
import { mapFormToContact, mapFormToCompany, mapFormToPipeline, validateContactForm, getPipelineStages } from '../../services/contactFieldMapper';
import api from '../../lib/api';

export default function ContactManual() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Required
    firstName: 'Joel',
    lastName: 'Gulick',
    
    // Basic contact info
    goesBy: '',
    email: 'joel.gulick@businesspointlaw.com',
    phone: '',
    title: '',
    
    // Company
    companyName: 'BusinessPoint Law',
    companyURL: '',
    companyIndustry: '',
    
    // Pipeline
    pipeline: '',
    stage: '',
    
    // Additional
    notes: '',
    buyerDecision: '',
    howMet: ''
  });
  
  const [saving, setSaving] = useState(false);
  const [pipelineStages, setPipelineStages] = useState([]);
  const [pipelineConfig, setPipelineConfig] = useState(null);
  const [buyerDecisionConfig, setBuyerDecisionConfig] = useState(null);
  const [howMetConfig, setHowMetConfig] = useState(null);
  const [errors, setErrors] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [createdContact, setCreatedContact] = useState(null);

  // Fetch pipeline config, buyerDecision, and howMet configs on mount
  useEffect(() => {
    const fetchConfigs = async () => {
      try {
        // Try to fetch from backend
        const response = await api.get('/api/pipelines/config');
        if (response.data.success) {
          if (response.data.pipelines) {
            setPipelineConfig(response.data.pipelines);
          }
          if (response.data.buyerDecision) {
            setBuyerDecisionConfig(response.data.buyerDecision);
          }
          if (response.data.howMet) {
            setHowMetConfig(response.data.howMet);
          }
          console.log('✅ Configs loaded from backend');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.warn('⚠️ Could not fetch configs from backend, using defaults:', err.message);
        // Fallback to default config
        setPipelineConfig({
          prospect: ['interest', 'meeting', 'proposal', 'contract', 'contract-signed'],
          client: ['kickoff', 'work-started', 'work-delivered', 'sustainment', 'renewal', 'terminated-contract'],
          collaborator: ['interest', 'meeting', 'moa', 'agreement'],
          institution: ['interest', 'meeting', 'moa', 'agreement']
        });
      }
    };
    
    fetchConfigs();
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
      companyURL: '',
      companyIndustry: '',
      pipeline: formData.pipeline, // Keep pipeline selection
      stage: '',
      notes: '',
      buyerDecision: '',
      howMet: ''
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
    console.log('📝 Form submit started');
    setErrors([]);
    
    // Validate
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      console.warn('❌ Form validation failed:', validation.errors);
      setErrors(validation.errors);
      return;
    }

    console.log('✅ Form validation passed');
    setSaving(true);
    console.log('💾 Saving state set to true');

    try {
      // Get CompanyHQ ID from localStorage
      const companyHQId = localStorage.getItem('companyHQId');
      console.log('🏢 CompanyHQId from localStorage:', companyHQId);
      
      if (!companyHQId) {
        console.error('❌ No CompanyHQId found');
        alert('Company not found. Please set up your company first.');
        navigate('/company/create-or-choose');
        setSaving(false);
        return;
      }

      // Map form data to models
      console.log('📋 Mapping form data...');
      const contactData = mapFormToContact(formData, companyHQId);
      const companyData = mapFormToCompany(formData, companyHQId);
      const pipelineData = mapFormToPipeline(formData);
      
      console.log('📤 Contact data:', contactData);
      console.log('🏢 Company data:', companyData);
      console.log('📊 Pipeline data:', pipelineData);

      // Call universal contact create route
      console.log('🚀 Calling /api/contacts/universal-create...');
      const response = await api.post('/api/contacts/universal-create', {
        contact: contactData,
        company: companyData, // Can be null
        pipeline: pipelineData // Can be null
      });

      console.log('✅ Contact created successfully!');
      console.log('📦 Response data:', response.data);
      console.log('📦 Contact object:', response.data?.contact);

      // Show success state inline
      const successData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.companyName,
        title: formData.title,
        pipeline: formData.pipeline,
        stage: formData.stage
      };
      console.log('🎉 Setting success state with data:', successData);
      setCreatedContact(successData);
      setShowSuccess(true);
      console.log('✅ Success state set, form should show success message');
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('❌ Contact creation error:', error);
      console.error('❌ Error response:', error.response);
      console.error('❌ Error data:', error.response?.data);
      console.error('❌ Error message:', error.message);
      const errorMessage = error.response?.data?.error || error.response?.data?.details || error.message || 'Failed to create contact. Please try again.';
      console.error('❌ Displaying error:', errorMessage);
      alert(errorMessage);
      setErrors([errorMessage]);
    } finally {
      console.log('🏁 Finally block - setting saving to false');
      setSaving(false);
      console.log('✅ Saving state reset');
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

      {/* Success Display */}
      {showSuccess && createdContact && (
        <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">✅ Contact Created Successfully!</h3>
                <p className="text-sm text-green-800 mb-2">
                  <strong>{createdContact.firstName} {createdContact.lastName}</strong>
                  {createdContact.email && ` (${createdContact.email})`}
                  {createdContact.companyName && ` from ${createdContact.companyName}`}
                  {createdContact.pipeline && ` - ${createdContact.pipeline} pipeline`}
                </p>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={handleAddAnother}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                  >
                    Add Another Contact
                  </button>
                  <button
                    onClick={handleDismissSuccess}
                    className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition text-sm font-medium"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={handleDismissSuccess}
              className="text-green-600 hover:text-green-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

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
                <p className="mt-1 text-xs text-gray-500">Company details will be enriched automatically</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyURL" className="block text-sm font-medium text-gray-700 mb-2">
                    Company Website URL
                  </label>
                  <input
                    type="url"
                    id="companyURL"
                    name="companyURL"
                    value={formData.companyURL}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com"
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
                    placeholder="Industry or sector (optional - can be inferred)"
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
                  <select
                    id="howMet"
                    name="howMet"
                    value={formData.howMet}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select how you met...</option>
                    {howMetConfig && Object.entries(howMetConfig.labels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="buyerDecision" className="block text-sm font-medium text-gray-700 mb-2">
                    Buyer Decision Type
                  </label>
                  <select
                    id="buyerDecision"
                    name="buyerDecision"
                    value={formData.buyerDecision}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select buyer type...</option>
                    {buyerDecisionConfig && Object.entries(buyerDecisionConfig.labels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
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
