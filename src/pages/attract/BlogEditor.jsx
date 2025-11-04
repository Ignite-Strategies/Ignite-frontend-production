import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Save, Globe, Eye } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function BlogEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (location.state?.blog) {
      setBlog(location.state.blog);
    } else {
      // Demo data
      setBlog({
        id: Date.now(),
        title: 'BD Automation Tools: Complete Guide for 2025',
        content: `# BD Automation Tools: Complete Guide for 2025\n\nBusiness development automation has become a critical component of modern sales and relationship management strategies. In today's fast-paced business environment, companies that leverage automation tools effectively gain significant competitive advantages.\n\n## The Evolution of BD Automation\n\nGone are the days when business development relied solely on manual processes and spreadsheets. Today's BD professionals have access to sophisticated tools that can automate everything from lead generation to follow-up sequences.\n\n## Key Benefits\n\nAutomation tools help BD teams:\n- Save time on repetitive tasks\n- Maintain consistent communication\n- Track performance metrics accurately\n- Scale operations without proportional headcount increases\n\n## Implementation Best Practices\n\nWhen implementing BD automation, start with clear objectives. Identify which processes will benefit most from automation, then select tools that align with your team's workflow and business goals.\n\n## The Bottom Line\n\nEffective BD automation isn't about replacing human relationships—it's about empowering your team to focus on high-value activities while technology handles the routine tasks that drive efficiency and growth.`,
        wordCount: 500,
        status: 'Draft'
      });
    }
  }, [location.state]);

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate API call to publish via backend
    setTimeout(() => {
      setBlog(prev => ({ ...prev, status: 'Published' }));
      setPublished(true);
      setIsPublishing(false);
      
      // After 2 seconds, navigate back to content hub
      setTimeout(() => {
        navigate('/content');
      }, 2000);
    }, 2000);
  };

  if (!blog) {
    return <div className="text-center py-12">Loading blog editor...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={blog.title}
        subtitle={`${blog.wordCount} words • ${blog.status}`}
        backTo="/content"
        backLabel="← Back to Content Hub"
        actions={
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/content')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Draft
            </button>
            <button
              onClick={handlePublish}
              disabled={isPublishing || published}
              className="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isPublishing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Publishing...
                </>
              ) : published ? (
                <>
                  <Globe className="h-4 w-4" />
                  Published!
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4" />
                  Publish to Web
                </>
              )}
            </button>
          </div>
        }
      />

      {published && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✅ Blog published successfully! Publishing to web via backend...
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="prose max-w-none">
          <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
            {blog.content}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Note:</strong> Publishing to web is handled by the backend. The blog will be automatically formatted, SEO-optimized, and made live on your website.
        </p>
      </div>
    </div>
  );
}

