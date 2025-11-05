import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

export default function SetupWizard({ companyHQ, onComplete }) {
  const navigate = useNavigate();
  
  // Check what's been completed
  const hasCompany = companyHQ && companyHQ.id;
  const hasContacts = false; // TODO: Check if contacts exist
  const hasAssessment = false; // TODO: Check if assessment completed
  const hasOutreach = false; // TODO: Check if outreach setup
  
  const steps = [
    {
      id: 'company',
      title: 'Set Up Your Company',
      description: 'Company profile created',
      completed: hasCompany,
      route: '/company/create-or-choose',
      action: hasCompany ? 'View Profile' : 'Set Up Company'
    },
    {
      id: 'contacts',
      title: 'Add Your First Contacts',
      description: 'Start building your network',
      completed: hasContacts,
      route: '/contacts',
      action: 'Add Contacts'
    },
    {
      id: 'assessment',
      title: 'Complete Growth Assessment',
      description: 'Understand your growth potential',
      completed: hasAssessment,
      route: '/assessment',
      action: 'Start Assessment'
    },
    {
      id: 'outreach',
      title: 'Set Up Outreach',
      description: 'Start nurturing relationships',
      completed: hasOutreach,
      route: '/outreach',
      action: 'Set Up Outreach'
    }
  ];
  
  const completedCount = steps.filter(s => s.completed).length;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;
  
  // Hide wizard if all steps complete
  if (completedCount === totalSteps && onComplete) {
    return null;
  }
  
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-8 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Getting Started</h2>
          <p className="text-gray-600 text-sm">
            Complete these steps to maximize your customer relationships
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{completedCount}/{totalSteps}</div>
          <div className="text-xs text-gray-500">Complete</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 text-center">
          {progressPercent.toFixed(0)}% Complete
        </div>
      </div>
      
      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
              step.completed
                ? 'bg-green-50 border-green-200'
                : index === completedCount
                ? 'bg-white border-blue-300 shadow-md'
                : 'bg-white border-gray-200'
            }`}
          >
            {/* Status Icon */}
            <div className="flex-shrink-0">
              {step.completed ? (
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              ) : (
                <Circle className="h-6 w-6 text-gray-400" />
              )}
            </div>
            
            {/* Step Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`font-semibold ${
                  step.completed ? 'text-green-900' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                {index === completedCount && !step.completed && (
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                    Next
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            
            {/* Action Button */}
            <button
              onClick={() => navigate(step.route)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                step.completed
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : index === completedCount
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {step.action}
              {!step.completed && index === completedCount && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>
      
      {/* Dismiss Button (if all complete) */}
      {completedCount === totalSteps && onComplete && (
        <div className="mt-4 text-center">
          <button
            onClick={onComplete}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Hide this checklist
          </button>
        </div>
      )}
    </div>
  );
}

