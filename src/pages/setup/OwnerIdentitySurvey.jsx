import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function OwnerIdentitySurvey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState({
    ownerType: '',
    growthSpeed: '',
    managementStyle: ''
  });
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'ownerType',
      title: 'What type of owner are you?',
      subtitle: 'Tell us about your role and business identity (not your profile - that comes from Firebase)',
      options: [
        { value: 'founder', label: 'Founder/CEO', icon: '👑', description: 'I built this and lead the vision' },
        { value: 'marketing', label: 'Marketing Leader', icon: '📢', description: 'I focus on growth and outreach' },
        { value: 'bd-manager', label: 'BD Manager', icon: '🤝', description: 'I manage partnerships and deals' },
        { value: 'solo', label: 'Solo Operator', icon: '🎯', description: 'I do everything myself' },
        { value: 'explorer', label: 'Just Exploring', icon: '🔍', description: 'I want to see what this can do' }
      ]
    },
    {
      id: 'growthSpeed',
      title: 'How do you want to grow?',
      subtitle: 'Your pace preference',
      options: [
        { value: 'fast', label: 'Fast & Aggressive', icon: '🚀', description: 'I want to scale quickly' },
        { value: 'steady', label: 'Steady & Sustainable', icon: '📈', description: 'I prefer steady growth' },
        { value: 'slow', label: 'Slow & Deliberate', icon: '🐢', description: 'I take my time to get it right' },
        { value: 'flexible', label: 'Flexible', icon: '🔄', description: 'I adapt as opportunities arise' }
      ]
    },
    {
      id: 'managementStyle',
      title: 'How do you operate?',
      subtitle: 'Your management approach',
      options: [
        { value: 'hands-on', label: 'I Do Everything', icon: '✋', description: 'I handle all aspects myself' },
        { value: 'delegate', label: 'I Delegate', icon: '👔', description: 'I let my team manage operations' },
        { value: 'collaborative', label: 'Collaborative', icon: '🤲', description: 'I work closely with my team' },
        { value: 'strategic', label: 'Strategic Only', icon: '🎯', description: 'I focus on strategy, team executes' }
      ]
    }
  ];

  const handleSelect = (value) => {
    const questionId = questions[currentStep].id;
    setSurveyData({
      ...surveyData,
      [questionId]: value
    });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Get ownerId from localStorage (set during signup/signin)
      const ownerId = localStorage.getItem('ownerId') || localStorage.getItem('adminId');
      
      if (!ownerId) {
        console.warn('No ownerId found, storing survey data locally only');
        localStorage.setItem('ownerSurvey', JSON.stringify(surveyData));
        navigate('/company/create-or-choose');
        return;
      }
      
      // Save owner identity survey data
      // This is about owner characteristics, NOT profile data
      // Profile data (name, email, photoURL) comes from Firebase automatically
      // Team size is collected during company setup, not here
      const response = await api.put(`/api/owner/${ownerId}/survey`, {
        ownerType: surveyData.ownerType,
        growthSpeed: surveyData.growthSpeed,
        managementStyle: surveyData.managementStyle
      });
      
      console.log('✅ Owner identity survey saved:', response.data);
      
      // Store in localStorage for quick access
      localStorage.setItem('ownerSurvey', JSON.stringify(surveyData));
      
      // Redirect to company setup (survey → company)
      navigate('/company/create-or-choose');
    } catch (error) {
      console.error('❌ Survey save error:', error);
      // Even if save fails, continue to company setup
      // Survey is optional - just store locally
      localStorage.setItem('ownerSurvey', JSON.stringify(surveyData));
      navigate('/company/create-or-choose');
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentStep];
  const isSelected = surveyData[currentQuestion.id];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/80 text-sm">Question {currentStep + 1} of {questions.length}</span>
            <span className="text-white/80 text-sm">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wide mb-2">Owner Identity Survey</h2>
              <p className="text-white/70 text-sm mb-4">
                Your profile (name, email, photo) comes from Firebase. This survey helps us understand your business identity and preferences.
              </p>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{currentQuestion.title}</h1>
            <p className="text-white/80 text-lg">{currentQuestion.subtitle}</p>
          </div>

          {/* Options Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {currentQuestion.options.map((option) => {
              const isSelectedOption = isSelected === option.value;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    isSelectedOption
                      ? 'bg-white/20 border-white text-white shadow-lg scale-105'
                      : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/15 hover:border-white/50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{option.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">{option.label}</div>
                      <div className="text-sm opacity-80">{option.description}</div>
                    </div>
                    {isSelectedOption && (
                      <div className="text-2xl">✓</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex-1 px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Back
            </button>
            
            <button
              onClick={handleNext}
              disabled={!isSelected || loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : currentStep === questions.length - 1 ? 'Complete →' : 'Next →'}
            </button>
          </div>
        </div>

        {/* Skip Option */}
        {currentStep === 0 && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/company/create-or-choose')}
              className="text-white/60 hover:text-white transition text-sm underline"
            >
              Skip survey - go to company setup
            </button>
            <p className="text-white/50 text-xs mt-2">
              Your profile is already set from Firebase. This survey helps personalize your experience.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

