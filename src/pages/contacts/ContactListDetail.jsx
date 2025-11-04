import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Building2 } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ContactListDetail() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [lists] = useLocalStorage('contactLists', []);
  const [contacts] = useLocalStorage('contacts', []);
  
  const [list, setList] = useState(null);
  const [listContacts, setListContacts] = useState([]);

  useEffect(() => {
    const foundList = lists.find(l => l.id === listId);
    if (foundList) {
      setList(foundList);
      // Get actual contact objects from contactIds
      const foundContacts = foundList.contactIds
        ? foundList.contactIds.map(id => contacts.find(c => c.id === id)).filter(Boolean)
        : [];
      setListContacts(foundContacts);
    }
  }, [listId, lists, contacts]);

  if (!list) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Contact list not found</p>
          <button
            onClick={() => navigate('/contact-list-manager')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Contact Lists
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={list.name}
        subtitle={`${listContacts.length} contacts • ${list.description || 'No description'}`}
        backTo="/contact-list-manager"
        backLabel="Back to Contact Lists"
      />

      {/* List Info */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Type</p>
            <p className="text-lg font-semibold text-gray-900">{list.type || 'Standard'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Contacts</p>
            <p className="text-lg font-semibold text-gray-900">{listContacts.length}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created</p>
            <p className="text-lg font-semibold text-gray-900">
              {list.createdAt ? new Date(list.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900">Contacts ({listContacts.length})</h3>
        </div>

        {listContacts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {listContacts.map((contact) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No contacts in this list</p>
          </div>
        )}
      </div>
    </div>
  );
}

