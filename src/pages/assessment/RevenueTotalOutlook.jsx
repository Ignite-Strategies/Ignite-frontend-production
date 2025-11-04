import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function RevenueTotalOutlook() {
  const navigate = useNavigate();
  const [revenueData, setRevenueData] = useState({
    productName: 'Legal Consulting Services',
    avgGrossPerUnit: '2500',
    avgOrdersPerMonthPerCustomer: '2',
    totalCustomers: '15'
  });
  const [calculations, setCalculations] = useState({
    totalUnitsPerMonth: 0,
    monthlyRevenue: 0,
    annualRevenue: 0,
    profitPerUnit: 0,
    totalMonthlyProfit: 0
  });

  useEffect(() => {
    // Load revenue data from localStorage
    const savedData = localStorage.getItem('revenueData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setRevenueData(data.revenueData);
      
      // Calculate values
      const { avgGrossPerUnit, avgOrdersPerMonthPerCustomer, totalCustomers } = data.revenueData;
      if (avgGrossPerUnit && avgOrdersPerMonthPerCustomer && totalCustomers) {
        const totalUnitsPerMonth = parseFloat(avgOrdersPerMonthPerCustomer) * parseFloat(totalCustomers);
        const monthlyRevenue = parseFloat(avgGrossPerUnit) * totalUnitsPerMonth;
        const annualRevenue = monthlyRevenue * 12;
        
        // Assuming 30% profit margin for demo
        const profitPerUnit = parseFloat(avgGrossPerUnit) * 0.3;
        const totalMonthlyProfit = profitPerUnit * totalUnitsPerMonth;
        
        setCalculations({
          totalUnitsPerMonth,
          monthlyRevenue,
          annualRevenue,
          profitPerUnit,
          totalMonthlyProfit
        });
      }
    }
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleConfirm = () => {
    // Save confirmed data
    localStorage.setItem('revenueConfirmed', JSON.stringify({
      revenueData,
      calculations,
      confirmed: true,
      timestamp: new Date().toISOString()
    }));
    
    // Navigate to next step
    navigate('/human-capital');
  };

  const handleEdit = () => {
    // Go back to edit revenue data
    navigate('/revenue');
  };

  if (!revenueData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
        <Navigation />
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-white mb-4">No Revenue Data Found</h1>
            <p className="text-white/80 mb-8">Please complete the revenue assessment first.</p>
            <button
              onClick={() => navigate('/revenue')}
              className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
            >
              Go to Revenue Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">💰</div>
            <h1 className="text-5xl font-black text-white mb-4">
              Your Revenue Outlook
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Let's verify your revenue calculations before moving forward
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* Revenue Summary */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Revenue Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Product Details</h3>
                  <div className="space-y-2 text-white/90">
                    <p><span className="font-semibold">Product:</span> {revenueData.productName}</p>
                    <p><span className="font-semibold">Price per Unit:</span> {formatCurrency(parseFloat(revenueData.avgGrossPerUnit))}</p>
                    <p><span className="font-semibold">Orders per Customer/Month:</span> {revenueData.avgOrdersPerMonthPerCustomer}</p>
                    <p><span className="font-semibold">Total Customers:</span> {parseInt(revenueData.totalCustomers).toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Volume Metrics</h3>
                  <div className="space-y-2 text-white/90">
                    <p><span className="font-semibold">Total Units/Month:</span> {calculations.totalUnitsPerMonth.toLocaleString()}</p>
                    <p><span className="font-semibold">Monthly Revenue:</span> {formatCurrency(calculations.monthlyRevenue)}</p>
                    <p><span className="font-semibold">Annual Revenue:</span> {formatCurrency(calculations.annualRevenue)}</p>
                    <p><span className="font-semibold">Monthly Profit:</span> {formatCurrency(calculations.totalMonthlyProfit)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Insights */}
            <div className="mb-8 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                Key Insights
              </h3>
              <div className="space-y-3 text-white/90">
                <p>• You're generating <strong>{formatCurrency(calculations.monthlyRevenue)}</strong> in monthly revenue</p>
                <p>• At this rate, you'll hit <strong>{formatCurrency(calculations.annualRevenue)}</strong> annually</p>
                <p>• Your monthly profit is approximately <strong>{formatCurrency(calculations.totalMonthlyProfit)}</strong></p>
                <p>• To add $100K in annual revenue, you'd need to sell <strong>{Math.round(100000 / parseFloat(revenueData.avgGrossPerUnit))}</strong> more units per year</p>
              </div>
            </div>

            {/* Confirmation Question */}
            <div className="mb-8 p-6 bg-yellow-500/20 rounded-2xl border border-yellow-400/30">
              <h3 className="text-xl font-bold text-white mb-4">Is this accurate?</h3>
              <p className="text-white/90 mb-4">
                Please review these calculations carefully. This data will be used to determine your growth potential and capacity requirements.
              </p>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="accuracy" value="yes" className="w-5 h-5 text-green-600" />
                  <span className="text-white/90">Yes, this looks accurate</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="radio" name="accuracy" value="no" className="w-5 h-5 text-red-600" />
                  <span className="text-white/90">No, I need to adjust this</span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleEdit}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                ← Edit Revenue Data
              </button>
              <button
                onClick={handleConfirm}
                className="px-12 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-green-500/50 transition-all hover:scale-105"
              >
                This Looks Good → Next: Human Capital
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Step 1 of 5: Revenue Foundation - Your growth journey starts here
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
