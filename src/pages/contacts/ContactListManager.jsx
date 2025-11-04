import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Mock initial lists if none exist
const getInitialLists = () => [
  {
    id: 'demo-q1-outreach',
    name: 'Q1 Outreach Targets',
    description: 'High-priority contacts for Q1 outreach campaign',
    type: 'Campaign',
    totalContacts: 47,
    contactIds: [],
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'demo-event-attendees',
    name: 'Legal Tech Conference 2024',
    description: 'All attendees from the Legal Tech Conference',
    type: 'Event',
    totalContacts: 128,
    contactIds: [],
    createdAt: new Date('2024-02-10').toISOString(),
  },
  {
    id: 'demo-org-members',
    name: 'Organization Members',
    description: 'All active members from your organization',
    type: 'Organization',
    totalContacts: 89,
    contactIds: [],
    createdAt: new Date('2024-01-01').toISOString(),
  },
  {
    id: 'demo-warm-leads',
    name: 'Warm Leads - Follow Up',
    description: 'Contacts who have engaged but need follow-up',
    type: 'Custom',
    totalContacts: 23,
    contactIds: [],
    createdAt: new Date('2024-02-20').toISOString(),
  },
  {
    id: 'demo-referrals',
    name: 'Referral Partners',
    description: 'Partners who have provided referrals',
    type: 'Custom',
    totalContacts: 15,
    contactIds: [],
    createdAt: new Date('2024-01-30').toISOString(),
  },
];

export default function ContactListManager() {
  const navigate = useNavigate();
  const [lists, setLists] = useLocalStorage('contactLists', []);
  const [campaigns, setCampaigns] = useLocalStorage('campaigns', []);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize with mock data if lists are empty
  useEffect(() => {
    if (lists.length === 0) {
      const initialLists = getInitialLists();
      setLists(initialLists);
      
      // Initialize a mock campaign so one list shows as "Assigned"
      if (campaigns.length === 0) {
        const mockCampaign = {
          id: 'demo-q1-campaign',
          name: 'Q1 Outreach Campaign',
          contactListId: 'demo-q1-outreach',
          status: 'active',
          createdAt: new Date('2024-01-15').toISOString(),
        };
        setCampaigns([mockCampaign]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter lists
  const filteredLists = lists.filter(list => 
    list.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteList = (listId) => {
    if (window.confirm('Are you sure you want to delete this contact list?')) {
      setLists(lists.filter(l => l.id !== listId));
    }
  };

  const handleViewList = (listId) => {
    navigate(`/contact-list-detail/${listId}`);
  };

  const getListStatus = (list) => {
    // Check if list is assigned to any campaign
    const assignedCampaign = campaigns.find(c => c.contactListId === list.id);
    return assignedCampaign ? { isAssigned: true, campaign: assignedCampaign } : { isAssigned: false };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Contact Lists"
        subtitle="Manage and organize your contact segments"
        backTo="/outreach"
        backLabel="Back to Outreach"
        actions={
          <button
            onClick={() => navigate('/contact-list-builder')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New List
          </button>
        }
      />

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contact lists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Lists Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLists.map((list) => {
          const status = getListStatus(list);
          return (
            <div key={list.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {list.name}
                </h3>
                <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
                  status.isAssigned 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {status.isAssigned ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Assigned
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3" />
                      Available
                    </>
                  )}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">
                {list.description || "No description"}
              </p>
              
              <div className="text-xs text-gray-500 mb-4 space-y-1">
                <p>Type: {list.type || 'Standard'}</p>
                <p>Contacts: {list.totalContacts ?? (list.contactIds?.length || 0)}</p>
                {list.createdAt && (
                  <p>Created: {new Date(list.createdAt).toLocaleDateString()}</p>
                )}
                {status.isAssigned && (
                  <p className="text-orange-600 font-medium">
                    Assigned to: {status.campaign?.name || 'Campaign'}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleViewList(list.id)}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition flex items-center gap-1"
                >
                  <Eye className="h-3 w-3" />
                  View
                </button>
                
                <button
                  onClick={() => handleDeleteList(list.id)}
                  className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredLists.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg mb-2">No contact lists found</p>
          <p className="text-gray-400 text-sm mb-6">
            {searchTerm ? 'Try adjusting your search' : 'Create your first list to get started'}
          </p>
          <button
            onClick={() => navigate('/contact-list-builder')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create New List
          </button>
        </div>
      )}
    </div>
  );
}

