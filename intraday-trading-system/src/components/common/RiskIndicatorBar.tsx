import { motion } from 'framer-motion';

interface RiskIndicatorBarProps {
  value: number; // 0-100
  labels?: string[];
}

const RiskIndicatorBar = ({ value, labels }: RiskIndicatorBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div>
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
      {labels && labels.length > 0 && (
        <div className="flex justify-between mt-1 text-[11px] text-text-secondary">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskIndicatorBar;

