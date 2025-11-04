import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Send, Eye, ArrowLeft, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

/**
 * CampaignPreview - Preview and send campaign
 */
export default function CampaignPreview() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { campaignId, subject, message, attachments, contactList } = location.state || {};
  const [sending, setSending] = useState(false);
  
  if (!campaignId || !subject || !message) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PageHeader
          title="Missing Campaign Data"
          subtitle="Please go back and create your campaign"
          backTo="/outreach/campaign-creator"
          backLabel="Back to Creator"
        />
      </div>
    );
  }

  const handleSend = async () => {
    // Confirm sending (in real app, use a proper modal)
    const confirmed = typeof window !== 'undefined' 
      ? window.confirm(`Send this campaign to ${contactList?.contactCount || 0} contacts?`)
      : true;
    
    if (!confirmed) {
      return;
    }

    setSending(true);
    
    // Simulate sending delay
    setTimeout(() => {
      navigate('/outreach/campaign-success', {
        state: {
          campaignId,
          campaignName: `Campaign ${campaignId}`,
          contactList,
          contactCount: contactList?.contactCount || 0
        }
      });
    }, 1500);
  };

  // Preview with sample personalization
  const previewMessage = message
    .replace(/\{\{firstName\}\}/g, 'John')
    .replace(/\{\{lastName\}\}/g, 'Smith')
    .replace(/\{\{company\}\}/g, 'Acme Corp')
    .replace(/\{\{bookMeetingLink\}\}/g, '[Book a Meeting](https://calendly.com/businesspoint-law)')
    .replace(/\{\{yourName\}\}/g, 'Your Name')
    .replace(/\{\{email\}\}/g, 'john.smith@example.com');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Preview Campaign"
        subtitle="Review your campaign before sending"
        backTo="/outreach/campaign-creator"
        backLabel="← Back to Creator"
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-600">Campaign ID:</span>
            <span className="ml-2 text-gray-900 font-mono">{campaignId}</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600">Contact List:</span>
            <span className="ml-2 text-gray-900">{contactList?.name || 'No list selected'}</span>
            <span className="ml-2 text-gray-500">({contactList?.contactCount || 0} contacts)</span>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Email Preview
          </h3>
          <p className="text-sm text-gray-500">This is how your email will look to recipients</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-600">Subject:</label>
            <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-900">{subject}</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Message:</label>
            <div className="mt-1 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-900 font-sans text-sm leading-relaxed">
                {previewMessage}
              </pre>
            </div>
          </div>

          {attachments && attachments.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600">Attachments:</label>
              <div className="mt-1 space-y-2">
                {attachments.map((att, idx) => (
                  <div key={idx} className="p-2 bg-gray-50 rounded border border-gray-200 text-sm">
                    📎 {att.filename}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/outreach/campaign-creator', { state: { campaignId } })}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit Campaign
        </button>
        <button
          onClick={handleSend}
          disabled={sending}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {sending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Sending...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Campaign to {contactList?.contactCount || 0} Contacts
            </>
          )}
        </button>
      </div>
    </div>
  );
}

