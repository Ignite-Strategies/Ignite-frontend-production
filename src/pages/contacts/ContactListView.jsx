import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

// Hardcoded demo contacts for when localStorage is empty
const getMockContacts = () => [
  { id: 'c1', name: 'Sarah Kim', email: 'sarah.kim@horizoncredit.com', company: 'Horizon Credit', status: 'Cold' },
  { id: 'c2', name: 'Michael Rodriguez', email: 'mrodriguez@arscapital.com', company: 'Ares Capital', status: 'Cold' },
  { id: 'c3', name: 'Jennifer Park', email: 'jpark@orionholdings.com', company: 'Orion Holdings', status: 'Cold' },
  { id: 'c4', name: 'David Chen', email: 'dchen@meridianpartners.com', company: 'Meridian Partners', status: 'Cold' },
  { id: 'c5', name: 'Lisa Thompson', email: 'lthompson@techventures.com', company: 'TechVentures Capital', status: 'Cold' },
  { id: 'c6', name: 'Robert Wilson', email: 'rwilson@solartrust.com', company: 'SolarTrust LLC', status: 'Cold' },
  { id: 'c7', name: 'Amanda Lee', email: 'alee@growthcapital.com', company: 'Growth Capital Partners', status: 'Cold' },
  { id: 'c8', name: 'James Martinez', email: 'jmartinez@enterprisefund.com', company: 'Enterprise Fund', status: 'Cold' },
  { id: 'c9', name: 'Emily Chen', email: 'echen@strategicventures.com', company: 'Strategic Ventures', status: 'Cold' },
  { id: 'c10', name: 'Christopher Brown', email: 'cbrown@capitalpartners.com', company: 'Capital Partners Fund', status: 'Cold' },
];

export default function ContactListView() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  const prefilledName = searchParams.get('name') || '';
  const prefilledDescription = searchParams.get('description') || '';
  
  const [contacts] = useLocalStorage('contacts', []);
  const [lists, setLists] = useLocalStorage('contactLists', []);
  const [displayedContacts, setDisplayedContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [listName, setListName] = useState(prefilledName);
  const [listDescription, setListDescription] = useState(prefilledDescription);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Update list name/description if URL params change
    if (prefilledName) setListName(prefilledName);
    if (prefilledDescription) setListDescription(prefilledDescription);
  }, [prefilledName, prefilledDescription]);

  useEffect(() => {
    loadContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type, contacts]);

  const loadContacts = () => {
    // Use mock contacts if localStorage is empty (for demo)
    const allContacts = contacts.length > 0 ? contacts : getMockContacts();
    
    // Mock: Load contacts based on type
    // In real app, this would call API to hydrate contacts
    let filtered = [];
    
    switch (type) {
      case 'all_contacts':
        filtered = allContacts;
        break;
      case 'org_members':
        // Mock: filter by organization members (contacts with company)
        filtered = allContacts.filter(c => c.company || c.organizationId);
        break;
      case 'event_contacts':
        // Mock: filter by event attendees
        filtered = allContacts.filter(c => c.eventId || c.source === 'event');
        break;
      case 'custom':
        filtered = allContacts;
        break;
      default:
        filtered = allContacts;
    }
    
    setDisplayedContacts(filtered);
    
    // Auto-select all contacts when they hydrate
    if (filtered.length > 0) {
      const allIds = filtered.map(c => c.id);
      setSelectedContacts(new Set(allIds));
    } else {
      setSelectedContacts(new Set());
    }
  };

  const handleSelectContact = (contactId) => {
    const newSelected = new Set(selectedContacts);
    if (newSelected.has(contactId)) {
      newSelected.delete(contactId);
    } else {
      newSelected.add(contactId);
    }
    setSelectedContacts(newSelected);
  };

  const handleSelectAll = () => {
    const allIds = displayedContacts.map(c => c.id);
    setSelectedContacts(new Set(allIds));
  };

  const handleDeselectAll = () => {
    setSelectedContacts(new Set());
  };

  const handleCreateList = () => {
    if (!listName) {
      alert('Please enter a list name');
      return;
    }

    const contactIds = Array.from(selectedContacts);

    if (contactIds.length === 0) {
      alert('Please select at least one contact');
      return;
    }

    const newList = {
      id: Date.now().toString(),
      name: listName,
      description: listDescription,
      type: type || 'custom',
      contactIds: contactIds,
      totalContacts: contactIds.length,
      createdAt: new Date().toISOString()
    };

    setLists([...lists, newList]);
    
    // Show success message
    setShowSuccess(true);
    
    // Navigate to manager after a brief delay
    setTimeout(() => {
      navigate('/contact-list-manager');
    }, 1500);
  };

  const getListName = () => {
    switch (type) {
      case 'all_contacts': return 'All Contacts';
      case 'org_members': return 'Organization Members';
      case 'event_contacts': return 'Event Contacts';
      case 'custom': return 'Custom Selection';
      default: return 'Contact List';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">List Created!</h3>
            <p className="text-gray-600 mb-4">
              Your contact list "{listName}" has been created successfully with {selectedContacts.size} contacts.
            </p>
            <p className="text-sm text-gray-500">Redirecting to Contact Lists...</p>
          </div>
        </div>
      )}

      <PageHeader
        title={getListName()}
        subtitle={`${displayedContacts.length} contacts available`}
        backTo="/contact-list-builder"
        backLabel="Back to Builder"
      />

      {/* List Details Form */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">List Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              List Name *
            </label>
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="Enter list name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={listDescription}
              onChange={(e) => setListDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Selection Controls */}
      {displayedContacts.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Contacts ({displayedContacts.length})
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
              >
                Select All
              </button>
              <button
                onClick={handleDeselectAll}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm"
              >
                Deselect All
              </button>
              <span className="text-sm text-gray-600">
                {selectedContacts.size} of {displayedContacts.length} selected
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Select</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {displayedContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedContacts.has(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {contact.name || `${contact.firstName} ${contact.lastName}`}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.company || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {contact.status && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {contact.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {displayedContacts.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <p className="text-gray-500">No contacts found for this list type</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/contact-list-builder')}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateList}
          disabled={!listName || displayedContacts.length === 0}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Create List ({selectedContacts.size > 0 ? selectedContacts.size : displayedContacts.length} contacts)
        </button>
      </div>
    </div>
  );
}

