import { useState } from 'react';
import { ArrowRight, User, Wrench, Users, Compass, GraduationCap } from 'lucide-react';

const identityOptions = [
  { id: 'founder', label: 'Founder', icon: User, description: 'The visionary leading the mission' },
  { id: 'builder', label: 'Builder', icon: Wrench, description: 'Creating and shipping products' },
  { id: 'community', label: 'Community Voice', icon: Users, description: 'Amplifying the ecosystem' },
  { id: 'explorer', label: 'Explorer', icon: Compass, description: 'Discovering new paths' },
  { id: 'coach', label: 'Coach', icon: GraduationCap, description: 'Guiding others forward' }
];

export default function WelcomeScreen({ userData, onNext, isFirstStep }) {
  const [selectedIdentity, setSelectedIdentity] = useState(userData.identity || null);
  const [customIdentity, setCustomIdentity] = useState('');

  const handleNext = () => {
    const identity = selectedIdentity === 'custom' ? customIdentity : selectedIdentity;
    if (identity) {
      onNext({ identity });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Who do you want to show up as right now?
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          This sets the tone for your current storytelling arc
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {identityOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedIdentity === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedIdentity(option.id)}
                className={`p-6 rounded-xl border-2 transition-all text-left ${
                  isSelected
                    ? 'border-purple-500 bg-purple-50 shadow-lg'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.description}</p>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Custom Option */}
        <div className="mb-6">
          <button
            onClick={() => setSelectedIdentity('custom')}
            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
              selectedIdentity === 'custom'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-purple-300'
            }`}
          >
            <label className="font-medium text-gray-900 mb-2 block">Or define your own:</label>
            <input
              type="text"
              value={customIdentity}
              onChange={(e) => {
                setCustomIdentity(e.target.value);
                setSelectedIdentity('custom');
              }}
              placeholder="e.g., 'Rebuilder', 'Storyteller', 'Connector'"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!selectedIdentity || (selectedIdentity === 'custom' && !customIdentity)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
