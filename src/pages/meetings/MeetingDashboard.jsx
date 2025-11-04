import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, TrendingUp, Users, Building2, BarChart3, MessageSquare, CheckCircle, Plus, Clock, CalendarDays, Video } from 'lucide-react';

export default function MeetingDashboard() {
  const navigate = useNavigate();
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);
  const [pastMeetings, setPastMeetings] = useState([]);
  const [meetingMetrics, setMeetingMetrics] = useState({ completed: 0, weeklyGoal: 10, past30Days: 0, scheduled: 0 });
  const [personTypes, setPersonTypes] = useState([]);
  const [companyTypes, setCompanyTypes] = useState([]);

  useEffect(() => {
    // TODO: Load meetings and metrics from API
    // const fetchData = async () => {
    //   const [upcoming, past, metrics, personTypesData, companyTypesData] = await Promise.all([
    //     api.get('/meetings?status=Scheduled'),
    //     api.get('/meetings?status=Completed'),
    //     api.get('/meetings/metrics'),
    //     api.get('/meetings/analytics/person-types'),
    //     api.get('/meetings/analytics/company-types')
    //   ]);
    //   setUpcomingMeetings(upcoming.data);
    //   setPastMeetings(past.data);
    //   setMeetingMetrics(metrics.data);
    //   setPersonTypes(personTypesData.data);
    //   setCompanyTypes(companyTypesData.data);
    // };
    // fetchData();
  }, []);

  const recentlyCompleted = pastMeetings.slice(0, 3);
  const progressPercent = meetingMetrics.weeklyGoal > 0 ? (meetingMetrics.completed / meetingMetrics.weeklyGoal) * 100 : 0;
  const maxPersonCount = personTypes.length > 0 ? Math.max(...personTypes.map(p => p.count || 0)) : 1;
  const maxCompanyCount = companyTypes.length > 0 ? Math.max(...companyTypes.map(c => c.count || 0)) : 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/growth-dashboard"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Growth Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Meeting Dashboard</h1>
          <p className="text-gray-600 text-lg">Schedule, prep, and manage your meetings</p>
        </div>
        <button
          onClick={() => navigate('/meetings/schedule')}
          className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-all shadow-lg"
        >
          <Plus className="h-5 w-5" />
          Schedule Meeting
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-blue-900 mb-1">Upcoming</p>
          <p className="text-3xl font-bold text-blue-900">{upcomingMeetings.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm font-medium text-green-900 mb-1">Completed Today</p>
          <p className="text-3xl font-bold text-green-900">{meetingMetrics.completed}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-sm font-medium text-orange-900 mb-1">This Week</p>
          <p className="text-3xl font-bold text-orange-900">{meetingMetrics.past30Days}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-sm font-medium text-purple-900 mb-1">Goal Progress</p>
          <p className="text-3xl font-bold text-purple-900">{progressPercent.toFixed(0)}%</p>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">Upcoming Meetings</h2>
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
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-gray-500">{meeting.datetime}</p>
                      {meeting.type && (
                        <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">
                          {meeting.type}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/meetings/prep/${meeting.id}`)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Prep
                  </button>
                  <button
                    onClick={() => window.open('https://calendly.com', '_blank')}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <Video className="h-4 w-4" />
                    Join
                  </button>
                </div>
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

      {/* Past 30 Days Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Past 30 Days Overview</h2>
          <TrendingUp className="h-6 w-6 text-green-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total Meetings</p>
            <p className="text-3xl font-bold text-gray-900">{meetingMetrics.past30Days}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Weekly Goal Progress</p>
            <p className="text-3xl font-bold text-gray-900">
              {meetingMetrics.completed}/{meetingMetrics.weeklyGoal}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">{progressPercent.toFixed(0)}%</p>
          </div>
        </div>
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Weekly Goal: {meetingMetrics.weeklyGoal} meetings</span>
            <span>{meetingMetrics.completed} completed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Person Type Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Users className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-bold">Person Type Breakdown</h2>
        </div>
        <div className="space-y-4">
          {personTypes.map((person) => (
            <div
              key={person.type}
              className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
              onClick={() => navigate(`/meeting-analytics/person-type/${encodeURIComponent(person.type)}`)}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">{person.type}</span>
                <span className="text-sm font-bold text-gray-900">{person.count}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`${person.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${(person.count / maxPersonCount) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Type Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Company Type Breakdown</h2>
        </div>
        <div className="space-y-4">
          {companyTypes.map((company) => (
            <div
              key={company.type}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => navigate(`/meeting-analytics/company-type/${encodeURIComponent(company.type)}`)}
            >
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">{company.type}</span>
              </div>
              <span className="text-lg font-bold text-gray-900">{company.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => navigate('/meetings/analytics')}
          className="p-6 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-left"
        >
          <BarChart3 className="h-8 w-8 flex-shrink-0" />
          <div>
            <p className="text-lg font-semibold">Analytics</p>
            <p className="text-sm text-orange-100">Review meeting insights</p>
          </div>
        </button>
        <button
          onClick={() => navigate('/meetings/calendar')}
          className="p-6 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 text-left"
        >
          <Calendar className="h-8 w-8 flex-shrink-0" />
          <div>
            <p className="text-lg font-semibold">Calendar View</p>
            <p className="text-sm text-blue-100">See your schedule</p>
          </div>
        </button>
      </div>
    </div>
  );
}

