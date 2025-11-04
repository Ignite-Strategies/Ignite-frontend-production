import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://ignitebd-backend.onrender.com' 
    : '/api',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Request interceptor for logging
api.interceptors.request.use(request => {
  console.log('🔥 API Request:', request.method.toUpperCase(), request.url, request.data);
  return request;
});

// Response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;

