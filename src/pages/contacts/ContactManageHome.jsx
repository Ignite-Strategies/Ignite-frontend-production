import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Search, RefreshCw, Upload, Users, Tag, Clock, ArrowRight, FileSpreadsheet, X } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useMicrosoftGraph } from '../../hooks/useMicrosoftGraph';

export default function ContactManageHome() {
  const navigate = useNavigate();
  const [lists] = useLocalStorage('contactLists', []);
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const { hydrateContacts, loading } = useMicrosoftGraph();
  const [hydratingList, setHydratingList] = useState(null);
  const [showCsvUpload, setShowCsvUpload] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleHydrateFromEmail = async () => {
    const result = await hydrateContacts();
    if (result.success) {
      alert(`✅ Synced ${result.count} contacts from Microsoft 365 / Email`);
    } else {
      alert('❌ Error syncing contacts: ' + result.error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setCsvFile(selectedFile);
      } else {
        alert('Please select a CSV file');
        setCsvFile(null);
      }
    }
  };

  const handleCsvUpload = async () => {
    if (!csvFile) {
      alert('Please select a CSV file');
      return;
    }

    setUploading(true);
    
    try {
      const text = await csvFile.text();
      const lines = text.split('\n').filter(line => line.trim());
      const headers = lines[0].split(',').map(h => h.trim());
      
      const newContacts = lines.slice(1).map((line, idx) => {
        const values = line.split(',').map(v => v.trim());
        const contact = {};
        headers.forEach((header, i) => {
          contact[header.toLowerCase().replace(/\s+/g, '')] = values[i] || '';
        });
        
        return {
          id: `csv-${Date.now()}-${idx}`,
          name: contact.name || `${contact.firstname || ''} ${contact.lastname || ''}`.trim(),
          email: contact.email || '',
          phone: contact.phone || '',
          company: contact.company || '',
          title: contact.title || contact.jobtitle || '',
          status: contact.status || 'Prospect',
          stage: contact.stage || 'Prospect',
          source: 'CSV Upload',
          uploadedAt: new Date().toISOString(),
          ...contact
        };
      }).filter(c => c.email); // Only contacts with email

      setContacts([...contacts, ...newContacts]);
      alert(`✅ Successfully uploaded ${newContacts.length} contacts from CSV!`);
      setCsvFile(null);
      setShowCsvUpload(false);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format.');
    } finally {
      setUploading(false);
    }
  };

  const handleHydrateList = async (listId) => {
    // For demo - in real app, this would call backend API
    setHydratingList(listId);
    // Simulate API call
    setTimeout(() => {
      setHydratingList(null);
      navigate(`/contacts/demo-list/${listId}`);
    }, 1000);
  };

  // Mock contact lists with metadata (in real app, from backend)
  const contactLists = [
    {
      id: 'prospects',
      name: 'Prospects',
      description: 'Potential clients and business opportunities',
      type: 'prospects',
      count: 142,
      tags: ['Prospects', 'Pipeline', 'Active'],
      uploadedLast30Days: 45,
      lastHydrated: '2025-01-20',
      color: 'blue',
      icon: <Building2 className="h-6 w-6" />
    },
    {
      id: 'tech_partners',
      name: 'Tech Partners',
      description: 'Technology and vendor partnerships',
      type: 'tech_partners',
      count: 38,
      tags: ['Partners', 'Vendors', 'Strategic'],
      uploadedLast30Days: 12,
      lastHydrated: '2025-01-18',
      color: 'indigo',
      icon: <Calendar className="h-6 w-6" />
    },
    {
      id: 'vendors',
      name: 'Vendors',
      description: 'Service providers and suppliers',
      type: 'vendors',
      count: 67,
      tags: ['Vendors', 'Suppliers', 'Active'],
      uploadedLast30Days: 18,
      lastHydrated: '2025-01-22',
      color: 'green',
      icon: <Search className="h-6 w-6" />
    },
    {
      id: 'email_sync',
      name: 'Email Sync Contacts',
      description: 'Contacts synced from Microsoft 365 / Outlook',
      type: 'email_sync',
      count: 89,
      tags: ['Auto-Sync', 'Email'],
      uploadedLast30Days: 23,
      lastHydrated: '2025-01-22',
      color: 'purple',
      icon: <RefreshCw className="h-6 w-6" />
    }
  ];

  // Calculate 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        hover: 'hover:border-blue-400 hover:bg-blue-100',
        icon: 'bg-blue-500',
        text: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700'
      },
      indigo: {
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        hover: 'hover:border-indigo-400 hover:bg-indigo-100',
        icon: 'bg-indigo-500',
        text: 'text-indigo-600',
        badge: 'bg-indigo-100 text-indigo-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        hover: 'hover:border-green-400 hover:bg-green-100',
        icon: 'bg-green-500',
        text: 'text-green-600',
        badge: 'bg-green-100 text-green-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        hover: 'hover:border-purple-400 hover:bg-purple-100',
        icon: 'bg-purple-500',
        text: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-700'
      }
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Contact Management"
        subtitle="Manage your contacts with auto-sync, manual updates, and CSV uploads"
        backTo="/growth-dashboard"
        backLabel="Back to Growth Dashboard"
        actions={
          <div className="flex gap-3">
            <button
              onClick={handleHydrateFromEmail}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Sync from Email
            </button>
            <button
              onClick={() => setShowCsvUpload(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload CSV
            </button>
          </div>
        }
      />

      {/* Campaign Lists Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Campaign Lists</h2>
            <p className="text-sm text-gray-600">Lists you've created for campaigns and outreach</p>
          </div>
          <button
            onClick={() => navigate('/contact-list-manager')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Manage All Lists
          </button>
        </div>
        
        {lists.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">No campaign lists yet</p>
              <p className="text-sm text-gray-400 mb-6">Create lists from your contacts for campaigns</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/contact-list-builder')}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Create First List
                </button>
                <button
                  onClick={() => navigate('/contact-list-manager')}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  View All Lists
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactLists.map((list) => {
              const colors = getColorClasses(list.color);
              const isHydrating = hydratingList === list.id;
              
              return (
                <div
                  key={list.id}
                  onClick={() => handleHydrateList(list.id)}
                  className={`bg-white rounded-xl shadow-lg border-2 ${colors.border} ${colors.hover} transition-all p-6 cursor-pointer relative overflow-hidden`}
                >
                  {/* Loading Overlay */}
                  {isHydrating && (
                    <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                      <div className="text-center">
                        <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Hydrating from backend...</p>
                      </div>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`${colors.icon} text-white rounded-lg p-3`}>
                        {list.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {list.name}
                        </h3>
                        <p className="text-sm text-gray-600">{list.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-2xl font-bold text-gray-900">{list.count}</span>
                      <span className="text-sm text-gray-500">contacts</span>
                    </div>
                    {list.uploadedLast30Days > 0 && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          +{list.uploadedLast30Days} last 30 days
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {list.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`${colors.badge} px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1`}
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">
                      Last hydrated: {new Date(list.lastHydrated).toLocaleDateString()}
                    </span>
                    <div className={`flex items-center gap-1 ${colors.text} font-semibold`}>
                      <span>Hydrate</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CSV Upload Modal */}
      {showCsvUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 max-w-2xl mx-4 w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Upload Contacts CSV</h3>
              <button
                onClick={() => {
                  setShowCsvUpload(false);
                  setCsvFile(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors mb-4">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">
                {csvFile ? csvFile.name : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-gray-500 mb-4">CSV files only</p>
              <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="hidden"
                />
                Select File
              </label>
            </div>

            {csvFile && (
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-gray-900">Selected: {csvFile.name}</p>
                <p className="text-xs text-gray-600">Size: {(csvFile.size / 1024).toFixed(2)} KB</p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-xs text-blue-800">
                <strong>CSV Format:</strong> Name, Email, Phone, Company, Title (at minimum)
              </p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowCsvUpload(false);
                  setCsvFile(null);
                }}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCsvUpload}
                disabled={!csvFile || uploading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Upload Contacts'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowCsvUpload(true)}
            className="flex items-center gap-3 px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition text-left"
          >
            <Upload className="h-5 w-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">Add Contacts</p>
              <p className="text-sm text-gray-600">Upload CSV or manual entry</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/pipeline')}
            className="flex items-center gap-3 px-4 py-3 bg-orange-50 hover:bg-orange-100 rounded-lg border border-orange-200 transition text-left"
          >
            <Calendar className="h-5 w-5 text-orange-600" />
            <div>
              <p className="font-medium text-gray-900">View Pipeline</p>
              <p className="text-sm text-gray-600">Manage contact stages</p>
            </div>
          </button>
          <button
            onClick={() => navigate('/contact-list-builder')}
            className="flex items-center gap-3 px-4 py-3 bg-indigo-50 hover:bg-indigo-100 rounded-lg border border-indigo-200 transition text-left"
          >
            <Users className="h-5 w-5 text-indigo-600" />
            <div>
              <p className="font-medium text-gray-900">Build Campaign List</p>
              <p className="text-sm text-gray-600">Create list for campaigns</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
