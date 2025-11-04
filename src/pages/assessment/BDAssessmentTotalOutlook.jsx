import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function BDAssessmentTotalOutlook() {
  const navigate = useNavigate();
  const [baselineData, setBaselineData] = useState(null);
  const [calculations, setCalculations] = useState({
    totalReach: 0,
    monthlyLeads: 0,
    conversionRate: 0,
    monthlyCustomers: 0,
    costPerLead: 0,
    costPerCustomer: 0
  });

  useEffect(() => {
    // Load BD baseline data from localStorage
    const savedData = localStorage.getItem('bdBaselineData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBaselineData(data.baseline);
      
      // Calculate values
      const { socialFollowers, emailListSize, websiteTraffic, activeLeads, monthlySpend, primaryChannel } = data.baseline;
      if (socialFollowers && emailListSize && websiteTraffic && activeLeads) {
        const totalReach = parseInt(socialFollowers) + parseInt(emailListSize) + parseInt(websiteTraffic);
        const monthlyLeads = Math.round(totalReach * 0.02); // 2% conversion to leads
        const conversionRate = activeLeads > 0 ? (parseInt(activeLeads) / monthlyLeads) * 100 : 0;
        const monthlyCustomers = Math.round(monthlyLeads * (conversionRate / 100));
        const costPerLead = monthlySpend > 0 ? parseInt(monthlySpend) / monthlyLeads : 0;
        const costPerCustomer = monthlyCustomers > 0 ? parseInt(monthlySpend) / monthlyCustomers : 0;
        
        setCalculations({
          totalReach,
          monthlyLeads,
          conversionRate,
          monthlyCustomers,
          costPerLead,
          costPerCustomer
        });
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setBaselineData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Recalculate on change
    const updatedData = { ...baselineData, [field]: value };
    if (updatedData.socialFollowers && updatedData.emailListSize && updatedData.websiteTraffic && updatedData.activeLeads) {
      const totalReach = parseInt(updatedData.socialFollowers) + parseInt(updatedData.emailListSize) + parseInt(updatedData.websiteTraffic);
      const monthlyLeads = Math.round(totalReach * 0.02);
      const conversionRate = updatedData.activeLeads > 0 ? (parseInt(updatedData.activeLeads) / monthlyLeads) * 100 : 0;
      const monthlyCustomers = Math.round(monthlyLeads * (conversionRate / 100));
      const costPerLead = updatedData.monthlySpend > 0 ? parseInt(updatedData.monthlySpend) / monthlyLeads : 0;
      const costPerCustomer = monthlyCustomers > 0 ? parseInt(updatedData.monthlySpend) / monthlyCustomers : 0;
      
      setCalculations({
        totalReach,
        monthlyLeads,
        conversionRate,
        monthlyCustomers,
        costPerLead,
        costPerCustomer
      });
    }
  };

  const handleConfirm = () => {
    // Save confirmed data
    localStorage.setItem('bdBaselineConfirmed', JSON.stringify({
      baselineData,
      calculations,
      confirmed: true,
      timestamp: new Date().toISOString()
    }));
    
    // Navigate to results
    navigate('/assessment-results');
  };

  const handleEdit = () => {
    // Go back to edit BD baseline data
    navigate('/bd-baseline-assessment');
  };

  if (!baselineData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
        <Navigation />
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-white mb-4">No BD Baseline Data Found</h1>
            <p className="text-white/80 mb-8">Please complete the BD baseline assessment first.</p>
            <button
              onClick={() => navigate('/bd-baseline-assessment')}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Go to BD Baseline Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getChannelInsights = () => {
    const channel = baselineData.primaryChannel;
    const insights = {
      referrals: "Referrals are your strongest channel - focus on customer satisfaction and referral programs",
      social: "Social media is working - consider increasing content frequency and engagement",
      ads: "Paid ads are generating leads - optimize your targeting and landing pages",
      content: "Content marketing is effective - double down on SEO and valuable content",
      outreach: "Cold outreach is working - systematize your process and scale your efforts",
      events: "Events are generating leads - attend more and improve your follow-up process",
      none: "You're not actively marketing yet - this is a huge opportunity for growth"
    };
    return insights[channel] || "Your current channel is generating some results";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">📊</div>
            <h1 className="text-5xl font-black text-white mb-4">
              Your BD Baseline Outlook
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Let's verify your current business development foundation
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* BD Summary */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Current BD Foundation</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Audience & Reach</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Social Followers</label>
                      <input
                        type="number"
                        value={baselineData.socialFollowers}
                        onChange={(e) => handleInputChange('socialFollowers', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Email List Size</label>
                      <input
                        type="number"
                        value={baselineData.emailListSize}
                        onChange={(e) => handleInputChange('emailListSize', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Monthly Website Traffic</label>
                      <input
                        type="number"
                        value={baselineData.websiteTraffic}
                        onChange={(e) => handleInputChange('websiteTraffic', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Active Leads in Pipeline</label>
                      <input
                        type="number"
                        value={baselineData.activeLeads}
                        onChange={(e) => handleInputChange('activeLeads', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Investment & Channel</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Monthly BD Spend ($)</label>
                      <input
                        type="number"
                        value={baselineData.monthlySpend}
                        onChange={(e) => handleInputChange('monthlySpend', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Primary Channel</label>
                      <select
                        value={baselineData.primaryChannel}
                        onChange={(e) => handleInputChange('primaryChannel', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="referrals">Referrals / Word of Mouth</option>
                        <option value="social">Social Media</option>
                        <option value="ads">Paid Ads</option>
                        <option value="content">Content Marketing / SEO</option>
                        <option value="outreach">Cold Outreach / Sales</option>
                        <option value="events">Events / Networking</option>
                        <option value="none">Not actively marketing yet</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Analysis */}
            <div className="mb-8 p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">📈</span>
                Performance Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    {calculations.totalReach.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Total Reach</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-400">
                    {calculations.monthlyLeads}
                  </div>
                  <div className="text-sm text-white/70">Monthly Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {calculations.monthlyCustomers}
                  </div>
                  <div className="text-sm text-white/70">Monthly Customers</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">
                    ${calculations.costPerLead.toFixed(0)}
                  </div>
                  <div className="text-sm text-white/70">Cost per Lead</div>
                </div>
                <div className="text-center p-4 bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">
                    ${calculations.costPerCustomer.toFixed(0)}
                  </div>
                  <div className="text-sm text-white/70">Cost per Customer</div>
                </div>
              </div>
            </div>

            {/* Channel Insights */}
            <div className="mb-8 p-6 bg-blue-500/20 rounded-2xl border border-blue-400/30">
              <h3 className="text-xl font-bold text-white mb-4">Channel Insights</h3>
              <p className="text-white/90 mb-4">{getChannelInsights()}</p>
              <div className="space-y-2 text-white/80 text-sm">
                <p>• Your conversion rate is {calculations.conversionRate.toFixed(1)}%</p>
                <p>• You're generating {calculations.monthlyLeads} leads per month from {calculations.totalReach.toLocaleString()} total reach</p>
                <p>• Your cost per customer is ${calculations.costPerCustomer.toFixed(0)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleEdit}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                ← Edit BD Data
              </button>
              <button
                onClick={handleConfirm}
                className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
              >
                This Looks Good → View Results
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Step 5 of 5: BD Baseline - Your current foundation for growth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
