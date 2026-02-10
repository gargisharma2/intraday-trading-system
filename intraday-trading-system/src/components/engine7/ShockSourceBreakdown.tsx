import { motion } from 'framer-motion';
import { PieChart, ShieldAlert } from 'lucide-react';
import type { ShockSourceBreakdown } from './types';

interface ShockSourceBreakdownProps {
  breakdown: ShockSourceBreakdown;
}

const colors: Record<keyof ShockSourceBreakdown, string> = {
  Geopolitical: '#8B5CF6', // purple
  Policy: '#3B82F6',       // blue
  Energy: '#F59E0B',       // amber
  Crypto: '#22C55E'        // green
};

const ShockSourceBreakdownCard = ({ breakdown }: ShockSourceBreakdownProps) => {
  const entries = Object.entries(breakdown) as Array<[keyof ShockSourceBreakdown, number]>;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <PieChart className="w-5 h-5 text-accent" />
        </div>
        <h2 className="section-title mb-0">Shock Source Breakdown</h2>
      </div>

      {/* Segmented bar */}
      <div className="w-full h-3 rounded-full overflow-hidden bg-gray-200 mb-4 flex">
        {entries.map(([k, v]) => (
          <div key={k} style={{ width: `${v}%`, backgroundColor: colors[k] }} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {entries.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors[k] }} />
              <span className="text-xs font-medium text-text-primary">{k}</span>
            </div>
            <span className="text-xs font-semibold text-text-secondary">{v}%</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-text-secondary">
        <ShieldAlert className="w-4 h-4" />
        <span>Breakdown reflects intraday shock attribution (mock).</span>
      </div>
    </motion.div>
  );
};

export default ShockSourceBreakdownCard;

