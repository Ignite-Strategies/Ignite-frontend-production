import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function HumanCapital() {
  const navigate = useNavigate();
  const [humanCapitalData, setHumanCapitalData] = useState({
    totalTeamMembers: '8',
    avgHoursPerWeek: '40',
    founderHoursPerWeek: '50',
    hoursPerUnit: '12',
    contractorHours: '20'
  });

  // Auto-calculated values
  const [calculations, setCalculations] = useState({
    totalUnitsPerMonth: 0,
    totalNeededHours: 0,
    teamCapacity: 0,
    totalCapacity: 0,
    delta: 0,
    utilization: 0
  });

  // Load from localStorage on page refresh
  useEffect(() => {
    const savedData = localStorage.getItem('humanCapitalData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setHumanCapitalData(data.humanCapitalData || humanCapitalData);
    }

    // Try to get totalUnitsPerMonth from revenue data
    const revenueData = localStorage.getItem('revenueData');
    if (revenueData) {
      const parsedRevenue = JSON.parse(revenueData);
      if (parsedRevenue.calculations?.totalUnitsPerMonth) {
        setCalculations(prev => ({
          ...prev,
          totalUnitsPerMonth: parsedRevenue.calculations.totalUnitsPerMonth
        }));
      }
    }
  }, []);

  // Calculate values whenever inputs change
  useEffect(() => {
    const { 
      totalTeamMembers, 
      avgHoursPerWeek, 
      founderHoursPerWeek, 
      hoursPerUnit, 
      contractorHours 
    } = humanCapitalData;
    
    if (totalTeamMembers && avgHoursPerWeek && hoursPerUnit && calculations.totalUnitsPerMonth > 0) {
      const teamMembers = parseFloat(totalTeamMembers);
      const avgHours = parseFloat(avgHoursPerWeek);
      const founderHours = parseFloat(founderHoursPerWeek) || 0;
      const hoursPer = parseFloat(hoursPerUnit);
      const contractor = parseFloat(contractorHours) || 0;
      const unitsPerMonth = calculations.totalUnitsPerMonth;

      const totalNeededHours = hoursPer * unitsPerMonth;
      const teamCapacity = teamMembers * avgHours * 4; // 4 weeks per month
      const founderCapacity = founderHours * 4;
      const contractorCapacity = contractor;
      const totalCapacity = teamCapacity + founderCapacity + contractorCapacity;
      const delta = totalCapacity - totalNeededHours;
      const utilization = totalCapacity > 0 ? (totalNeededHours / totalCapacity) * 100 : 0;
      
      setCalculations(prev => ({
        ...prev,
        totalNeededHours,
        teamCapacity,
        totalCapacity,
        delta,
        utilization
      }));
    }
  }, [humanCapitalData, calculations.totalUnitsPerMonth]);

  const handleInputChange = (field, value) => {
    setHumanCapitalData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    const dataToSave = {
      humanCapitalData,
      calculations,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('humanCapitalData', JSON.stringify(dataToSave));
    
    // Navigate to human capital outlook
    navigate('/human-capital-total-outlook');
  };

  const isFormComplete = () => {
    return humanCapitalData.totalTeamMembers && 
           humanCapitalData.avgHoursPerWeek && 
           humanCapitalData.hoursPerUnit;
  };

  const getUtilizationStatus = () => {
    if (calculations.utilization <= 80) return { status: 'good', color: 'green', icon: '✅' };
    if (calculations.utilization <= 100) return { status: 'warning', color: 'yellow', icon: '⚠️' };
    return { status: 'overload', color: 'red', icon: '🚨' };
  };

  const getRecommendations = () => {
    const status = getUtilizationStatus();
    const recommendations = [];

    if (status.status === 'overload') {
      const neededMembers = Math.ceil((calculations.totalNeededHours - calculations.totalCapacity) / (parseFloat(humanCapitalData.avgHoursPerWeek) * 4));
      const reductionPercent = Math.round(((calculations.totalNeededHours - calculations.totalCapacity) / calculations.totalNeededHours) * 100);
      
      recommendations.push(`Add ${neededMembers} team member(s) or reduce volume by ${reductionPercent}%`);
    } else if (status.status === 'warning') {
      recommendations.push('Consider adding capacity or optimizing processes');
    } else {
      recommendations.push('Good capacity utilization - room for growth');
    }

    return recommendations;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl w-full mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">👥</div>
          <h1 className="text-5xl font-black text-white mb-4">
            Human Capital Stack
          </h1>
          <p className="text-xl text-white/90 mb-2">
            Now let's check if your team can deliver this volume.
          </p>
          <p className="text-lg text-white/80">
            This will feed into cost & margin analysis.
          </p>
        </div>

        {/* Human Capital Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
          
          {/* Team Structure */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">👥</span>
              Team Structure
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">How many people are working on delivery?</label>
                <input
                  type="number"
                  value={humanCapitalData.totalTeamMembers}
                  onChange={(e) => handleInputChange('totalTeamMembers', e.target.value)}
                  placeholder="e.g., 3"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">How many hours per week do they each contribute?</label>
                <input
                  type="number"
                  value={humanCapitalData.avgHoursPerWeek}
                  onChange={(e) => handleInputChange('avgHoursPerWeek', e.target.value)}
                  placeholder="e.g., 30"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Founder hours per week (optional)</label>
                <input
                  type="number"
                  value={humanCapitalData.founderHoursPerWeek}
                  onChange={(e) => handleInputChange('founderHoursPerWeek', e.target.value)}
                  placeholder="e.g., 40"
                  className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Production Metrics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">⚙️</span>
              Production Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">How long does it take to produce one unit?</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={humanCapitalData.hoursPerUnit}
                    onChange={(e) => handleInputChange('hoursPerUnit', e.target.value)}
                    placeholder="e.g., 5"
                    className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <span className="text-white text-sm">hours per unit</span>
                </div>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Total Units Required per Month</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.totalUnitsPerMonth > 0 ? calculations.totalUnitsPerMonth.toLocaleString() : 'Auto-pulled from Revenue Stack'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  From your revenue calculations
                </p>
              </div>
            </div>
          </div>

          {/* Optional Advanced Field */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">🤝</span>
              Optional: Outsourced / Contractor Hours
            </h2>
            <div>
              <label className="block text-white font-semibold mb-2">Do you use any contractors or part-timers?</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={humanCapitalData.contractorHours}
                  onChange={(e) => handleInputChange('contractorHours', e.target.value)}
                  placeholder="e.g., 40"
                  className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <span className="text-white text-sm">extra contractor hours per month</span>
              </div>
            </div>
          </div>

          {/* Calculated Outputs */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="text-3xl">📊</span>
              Calculated Outputs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-semibold mb-2">Total Monthly Hours Needed</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.totalNeededHours > 0 ? calculations.totalNeededHours.toLocaleString() : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {humanCapitalData.hoursPerUnit && calculations.totalUnitsPerMonth > 0 
                    ? `${humanCapitalData.hoursPerUnit} hours × ${calculations.totalUnitsPerMonth.toLocaleString()} units`
                    : 'hours per unit × total units per month'
                  }
                </p>
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">Team Hour Capacity</label>
                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white/80">
                  {calculations.totalCapacity > 0 ? calculations.totalCapacity.toLocaleString() : 'Auto-calculated'}
                </div>
                <p className="text-white/60 text-sm mt-1">
                  {humanCapitalData.totalTeamMembers && humanCapitalData.avgHoursPerWeek 
                    ? `${humanCapitalData.totalTeamMembers} members × ${humanCapitalData.avgHoursPerWeek} hours × 4 weeks`
                    : 'team members × hours per week × 4 weeks'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Human Capital Snapshot */}
          {isFormComplete() && calculations.totalCapacity > 0 && (
            <div className="mb-12 p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="text-3xl">🔥</span>
                Ignite Human Capital Snapshot
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Hours Needed:</span>
                  <span className="text-white font-bold">{calculations.totalNeededHours.toLocaleString()} / month</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Team Capacity:</span>
                  <span className="text-white font-bold">{calculations.totalCapacity.toLocaleString()} / month</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/90 font-semibold">Utilization:</span>
                  <span className={`font-bold ${getUtilizationStatus().color === 'red' ? 'text-red-400' : getUtilizationStatus().color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>
                    {getUtilizationStatus().icon} {calculations.utilization.toFixed(1)}%
                  </span>
                </div>

                {calculations.delta < 0 && (
                  <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl">
                    <p className="text-red-200 font-semibold">
                      ⚠️ You're running at {calculations.utilization.toFixed(0)}% utilization. 
                      {getRecommendations()[0]}
                    </p>
                  </div>
                )}

                {calculations.delta > 0 && (
                  <div className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                    <p className="text-green-200 font-semibold">
                      ✅ You have {Math.abs(calculations.delta).toLocaleString()} hours of spare capacity
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="text-center space-y-4">
            <button
              onClick={handleSave}
              className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
            >
              Save Human Capital Data
            </button>
            
            <div>
              <p className="text-white/80 text-lg mb-4">Next → Analyze your cost & margin tradeoffs</p>
              <button
                onClick={() => navigate('/revenue')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all"
              >
                Back to Revenue
              </button>
              <button
                onClick={() => navigate('/human-capital-total-outlook')}
                className="px-8 py-3 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all ml-4"
              >
                Review Team Capacity →
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-white/60 text-sm">
            Module 2 of your growth assessment - ensuring your team can deliver.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}
