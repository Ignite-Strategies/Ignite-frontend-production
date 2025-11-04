import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const cadenceOptions = [
  { id: 'weekly', label: 'Once a week', value: 1 },
  { id: 'twice-weekly', label: 'Twice a week', value: 2 },
  { id: 'biweekly', label: 'Biweekly', value: 0.5 }
];

export default function CadenceSetup({ userData, onNext, onBack }) {
  const [cadence, setCadence] = useState(userData.cadence || null);
  const postCount = userData.postCount || 10;

  const handleNext = () => {
    // Generate posts if not already created
    const posts = userData.posts?.length ? userData.posts : Array.from({ length: postCount }, (_, i) => ({
      id: i + 1,
      title: `Post ${i + 1}`,
      goal: userData.arcGoal || 'Part of your narrative arc',
      status: 'not_started',
      eventId: null
    }));
    onNext({ cadence, posts });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How often do you want to show up?
          </h2>
          <div className="space-y-3 mb-6">
            {cadenceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setCadence(option.id)}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  cadence === option.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{option.label}</div>
                    <div className="text-sm text-gray-600">
                      {postCount} posts over {Math.ceil(postCount / option.value)} weeks
                    </div>
                  </div>
                  {cadence === option.id && (
                    <Check className="h-6 w-6 text-purple-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Post Tracker Widget */}
        {cadence && (
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Post Tracker</h3>
            <p className="text-sm text-gray-600 mb-4">
              Visual rhythm tracker: {postCount} posts planned
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: postCount }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-400"
                  title={`Post ${i + 1}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Each dot will light up as you publish posts, showing your consistency and progress
            </p>
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
            disabled={!cadence}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            View Planner
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
