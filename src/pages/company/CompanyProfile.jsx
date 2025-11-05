import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: 'Ignite Strategies',
    whatYouDo: 'Business acquisition services for professional service solo founders.',
    companyStreet: '2604 N. George Mason Dr.',
    companyCity: 'Arlington',
    companyState: 'VA 22207',
    companyWebsite: 'www.ignitestrategies.co',
    yearsInBusiness: '',
    industry: '',
    annualRevenue: '',
    teamSize: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get ownerId from localStorage
      const ownerId = localStorage.getItem('ownerId') || localStorage.getItem('adminId');
      
      if (!ownerId) {
        alert('No owner ID found. Please sign up again.');
        navigate('/signup');
        return;
      }
      
      // Create CompanyHQ (not Company - CompanyHQ is the tenant container)
      // Dropdown values: yearsInBusiness, industry, annualRevenue, teamSize are strings
      const response = await api.post('/api/companyhq/create', {
        companyName: formData.companyName,
        whatYouDo: formData.whatYouDo,
        companyStreet: formData.companyStreet,
        companyCity: formData.companyCity,
        companyState: formData.companyState,
        companyWebsite: formData.companyWebsite,
        companyIndustry: formData.industry,
        companyAnnualRev: formData.annualRevenue ? parseFloat(formData.annualRevenue) : null,
        yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness) : null,
        teamSize: formData.teamSize,
        ownerId: ownerId
      });
      
      console.log('✅ CompanyHQ created:', response.data);
      
      // Store CompanyHQ ID
      if (response.data.companyHQ?.id) {
        localStorage.setItem('companyHQId', response.data.companyHQ.id);
        localStorage.setItem('companyHQ', JSON.stringify(response.data.companyHQ));
      }
      
      // Redirect to dashboard
      navigate('/growth-dashboard');
      
    } catch (error) {
      console.error('Company creation error:', error);
      alert('Company creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ignite Strategies" className="h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Create Your Company</h1>
          <p className="text-white/80 text-lg">Tell us about your business to get started</p>
        </div>

        {/* Company Profile Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-6 border border-white/20 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Enter your company name"
                required
              />
            </div>

            <div>
              <label htmlFor="whatYouDo" className="block text-sm font-medium text-white mb-2">
                What You Do *
              </label>
              <textarea
                id="whatYouDo"
                name="whatYouDo"
                value={formData.whatYouDo}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Describe what your company does"
                required
              />
            </div>

            <div>
              <label htmlFor="companyStreet" className="block text-sm font-medium text-white mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="companyStreet"
                name="companyStreet"
                value={formData.companyStreet}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="Street address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="companyCity" className="block text-sm font-medium text-white mb-2">
                  City
                </label>
                <input
                  type="text"
                  id="companyCity"
                  name="companyCity"
                  value={formData.companyCity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  placeholder="City"
                />
              </div>

              <div>
                <label htmlFor="companyState" className="block text-sm font-medium text-white mb-2">
                  State / Zip
                </label>
                <input
                  type="text"
                  id="companyState"
                  name="companyState"
                  value={formData.companyState}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  placeholder="State, ZIP"
                />
              </div>
            </div>

            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-white mb-2">
                Website
              </label>
              <input
                type="url"
                id="companyWebsite"
                name="companyWebsite"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                placeholder="www.example.com"
              />
              <p className="text-white/60 text-xs mt-2">
                Used for LinkedIn extraction and data enrichment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="yearsInBusiness" className="block text-sm font-medium text-white mb-2">
                  Years in Business
                </label>
                <select
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="" className="bg-gray-800">Select years</option>
                  <option value="0" className="bg-gray-800">0-1 years</option>
                  <option value="3" className="bg-gray-800">2-5 years</option>
                  <option value="8" className="bg-gray-800">6-10 years</option>
                  <option value="15" className="bg-gray-800">11-20 years</option>
                  <option value="25" className="bg-gray-800">20+ years</option>
                </select>
              </div>

              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-white mb-2">
                  Industry *
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  required
                >
                  <option value="" className="bg-gray-800">Select industry</option>
                  <option value="legal" className="bg-gray-800">Legal Services</option>
                  <option value="consulting" className="bg-gray-800">Consulting</option>
                  <option value="technology" className="bg-gray-800">Technology</option>
                  <option value="healthcare" className="bg-gray-800">Healthcare</option>
                  <option value="finance" className="bg-gray-800">Finance</option>
                  <option value="retail" className="bg-gray-800">Retail</option>
                  <option value="manufacturing" className="bg-gray-800">Manufacturing</option>
                  <option value="other" className="bg-gray-800">Other</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="annualRevenue" className="block text-sm font-medium text-white mb-2">
                  Annual Revenue
                </label>
                <select
                  id="annualRevenue"
                  name="annualRevenue"
                  value={formData.annualRevenue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                >
                  <option value="" className="bg-gray-800">Select revenue range</option>
                  <option value="50000" className="bg-gray-800">$0 - $100K</option>
                  <option value="300000" className="bg-gray-800">$100K - $500K</option>
                  <option value="750000" className="bg-gray-800">$500K - $1M</option>
                  <option value="3000000" className="bg-gray-800">$1M - $5M</option>
                  <option value="7500000" className="bg-gray-800">$5M - $10M</option>
                  <option value="15000000" className="bg-gray-800">$10M+</option>
                </select>
              </div>

              <div>
                <label htmlFor="teamSize" className="block text-sm font-medium text-white mb-2">
                  Team Size *
                </label>
                <select
                  id="teamSize"
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                  required
                >
                  <option value="" className="bg-gray-800">Select team size</option>
                  <option value="just-me" className="bg-gray-800">Just Me</option>
                  <option value="2-10" className="bg-gray-800">2-10 People</option>
                  <option value="11-50" className="bg-gray-800">11-50 People</option>
                  <option value="51-200" className="bg-gray-800">51-200 People</option>
                  <option value="200+" className="bg-gray-800">200+ People</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/company/create-or-choose')}
                className="flex-1 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all text-sm"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading ? 'Creating...' : 'Create Company →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
