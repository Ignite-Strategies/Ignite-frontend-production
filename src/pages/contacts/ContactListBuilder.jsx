import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Building2, Mail, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ContactListBuilder() {
  const navigate = useNavigate();
  const [contacts] = useLocalStorage('contacts', []);
  const [lists, setLists] = useLocalStorage('contactLists', []);
  
  const [selectedType, setSelectedType] = useState('');
  const [listName, setListName] = useState('');
  const [listDescription, setListDescription] = useState('');

  const listTypes = [
    {
      id: 'all_contacts',
      name: 'All Contacts',
      description: 'Include all contacts from your CRM',
      icon: <Users className="h-6 w-6" />,
    },
    {
      id: 'org_members',
      name: 'Organization Members',
      description: 'All members from your organization',
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      id: 'event_contacts',
      name: 'Event Contacts',
      description: 'Contacts from events and conferences',
      icon: <Building2 className="h-6 w-6" />,
    },
    {
      id: 'custom',
      name: 'Custom Selection',
      description: 'Manually select contacts',
      icon: <Mail className="h-6 w-6" />,
    }
  ];

  const handleSelectType = (typeId) => {
    setSelectedType(typeId);
    const type = listTypes.find(t => t.id === typeId);
    if (type) {
      setListName(type.name);
      setListDescription(type.description);
    }
  };

  const handleContinue = () => {
    if (!selectedType) {
      alert('Please select a list type');
      return;
    }
    
    const selectedTypeObj = listTypes.find(t => t.id === selectedType);
    if (selectedTypeObj) {
      // Pass listName and description as URL params
      const params = new URLSearchParams();
      params.set('type', selectedType);
      if (listName) params.set('name', listName);
      if (listDescription) params.set('description', listDescription);
      navigate(`/contact-list-view?${params.toString()}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Create Contact List"
        subtitle="Choose a source for your contact list"
        backTo="/contact-list-manager"
        backLabel="Back to Contact Lists"
      />

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select List Type</h3>
        
        <div className="space-y-3">
          {listTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleSelectType(type.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                selectedType === type.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  selectedType === type.id ? 'bg-indigo-100' : 'bg-gray-100'
                }`}>
                  {type.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{type.name}</h4>
                    {selectedType === type.id && (
                      <CheckCircle className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* List Details (shown when type selected) */}
      {selectedType && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">List Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                List Name
              </label>
              <input
                type="text"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="Enter list name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={listDescription}
                onChange={(e) => setListDescription(e.target.value)}
                placeholder="Enter description"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/contact-list-manager')}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleContinue}
          disabled={!selectedType || !listName}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

