import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone, Building2, Filter, Search, Plus, Trash2 } from 'lucide-react';
import api from '../../lib/api';

export default function ContactsView() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pipelineFilter, setPipelineFilter] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState(new Set());
  const [bulkDeleting, setBulkDeleting] = useState(false);

  // Get CompanyHQId from localStorage
  const companyHQId = localStorage.getItem('companyHQId');

  useEffect(() => {
    loadContacts();
  }, [companyHQId, pipelineFilter]);

  const loadContacts = async () => {
    if (!companyHQId) {
      console.warn('⚠️ No CompanyHQId found');
      setLoading(false);
      return;
    }

    // First, try to load from localStorage (fast)
    const cachedContacts = localStorage.getItem('contacts');
    if (cachedContacts) {
      try {
        const contacts = JSON.parse(cachedContacts);
        console.log('✅ Loaded contacts from localStorage:', contacts.length);
        setContacts(contacts);
        setLoading(false);
        // Refresh in background silently (no loading state)
        refreshContactsFromAPI(false); // false = don't show loading
        return;
      } catch (error) {
        console.error('❌ Error parsing cached contacts:', error);
        // Fall through to API fetch
      }
    }

    // No cache or parse error - fetch from API (with loading state)
    await refreshContactsFromAPI(true); // true = show loading
  };

  const refreshContactsFromAPI = async (showLoading = true) => {
    if (!companyHQId) return;

    try {
      if (showLoading) {
        setLoading(true);
      }
      console.log('📡 Fetching contacts from API for companyHQId:', companyHQId);
      
      // Build query params
      const params = new URLSearchParams({ companyHQId });
      if (pipelineFilter) {
        params.append('pipeline', pipelineFilter);
      }

      const response = await api.get(`/api/contacts?${params.toString()}`);
      
      if (response.data.success && response.data.contacts) {
        const fetchedContacts = response.data.contacts;
        console.log('✅ Contacts fetched from API:', fetchedContacts.length);
        
        // Update localStorage
        localStorage.setItem('contacts', JSON.stringify(fetchedContacts));
        
        // Update state
        setContacts(fetchedContacts);
      } else {
        console.warn('⚠️ No contacts in response');
        setContacts([]);
      }
    } catch (error) {
      console.error('❌ Error fetching contacts:', error);
      console.error('❌ Error response:', error.response);
      // Don't show error to user - just log it
      // If we have cached data, keep showing it
      if (showLoading) {
        setContacts([]);
      }
    } finally {
      if (showLoading) {
        setLoading(false);
      }
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
    if (selectedContacts.size === filteredContacts.length) {
      setSelectedContacts(new Set());
    } else {
      setSelectedContacts(new Set(filteredContacts.map(c => c.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedContacts.size === 0) return;
    
    const count = selectedContacts.size;
    if (!window.confirm(`Are you sure you want to delete ${count} contact${count !== 1 ? 's' : ''}?`)) {
      return;
    }

    try {
      setBulkDeleting(true);
      console.log('🗑️ Bulk deleting contacts:', Array.from(selectedContacts));
      
      // Delete all selected contacts
      const deletePromises = Array.from(selectedContacts).map(contactId =>
        api.delete(`/api/contacts/${contactId}`)
      );
      
      await Promise.all(deletePromises);
      
      console.log('✅ Bulk delete successful');
      
      // Remove from state
      const updatedContacts = contacts.filter(c => !selectedContacts.has(c.id));
      setContacts(updatedContacts);
      
      // Update localStorage
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      
      // Clear selection
      setSelectedContacts(new Set());
      
    } catch (error) {
      console.error('❌ Error bulk deleting contacts:', error);
      alert('Failed to delete some contacts. Please try again.');
    } finally {
      setBulkDeleting(false);
    }
  };

  const handleDelete = async (contactId, e) => {
    e.stopPropagation(); // Prevent row click
    
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      setDeletingId(contactId);
      console.log('🗑️ Deleting contact:', contactId);
      
      await api.delete(`/api/contacts/${contactId}`);
      
      console.log('✅ Contact deleted successfully');
      
      // Remove from state
      const updatedContacts = contacts.filter(c => c.id !== contactId);
      setContacts(updatedContacts);
      
      // Update localStorage
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      
      // Remove from selection if selected
      const newSelected = new Set(selectedContacts);
      newSelected.delete(contactId);
      setSelectedContacts(newSelected);
      
    } catch (error) {
      console.error('❌ Error deleting contact:', error);
      alert('Failed to delete contact. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  // Filter contacts by search term
  const filteredContacts = contacts.filter(contact => {
    // Apply pipeline filter
    if (pipelineFilter && contact.pipeline?.pipeline !== pipelineFilter) {
      return false;
    }
    
    // Apply search filter
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    const name = `${contact.firstName || ''} ${contact.lastName || ''}`.toLowerCase();
    const email = (contact.email || '').toLowerCase();
    const company = (contact.contactCompany?.companyName || '').toLowerCase();
    return name.includes(search) || email.includes(search) || company.includes(search);
  });

  const getPipelineBadge = (pipeline) => {
    if (!pipeline) return null;
    
    const colors = {
      prospect: 'bg-blue-100 text-blue-800',
      client: 'bg-green-100 text-green-800',
      collaborator: 'bg-purple-100 text-purple-800',
      institution: 'bg-orange-100 text-orange-800'
    };
    
    // Capitalize first letter
    const pipelineLabel = pipeline.pipeline ? 
      pipeline.pipeline.charAt(0).toUpperCase() + pipeline.pipeline.slice(1) : 
      '';
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[pipeline.pipeline] || 'bg-gray-100 text-gray-800'}`}>
        {pipelineLabel}
      </span>
    );
  };

  const getStageBadge = (pipeline) => {
    if (!pipeline || !pipeline.stage) return null;
    
    return (
      <span className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
        {pipeline.stage}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">Loading Contacts...</div>
          <div className="text-gray-600">Fetching your contacts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">👥 All Contacts</h1>
              <p className="text-gray-600 mt-2">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} • {contacts.length} total
              </p>
            </div>
            <div className="flex gap-3">
              {selectedContacts.size > 0 && (
                <button
                  onClick={handleBulkDelete}
                  disabled={bulkDeleting}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    bulkDeleting
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-red-600 text-white hover:bg-red-700'
                  }`}
                >
                  <Trash2 className="h-5 w-5" />
                  Delete {selectedContacts.size}
                </button>
              )}
              <button
                onClick={() => navigate('/contacts')}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              >
                ← Back to People Hub
              </button>
              <button
                onClick={() => navigate('/contacts/manual')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                <Plus className="h-5 w-5" />
                Add Contact
              </button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search contacts by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              {/* Pipeline Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={pipelineFilter}
                  onChange={(e) => setPipelineFilter(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                >
                  <option value="">All Pipelines</option>
                  <option value="prospect">Prospect</option>
                  <option value="client">Client</option>
                  <option value="collaborator">Collaborator</option>
                  <option value="institution">Institution</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contacts Table */}
        {filteredContacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || pipelineFilter 
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first contact'}
            </p>
            {!searchTerm && !pipelineFilter && (
              <button
                onClick={() => navigate('/contacts/manual')}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Your First Contact
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Contacts ({filteredContacts.length})</h2>
              {selectedContacts.size > 0 && (
                <span className="text-sm text-gray-600">
                  {selectedContacts.size} selected
                </span>
              )}
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={filteredContacts.length > 0 && selectedContacts.size === filteredContacts.length}
                        onChange={handleSelectAll}
                        className="rounded"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pipeline</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr 
                      key={contact.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/contacts/${contact.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedContacts.has(contact.id)}
                          onChange={() => handleSelectContact(contact.id)}
                          onClick={(e) => e.stopPropagation()}
                          className="rounded"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span className="hover:text-blue-600 hover:underline">
                          {contact.goesBy || `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unnamed Contact'}
                        </span>
                        {contact.title && (
                          <div className="text-xs text-gray-400 mt-1">{contact.title}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.email || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.phone || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {contact.contactCompany?.companyName || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPipelineBadge(contact.pipeline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStageBadge(contact.pipeline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={(e) => handleDelete(contact.id, e)}
                          disabled={deletingId === contact.id}
                          className={`p-2 rounded-lg transition ${
                            deletingId === contact.id
                              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                              : 'bg-red-50 text-red-600 hover:bg-red-100'
                          }`}
                          title="Delete contact"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

