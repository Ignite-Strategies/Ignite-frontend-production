import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @ts-ignore
import Navigation from '../../components/Navigation';
import ProposalHeader from './components/ProposalHeader';
import ProposalPurpose from './components/ProposalPurpose';
import ProposalSection from './components/ProposalSection';
import MilestoneTimeline from './components/MilestoneTimeline';
import CompensationCard from './components/CompensationCard';
import FeedbackBox from './components/FeedbackBox';
import ApproveButton from './components/ApproveButton';
import { Proposal } from './types';
import proposalBusinessPointData from '../../data/proposals/proposalBusinessPoint.json';
// @ts-ignore
import api from '../../lib/api.js';

export default function ProposalPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProposal = async () => {
      setLoading(true);
      
      try {
        // Try to fetch from API first (by proposal ID)
        // If clientId looks like a proposal ID, fetch directly
        if (clientId && clientId.length > 10) {
          try {
            const response = await api.get(`/api/proposals/${clientId}`);
            if (response.data.success && response.data.proposal) {
              const proposalData = response.data.proposal;
              // Transform API response to Proposal type
              setProposal({
                id: proposalData.id,
                clientName: proposalData.clientName,
                clientCompany: proposalData.clientCompany,
                dateIssued: proposalData.dateIssued || proposalData.createdAt,
                status: proposalData.status,
                purpose: proposalData.purpose || '',
                preparedBy: proposalData.preparedBy || 'Ignite Strategies',
                phases: proposalData.phases || [],
                milestones: proposalData.milestones || [],
                compensation: proposalData.compensation || { total: 0, currency: 'USD', breakdown: [], paymentSchedule: [] }
              } as Proposal);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('API fetch failed, trying fallback...', apiError);
          }
        }

        // Fallback: Load from local JSON for backward compatibility
        if (clientId === 'businesspoint-law') {
          setProposal(proposalBusinessPointData as Proposal);
        } else {
          // Default fallback
          setProposal(proposalBusinessPointData as Proposal);
        }
      } catch (error) {
        console.error('Failed to load proposal:', error);
        // Fallback to JSON
        if (clientId === 'businesspoint-law') {
          setProposal(proposalBusinessPointData as Proposal);
        }
      }

      setLoading(false);
    };

    loadProposal();
  }, [clientId]);

  const handlePurposeUpdate = (newPurpose: string) => {
    if (proposal) {
      setProposal({ ...proposal, purpose: newPurpose });
    }
  };

  const handleFeedbackSubmit = (feedback: string) => {
    // In Phase 2, this will POST to /api/proposals/:id/feedback
    console.log('Feedback submitted:', feedback);
    // Show toast notification in future
  };

  const handleApprove = () => {
    // In Phase 2, this will POST to /api/proposals/:id/approve
    console.log('Proposal approved');
    // Show confirmation and redirect in future
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading proposal...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <p className="text-xl text-gray-700 mb-2">Proposal not found</p>
            <p className="text-gray-500">The proposal you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          <ProposalHeader
            clientName={proposal.clientName}
            clientCompany={proposal.clientCompany}
            dateIssued={proposal.dateIssued}
            status={proposal.status}
            preparedBy={proposal.preparedBy}
          />
        </div>

        {/* Purpose */}
        <div className="mb-8">
          <ProposalPurpose
            purpose={proposal.purpose}
            editable={false}
            onUpdate={handlePurposeUpdate}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Sections */}
          <div className="lg:col-span-2 space-y-8">
            {proposal.phases && proposal.phases.length > 0 ? (
              proposal.phases.map((phase: any) => (
                <ProposalSection key={phase.id} phase={phase} />
              ))
            ) : (
              <p className="text-gray-500">No phases defined</p>
            )}
          </div>

          {/* Right Column - Timeline, Compensation, etc. */}
          <div className="space-y-8">
            {proposal.milestones && <MilestoneTimeline milestones={proposal.milestones} />}
            {proposal.compensation && <CompensationCard compensation={proposal.compensation} />}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <FeedbackBox onSubmit={handleFeedbackSubmit} />
          <ApproveButton onApprove={handleApprove} />
        </div>
      </div>
    </div>
  );
}

