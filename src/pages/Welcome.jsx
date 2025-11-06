import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { getAuth } from 'firebase/auth';

export default function Welcome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);
  const [owner, setOwner] = useState(null);
  const [nextRoute, setNextRoute] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const hydrateOwner = async () => {
      
      try {
        // Get Firebase user to ensure we have auth
        const auth = getAuth();
        const firebaseUser = auth.currentUser;
        
        if (!firebaseUser) {
          console.log('❌ No Firebase user found → redirecting to signup');
          navigate('/signup');
          return;
        }

        console.log('🚀 WELCOME: Hydrating Owner data...');
        
        // Call hydration endpoint (token automatically added by api interceptor)
        const response = await api.get('/api/owner/hydrate');
        
        if (!response.data.success) {
          console.error('❌ Hydration failed:', response.data.error);
          setError('Failed to load your account. Please try again.');
          setLoading(false);
          return;
        }

        const { owner: ownerData } = response.data;
        console.log('✅ WELCOME: Owner hydrated:', ownerData);

        // Cache Owner data to localStorage
        localStorage.setItem('ownerId', ownerData.id);
        localStorage.setItem('owner', JSON.stringify(ownerData));
        
        if (ownerData.companyHQId) {
          localStorage.setItem('companyHQId', ownerData.companyHQId);
        }
        
        if (ownerData.companyHQ) {
          localStorage.setItem('companyHQ', JSON.stringify(ownerData.companyHQ));
        }

        setOwner(ownerData);

        // Determine next route but don't navigate automatically
        // Profile check: Does owner have a name? (basic profile requirement)
        if (!ownerData.name || ownerData.name.trim() === '') {
          console.log('⚠️ Missing name → next route: profile setup');
          setNextRoute('/profilesetup');
          setLoading(false);
          setHydrated(true);
          return;
        }
        
        // Check if Owner has CompanyHQ (no ownedCompanies)
        if (!ownerData.companyHQId || !ownerData.ownedCompanies || ownerData.ownedCompanies.length === 0) {
          console.log('⚠️ Missing CompanyHQ → next route: company create/choose');
          setNextRoute('/company/create-or-choose');
          setLoading(false);
          setHydrated(true);
          return;
        }

        // All complete - ready for dashboard
        console.log('✅ Owner fully hydrated - ready for dashboard');
        setNextRoute('/growth-dashboard');
        setLoading(false);
        setHydrated(true);
        
      } catch (error) {
        console.error('❌ WELCOME: Hydration error:', error);
        
        // If 401, user not authenticated
        if (error.response?.status === 401) {
          console.log('🚫 Unauthorized → redirecting to signup');
          navigate('/signup');
          return;
        }
        
        // If user not found, redirect to signup
        if (error.response?.status === 404) {
          console.log('👤 User not found → redirecting to signup');
          navigate('/signup');
          return;
        }
        
        setError('Failed to load your account. Please try again.');
        setLoading(false);
      }
    };

    // Add a small delay to prevent jarring transitions
    const timer = setTimeout(() => {
    hydrateOwner();
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [navigate]);

  const handleContinue = () => {
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  // Show loading state while hydrating
  if (loading) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading your account...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-white rounded-xl shadow-xl p-8">
            <p className="text-red-600 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show welcome screen with continue button
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome{owner?.name ? `, ${owner.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="text-gray-600 mb-6">
            {owner?.companyHQ?.companyName 
              ? `Ready to manage ${owner.companyHQ.companyName}?`
              : 'Ready to get started?'}
          </p>
          
          <button
            onClick={handleContinue}
            className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
}

