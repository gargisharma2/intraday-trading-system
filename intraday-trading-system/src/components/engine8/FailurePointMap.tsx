import { motion } from 'framer-motion';
import { MapPinned } from 'lucide-react';
import type { FailurePointMap as FailurePointMapType, FailureSegmentId } from './types';

interface FailurePointMapProps {
  map: FailurePointMapType;
}

const segmentColor: Record<FailureSegmentId, string> = {
  'liquidity-collapse': '#F97316',
  'spread-explosion': '#EF4444',
  'volatility-jump': '#EAB308',
  'behavioral-reversal': '#8B5CF6',
  'shock-triggered-failure': '#C08D4D'
};

const FailurePointMap = ({ map }: FailurePointMapProps) => {
  const total = map.segments.reduce((s, seg) => s + seg.weight, 0) || 1;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.11 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <MapPinned className="w-5 h-5 text-accent" />
        </div>
        <h2 className="section-title mb-0">Failure Point Map</h2>
      </div>

      {/* Segmented bar */}
      <div className="w-full h-4 rounded-full overflow-hidden bg-gray-200 flex shadow-inner">
        {map.segments.map((seg) => {
          const widthPct = (seg.weight / total) * 100;
          const isLikely = seg.id === map.mostLikely;
          return (
            <motion.div
              key={seg.id}
              className="h-full"
              style={{ width: `${widthPct}%`, backgroundColor: segmentColor[seg.id] }}
              animate={isLikely ? { opacity: [0.75, 1, 0.75] } : { opacity: 0.9 }}
              transition={isLikely ? { duration: 1.2, repeat: Infinity } : { duration: 0.2 }}
              title={seg.label}
            />
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {map.segments.map((seg) => {
          const isLikely = seg.id === map.mostLikely;
          return (
            <div
              key={seg.id}
              className={`p-3 rounded-lg border ${isLikely ? 'border-accent bg-accent bg-opacity-10' : 'border-gray-200 bg-gray-50'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: segmentColor[seg.id] }} />
                  <span className="text-xs font-medium text-text-primary truncate">{seg.label}</span>
                </div>
                {isLikely && <span className="text-[11px] font-semibold text-accent">Most likely</span>}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FailurePointMap;

