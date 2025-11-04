import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function Assessment() {
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    company: '',
    industry: ''
  });

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save contact info to localStorage
    localStorage.setItem('assessmentContact', JSON.stringify(contactInfo));
    
    // Navigate to revenue stack
    navigate('/revenue');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      
      <div className="max-w-4xl mx-auto p-8">
        <div className="text-center mb-8">
          <div className="text-6xl mb-6">🔥</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Let's Ignite Your Growth
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Complete our assessment to unlock your business development potential
          </p>
          <p className="text-lg text-white/80 mb-8">
            This will take about 5-7 minutes and help us understand your growth goals.
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Let's get started!</h2>
          <p className="text-lg text-white/90 mb-8 text-center">
            First, let's get some basic information from you:
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., John Smith"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Email Address</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="e.g., john@company.com"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Company Name</label>
                <input
                  type="text"
                  value={contactInfo.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="e.g., Acme Corp"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-2">Industry</label>
                <input
                  type="text"
                  value={contactInfo.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Technology, Legal, Healthcare"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Start Assessment →'}
              </button>
              
              <p className="text-white/60 text-sm mt-4">
                This assessment is designed for founders and CEOs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}