import { motion } from 'framer-motion';
import { Milestone } from '../types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  const totalWeeks = milestones.length;
  const completedCount = milestones.filter((m) => m.completed).length;
  const progressPercentage = (completedCount / totalWeeks) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">8-Week Timeline</h2>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>
            {completedCount} of {totalWeeks} milestones completed
          </span>
          <span className="font-semibold">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-full bg-gradient-to-r from-red-600 to-orange-600 rounded-full"
          />
        </div>
      </div>

      {/* Milestones */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {milestones.map((milestone, index) => (
          <motion.div
            key={milestone.week}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              milestone.completed
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  milestone.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
              <span className="text-xs font-semibold text-gray-600">
                Week {milestone.week}
              </span>
            </div>
            <p
              className={`text-sm font-medium ${
                milestone.completed ? 'text-green-700' : 'text-gray-600'
              }`}
            >
              {milestone.label}
            </p>
            {milestone.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 text-green-500"
              >
                ✓
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

