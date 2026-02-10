import { motion } from 'framer-motion';
import {
  TrendingUp,
  Shield,
  DollarSign,
  Brain,
  CheckCircle,
  BarChart3,
  Activity,
  Package,
  Bitcoin,
  Layers
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import AlertTag from '../components/common/AlertTag';
import { allowStateColorClass, allowStateLabel, type AllowState } from '../utils/intradayEngineUi';

const UserSuitabilityDashboard = () => {
  // Minimal engine output (replace with real data source when available)
  const suitabilityProfile = {
    tradingExperience: { value: 'Intermediate', helper: 'Based on prior intraday history & knowledge checks.' },
    riskTolerance: { value: 'Moderate', helper: 'Limits leverage and high-variance products.' },
    capitalSize: { value: '$10k–$25k', helper: 'Determines position sizing and product eligibility.' },
    psychologicalLossTolerance: { value: 'Low–Moderate', helper: 'Drawdown guardrails trigger restrictions.' },
    regulatoryBrokerConstraints: { value: 'Active', helper: 'Broker/regulatory rules are hard boundaries.' }
  };

  const hardSafetyBoundaries: Array<{ label: string; description: string }> = [
    { label: 'Regulatory & broker constraints', description: 'Non-overridable eligibility blocks based on account/broker rules.' },
    { label: 'Capital protection limits', description: 'Hard loss and exposure ceilings prevent mis-selling and blowups.' },
    { label: 'Product complexity controls', description: 'Complex derivatives remain blocked until suitability is proven.' }
  ];

  const suitabilityElements = [
    {
      title: 'Experience Assessment',
      icon: TrendingUp
    },
    {
      title: 'Risk Evaluation',
      icon: Shield
    },
    {
      title: 'Capital Profiling',
      icon: DollarSign
    },
    {
      title: 'Psychological Check',
      icon: Brain
    },
    {
      title: 'Regulatory Compliance',
      icon: CheckCircle
    }
  ];

  const tradeTypes: Array<{
    key: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    state: AllowState;
    reason: string;
  }> = [
    {
      key: 'stock',
      title: 'Stock',
      icon: BarChart3,
      state: 'allowed',
      reason: 'Liquid, transparent; fits moderate risk tolerance and capital size.'
    },
    {
      key: 'index',
      title: 'Index',
      icon: Activity,
      state: 'allowed',
      reason: 'Broad exposure with generally strong liquidity and tighter spreads.'
    },
    {
      key: 'futures',
      title: 'Futures',
      icon: TrendingUp,
      state: 'restricted',
      reason: 'Allowed only with strict sizing, stop discipline, and intraday volatility limits.'
    },
    {
      key: 'commodity',
      title: 'Commodity',
      icon: Package,
      state: 'restricted',
      reason: 'Execution risk can spike; access reduced unless liquidity conditions pass.'
    },
    {
      key: 'crypto',
      title: 'Crypto',
      icon: Bitcoin,
      state: 'not_allowed',
      reason: 'Blocked due to volatility/overnight gap risk and current broker constraints.'
    },
    {
      key: 'derivatives',
      title: 'Derivatives',
      icon: Layers,
      state: 'not_allowed',
      reason: 'Complexity and asymmetric risk exceed psychological loss tolerance threshold.'
    }
  ];

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Dashboard Title */}
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">User Suitability & Intraday Trade Matching Engine</h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start content-start place-items-start overflow-hidden">
          {/* Left Column - User Suitability Engine */}
          <motion.div
            className="card h-auto max-h-[75vh] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title mb-4">User Suitability Engine</h2>
            <p className="text-text-secondary mb-6 text-sm leading-relaxed">
              Analyzes user profile and enforces safety-first eligibility for intraday trade types. Hard safety
              boundaries are non-overridable to prevent mis-selling.
            </p>

            {/* Suitability Profile Panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <MetricCard
                label="Trading experience"
                value={suitabilityProfile.tradingExperience.value}
                helper={suitabilityProfile.tradingExperience.helper}
              />
              <MetricCard
                label="Risk tolerance"
                value={suitabilityProfile.riskTolerance.value}
                helper={suitabilityProfile.riskTolerance.helper}
              />
              <MetricCard
                label="Capital size"
                value={suitabilityProfile.capitalSize.value}
                helper={suitabilityProfile.capitalSize.helper}
              />
              <MetricCard
                label="Psychological loss tolerance"
                value={suitabilityProfile.psychologicalLossTolerance.value}
                helper={suitabilityProfile.psychologicalLossTolerance.helper}
              />
              <div className="sm:col-span-2">
                <MetricCard
                  label="Regulatory & broker constraints"
                  value={suitabilityProfile.regulatoryBrokerConstraints.value}
                  helper={suitabilityProfile.regulatoryBrokerConstraints.helper}
                  stateColorClass="text-text-primary"
                />
              </div>
            </div>

            {/* Suitability Elements Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {suitabilityElements.map((element, index) => {
                const Icon = element.icon;
                return (
                  <motion.div
                    key={element.title}
                    className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-accent bg-opacity-10 rounded-full mr-3">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{element.title}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Hard safety boundaries */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-sm font-semibold text-text-primary">Hard safety boundaries</div>
                <AlertTag label="Non-overridable" colorClass="bg-red-600 text-white" />
              </div>
              <div className="space-y-2">
                {hardSafetyBoundaries.map((b) => (
                  <div key={b.label} className="text-xs text-text-secondary leading-relaxed">
                    <span className="font-semibold text-text-primary">{b.label}:</span> {b.description}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Allowed Intraday Trade Types */}
          <motion.div
            className="card h-auto max-h-[75vh] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title mb-4">Allowed Intraday Trade Types</h2>

            {/* Trade Types Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tradeTypes.map((trade, index) => {
                const Icon = trade.icon;
                return (
                  <motion.div
                    key={trade.key}
                    className="p-3 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-20 hover:bg-opacity-10 transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center min-w-0">
                        <div className="p-1.5 bg-accent bg-opacity-10 rounded-full mr-3">
                          <Icon className="w-3.5 h-3.5 text-accent" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-text-primary truncate">{trade.title}</div>
                          <div className="text-[11px] text-text-secondary mt-1 leading-snug line-clamp-2">
                            {trade.reason}
                          </div>
                        </div>
                      </div>
                      <StatusBadge
                        label={allowStateLabel(trade.state)}
                        colorClass={allowStateColorClass(trade.state)}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-4 text-xs text-text-secondary leading-relaxed">
              Eligibility states are enforced by hard boundaries and cannot be manually overridden.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserSuitabilityDashboard;