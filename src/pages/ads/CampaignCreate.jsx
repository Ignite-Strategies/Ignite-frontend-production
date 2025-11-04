import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, ExternalLink } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function CampaignCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    campaignName: '',
    headline1: '',
    headline2: '',
    headline3: '',
    description1: '',
    description2: '',
    finalUrl: '',
    displayUrl: '',
    budget: '',
    personaId: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save campaign via API
    // For now, just navigate to preview
    navigate(`/ads/campaign/preview`, { state: formData });
  };

  // Preview how ad will look
  const renderAdPreview = () => (
    <div className="border border-gray-300 rounded-lg p-6 bg-white">
      {/* Ad Label */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-green-700 font-semibold">Ad</span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-500">{formData.displayUrl || 'example.com'}</span>
      </div>

      {/* Headlines */}
      <div className="mb-2">
        {formData.headline1 && (
          <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-1">
            {formData.headline1}
          </h3>
        )}
        {formData.headline2 && (
          <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-1">
            {formData.headline2}
          </h3>
        )}
        {formData.headline3 && (
          <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-2">
            {formData.headline3}
          </h3>
        )}
      </div>

      {/* Descriptions */}
      <div className="mb-3">
        {formData.description1 && (
          <p className="text-sm text-gray-700 leading-relaxed mb-1">
            {formData.description1}
          </p>
        )}
        {formData.description2 && (
          <p className="text-sm text-gray-700 leading-relaxed">
            {formData.description2}
          </p>
        )}
      </div>

      {/* Final URL */}
      {formData.finalUrl && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ExternalLink className="h-4 w-4" />
          <span>{formData.finalUrl}</span>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Create Google Ads Campaign"
        subtitle="Build your ad campaign with live preview"
        backTo="/ads/dashboard"
        backLabel="← Back to Dashboard"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Campaign Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.campaignName}
                onChange={(e) => handleChange('campaignName', e.target.value)}
                placeholder="e.g., BD Services - Search Campaign"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Headlines */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Headlines (3 required, max 30 chars each) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <div key={num}>
                    <input
                      type="text"
                      value={formData[`headline${num}`]}
                      onChange={(e) => handleChange(`headline${num}`, e.target.value)}
                      placeholder={`Headline ${num}`}
                      maxLength={30}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData[`headline${num}`]?.length || 0} / 30 characters
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descriptions (2 required, max 90 chars each) <span className="text-red-500">*</span>
              </label>
              <div className="space-y-3">
                {[1, 2].map((num) => (
                  <div key={num}>
                    <textarea
                      value={formData[`description${num}`]}
                      onChange={(e) => handleChange(`description${num}`, e.target.value)}
                      placeholder={`Description ${num}`}
                      maxLength={90}
                      rows={3}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                      required
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {formData[`description${num}`]?.length || 0} / 90 characters
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Final URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.finalUrl}
                  onChange={(e) => handleChange('finalUrl', e.target.value)}
                  placeholder="https://example.com/landing"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Display URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.displayUrl}
                  onChange={(e) => handleChange('displayUrl', e.target.value)}
                  placeholder="example.com/landing"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Daily Budget ($) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => handleChange('budget', e.target.value)}
                placeholder="50.00"
                min="0"
                step="0.01"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Persona/Audience Connection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Persona/Audience
              </label>
              <select
                value={formData.personaId}
                onChange={(e) => handleChange('personaId', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Select a persona (optional)</option>
                <option value="persona-1">BD Decision Makers</option>
                <option value="persona-2">Growth-Focused CEOs</option>
                <option value="persona-3">Tech Startup Founders</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Connect this campaign to a persona. Google Ads will use this to match your audience.
              </p>
            </div>

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/ads/dashboard')}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                Create Campaign
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Live Preview</h2>
            <Eye className="h-6 w-6 text-gray-400" />
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-4">
              This is how your ad will appear in Google Search results:
            </p>
          </div>

          {renderAdPreview()}

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">🎯 Persona → Google Ads Audience Connection</h3>
            <p className="text-xs text-blue-700 mb-2">
              When you select a persona, we'll automatically map it to Google Ads audiences:
            </p>
            <ul className="text-xs text-blue-700 space-y-1 ml-4 list-disc">
              <li><strong>Customer Match:</strong> Target contacts from your persona's contact lists</li>
              <li><strong>Similar Audiences:</strong> Google finds people similar to your persona</li>
              <li><strong>Custom Audiences:</strong> Demographics/interests matching persona traits</li>
              <li><strong>Remarketing:</strong> Target website visitors who match persona criteria</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2 italic">
              Note: Google Ads manages audiences separately, but personas help you configure which audiences to use.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
