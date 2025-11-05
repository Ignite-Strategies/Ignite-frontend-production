import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Building2, Calendar, FileSpreadsheet, User, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function ContactUpload() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [selectedType, setSelectedType] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const uploadTypes = [
    {
      id: 'org_members',
      title: '🏢 Organization Members',
      description: 'Staff, board, volunteers, core team',
      icon: <Building2 className="h-8 w-8" />,
      color: 'indigo',
      features: ['Detailed Fields', 'Org Structure', 'Team Management'],
      route: '/contacts/org-members/upload'
    },
    {
      id: 'event_attendees',
      title: '📅 Event Attendees',
      description: 'Prospects, participants, registrants',
      icon: <Calendar className="h-8 w-8" />,
      color: 'emerald',
      features: ['Simple Fields', 'Event Pipeline', 'Quick Import'],
      route: '/contacts/event/upload'
    }
  ];

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type === 'text/csv' || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
      } else {
        alert('Please select a CSV file');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedType) {
      alert('Please select a file and contact type');
      return;
    }

    setUploading(true);
    
    // Mock CSV parsing - in real app, use papaparse or similar
    try {
      const text = await file.text();
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
          phone: contact.phone || contact.phone || '',
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
      navigate('/contacts');
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="📥 Upload Contacts"
        subtitle="Choose the type of contacts you're uploading to get the right experience"
        backTo="/contacts"
        backLabel="Back to Contact Management"
      />

      {/* Add Contact Options */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">How would you like to add contacts?</h2>
        <p className="text-gray-600 mb-6">Choose your preferred method</p>
        
        {/* Manual Entry Option */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/contacts/manual')}
            className="w-full p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition text-blue-600 group-hover:text-white">
                <User className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">➕ Add Manually</h3>
                <p className="text-sm text-gray-600">Enter contacts one by one through the form</p>
              </div>
              <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-blue-600" />
            </div>
          </button>
        </div>
        
        {/* CSV Upload Option */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Or upload a CSV file</h3>
          <p className="text-gray-600 mb-4">Choose the type of contacts to help us customize your upload experience</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {uploadTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-8 border-2 rounded-xl hover:bg-${type.color}-50 transition text-left group ${
                selectedType === type.id
                  ? `border-${type.color}-500 bg-${type.color}-50`
                  : `border-${type.color}-200 hover:border-${type.color}-500`
              }`}
            >
              <div className="flex items-center mb-4">
                <div className={`w-16 h-16 bg-${type.color}-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-${type.color}-500 transition text-${type.color}-600 group-hover:text-white`}>
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {type.id === 'org_members' 
                  ? 'Upload your internal team with detailed information: roles, departments, contact preferences, and organizational data.'
                  : 'Quick upload for event participants: just name, email, phone. Map to your event pipeline after upload.'}
              </p>
              <div className="flex flex-wrap gap-2">
                {type.features.map((feature, idx) => (
                  <span key={idx} className={`px-3 py-1 bg-${type.color}-100 text-${type.color}-700 rounded-full text-xs`}>
                    {feature}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* File Upload Section */}
      {selectedType && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload CSV File</h3>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors mb-4">
            <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              {file ? file.name : 'Click to upload or drag and drop'}
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

          {file && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm font-medium text-gray-900">Selected: {file.name}</p>
              <p className="text-xs text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/contacts')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload Contacts'}
            </button>
          </div>
        </div>
      )}

      {/* Help Text */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>💡 Not sure?</strong> Organization Members is for your internal team, Event Attendees is for prospects and participants.
        </p>
        <p className="text-xs text-blue-700 mt-2">
          CSV format should include: Name, Email, Phone, Company, Title (at minimum)
        </p>
      </div>
    </div>
  );
}

