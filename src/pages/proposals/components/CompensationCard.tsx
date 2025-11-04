import { motion } from 'framer-motion';
import { Compensation } from '../types';

interface CompensationCardProps {
  compensation: Compensation;
}

export default function CompensationCard({ compensation }: CompensationCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: compensation.currency,
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8"
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Compensation</h2>

      {/* Total */}
      <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-100">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-gray-600">Total Investment</span>
          <span className="text-3xl font-bold text-gray-900">
            {formatCurrency(compensation.total)}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Breakdown
        </h3>
        <div className="space-y-2">
          {compensation.breakdown.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="text-gray-700">{item.item}</span>
              <span className="font-semibold text-gray-900">
                {formatCurrency(item.amount)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Payment Schedule */}
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Payment Schedule
        </h3>
        <div className="space-y-3">
          {compensation.paymentSchedule.map((payment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="p-4 border border-gray-200 rounded-lg bg-gray-50"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{payment.label}</p>
                  <p className="text-sm text-gray-500">{formatDate(payment.dueDate)}</p>
                </div>
                <span className="font-bold text-gray-900">
                  {formatCurrency(payment.amount)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

