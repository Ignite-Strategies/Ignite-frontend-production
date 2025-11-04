import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Sparkles, ArrowRight } from 'lucide-react';
import IndividualPost from './components/branding/IndividualPost';
import PostSeriesPlanner from './components/branding/PostSeriesPlanner';

export default function BrandingHub() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // 'individual' or 'series'

  // If no mode selected, show the fork
  if (!mode) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Personal Branding Hub
                  </h1>
                  <p className="text-gray-600 mt-1">Design your authentic narrative</p>
                </div>
              </div>
            </div>

            {/* Mode Selection Fork */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Individual Post */}
              <button
                onClick={() => setMode('individual')}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Individual Post</h2>
                    <p className="text-sm text-gray-600">Quick idea → AI assist</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Have an idea? Turn it into a post with AI assistance. Perfect for one-off thoughts, reflections, or quick updates.
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                  <span>Create Post</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>

              {/* Post Series Planner */}
              <button
                onClick={() => setMode('series')}
                className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-200 hover:border-purple-300 transition-all text-left group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Post Series Planner</h2>
                    <p className="text-sm text-gray-600">Design a narrative arc</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Plan a series of posts that tell a story. Set your narrative arc, add events, and build momentum over time.
                </p>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <span>Plan Series</span>
                  <ArrowRight className="h-5 w-5" />
                </div>
              </button>
            </div>

            {/* Quick Access to Example */}
            <div className="flex justify-center">
              <button
                onClick={() => navigate('/branding-hub/adam-cole')}
                className="px-6 py-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl hover:bg-blue-100 transition-all flex items-center gap-2 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                See Example Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render the selected mode
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {mode === 'individual' && (
            <IndividualPost onBack={() => setMode(null)} />
          )}
          {mode === 'series' && (
            <PostSeriesPlanner onBack={() => setMode(null)} />
          )}
        </div>
      </div>
    </div>
  );
}