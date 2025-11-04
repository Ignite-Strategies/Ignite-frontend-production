import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// SEO Keyword Research Component
function KeywordResearch({ keywords, onAddKeyword, onDeleteKeyword }) {
  const [newKeyword, setNewKeyword] = useState('');
  const [searchVolume, setSearchVolume] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleAddKeyword = () => {
    if (newKeyword.trim()) {
      onAddKeyword({
        keyword: newKeyword.trim(),
        searchVolume: parseInt(searchVolume) || 0,
        difficulty: parseInt(difficulty) || 0,
        id: Date.now()
      });
      setNewKeyword('');
      setSearchVolume('');
      setDifficulty('');
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty <= 30) return 'text-green-600';
    if (difficulty <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Keyword Research</h3>
      
      {/* Add Keyword Form */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Enter keyword..."
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Search Volume"
            value={searchVolume}
            onChange={(e) => setSearchVolume(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="number"
            placeholder="Difficulty (1-100)"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            onClick={handleAddKeyword}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Add Keyword
          </button>
        </div>
      </div>

      {/* Keywords List */}
      {keywords.length > 0 ? (
        <div className="space-y-3">
          {keywords.map((keyword) => (
            <div key={keyword.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{keyword.keyword}</h4>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>Volume: {keyword.searchVolume.toLocaleString()}</span>
                  <span className={getDifficultyColor(keyword.difficulty)}>
                    Difficulty: {keyword.difficulty}/100
                  </span>
                </div>
              </div>
              <button
                onClick={() => onDeleteKeyword(keyword.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No keywords added yet. Start researching keywords for your content strategy.</p>
        </div>
      )}
    </div>
  );
}

// SEO Insights Component
function SEOInsights({ seoData }) {
  const { organicTraffic, contentPieces, avgPosition, topKeywords } = seoData;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
        <h4 className="font-semibold text-indigo-800 mb-2">Organic Traffic</h4>
        <p className="text-2xl font-bold text-indigo-900">{organicTraffic.toLocaleString()}</p>
        <p className="text-sm text-indigo-600">Monthly visitors</p>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h4 className="font-semibold text-green-800 mb-2">Content Pieces</h4>
        <p className="text-2xl font-bold text-green-900">{contentPieces}</p>
        <p className="text-sm text-green-600">Published articles</p>
      </div>
      
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
        <h4 className="font-semibold text-purple-800 mb-2">Avg Position</h4>
        <p className="text-2xl font-bold text-purple-900">{avgPosition}</p>
        <p className="text-sm text-purple-600">Search ranking</p>
      </div>
      
      <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
        <h4 className="font-semibold text-orange-800 mb-2">Top Keywords</h4>
        <p className="text-2xl font-bold text-orange-900">{topKeywords}</p>
        <p className="text-sm text-orange-600">Ranking keywords</p>
      </div>
    </div>
  );
}

// SEO Tools Component
function SEOTools() {
  const tools = [
    {
      name: "Google Search Console",
      description: "Monitor your site's search performance",
      url: "https://search.google.com/search-console",
      icon: "🔍"
    },
    {
      name: "Google Analytics",
      description: "Track organic traffic and user behavior",
      url: "https://analytics.google.com",
      icon: "📊"
    },
    {
      name: "Ahrefs",
      description: "Keyword research and backlink analysis",
      url: "https://ahrefs.com",
      icon: "🔗"
    },
    {
      name: "SEMrush",
      description: "Competitor analysis and keyword tracking",
      url: "https://semrush.com",
      icon: "📈"
    },
    {
      name: "Screaming Frog",
      description: "Technical SEO site audit tool",
      url: "https://screamingfrog.co.uk",
      icon: "🐸"
    },
    {
      name: "Yoast SEO",
      description: "WordPress SEO plugin for optimization",
      url: "https://yoast.com",
      icon: "⚡"
    }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">SEO Tools & Resources</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{tool.icon}</span>
              <h4 className="font-semibold text-gray-900">{tool.name}</h4>
            </div>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

// Main SEO Component
export default function Seo() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState([]);
  const [seoData, setSeoData] = useState({
    organicTraffic: 1240,
    contentPieces: 18,
    avgPosition: 12,
    topKeywords: 45
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('seoData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setKeywords(data.keywords || []);
      setSeoData(data.seoData || seoData);
    }
  }, []);

  const handleAddKeyword = (keyword) => {
    const updatedKeywords = [...keywords, keyword];
    setKeywords(updatedKeywords);
    
    // Save to localStorage
    const dataToSave = {
      keywords: updatedKeywords,
      seoData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('seoData', JSON.stringify(dataToSave));
  };

  const handleDeleteKeyword = (keywordId) => {
    const updatedKeywords = keywords.filter(k => k.id !== keywordId);
    setKeywords(updatedKeywords);
    
    // Save to localStorage
    const dataToSave = {
      keywords: updatedKeywords,
      seoData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('seoData', JSON.stringify(dataToSave));
  };

  const handleUpdateSeoData = (field, value) => {
    const updatedSeoData = { ...seoData, [field]: value };
    setSeoData(updatedSeoData);
    
    // Save to localStorage
    const dataToSave = {
      keywords,
      seoData: updatedSeoData,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('seoData', JSON.stringify(dataToSave));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/growth-dashboard')}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SEO Helper</h1>
              <p className="text-gray-600">Research keywords and track your organic search performance</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">SEO Research & Insights</h2>
              <p className="text-gray-600 mb-8">
                Research keywords, track your organic performance, and discover what people are searching for.
              </p>
            </div>

            {/* SEO Insights */}
            <SEOInsights seoData={seoData} />

            {/* Keyword Research */}
            <KeywordResearch
              keywords={keywords}
              onAddKeyword={handleAddKeyword}
              onDeleteKeyword={handleDeleteKeyword}
            />

            {/* SEO Tools */}
            <SEOTools />

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick SEO Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleUpdateSeoData('organicTraffic', seoData.organicTraffic + 100)}
                  className="p-4 bg-white border border-indigo-200 rounded-lg hover:border-indigo-300 transition-colors text-left"
                >
                  <div className="text-indigo-600 font-semibold">Update Traffic</div>
                  <div className="text-sm text-gray-600">Track your organic growth</div>
                </button>
                <button
                  onClick={() => handleUpdateSeoData('contentPieces', seoData.contentPieces + 1)}
                  className="p-4 bg-white border border-indigo-200 rounded-lg hover:border-indigo-300 transition-colors text-left"
                >
                  <div className="text-indigo-600 font-semibold">Add Content</div>
                  <div className="text-sm text-gray-600">Publish new articles</div>
                </button>
                <button
                  onClick={() => navigate('/content')}
                  className="p-4 bg-white border border-indigo-200 rounded-lg hover:border-indigo-300 transition-colors text-left"
                >
                  <div className="text-indigo-600 font-semibold">Content Strategy</div>
                  <div className="text-sm text-gray-600">Plan your content calendar</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
