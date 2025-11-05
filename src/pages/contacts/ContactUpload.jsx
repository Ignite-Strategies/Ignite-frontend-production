import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileSpreadsheet, User, X } from 'lucide-react';

export default function ContactUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
    if (!file) {
      alert('Please select a CSV file');
      return;
    }

    setUploading(true);
    
    // TODO: Implement actual CSV upload to backend
    // For now, just show success message
    setTimeout(() => {
      alert(`✅ Successfully uploaded ${file.name}!`);
      setUploading(false);
      setFile(null);
      // Navigate to contacts hub when route exists
      // navigate('/contacts');
    }, 1000);
  };

  const downloadTemplate = () => {
    const template = `First Name,Last Name,Email,Phone,Company,Title`;
    const blob = new Blob([template], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/growth-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📥 Upload Contacts
          </h1>
          <p className="text-gray-600">
            Upload a CSV file with your contacts to add them to your network
          </p>
        </div>

        {/* Manual Entry Option */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/contacts/manual')}
            className="w-full p-6 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center group-hover:bg-blue-500 transition">
                <User className="h-8 w-8 text-blue-600 group-hover:text-white transition" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-1">➕ Add Manually</h3>
                <p className="text-sm text-gray-600">Enter contacts one by one through the form</p>
              </div>
              <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* CSV Upload Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload CSV File</h2>
            <p className="text-gray-600 mb-4">
              Upload a CSV file with your contacts. Make sure it includes: First Name, Last Name, Email, Phone, Company, Title
            </p>
            <button
              onClick={downloadTemplate}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              📥 Download CSV Template
            </button>
          </div>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors mb-6">
            {!file ? (
              <>
                <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2 font-medium">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mb-4">CSV files only</p>
                <label className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer font-medium">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  Select CSV File
                </label>
              </>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <FileSpreadsheet className="h-12 w-12 text-green-600" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-600">Size: {(file.size / 1024).toFixed(2)} KB</p>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className="ml-4 p-2 text-gray-400 hover:text-red-600 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>

          {/* Upload Button */}
          {file && (
            <div className="flex gap-3">
              <button
                onClick={() => setFile(null)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {uploading ? 'Uploading...' : 'Upload Contacts'}
              </button>
            </div>
          )}

          {/* Help Text */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 CSV Format:</strong> Your CSV should include columns for First Name, Last Name, Email, Phone, Company, and Title (at minimum).
            </p>
            <p className="text-xs text-blue-700 mt-2">
              Download the template above to see the exact format required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
