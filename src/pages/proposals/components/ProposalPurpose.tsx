import { motion } from 'framer-motion';
import { useState } from 'react';

interface ProposalPurposeProps {
  purpose: string;
  editable?: boolean;
  onUpdate?: (newPurpose: string) => void;
}

export default function ProposalPurpose({
  purpose,
  editable = false,
  onUpdate,
}: ProposalPurposeProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(purpose);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(purpose);
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Purpose</h2>
        {editable && !isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Edit
          </button>
        )}
      </div>
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full min-h-[150px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Enter proposal purpose..."
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 leading-relaxed">{editValue}</p>
      )}
    </motion.div>
  );
}

