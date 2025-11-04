import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function Revenue() {
  const navigate = useNavigate();
  const [revenueData, setRevenueData] = useState({
    productName: 'Legal Consulting Services',
    avgGrossPerUnit: '2500',
    avgOrdersPerMonthPerCustomer: '2',
    totalCustomers: '15'
  });

  // Auto-calculated values
  const [calculations, setCalculations] = useState({
    totalUnitsPerMonth: 0,
    monthlyRevenue: 0,
    annualRevenue: 0
  });

  // Load from localStorage on page refresh
  useEffect(() => {
    const savedData = localStorage.getItem('revenueData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setRevenueData(data.revenueData || revenueData);
    }
  }, []);

  // Calculate values whenever inputs change
  useEffect(() => {
    const { avgGrossPerUnit, avgOrdersPerMonthPerCustomer, totalCustomers } = revenueData;
    
    if (avgGrossPerUnit && avgOrdersPerMonthPerCustomer && totalCustomers) {
      const totalUnitsPerMonth = parseFloat(avgOrdersPerMonthPerCustomer) * parseFloat(totalCustomers);
      const monthlyRevenue = parseFloat(avgGrossPerUnit) * totalUnitsPerMonth;
      const annualRevenue = monthlyRevenue * 12;
      
      setCalculations({
        totalUnitsPerMonth,
        monthlyRevenue,
        annualRevenue
      });
    }
  }, [revenueData]);

  const handleInputChange = (field, value) => {
    setRevenueData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    const dataToSave = {
      revenueData,
      calculations,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('revenueData', JSON.stringify(dataToSave));
    
    // Navigate to revenue outlook
    navigate('/revenue-total-outlook');
  };

  const isFormComplete = () => {
    return revenueData.productName && 
           revenueData.avgGrossPerUnit && 
           revenueData.avgOrdersPerMonthPerCustomer && 
           revenueData.totalCustomers;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">💰</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Revenue Stack
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Let's baseline your revenue flow.
          </p>
          <p className="text-lg text-white/80">
            This will feed into human capital, margin, and acquisition modules.
          </p>
        </div>

        {/* Revenue Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Product Definition */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🏷️</span>
              Product / Service Definition
            </h2>
            <div>
              <label className="block text-white font-semibold mb-2">What's your core product or service?</label>
              <input
                type="text"
                value={revenueData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                placeholder="e.g., NDA Review, Monthly Retainer, Widget"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Unit Economics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Unit Economics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">What's your gross profit per unit?</label>
                <div className="flex items-center gap-3">
                  <span className="text-white text-xl font-bold">$</span>
                  <input
                    type="number"
                    value={revenueData.avgGrossPerUnit}
                    onChange={(e) => handleInputChange('avgGrossPerUnit', e.target.value)}
                    placeholder="e.g., 350 (after costs)"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">How many units does each B2B customer order per month?</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="0.1"
                    value={revenueData.avgOrdersPerMonthPerCustomer}
                    onChange={(e) => handleInputChange('avgOrdersPerMonthPerCustomer', e.target.value)}
                    placeholder="e.g., 4"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-white text-sm">orders/month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Volume Metrics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📈</span>
              Volume Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Roughly how many active customers do you have?</label>
                <input
                  type="number"
                  value={revenueData.totalCustomers}
                  onChange={(e) => handleInputChange('totalCustomers', e.target.value)}
                  placeholder="e.g., 100"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Total # of Units Sold per Month</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.totalUnitsPerMonth > 0 ? calculations.totalUnitsPerMonth.toLocaleString() : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {revenueData.avgOrdersPerMonthPerCustomer && revenueData.totalCustomers 
                    ? `${revenueData.avgOrdersPerMonthPerCustomer} × ${revenueData.totalCustomers} customers`
                    : 'customers × orders/month'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Output */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Revenue Output
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Monthly Revenue</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.monthlyRevenue > 0 ? formatCurrency(calculations.monthlyRevenue) : 'Auto-calculated'}
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Annualized Revenue</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.annualRevenue > 0 ? formatCurrency(calculations.annualRevenue) : 'Auto-calculated'}
                </div>
              </div>
            </div>
          </div>

          {/* Revenue Snapshot */}
          {isFormComplete() && calculations.monthlyRevenue > 0 && (
            <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                Ignite Revenue Snapshot
              </h3>
              <div className="space-y-2 text-white/90">
                <p><span className="font-semibold">Product:</span> {revenueData.productName}</p>
                <p><span className="font-semibold">Monthly Revenue:</span> {formatCurrency(calculations.monthlyRevenue)}</p>
                <p><span className="font-semibold">Annual Projection:</span> {formatCurrency(calculations.annualRevenue)}</p>
                <p className="text-sm text-white/70">
                  (based on {calculations.totalUnitsPerMonth.toLocaleString()} units/month × {formatCurrency(parseFloat(revenueData.avgGrossPerUnit))})
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleSave}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              Save Revenue Data
            </button>
            
            <div>
              <p className="text-white/80 text-lg mb-4">Next → Assess your capacity to deliver this volume</p>
              <button
                onClick={() => navigate('/revenue-total-outlook')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                Review Calculations →
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Module 1 of your growth assessment - building the foundation for success.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
