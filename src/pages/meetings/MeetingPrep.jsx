import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Calendar, CheckCircle, Clock, Sparkles, RefreshCw } from 'lucide-react';
import { mockMeetings } from '../../data/mockData';

// AI-generated prep suggestions based on persona type
const generatePrepSuggestions = (personaType, company, name) => {
  const suggestions = {
    'Portfolio Manager': {
      theirAsk: `Looking for legal support on portfolio company NDAs, exploring partnership opportunities for portfolio company legal services, seeking expertise on deal structuring and due diligence support. ${name} likely needs scalable legal solutions for multiple portfolio companies.`,
      ourGoal: `Establish partnership for portfolio company services, get referrals to other portfolio companies, secure retainer agreement, position BusinessPoint Law as the go-to legal partner for ${company}'s portfolio companies.`
    },
    'Capital Partner': {
      theirAsk: `Seeking legal framework for deal structuring, exploring ongoing legal support for portfolio investments, need for regulatory compliance expertise, potential partnership for deal flow. ${name} is likely evaluating legal services at scale.`,
      ourGoal: `Become preferred legal partner for ${company} deals, establish retainer relationship, get referrals to portfolio companies, position for ongoing deal support and portfolio company services.`
    },
    'Investment Director': {
      theirAsk: `Exploring legal services for portfolio companies, need for strategic legal counsel on investments, seeking expertise on regulatory compliance and deal structuring. ${name} likely evaluating legal partnerships for portfolio support.`,
      ourGoal: `Secure partnership for portfolio company legal services, establish BusinessPoint Law as trusted advisor, get referrals, position for ongoing strategic legal support.`
    },
    'Vendor': {
      theirAsk: `Exploring partnership opportunities, need for legal framework support, seeking referrals or collaboration opportunities. ${name} may be looking to expand their service offerings or client base.`,
      ourGoal: `Explore collaboration opportunities, establish referral partnership, position for mutual benefit, understand their service offerings for potential client referrals.`
    }
  };

  return suggestions[personaType] || {
    theirAsk: `Based on ${name}'s role at ${company}, they may be seeking legal support, partnership opportunities, or strategic counsel for their organization or portfolio companies.`,
    ourGoal: `Establish a meaningful partnership, explore collaboration opportunities, and position BusinessPoint Law as a valuable resource for ${company}.`
  };
};

export default function MeetingPrep() {
  const { id } = useParams();
  const navigate = useNavigate();
  const meeting = mockMeetings.find(m => m.id === parseInt(id));
  const [theirPotentialAsk, setTheirPotentialAsk] = useState('');
  const [whatWeWant, setWhatWeWant] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isHydrating, setIsHydrating] = useState(true);

  // Auto-hydrate with AI suggestions on load
  useEffect(() => {
    if (meeting) {
      setIsHydrating(true);
      // Simulate AI processing delay
      setTimeout(() => {
        const suggestions = generatePrepSuggestions(
          meeting.type || 'Portfolio Manager',
          meeting.company,
          meeting.name
        );
        setTheirPotentialAsk(suggestions.theirAsk);
        setWhatWeWant(suggestions.ourGoal);
        setIsHydrating(false);
      }, 1500);
    }
  }, [meeting]);

  if (!meeting) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-gray-600 mb-4">Meeting not found.</p>
        <Link
          to="/growth-dashboard"
          className="text-sm text-blue-600 hover:text-blue-700"
        >
          ← Back to Growth Dashboard
        </Link>
      </div>
    );
  }

  const handleRegenerate = () => {
    setIsHydrating(true);
    setTimeout(() => {
      const suggestions = generatePrepSuggestions(
        meeting.type || 'Portfolio Manager',
        meeting.company,
        meeting.name
      );
      setTheirPotentialAsk(suggestions.theirAsk);
      setWhatWeWant(suggestions.ourGoal);
      setIsHydrating(false);
    }, 800);
  };

  const handleMarkComplete = () => {
    setIsComplete(true);
    setTimeout(() => {
      navigate('/meetings');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/meetings"
        className="text-sm text-gray-600 hover:text-gray-900 mb-6 inline-block"
      >
        ← Back to Meeting Dashboard
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {meeting.avatar}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-1">{meeting.name}</h1>
              <p className="text-lg text-gray-600">{meeting.company}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.time}</span>
                </div>
              </div>
            </div>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
            {meeting.status}
          </span>
        </div>

      </div>

      {/* Strategic Prep Questions - AI Generated */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Smart Meeting Prep</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              AI Generated
            </span>
          </div>
          <button
            onClick={handleRegenerate}
            disabled={isHydrating}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isHydrating ? 'animate-spin' : ''}`} />
            Regenerate
          </button>
        </div>

        {isHydrating ? (
          <div className="py-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <Sparkles className="h-8 w-8 text-orange-600 animate-pulse" />
              <div>
                <p className="text-lg font-semibold text-gray-900">AI is analyzing the meeting...</p>
                <p className="text-sm text-gray-600">Generating smart prep suggestions based on persona and company data</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Their Potential Ask */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-lg font-semibold text-gray-900">
                  What's her potential ask?
                </label>
                <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">AI Suggested</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                What might they ask for or need from us in this meeting?
              </p>
              <textarea
                value={theirPotentialAsk}
                onChange={(e) => setTheirPotentialAsk(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Generated based on {meeting.name}'s role as a {meeting.type || 'Portfolio Manager'} at {meeting.company}
              </p>
            </div>

            {/* What We Want */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-lg font-semibold text-gray-900">
                  What we want from her?
                </label>
                <span className="text-xs text-gray-500 bg-blue-50 px-2 py-1 rounded">AI Suggested</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                What are our goals and desired outcomes from this meeting?
              </p>
              <textarea
                value={whatWeWant}
                onChange={(e) => setWhatWeWant(e.target.value)}
                rows="6"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none bg-gray-50"
              />
              <p className="text-xs text-gray-500 mt-2">
                💡 Strategically aligned goals based on persona and opportunity analysis
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/meetings')}
          className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
        >
          Save & Return
        </button>
        <button
          onClick={handleMarkComplete}
          disabled={isComplete}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isComplete ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Meeting Completed!
            </span>
          ) : (
            'Mark Complete'
          )}
        </button>
      </div>
    </div>
  );
}

