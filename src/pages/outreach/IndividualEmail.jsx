import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Send, X, User, Paperclip } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function IndividualEmail() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    to: '',
    subject: '',
    body: '',
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = async () => {
    if (!formData.to || !formData.subject || !formData.body) {
      alert('Please fill in all fields');
      return;
    }

    setSending(true);
    // TODO: Implement actual email sending API call
    setTimeout(() => {
      setSending(false);
      alert('Email sent successfully!');
      navigate('/outreach');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/outreach');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Send Individual Email"
        subtitle="Compose and send a 1:1 email"
        backTo="/outreach"
        backLabel="Back to Outreach"
      />

      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* To Field */}
        <div className="mb-6">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              id="to"
              name="to"
              value={formData.to}
              onChange={handleChange}
              placeholder="recipient@example.com"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        {/* Subject Field */}
        <div className="mb-6">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Email subject"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Body Field */}
        <div className="mb-6">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={12}
            placeholder="Type your message here..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => {}}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <Paperclip className="h-5 w-5" />
              Attach File
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sending || !formData.to || !formData.subject || !formData.body}
              className="flex items-center gap-2 px-6 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

