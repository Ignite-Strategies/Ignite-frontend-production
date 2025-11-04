import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Navigation from '../../components/Navigation';
import CreateEvent from './CreateEvent';

export default function Events() {
  const navigate = useNavigate();
  
  // State for event filtering and selection
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [hydratedEvents, setHydratedEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('discover');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Industry options
  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'Real Estate',
    'Manufacturing',
    'Professional Services',
    'Startups',
    'SaaS',
    'E-commerce',
    'Consulting'
  ];

  // Location options
  const locations = [
    'San Francisco, CA',
    'New York, NY',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Chicago, IL',
    'Los Angeles, CA',
    'Denver, CO',
    'Miami, FL',
    'Remote/Virtual'
  ];

  // Dummy events data based on industry/location
  const eventsDatabase = {
    'Technology': {
      'San Francisco, CA': [
        {
          id: 1,
          name: 'TechCrunch Disrupt 2024',
          date: '2024-03-15',
          location: 'Moscone Center, San Francisco',
          type: 'Conference',
          attendees: 12000,
          price: '$1,295',
          description: 'The world\'s leading startup conference',
          industry: 'Technology',
          tags: ['startups', 'venture-capital', 'networking']
        },
        {
          id: 2,
          name: 'SaaS Growth Summit',
          date: '2024-03-22',
          location: 'Palace Hotel, San Francisco',
          type: 'Conference',
          attendees: 2500,
          price: '$799',
          description: 'Scaling your SaaS business with proven strategies',
          industry: 'Technology',
          tags: ['saas', 'growth', 'revenue']
        }
      ],
      'New York, NY': [
        {
          id: 3,
          name: 'NYC Tech Week',
          date: '2024-04-10',
          location: 'Various Venues, NYC',
          type: 'Week-long Event',
          attendees: 5000,
          price: 'Free',
          description: 'A week of tech events across NYC',
          industry: 'Technology',
          tags: ['networking', 'startups', 'innovation']
        }
      ],
      'Remote/Virtual': [
        {
          id: 4,
          name: 'Virtual BD Masterclass',
          date: '2024-03-18',
          location: 'Online',
          type: 'Webinar',
          attendees: 500,
          price: '$99',
          description: 'Master business development in the digital age',
          industry: 'Technology',
          tags: ['business-development', 'sales', 'strategy']
        }
      ]
    },
    'Healthcare': {
      'San Francisco, CA': [
        {
          id: 5,
          name: 'HealthTech Innovation Summit',
          date: '2024-04-05',
          location: 'Marriott Marquis, San Francisco',
          type: 'Conference',
          attendees: 3000,
          price: '$1,199',
          description: 'The future of healthcare technology',
          industry: 'Healthcare',
          tags: ['healthtech', 'innovation', 'digital-health']
        }
      ]
    },
    'Finance': {
      'New York, NY': [
        {
          id: 6,
          name: 'FinTech Connect',
          date: '2024-04-20',
          location: 'Javits Center, NYC',
          type: 'Conference',
          attendees: 8000,
          price: '$899',
          description: 'Connecting finance and technology',
          industry: 'Finance',
          tags: ['fintech', 'banking', 'payments']
        }
      ]
    }
  };

  // My upcoming events (dummy data)
  const myUpcomingEvents = [
    {
      id: 1,
      name: 'TechCrunch Disrupt 2024',
      date: '2024-03-15',
      location: 'Moscone Center, San Francisco',
      type: 'Conference',
      status: 'Registered',
      confirmationCode: 'TC2024-001'
    },
    {
      id: 4,
      name: 'Virtual BD Masterclass',
      date: '2024-03-18',
      location: 'Online',
      type: 'Webinar',
      status: 'Registered',
      confirmationCode: 'BD2024-004'
    }
  ];

  useEffect(() => {
    // Load events from localStorage on mount
    const savedEvents = JSON.parse(localStorage.getItem('myEvents') || '[]');
    setMyEvents([...myUpcomingEvents, ...savedEvents]);
  }, []);

  const handleEventCreated = (newEvent) => {
    setMyEvents(prev => [...prev, newEvent]);
    setShowCreateModal(false);
    // Switch to My Events tab to show the new event
    setActiveTab('my-events');
  };

  const handleHydrateEvents = async () => {
    if (!selectedIndustry || !selectedLocation) {
      alert('Please select both industry and location');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const events = eventsDatabase[selectedIndustry]?.[selectedLocation] || [];
      setHydratedEvents(events);
    } catch (err) {
      console.error('Error hydrating events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAttendEvent = (event) => {
    const newEvent = {
      ...event,
      status: 'Registered',
      confirmationCode: `${event.name.substring(0, 2).toUpperCase()}2024-${event.id.toString().padStart(3, '0')}`
    };
    
    setMyEvents(prev => [...prev, newEvent]);
    setHydratedEvents(prev => prev.filter(e => e.id !== event.id));
  };

  const handleRemoveEvent = (eventId) => {
    setMyEvents(prev => prev.filter(e => e.id !== eventId));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderDiscoverEvents = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Discover Events</h3>
      
      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Find Events by Industry & Location</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              <option value="">Select Location</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          onClick={handleHydrateEvents}
          disabled={!selectedIndustry || !selectedLocation || loading}
          className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300"
        >
          {loading ? 'Finding Events...' : 'Find Events'}
        </button>
      </div>

      {/* Hydrated Events */}
      {hydratedEvents.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">
            Events in {selectedIndustry} • {selectedLocation}
          </h4>
          
          {hydratedEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-semibold text-gray-900">{event.name}</h5>
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {event.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">📅 {formatDate(event.date)}</p>
                      <p className="text-sm text-gray-600">📍 {event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">👥 {event.attendees.toLocaleString()} attendees</p>
                      <p className="text-sm text-gray-600">💰 {event.price}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="ml-6">
                  <button
                    onClick={() => handleAttendEvent(event)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Attend Event
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {hydratedEvents.length === 0 && selectedIndustry && selectedLocation && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">🔍</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Events Found</h4>
          <p className="text-gray-600">Try a different industry or location combination</p>
        </div>
      )}
    </div>
  );

  const renderMyEvents = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Your Upcoming Events</h3>
      
      {myEvents.length > 0 ? (
        <div className="space-y-4">
          {myEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h5 className="text-lg font-semibold text-gray-900">{event.name}</h5>
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                      {event.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">📅 {formatDate(event.date)}</p>
                      <p className="text-sm text-gray-600">📍 {event.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">🎫 Confirmation: {event.confirmationCode}</p>
                      <p className="text-sm text-gray-600">📋 Type: {event.type}</p>
                    </div>
                  </div>
                </div>
                
                <div className="ml-6 flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    View Details
                  </button>
                  <button
                    onClick={() => handleRemoveEvent(event.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📅</div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Events</h4>
          <p className="text-gray-600 mb-4">Discover and register for events to build your network</p>
          <button
            onClick={() => setActiveTab('discover')}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Discover Events
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Tracker</h1>
              <p className="text-gray-600">Discover and manage your networking events</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Plus className="h-5 w-5" />
              Add Event Manually
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('discover')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'discover'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  🔍 Discover Events
                </button>
                <button
                  onClick={() => setActiveTab('my-events')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'my-events'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📅 My Events
                </button>
                <button
                  onClick={() => setActiveTab('past-events')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'past-events'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📊 Past Events
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'discover' && renderDiscoverEvents()}
            {activeTab === 'my-events' && renderMyEvents()}
            {activeTab === 'past-events' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Past Events</h3>
                <p className="text-gray-600">Track your event attendance and networking results</p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Create Event Modal */}
      {showCreateModal && (
        <CreateEvent
          onClose={() => setShowCreateModal(false)}
          onEventCreated={handleEventCreated}
        />
      )}
    </div>
  );
}