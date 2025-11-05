import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

export default function ContactUpload() {
  const navigate = useNavigate();

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
            📥 Add Contacts
          </h1>
          <p className="text-gray-600">
            Choose how you'd like to add contacts to your network
          </p>
        </div>

        {/* Upload Type Selection */}
        <div className="space-y-6">
          {/* Manual Entry Option */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/contacts/manual')}
              className="w-full p-8 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group"
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

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Or upload a CSV file</h2>
            <p className="text-gray-600 mb-8">Choose the type of contacts to help us customize your upload experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Organization Members */}
            <button
              onClick={() => navigate('/contacts/org-members/upload')}
              className="p-8 border-2 border-indigo-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-500 transition">
                  <svg className="w-8 h-8 text-indigo-600 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">🏢 Organization Members</h3>
                  <p className="text-sm text-gray-600">Staff, board, volunteers, core team</p>
                </div>
              </div>
              <p className="text-gray-700">
                Upload your internal team with detailed information: roles, departments, contact preferences, and organizational data.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Detailed Fields</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Org Structure</span>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs">Team Management</span>
              </div>
            </button>

            {/* Event Attendees */}
            <button
              onClick={() => navigate('/contacts/event/upload')}
              className="p-8 border-2 border-emerald-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition text-left group"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mr-4 group-hover:bg-emerald-500 transition">
                  <svg className="w-8 h-8 text-emerald-600 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">📅 Event Attendees</h3>
                  <p className="text-sm text-gray-600">Prospects, participants, registrants</p>
                </div>
              </div>
              <p className="text-gray-700">
                Quick upload for event participants: just name, email, phone. Map to your event pipeline after upload.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Simple Fields</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Event Pipeline</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs">Quick Import</span>
              </div>
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-sm text-blue-800">
              <strong>💡 Not sure?</strong> Organization Members is for your internal team, Event Attendees is for prospects and participants.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

