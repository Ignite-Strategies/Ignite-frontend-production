import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function AssessmentIntro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800">
      <Navigation />
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* Header */}
            <div className="text-center mb-12">
              <div className="text-6xl mb-6">🚀</div>
              <h1 className="text-5xl font-black text-white mb-4">
                Welcome to our Ignite Assessment!
              </h1>
              <p className="text-xl text-white/90 mb-8">
                This tool is currently for current clients, but you can walk through it to see what you get.
              </p>
            </div>

            {/* What You'll Get */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">What You'll Discover</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">💰</div>
                  <h3 className="text-xl font-bold text-white mb-2">Revenue Analysis</h3>
                  <p className="text-white/80">Understand your current revenue drivers and growth potential</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">👥</div>
                  <h3 className="text-xl font-bold text-white mb-2">Team Capacity</h3>
                  <p className="text-white/80">Assess if your team can handle your growth goals</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">🎯</div>
                  <h3 className="text-xl font-bold text-white mb-2">Acquisition Targets</h3>
                  <p className="text-white/80">Calculate exactly what you need to hit your goals</p>
                </div>
                <div className="bg-white/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">📊</div>
                  <h3 className="text-xl font-bold text-white mb-2">BD Baseline</h3>
                  <p className="text-white/80">Understand your current business development foundation</p>
                </div>
              </div>
            </div>

            {/* Demo Notice */}
            <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">⚠️</div>
                <h3 className="text-lg font-bold text-yellow-200">Demo Mode</h3>
              </div>
              <p className="text-yellow-100">
                This is a demonstration version. Your data will be saved locally but not to our servers. 
                To get a personalized assessment with real data analysis, please contact our team.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/assessment')}
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
              >
                Start Demo Assessment →
              </button>
              <button
                onClick={() => navigate('/growth-dashboard')}
                className="px-8 py-4 bg-white/20 text-white text-xl font-bold rounded-2xl border border-white/30 hover:bg-white/30 transition-all"
              >
                View Dashboard
              </button>
            </div>

            {/* Contact Sales */}
            <div className="mt-12 text-center">
              <div className="bg-white/10 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-3">Ready for a Real Assessment?</h3>
                <p className="text-white/80 mb-4">
                  Get a personalized growth analysis with real data insights and strategic recommendations.
                </p>
                <button
                  onClick={() => window.open('mailto:adam@ignitestrategies.co?subject=Ignite Assessment Inquiry', '_blank')}
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  Contact Sales Team
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                Ignite Assessment • Your growth planning tool
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
