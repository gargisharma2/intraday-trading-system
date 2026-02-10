import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

const ScenarioProbabilityCard = () => {
  const probabilities = [
    {
      scenario: 'Volatile open → trend → consolidation',
      probability: 62,
      color: '#10B981',
      shortLabel: 'Bullish Continuation'
    },
    {
      scenario: 'News spike → exhaustion → reversal',
      probability: 21,
      color: '#EF4444',
      shortLabel: 'Bearish Reversal'
    },
    {
      scenario: 'Range → breakout → retracement',
      probability: 17,
      color: '#F59E0B',
      shortLabel: 'Range Bound'
    }
  ];

  return (
    <motion.div
      className="rounded-xl shadow-md bg-white p-6 w-full h-full flex flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center mb-6">
        <BarChart3 className="w-5 h-5 mr-2 text-accent" />
        <h3 className="text-xl font-semibold text-text-primary">Scenario Probability Matrix</h3>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {probabilities.map((item, index) => (
          <motion.div
            key={index}
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-sm font-semibold text-text-primary mb-1">
                  {item.shortLabel}
                </p>
                <p className="text-xs text-text-secondary">
                  {item.scenario}
                </p>
              </div>
              <span className="text-xl font-bold text-text-primary ml-4">
                {item.probability}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full relative overflow-hidden"
                style={{ backgroundColor: item.color }}
                initial={{ width: 0 }}
                animate={{ width: `${item.probability}%` }}
                transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "linear",
                    delay: 1 + index * 0.2
                  }}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-text-secondary text-center">
          Updated every minute • Last update: 12:45:23 PM
        </p>
      </div>
    </motion.div>
  );
};

export default ScenarioProbabilityCard;