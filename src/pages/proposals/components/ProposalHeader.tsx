import { motion } from 'framer-motion';

interface ProposalHeaderProps {
  clientName: string;
  clientCompany: string;
  dateIssued: string;
  status: "draft" | "active" | "approved";
  preparedBy: string;
}

export default function ProposalHeader({
  clientName,
  clientCompany,
  dateIssued,
  status,
  preparedBy,
}: ProposalHeaderProps) {
  const statusConfig = {
    draft: { bg: "bg-gray-100", text: "text-gray-700", label: "Draft" },
    active: { bg: "bg-blue-100", text: "text-blue-700", label: "Active" },
    approved: { bg: "bg-green-100", text: "text-green-700", label: "Approved" },
  };

  const statusStyle = statusConfig[status];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 rounded-t-2xl overflow-hidden"
    >
      <div className="bg-black/20 backdrop-blur-sm p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-semibold uppercase tracking-wider mb-2 opacity-90"
            >
              Ignite × {clientCompany}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold mb-2"
            >
              Proposal for {clientName}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm opacity-80"
            >
              Prepared by {preparedBy} • {new Date(dateIssued).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span
              className={`inline-block px-4 py-2 rounded-full font-semibold text-sm ${statusStyle.bg} ${statusStyle.text}`}
            >
              {statusStyle.label}
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

