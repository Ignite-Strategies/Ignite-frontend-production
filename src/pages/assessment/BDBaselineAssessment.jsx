import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function BDBaselineAssessment() {
  const navigate = useNavigate();
  const [baseline, setBaseline] = useState({
    socialFollowers: '',
    founderNetwork: '',
    currentFunnel: ''
  });

  const handleInputChange = (field, value) => {
    setBaseline(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // Save baseline data
    const dataToSave = {
      baseline,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('bdBaselineData', JSON.stringify(dataToSave));
    
    // Navigate to simple results page
    navigate('/bd-baseline-results');
  };

  const isComplete = () => {
    return baseline.bdTeamSize && 
           baseline.bdExperience && 
           baseline.currentPipeline && 
           baseline.avgDealSize &&
           baseline.primaryChannel !== 'none';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-4xl font-black text-white mb-4">
              Let's See Where You're At
            </h1>
            <p className="text-xl text-white/90">
              Before we plan growth, let's understand your current baseline
            </p>
          </div>

          {/* Baseline Questions */}
          <div className="space-y-6">
            
            {/* Social Media Presence */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">Social Media Presence</h3>
              <p className="text-white/70 text-sm mb-4">
                Even if you don't actively post, followers indicate brand awareness
              </p>
              <input
                type="number"
                value={baseline.socialFollowers}
                onChange={(e) => handleInputChange('socialFollowers', e.target.value)}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-white/60 text-xs mt-2">
                Combined followers across all platforms
              </p>
            </div>

            {/* Email List */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">Email List Size</h3>
              <p className="text-white/70 text-sm mb-4">
                Your owned audience - the most valuable marketing asset
              </p>
              <input
                type="number"
                value={baseline.emailListSize}
                onChange={(e) => handleInputChange('emailListSize', e.target.value)}
                placeholder="e.g., 1000"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-white/60 text-xs mt-2">
                Total email contacts (put 0 if you don't have a list)
              </p>
            </div>

            {/* Website Traffic */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">Monthly Website Traffic</h3>
              <p className="text-white/70 text-sm mb-4">
                How many people visit your site each month
              </p>
              <input
                type="number"
                value={baseline.websiteTraffic}
                onChange={(e) => handleInputChange('websiteTraffic', e.target.value)}
                placeholder="e.g., 500"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-white/60 text-xs mt-2">
                Rough estimate is fine (put 0 if you don't know)
              </p>
            </div>

            {/* Active Leads */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">Active Leads in Pipeline</h3>
              <p className="text-white/70 text-sm mb-4">
                People you're currently talking to about doing business
              </p>
              <input
                type="number"
                value={baseline.activeLeads}
                onChange={(e) => handleInputChange('activeLeads', e.target.value)}
                placeholder="e.g., 10"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Monthly BD Spend */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">Current Monthly BD Spend</h3>
              <p className="text-white/70 text-sm mb-4">
                What you spend on ads, tools, or BD staff
              </p>
              <div className="flex items-center gap-3">
                <span className="text-white text-xl font-bold">$</span>
                <input
                  type="number"
                  value={baseline.monthlySpend}
                  onChange={(e) => handleInputChange('monthlySpend', e.target.value)}
                  placeholder="e.g., 2000"
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <p className="text-white/60 text-xs mt-2">
                Put 0 if you're not spending on BD yet
              </p>
            </div>

            {/* Primary Channel */}
            <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="text-xl font-semibold text-white mb-4">How Do You Currently Get Customers?</h3>
              <div className="space-y-3">
                {[
                  { value: 'referrals', label: 'Referrals / Word of Mouth' },
                  { value: 'social', label: 'Social Media' },
                  { value: 'ads', label: 'Paid Ads (Google, LinkedIn, etc.)' },
                  { value: 'content', label: 'Content Marketing / SEO' },
                  { value: 'outreach', label: 'Cold Outreach / Sales' },
                  { value: 'events', label: 'Events / Networking' },
                  { value: 'none', label: 'Not actively marketing yet' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="primaryChannel"
                      value={option.value}
                      checked={baseline.primaryChannel === option.value}
                      onChange={(e) => handleInputChange('primaryChannel', e.target.value)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-white/90">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
            >
              Show Me What I Need To Grow →
            </button>
            <p className="text-white/70 text-sm mt-4">
              Next: We'll calculate the gap between where you are and where you want to be
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

