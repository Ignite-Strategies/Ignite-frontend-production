import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../../components/Navigation';

export default function EmailCampaigns() {
  const navigate = useNavigate();
  
  // State for campaign creation flow
  const [campaignId, setCampaignId] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");
  const [contactList, setContactList] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [availableLists, setAvailableLists] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [gmailAuthenticated, setGmailAuthenticated] = useState(true); // Demo: assume authenticated
  
  // Dummy data for demo
  const dummyLists = [
    { id: 1, name: "BD Prospects", contactCount: 47, description: "Potential business development clients" },
    { id: 2, name: "Tech Partners", contactCount: 23, description: "Technology integration partners" },
    { id: 3, name: "Event Attendees", contactCount: 156, description: "People from networking events" },
    { id: 4, name: "Referral Sources", contactCount: 12, description: "Key referral partners" }
  ];

  const dummyContacts = [
    { id: 1, firstName: "Sarah", lastName: "Chen", email: "sarah@techcorp.com", company: "TechCorp Inc" },
    { id: 2, firstName: "Mike", lastName: "Rodriguez", email: "mike@startupxyz.com", company: "StartupXYZ" },
    { id: 3, firstName: "Jennifer", lastName: "Park", email: "jennifer@enterprise.com", company: "Enterprise Co" },
    { id: 4, firstName: "David", lastName: "Wilson", email: "david@globalsys.com", company: "Global Systems" },
    { id: 5, firstName: "Lisa", lastName: "Brown", email: "lisa@innovation.com", company: "Innovation Labs" }
  ];

  const dummyCampaigns = [
    {
      id: 1,
      name: "Q4 BD Outreach",
      status: "Sent",
      sentDate: "2024-01-15",
      recipients: 47,
      openRate: 68.5,
      clickRate: 12.3,
      subject: "Ready to scale your BD efforts?"
    },
    {
      id: 2,
      name: "Partner Newsletter",
      status: "Draft",
      sentDate: null,
      recipients: 23,
      openRate: null,
      clickRate: null,
      subject: "Monthly partner updates"
    },
    {
      id: 3,
      name: "Event Follow-up",
      status: "Scheduled",
      sentDate: "2024-01-20",
      recipients: 156,
      openRate: null,
      clickRate: null,
      subject: "Thanks for connecting at the event"
    }
  ];

  const [activeTab, setActiveTab] = useState('campaigns');

  useEffect(() => {
    setAvailableLists(dummyLists);
  }, []);

  const handleCreateCampaign = async () => {
    if (!campaignName.trim()) {
      setError("Please enter a campaign name");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCampaign = {
        id: Date.now(),
        name: campaignName.trim(),
        description: campaignDescription.trim() || `Campaign created ${new Date().toLocaleDateString()}`,
        status: "draft"
      };
      
      setCampaignId(newCampaign.id);
      setError("");
    } catch (err) {
      setError("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectList = async (list) => {
    if (!campaignId) {
      setError("Please create your campaign first (Step 1)");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setContactList(list);
      setContacts(dummyContacts);
      setError("");
    } catch (err) {
      setError("Failed to assign list");
    } finally {
      setLoading(false);
    }
  };

  const handleStartNew = () => {
    setCampaignId(null);
    setCampaignName("");
    setCampaignDescription("");
    setContactList(null);
    setContacts([]);
    setSubject("");
    setMessage("");
    setError("");
  };

  const handleSendCampaign = async () => {
    if (!campaignId || !subject.trim() || !message.trim()) {
      setError("Please complete all steps before sending");
      return;
    }

    setLoading(true);
    try {
      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      setError("");
      alert("Campaign sent successfully!");
      handleStartNew();
    } catch (err) {
      setError("Failed to send campaign");
    } finally {
      setLoading(false);
    }
  };

  const renderCampaigns = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-900">Email Campaigns</h3>
        <button
          onClick={() => setActiveTab('create')}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Create Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyCampaigns.map((campaign) => (
          <div key={campaign.id} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{campaign.name}</h4>
              <span className={`px-2 py-1 text-xs rounded-full ${
                campaign.status === 'Sent' ? 'bg-green-100 text-green-800' :
                campaign.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipients:</span>
                <span className="font-medium">{campaign.recipients}</span>
              </div>
              {campaign.openRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Rate:</span>
                  <span className="font-medium">{campaign.openRate}%</span>
                </div>
              )}
              {campaign.clickRate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Click Rate:</span>
                  <span className="font-medium">{campaign.clickRate}%</span>
                </div>
              )}
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Subject:</p>
              <p className="text-sm font-medium text-gray-900">{campaign.subject}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCreateCampaign = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Create Email Campaign</h3>
          <p className="text-gray-600">Build and send your email campaign</p>
        </div>
        <button
          onClick={() => setActiveTab('campaigns')}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          ← Back to Campaigns
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Campaign Name */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          1. Campaign Name
        </h2>

        {campaignId ? (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
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
              placeholder="Enter campaign name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={campaignDescription}
              onChange={(e) => setCampaignDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
            <button
              onClick={handleCreateCampaign}
              disabled={!campaignName.trim() || loading}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300"
            >
              {loading ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        )}
      </div>

      {/* Step 2: Pick List */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          2. Pick a Contact List
        </h2>

        {contactList ? (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div>
              <h4 className="font-medium text-gray-900">{contactList.name}</h4>
              <p className="text-sm text-gray-600">{contactList.contactCount} contacts</p>
            </div>
            <button
              onClick={() => setContactList(null)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
            >
              Change
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-gray-600">Select a contact list to send your campaign to:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableLists.map((list) => (
                <button
                  key={list.id}
                  onClick={() => handleSelectList(list)}
                  className="p-4 text-left border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors"
                >
                  <h4 className="font-medium text-gray-900">{list.name}</h4>
                  <p className="text-sm text-gray-600">{list.contactCount} contacts</p>
                  <p className="text-xs text-gray-500">{list.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step 3: Write Email */}
      {contactList && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            3. Write Your Email
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject Line</label>
              <input
                type="text"
                placeholder="Enter subject line"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
              <textarea
                placeholder="Hi {{firstName}},\n\nWrite your message here...\n\nBest regards,\nYour Name"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="8"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Use {{firstName}}, {{lastName}}, {{company}} for personalization
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleSendCampaign}
                disabled={!subject.trim() || !message.trim() || loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300"
              >
                {loading ? 'Sending...' : 'Send Campaign'}
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Email Campaigns</h1>
            <p className="text-gray-600">Create and manage your email marketing campaigns</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('campaigns')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'campaigns'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  📧 Campaigns
                </button>
                <button
                  onClick={() => setActiveTab('create')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'create'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  ✏️ Create
                </button>
                <button
                  onClick={() => setActiveTab('lists')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'lists'
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  👥 Contact Lists
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {activeTab === 'campaigns' && renderCampaigns()}
            {activeTab === 'create' && renderCreateCampaign()}
            {activeTab === 'lists' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">👥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Lists</h3>
                <p className="text-gray-600">Manage your contact lists and segments</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}