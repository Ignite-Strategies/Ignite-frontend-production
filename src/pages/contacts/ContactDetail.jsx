import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Building2, Briefcase, Trash2, Edit } from 'lucide-react';
import api from '../../lib/api';

export default function ContactDetail() {
  const navigate = useNavigate();
  const { contactId } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadContact();
  }, [contactId]);

  const loadContact = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/contacts/${contactId}`);
      
      if (response.data.success && response.data.contact) {
        setContact(response.data.contact);
        console.log('✅ Contact loaded:', response.data.contact);
      } else {
        console.error('❌ No contact found');
        navigate('/contacts/view');
      }
    } catch (error) {
      console.error('❌ Error loading contact:', error);
      alert('Failed to load contact');
      navigate('/contacts/view');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/api/contacts/${contactId}`);
      
      // Update localStorage
      const cachedContacts = localStorage.getItem('contacts');
      if (cachedContacts) {
        const contacts = JSON.parse(cachedContacts);
        const updatedContacts = contacts.filter(c => c.id !== contactId);
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      }
      
      navigate('/contacts/view');
    } catch (error) {
      console.error('❌ Error deleting contact:', error);
      alert('Failed to delete contact');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">Loading Contact...</div>
        </div>
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">Contact Not Found</div>
          <button
            onClick={() => navigate('/contacts/view')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Contacts
          </button>
        </div>
      </div>
    );
  }

  const getPipelineBadge = (pipeline) => {
    if (!pipeline) return null;
    
    const colors = {
      prospect: 'bg-blue-100 text-blue-800',
      client: 'bg-green-100 text-green-800',
      collaborator: 'bg-purple-100 text-purple-800',
      institution: 'bg-orange-100 text-orange-800'
    };
    
    const pipelineLabel = pipeline.pipeline ? 
      pipeline.pipeline.charAt(0).toUpperCase() + pipeline.pipeline.slice(1) : '';
    
    return (
      <span className={`px-3 py-1 text-sm font-semibold rounded-full ${colors[pipeline.pipeline] || 'bg-gray-100 text-gray-800'}`}>
        {pipelineLabel}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/contacts/view')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Contacts
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {contact.goesBy || `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unnamed Contact'}
              </h1>
              {contact.title && (
                <p className="text-xl text-gray-600">{contact.title}</p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/contacts/${contactId}/edit`)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Edit className="h-5 w-5" />
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                  deleting
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-red-600 text-white hover:bg-red-700'
                }`}
              >
                <Trash2 className="h-5 w-5" />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contact.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-gray-900">{contact.email}</div>
                </div>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="text-gray-900">{contact.phone}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Company Card */}
        {contact.contactCompany && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 className="h-6 w-6" />
              Company
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500">Company Name</div>
                <div className="text-lg font-semibold text-gray-900">{contact.contactCompany.companyName}</div>
              </div>
              {contact.contactCompany.website && (
                <div>
                  <div className="text-sm text-gray-500">Website</div>
                  <a 
                    href={contact.contactCompany.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {contact.contactCompany.website}
                  </a>
                </div>
              )}
              {contact.contactCompany.industry && (
                <div>
                  <div className="text-sm text-gray-500">Industry</div>
                  <div className="text-gray-900">{contact.contactCompany.industry}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Pipeline Card */}
        {contact.pipeline && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              Pipeline
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-500 mb-2">Pipeline Type</div>
                {getPipelineBadge(contact.pipeline)}
              </div>
              {contact.pipeline.stage && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Current Stage</div>
                  <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
                    {contact.pipeline.stage}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Additional Info */}
        {(contact.buyerDecision || contact.howMet || contact.notes) && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
            <div className="space-y-3">
              {contact.buyerDecision && (
                <div>
                  <div className="text-sm text-gray-500">Buyer Decision Type</div>
                  <div className="text-gray-900">{contact.buyerDecision}</div>
                </div>
              )}
              {contact.howMet && (
                <div>
                  <div className="text-sm text-gray-500">How We Met</div>
                  <div className="text-gray-900">{contact.howMet}</div>
                </div>
              )}
              {contact.notes && (
                <div>
                  <div className="text-sm text-gray-500 mb-2">Notes</div>
                  <div className="text-gray-900 whitespace-pre-wrap">{contact.notes}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

