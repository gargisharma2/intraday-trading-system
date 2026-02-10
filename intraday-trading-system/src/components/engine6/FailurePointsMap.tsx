import { motion } from 'framer-motion';
import { AlertTriangle, XCircle, DollarSign, TrendingDown } from 'lucide-react';
import type { StressScenario } from '../../dashboards/SyntheticRiskDashboard';

interface FailurePointsMapProps {
  selectedScenario: StressScenario;
}

const getFailurePoints = (scenario: StressScenario) => {
  const basePoints = [
    {
      id: 'entry',
      label: 'Entry Failure',
      description: 'Unable to enter positions at intended levels',
      icon: XCircle,
      severity: 'medium' as const
    },
    {
      id: 'liquidity',
      label: 'Liquidity Failure',
      description: 'No buyers/sellers at current price levels',
      icon: AlertTriangle,
      severity: 'high' as const
    },
    {
      id: 'slippage',
      label: 'Slippage Breakdown',
      description: 'Orders execute far from target prices',
      icon: DollarSign,
      severity: 'high' as const
    },
    {
      id: 'price-shock',
      label: 'Price Shock Invalidation',
      description: 'Rapid price moves invalidate all orders',
      icon: TrendingDown,
      severity: 'critical' as const
    }
  ];

  // Adjust severity based on scenario
  return basePoints.map(point => {
    let severity = point.severity;

    switch (scenario) {
      case 'volatility-spike':
        if (point.id === 'price-shock') severity = 'critical';
        break;
      case 'liquidity-disappearance':
        if (point.id === 'liquidity') severity = 'critical';
        if (point.id === 'slippage') severity = 'critical';
        break;
      case 'slippage-explosion':
        if (point.id === 'slippage') severity = 'critical';
        break;
      case 'circuit-move':
        if (point.id === 'price-shock') severity = 'critical';
        if (point.id === 'entry') severity = 'high';
        break;
      case 'fast-reversal':
        if (point.id === 'entry') severity = 'critical';
        if (point.id === 'price-shock') severity = 'high';
        break;
    }

    return { ...point, severity };
  });
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical': return 'bg-red-50 border-red-200';
    case 'high': return 'bg-orange-50 border-orange-200';
    case 'medium': return 'bg-yellow-50 border-yellow-200';
    default: return 'bg-gray-50 border-gray-200';
  }
};

const getSeverityText = (severity: string) => {
  switch (severity) {
    case 'critical': return 'CRITICAL';
    case 'high': return 'HIGH';
    case 'medium': return 'MEDIUM';
    default: return 'LOW';
  }
};

const FailurePointsMap = ({ selectedScenario }: FailurePointsMapProps) => {
  const failurePoints = getFailurePoints(selectedScenario);

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex flex-col"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="section-title mb-2">Failure Points Map</h3>
      <p className="text-sm text-text-secondary mb-6">
        Critical breakdown points under current stress scenario
      </p>

      <div className="space-y-4">
        {failurePoints.map((point, index) => {
          const Icon = point.icon;
          const severityColor = getSeverityColor(point.severity);
          const severityText = getSeverityText(point.severity);

          return (
            <motion.div
              key={point.id}
              className={`p-4 rounded-lg border ${severityColor} bg-white`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start space-x-3">
                <motion.div
                  className="p-2 rounded-lg bg-accent bg-opacity-10"
                  animate={point.severity === 'critical' ? {
                    boxShadow: [
                      '0 0 0 0 rgba(239, 68, 68, 0.4)',
                      '0 0 0 8px rgba(239, 68, 68, 0)',
                      '0 0 0 0 rgba(239, 68, 68, 0)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Icon className="w-5 h-5 text-accent" />
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-text-primary">{point.label}</h4>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      point.severity === 'critical' ? 'bg-red-600 text-white' :
                      point.severity === 'high' ? 'bg-orange-600 text-white' :
                      'bg-yellow-600 text-white'
                    }`}>
                      {severityText}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex justify-between text-xs text-text-secondary">
          <span>Entry Risk</span>
          <span>Liquidity Risk</span>
          <span>Execution Risk</span>
          <span>Price Risk</span>
        </div>
      </div>
    </motion.div>
  );
};

export default FailurePointsMap;