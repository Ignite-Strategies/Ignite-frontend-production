import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Tag, Filter, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function DemoContactList() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Mock list metadata (in real app, from backend)
  const listMetadata = {
    org_members: {
      name: 'Organization Members',
      count: 24,
      tags: ['Team', 'Internal', 'Active']
    },
    event_contacts: {
      name: 'Event Attendees',
      count: 142,
      tags: ['Events', 'Prospects', 'Pipeline']
    },
    all_contacts: {
      name: 'All Contacts',
      count: 328,
      tags: ['Master', 'Database']
    },
    email_sync: {
      name: 'Email Sync Contacts',
      count: 89,
      tags: ['Auto-Sync', 'Email']
    }
  };

  useEffect(() => {
    // Simulate backend hydration
    setLoading(true);
    setTimeout(() => {
      // Filter contacts based on list type (demo logic)
      let filtered = [];
      switch (listId) {
        case 'org_members':
          filtered = contacts.filter(c => c.company);
          break;
        case 'email_sync':
          filtered = contacts.filter(c => c.source === 'Email' || c.source === 'Microsoft Graph');
          break;
        case 'all_contacts':
          filtered = contacts;
          break;
        default:
          filtered = contacts.slice(0, 50); // Demo: first 50
      }
      setFilteredContacts(filtered);
      setLoading(false);
    }, 800);
  }, [listId, contacts]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    const lowerTerm = term.toLowerCase();
    const filtered = contacts.filter(c => 
      c.name?.toLowerCase().includes(lowerTerm) ||
      c.email?.toLowerCase().includes(lowerTerm) ||
      c.company?.toLowerCase().includes(lowerTerm)
    );
    setFilteredContacts(filtered);
  };

  const metadata = listMetadata[listId] || { name: 'Contact List', count: 0, tags: [] };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Hydrating from backend...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={metadata.name}
        subtitle={`${filteredContacts.length} contacts hydrated from backend`}
        backTo="/contacts"
        backLabel="Back to Contact Management"
      />

      {/* List Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 rounded-lg p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{metadata.name}</h3>
              <p className="text-sm text-gray-600">
                {filteredContacts.length} contacts • Hydrated from backend
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {metadata.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
              >
                <Tag className="h-3 w-3" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-gray-50">
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {contact.source || 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No contacts found</p>
                    {searchTerm && (
                      <p className="text-sm mt-2">Try adjusting your search</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

