import { motion } from 'framer-motion';
import { useState } from 'react';

interface ApproveButtonProps {
  onApprove?: () => void;
  disabled?: boolean;
}

export default function ApproveButton({
  onApprove,
  disabled = false,
}: ApproveButtonProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = async () => {
    if (disabled || isApproved) return;

    setIsApproving(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsApproving(false);
    setIsApproved(true);

    if (onApprove) {
      onApprove();
    }
  };

  if (isApproved) {
    return (
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-4xl mb-2"
        >
          ✓
        </motion.div>
        <p className="text-lg font-bold text-green-700">Proposal Approved!</p>
        <p className="text-sm text-green-600 mt-1">
          Thank you for your approval. We'll be in touch soon.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Ready to Move Forward?
        </h3>
        <p className="text-gray-600 mb-6">
          Approve this proposal to begin implementation.
        </p>
        <motion.button
          onClick={handleApprove}
          disabled={disabled || isApproving}
          whileHover={{ scale: disabled || isApproving ? 1 : 1.02 }}
          whileTap={{ scale: disabled || isApproving ? 1 : 0.98 }}
          className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
        >
          {isApproving ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            'Approve Proposal'
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}

