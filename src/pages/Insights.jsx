import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, CheckCircle, XCircle, AlertCircle, Lightbulb, ArrowRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function Insights() {
  const navigate = useNavigate();

  // Mock insights data - in Phase 2, this will come from API
  const insights = {
    whatsWorking: [
      {
        id: 1,
        category: 'Outreach',
        title: 'Startup Founders responding well',
        description: '14% response rate - highest among all personas. Your messaging resonates with their priorities.',
        impact: 'high',
        metric: '14% response rate',
        action: 'Double down on this persona',
        icon: TrendingUp,
        color: 'green'
      },
      {
        id: 2,
        category: 'Meetings',
        title: 'Capital Partners converting',
        description: '75% of meetings with Capital Partners lead to follow-ups. Strong fit for your services.',
        impact: 'high',
        metric: '75% follow-up rate',
        action: 'Prioritize more Capital Partner meetings',
        icon: CheckCircle,
        color: 'green'
      },
      {
        id: 3,
        category: 'Channels',
        title: 'LinkedIn outreach outperforming',
        description: 'LinkedIn campaigns showing 72% open rate vs 45% for email-only. Better engagement.',
        impact: 'medium',
        metric: '72% open rate',
        action: 'Shift more budget to LinkedIn',
        icon: TrendingUp,
        color: 'blue'
      },
    ],
    whatsNotWorking: [
      {
        id: 1,
        category: 'Outreach',
        title: 'Law Partners low engagement',
        description: 'Only 65% open rate and 10% response rate. Messaging may not align with their priorities.',
        impact: 'high',
        metric: '10% response rate',
        action: 'Refine messaging or deprioritize',
        icon: TrendingDown,
        color: 'red'
      },
      {
        id: 2,
        category: 'Pipeline',
        title: 'Contract negotiations stalling',
        description: 'Deals spending 3+ weeks in negotiation. Need better objection handling or faster responses.',
        impact: 'high',
        metric: '3+ week avg',
        action: 'Review negotiation process',
        icon: AlertCircle,
        color: 'orange'
      },
      {
        id: 3,
        category: 'Meetings',
        title: 'Low meeting-to-deal conversion',
        description: 'Only 15% of meetings convert to proposals. Need better qualification or follow-up.',
        impact: 'medium',
        metric: '15% conversion',
        action: 'Improve meeting prep & follow-up',
        icon: XCircle,
        color: 'red'
      },
    ],
    recommendations: [
      {
        id: 1,
        title: 'Focus on Startup Founders',
        description: 'Your highest-performing persona. Allocate more resources here.',
        priority: 'high',
        icon: Lightbulb,
        color: 'yellow'
      },
      {
        id: 2,
        title: 'Revise Law Partner messaging',
        description: 'Current approach isn\'t resonating. Test new value propositions.',
        priority: 'medium',
        icon: Lightbulb,
        color: 'yellow'
      },
      {
        id: 3,
        title: 'Speed up negotiation process',
        description: 'Long cycles killing deals. Implement faster decision framework.',
        priority: 'high',
        icon: Lightbulb,
        color: 'yellow'
      },
    ]
  };

  const getIcon = (icon, color) => {
    const Icon = icon;
    const colorClasses = {
      green: 'text-green-600 bg-green-100',
      red: 'text-red-600 bg-red-100',
      orange: 'text-orange-600 bg-orange-100',
      blue: 'text-blue-600 bg-blue-100',
      yellow: 'text-yellow-600 bg-yellow-100',
    };
    return <Icon className={`h-6 w-6 ${colorClasses[color]}`} />;
  };

  const getImpactBadge = (impact) => {
    const styles = {
      high: 'bg-red-100 text-red-700 border-red-200',
      medium: 'bg-orange-100 text-orange-700 border-orange-200',
      low: 'bg-gray-100 text-gray-700 border-gray-200',
    };
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${styles[impact] || styles.low}`}>
        {impact === 'high' ? 'High Impact' : impact === 'medium' ? 'Medium Impact' : 'Low Impact'}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Insights"
        subtitle="What's working, what's not, and what to do about it"
        backTo="/growth-dashboard"
        backLabel="Back to Dashboard"
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <h3 className="text-sm font-medium text-green-900">What's Working</h3>
          </div>
          <p className="text-2xl font-bold text-green-900">{insights.whatsWorking.length}</p>
          <p className="text-xs text-green-700 mt-1">high-performing areas</p>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
          <div className="flex items-center gap-2 mb-2">
            <XCircle className="h-5 w-5 text-red-600" />
            <h3 className="text-sm font-medium text-red-900">Needs Attention</h3>
          </div>
          <p className="text-2xl font-bold text-red-900">{insights.whatsNotWorking.length}</p>
          <p className="text-xs text-red-700 mt-1">areas to improve</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-yellow-600" />
            <h3 className="text-sm font-medium text-yellow-900">Recommendations</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-900">{insights.recommendations.length}</p>
          <p className="text-xs text-yellow-700 mt-1">actionable insights</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-sm font-medium text-blue-900">Overall Health</h3>
          </div>
          <p className="text-2xl font-bold text-blue-900">Good</p>
          <p className="text-xs text-blue-700 mt-1">trending positive</p>
        </div>
      </div>

      {/* What's Working */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">What's Working ✅</h2>
        </div>
        <div className="space-y-4">
          {insights.whatsWorking.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="border-2 border-green-200 rounded-lg p-6 hover:border-green-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {item.category}
                        </span>
                        {getImpactBadge(item.impact)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Metric</p>
                          <p className="text-sm font-semibold text-gray-900">{item.metric}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Action</p>
                          <p className="text-sm font-medium text-green-700">{item.action}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* What's Not Working */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <XCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-gray-900">What's Not Working ❌</h2>
        </div>
        <div className="space-y-4">
          {insights.whatsNotWorking.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="border-2 border-red-200 rounded-lg p-6 hover:border-red-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-medium">
                          {item.category}
                        </span>
                        {getImpactBadge(item.impact)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-3">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-500">Metric</p>
                          <p className="text-sm font-semibold text-gray-900">{item.metric}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Action</p>
                          <p className="text-sm font-medium text-red-700">{item.action}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg p-6 mb-8 border-2 border-yellow-200">
        <div className="flex items-center gap-3 mb-6">
          <Lightbulb className="h-6 w-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-gray-900">Recommendations 💡</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.recommendations.map((rec) => {
            const Icon = rec.icon;
            return (
              <div
                key={rec.id}
                className="bg-white rounded-lg p-5 border border-yellow-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {rec.priority === 'high' ? 'High Priority' : 'Medium Priority'}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{rec.title}</h3>
                    <p className="text-sm text-gray-600">{rec.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/outreach/analytics')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Campaign Analytics</h3>
              <p className="text-sm text-gray-600">Dive deeper</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/meetings')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Meeting Insights</h3>
              <p className="text-sm text-gray-600">View meeting performance</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>

        <button
          onClick={() => navigate('/bdpipeline')}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all text-left border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pipeline Health</h3>
              <p className="text-sm text-gray-600">Analyze deal flow</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}


