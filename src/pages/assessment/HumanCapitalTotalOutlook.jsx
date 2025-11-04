import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function HumanCapitalTotalOutlook() {
  const navigate = useNavigate();
  const [humanCapitalData, setHumanCapitalData] = useState({
    totalTeamMembers: '8',
    avgHoursPerWeek: '40',
    founderHoursPerWeek: '50',
    hoursPerUnit: '12',
    contractorHours: '20'
  });
  const [calculations, setCalculations] = useState({
    totalNeededHours: 0,
    teamCapacity: 0,
    totalCapacity: 0,
    capacityDelta: 0,
    utilization: 0
  });

  useEffect(() => {
    // Load human capital data from localStorage
    const savedData = localStorage.getItem('humanCapitalData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setHumanCapitalData(data.humanCapitalData);
      
      // Calculate values
      const { totalTeamMembers, avgHoursPerWeek, founderHoursPerWeek, hoursPerUnit, totalUnitsPerMonth, contractorHours } = data.humanCapitalData;
      if (totalTeamMembers && avgHoursPerWeek && hoursPerUnit && totalUnitsPerMonth) {
        const totalNeededHours = parseFloat(hoursPerUnit) * parseFloat(totalUnitsPerMonth);
        const teamCapacity = parseFloat(totalTeamMembers) * parseFloat(avgHoursPerWeek) * 4;
        const founderCapacity = (founderHoursPerWeek ? parseFloat(founderHoursPerWeek) : 0) * 4;
        const contractorCapacity = contractorHours ? parseFloat(contractorHours) : 0;
        const totalCapacity = teamCapacity + founderCapacity + contractorCapacity;
        const capacityDelta = totalCapacity - totalNeededHours;
        const utilization = totalNeededHours > 0 ? (totalNeededHours / totalCapacity) * 100 : 0;
        
        setCalculations({
          totalNeededHours,
          teamCapacity,
          totalCapacity,
          capacityDelta,
          utilization
        });
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setHumanCapitalData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Recalculate on change
    const updatedData = { ...humanCapitalData, [field]: value };
    if (updatedData.totalTeamMembers && updatedData.avgHoursPerWeek && updatedData.hoursPerUnit && updatedData.totalUnitsPerMonth) {
      const totalNeededHours = parseFloat(updatedData.hoursPerUnit) * parseFloat(updatedData.totalUnitsPerMonth);
      const teamCapacity = parseFloat(updatedData.totalTeamMembers) * parseFloat(updatedData.avgHoursPerWeek) * 4;
      const founderCapacity = (updatedData.founderHoursPerWeek ? parseFloat(updatedData.founderHoursPerWeek) : 0) * 4;
      const contractorCapacity = updatedData.contractorHours ? parseFloat(updatedData.contractorHours) : 0;
      const totalCapacity = teamCapacity + founderCapacity + contractorCapacity;
      const capacityDelta = totalCapacity - totalNeededHours;
      const utilization = totalNeededHours > 0 ? (totalNeededHours / totalCapacity) * 100 : 0;
      
      setCalculations({
        totalNeededHours,
        teamCapacity,
        totalCapacity,
        capacityDelta,
        utilization
      });
    }
  };

  const handleConfirm = () => {
    // Save confirmed data
    localStorage.setItem('humanCapitalConfirmed', JSON.stringify({
      humanCapitalData,
      calculations,
      confirmed: true,
      timestamp: new Date().toISOString()
    }));
    
    // Navigate to next step
    navigate('/target-acquisition');
  };

  const handleEdit = () => {
    // Go back to edit human capital data
    navigate('/human-capital');
  };

  if (!humanCapitalData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
        <Navigation />
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-white mb-4">No Human Capital Data Found</h1>
            <p className="text-white/80 mb-8">Please complete the human capital assessment first.</p>
            <button
              onClick={() => navigate('/human-capital')}
              className="px-8 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors"
            >
              Go to Human Capital Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getCapacityStatus = () => {
    if (calculations.capacityDelta > 0) {
      return { status: 'surplus', color: 'green', message: 'You have spare capacity!' };
    } else if (calculations.capacityDelta < -100) {
      return { status: 'overloaded', color: 'red', message: 'You need significant help!' };
    } else {
      return { status: 'tight', color: 'yellow', message: 'You\'re running at capacity' };
    }
  };

  const capacityStatus = getCapacityStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">👥</div>
            <h1 className="text-5xl font-black text-white mb-4">
              Your Team Capacity Outlook
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Let's verify your team can deliver your revenue goals
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* Team Summary */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">Team Structure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Team Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Team Members</label>
                      <input
                        type="number"
                        value={humanCapitalData.totalTeamMembers}
                        onChange={(e) => handleInputChange('totalTeamMembers', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Hours per Week per Member</label>
                      <input
                        type="number"
                        value={humanCapitalData.avgHoursPerWeek}
                        onChange={(e) => handleInputChange('avgHoursPerWeek', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Founder Hours per Week</label>
                      <input
                        type="number"
                        value={humanCapitalData.founderHoursPerWeek || ''}
                        onChange={(e) => handleInputChange('founderHoursPerWeek', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Contractor Hours per Month</label>
                      <input
                        type="number"
                        value={humanCapitalData.contractorHours || ''}
                        onChange={(e) => handleInputChange('contractorHours', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/20 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Production Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Hours per Unit</label>
                      <input
                        type="number"
                        value={humanCapitalData.hoursPerUnit}
                        onChange={(e) => handleInputChange('hoursPerUnit', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm mb-1">Units per Month</label>
                      <input
                        type="number"
                        value={humanCapitalData.totalUnitsPerMonth}
                        onChange={(e) => handleInputChange('totalUnitsPerMonth', e.target.value)}
                        className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Capacity Analysis */}
            <div className="mb-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">📊</span>
                Capacity Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {calculations.totalNeededHours.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Hours Needed/Month</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {calculations.totalCapacity.toLocaleString()}
                  </div>
                  <div className="text-sm text-white/70">Total Capacity/Month</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${capacityStatus.color === 'green' ? 'text-green-400' : capacityStatus.color === 'red' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {calculations.utilization.toFixed(1)}%
                  </div>
                  <div className="text-sm text-white/70">Utilization Rate</div>
                </div>
              </div>
              
              <div className={`p-4 rounded-xl border ${
                capacityStatus.color === 'green' ? 'bg-green-500/20 border-green-400/30' :
                capacityStatus.color === 'red' ? 'bg-red-500/20 border-red-400/30' :
                'bg-yellow-500/20 border-yellow-400/30'
              }`}>
                <p className="text-white font-semibold">{capacityStatus.message}</p>
                <p className="text-white/80 text-sm mt-1">
                  {calculations.capacityDelta > 0 
                    ? `You have ${Math.abs(calculations.capacityDelta).toLocaleString()} spare hours per month`
                    : `You need ${Math.abs(calculations.capacityDelta).toLocaleString()} more hours per month`
                  }
                </p>
              </div>
            </div>

            {/* Recommendations */}
            {calculations.capacityDelta < 0 && (
              <div className="mb-8 p-6 bg-red-500/20 rounded-2xl border border-red-400/30">
                <h3 className="text-xl font-bold text-white mb-4">Recommendations</h3>
                <div className="space-y-2 text-white/90">
                  <p>• Consider hiring {Math.ceil(Math.abs(calculations.capacityDelta) / (parseFloat(humanCapitalData.avgHoursPerWeek) * 4))} additional team members</p>
                  <p>• Increase contractor hours by {Math.abs(calculations.capacityDelta).toLocaleString()} hours per month</p>
                  <p>• Reduce production volume or increase efficiency</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={handleEdit}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                ← Edit Team Data
              </button>
              <button
                onClick={handleConfirm}
                className="px-12 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                This Looks Good → Next: Target Acquisition
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Step 2 of 5: Human Capital - Can your team deliver?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
