import { useNavigate } from 'react-router-dom';

export default function CompanyCreateOrChoose() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <img src="/logo.png" alt="Ignite Strategies" className="h-20 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Create Your Company</h1>
          <p className="text-white/80 text-lg">Set up your company profile to get started</p>
        </div>

        {/* Create New Company - Primary Action */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border-2 border-white/30 hover:bg-white/15 transition-all cursor-pointer group mb-6"
             onClick={() => navigate('/companyprofile')}>
          <div className="text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-4xl">🏢</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Create New Company</h2>
            <p className="text-white/80 mb-6 text-lg">
              Start fresh with a new company profile. Perfect for founders and new businesses.
            </p>
            
            <div className="space-y-3 text-left max-w-md mx-auto mb-6">
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-green-400 text-xl">✓</span>
                <span>Set up company details</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-green-400 text-xl">✓</span>
                <span>Configure business settings</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-green-400 text-xl">✓</span>
                <span>Invite team members</span>
              </div>
            </div>
            
            <button className="w-full max-w-md mx-auto px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl transition-all hover:scale-105">
              Create Company →
            </button>
          </div>
        </div>

        {/* Join Existing Company - Secondary Option */}
        <div className="text-center">
          <p className="text-white/60 text-sm mb-4">Already have a company invite?</p>
          <button
            onClick={() => navigate('/joincompany')}
            className="text-white/80 hover:text-white transition underline text-sm"
          >
            Join existing company with invite code
          </button>
          <p className="text-white/50 text-xs mt-2">
            Team members receive a link with invite code via email
          </p>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/owner-identity-survey')}
            className="text-white/80 hover:text-white transition"
          >
            ← Back to Owner Identity Survey
          </button>
        </div>
      </div>
    </div>
  );
}
