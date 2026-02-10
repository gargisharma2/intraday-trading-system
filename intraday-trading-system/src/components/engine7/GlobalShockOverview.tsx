import { motion } from 'framer-motion';
import { Globe, AlertTriangle } from 'lucide-react';
import type { ShockOverviewState, ShockStatus } from './types';

interface GlobalShockOverviewProps {
  overview: ShockOverviewState;
}

const badgeClass: Record<ShockStatus, string> = {
  Low: 'bg-green-500',
  Medium: 'bg-yellow-500',
  High: 'bg-orange-500',
  Extreme: 'bg-red-500'
};

const GlobalShockOverview = ({ overview }: GlobalShockOverviewProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-accent bg-opacity-10">
            <Globe className="w-5 h-5 text-accent" />
          </div>
          <h2 className="section-title mb-0">Global Shock Status</h2>
        </div>

        <motion.span
          className={`text-xs font-semibold text-white px-3 py-1 rounded-full ${badgeClass[overview.status]}`}
          key={overview.status}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {overview.status}
        </motion.span>
      </div>

      <div className="flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-text-secondary mt-0.5" />
        <p className="text-sm text-text-secondary leading-relaxed">{overview.summary}</p>
      </div>
    </motion.div>
  );
};

export default GlobalShockOverview;

