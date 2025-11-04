import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function CompanyProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    yearsInBusiness: '',
    industry: '',
    annualRevenue: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get adminId from localStorage
      const adminId = localStorage.getItem('adminId');
      
      // Create company
      const response = await api.post('/companies', {
        ...formData,
        adminId
      });
      
      console.log('Company created:', response.data);
      
      // Store company ID
      localStorage.setItem('companyId', response.data.id);
      
      // Redirect to main dashboard
      navigate('/companydashboard');
      
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
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ignite Strategies" className="h-16 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Create Your Company</h1>
          <p className="text-white/80 text-lg">Tell us about your business to get started</p>
        </div>

        {/* Company Profile Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Company Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your company name"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-white mb-2">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your company address"
              />
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
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="" className="bg-gray-800">Select years</option>
                  <option value="0-1" className="bg-gray-800">0-1 years</option>
                  <option value="2-5" className="bg-gray-800">2-5 years</option>
                  <option value="6-10" className="bg-gray-800">6-10 years</option>
                  <option value="11-20" className="bg-gray-800">11-20 years</option>
                  <option value="20+" className="bg-gray-800">20+ years</option>
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
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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

            <div>
              <label htmlFor="annualRevenue" className="block text-sm font-medium text-white mb-2">
                Annual Revenue
              </label>
              <select
                id="annualRevenue"
                name="annualRevenue"
                value={formData.annualRevenue}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="" className="bg-gray-800">Select revenue range</option>
                <option value="0-100k" className="bg-gray-800">$0 - $100K</option>
                <option value="100k-500k" className="bg-gray-800">$100K - $500K</option>
                <option value="500k-1m" className="bg-gray-800">$500K - $1M</option>
                <option value="1m-5m" className="bg-gray-800">$1M - $5M</option>
                <option value="5m-10m" className="bg-gray-800">$5M - $10M</option>
                <option value="10m+" className="bg-gray-800">$10M+</option>
              </select>
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={() => navigate('/companycreateorchoose')}
                className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Company...' : 'Create Company →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
