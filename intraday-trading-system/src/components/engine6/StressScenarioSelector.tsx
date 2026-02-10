import { motion } from 'framer-motion';
import { Zap, Droplets, Target, TrendingUp, RotateCcw } from 'lucide-react';
import type { StressScenario } from '../../dashboards/SyntheticRiskDashboard';

interface StressScenarioSelectorProps {
  selectedScenario: StressScenario;
  onScenarioChange: (scenario: StressScenario) => void;
}

const scenarios = [
  {
    id: 'volatility-spike' as StressScenario,
    label: 'Sudden Volatility Spike',
    icon: Zap,
    color: 'bg-red-600',
    description: 'Extreme price swings in short timeframes'
  },
  {
    id: 'liquidity-disappearance' as StressScenario,
    label: 'Liquidity Disappearance',
    icon: Droplets,
    color: 'bg-orange-600',
    description: 'Bid/ask spreads widen dramatically'
  },
  {
    id: 'slippage-explosion' as StressScenario,
    label: 'Slippage Explosion',
    icon: Target,
    color: 'bg-yellow-600',
    description: 'Orders execute far from intended price'
  },
  {
    id: 'circuit-move' as StressScenario,
    label: 'Circuit-like Price Move',
    icon: TrendingUp,
    color: 'bg-purple-600',
    description: 'Rapid directional movement with gaps'
  },
  {
    id: 'fast-reversal' as StressScenario,
    label: 'Fast Trend Reversal',
    icon: RotateCcw,
    color: 'bg-pink-600',
    description: 'Sudden directional changes against trend'
  }
];

const StressScenarioSelector = ({ selectedScenario, onScenarioChange }: StressScenarioSelectorProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="section-title mb-4">Stress Scenario Selector</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {scenarios.map((scenario) => {
          const Icon = scenario.icon;
          const isSelected = selectedScenario === scenario.id;

          return (
            <motion.button
              key={scenario.id}
              onClick={() => onScenarioChange(scenario.id)}
              className={`relative p-4 rounded-lg border transition-all duration-200 text-left ${
                isSelected
                  ? 'border-accent bg-accent bg-opacity-10 shadow-sm'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-white'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute inset-0 bg-accent bg-opacity-5 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-accent bg-opacity-10 ${isSelected ? 'ring-1 ring-accent' : ''}`}>
                  <Icon className="w-5 h-5 text-accent" />
                </div>

                <div className="text-left">
                  <h4 className={`font-medium text-sm ${isSelected ? 'text-text-primary' : 'text-text-primary'}`}>
                    {scenario.label}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1">
                    {scenario.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-text-secondary">
          <span className="text-text-primary font-medium">Active:</span>{' '}
          {scenarios.find((s) => s.id === selectedScenario)?.label}
        </p>
      </div>
    </motion.div>
  );
};

export default StressScenarioSelector;