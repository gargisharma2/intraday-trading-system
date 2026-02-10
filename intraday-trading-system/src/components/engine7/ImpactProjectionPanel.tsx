import { motion } from 'framer-motion';
import { Activity, Droplets, MoveRight, NotebookText, Clock } from 'lucide-react';
import type { ImpactProjection, ShockStatus } from './types';

interface ImpactProjectionPanelProps {
  impact: ImpactProjection;
}

const pillClass: Record<ShockStatus, string> = {
  Low: 'bg-green-100 text-green-700 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  High: 'bg-orange-100 text-orange-700 border-orange-200',
  Extreme: 'bg-red-100 text-red-700 border-red-200'
};

const ImpactProjectionPanel = ({ impact }: ImpactProjectionPanelProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-title mb-0">Impact Projection Panel</h2>
        <div className="flex items-center gap-2 text-xs text-text-secondary">
          <Clock className="w-4 h-4" />
          <span>Last updated {impact.lastUpdated}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-text-primary">Expected volatility impact</span>
            </div>
            <span className={`text-[11px] px-2 py-1 rounded-md border ${pillClass[impact.expectedVolatilityImpact]}`}>
              {impact.expectedVolatilityImpact}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-text-primary">Liquidity impact</span>
            </div>
            <span className={`text-[11px] px-2 py-1 rounded-md border ${pillClass[impact.liquidityImpact]}`}>
              {impact.liquidityImpact}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MoveRight className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-text-primary">Spread widening</span>
            </div>
            <span className={`text-[11px] px-2 py-1 rounded-md border ${pillClass[impact.spreadWidening]}`}>
              {impact.spreadWidening}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <NotebookText className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-text-primary">Market instability notes</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">{impact.marketInstabilityNotes}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImpactProjectionPanel;

