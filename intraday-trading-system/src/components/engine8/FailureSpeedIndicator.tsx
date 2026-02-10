import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface FailureSpeedIndicatorProps {
  speed: number; // 0-100
}

const FailureSpeedIndicator = ({ speed }: FailureSpeedIndicatorProps) => {
  const clamped = Math.max(0, Math.min(100, speed));

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.03 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <Zap className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="section-title mb-0">Failure Speed Indicator</h2>
          <p className="text-xs text-text-secondary mt-1">Failure Speed – How fast risk is rising</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-primary">Speed</span>
        <span className="text-sm font-semibold text-text-primary">{clamped}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #22C55E 0%, #EAB308 40%, #F97316 70%, #EF4444 100%)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <div className="flex justify-between mt-2 text-[11px] text-text-secondary">
        <span>Slow</span>
        <span>Rising</span>
        <span>Fast</span>
        <span>Explosive</span>
      </div>
    </motion.div>
  );
};

export default FailureSpeedIndicator;

