import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    let unsubscribe = null;

    // Show logo for 2 seconds, then check Firebase auth state
    const timer = setTimeout(() => {
      // Check Firebase auth state (Firebase SDK reads from its internal storage)
      unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is authenticated - Firebase SDK found token in browser storage
          // Route to welcome (hydration hub - handles routing based on what's missing)
          navigate('/welcome');
        } else {
          // User not authenticated - no token in Firebase's internal storage
          navigate('/signup');
        }
      });
    }, 2000);

    // Cleanup: clear timer and unsubscribe from auth listener
    return () => {
      clearTimeout(timer);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center">
      <div className="text-center">
        <img src="/logo.png" alt="Ignite Strategies" className="h-32 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-white mb-2">
          IgniteGrowth Engine
        </h1>
        <p className="text-xl text-white/80 mb-4">
          by Ignite Strategies
        </p>
        <p className="text-lg text-white/60">
          Fuel your business growth
        </p>
      </div>
    </div>
  );
}