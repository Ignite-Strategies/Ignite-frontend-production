import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Link2, Copy, CheckCircle, Video, Settings, Plus, X, Save } from 'lucide-react';
import PageHeader from '../../components/PageHeader';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function MeetingScheduler() {
  const navigate = useNavigate();
  const [calendlyConnected] = useLocalStorage('calendlyConnected', false);
  const [zoomConnected] = useLocalStorage('zoomConnected', false);
  
  const [meetingLink, setMeetingLink] = useState('');
  const [duration, setDuration] = useState('30'); // minutes
  const [meetingType, setMeetingType] = useState('video'); // video, phone, in-person
  const [availabilityBlocks, setAvailabilityBlocks] = useState([
    { id: 1, day: 'Monday', start: '09:00', end: '17:00', enabled: true },
    { id: 2, day: 'Tuesday', start: '09:00', end: '17:00', enabled: true },
    { id: 3, day: 'Wednesday', start: '09:00', end: '17:00', enabled: true },
    { id: 4, day: 'Thursday', start: '09:00', end: '17:00', enabled: true },
    { id: 5, day: 'Friday', start: '09:00', end: '17:00', enabled: true },
    { id: 6, day: 'Saturday', start: '10:00', end: '14:00', enabled: false },
    { id: 7, day: 'Sunday', start: '10:00', end: '14:00', enabled: false },
  ]);
  const [bufferTime, setBufferTime] = useState('15'); // minutes between meetings
  const [advanceNotice, setAdvanceNotice] = useState('2'); // hours
  const [copied, setCopied] = useState(false);

  const handleGenerateLink = () => {
    // In real app, this would call backend API to generate link
    const generatedLink = `https://meet.businesspointlaw.com/joel`;
    setMeetingLink(generatedLink);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(meetingLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSettings = () => {
    // In real app, save to backend
    alert('✅ Meeting scheduler settings saved!');
  };

  const toggleDay = (id) => {
    setAvailabilityBlocks(blocks =>
      blocks.map(block =>
        block.id === id ? { ...block, enabled: !block.enabled } : block
      )
    );
  };

  const updateBlockTime = (id, field, value) => {
    setAvailabilityBlocks(blocks =>
      blocks.map(block =>
        block.id === id ? { ...block, [field]: value } : block
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Set Up Your Meeting Scheduler"
        subtitle="Create your personal meeting link and availability"
        backTo="/meetings"
        backLabel="← Back to Meeting Dashboard"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Panel - Settings */}
        <div className="space-y-6">
          {/* Meeting Link Generation */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Link2 className="h-6 w-6 text-indigo-600" />
              <h2 className="text-xl font-bold">Your Meeting Link</h2>
            </div>
            
            {meetingLink ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="text"
                    value={meetingLink}
                    readOnly
                    className="flex-1 bg-transparent text-sm font-mono text-gray-700"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Share this link on your website, emails, LinkedIn, etc. Contacts can book meetings based on your availability.
                </p>
              </div>
            ) : (
              <div className="text-center py-6">
                <Link2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Generate your personal meeting link</p>
                <button
                  onClick={handleGenerateLink}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                >
                  Generate Link
                </button>
              </div>
            )}
          </div>

          {/* Meeting Preferences */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-bold">Meeting Preferences</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Meeting Duration
                </label>
                <div className="flex gap-2">
                  {['15', '30', '45', '60'].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => setDuration(mins)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        duration === mins
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {mins} min
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Type
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="meetingType"
                      value="video"
                      checked={meetingType === 'video'}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Video className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Video Call</p>
                      <p className="text-xs text-gray-500">Zoom, Teams, or Google Meet link</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="meetingType"
                      value="phone"
                      checked={meetingType === 'phone'}
                      onChange={(e) => setMeetingType(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <Settings className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium text-gray-900">Phone Call</p>
                      <p className="text-xs text-gray-500">Call at scheduled time</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Buffer Time
                  </label>
                  <select
                    value={bufferTime}
                    onChange={(e) => setBufferTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="0">No buffer</option>
                    <option value="5">5 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Notice
                  </label>
                  <select
                    value={advanceNotice}
                    onChange={(e) => setAdvanceNotice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="24">1 day</option>
                    <option value="48">2 days</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-green-600" />
                <h2 className="text-xl font-bold">Weekly Availability</h2>
              </div>
            </div>

            <div className="space-y-3">
              {availabilityBlocks.map((block) => (
                <div
                  key={block.id}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    block.enabled
                      ? 'border-green-200 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={block.enabled}
                        onChange={() => toggleDay(block.id)}
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span className="font-medium text-gray-900">{block.day}</span>
                    </label>
                  </div>
                  {block.enabled && (
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-2 flex-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <input
                          type="time"
                          value={block.start}
                          onChange={(e) => updateBlockTime(block.id, 'start', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={block.end}
                          onChange={(e) => updateBlockTime(block.id, 'end', e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Integrations</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Calendly</p>
                    <p className="text-xs text-gray-500">Sync availability from Calendly</p>
                  </div>
                </div>
                {calendlyConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <button
                    onClick={() => navigate('/settings')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Connect
                  </button>
                )}
              </div>
              <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <Video className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Zoom</p>
                    <p className="text-xs text-gray-500">Auto-generate Zoom links</p>
                  </div>
                </div>
                {zoomConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <button
                    onClick={() => navigate('/settings')}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleSaveSettings}
            className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <Save className="h-5 w-5" />
            Save Settings
          </button>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-dashed border-gray-300">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Meeting Booking Page Preview</h3>
              <p className="text-xs text-gray-500">This is what contacts will see when they click your link</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  JC
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Meet with Joel</p>
                  <p className="text-xs text-gray-500">BusinessPoint Law</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Select a date</p>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                    <div key={idx} className="text-center text-xs text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded border border-gray-200 p-3 text-center">
                  <p className="text-sm text-gray-600">Calendar view showing available dates</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Meeting duration</p>
                <div className="flex gap-2">
                  {['15 min', '30 min', '45 min', '60 min'].map((dur) => (
                    <button
                      key={dur}
                      className={`px-3 py-1 rounded text-xs font-medium ${
                        dur === `${duration} min`
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-700'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Available times</p>
                <div className="grid grid-cols-3 gap-2">
                  {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM'].map((time) => (
                    <button
                      key={time}
                      className="px-3 py-2 bg-white border border-gray-200 rounded text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-blue-800">
                💡 <strong>How it works:</strong> Contacts select a date and time, confirm their details, and receive a calendar invite with your {meetingType === 'video' ? 'Zoom/Video' : 'phone'} link.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

