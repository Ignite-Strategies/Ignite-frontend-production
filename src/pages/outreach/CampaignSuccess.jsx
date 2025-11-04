import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, Mail, Users, BarChart3, Plus } from 'lucide-react';

/**
 * CampaignSuccess - Success page after sending campaign
 * Shows campaign completion details and next steps
 */
export default function CampaignSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get campaign data from navigation state
  const { campaignId, campaignName, contactList, contactCount } = location.state || {};
  
  const finalCount = contactCount || contactList?.contactCount || 0;
  const finalName = campaignName || 'Campaign';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center py-12 px-4">
      <div className="text-center p-8 bg-white rounded-xl shadow-xl max-w-2xl w-full">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-green-700 mb-2">🎉 Campaign Sent Successfully!</h1>
          <p className="text-lg text-gray-700">
            Your email campaign "{finalName}" has been delivered to <strong>{finalCount}</strong> contacts.
          </p>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            What Just Happened:
          </h3>
          <ul className="text-left text-green-700 space-y-2 max-w-md mx-auto">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Campaign created and configured
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Contact list attached ({finalCount} contacts)
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Message personalized for each contact
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Emails queued for sending
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              Campaign marked as "sent"
            </li>
          </ul>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">🚀 What's Next:</h3>
          <ul className="text-left text-blue-700 space-y-2 max-w-md mx-auto">
            <li>📈 Monitor email engagement and responses</li>
            <li>📝 Create follow-up campaigns if needed</li>
            <li>👥 Build new contact lists for future campaigns</li>
            <li>📊 Track campaign performance and analytics</li>
          </ul>
        </div>
        
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => navigate('/outreach/email-campaigns')}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            View All Campaigns
          </button>
          <button
            onClick={() => navigate('/contact-list-manager')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Manage Lists
          </button>
          <button
            onClick={() => navigate('/outreach/campaign-creator')}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New Campaign
          </button>
          <button
            onClick={() => navigate('/outreach/analytics')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4" />
            View Analytics
          </button>
        </div>
        
        {campaignId && (
          <p className="text-sm text-gray-500 mt-6">
            Campaign ID: <span className="font-mono">{campaignId}</span>
          </p>
        )}
      </div>
    </div>
  );
}

