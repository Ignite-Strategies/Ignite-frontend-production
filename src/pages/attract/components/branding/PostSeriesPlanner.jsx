import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import WelcomeScreen from './WelcomeScreen';
import NarrativeArcSetup from './NarrativeArcSetup';
import EventsMilestones from './EventsMilestones';
import CadenceSetup from './CadenceSetup';
import PostPlanner from './PostPlanner';

export default function PostSeriesPlanner({ onBack }) {
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({
    identity: null,
    narrativeArc: null,
    postCount: null,
    arcGoal: null,
    events: [],
    cadence: null,
    posts: []
  });

  const steps = [
    { component: WelcomeScreen, title: 'Welcome' },
    { component: NarrativeArcSetup, title: 'Narrative Arc' },
    { component: EventsMilestones, title: 'Events & Milestones' },
    { component: CadenceSetup, title: 'Cadence' },
    { component: PostPlanner, title: 'Planner' }
  ];

  const handleNext = (stepData) => {
    setUserData(prev => ({ ...prev, ...stepData }));
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  const CurrentStep = steps[step].component;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            <ArrowLeft className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Post Series Planner</h1>
            <p className="text-gray-600">Design your narrative arc</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {step < steps.length - 1 && (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {step + 1} of {steps.length - 1}
            </span>
            <span className="text-sm text-gray-500">{steps[step].title}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step + 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Content */}
      <div>
        <CurrentStep
          userData={userData}
          onNext={handleNext}
          onBack={handleBack}
          isFirstStep={step === 0}
          isLastStep={step === steps.length - 1}
        />
      </div>
    </div>
  );
}
