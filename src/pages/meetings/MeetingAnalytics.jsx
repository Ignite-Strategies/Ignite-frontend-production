import { useNavigate } from 'react-router-dom';
import { BarChart3, Users, Building2, TrendingUp, Calendar } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { mockPersonTypes, mockCompanyTypes, mockMeetingMetrics } from '../../data/mockData';

export default function MeetingAnalytics() {
  const navigate = useNavigate();
  const maxPersonCount = Math.max(...mockPersonTypes.map(p => p.count));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Meeting Analytics"
        subtitle="Detailed insights into your meeting data"
        backTo="/meetings"
        backLabel="← Back to Meeting Dashboard"
      />

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Total Meetings</p>
          <p className="text-3xl font-bold text-gray-900">{mockMeetingMetrics.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold text-gray-900">{mockMeetingMetrics.completed}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Scheduled</p>
          <p className="text-3xl font-bold text-gray-900">{mockMeetingMetrics.scheduled}</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-sm text-gray-600 mb-1">Weekly Goal</p>
          <p className="text-3xl font-bold text-gray-900">{mockMeetingMetrics.weeklyGoal}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Person Type Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-bold">Person Type Breakdown</h2>
          </div>
          <div className="space-y-4">
            {mockPersonTypes.map((person) => (
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
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold">Company Type Breakdown</h2>
          </div>
          <div className="space-y-4">
            {mockCompanyTypes.map((company) => (
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
      </div>
    </div>
  );
}

