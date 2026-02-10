import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ScenarioPaths = () => {
  const scenarios = [
    {
      id: 1,
      path: ['Volatile open', 'trend', 'consolidation'],
      confidence: 62,
      color: '#10B981'
    },
    {
      id: 2,
      path: ['News spike', 'exhaustion', 'reversal'],
      confidence: 21,
      color: '#EF4444'
    },
    {
      id: 3,
      path: ['Range', 'breakout', 'retracement'],
      confidence: 17,
      color: '#F59E0B'
    }
  ];

  return (
    <div className="rounded-xl shadow-md bg-white p-6 w-full h-full flex flex-col">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Scenario Paths</h3>

      <div className="space-y-4 flex-1 flex flex-col justify-center">
        {scenarios.map((scenario, index) => (
          <motion.div
            key={scenario.id}
            className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Path visualization */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {scenario.path.map((phase, phaseIndex) => (
                  <div key={phaseIndex} className="flex items-center">
                    <span
                      className="px-3 py-1.5 text-sm font-medium text-white rounded"
                      style={{ backgroundColor: scenario.color }}
                    >
                      {phase}
                    </span>
                    {phaseIndex < scenario.path.length - 1 && (
                      <ArrowRight className="w-4 h-4 mx-2 text-text-secondary" />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-lg font-semibold text-text-primary ml-4">
                {scenario.confidence}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="h-2 rounded-full"
                style={{ backgroundColor: scenario.color }}
                initial={{ width: 0 }}
                animate={{ width: `${scenario.confidence}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioPaths;