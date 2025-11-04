import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AssessmentResults() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get data from navigation state
    if (location.state) {
      setResults(location.state);
      setLoading(false);
    } else {
      // If no data, redirect back to assessment
      navigate('/assessment');
    }
  }, [location.state, navigate]);



  if (!results) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Assessment Data</h1>
          <button
            onClick={() => navigate('/assessment')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🔥</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Assessment Results</h1>
                <p className="text-white/90">Growth analysis for {results.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        
        {/* AI Analysis Header */}
        <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-xl p-8 text-white mb-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🔥</div>
            <h2 className="text-4xl font-bold mb-2">AI-Powered Growth Analysis</h2>
            <p className="text-xl text-white/90">
              Personalized insights for {results.company}
            </p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🔥 AI Analysis</h3>
          <div className="space-y-6">
            {results.insights && (
              <>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.relateWithUser}
                  </p>
                </div>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {results.insights.growthNeeds}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>


        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/prices')}
            className="px-12 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
          >
            Learn How We Can Help →
          </button>
          
          <p className="text-gray-600 text-sm mt-4">
            Ready to unlock your growth potential? Let's build your success strategy.
          </p>
        </div>
      </div>
    </div>
  );
}