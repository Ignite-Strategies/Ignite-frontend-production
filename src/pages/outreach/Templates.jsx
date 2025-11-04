import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/PageHeader';

export default function Templates() {
  const navigate = useNavigate();

  const templates = [
    {
      id: 'need-nda',
      name: 'Need an NDA?',
      subject: 'Following up on NDA',
      snippet: `Hi {{firstName}},

I hope this email finds you well. I wanted to reach out regarding a potential collaboration/partnership opportunity between our organizations.

Before we dive deeper into the details, we'll need to have a Non-Disclosure Agreement (NDA) in place...`
    },
    {
      id: 'catching-up',
      name: 'Catching up after awhile',
      subject: 'Catching up',
      snippet: `Hi {{firstName}},

It's been a while since we last connected, and I wanted to reach out to catch up.

I've been thinking about our previous conversations regarding {{topic}}, and I'd love to hear how things have been progressing...`
    },
    {
      id: 'aare-alum',
      name: 'Aare Alum Checking in',
      subject: 'AARE Alum - Checking in',
      snippet: `Hi {{firstName}},

I hope this message finds you well! As a fellow AARE alum, I wanted to reach out and reconnect.

It's been great seeing the impact you've been making in {{field}}...`
    }
  ];

  const handleViewTemplate = (templateId) => {
    navigate(`/outreach/templates/${templateId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader
        title="Email Templates"
        subtitle="Reusable email templates for your outreach campaigns"
        backTo="/outreach"
        backLabel="Back to Outreach"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleViewTemplate(template.id)}
            className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer flex flex-col"
          >
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-gray-900 truncate">{template.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    <span className="font-medium">Subject:</span> {template.subject}
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded border border-gray-200 p-3 mb-3">
                  <pre className="whitespace-pre-wrap text-xs text-gray-700 font-mono leading-relaxed line-clamp-6">
                    {template.snippet}
                  </pre>
                </div>
              </div>
              <div className="flex items-center justify-end text-indigo-600 text-sm font-medium">
                View full template →
              </div>
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No templates available</p>
        </div>
      )}
    </div>
  );
}

