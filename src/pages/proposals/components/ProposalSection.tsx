import { motion } from 'framer-motion';
import { useState } from 'react';
import DeliverableModal from './DeliverableModal';
import { Phase } from '../types';

interface ProposalSectionProps {
  phase: Phase;
  onViewDetails?: (deliverableId: string) => void;
}

export default function ProposalSection({
  phase,
  onViewDetails,
}: ProposalSectionProps) {
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null);

  const handleViewDetails = (deliverableId: string) => {
    setSelectedDeliverable(deliverableId);
    if (onViewDetails) {
      onViewDetails(deliverableId);
    }
  };

  const selectedDeliverableData = phase.deliverables.find(
    (d) => d.id === selectedDeliverable
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 hover:shadow-lg transition-shadow"
      >
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
          <p className="text-gray-600 leading-relaxed">{phase.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          {phase.deliverables.map((deliverable) => (
            <div
              key={deliverable.id}
              className="flex items-start justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {deliverable.name}
                </h4>
                <p className="text-sm text-gray-600">{deliverable.description}</p>
              </div>
              <button
                onClick={() => handleViewDetails(deliverable.id)}
                className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </motion.div>

      {selectedDeliverableData && (
        <DeliverableModal
          deliverable={selectedDeliverableData}
          isOpen={!!selectedDeliverable}
          onClose={() => setSelectedDeliverable(null)}
        />
      )}
    </>
  );
}

