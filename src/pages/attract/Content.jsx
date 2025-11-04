import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navigation from '../../components/Navigation';
import ContentIdea from './ContentIdea';

export default function Content() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('blog');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [socialPosts, setSocialPosts] = useState([]);

  // Dummy data for demo
  useEffect(() => {
    setBlogPosts([
      {
        id: 1,
        title: '5 BD Strategies That Actually Work in 2024',
        status: 'Published',
        date: '2024-01-15',
        views: 1250,
        engagement: 45,
        tags: ['business-development', 'strategy', 'growth']
      },
      {
        id: 2,
        title: 'How to Build Anchor Collaborator Relationships',
        status: 'Draft',
        date: '2024-01-20',
        views: 0,
        engagement: 0,
        tags: ['partnerships', 'collaboration', 'networking']
      },
      {
        id: 3,
        title: 'The Complete Guide to BD Pipeline Management',
        status: 'Scheduled',
        date: '2024-01-25',
        views: 0,
        engagement: 0,
        tags: ['pipeline', 'sales', 'crm']
      }
    ]);

    setSocialPosts([
      {
        id: 1,
        platform: 'LinkedIn',
        content: 'Just closed a major partnership deal! Here\'s what I learned about building anchor collaborator relationships...',
        status: 'Published',
        date: '2024-01-18',
        likes: 23,
        comments: 8,
        shares: 5
      },
      {
        id: 2,
        platform: 'Twitter',
        content: 'Hot take: Most BD strategies fail because they focus on selling instead of solving problems. Thoughts?',
        status: 'Scheduled',
        date: '2024-01-22',
        likes: 0,
        comments: 0,
        shares: 0
      },
      {
        id: 3,
        platform: 'LinkedIn',
        content: '5 ways to turn your network into revenue. Thread 🧵',
        status: 'Draft',
        date: '2024-01-24',
        likes: 0,
        comments: 0,
        shares: 0
      }
    ]);

  }, []);

  const handleIdeaSubmitted = (idea, blogPotentials) => {
    setShowCreateModal(false);
    navigate('/content/blog-potentials', { 
      state: { idea, potentials: blogPotentials }
    });
  };

  const renderBlogTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Published Blog Posts</h3>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:shadow-lg transition-all font-semibold flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Create Content
        </button>
      </div>

      <div className="grid gap-4">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'Published' ? 'bg-green-100 text-green-800' :
                    post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                  <span>👁️ {post.views} views</span>
                  <span>💬 {post.engagement} engagements</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="ml-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocialTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Social Media Management</h3>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          + New Post
        </button>
      </div>

      <div className="grid gap-4">
        {socialPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg">
                    {post.platform === 'LinkedIn' ? '💼' : '🐦'}
                  </span>
                  <span className="font-semibold text-gray-700">{post.platform}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    post.status === 'Published' ? 'bg-green-100 text-green-800' :
                    post.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {post.status}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{post.content}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>📅 {new Date(post.date).toLocaleDateString()}</span>
                  <span>❤️ {post.likes} likes</span>
                  <span>💬 {post.comments} comments</span>
                  <span>🔄 {post.shares} shares</span>
                </div>
              </div>
              
              <div className="ml-4 flex gap-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Hub</h1>
            <p className="text-gray-600">Manage your blog posts, social media, and content ideas</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📝</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-gray-600">Blog Posts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">📱</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">28</p>
                  <p className="text-gray-600">Social Posts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">👁️</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5.2K</p>
                  <p className="text-gray-600">Total Views</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3">
                <div className="text-3xl">✍️</div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-gray-600">Drafts</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('blog')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'blog'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📝 Blog Posts
                </button>
                <button
                  onClick={() => setActiveTab('social')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'social'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📱 Social Media
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'analytics'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📊 Analytics
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'blog' && renderBlogTab()}
            {activeTab === 'social' && renderSocialTab()}
            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Content Analytics</h3>
                <p className="text-gray-600">Track your content performance and engagement metrics</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Create Content Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <ContentIdea
              onClose={() => setShowCreateModal(false)}
              onIdeaSubmitted={handleIdeaSubmitted}
            />
          </div>
        </div>
      )}
    </div>
  );
}
