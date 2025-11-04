import { useState } from 'react';
import { User, ArrowLeft, Edit2, Check, Circle, FileText, Calendar, MapPin, Target, Plus } from 'lucide-react';

// Adam Cole's hydrated data - simulating completed wizard
const adamColeData = {
  identity: 'founder-builder',
  narrativeArc: 'From heads-down to out-in-the-open: bringing GoFast from build mode to real-world feedback.',
  postCount: 5,
  arcGoal: 'GoFast is live, I\'m sharing progress and learning out loud again — next stop Boston Marathon and real user traction.',
  cadence: 'weekly',
  events: [
    { id: 1, name: 'DC Startup Week', date: '2024-10-15' },
    { id: 2, name: 'GoFast Demo Launch', date: '2024-11-01' },
    { id: 3, name: 'Boston Marathon Acceptance', date: '2025-04-21' }
  ],
  posts: [
    {
      id: 1,
      title: 'DC Startup Week — Authenticity in Building',
      goal: 'Re-Entry / Event Reflection',
      theme: 'authenticity, ecosystem, founder lessons',
      prompt: 'Reflect on attending DC Startup Week, what authenticity means when you\'re building from scratch, and what you took from connecting with the local founder scene.',
      status: 'published',
      eventId: 1,
      publishedDate: '2024-10-18'
    },
    {
      id: 2,
      title: 'The GoFast Demo — From Idea to Something Real',
      goal: 'Launch / Transparency',
      theme: 'perseverance, shipping, imperfection',
      prompt: 'Talk about finally getting the GoFast demo live, what it took to build as a non-technical founder, and how it feels to push something imperfect but real.',
      status: 'published',
      eventId: 2,
      publishedDate: '2024-11-05'
    },
    {
      id: 3,
      title: 'Building in DC — Why the Ecosystem Matters',
      goal: 'Community / Context',
      theme: 'local network, collaboration, energy',
      prompt: 'Share what you\'re seeing in the DC startup ecosystem — why local energy and connections matter when you\'re grinding through a build.',
      status: 'drafting',
      eventId: null
    },
    {
      id: 4,
      title: 'Getting Feedback — The Scariest and Best Part of Building',
      goal: 'User Insight',
      theme: 'feedback loops, humility, iteration',
      prompt: 'Reflect on what it\'s like opening your app to real users and hearing what\'s not working — and why that\'s actually fuel.',
      status: 'not_started',
      eventId: null
    },
    {
      id: 5,
      title: 'Looking Ahead — Boston, Balance, and Building Better',
      goal: 'Reflection / Future Vision',
      theme: 'iteration, growth, momentum',
      prompt: 'Use your Boston Marathon acceptance as a metaphor for the next chapter — what\'s next for GoFast, and what staying consistent looks like now.',
      status: 'not_started',
      eventId: 3
    }
  ]
};

const statusConfig = {
  not_started: { label: 'Not started', color: 'bg-gray-100 text-gray-600', icon: Circle },
  drafting: { label: 'Drafting', color: 'bg-yellow-100 text-yellow-700', icon: Edit2 },
  published: { label: 'Published', color: 'bg-green-100 text-green-700', icon: Check }
};

