import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ActivePhaseCard = () => {
  const currentPhase = {
    name: 'Trend Phase',
    icon: TrendingUp,
    color: '#10B981',
    status: 'Active',
    description: 'Strong directional movement with increasing volume',
    duration: '120 minutes',
    keyLevels: [
      { label: 'Support', value: '4,245' },
      { label: 'Resistance', value: '4,280' },
      { label: 'Current', value: '4,267' }
    ]
  };

  return (
    <motion.div
      className="rounded-xl shadow-md bg-white p-6 w-full h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-xl font-semibold text-text-primary mb-6">Active Intraday Phase</h3>

      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* Phase Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="p-3 rounded-full"
              style={{ backgroundColor: `${currentPhase.color}20` }}
            >
              <currentPhase.icon
                className="w-6 h-6"
                style={{ color: currentPhase.color }}
              />
            </div>

            <div>
              <h4 className="text-lg font-semibold text-text-primary">
                {currentPhase.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {currentPhase.duration}
              </p>
            </div>
          </div>

          <span
            className="px-4 py-2 text-sm font-medium text-white rounded-full"
            style={{ backgroundColor: currentPhase.color }}
          >
            {currentPhase.status}
          </span>
        </div>

        {/* Description */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-text-primary">
            {currentPhase.description}
          </p>
        </div>

        {/* Key Levels */}
        <div className="grid grid-cols-3 gap-4">
          {currentPhase.keyLevels.map((level, index) => (
            <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-text-secondary mb-1">{level.label}</p>
              <p className="text-lg font-semibold text-text-primary">{level.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivePhaseCard;