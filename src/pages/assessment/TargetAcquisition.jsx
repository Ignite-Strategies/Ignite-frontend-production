import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function TargetAcquisition() {
  const navigate = useNavigate();
  const [targetData, setTargetData] = useState({
    previousRevenue: '750000',
    targetRevenue: '1500000',
    timeHorizon: '12' // months
  });

  // Auto-calculated values from Revenue Stack
  const [revenueBaseline, setRevenueBaseline] = useState({
    currentMonthlyRevenue: 75000,
    avgUnitValue: 2500,
    avgUnitsPerCustomer: 2,
    totalCustomers: 15
  });

  // Calculated values
  const [calculations, setCalculations] = useState({
    increaseNeeded: 0,
    growthPercent: 0,
    newUnitsNeeded: 0,
    newCustomersNeeded: 0
  });

  // Load from localStorage on page refresh
  useEffect(() => {
    const savedData = localStorage.getItem('targetAcquisitionData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setTargetData(data.targetData || targetData);
    }

    // Try to get baseline data from revenue stack
    const revenueData = localStorage.getItem('revenueData');
    if (revenueData) {
      const parsedRevenue = JSON.parse(revenueData);
      if (parsedRevenue.calculations) {
        setRevenueBaseline({
          currentMonthlyRevenue: parsedRevenue.calculations.monthlyRevenue || 0,
          avgUnitValue: parsedRevenue.revenueData?.avgGrossPerUnit || 0,
          avgUnitsPerCustomer: parsedRevenue.revenueData?.avgOrdersPerMonthPerCustomer || 0,
          totalCustomers: parsedRevenue.revenueData?.totalCustomers || 0
        });
      }
    }
  }, []);

  // Calculate values whenever inputs change
  useEffect(() => {
    const { previousRevenue, targetRevenue } = targetData;
    
    if (previousRevenue && targetRevenue && revenueBaseline.avgUnitValue && revenueBaseline.avgUnitsPerCustomer) {
      const previous = parseFloat(previousRevenue);
      const target = parseFloat(targetRevenue);
      const avgUnitValue = revenueBaseline.avgUnitValue;
      const avgUnitsPerCustomer = revenueBaseline.avgUnitsPerCustomer;

      if (previous > 0 && target > 0 && avgUnitValue > 0 && avgUnitsPerCustomer > 0) {
        const increaseNeeded = target - previous;
        const growthPercent = (increaseNeeded / previous) * 100;
        const newUnitsNeeded = increaseNeeded / avgUnitValue;
        const newCustomersNeeded = newUnitsNeeded / avgUnitsPerCustomer;
        
        setCalculations({
          increaseNeeded,
          growthPercent,
          newUnitsNeeded,
          newCustomersNeeded
        });
      }
    }
  }, [targetData, revenueBaseline]);

  const handleInputChange = (field, value) => {
    setTargetData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    const dataToSave = {
      targetData,
      revenueBaseline,
      calculations,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('targetAcquisitionData', JSON.stringify(dataToSave));
    
    // Navigate to next step or show success
    alert('Target Acquisition data saved! Ready for cost analysis.');
  };

  const isFormComplete = () => {
    return targetData.previousRevenue && targetData.targetRevenue;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getGrowthStatus = () => {
    if (calculations.growthPercent <= 0) return { status: 'decline', color: 'red', icon: '📉' };
    if (calculations.growthPercent <= 25) return { status: 'moderate', color: 'yellow', icon: '📈' };
    if (calculations.growthPercent <= 100) return { status: 'aggressive', color: 'orange', icon: '🚀' };
    return { status: 'extreme', color: 'red', icon: '🔥' };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Target Acquisition Stack
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Let's define your next revenue goal and the volume it will take to get there.
          </p>
          <p className="text-lg text-white/80">
            This calculates the gap between where you are and where you want to be.
          </p>
        </div>

        {/* Target Acquisition Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Baseline Revenue */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Baseline Revenue
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">What did you earn last year?</label>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xl font-bold">$</span>
                  <input
                    type="number"
                    value={targetData.previousRevenue}
                    onChange={(e) => handleInputChange('previousRevenue', e.target.value)}
                    placeholder="e.g., 150000"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Current Monthly Revenue (from Revenue Stack)</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {revenueBaseline.currentMonthlyRevenue > 0 
                    ? formatCurrency(revenueBaseline.currentMonthlyRevenue) 
                    : 'Auto-pulled from Revenue Stack'
                  }
                </div>
                <p className="text-white/60 text-sm mt-1">
                  From your revenue calculations
                </p>
              </div>
            </div>
          </div>

          {/* Target Definition */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Target Definition
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">What's your revenue goal for the next 12 months?</label>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xl font-bold">$</span>
                  <input
                    type="number"
                    value={targetData.targetRevenue}
                    onChange={(e) => handleInputChange('targetRevenue', e.target.value)}
                    placeholder="e.g., 250000"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Time Horizon (optional)</label>
                <select
                  value={targetData.timeHorizon}
                  onChange={(e) => handleInputChange('timeHorizon', e.target.value)}
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="18">18 months</option>
                  <option value="24">24 months</option>
                </select>
              </div>
            </div>
          </div>

          {/* Revenue Delta Calculation */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📈</span>
              Revenue Delta Calculation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Increase Needed</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.increaseNeeded > 0 ? formatCurrency(calculations.increaseNeeded) : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {targetData.targetRevenue && targetData.previousRevenue 
                    ? `${formatCurrency(parseFloat(targetData.targetRevenue))} - ${formatCurrency(parseFloat(targetData.previousRevenue))}`
                    : 'Target - Previous'
                  }
                </p>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Percentage Growth</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.growthPercent > 0 ? `+${calculations.growthPercent.toFixed(1)}%` : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {calculations.increaseNeeded > 0 && targetData.previousRevenue 
                    ? `(${formatCurrency(calculations.increaseNeeded)} / ${formatCurrency(parseFloat(targetData.previousRevenue))}) × 100`
                    : 'Growth percentage'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Operational Targets */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              Operational Targets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Average Unit Value (from Revenue Stack)</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {revenueBaseline.avgUnitValue > 0 
                    ? formatCurrency(revenueBaseline.avgUnitValue) 
                    : 'Auto-pulled from Revenue Stack'
                  }
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Average Units per Customer (from Revenue Stack)</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {revenueBaseline.avgUnitsPerCustomer > 0 
                    ? `${revenueBaseline.avgUnitsPerCustomer} orders/month` 
                    : 'Auto-pulled from Revenue Stack'
                  }
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-white font-semibold mb-2">Total New Units Needed</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.newUnitsNeeded > 0 ? Math.ceil(calculations.newUnitsNeeded).toLocaleString() : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {calculations.increaseNeeded > 0 && revenueBaseline.avgUnitValue > 0 
                    ? `${formatCurrency(calculations.increaseNeeded)} ÷ ${formatCurrency(revenueBaseline.avgUnitValue)}`
                    : 'Increase needed ÷ Average unit value'
                  }
                </p>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Total New Customers Needed</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.newCustomersNeeded > 0 ? Math.ceil(calculations.newCustomersNeeded).toLocaleString() : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {calculations.newUnitsNeeded > 0 && revenueBaseline.avgUnitsPerCustomer > 0 
                    ? `${Math.ceil(calculations.newUnitsNeeded).toLocaleString()} ÷ ${revenueBaseline.avgUnitsPerCustomer} orders`
                    : 'New units ÷ Average units per customer'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Target Snapshot */}
          {isFormComplete() && calculations.increaseNeeded > 0 && (
            <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                Ignite Target Snapshot
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Current Revenue:</span>
                  <span className="text-white font-bold">{formatCurrency(parseFloat(targetData.previousRevenue))}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Target Revenue:</span>
                  <span className="text-white font-bold">{formatCurrency(parseFloat(targetData.targetRevenue))}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Growth Goal:</span>
                  <span className={`font-bold ${getGrowthStatus().color === 'red' ? 'text-red-400' : getGrowthStatus().color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {getGrowthStatus().icon} {formatCurrency(calculations.increaseNeeded)} (+{calculations.growthPercent.toFixed(1)}%)
                  </span>
                </div>

                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <h4 className="text-white font-bold mb-2">You'll need:</h4>
                  <div className="space-y-2">
                    <p className="text-white/90">
                      • <span className="font-bold">{Math.ceil(calculations.newUnitsNeeded).toLocaleString()}</span> more units at {formatCurrency(revenueBaseline.avgUnitValue)} avg value
                    </p>
                    <p className="text-white/90">
                      • ≈ <span className="font-bold">{Math.ceil(calculations.newCustomersNeeded).toLocaleString()}</span> new customers ({revenueBaseline.avgUnitsPerCustomer} orders each)
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                  <p className="text-blue-200 font-semibold">
                    💡 Next: estimate the cost and activity needed to reach those customers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleSave}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              Save Target Data
            </button>
            
            <div>
              <p className="text-white/80 text-lg mb-4">Next → Calculate your acquisition cost and activity targets</p>
              <button
                onClick={() => navigate('/revenue')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                Back to Revenue
              </button>
              <button
                onClick={() => navigate('/human-capital')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all ml-4"
              >
                Back to Human Capital
              </button>
              <button
                onClick={() => navigate('/bd-baseline-assessment')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all ml-4"
              >
                Next: BD Baseline →
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Module 3 of your growth assessment - bridging current to target revenue.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
