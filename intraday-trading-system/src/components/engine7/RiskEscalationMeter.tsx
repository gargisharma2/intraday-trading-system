import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface RiskEscalationMeterProps {
  riskIndex: number; // 0-100
}

const RiskEscalationMeter = ({ riskIndex }: RiskEscalationMeterProps) => {
  const clamped = Math.max(0, Math.min(100, riskIndex));

  const level =
    clamped < 25 ? 'Low' : clamped < 50 ? 'Medium' : clamped < 75 ? 'High' : 'Extreme';

  const levelColor =
    clamped < 25
      ? 'text-green-600'
      : clamped < 50
        ? 'text-yellow-600'
        : clamped < 75
          ? 'text-orange-600'
          : 'text-red-600';

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <Activity className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="section-title mb-0">Risk Escalation Meter</h2>
          <p className="text-xs text-text-secondary mt-1">Intraday Global Shock Intensity</p>
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div className={`text-3xl font-bold ${levelColor}`}>{clamped}</div>
        <div className="text-xs font-semibold text-text-secondary">/ 100</div>
      </div>

      {/* Gauge */}
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 rounded-full"
          style={{
            width: `${clamped}%`,
            background: 'linear-gradient(90deg, #22C55E 0%, #EAB308 35%, #F97316 65%, #EF4444 100%)'
          }}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.9 }}
        />
      </div>

      <div className="flex justify-between mt-2 text-[11px] text-text-secondary">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Extreme</span>
      </div>

      <motion.div
        key={level}
        className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-gray-50 border border-gray-200"
        initial={{ scale: 0.98, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-xs font-medium text-text-primary">{level}</span>
      </motion.div>
    </motion.div>
  );
};

export default RiskEscalationMeter;

