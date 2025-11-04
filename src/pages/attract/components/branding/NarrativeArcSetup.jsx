import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const arcExamples = [
  'Rebuild after setback',
  'Launching product',
  'Reconnecting after hiatus',
  'Scaling momentum',
  'Building community',
  'Personal transformation',
  'Pivoting direction',
  'Custom arc'
];

const postCounts = [3, 5, 10];

export default function NarrativeArcSetup({ userData, onNext, onBack, isFirstStep }) {
  const [hasArc, setHasArc] = useState(userData.narrativeArc !== null ? 'yes' : null);
  const [arcType, setArcType] = useState(userData.narrativeArc || '');
  const [customArc, setCustomArc] = useState('');
  const [postCount, setPostCount] = useState(userData.postCount || null);
  const [arcGoal, setArcGoal] = useState(userData.arcGoal || '');

  const handleNext = () => {
    const narrativeArc = arcType === 'Custom arc' ? customArc : arcType;
    onNext({ 
      narrativeArc: hasArc === 'yes' ? narrativeArc : null,
      postCount: postCount || 10,
      arcGoal 
    });
  };

  const canProceed = () => {
    if (hasArc === 'no') return true;
    if (hasArc === 'yes') {
      return arcType && postCount && arcGoal.trim().length > 0;
    }
    return false;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Question 1: Do you have a narrative arc? */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Do you have a narrative arc you want to lay out?
          </h2>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setHasArc('yes')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                hasArc === 'yes'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-lg font-semibold text-gray-900 mb-1">Yes</div>
              <div className="text-sm text-gray-600">I have a story to tell</div>
            </button>
            <button
              onClick={() => setHasArc('no')}
              className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                hasArc === 'no'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
            >
              <div className="text-lg font-semibold text-gray-900 mb-1">Not yet</div>
              <div className="text-sm text-gray-600">I'll figure it out as I go</div>
            </button>
          </div>
        </div>

        {/* If yes, show arc options */}
        {hasArc === 'yes' && (
          <>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Choose an arc type:</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {arcExamples.map((example) => (
                  <button
                    key={example}
                    onClick={() => {
                      setArcType(example);
                      if (example !== 'Custom arc') setCustomArc('');
                    }}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      arcType === example
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {example}
                  </button>
                ))}
              </div>

              {arcType === 'Custom arc' && (
                <input
                  type="text"
                  value={customArc}
                  onChange={(e) => setCustomArc(e.target.value)}
                  placeholder="Describe your narrative arc..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              )}
            </div>

            {/* Post Count */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How many posts will it take to tell that story?
              </h3>
              <div className="flex gap-4">
                {postCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setPostCount(count)}
                    className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                      postCount === count
                        ? 'border-purple-500 bg-purple-50 font-semibold'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {count} posts
                  </button>
                ))}
              </div>
            </div>

            {/* Arc Goal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Where do you want that arc to end?
              </h3>
              <textarea
                value={arcGoal}
                onChange={(e) => setArcGoal(e.target.value)}
                placeholder="e.g., 'Launch announcement,' 'Personal milestone,' 'Funding close,' 'Product reveal'"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none h-24"
              />
            </div>
          </>
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
            disabled={!canProceed()}
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
