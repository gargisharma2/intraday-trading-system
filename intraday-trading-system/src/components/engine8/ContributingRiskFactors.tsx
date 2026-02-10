import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Layers } from 'lucide-react';
import type { ContributingFactorRow } from './types';

interface ContributingRiskFactorsProps {
  rows: ContributingFactorRow[];
}

const scoreColor = (score: number) => {
  if (score < 25) return 'text-green-600';
  if (score < 50) return 'text-yellow-600';
  if (score < 75) return 'text-orange-600';
  return 'text-red-600';
};

const ContributingRiskFactors = ({ rows }: ContributingRiskFactorsProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <Layers className="w-5 h-5 text-accent" />
        </div>
        <h2 className="section-title mb-0">Contributing Risk Factors (from Engines 3–7)</h2>
      </div>

      <div className="divide-y divide-gray-200">
        {rows.map((r) => {
          const Arrow = r.direction === 'up' ? ArrowUpRight : ArrowDownRight;
          const arrowColor = r.direction === 'up' ? 'text-red-600' : 'text-green-600';
          return (
            <div key={r.id} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-text-primary">{r.label}</div>
                  <div className="text-xs text-text-secondary leading-relaxed mt-1">{r.explanation}</div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Arrow className={`w-4 h-4 ${arrowColor}`} />
                  <span className={`text-sm font-bold ${scoreColor(r.score)}`}>{r.score}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ContributingRiskFactors;

