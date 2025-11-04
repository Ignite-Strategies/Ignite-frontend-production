import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit2, Check, Circle, FileText, Calendar, Eye } from 'lucide-react';

const statusConfig = {
  not_started: { label: 'Not started', color: 'bg-gray-100 text-gray-600', icon: Circle },
  drafting: { label: 'Drafting', color: 'bg-yellow-100 text-yellow-700', icon: Edit2 },
  published: { label: 'Published', color: 'bg-green-100 text-green-700', icon: Check }
};

export default function PostPlanner({ userData, onBack }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState(userData.posts || []);
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

  const getEventForPost = (post) => {
    return userData.events?.find(e => e.id === post.eventId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Post Planner</h2>
            <p className="text-gray-600">
              {posts.length} posts planned for your narrative arc
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/branding-hub/adam-cole')}
              className="px-4 py-2 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg hover:bg-blue-100 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              See Example Plan
            </button>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Setup
            </button>
          </div>
        </div>

        {/* Narrative Arc Summary */}
        {userData.narrativeArc && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-200">
            <div className="text-sm font-semibold text-purple-900 mb-1">Narrative Arc</div>
            <div className="text-gray-800">{userData.narrativeArc}</div>
            {userData.arcGoal && (
              <div className="text-sm text-gray-600 mt-2">
                Goal: {userData.arcGoal}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => {
          const status = statusConfig[post.status];
          const StatusIcon = status.icon;
          const event = getEventForPost(post);

          return (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-purple-300 transition-all"
            >
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                {editingPost === post.id ? (
                  <div className="flex-1 flex gap-2">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onBlur={() => handleEditSave(post.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleEditSave(post.id);
                        if (e.key === 'Escape') setEditingPost(null);
                      }}
                      autoFocus
                    />
                  </div>
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

              {/* Goal */}
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">Goal</div>
                <div className="text-sm text-gray-700">{post.goal}</div>
              </div>

              {/* Event Link */}
              {event && (
                <div className="mb-4 flex items-center gap-2 text-sm text-blue-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.name}</span>
                </div>
              )}

              {/* Status */}
              <div className="flex items-center justify-between">
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

      {/* Empty State */}
      {posts.length === 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
          <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts planned yet</h3>
          <p className="text-gray-600">Complete the setup wizard to generate your post planner</p>
        </div>
      )}
    </div>
  );
}
