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
  error => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    
    // Handle 401 (Unauthorized) - token expired or invalid
    if (error.response?.status === 401) {
      console.error('🚫 Unauthorized - redirecting to signup');
      // Clear any stored auth data
      localStorage.clear();
      // Redirect to signup
      window.location.href = '/signup';
    }
    
    return Promise.reject(error);
  }
);

export default api;

