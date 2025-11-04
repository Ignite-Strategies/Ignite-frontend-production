import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Send, FileText, Paperclip, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function CampaignCreator() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get campaignId from state (clean approach, no URL params)
  const incomingCampaignId = location.state?.campaignId;

  const [campaignId, setCampaignId] = useState(null);
  const [campaignName, setCampaignName] = useState('Q1 Partner Outreach');
  const [campaignDescription, setCampaignDescription] = useState('Reaching out to capital partners and portfolio managers');
  const [contactList, setContactList] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [availableLists, setAvailableLists] = useState([]);
  const [subject, setSubject] = useState('Doing amazing things at BusinessPoint Law');
  const [message, setMessage] = useState('Hi {{firstName}},\n\nHow are you? We\'re doing amazing things at BusinessPoint Law and I\'d love to tell you more.\n\nBook a meeting here: {{bookMeetingLink}}\n\nBest,\n{{yourName}}');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Mock contact lists - pre-populated
  useEffect(() => {
    const lists = [
      { id: 1, name: 'Capital Partners', contactCount: 12, description: 'Debt financing and capital partners' },
      { id: 2, name: 'Portfolio Managers', contactCount: 8, description: 'Active portfolio managers' },
      { id: 3, name: 'Investment Directors', contactCount: 15, description: 'Investment directors and decision makers' },
      { id: 4, name: 'Tech Partners', contactCount: 22, description: 'Technology and vendor partnerships' },
    ];
    setAvailableLists(lists);
    
    // Auto-select first list for demo
    if (!contactList) {
      setContactList(lists[0]);
      setContacts(Array(lists[0].contactCount).fill(null).map((_, i) => ({
        id: i + 1,
        name: `Contact ${i + 1}`,
        email: `contact${i + 1}@example.com`
      })));
    }
  }, []);

  // Load campaign if ID provided
  useEffect(() => {
    if (incomingCampaignId) {
      setCampaignId(incomingCampaignId);
      // In real app, load campaign data from API
      setCampaignName('Q1 Partner Outreach');
      setSubject('Doing amazing things at BusinessPoint Law');
      setMessage('Hi {{firstName}},\n\nHow are you? We\'re doing amazing things at BusinessPoint Law and I\'d love to tell you more.\n\n{{bookMeetingLink}}\n\nBest,\n{{yourName}}');
    }
  }, [incomingCampaignId]);

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      setError('Please enter a campaign name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // In real app, POST to /api/campaigns
      const mockId = Date.now();
      setCampaignId(mockId);
      console.log('✅ Campaign created:', mockId);
    } catch (err) {
      setError('Failed to create campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectList = async (list) => {
    // Allow selecting list even before campaign is created for demo
    setContactList(list);
    // In real app, load contacts from API
    setContacts(Array(list.contactCount).fill(null).map((_, i) => ({
      id: i + 1,
      name: `Contact ${i + 1}`,
      email: `contact${i + 1}@example.com`
    })));
  };

  const insertToken = (token) => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const currentValue = message;
      const tokenText = `{{${token}}}`;
      const newValue = currentValue.substring(0, start) + tokenText + currentValue.substring(end);
      setMessage(newValue);
      
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + tokenText.length, start + tokenText.length);
      }, 0);
    } else {
      setMessage(prev => prev + `{{${token}}}`);
    }
  };

  const handlePreview = () => {
    if (!campaignId || !subject.trim() || !message.trim()) {
      setError('Please fill in subject and message');
      return;
    }

    // Navigate to preview (clean state, no params)
    navigate('/outreach/campaign-preview', { 
      state: { campaignId, subject, message, attachments, contactList } 
    });
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please select a PDF or JPG file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    try {
      setUploadingFile(true);
      setError('');

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Content = e.target.result.split(',')[1];
        const newAttachment = {
          filename: file.name,
          contentType: file.type,
          content: base64Content
        };
        setAttachments(prev => [...prev, newAttachment]);
        setUploadingFile(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload file');
      setUploadingFile(false);
    }
  };

  const removeAttachment = (index) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleStartNew = () => {
    setCampaignId(null);
    setCampaignName('');
    setCampaignDescription('');
    setContactList(null);
    setContacts([]);
    setSubject('');
    setMessage('');
    setError('');
    setAttachments([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <PageHeader
          title="Set Up Your Engagement"
          subtitle="Create personalized outreach campaigns to connect and engage"
          backTo="/outreach"
          backLabel="← Back to Outreach"
        />

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Step 1: Campaign Name */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">1. Campaign Name</h2>
          {campaignId ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div>
                <h4 className="font-medium text-gray-900">{campaignName}</h4>
                <p className="text-sm text-gray-600">ID: {campaignId}</p>
              </div>
              <button
                onClick={handleStartNew}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
              >
                Start New
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="e.g., Q1 Partner Outreach"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Description (optional) - e.g., Reaching out to capital partners"
                value={campaignDescription}
                onChange={(e) => setCampaignDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <button
                onClick={handleCreateCampaign}
                disabled={!campaignName.trim() || loading}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
              >
                Create Campaign
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Pick List */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">2. Pick a Contact List</h2>
          {contactList ? (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
              <div>
                <h4 className="font-medium text-gray-900">{contactList.name}</h4>
                <p className="text-sm text-gray-600">{contacts.length} contacts</p>
              </div>
              <button
                onClick={() => {
                  setContactList(null);
                  setContacts([]);
                }}
                className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
              >
                Change List
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleSelectList(list)}
                  className={`p-4 text-left border-2 rounded-lg transition-colors ${
                    contactList?.id === list.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <h5 className="font-medium text-gray-900">{list.name}</h5>
                  <p className="text-sm text-gray-600">{list.contactCount} contacts</p>
                  <p className="text-xs text-gray-500">{list.description}</p>
                  {contactList?.id === list.id && (
                    <p className="text-xs text-blue-600 mt-1">✓ Selected</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Step 3: Write Message */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">3. Write Your Message</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject Line</label>
              <input
                type="text"
                placeholder="e.g., Doing amazing things at BusinessPoint Law"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
                disabled={!campaignId}
              />
              <p className="mt-1 text-xs text-gray-500">
                Keep it conversational and engaging
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message Body</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                <button
                  onClick={() => insertToken('firstName')}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  disabled={!campaignId}
                >
                  + First Name
                </button>
                <button
                  onClick={() => insertToken('company')}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  disabled={!campaignId}
                >
                  + Company
                </button>
                <button
                  onClick={() => insertToken('bookMeetingLink')}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
                  disabled={!campaignId}
                  title="Meeting booking link"
                >
                  + Book Meeting
                </button>
                <button
                  onClick={() => insertToken('yourName')}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                  disabled={!campaignId}
                >
                  + Your Name
                </button>
              </div>
              <textarea
                placeholder="Hi {{firstName}},\n\nHow are you? We're doing amazing things at BusinessPoint Law and I'd love to tell you more.\n\n{{bookMeetingLink}}\n\nBest,\n{{yourName}}"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                disabled={!campaignId}
              />
              <p className="mt-2 text-xs text-gray-500">
                💡 Tip: Keep it personal and focused on engagement. Invite them to book a meeting.
              </p>
            </div>
          </div>
        </div>

        {/* Step 4: PDF Attachments */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">4. Add Attachments (Optional)</h2>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg"
                onChange={handleFileUpload}
                disabled={uploadingFile}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Paperclip className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {uploadingFile ? 'Uploading...' : 'Click to upload PDF or JPG files'}
                </span>
                <span className="text-xs text-gray-500 mt-1">Max 5MB per file</span>
              </label>
            </div>

            {attachments.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h3>
                <div className="space-y-2">
                  {attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-red-500" />
                        <span className="text-sm font-medium text-gray-700">{attachment.filename}</span>
                      </div>
                      <button
                        onClick={() => removeAttachment(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Button */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <button
            onClick={handlePreview}
            disabled={!campaignId || !subject.trim() || !message.trim()}
            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle className="h-5 w-5" />
            {!campaignId
              ? 'Create Campaign First'
              : !subject.trim() || !message.trim()
              ? 'Fill in Subject & Message'
              : 'Preview Campaign →'}
          </button>
        </div>
      </div>
    </div>
  );
}

