import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageSquare, CheckCircle, XCircle, AlertCircle, TrendingUp, Sparkles, Save } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { mockMeetings } from '../../data/mockData';

export default function MeetingFeedbackForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = mockMeetings.find(m => m.id === parseInt(id));
  const [saving, setSaving] = useState(false);

  const [feedback, setFeedback] = useState({
    outcome: '', // 'closed', 'follow-up', 'no-go', 'referral', 'other'
    rating: 0, // 1-5 stars
    whatWentWell: '',
    whatDidntWork: '',
    whyNo: '', // If outcome is no-go
    nextSteps: '',
    keyTakeaways: '',
    followUpDate: '',
  });

  // Auto-generate suggestions based on meeting
  useEffect(() => {
    if (meeting) {
      // Pre-populate some fields based on meeting context
      if (meeting.type === 'Portfolio Manager') {
        setFeedback(prev => ({
          ...prev,
          nextSteps: `Follow up on portfolio company services discussion, send service overview, schedule deeper dive`,
        }));
      }
    }
  }, [meeting]);

  if (!meeting) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-4">Meeting not found.</p>
        <button
          onClick={() => navigate('/meetings')}
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Meeting Dashboard
        </button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate save
    setTimeout(() => {
      setSaving(false);
      navigate('/meetings', { 
        state: { feedbackSaved: true, meetingName: meeting.name }
      });
    }, 1000);
  };

  const outcomeOptions = [
    { value: 'closed', label: '✅ Closed - Deal/Partnership Secured', icon: CheckCircle, color: 'text-green-600' },
    { value: 'follow-up', label: '🔄 Follow-up Needed', icon: TrendingUp, color: 'text-blue-600' },
    { value: 'no-go', label: '❌ No-Go - Not Moving Forward', icon: XCircle, color: 'text-red-600' },
    { value: 'referral', label: '🤝 Referral Opportunity', icon: MessageSquare, color: 'text-purple-600' },
    { value: 'other', label: '📝 Other', icon: AlertCircle, color: 'text-gray-600' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Post-Meeting Feedback"
        subtitle={`Capture insights from your meeting with ${meeting.name}`}
        backTo="/meetings"
        backLabel="← Back to Meeting Dashboard"
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Meeting Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {meeting.avatar}
            </div>
            <div>
              <h3 className="text-xl font-bold">{meeting.name}</h3>
              <p className="text-gray-600">{meeting.company}</p>
              <p className="text-sm text-gray-500">{meeting.date} at {meeting.time}</p>
            </div>
          </div>
        </div>

        {/* Outcome Selection */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Meeting Outcome <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {outcomeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    feedback.outcome === option.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="outcome"
                    value={option.value}
                    checked={feedback.outcome === option.value}
                    onChange={(e) => setFeedback({ ...feedback, outcome: e.target.value })}
                    className="sr-only"
                  />
                  <Icon className={`h-5 w-5 ${option.color}`} />
                  <span className="font-medium text-gray-900">{option.label}</span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            Overall Meeting Quality <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFeedback({ ...feedback, rating: star })}
                className={`text-3xl transition-transform hover:scale-110 ${
                  star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ★
              </button>
            ))}
          </div>
          {feedback.rating > 0 && (
            <p className="text-sm text-gray-600 mt-2">
              {feedback.rating === 5 && 'Excellent - Everything went perfectly'}
              {feedback.rating === 4 && 'Great - Very productive meeting'}
              {feedback.rating === 3 && 'Good - Met expectations'}
              {feedback.rating === 2 && 'Fair - Some challenges'}
              {feedback.rating === 1 && 'Poor - Significant issues'}
            </p>
          )}
        </div>

        {/* Why No-Go (conditional) */}
        {feedback.outcome === 'no-go' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <XCircle className="h-6 w-6 text-red-600" />
              <label className="block text-lg font-semibold text-red-900">
                Why did it not move forward? <span className="text-red-500">*</span>
              </label>
            </div>
            <textarea
              value={feedback.whyNo}
              onChange={(e) => setFeedback({ ...feedback, whyNo: e.target.value })}
              placeholder="e.g., Not the right fit at this time, budget constraints, already working with another provider, timing isn't right, different priorities..."
              rows="4"
              className="w-full px-4 py-3 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
              required={feedback.outcome === 'no-go'}
            />
            <p className="text-xs text-red-700 mt-2">
              💡 Understanding why helps us improve and identify better opportunities
            </p>
          </div>
        )}

        {/* What Went Well */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            What Went Well? <span className="text-red-500">*</span>
          </label>
          <textarea
            value={feedback.whatWentWell}
            onChange={(e) => setFeedback({ ...feedback, whatWentWell: e.target.value })}
            placeholder="e.g., Great rapport, they were engaged, clear communication of our value prop, identified specific needs..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            required
          />
        </div>

        {/* What Didn't Work */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            What Could Have Gone Better?
          </label>
          <textarea
            value={feedback.whatDidntWork}
            onChange={(e) => setFeedback({ ...feedback, whatDidntWork: e.target.value })}
            placeholder="e.g., They weren't the decision maker, timing wasn't ideal, unclear on their priorities, needed more context..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>

        {/* Key Takeaways */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Key Takeaways
          </label>
          <textarea
            value={feedback.keyTakeaways}
            onChange={(e) => setFeedback({ ...feedback, keyTakeaways: e.target.value })}
            placeholder="Important insights, notes, or information from the meeting..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
          />
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <label className="block text-lg font-semibold text-gray-900 mb-3">
            Next Steps <span className="text-red-500">*</span>
          </label>
          <textarea
            value={feedback.nextSteps}
            onChange={(e) => setFeedback({ ...feedback, nextSteps: e.target.value })}
            placeholder="e.g., Send service overview, schedule follow-up call, introduce to portfolio companies, prepare proposal..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
            required
          />
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Follow-up Date (Optional)
            </label>
            <input
              type="date"
              value={feedback.followUpDate}
              onChange={(e) => setFeedback({ ...feedback, followUpDate: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => navigate('/meetings')}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!feedback.outcome || !feedback.rating || !feedback.whatWentWell || !feedback.nextSteps || (feedback.outcome === 'no-go' && !feedback.whyNo) || saving}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-5 w-5" />
                Save Feedback
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

