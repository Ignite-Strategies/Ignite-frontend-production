import axios from 'axios';
import { getAuth } from 'firebase/auth';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://ignitebd-backend.onrender.com' 
    : 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor - AUTOMATICALLY adds Firebase token to all requests
api.interceptors.request.use(
  async (config) => {
    // Get Firebase auth instance
    const firebaseAuth = getAuth();
    const user = firebaseAuth.currentUser;
    
    // If user is authenticated, add token to request
    if (user) {
      try {
        const token = await user.getIdToken(); // Firebase SDK gets fresh token
        config.headers.Authorization = `Bearer ${token}`; // Automatically added!
      } catch (error) {
        console.error('❌ Failed to get Firebase token:', error);
      }
    }
    
    // Log request
    console.log('🔥 API Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handles errors and logging
api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  async error => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle 401 (Unauthorized) - but be smart about it
    if (error.response?.status === 401) {
      // Check if user is actually logged in via Firebase
      const firebaseAuth = getAuth();
      const currentUser = firebaseAuth.currentUser;
      
      // Check if this is a hydration/non-critical endpoint
      const isHydrationEndpoint = error.config?.url?.includes('/hydrate') || 
                                  error.config?.url?.includes('/contacts') ||
                                  error.config?.url?.includes('/api/contacts');
      
      // For 401 errors, navigate to page-not-found (soft redirect)
      // This gives user option to go home or sign in again
      if (!currentUser || !isHydrationEndpoint) {
        console.warn('⚠️ 401 error - navigating to page-not-found');
        window.location.href = '/page-not-found';
        return Promise.reject(error);
      }
      
      // For hydration endpoints OR if user exists but got 401:
      // Let component handle gracefully (show error, use cache, etc.)
      if (isHydrationEndpoint) {
        console.warn('⚠️ Hydration endpoint failed with 401 - component will handle gracefully');
      } else if (currentUser) {
        console.warn('⚠️ User exists but got 401 - may be token issue, component will handle');
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

