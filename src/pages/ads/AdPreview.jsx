import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Copy, Check } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function AdPreview() {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const [copied, setCopied] = useState(false);

  // Demo ad data - in real app, this would come from API
  const adData = {
    id: campaignId || 1,
    campaignName: "BD Services - Search",
    headline1: "Scale Your Business Development",
    headline2: "Expert BD Strategy & Growth",
    headline3: "Proven Revenue Growth Methods",
    description1: "Transform your business development process with data-driven strategies and expert guidance.",
    description2: "Join 500+ companies using our proven BD framework to accelerate growth.",
    finalUrl: "https://ignitestrategies.co/growth-dashboard",
    displayUrl: "ignitestrategies.co/growth",
    status: "Active",
    impressions: 12500,
    clicks: 245,
    ctr: 1.96,
    conversions: 8
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Ad Preview"
        subtitle={`Viewing ad for: ${adData.campaignName}`}
        backTo="/ads/dashboard"
        backLabel="← Back to Dashboard"
      />

      {/* Ad Preview Section - Structured like Google Ads */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">How Your Ad Appears</h2>
          <p className="text-gray-600">This is how your ad will look in Google Search results</p>
        </div>

        {/* Google Search Result Preview */}
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
          {/* Ad Label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-green-700 font-semibold">Ad</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{adData.displayUrl}</span>
          </div>

          {/* Headlines */}
          <div className="mb-2">
            <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-1">
              {adData.headline1}
            </h3>
            <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-1">
              {adData.headline2}
            </h3>
            <h3 className="text-xl text-blue-600 hover:text-blue-800 hover:underline cursor-pointer mb-2">
              {adData.headline3}
            </h3>
          </div>

          {/* Descriptions */}
          <div className="mb-3">
            <p className="text-sm text-gray-700 leading-relaxed mb-1">
              {adData.description1}
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              {adData.description2}
            </p>
          </div>

          {/* Final URL */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ExternalLink className="h-4 w-4" />
            <span>{adData.finalUrl}</span>
          </div>
        </div>

        {/* Copy Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Landing Page URL</label>
              <button
                onClick={() => copyToClipboard(adData.finalUrl)}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 break-all">
              {adData.finalUrl}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Display URL</label>
              <button
                onClick={() => copyToClipboard(adData.displayUrl)}
                className="text-purple-600 hover:text-purple-800 flex items-center gap-1 text-sm"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-white border border-gray-300 rounded p-2 text-sm text-gray-900">
              {adData.displayUrl}
            </div>
          </div>
        </div>
      </div>

      {/* Ad Copy Breakdown */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ad Copy Structure</h2>
        
        <div className="space-y-6">
          {/* Headlines */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Headlines (3 required)</h3>
            <div className="space-y-3">
              {[adData.headline1, adData.headline2, adData.headline3].map((headline, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500">Headline {index + 1}</span>
                    <span className="text-xs text-gray-500">{headline.length} / 30 characters</span>
                  </div>
                  <div className="text-base font-medium text-gray-900">{headline}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Descriptions (2 required)</h3>
            <div className="space-y-3">
              {[adData.description1, adData.description2].map((description, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-500">Description {index + 1}</span>
                    <span className="text-xs text-gray-500">{description.length} / 90 characters</span>
                  </div>
                  <div className="text-sm text-gray-700 leading-relaxed">{description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{adData.impressions.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Impressions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{adData.clicks}</div>
            <div className="text-sm text-gray-600">Clicks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{adData.ctr}%</div>
            <div className="text-sm text-gray-600">CTR</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{adData.conversions}</div>
            <div className="text-sm text-gray-600">Conversions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

