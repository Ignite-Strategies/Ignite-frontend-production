import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RevenueToTargetOutlook() {
  const navigate = useNavigate();
  const location = useLocation();
  const [assessmentData, setAssessmentData] = useState({
    pricePerWidget: '2500',
    costPerWidget: '1500',
    widgetsPerMonth: '30',
    customersPerMonth: '15'
  });
  const [targetRevenue, setTargetRevenue] = useState('1000000');
  const [showCalculations, setShowCalculations] = useState(false);

  useEffect(() => {
    // Load assessment data from localStorage or navigation state
    const savedData = localStorage.getItem('assessmentData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setAssessmentData(data.assessment);
    } else if (location.state?.assessmentData) {
      setAssessmentData(location.state.assessmentData);
    }
  }, [location]);

  const calculateGrowthNeeds = () => {
    if (!assessmentData || !targetRevenue) return null;

    const pricePerWidget = parseInt(assessmentData.pricePerWidget) || 0;
    const costPerWidget = parseInt(assessmentData.costPerWidget) || 0;
    const currentWidgets = parseInt(assessmentData.widgetsPerMonth) || 0;
    const targetGrowth = parseInt(targetRevenue);

    // Calculate current revenue
    const currentRevenue = pricePerWidget * currentWidgets;
    
    // Calculate widgets needed for target
    const widgetsNeeded = Math.round(targetGrowth / pricePerWidget);
    
    // Assume each customer buys 4 widgets (we can make this dynamic later)
    const widgetsPerCustomer = 4;
    const customersNeeded = Math.round(widgetsNeeded / widgetsPerCustomer);

    // Calculate profit impact
    const profitPerWidget = pricePerWidget - costPerWidget;
    const totalProfitIncrease = widgetsNeeded * profitPerWidget;

    return {
      currentRevenue,
      targetGrowth,
      widgetsNeeded,
      customersNeeded,
      profitPerWidget,
      totalProfitIncrease,
      pricePerWidget,
      widgetsPerCustomer
    };
  };

  const calculations = calculateGrowthNeeds();

  const handleCalculate = () => {
    setShowCalculations(true);
  };

  const handleContinue = () => {
    // Save the target and continue to BD baseline
    const dataToSave = {
      ...assessmentData,
      targetRevenue,
      calculations,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('revenueTargetData', JSON.stringify(dataToSave));
    navigate('/bd-baseline-assessment');
  };

  if (!assessmentData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data Found</h1>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">📊</div>
            <h1 className="text-4xl font-black text-white mb-4">
              Let's Do The Math
            </h1>
            <p className="text-xl text-white/90">
              Based on your unit economics, here's what growth really looks like
            </p>
          </div>

          {/* What You Told Us */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">What You Told Us:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              <div>
                <span className="text-white/70">Price per widget:</span>
                <span className="ml-2 font-bold text-green-400">${assessmentData.pricePerWidget}</span>
              </div>
              <div>
                <span className="text-white/70">Cost per widget:</span>
                <span className="ml-2 font-bold text-red-400">${assessmentData.costPerWidget}</span>
              </div>
              <div>
                <span className="text-white/70">Profit per widget:</span>
                <span className="ml-2 font-bold text-green-400">
                  ${(parseInt(assessmentData.pricePerWidget) - parseInt(assessmentData.costPerWidget)).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-white/70">Current widgets/month:</span>
                <span className="ml-2 font-bold text-blue-400">{assessmentData.widgetsPerMonth}</span>
              </div>
            </div>
          </div>

          {/* Target Input */}
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">How much growth do you want?</h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-white text-xl font-bold">$</span>
              <input
                type="number"
                value={targetRevenue}
                onChange={(e) => setTargetRevenue(e.target.value)}
                placeholder="e.g., 100000"
                className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              onClick={handleCalculate}
              disabled={!targetRevenue}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate What It Takes →
            </button>
          </div>

          {/* Calculations */}
          {showCalculations && calculations && (
            <>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 mb-8 text-white shadow-2xl">
                <h2 className="text-3xl font-black mb-6 text-center">Here's The Math:</h2>
                
                <div className="space-y-6">
                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-6">
                    <p className="text-lg mb-2">You said <strong className="text-yellow-300">${calculations.pricePerWidget}</strong> per widget</p>
                    <p className="text-lg mb-2">You want <strong className="text-yellow-300">${calculations.targetGrowth.toLocaleString()}</strong> in growth</p>
                    <p className="text-2xl font-bold mt-4 text-yellow-300">
                      = You need to sell <strong className="text-3xl">{calculations.widgetsNeeded}</strong> more widgets
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-6">
                    <p className="text-lg mb-2">If each customer buys <strong className="text-yellow-300">{calculations.widgetsPerCustomer}</strong> widgets</p>
                    <p className="text-2xl font-bold mt-4 text-yellow-300">
                      = You need <strong className="text-3xl">{calculations.customersNeeded}</strong> new customers
                    </p>
                  </div>

                  <div className="bg-white/20 backdrop-blur-md rounded-xl p-6">
                    <p className="text-lg mb-2">At ${calculations.profitPerWidget} profit per widget</p>
                    <p className="text-2xl font-bold mt-4 text-yellow-300">
                      = ${calculations.totalProfitIncrease.toLocaleString()} in total profit
                    </p>
                  </div>
                </div>
              </div>

              {/* Reality Check */}
              <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Is This Doable?</h3>
                <div className="space-y-4 text-white">
                  {calculations.customersNeeded < 10 && (
                    <div className="bg-green-500/20 border border-green-400 rounded-lg p-4">
                      <p className="font-semibold text-green-400">✓ This looks very doable!</p>
                      <p className="text-sm text-white/90 mt-2">
                        {calculations.customersNeeded} new customers is achievable with focused business development.
                      </p>
                    </div>
                  )}
                  
                  {calculations.customersNeeded >= 10 && calculations.customersNeeded < 50 && (
                    <div className="bg-yellow-500/20 border border-yellow-400 rounded-lg p-4">
                      <p className="font-semibold text-yellow-400">⚠ This is challenging but achievable</p>
                      <p className="text-sm text-white/90 mt-2">
                        {calculations.customersNeeded} new customers will require significant BD investment and team capacity.
                      </p>
                    </div>
                  )}
                  
                  {calculations.customersNeeded >= 50 && (
                    <div className="bg-red-500/20 border border-red-400 rounded-lg p-4">
                      <p className="font-semibold text-red-400">⚠ This is aggressive</p>
                      <p className="text-sm text-white/90 mt-2">
                        {calculations.customersNeeded} new customers will require major team expansion and BD investment. Let's calculate what that looks like.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Continue Button */}
              <div className="text-center">
                <button
                  onClick={handleContinue}
                  className="px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-105"
                >
                  Show Me How To Get There →
                </button>
                <p className="text-white/70 text-sm mt-4">
                  Next: We'll calculate the BD spend and team capacity needed
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

