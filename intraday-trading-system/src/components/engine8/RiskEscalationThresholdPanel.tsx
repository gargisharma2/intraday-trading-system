import { motion } from 'framer-motion';
import { Flag } from 'lucide-react';

interface RiskEscalationThresholdPanelProps {
  current: 1 | 2 | 3;
}

const steps: Array<{ id: 1 | 2 | 3; title: string }> = [
  { id: 1, title: 'Threshold 1 – Early Instability' },
  { id: 2, title: 'Threshold 2 – Confirmed Escalation' },
  { id: 3, title: 'Threshold 3 – Breakdown Imminent' }
];

const RiskEscalationThresholdPanel = ({ current }: RiskEscalationThresholdPanelProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.06 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <Flag className="w-5 h-5 text-accent" />
        </div>
        <h2 className="section-title mb-0">Risk Escalation Threshold Panel</h2>
      </div>

      <div className="space-y-3">
        {steps.map((s) => {
          const active = s.id === current;
          const passed = s.id < current;

          return (
            <motion.div
              key={s.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                active
                  ? 'border-accent bg-accent bg-opacity-10'
                  : passed
                    ? 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 bg-white'
              }`}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-md ${
                    active
                      ? 'bg-accent text-white'
                      : passed
                        ? 'bg-green-100 text-green-700 border border-green-200'
                        : 'bg-gray-100 text-text-secondary border border-gray-200'
                  }`}
                >
                  {active ? 'Current' : passed ? 'Passed' : 'Pending'}
                </span>
                <span className="text-sm font-medium text-text-primary">{s.title}</span>
              </div>

              {active && (
                <motion.span
                  className="w-2.5 h-2.5 rounded-full bg-accent"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RiskEscalationThresholdPanel;

