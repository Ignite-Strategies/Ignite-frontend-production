import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, User, Building, Target, MessageSquare, Users } from 'lucide-react';
import { savePersonas, loadPersonas } from '../../utils/personaData';

const STEPS = [
  { id: 1, name: 'Basic Info', icon: User, description: 'Who is this persona?' },
  { id: 2, name: 'Company Details', icon: Building, description: 'Where do they work?' },
  { id: 3, name: 'Priorities & Goals', icon: Target, description: 'What drives them?' },
  { id: 4, name: 'Channels & Approach', icon: MessageSquare, description: 'How to reach them?' },
  { id: 5, name: 'Pitch Strategy', icon: Users, description: 'How to pitch them?' },
];

export default function PersonaBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    age: '',
    location: '',
    companySize: '',
    priorities: '',
    goals: '',
    channels: '',
    budget: '',
    decisionProcess: '',
    objections: '',
    pitchStrategy: ''
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    const existingPersonas = loadPersonas();
    const newPersona = {
      ...formData,
      id: Date.now()
    };
    const updatedPersonas = [...existingPersonas, newPersona];
    savePersonas(updatedPersonas);
    navigate('/personas');
  };

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        return formData.name && formData.title;
      case 2:
        return true; // Company details are optional
      case 3:
        return formData.priorities && formData.goals;
      case 4:
        return formData.channels;
      case 5:
        return true; // Pitch strategy is optional but recommended
      default:
        return false;
    }
  };

  const canProceed = isStepValid(currentStep);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/personas')}
            className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-flex items-center gap-2"
          >
            ← Back to Personas
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Persona Builder</h1>
          <p className="text-gray-600">Create a detailed persona profile step by step</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              const isAccessible = currentStep >= step.id;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => isAccessible && setCurrentStep(step.id)}
                      disabled={!isAccessible}
                      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
                        isCompleted
                          ? 'bg-green-500 text-white'
                          : isActive
                          ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                          : 'bg-gray-200 text-gray-500'
                      } ${isAccessible ? 'cursor-pointer hover:scale-105' : 'cursor-not-allowed'}`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </button>
                    <div className="mt-2 text-center">
                      <p className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                        {step.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-1 hidden sm:block">{step.description}</p>
                    </div>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-200' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
                <p className="text-gray-600">Let's start with the basics - who is this persona?</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="e.g., Sarah Chen, David Martinez"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">A descriptive name for this persona</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Title/Role <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData('title', e.target.value)}
                    placeholder="e.g., Startup Founder, Capital Partner, Portfolio Manager"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Their professional role or title</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Age Range</label>
                  <select
                    value={formData.age}
                    onChange={(e) => updateFormData('age', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Age Range</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="e.g., San Francisco, CA"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Company Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Details</h2>
                <p className="text-gray-600">Tell us about their company context</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Size</label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => updateFormData('companySize', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Company Size</option>
                    <option value="1-10 employees">1-10 employees</option>
                    <option value="11-50 employees">11-50 employees</option>
                    <option value="51-200 employees">51-200 employees</option>
                    <option value="201-1000 employees">201-1000 employees</option>
                    <option value="1000+ employees">1000+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                  <select
                    value={formData.budget}
                    onChange={(e) => updateFormData('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Budget Range</option>
                    <option value="Under $10K">Under $10K</option>
                    <option value="$10K - $50K">$10K - $50K</option>
                    <option value="$50K - $100K">$50K - $100K</option>
                    <option value="$100K - $500K">$100K - $500K</option>
                    <option value="$500K+">$500K+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Decision Process</label>
                <textarea
                  value={formData.decisionProcess}
                  onChange={(e) => updateFormData('decisionProcess', e.target.value)}
                  placeholder="How do they make decisions? Who else is involved? e.g., Executive-level decision with input from legal and business development..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
                <p className="text-xs text-gray-500 mt-1">Understanding their decision-making process helps tailor your approach</p>
              </div>
            </div>
          )}

          {/* Step 3: Priorities & Goals */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Priorities & Goals</h2>
                <p className="text-gray-600">What are they focused on? What do they want to achieve?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Priorities <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.priorities}
                  onChange={(e) => updateFormData('priorities', e.target.value)}
                  placeholder="What are they focused on maximizing or achieving? What opportunities or challenges are they prioritizing? (e.g., Looking to maximize ROI, seeking to scale partnerships, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Think about what they're trying to maximize or achieve, not just problems they face</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Goals <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => updateFormData('goals', e.target.value)}
                  placeholder="What are they trying to achieve? What success looks like to them? (e.g., Scale to $1M ARR within 18 months while building a sustainable growth engine...)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Be specific about their desired outcomes</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Common Objections</label>
                <textarea
                  value={formData.objections}
                  onChange={(e) => updateFormData('objections', e.target.value)}
                  placeholder="What concerns or objections do they typically have? (e.g., Concerned about cost and time investment. Wants to see clear ROI...)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="4"
                />
                <p className="text-xs text-gray-500 mt-1">Knowing their objections helps you prepare better responses</p>
              </div>
            </div>
          )}

          {/* Step 4: Channels & Approach */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Channels & Approach</h2>
                <p className="text-gray-600">Where do they spend time? How can you reach them?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Preferred Channels <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.channels}
                  onChange={(e) => updateFormData('channels', e.target.value)}
                  placeholder="Where do they spend time? How do they prefer to be contacted? (e.g., LinkedIn, industry events, referrals from VCs, email, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">List all the places and ways you can connect with this persona</p>
              </div>
            </div>
          )}

          {/* Step 5: Pitch Strategy */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Pitch Strategy</h2>
                <p className="text-gray-600">How should you approach and pitch to this persona?</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">How We Might Pitch Them</label>
                <textarea
                  value={formData.pitchStrategy}
                  onChange={(e) => updateFormData('pitchStrategy', e.target.value)}
                  placeholder="What messaging resonates with them? How should we approach them? What value proposition should we lead with? (e.g., Focus on ROI and time-to-value. Emphasize proven track record with similar companies. Address cost concerns upfront...)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows="8"
                />
                <p className="text-xs text-gray-500 mt-1">
                  This is your strategic messaging guide. Include what to emphasize, how to frame the value proposition, and how to address their concerns.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">💡 Tips for a great pitch strategy:</h3>
                <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                  <li>Lead with what matters most to them (from their priorities)</li>
                  <li>Address their objections proactively</li>
                  <li>Use language that resonates with their role/industry</li>
                  <li>Include specific examples or proof points</li>
                  <li>Consider their decision-making process</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="text-sm text-gray-500">
              Step {currentStep} of {STEPS.length}
            </div>

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  canProceed
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                Create Persona
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

