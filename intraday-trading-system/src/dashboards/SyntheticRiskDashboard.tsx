import { useState } from 'react';
import { motion } from 'framer-motion';
import StressScenarioSelector from '../components/engine6/StressScenarioSelector';
import ShockTimelineChart from '../components/engine6/ShockTimelineChart';
import RiskIntensityIndicators from '../components/engine6/RiskIntensityIndicators';
import FailurePointsMap from '../components/engine6/FailurePointsMap';

export type StressScenario = 'volatility-spike' | 'liquidity-disappearance' | 'slippage-explosion' | 'circuit-move' | 'fast-reversal';

const SyntheticRiskDashboard = () => {
  const [selectedScenario, setSelectedScenario] = useState<StressScenario>('volatility-spike');

  return (
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        {/* Page Header */}
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Synthetic Intraday Risk & Stress World Engine</h1>
          <p className="page-subtitle">Rulebook-driven synthetic stress worlds for intraday risk intelligence.</p>
        </motion.div>

        {/* Main Content (scroll ONLY here) */}
        <div className="overflow-y-auto h-full overflow-x-hidden">
          <div className="flex flex-col gap-6 pb-6">
            <StressScenarioSelector
              selectedScenario={selectedScenario}
              onScenarioChange={setSelectedScenario}
            />

            <RiskIntensityIndicators selectedScenario={selectedScenario} />

            <ShockTimelineChart selectedScenario={selectedScenario} />

            <FailurePointsMap selectedScenario={selectedScenario} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyntheticRiskDashboard;