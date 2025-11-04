import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, CheckCircle, Circle, Clock, Filter, List, Map } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import PageHeader from '../../components/PageHeader';

// Initial roadmap items - the foundational first steps
const initialRoadmapItems = [
  {
    id: '1',
    title: 'Set Up Your Contacts',
    description: 'Sync contacts from email, upload CSV, or manually add your first 50 prospects',
    phase: 'Foundation',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Setup',
    link: '/contacts',
    linkLabel: 'Go to Contacts',
  },
  {
    id: '2',
    title: 'Set Up Deal Pipeline',
    description: 'Configure your pipeline stages: Interested → Had Meeting → Contract Negotiations → Contract Signed',
    phase: 'Foundation',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Setup',
    link: '/deal-pipelines',
    linkLabel: 'Set Up Pipeline',
  },
  {
    id: '3',
    title: 'Define Your Personas',
    description: 'Create profiles for key customer types, decision makers, and partners',
    phase: 'Foundation',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Setup',
    link: '/personas/create',
    linkLabel: 'Create Persona',
  },
  {
    id: '4',
    title: 'Publish First Case Study',
    description: 'Write and publish one case study or success story as a visibility asset',
    phase: 'Foundation',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Content',
    link: '/content',
    linkLabel: 'Create Content',
  },
  {
    id: '5',
    title: 'Send First Outreach Campaign',
    description: 'Create and send your first email campaign to warm leads',
    phase: 'Foundation',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Outreach',
    link: '/outreach/campaign-creator',
    linkLabel: 'Create Campaign',
  },
  {
    id: '6',
    title: 'Book 5 Meetings This Week',
    description: 'Schedule 5 meetings with prospects using your meeting scheduler',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Ongoing',
    link: '/meetings/schedule',
    linkLabel: 'Schedule Meeting',
    recurring: true,
  },
  {
    id: '7',
    title: 'Follow Up After Meetings',
    description: 'Send follow-up emails and update pipeline status for completed meetings',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Ongoing',
    link: '/meetings',
    linkLabel: 'View Meetings',
    recurring: true,
  },
  {
    id: '8',
    title: 'Run Weekly Pipeline Review',
    description: 'Review deals, update stages, and identify next actions',
    phase: 'Scale',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Ongoing',
    link: '/bdpipeline',
    linkLabel: 'View Pipeline',
    recurring: true,
  },
  {
    id: '9',
    title: 'Post Weekly Content',
    description: 'Publish one LinkedIn post or blog article weekly',
    phase: 'Scale',
    status: 'Not Started',
    priority: 'P2',
    targetDate: null,
    category: 'Ongoing',
    link: '/content',
    linkLabel: 'Create Content',
    recurring: true,
  },
  {
    id: '10',
    title: 'Register for Industry Conference',
    description: 'Register for key industry conference in your target market',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Events',
    link: '/events',
    linkLabel: 'View Events',
  },
  {
    id: '11',
    title: 'Register for Trade Show',
    description: 'Sign up for relevant trade show or networking event',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Events',
    link: '/events',
    linkLabel: 'View Events',
  },
  {
    id: '12',
    title: 'Register for Annual Conference',
    description: 'Sign up for annual industry conference',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Events',
    link: '/events',
    linkLabel: 'View Events',
  },
  {
    id: '15',
    title: 'Prepare Event Outreach Strategy',
    description: 'Research attendees, identify target contacts, and prepare outreach messages before events',
    phase: 'Acceleration',
    status: 'Not Started',
    priority: 'P1',
    targetDate: null,
    category: 'Events',
    link: '/events',
    linkLabel: 'View Events',
  },
  {
    id: '13',
    title: 'Attend Industry Conference',
    description: 'Network with prospects, partners, and decision makers at industry events',
    phase: 'Scale',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Events',
    link: '/events',
    linkLabel: 'View Events',
  },
  {
    id: '14',
    title: 'Follow Up After Events',
    description: 'Connect with new contacts on LinkedIn, send follow-up emails, and add to pipeline within 48 hours',
    phase: 'Scale',
    status: 'Not Started',
    priority: 'P0',
    targetDate: null,
    category: 'Ongoing',
    link: '/contacts',
    linkLabel: 'Add Contacts',
    recurring: true,
  },
];

export default function BDPipelineRoadmap() {
  const navigate = useNavigate();
  const [roadmapItems, setRoadmapItems] = useLocalStorage('bdRoadmapItems', initialRoadmapItems);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'timeline'
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const phases = ['Foundation', 'Acceleration', 'Scale', 'Optimize'];
  const statuses = ['Not Started', 'In Progress', 'Done'];
  const priorities = ['P0', 'P1', 'P2'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Done':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="h-5 w-5" />;
      case 'In Progress':
        return <Clock className="h-5 w-5" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };

  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'Foundation':
        return 'bg-red-100 text-red-700';
      case 'Acceleration':
        return 'bg-orange-100 text-orange-700';
      case 'Scale':
        return 'bg-yellow-100 text-yellow-700';
      case 'Optimize':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'P0':
        return 'text-red-600 font-bold';
      case 'P1':
        return 'text-orange-600 font-semibold';
      case 'P2':
        return 'text-gray-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleStatusChange = (itemId, newStatus) => {
    setRoadmapItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  const filteredItems = roadmapItems.filter(item => {
    if (filterPhase !== 'all' && item.phase !== filterPhase) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    return true;
  });

  // Sort: P0 first, then by phase order, then by status (Not Started → In Progress → Done)
  const sortedItems = [...filteredItems].sort((a, b) => {
    // Priority first
    if (a.priority !== b.priority) {
      const priorityOrder = { P0: 0, P1: 1, P2: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    // Then phase
    const phaseOrder = { Foundation: 0, Acceleration: 1, Scale: 2, Optimize: 3 };
    if (phaseOrder[a.phase] !== phaseOrder[b.phase]) {
      return phaseOrder[a.phase] - phaseOrder[b.phase];
    }
    // Then status
    const statusOrder = { 'Not Started': 0, 'In Progress': 1, 'Done': 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });

  const stats = {
    total: roadmapItems.length,
    done: roadmapItems.filter(i => i.status === 'Done').length,
    inProgress: roadmapItems.filter(i => i.status === 'In Progress').length,
    notStarted: roadmapItems.filter(i => i.status === 'Not Started').length,
  };

  const foundationItems = roadmapItems.filter(i => i.phase === 'Foundation');
  const foundationDone = foundationItems.filter(i => i.status === 'Done').length;
  const foundationProgress = foundationDone / foundationItems.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="BD Pipeline Roadmap"
        subtitle="Your day-to-day guide to building business development success"
        backTo="/growth-dashboard"
        backLabel="← Back to Growth Dashboard"
      />

      {/* End State Message */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8 border-2 border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
              🎯
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">The Goal: 5 Meetings Per Week</h3>
            <p className="text-gray-700 mb-3">
              If you literally just have <strong>5 meetings per week</strong> with the right people, 
              you'll hit your targets. This roadmap shows you exactly what to do first, 
              then what to keep doing.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">Foundation Progress:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${foundationProgress * 100}%` }}
                  />
                </div>
                <span className="font-semibold text-indigo-600">
                  {foundationDone} / {foundationItems.length} done
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">View:</span>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <List className="h-4 w-4 inline mr-1" />
                List
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  viewMode === 'timeline'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Map className="h-4 w-4 inline mr-1" />
                Timeline
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{stats.notStarted}</div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.done}</div>
            <div className="text-sm text-gray-600">Done</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Phase:</span>
            <select
              value={filterPhase}
              onChange={(e) => setFilterPhase(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              {phases.map(phase => (
                <option key={phase} value={phase}>{phase}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <button
                      onClick={() => {
                        const currentIndex = statuses.indexOf(item.status);
                        const nextIndex = (currentIndex + 1) % statuses.length;
                        handleStatusChange(item.id, statuses[nextIndex]);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 transition ${getStatusColor(item.status)}`}
                    >
                      {getStatusIcon(item.status)}
                      <span className="font-medium">{item.status}</span>
                    </button>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(item.phase)}`}>
                      {item.phase}
                    </span>
                    <span className={`text-sm font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    {item.recurring && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                        Ongoing
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(item.link);
                      }}
                      className="text-sm text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
                    >
                      {item.linkLabel} →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timeline View */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {phases.map((phase) => {
            const phaseItems = sortedItems.filter(item => item.phase === phase);
            if (phaseItems.length === 0 && filterPhase !== 'all') return null;

            return (
              <div key={phase} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{phase}</h3>
                  <div className="text-sm text-gray-600">
                    {phaseItems.filter(i => i.status === 'Done').length} / {phaseItems.length} done
                  </div>
                </div>
                <div className="space-y-3">
                  {phaseItems.map((item) => (
                    <div
                      key={item.id}
                      className="border-l-4 border-gray-200 pl-4 py-2"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const currentIndex = statuses.indexOf(item.status);
                            const nextIndex = (currentIndex + 1) % statuses.length;
                            handleStatusChange(item.id, statuses[nextIndex]);
                          }}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg border transition ${getStatusColor(item.status)}`}
                        >
                          {getStatusIcon(item.status)}
                          <span className="font-medium text-sm">{item.status}</span>
                        </button>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.title}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <span className={`text-xs font-medium ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add Roadmap Item</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newItem = {
                  id: Date.now().toString(),
                  title: formData.get('title'),
                  description: formData.get('description'),
                  phase: formData.get('phase'),
                  status: formData.get('status'),
                  priority: formData.get('priority'),
                  category: formData.get('category'),
                  link: formData.get('link') || null,
                  linkLabel: formData.get('linkLabel') || null,
                  recurring: formData.get('recurring') === 'on',
                };
                setRoadmapItems([...roadmapItems, newItem]);
                setShowAddModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="2"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                  <select
                    name="phase"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {phases.map(phase => (
                      <option key={phase} value={phase}>{phase}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    name="priority"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Setup, Ongoing, etc."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link (optional)</label>
                  <input
                    type="text"
                    name="link"
                    placeholder="/contacts"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link Label (optional)</label>
                  <input
                    type="text"
                    name="linkLabel"
                    placeholder="Go to Contacts"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="recurring" className="rounded" />
                  <span className="text-sm text-gray-700">Recurring/Ongoing task</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

