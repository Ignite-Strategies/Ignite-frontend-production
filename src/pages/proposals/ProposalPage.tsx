import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

export default function ProposalPage() {
  const { clientId } = useParams<{ clientId: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In Phase 2, this will fetch from API: /api/proposals/:clientId
    // For now, load from local JSON based on clientId
    const loadProposal = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Map clientId to data source
      // In production, this would be: const response = await fetch(`/api/proposals/${clientId}`);
      if (clientId === 'businesspoint-law') {
        setProposal(proposalBusinessPointData as Proposal);
      } else {
        // Fallback to default for now
        setProposal(proposalBusinessPointData as Proposal);
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
            {proposal.phases.map((phase) => (
              <ProposalSection key={phase.id} phase={phase} />
            ))}
          </div>

          {/* Right Column - Timeline, Compensation, etc. */}
          <div className="space-y-8">
            <MilestoneTimeline milestones={proposal.milestones} />
            <CompensationCard compensation={proposal.compensation} />
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

