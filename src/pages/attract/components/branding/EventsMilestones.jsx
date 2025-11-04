import { useState } from 'react';
import { ArrowRight, ArrowLeft, Plus, X, Calendar } from 'lucide-react';

export default function EventsMilestones({ userData, onNext, onBack }) {
  const [events, setEvents] = useState(userData.events || []);
  const [newEvent, setNewEvent] = useState({ name: '', date: '' });

  const handleAddEvent = () => {
    if (newEvent.name.trim() && newEvent.date) {
      setEvents([...events, { ...newEvent, id: Date.now() }]);
      setNewEvent({ name: '', date: '' });
    }
  };

  const handleRemoveEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const handleNext = () => {
    onNext({ events });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Do you have any upcoming events or key moments we can highlight?
          </h2>
          <p className="text-gray-600 mb-6">
            These anchor points will become natural post prompts later
          </p>
        </div>

        {/* Add Event Form */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="space-y-3">
            <input
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              placeholder="Event name (e.g., DC Startup Week, Demo Launch)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex gap-3">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleAddEvent}
                disabled={!newEvent.name.trim() || !newEvent.date}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Events List */}
        {events.length > 0 ? (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <div className="font-semibold text-gray-900">{event.name}</div>
                    <div className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveEvent(event.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>No events added yet. You can skip this step or add events later.</p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
