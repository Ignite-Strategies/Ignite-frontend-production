import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function JoinCompany() {
  const navigate = useNavigate();
  const [inviteCode, setInviteCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get adminId from localStorage
      const adminId = localStorage.getItem('adminId');
      
      // Join company with invite code
      const response = await api.post('/companies/join', {
        inviteCode,
        adminId
      });
      
      console.log('Joined company:', response.data);
      
      // Store company ID
      localStorage.setItem('companyId', response.data.companyId);
      
      // Redirect to main dashboard
      navigate('/businesspoint-law-proposal');
      
    } catch (error) {
      console.error('Join company error:', error);
      alert('Failed to join company. Please check your invite code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ignite Strategies" className="h-16 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">Join Company</h1>
          <p className="text-white/80 text-lg">Enter your company invite code to get started</p>
          <p className="text-white/60 text-sm mt-2">You received this link via email from your company admin</p>
        </div>

        {/* Join Form */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label htmlFor="inviteCode" className="block text-sm font-medium text-white mb-2">
                Invite Code *
              </label>
              <input
                type="text"
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Enter your invite code"
                required
              />
              <p className="text-white/60 text-sm mt-2">
                Ask your company admin for the invite code
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Joining...' : 'Join Company →'}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
