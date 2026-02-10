import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import type { FragilityState } from './types';

interface IntradayFragilityMeterProps {
  index: number; // 0-100
  state: FragilityState;
}

const stateColor: Record<FragilityState, string> = {
  Stable: '#22C55E',
  Watch: '#EAB308',
  Fragile: '#F97316',
  Critical: '#EF4444'
};

const IntradayFragilityMeter = ({ index, state }: IntradayFragilityMeterProps) => {
  const clamped = Math.max(0, Math.min(100, index));
  const radius = 56;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <Shield className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h2 className="section-title mb-0">Intraday Fragility Meter</h2>
          <p className="text-xs text-text-secondary mt-1">Fragility index (mock) with smooth updates</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-[140px] h-[140px]">
          <svg viewBox="0 0 140 140" className="w-full h-full">
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#E5E7EB"
              strokeWidth={stroke}
              fill="none"
            />
            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke={stateColor[state]}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circumference - dash}`}
              transform="rotate(-90 70 70)"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={{ strokeDasharray: `${dash} ${circumference - dash}` }}
              transition={{ duration: 0.8 }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-text-primary">{clamped}</div>
            <div className="text-xs text-text-secondary">/ 100</div>
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">State</span>
            <span
              className="text-xs font-semibold text-white px-3 py-1 rounded-full"
              style={{ backgroundColor: stateColor[state] }}
            >
              {state}
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-3 rounded-full"
              style={{ backgroundColor: stateColor[state] }}
              initial={{ width: 0 }}
              animate={{ width: `${clamped}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="flex justify-between mt-2 text-[11px] text-text-secondary">
            <span>Stable</span>
            <span>Watch</span>
            <span>Fragile</span>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default IntradayFragilityMeter;

