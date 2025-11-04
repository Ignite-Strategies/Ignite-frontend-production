import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivation } from '../../context/ActivationContext';

export default function Human() {
  const navigate = useNavigate();
  const { utilizationPct, setUtilizationPct } = useActivation();

  const [capacityUnitsPerWeek, setCapacityUnitsPerWeek] = useState(40);
  const [actualUnitsPerWeek, setActualUnitsPerWeek] = useState(28);
  const [plannedContractorUnits, setPlannedContractorUnits] = useState(0);

  // Calculate utilization
  const totalActual = actualUnitsPerWeek + plannedContractorUnits;
  const currentUtilization = capacityUnitsPerWeek > 0 
    ? (totalActual / capacityUnitsPerWeek)
    : 0;

  const handleSaveUtilization = () => {
    setUtilizationPct(currentUtilization);
    
    // Show confirmation
    alert(`✅ Utilization saved: ${Math.round(currentUtilization * 100)}%\n\nThis will be used in your Ignite Coefficient calculation!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">⚡</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Human Capital & Efficiency</h1>
              <p className="text-sm text-gray-600">Capacity, Utilization, and Team Planning</p>
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
          <h2 className="text-3xl font-black text-gray-900 mb-2">Model Your Capacity</h2>
          <p className="text-gray-600 mb-6">
            Track how efficiently your team is operating. Units can be hours, NDAs, deals, or any productivity metric.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Capacity Units/Week
              </label>
              <input
                type="number"
                value={capacityUnitsPerWeek}
                onChange={(e) => setCapacityUnitsPerWeek(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Total available hours/deals</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Actual Units/Week
              </label>
              <input
                type="number"
                value={actualUnitsPerWeek}
                onChange={(e) => setActualUnitsPerWeek(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Currently producing</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Planned Contractor Units
              </label>
              <input
                type="number"
                value={plannedContractorUnits}
                onChange={(e) => setPlannedContractorUnits(Number(e.target.value))}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-purple-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Additional capacity to add</p>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-2xl p-10 text-white mb-8">
          <h2 className="text-2xl font-bold mb-6">Current Utilization</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-white/80 text-sm mb-2">Utilization Rate</p>
              <p className="text-7xl font-black mb-2">
                {Math.round(currentUtilization * 100)}%
              </p>
              <p className="text-white/90 text-sm">
                {totalActual} / {capacityUnitsPerWeek} units
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-white/80 text-sm">Current Team Output</p>
                <p className="text-3xl font-bold">{actualUnitsPerWeek}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-white/80 text-sm">With Contractors</p>
                <p className="text-3xl font-bold">{totalActual}</p>
              </div>
              <div className="bg-white/20 rounded-xl p-4">
                <p className="text-white/80 text-sm">Unused Capacity</p>
                <p className="text-3xl font-bold">{Math.max(0, capacityUnitsPerWeek - totalActual)}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveUtilization}
            className="mt-6 w-full py-4 bg-white text-purple-600 font-bold text-lg rounded-xl hover:bg-gray-100 transition"
          >
            💾 Save Utilization to Ignite Coefficient
          </button>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 Insights & Actions</h3>
          
          <div className="space-y-3">
            {currentUtilization < 0.7 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <p className="text-yellow-900">
                  <span className="font-bold">⚠️ Low Utilization:</span> Your team is operating below 70%. 
                  Consider reducing headcount, taking on more work, or identifying blockers.
                </p>
              </div>
            )}

            {currentUtilization >= 0.7 && currentUtilization < 0.9 && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-green-900">
                  <span className="font-bold">✅ Healthy Range:</span> Your utilization is in the sweet spot (70-90%). 
                  Team is productive without burning out.
                </p>
              </div>
            )}

            {currentUtilization >= 0.9 && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                <p className="text-orange-900">
                  <span className="font-bold">🔥 High Utilization:</span> Team is near capacity. 
                  Consider hiring contractors or full-time help to avoid burnout and maintain quality.
                </p>
              </div>
            )}

            {plannedContractorUnits > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-blue-900">
                  <span className="font-bold">📈 Scaling Plan:</span> Adding {plannedContractorUnits} contractor units 
                  will bring you to {Math.round(currentUtilization * 100)}% utilization.
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              🎯 <span className="font-semibold">Pro Tip:</span> Utilization feeds directly into your Ignite Coefficient. 
              Higher utilization = more efficient use of resources = better activation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

