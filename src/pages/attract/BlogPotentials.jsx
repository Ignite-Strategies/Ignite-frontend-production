import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function BlogPotentials() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedId, setSelectedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [idea, setIdea] = useState('');
  const [potentials, setPotentials] = useState([]);

  useEffect(() => {
    if (location.state?.idea && location.state?.potentials) {
      setIdea(location.state.idea);
      setPotentials(location.state.potentials);
    } else {
      // Demo data if no state
      setIdea('BD automation tools comparison');
      setPotentials([
        {
          id: 1,
          title: 'BD Automation Tools: Complete Guide for 2025',
          angle: 'Comprehensive guide covering all aspects',
          estimatedWords: 800,
          targetAudience: 'BD professionals looking for detailed information'
        },
        {
          id: 2,
          title: '5 Ways BD Automation Can Transform Your Business',
          angle: 'List-based actionable content',
          estimatedWords: 600,
          targetAudience: 'Quick-readers seeking actionable tips'
        },
        {
          id: 3,
          title: 'Why BD Automation Matters: A Deep Dive',
          angle: 'Thought leadership and analysis',
          estimatedWords: 1000,
          targetAudience: 'Strategic decision makers'
        },
        {
          id: 4,
          title: 'BD Automation Tools: Best Practices and Case Studies',
          angle: 'Real-world examples and case studies',
          estimatedWords: 900,
          targetAudience: 'Practitioners seeking proven methods'
        },
        {
          id: 5,
          title: 'The Future of BD Automation: Trends and Predictions',
          angle: 'Forward-looking industry analysis',
          estimatedWords: 700,
          targetAudience: 'Innovators and early adopters'
        }
      ]);
    }
  }, [location.state]);

  const handleSelect = (potentialId) => {
    setSelectedId(potentialId);
  };

  const handleGenerate = () => {
    if (!selectedId) return;

    setIsGenerating(true);
    const selected = potentials.find(p => p.id === selectedId);

    // Simulate API call to generate 500-word blog
    setTimeout(() => {
      const generatedBlog = {
        id: Date.now(),
        title: selected.title,
        content: `# ${selected.title}\n\nBusiness development automation has become a critical component of modern sales and relationship management strategies. In today's fast-paced business environment, companies that leverage automation tools effectively gain significant competitive advantages.\n\n## The Evolution of BD Automation\n\nGone are the days when business development relied solely on manual processes and spreadsheets. Today's BD professionals have access to sophisticated tools that can automate everything from lead generation to follow-up sequences.\n\n## Key Benefits\n\nAutomation tools help BD teams:\n- Save time on repetitive tasks\n- Maintain consistent communication\n- Track performance metrics accurately\n- Scale operations without proportional headcount increases\n\n## Implementation Best Practices\n\nWhen implementing BD automation, start with clear objectives. Identify which processes will benefit most from automation, then select tools that align with your team's workflow and business goals.\n\n## The Bottom Line\n\nEffective BD automation isn't about replacing human relationships—it's about empowering your team to focus on high-value activities while technology handles the routine tasks that drive efficiency and growth.`,
        wordCount: 500,
        status: 'Draft',
        createdAt: new Date().toISOString()
      };

      navigate('/content/blog-editor', { 
        state: { blog: generatedBlog, originalIdea: idea }
      });
    }, 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Choose Your Blog Post Angle"
        subtitle={`Generated from: "${idea}"`}
        backTo="/content"
        backLabel="← Back to Content Hub"
      />

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 mb-6">
        <p className="text-sm text-gray-600 mb-6">
          We've generated 5 unique blog post angles from your idea. Select one to have AI create a 500-word draft.
        </p>

        <div className="space-y-4">
          {potentials.map((potential) => (
            <div
              key={potential.id}
              onClick={() => handleSelect(potential.id)}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                selectedId === potential.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedId === potential.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedId === potential.id && (
                    <Check className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {potential.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {potential.angle}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📝 ~{potential.estimatedWords} words</span>
                    <span>🎯 {potential.targetAudience}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate('/content')}
          className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleGenerate}
          disabled={!selectedId || isGenerating}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              AI Generating 500-Word Blog...
            </>
          ) : (
            <>
              Generate Blog Post
              <Sparkles className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

