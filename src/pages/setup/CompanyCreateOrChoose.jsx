import { useNavigate } from 'react-router-dom';

export default function CompanyCreateOrChoose() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Ignite Strategies" className="h-20 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Company Setup</h1>
          <p className="text-white/80 text-lg">How would you like to get started with your company?</p>
        </div>

        {/* Fork Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Create New Company */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
               onClick={() => navigate('/companyprofile')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">🏢</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Create New Company</h2>
              <p className="text-white/80 mb-6">
                Start fresh with a new company profile. Perfect for founders and new businesses.
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Set up company details</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Configure business settings</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Invite team members</span>
                </div>
              </div>
              
              <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105">
                Create Company →
              </button>
            </div>
          </div>

          {/* Join Existing Company */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
               onClick={() => navigate('/joincompany')}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👥</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4">Join Existing Company</h2>
              <p className="text-white/80 mb-6">
                Join a company that's already set up. Perfect for team members and employees.
              </p>
              
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Enter company invite code</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Get instant access</span>
                </div>
                <div className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>Start collaborating</span>
                </div>
              </div>
              
              <button className="w-full mt-6 px-6 py-3 bg-white/20 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/30 transition-all hover:scale-105">
                Join Company →
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/profilesetup')}
            className="text-white/80 hover:text-white transition"
          >
            ← Back to Profile Setup
          </button>
        </div>
      </div>
    </div>
  );
}
