import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <AlertCircle className="h-24 w-24 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Oops!</h1>
          <p className="text-xl text-gray-600 mb-4">
            Looks like something went wrong
          </p>
          <p className="text-gray-500 mb-8">
            You might need to sign in again, or this page doesn't exist.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/growth-dashboard')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            <Home className="h-5 w-5" />
            Go Home
          </button>
          
          <button
            onClick={() => navigate('/signin')}
            className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Sign In Again
          </button>
        </div>
      </div>
    </div>
  );
}

