import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import type { GlobalShockEvent, EventCategory } from './types';

interface BreakingEventsFeedProps {
  events: GlobalShockEvent[];
  onRefresh: () => void;
}

const categoryTag: Record<EventCategory, string> = {
  Geopolitics: 'bg-purple-100 text-purple-700 border-purple-200',
  Policy: 'bg-blue-100 text-blue-700 border-blue-200',
  Energy: 'bg-orange-100 text-orange-700 border-orange-200',
  Crypto: 'bg-green-100 text-green-700 border-green-200'
};

const severityDot: Record<GlobalShockEvent['severity'], string> = {
  1: 'bg-green-500',
  2: 'bg-yellow-500',
  3: 'bg-orange-500',
  4: 'bg-red-500',
  5: 'bg-red-600'
};

const BreakingEventsFeed = ({ events, onRefresh }: BreakingEventsFeedProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Breaking Events Feed</h2>
        <motion.button
          className="inline-flex items-center gap-2 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors"
          onClick={onRefresh}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </motion.button>
      </div>

      <div className="max-h-[250px] overflow-y-auto divide-y divide-gray-200">
        {events.map((e) => (
          <div key={e.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`text-[11px] px-2 py-1 rounded-md border ${categoryTag[e.category]}`}>
                  {e.category}
                </span>
                <span className="text-[11px] text-text-secondary">{e.timestamp}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${severityDot[e.severity]}`} />
                <span className="text-[11px] font-medium text-text-secondary">Severity {e.severity}</span>
              </div>
            </div>

            <div className="text-sm font-semibold text-text-primary mb-1">{e.title}</div>
            <div className="text-xs text-text-secondary leading-relaxed">{e.description}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BreakingEventsFeed;

