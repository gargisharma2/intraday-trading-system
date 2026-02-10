import { motion } from 'framer-motion';

interface ThresholdGaugeProps {
  value: number; // 0-100
  label?: string;
}

const ThresholdGauge = ({ value, label }: ThresholdGaugeProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
      {label && (
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-text-primary">{label}</span>
          <span className="text-xs font-semibold text-text-secondary">{clamped}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 rounded-full"
          style={{
            background:
              'linear-gradient(90deg,#4ade80 0%,#facc15 35%,#fb923c 65%,#ef4444 100%)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
    </div>
  );
};

export default ThresholdGauge;

