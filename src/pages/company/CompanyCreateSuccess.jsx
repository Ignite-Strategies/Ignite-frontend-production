import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CompanyCreateSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to dashboard after 5 seconds
    const timer = setTimeout(() => {
      navigate('/growth-dashboard');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <span className="text-5xl">✓</span>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-xl p-8 border border-white/20">
          <h1 className="text-4xl font-bold text-white mb-4">Company Created Successfully!</h1>
          <p className="text-white/80 text-lg mb-8">
            Your company profile has been set up. You're now ready to start building customer relationships.
          </p>

          {/* Next Steps */}
          <div className="bg-white/5 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-white mb-4">Next Steps:</h2>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-xl mt-1">✓</span>
                <span>Your company profile is complete</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">→</span>
                <span>Start adding contacts to build your network</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">→</span>
                <span>Take the assessment to understand your growth potential</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl mt-1">→</span>
                <span>Explore tools and services to maximize customer relationships</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Go to Dashboard →
            </button>
          </div>

          <p className="text-white/60 text-sm mt-4">
            Redirecting to dashboard in 5 seconds...
          </p>
        </div>
      </div>
    </div>
  );
}

