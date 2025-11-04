import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TrendingUp, Users, Mail, MousePointerClick, MessageSquare, BarChart3 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function CampaignAnalytics() {
  const navigate = useNavigate();
  const location = useLocation();

  // Mock data - campaigns broken down by persona
  const personaAnalytics = [
    {
      persona: 'Venture Investor',
      totalSent: 120,
      opens: 89,
      openRate: 74.2,
      clicks: 22,
      clickRate: 18.3,
      responses: 15,
      responseRate: 12.5,
      meetingsBooked: 3,
      avgEngagement: 'High',
    },
    {
      persona: 'Startup Founder',
      totalSent: 200,
      opens: 145,
      openRate: 72.5,
      clicks: 38,
      clickRate: 19.0,
      responses: 28,
      responseRate: 14.0,
      meetingsBooked: 6,
      avgEngagement: 'High',
    },
    {
      persona: 'Law Partner',
      totalSent: 80,
      opens: 52,
      openRate: 65.0,
      clicks: 12,
      clickRate: 15.0,
      responses: 8,
      responseRate: 10.0,
      meetingsBooked: 1,
      avgEngagement: 'Medium',
    },
  ];

  const overallMetrics = {
    totalSent: personaAnalytics.reduce((sum, p) => sum + p.totalSent, 0),
    totalOpens: personaAnalytics.reduce((sum, p) => sum + p.opens, 0),
    totalClicks: personaAnalytics.reduce((sum, p) => sum + p.clicks, 0),
    totalResponses: personaAnalytics.reduce((sum, p) => sum + p.responses, 0),
    totalMeetings: personaAnalytics.reduce((sum, p) => sum + p.meetingsBooked, 0),
  };

  const overallOpenRate = (overallMetrics.totalOpens / overallMetrics.totalSent * 100).toFixed(1);
  const overallClickRate = (overallMetrics.totalClicks / overallMetrics.totalSent * 100).toFixed(1);
  const overallResponseRate = (overallMetrics.totalResponses / overallMetrics.totalSent * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Campaign Analytics"
        subtitle="Email performance by persona type"
        backTo="/outreach"
        backLabel="Back to Outreach"
      />

      {/* Show different header if accessed from /analytics */}
      {location.pathname === '/analytics' && (
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Outreach Analytics</h1>
          <p className="text-gray-600">Track your campaign performance and engagement metrics</p>
        </div>
      )}

      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-2">
            <Mail className="h-6 w-6 text-blue-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-blue-900">{overallOpenRate}%</p>
              <p className="text-sm text-blue-700">Overall Open Rate</p>
            </div>
          </div>
          <p className="text-xs text-blue-600 mt-2">{overallMetrics.totalOpens} of {overallMetrics.totalSent} opened</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center mb-2">
            <MousePointerClick className="h-6 w-6 text-purple-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-purple-900">{overallClickRate}%</p>
              <p className="text-sm text-purple-700">Click Rate</p>
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-2">{overallMetrics.totalClicks} clicks total</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center mb-2">
            <MessageSquare className="h-6 w-6 text-green-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-green-900">{overallResponseRate}%</p>
              <p className="text-sm text-green-700">Response Rate</p>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">{overallMetrics.totalResponses} responses</p>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center mb-2">
            <Users className="h-6 w-6 text-orange-600 mr-3" />
            <div>
              <p className="text-2xl font-bold text-orange-900">{overallMetrics.totalMeetings}</p>
              <p className="text-sm text-orange-700">Meetings Booked</p>
            </div>
          </div>
          <p className="text-xs text-orange-600 mt-2">From all campaigns</p>
        </div>
      </div>

      {/* By Persona Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Performance by Persona</h2>
            <p className="text-sm text-gray-600 mt-1">See which personas engage best with your outreach</p>
          </div>
          <BarChart3 className="h-6 w-6 text-gray-400" />
        </div>

        <div className="space-y-4">
          {personaAnalytics.map((persona, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg p-6 hover:border-indigo-300 hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Users className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{persona.persona}</h3>
                      <p className="text-xs text-gray-500">Average Engagement: <span className={`font-medium ${
                        persona.avgEngagement === 'High' ? 'text-green-600' : 'text-yellow-600'
                      }`}>{persona.avgEngagement}</span></p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Sent</p>
                  <p className="text-xl font-bold text-gray-900">{persona.totalSent}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Mail className="h-4 w-4 text-blue-500" />
                    <p className="text-xs text-gray-600">Open Rate</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{persona.openRate}%</p>
                  <p className="text-xs text-gray-500">{persona.opens} opened</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MousePointerClick className="h-4 w-4 text-purple-500" />
                    <p className="text-xs text-gray-600">Click Rate</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{persona.clickRate}%</p>
                  <p className="text-xs text-gray-500">{persona.clicks} clicks</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="h-4 w-4 text-green-500" />
                    <p className="text-xs text-gray-600">Response Rate</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{persona.responseRate}%</p>
                  <p className="text-xs text-gray-500">{persona.responses} responses</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="h-4 w-4 text-orange-500" />
                    <p className="text-xs text-gray-600">Meetings</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{persona.meetingsBooked}</p>
                  <p className="text-xs text-gray-500">booked</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200">
        <div className="flex items-start gap-3">
          <TrendingUp className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Key Insights</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Venture Investors</strong> and <strong>Startup Founders</strong> show the highest engagement rates (~72-74% open)</li>
              <li>• <strong>Startup Founders</strong> have the best response rate at 14%</li>
              <li>• <strong>Law Partners</strong> show lower engagement - consider adjusting messaging or timing</li>
              <li>• Overall, campaigns are performing well with {overallOpenRate}% open rate across all personas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

