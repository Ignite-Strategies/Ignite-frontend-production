import { motion } from 'framer-motion';
import { useState } from 'react';

interface FeedbackBoxProps {
  onSubmit?: (feedback: string) => void;
}

export default function FeedbackBox({ onSubmit }: FeedbackBoxProps) {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    if (onSubmit) {
      onSubmit(feedback);
    }
    
    setFeedback('');
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-4">Add Feedback</h3>
      <p className="text-sm text-gray-600 mb-4">
        Have questions or need clarification? Add your feedback below.
      </p>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Enter your feedback, questions, or suggestions..."
        className="w-full min-h-[120px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none mb-4"
      />
      <button
        onClick={handleSubmit}
        disabled={!feedback.trim() || isSubmitting}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </motion.div>
  );
}