export default function AdamColePersonalBranding() {
  const [posts, setPosts] = useState(adamColeData.posts);
  const [editingPost, setEditingPost] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEditStart = (post) => {
    setEditingPost(post.id);
    setEditTitle(post.title);
  };

  const handleEditSave = (postId) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, title: editTitle } : p
    ));
    setEditingPost(null);
    setEditTitle('');
  };

  const handleStatusChange = (postId, newStatus) => {
    setPosts(posts.map(p => 
      p.id === postId ? { ...p, status: newStatus } : p
    ));
  };

  const handleAddMorePosts = () => {
    const newPostCount = 3; // Add 3 more posts
    const newPosts = Array.from({ length: newPostCount }, (_, i) => ({
      id: posts.length + i + 1,
      title: `Post ${posts.length + i + 1}`,
      goal: 'Part of your narrative arc',
      theme: 'authenticity, growth, momentum',
      prompt: 'Continue your narrative arc...',
      status: 'not_started',
      eventId: null
    }));
    setPosts([...posts, ...newPosts]);
  };

  const getEventForPost = (post) => {
    return adamColeData.events?.find(e => e.id === post.eventId);
  };

  const publishedCount = posts.filter(p => p.status === 'published').length;
  const draftingCount = posts.filter(p => p.status === 'drafting').length;
  const notStartedCount = posts.filter(p => p.status === 'not_started').length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Personal Branding Hub
              </h1>
              <p className="text-gray-600 mt-1">Adam Cole | GoFast — Your Narrative Arc</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-6">
          {/* Narrative Arc Summary */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Washington, DC</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Narrative Arc</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {adamColeData.narrativeArc}
                </p>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
                  <div className="text-sm font-semibold text-purple-900 mb-1">Arc Destination</div>
                  <div className="text-gray-800">{adamColeData.arcGoal}</div>
                </div>
              </div>
              <div className="text-right ml-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">{publishedCount}/{posts.length}</div>
                <div className="text-sm text-gray-600">Posts Published</div>
              </div>
            </div>

            {/* Progress Tracker */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Arc Progress</span>
                <span className="text-sm text-gray-500">
                  {publishedCount} published • {draftingCount} drafting • {notStartedCount} planned
                </span>
              </div>
              <div className="flex gap-2">
                {posts.map((post, i) => {
                  const status = statusConfig[post.status];
                  const isPublished = post.status === 'published';
                  const isDrafting = post.status === 'drafting';
                  return (
                    <div
                      key={post.id}
                      className={`flex-1 h-3 rounded-full transition-all ${
                        isPublished 
                          ? 'bg-green-500' 
                          : isDrafting 
                          ? 'bg-yellow-500' 
                          : 'bg-gray-300'
                      }`}
                      title={`${post.title} - ${status.label}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Events Overview */}
          {adamColeData.events.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Anchor Events & Milestones
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {adamColeData.events.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                  >
                    <div className="font-semibold text-gray-900 mb-1">{event.name}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Posts Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Your {posts.length}-Post Arc</h3>
              <button
                onClick={handleAddMorePosts}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2 text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                Add More Posts
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {posts.map((post, index) => {
                const status = statusConfig[post.status];
                const StatusIcon = status.icon;
                const event = getEventForPost(post);

                return (
                  <div
                    key={post.id}
                    className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all ${
                      post.status === 'published' 
                        ? 'border-green-200' 
                        : post.status === 'drafting'
                        ? 'border-yellow-200'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {/* Post Number & Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        {editingPost === post.id ? (
                          <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg font-semibold"
                            onBlur={() => handleEditSave(post.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(post.id);
                              if (e.key === 'Escape') setEditingPost(null);
                            }}
                            autoFocus
                          />
                        ) : (
                          <>
                            <h3 className="text-lg font-semibold text-gray-900 flex-1">{post.title}</h3>
                            <button
                              onClick={() => handleEditStart(post)}
                              className="p-1 text-gray-400 hover:text-purple-600 transition-colors"
                            >
                              <Edit2 className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Goal Tag */}
                    <div className="mb-3">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        {post.goal}
                      </span>
                    </div>

                    {/* Theme Keywords */}
                    <div className="mb-4">
                      <div className="text-xs text-gray-500 mb-1">Theme</div>
                      <div className="text-sm text-gray-700 italic">{post.theme}</div>
                    </div>

                    {/* Prompt Starter */}
                    <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-xs font-semibold text-blue-900 mb-1">Writing Prompt</div>
                      <div className="text-sm text-blue-800">{post.prompt}</div>
                    </div>

                    {/* Event Link */}
                    {event && (
                      <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium">{event.name}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    )}

                    {/* Published Date */}
                    {post.publishedDate && (
                      <div className="mb-4 text-xs text-gray-500">
                        Published: {new Date(post.publishedDate).toLocaleDateString('en-US', { 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </div>
                    )}

                    {/* Status */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${status.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {Object.keys(statusConfig).map((statusKey) => (
                          <button
                            key={statusKey}
                            onClick={() => handleStatusChange(post.id, statusKey)}
                            className={`px-2 py-1 text-xs rounded transition-colors ${
                              post.status === statusKey
                                ? statusConfig[statusKey].color
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            {statusConfig[statusKey].label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Posting Cadence Info */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-5 w-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900">Posting Cadence</h3>
            </div>
            <p className="text-gray-700">
              You're posting <strong>weekly</strong> — {posts.length} posts planned over {Math.ceil(posts.length)} weeks.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This rhythm helps you maintain consistency while building momentum for your narrative arc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
