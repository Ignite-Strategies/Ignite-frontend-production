import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function ContentIdea({ onClose, onIdeaSubmitted }) {
  const navigate = useNavigate();
  const [ideaText, setIdeaText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    setIsGenerating(true);
    
    // Simulate API call to generate blog potentials
    setTimeout(() => {
      // Generate 5 blog post potentials from the idea
      const blogPotentials = [
        {
          id: 1,
          title: `${ideaText.split(' ').slice(0, 3).join(' ')}: Complete Guide for 2025`,
          angle: 'Comprehensive guide covering all aspects',
          estimatedWords: 800,
          targetAudience: 'BD professionals looking for detailed information'
        },
        {
          id: 2,
          title: `5 Ways ${ideaText.split(' ').slice(0, 2).join(' ')} Can Transform Your Business`,
          angle: 'List-based actionable content',
          estimatedWords: 600,
          targetAudience: 'Quick-readers seeking actionable tips'
        },
        {
          id: 3,
          title: `Why ${ideaText.split(' ').slice(0, 2).join(' ')} Matters: A Deep Dive`,
          angle: 'Thought leadership and analysis',
          estimatedWords: 1000,
          targetAudience: 'Strategic decision makers'
        },
        {
          id: 4,
          title: `${ideaText.split(' ').slice(0, 3).join(' ')}: Best Practices and Case Studies`,
          angle: 'Real-world examples and case studies',
          estimatedWords: 900,
          targetAudience: 'Practitioners seeking proven methods'
        },
        {
          id: 5,
          title: `The Future of ${ideaText.split(' ').slice(0, 2).join(' ')}: Trends and Predictions`,
          angle: 'Forward-looking industry analysis',
          estimatedWords: 700,
          targetAudience: 'Innovators and early adopters'
        }
      ];

      setIsGenerating(false);
      
      if (onIdeaSubmitted) {
        onIdeaSubmitted(ideaText, blogPotentials);
      } else {
        // Navigate to blog potentials selection
        navigate('/content/blog-potentials', { 
          state: { idea: ideaText, potentials: blogPotentials }
        });
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Create Content"
        subtitle="Start with an idea - we'll help you turn it into engaging blog content"
        backTo="/content"
        backLabel="← Back to Content Hub"
      />

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              What do you want to write about?
            </label>
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="E.g., 'BD automation tools comparison' or 'How to build better client relationships' or 'Effective meeting strategies for business development'"
              rows={6}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none text-lg"
              required
            />
            <p className="text-xs text-gray-500 mt-2">
              Describe your content idea in a few words. We'll generate 5 blog post options for you to choose from.
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-blue-900">What happens next?</p>
              <p className="text-xs text-blue-700">
                We'll generate 5 unique blog post angles from your idea. Select one, and AI will create a 500-word draft ready for publishing.
              </p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose || (() => navigate('/content'))}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!ideaText.trim() || isGenerating}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Generating Blog Options...
                </>
              ) : (
                <>
                  Generate Blog Options
                  <Sparkles className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

