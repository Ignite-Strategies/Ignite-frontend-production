import { TrendingUp, ArrowRight, Users, DollarSign, Eye, Heart, MessageCircle, Target, Zap } from 'lucide-react';

export default function MomentumLoop() {
  const metrics = {
    totalEngagement: 108,
    views: 1245,
    likes: 89,
    comments: 19,
    shares: 12,
    followersGained: 23,
    engagementRate: 12.4,
    trend: '+18%',
    period: 'Last 30 days'
  };

  const bdActivity = [
    {
      id: 1,
      postDate: '2024-01-15',
      postContent: 'Just shipped our biggest feature yet...',
      engagement: { views: 342, likes: 28, comments: 5 },
      bdOutcomes: [
        { type: 'Inbound Lead', date: '2024-01-16', value: '$15,000', source: 'LinkedIn post' },
        { type: 'Mentor Outreach', date: '2024-01-17', value: '2 connections', source: 'Direct message' }
      ]
    },
    {
      id: 2,
      postDate: '2024-01-08',
      postContent: 'The biggest lesson from our last sprint...',
      engagement: { views: 189, likes: 15, comments: 3 },
      bdOutcomes: [
        { type: 'Early Adopter', date: '2024-01-10', value: '1 signup', source: 'Post comment' }
      ]
    },
    {
      id: 3,
      postDate: '2024-01-01',
      postContent: 'Grateful for the mentors who pushed us...',
      engagement: { views: 267, likes: 22, comments: 7 },
      bdOutcomes: [
        { type: 'Partnership Inquiry', date: '2024-01-03', value: 'Potential deal', source: 'Email follow-up' }
      ]
    }
  ];

  const correlation = {
    postsToLeads: 3,
    postsToMeetings: 2,
    postsToDeals: 1,
    avgDaysToEngagement: 2.3,
    influenceScore: 72,
    trustMeter: 8.5
  };

  return (
    <div className="space-y-6">
      {/* Engagement Overview */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How Your Voice is Landing</h2>
            <p className="text-gray-600">Authenticity → Engagement → Trust → Deals</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Trend</div>
            <div className="text-2xl font-bold text-green-600 flex items-center gap-2">
              <TrendingUp className="h-6 w-6" />
              {metrics.trend}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-100">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-5 w-5 text-purple-600" />
              <span className="text-sm text-gray-600">Views</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.views.toLocaleString()}</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-white rounded-xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-5 w-5 text-red-600" />
              <span className="text-sm text-gray-600">Likes</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.likes}</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <span className="text-sm text-gray-600">Comments</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.comments}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-white rounded-xl p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm text-gray-600">Engagement Rate</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{metrics.engagementRate}%</div>
          </div>
        </div>
      </div>

      {/* Correlation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="h-6 w-6" />
            <h3 className="text-lg font-bold">Influence Score</h3>
          </div>
          <div className="text-4xl font-bold mb-2">{correlation.influenceScore}</div>
          <div className="text-sm opacity-90">Feeds into Ignite Coefficient</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-6 w-6" />
            <h3 className="text-lg font-bold">Trust Meter</h3>
          </div>
          <div className="text-4xl font-bold mb-2">{correlation.trustMeter}/10</div>
          <div className="text-sm opacity-90">Based on engagement quality</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <ArrowRight className="h-6 w-6" />
            <h3 className="text-lg font-bold">Conversion Window</h3>
          </div>
          <div className="text-4xl font-bold mb-2">{correlation.avgDaysToEngagement}d</div>
          <div className="text-sm opacity-90">Avg. days to BD activity</div>
        </div>
      </div>

      {/* Post-to-BD Activity Mapping */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">The Loop: Posts → Engagement → BD Activity</h3>
        
        {bdActivity.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">No BD activity yet</p>
            <p className="text-sm text-gray-500">Keep posting authentically — engagement leads to opportunities</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bdActivity.map((activity) => (
              <div
                key={activity.id}
                className="border-l-4 border-purple-500 pl-6 py-4 bg-gradient-to-r from-purple-50/50 to-white rounded-r-xl"
              >
                {/* Post Info */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-500">{new Date(activity.postDate).toLocaleDateString()}</span>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" /> {activity.engagement.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" /> {activity.engagement.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {activity.engagement.comments}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{activity.postContent}"</p>
                </div>

                {/* BD Outcomes */}
                <div className="space-y-2">
                  {activity.bdOutcomes.map((outcome, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                    >
                      <ArrowRight className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{outcome.type}</span>
                          <span className="text-sm text-gray-500">• {new Date(outcome.date).toLocaleDateString()}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">{outcome.value}</span>
                          <span className="mx-2">•</span>
                          <span className="text-gray-500">{outcome.source}</span>
                        </div>
                      </div>
                      {outcome.type.includes('Lead') || outcome.type.includes('Deal') ? (
                        <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <Users className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6">Your Authenticity ROI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold mb-2">{correlation.postsToLeads}</div>
            <div className="text-sm text-gray-300">Posts → Leads</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">{correlation.postsToMeetings}</div>
            <div className="text-sm text-gray-300">Posts → Meetings</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">{correlation.postsToDeals}</div>
            <div className="text-sm text-gray-300">Posts → Deals</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-sm text-gray-300">
            Your authentic voice is building trust and opening doors. Keep sharing your journey.
          </p>
        </div>
      </div>
    </div>
  );
}