import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivation } from '../../context/ActivationContext';
import api from '../../lib/api';

export default function Cost() {
  const navigate = useNavigate();
  const {
    revenue,
    setRevenue,
    prevRevenue,
    setPrevRevenue,
    reinvestmentPct,
    setReinvestmentPct,
    utilizationPct
  } = useActivation();

  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateCoefficient = async () => {
    try {
      setCalculating(true);
      setError('');

      const response = await api.post('/metrics/coefficient', {
        revenue,
        prevRevenue,
        reinvestmentPct,
        utilizationPct
      });

      setResult(response.data);
      
      // Update global state
      setRevenue(revenue);
      setPrevRevenue(prevRevenue);
      setReinvestmentPct(reinvestmentPct);
      
    } catch (err) {
      console.error('Error calculating coefficient:', err);
      setError(err.response?.data?.error || 'Failed to calculate. Please try again.');
    } finally {
      setCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="Ignite Strategies" className="h-10" />
            <div className="flex items-center gap-3">
              <div className="text-3xl">💰</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Cost / Ops</h1>
                <p className="text-sm text-gray-600">Reinvestment & Ignite Coefficient</p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/home')}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200 mb-8">
          <h2 className="text-3xl font-black text-gray-900 mb-6">Enter Your Metrics</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Previous Revenue ($)
              </label>
              <input
                type="number"
                value={prevRevenue}
                onChange={(e) => setPrevRevenue(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Current Revenue ($)
              </label>
              <input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reinvestment % (0-1)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={reinvestmentPct}
                onChange={(e) => setReinvestmentPct(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(reinvestmentPct * 100)}% of revenue
              </p>
            </div>
          </div>

          <button
            onClick={calculateCoefficient}
            disabled={calculating}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {calculating ? 'Calculating...' : '🔥 Calculate Ignite Coefficient'}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-red-900">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Card */}
        {result && (
          <div className="space-y-6">
            {/* Metrics Display */}
            <div className="bg-gradient-to-br from-orange-500 to-rose-600 rounded-3xl shadow-2xl p-10 text-white">
              <h2 className="text-2xl font-bold mb-6">Your Ignite Coefficient</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-white/80 text-sm mb-1">Coefficient</p>
                  <p className="text-6xl font-black">{result.coefficient}</p>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-sm">Growth Rate</p>
                    <p className="text-2xl font-bold">{result.growthPct}%</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-sm">Reinvestment</p>
                    <p className="text-2xl font-bold">{result.reinvestmentPct}%</p>
                  </div>
                  <div className="bg-white/20 rounded-xl p-3">
                    <p className="text-white/80 text-sm">Utilization</p>
                    <p className="text-2xl font-bold">{result.utilizationPct}%</p>
                  </div>
                </div>
              </div>

              <p className="text-white/90 text-sm">
                Formula: Growth × Reinvestment × Utilization = Coefficient
              </p>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Recommendations</h3>
              
              <div className="space-y-3">
                {result.recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4"
                  >
                    <p className="text-gray-900">{rec}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  🎯 Adjust your inputs above to model different scenarios and see how your coefficient changes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !error && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-8 text-center">
            <div className="text-5xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-blue-900 mb-2">Ready to Calculate</h3>
            <p className="text-blue-700">
              Enter your metrics above and click the button to see your Ignite Coefficient
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

