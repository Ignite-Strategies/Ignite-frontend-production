import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Mail, CheckCircle } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

// Template data (same as in Templates.jsx)
const getTemplates = () => [
  {
    id: 'need-nda',
    name: 'Need an NDA?',
    subject: 'Following up on NDA',
    body: `Hi {{name}},

I hope this email finds you well. I wanted to reach out regarding a potential collaboration/partnership opportunity between our organizations.

Before we dive deeper into the details, we'll need to have a Non-Disclosure Agreement (NDA) in place to protect both parties' confidential information.

Would you be available for a brief call this week to discuss the opportunity and next steps for the NDA?

Looking forward to connecting!

Best regards,
{{yourName}}`
  },
  {
    id: 'catching-up',
    name: 'Catching up after awhile',
    subject: 'Catching up',
    body: `Hi {{name}},

It's been a while since we last connected, and I wanted to reach out to catch up.

I've been thinking about our previous conversations regarding {{topic}}, and I'd love to hear how things have been progressing on your end.

Would you be open to a quick call or coffee meeting in the coming weeks? I'd love to hear what you've been working on and see if there are any opportunities for collaboration.

Let me know what works for you!

Best regards,
{{yourName}}`
  },
  {
    id: 'aare-alum',
    name: 'Aare Alum Checking in',
    subject: 'AARE Alum - Checking in',
    body: `Hi {{name}},

I hope this message finds you well! As a fellow AARE alum, I wanted to reach out and reconnect.

It's been great seeing the impact you've been making in {{field/company}}, and I'd love to catch up and hear more about what you're working on.

Would you be interested in connecting for a quick call or meeting? I'd also love to hear your thoughts on how we might collaborate or support each other's initiatives.

Looking forward to reconnecting!

Best regards,
{{yourName}}`
  }
];

export default function TemplateView() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    const templates = getTemplates();
    const found = templates.find(t => t.id === templateId);
    setTemplate(found);
  }, [templateId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUseTemplate = () => {
    navigate('/outreach/campaign-creator', {
      state: {
        template: template
      }
    });
  };

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Template not found</p>
          <button
            onClick={() => navigate('/outreach/templates')}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title={template.name}
        subtitle="View and use this email template"
        backTo="/outreach/templates"
        backLabel="Back to Templates"
      />

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mt-6">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{template.name}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Subject:</span> {template.subject}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(`${template.subject}\n\n${template.body}`)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy
                  </>
                )}
              </button>
              <button
                onClick={handleUseTemplate}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2 text-sm"
              >
                <Mail className="h-4 w-4" />
                Use Template
              </button>
            </div>
          </div>
        </div>

        {/* Template Body */}
        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-700 font-sans leading-relaxed">
              {template.body}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

