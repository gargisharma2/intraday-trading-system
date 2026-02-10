import { motion } from 'framer-motion';
import { Activity, Droplets, Target } from 'lucide-react';
import type { StressScenario } from '../../dashboards/SyntheticRiskDashboard';

interface RiskIntensityIndicatorsProps {
  selectedScenario: StressScenario;
}

// Mock intensity data based on scenario
const getIntensityData = (scenario: StressScenario) => {
  const baseData = {
    volatility: { value: 25, label: 'Volatility' },
    liquidity: { value: 15, label: 'Liquidity Risk' },
    slippage: { value: 10, label: 'Slippage Risk' }
  };

  switch (scenario) {
    case 'volatility-spike':
      return {
        volatility: { value: 95, label: 'Volatility' },
        liquidity: { value: 45, label: 'Liquidity Risk' },
        slippage: { value: 35, label: 'Slippage Risk' }
      };
    case 'liquidity-disappearance':
      return {
        volatility: { value: 40, label: 'Volatility' },
        liquidity: { value: 92, label: 'Liquidity Risk' },
        slippage: { value: 78, label: 'Slippage Risk' }
      };
    case 'slippage-explosion':
      return {
        volatility: { value: 60, label: 'Volatility' },
        liquidity: { value: 55, label: 'Liquidity Risk' },
        slippage: { value: 88, label: 'Slippage Risk' }
      };
    case 'circuit-move':
      return {
        volatility: { value: 85, label: 'Volatility' },
        liquidity: { value: 25, label: 'Liquidity Risk' },
        slippage: { value: 65, label: 'Slippage Risk' }
      };
    case 'fast-reversal':
      return {
        volatility: { value: 75, label: 'Volatility' },
        liquidity: { value: 35, label: 'Liquidity Risk' },
        slippage: { value: 50, label: 'Slippage Risk' }
      };
    default:
      return baseData;
  }
};

const getRiskColor = (value: number) => {
  if (value >= 80) return 'from-red-500 to-red-700';
  if (value >= 60) return 'from-orange-500 to-red-600';
  if (value >= 40) return 'from-yellow-400 to-orange-500';
  if (value >= 20) return 'from-green-500 to-yellow-400';
  return 'from-green-500 to-green-600';
};

const getStatusText = (value: number) => {
  if (value >= 80) return 'CRITICAL';
  if (value >= 60) return 'HIGH';
  if (value >= 40) return 'MEDIUM';
  if (value >= 20) return 'LOW';
  return 'NORMAL';
};

const RiskIntensityIndicators = ({ selectedScenario }: RiskIntensityIndicatorsProps) => {
  const intensityData = getIntensityData(selectedScenario);
  const indicators = [
    { key: 'volatility', icon: Activity, data: intensityData.volatility },
    { key: 'liquidity', icon: Droplets, data: intensityData.liquidity },
    { key: 'slippage', icon: Target, data: intensityData.slippage }
  ];

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="section-title mb-6">Risk Intensity Indicators</h3>

      <div className="space-y-6">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          const { value, label } = indicator.data;
          const colorClass = getRiskColor(value);
          const statusText = getStatusText(value);

          return (
            <motion.div
              key={indicator.key}
              className="space-y-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{label}</h4>
                    <p className={`text-xs font-bold ${
                      value >= 80 ? 'text-red-600' :
                      value >= 60 ? 'text-orange-600' :
                      value >= 40 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {statusText}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-text-primary">{value}</div>
                  <div className="text-xs text-text-secondary">/100</div>
                </div>
              </div>

              {/* Gauge Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${colorClass} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>

                {/* Risk level markers */}
                <div className="flex justify-between mt-1 text-xs text-text-secondary">
                  <span>Low</span>
                  <span>Med</span>
                  <span>High</span>
                  <span>Crit</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-text-secondary text-center">
          Intensity levels update in real-time during stress scenarios
        </p>
      </div>
    </motion.div>
  );
};

export default RiskIntensityIndicators;