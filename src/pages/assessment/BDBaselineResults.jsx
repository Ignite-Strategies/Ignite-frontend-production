import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function BDBaselineResults() {
  const navigate = useNavigate();
  const [baselineData, setBaselineData] = useState(null);

  useEffect(() => {
    // Load BD baseline data from localStorage
    const savedData = localStorage.getItem('bdBaselineData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setBaselineData(data.baseline);
    }
  }, []);

  if (!baselineData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="p-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">⚠️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">No BD Baseline Data Found</h1>
            <p className="text-gray-600 mb-8">Please complete the BD baseline assessment first.</p>
            <button
              onClick={() => navigate('/bd-baseline-assessment')}
              className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Go to BD Baseline Assessment →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">📊</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your BD Baseline Results
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Here's what you told us about your current BD foundation
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            
            {/* Simple Mirror of Assessment */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Current BD Foundation</h2>
              
              <div className="space-y-8">
                
                {/* Followers */}
                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">📱 Social Followers</h3>
                  <div className="text-3xl font-bold text-blue-700">
                    {baselineData.socialFollowers || 'Not specified'}
                  </div>
                  <p className="text-blue-600 text-sm mt-2">Total social media following</p>
                </div>

                {/* Founder Network */}
                <div className="bg-green-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">🤝 Founder Network</h3>
                  <div className="text-3xl font-bold text-green-700">
                    {baselineData.founderNetwork || 'Not specified'}
                  </div>
                  <p className="text-green-600 text-sm mt-2">Active founder connections</p>
                </div>

                {/* Current Funnel */}
                <div className="bg-orange-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-orange-900 mb-4">🎯 Currently in Funnel</h3>
                  <div className="text-3xl font-bold text-orange-700">
                    {baselineData.currentFunnel || 'Not specified'}
                  </div>
                  <p className="text-orange-600 text-sm mt-2">Active prospects in your pipeline</p>
                </div>

              </div>
            </div>

            {/* Simple Summary */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
              <div className="text-gray-700 space-y-2">
                <p>• You have <strong>{baselineData.socialFollowers || 'X'}</strong> social followers</p>
                <p>• Your founder network includes <strong>{baselineData.founderNetwork || 'X'}</strong> active connections</p>
                <p>• You currently have <strong>{baselineData.currentFunnel || 'X'}</strong> prospects in your funnel</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => navigate('/bd-baseline-assessment')}
                className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Edit Assessment
              </button>
              <button
                onClick={() => navigate('/growth-dashboard')}
                className="px-8 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all"
              >
                Go to Dashboard →
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              BD Baseline Assessment Complete • Ready for growth planning
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}