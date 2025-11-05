import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../lib/api';
import { getAuth } from 'firebase/auth';

export default function Welcome() {
  const navigate = useNavigate();

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
          navigate('/signup');
          return;
        }

        const { owner } = response.data;
        console.log('✅ WELCOME: Owner hydrated:', owner);

        // Cache Owner data to localStorage
        localStorage.setItem('ownerId', owner.id);
        localStorage.setItem('owner', JSON.stringify(owner));
        
        if (owner.companyHQId) {
          localStorage.setItem('companyHQId', owner.companyHQId);
        }
        
        if (owner.companyHQ) {
          localStorage.setItem('companyHQ', JSON.stringify(owner.companyHQ));
        }

        // Routing Logic based on what's missing
        // 1. Check if Owner has name (profile incomplete)
        if (!owner.name || owner.name.trim() === '') {
          console.log('⚠️ Missing name → routing to profile setup');
          navigate('/profilesetup');
          return;
        }

        // 2. Check if Owner has CompanyHQ (no ownedCompanies)
        if (!owner.companyHQId || !owner.ownedCompanies || owner.ownedCompanies.length === 0) {
          console.log('⚠️ Missing CompanyHQ → routing to company create/choose');
          navigate('/company/create-or-choose');
          return;
        }

        // 3. All complete - route directly to dashboard (perfect scenario)
        console.log('✅ Owner fully hydrated - routing to dashboard');
        navigate('/growth-dashboard');
        return;
        
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
        
        // Other errors - redirect to signup
        navigate('/signup');
      }
    };

    hydrateOwner();
  }, [navigate]);

  // Show loading state while hydrating (will route away when complete)
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading your account...</p>
      </div>
    </div>
  );
}

