import { useState } from 'react';
import { ArrowLeft, Sparkles, Wand2, Send, Eye } from 'lucide-react';

export default function IndividualPost({ onBack }) {
  const [idea, setIdea] = useState('');
  const [aiGenerated, setAiGenerated] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerate = () => {
    if (idea.trim().length < 10) {
      alert('Please enter at least a few words to get started');
      return;
    }

    // Simulate AI generation
    const generated = {
      title: idea.split(' ').slice(0, 5).join(' ') + '...',
      content: `Based on your idea: "${idea}"\n\nHere's a draft post that captures your authentic voice:\n\n[AI-generated content would appear here - this is a placeholder for the actual AI integration]`,
      tone: 'Authentic',
      suggestions: [
        'Consider adding a personal story or example',
        'Connect this to your broader journey',
        'Ask a question to invite engagement'
      ]
    };

    setAiGenerated(generated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Individual Post</h1>
            <p className="text-gray-600">Quick idea → AI assist → Post</p>
          </div>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Idea Input */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">What's your idea?</h2>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Share your thought, reflection, or what you want to post about..."
          className="w-full h-32 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800 leading-relaxed"
        />
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {idea.length} characters
          </div>
          <button
            onClick={handleGenerate}
            disabled={idea.trim().length < 10}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Wand2 className="h-5 w-5" />
            Generate with AI
          </button>
        </div>
      </div>

      {/* AI Generated Content */}
      {aiGenerated && (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Wand2 className="h-5 w-5 text-blue-600" />
              AI Generated Draft
            </h2>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>

          {!showPreview ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Title</label>
                <input
                  type="text"
                  value={aiGenerated.title}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Content</label>
                <textarea
                  value={aiGenerated.content}
                  className="w-full h-64 p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="min-h-[200px] p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-xl">
                  👤
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Adam Cole | GoFast</div>
                  <div className="text-xs text-gray-500">Just now</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{aiGenerated.title}</h3>
              <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">{aiGenerated.content}</p>
            </div>
          )}

          {/* AI Suggestions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">AI Suggestions</h3>
            <ul className="space-y-2">
              {aiGenerated.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Send className="h-5 w-5" />
              Publish
            </button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all">
              Save Draft
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
