import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

export default function BusinessPointAssessment() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessment, setAssessment] = useState({
    name: '',
    company: '',
    workTooMuch: '',
    assignTasks: '',
    wantMoreClients: '',
    revenueGrowthPercent: '',
    totalVolume: '',
    bdSpend: ''
  });
  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);

  const steps = [
    {
      id: 'contact',
      title: 'Contact Information',
      icon: '👋',
      questions: [
        {
          id: 'name',
          question: 'What\'s your name?',
          type: 'input',
          placeholder: 'e.g., Joel Gulick'
        },
        {
          id: 'company',
          question: 'What\'s your company name?',
          type: 'input',
          placeholder: 'e.g., BusinessPoint Law'
        }
      ]
    },
    {
      id: 'workload',
      title: 'Workload Assessment',
      icon: '⏰',
      questions: [
        {
          id: 'workTooMuch',
          question: 'Do you feel you work too much on tasks?',
          type: 'radio',
          options: [
            { value: 'always', label: 'Always - I do everything myself' },
            { value: 'often', label: 'Often - I take on too much' },
            { value: 'sometimes', label: 'Sometimes - I could delegate more' },
            { value: 'rarely', label: 'Rarely - I delegate well' }
          ]
        },
        {
          id: 'assignTasks',
          question: 'You adequately assign to others',
          type: 'radio',
          options: [
            { value: 'never', label: 'Never - I do everything myself' },
            { value: 'rarely', label: 'Rarely - I struggle to delegate' },
            { value: 'sometimes', label: 'Sometimes - I delegate when I remember' },
            { value: 'always', label: 'Always - I delegate effectively' }
          ]
        }
      ]
    },
    {
      id: 'growth',
      title: 'Growth Goals',
      icon: '🚀',
      questions: [
        {
          id: 'wantMoreClients',
          question: 'Do you want to bring on more clients?',
          type: 'radio',
          options: [
            { value: 'yes', label: 'Yes - I need more clients to grow' },
            { value: 'maybe', label: 'Maybe - depends on the right clients' },
            { value: 'no', label: 'No - I have enough clients' }
          ]
        }
      ]
    },
    {
      id: 'revenue',
      title: 'Revenue Targets',
      icon: '💰',
      questions: [
        {
          id: 'revenueGrowthPercent',
          question: 'Ideally how much revenue growth do you want to see? (percentage)',
          type: 'input',
          placeholder: 'e.g., 25',
          suffix: '%'
        },
        {
          id: 'totalVolume',
          question: 'Total volume target',
          type: 'input',
          placeholder: 'e.g., 1000000',
          prefix: '$'
        }
      ]
    },
    {
      id: 'spend',
      title: 'Business Development Spend',
      icon: '📊',
      questions: [
        {
          id: 'bdSpend',
          question: 'How much do you currently spend on business development either staffing or ad buy?',
          type: 'input',
          placeholder: 'e.g., 50000',
          prefix: '$'
        }
      ]
    }
  ];

  const handleInputChange = (questionId, value) => {
    setAssessment(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const computeAssessment = async () => {
    try {
      setCalculating(true);
      
      // Calculate a simple score based on responses
      let score = 0;
      let insights = [];
      
      // Workload scoring
      if (assessment.workTooMuch === 'always') score += 20;
      else if (assessment.workTooMuch === 'often') score += 40;
      else if (assessment.workTooMuch === 'sometimes') score += 60;
      else if (assessment.workTooMuch === 'rarely') score += 80;
      
      if (assessment.assignTasks === 'never') score += 20;
      else if (assessment.assignTasks === 'rarely') score += 40;
      else if (assessment.assignTasks === 'sometimes') score += 60;
      else if (assessment.assignTasks === 'always') score += 80;
      
      // Growth goals scoring
      if (assessment.wantMoreClients === 'yes') score += 80;
      else if (assessment.wantMoreClients === 'maybe') score += 60;
      else if (assessment.wantMoreClients === 'no') score += 40;
      
      // Revenue and spend analysis
      const growthPercent = parseInt(assessment.revenueGrowthPercent) || 0;
      const totalVolume = parseInt(assessment.totalVolume) || 0;
      const bdSpend = parseInt(assessment.bdSpend) || 0;
      
      if (growthPercent > 50) insights.push("High growth ambitions - we'll help you scale strategically");
      if (totalVolume > 1000000) insights.push("Enterprise-level targets - let's build the systems to support this");
      if (bdSpend < 10000) insights.push("Low BD investment - there's significant opportunity for growth");
      
      const result = {
        score: Math.round(score / 3),
        breakdown: assessment,
        insights: insights.length > 0 ? insights : ["Your business has strong potential for growth"],
        recommendations: [
          "Systematize your delegation processes",
          "Optimize your business development spend",
          "Build scalable client acquisition systems"
        ]
      };
      
      // Save assessment to database
      try {
        const response = await api.post('/assessmentSubmission/submit', {
          ...assessment,
          score: result.score,
          insights: JSON.stringify(result.insights)
        });
        
        console.log('✅ Assessment saved successfully');
        
        // Navigate to results with assessment ID
        navigate(`/businesspoint-results?id=${response.data.assessmentId}`);
        
      } catch (saveError) {
        console.error('❌ Failed to save assessment:', saveError);
        // Continue anyway - show results without saving
        setResult(result);
      }
      
    } catch (error) {
      console.error('Error computing assessment:', error);
    } finally {
      setCalculating(false);
    }
  };

  const isStepComplete = (step) => {
    return step.questions.every(question => {
      const value = assessment[question.id];
      return value && value.toString().trim() !== '';
    });
  };

  const getCurrentStepQuestions = () => {
    return steps[currentStep]?.questions || [];
  };

  const canProceed = () => {
    return isStepComplete(steps[currentStep]);
  };

  if (currentStep < steps.length) {
    const step = steps[currentStep];
    const questions = getCurrentStepQuestions();

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
        {/* Header with Logo */}
        <div className="absolute top-0 left-0 right-0 p-6 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Ignite Strategies" className="h-10" />
            </div>
            <div className="text-white/80 text-sm">
              BusinessPoint Law Assessment
            </div>
          </div>
        </div>

        <div className="max-w-4xl w-full">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>Assessment Progress</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-400 to-orange-500 rounded-full h-2 transition-all duration-500"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Assessment Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-white/20">
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{step.icon}</div>
              <h1 className="text-4xl font-black text-white mb-3">{step.title}</h1>
            </div>

            {/* Questions */}
            <div className="space-y-8 mb-8">
              {questions.map((question) => (
                <div key={question.id}>
                  <h3 className="text-xl font-bold text-white mb-4">{question.question}</h3>
                  
                  {question.type === 'radio' ? (
                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={question.id}
                            value={option.value}
                            checked={assessment[question.id] === option.value}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                            className="w-5 h-5 text-red-600"
                          />
                          <span className="text-white/90">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      {question.prefix && (
                        <span className="text-white text-xl font-bold">{question.prefix}</span>
                      )}
                      <input
                        type={question.id.includes('Volume') || question.id.includes('Spend') ? 'number' : 'number'}
                        value={assessment[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        placeholder={question.placeholder}
                        className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      {question.suffix && (
                        <span className="text-white text-xl font-bold">{question.suffix}</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="px-8 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition"
                >
                  ← Back
                </button>
              )}
              
              <button
                onClick={() => currentStep < steps.length - 1 ? setCurrentStep(currentStep + 1) : computeAssessment()}
                disabled={!canProceed() || calculating}
                className="ml-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl hover:shadow-lg transition hover:scale-105 disabled:opacity-50"
              >
                {calculating ? 'Computing...' : currentStep < steps.length - 1 ? 'Next →' : 'Get My Assessment'}
              </button>
            </div>
          </div>

          {/* Welcome Note */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Tailored assessment for BusinessPoint Law - let's unlock your growth potential.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (calculating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-orange-900 to-red-800 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-xl">Computing your growth assessment...</p>
        </div>
      </div>
    );
  }

  return null;
}
