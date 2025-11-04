import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is already authenticated
        const response = await api.get('/auth/me');
        if (response.data) {
          // User is authenticated, redirect to welcome/dashboard
          navigate('/businesspoint-law-proposal');
        } else {
          // User not authenticated, redirect to signin
          navigate('/signin');
        }
      } catch (error) {
        // Error checking auth, redirect to signin
        navigate('/signin');
      }
    };

    // Show logo for 800ms then check auth
    const timer = setTimeout(() => {
      checkAuth();
    }, 800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Ignite Strategies" className="h-32 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-4">
          Let's go ignite your business!
        </h1>
      </div>
    </div>
  );
}