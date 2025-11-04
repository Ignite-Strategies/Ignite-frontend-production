import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Calendar, FileText, Lightbulb, MessageSquare, Users, TrendingUp } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function RelationshipDashboard() {
  const navigate = useNavigate();
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [contacts, setContacts] = useState({ total: 0, segments: { Aware: 0, Warm: 0, Closed: 0, Lost: 0 }, ecosystem: { Collaborator: 0, Vendor: 0, Partner: 0 } });
  const [meetingMetrics, setMeetingMetrics] = useState({ weeklyGoal: 10, scheduled: 0, completed: 0 });
  const [bdLoopMetrics, setBdLoopMetrics] = useState({ outreach: { emailsSent: 0, replies: 0 }, prep: { upcoming: 0 }, postMeeting: { logged: 0 }, iterate: { personasUpdated: 0 }, message: { templates: 0 } });

  useEffect(() => {
    // TODO: Load data from API
    // const fetchData = async () => {
    //   const [meetings, contactsData, metrics] = await Promise.all([
    //     api.get('/meetings?status=Scheduled'),
    //     api.get('/contacts/stats'),
    //     api.get('/metrics')
    //   ]);
    //   setUpcomingMeetings(meetings.data);
    //   setContacts(contactsData.data);
    //   setMeetingMetrics(metrics.data.meetingMetrics);
    //   setBdLoopMetrics(metrics.data.bdLoopMetrics);
    // };
    // fetchData();
  }, []);

  const bdLoopCards = [
    {
      id: 'outreach',
      title: 'Outreach',
      description: 'Initiate and nurture conversations',
      icon: <Mail className="h-6 w-6" />,
      kpi: `${bdLoopMetrics.outreach.emailsSent} sent / ${bdLoopMetrics.outreach.replies} replies`,
      cta: 'Send Outreach',
      color: 'from-blue-500 to-blue-600',
      route: '/engage',
    },
    {
      id: 'prep',
      title: 'Prep',
      description: 'Prepare for meaningful meetings',
      icon: <Calendar className="h-6 w-6" />,
      kpi: `${bdLoopMetrics.prep.upcoming} upcoming`,
      cta: 'Review Prep',
      color: 'from-orange-500 to-orange-600',
      route: '/meeting-dashboard',
    },
    {
      id: 'post-meeting',
      title: 'Post-Meeting',
      description: 'Capture insights and follow-ups',
      icon: <FileText className="h-6 w-6" />,
      kpi: `${bdLoopMetrics.postMeeting.logged} logged`,
      cta: 'Add Notes',
      color: 'from-green-500 to-green-600',
      route: '/meeting-dashboard',
    },
    {
      id: 'iterate',
      title: 'Iterate',
      description: 'Refine approach from learnings',
      icon: <Lightbulb className="h-6 w-6" />,
      kpi: `${bdLoopMetrics.iterate.personasUpdated} updated`,
      cta: 'Review Insights',
      color: 'from-purple-500 to-purple-600',
      route: '/personas',
    },
    {
      id: 'message',
      title: 'Message',
      description: 'Sharpen communication templates',
      icon: <MessageSquare className="h-6 w-6" />,
      kpi: `${bdLoopMetrics.message.templates} templates`,
      cta: 'Manage Templates',
      color: 'from-red-500 to-red-600',
      route: '/outreach',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Engage Dashboard"
        subtitle="Your engagement command center"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
      />

      {/* Top Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Total Contacts */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Total Contacts</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900">{contacts.total}</p>
        </div>

        {/* Customer Segments */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h3 className="text-sm font-medium text-purple-900 mb-3">Customer Segments</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-xs">
              <span className="text-purple-700 font-semibold">Aware:</span> {contacts.segments.Aware}
            </div>
            <div className="text-xs">
              <span className="text-purple-700 font-semibold">Warm:</span> {contacts.segments.Warm}
            </div>
            <div className="text-xs">
              <span className="text-purple-700 font-semibold">Closed:</span> {contacts.segments.Closed}
            </div>
            <div className="text-xs">
              <span className="text-purple-700 font-semibold">Lost:</span> {contacts.segments.Lost}
            </div>
          </div>
        </div>

        {/* Ecosystem */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <h3 className="text-sm font-medium text-orange-900 mb-3">Ecosystem</h3>
          <div className="space-y-1">
            <div className="text-xs">
              <span className="text-orange-700 font-semibold">Collaborator:</span> {contacts.ecosystem.Collaborator}
            </div>
            <div className="text-xs">
              <span className="text-orange-700 font-semibold">Vendor:</span> {contacts.ecosystem.Vendor}
            </div>
            <div className="text-xs">
              <span className="text-orange-700 font-semibold">Partner:</span> {contacts.ecosystem.Partner}
            </div>
          </div>
        </div>

        {/* Meetings */}
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6 border border-red-200">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="h-6 w-6 text-red-600" />
            <h3 className="text-sm font-medium text-red-900">Meetings</h3>
          </div>
          <div className="space-y-1 text-sm">
            <div>
              <span className="text-red-700 font-semibold">Goal:</span> {meetingMetrics.weeklyGoal}/week
            </div>
            <div>
              <span className="text-red-700 font-semibold">Scheduled:</span> {meetingMetrics.scheduled}
            </div>
            <div>
              <span className="text-red-700 font-semibold">Completed:</span> {meetingMetrics.completed}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* BD Loop Cards */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Business Development Loop</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bdLoopCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-gray-100"
            >
              <div className={`bg-gradient-to-r ${card.color} p-6 text-white rounded-t-xl`}>
                <div className="flex items-center gap-3 mb-2">
                  {card.icon}
                  <h3 className="text-xl font-bold">{card.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">KPI</p>
                  <p className="text-lg font-semibold text-gray-900">{card.kpi}</p>
                </div>
                <button
                  onClick={() => navigate(card.route)}
                  className="w-full px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  {card.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Upcoming Meetings</h2>
          <button
            onClick={() => navigate('/meeting-dashboard')}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            View All →
          </button>
        </div>
        {upcomingMeetings.length > 0 ? (
          <div className="space-y-4">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {meeting.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{meeting.name}</h3>
                    <p className="text-sm text-gray-600">{meeting.company}</p>
                    <p className="text-xs text-gray-500 mt-1">{meeting.datetime}</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/meeting-prep/${meeting.id}`)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Prep
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming meetings scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}

