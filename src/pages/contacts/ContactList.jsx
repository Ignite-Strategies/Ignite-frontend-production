import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Phone, Building2, Filter, Search, Plus } from 'lucide-react';
import api from '../../lib/api';

export default function ContactList() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [pipelineFilter, setPipelineFilter] = useState('');

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
        // Refresh in background to get latest data
        refreshContactsFromAPI();
        return;
      } catch (error) {
        console.error('❌ Error parsing cached contacts:', error);
        // Fall through to API fetch
      }
    }

    // No cache or parse error - fetch from API
    await refreshContactsFromAPI();
  };

  const refreshContactsFromAPI = async () => {
    if (!companyHQId) return;

    try {
      setLoading(true);
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
      // Don't show error to user - just show empty state
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter contacts by search term
  const filteredContacts = contacts.filter(contact => {
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
    
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${colors[pipeline.pipeline] || 'bg-gray-100 text-gray-800'}`}>
        {pipeline.pipeline}
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </button>
            <span className="text-gray-400">|</span>
            <button
              onClick={() => navigate('/contacts')}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <Users className="h-5 w-5 mr-2" />
              People Hub
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                👥 All Contacts
              </h1>
              <p className="text-gray-600">
                {loading ? 'Loading...' : `${filteredContacts.length} contact${filteredContacts.length !== 1 ? 's' : ''}`}
              </p>
            </div>
            <button
              onClick={() => navigate('/contacts/manual')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-5 w-5" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
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

        {/* Contacts Table */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pipeline
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/contacts/${contact.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-semibold">
                              {contact.firstName?.[0] || contact.lastName?.[0] || '?'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {contact.goesBy || `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unnamed Contact'}
                            </div>
                            {contact.goesBy && (contact.firstName || contact.lastName) && (
                              <div className="text-sm text-gray-500">
                                {contact.firstName} {contact.lastName}
                              </div>
                            )}
                            {contact.title && (
                              <div className="text-xs text-gray-400">{contact.title}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {contact.email && (
                            <div className="flex items-center gap-2 mb-1">
                              <Mail className="h-4 w-4 text-gray-400" />
                              {contact.email}
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              {contact.phone}
                            </div>
                          )}
                          {!contact.email && !contact.phone && (
                            <span className="text-gray-400 text-xs">No contact info</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.contactCompany ? (
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{contact.contactCompany.companyName}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPipelineBadge(contact.pipeline)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStageBadge(contact.pipeline)}
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

