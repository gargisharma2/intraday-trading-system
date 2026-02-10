import { motion } from 'framer-motion';
import {
  TrendingUp,
  Minus,
  Zap,
  Newspaper,
  AlertTriangle,
  BarChart3,
  Activity,
  Package,
  Bitcoin,
  Layers,
  XCircle,
  RefreshCw,
  Target,
  Crown
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import MetricCard from '../components/common/MetricCard';
import { allowStateColorClass, allowStateLabel, type AllowState } from '../utils/intradayEngineUi';

const AssetAllocationDashboard = () => {
  // Minimal engine output (replace with real regime/allocation computation when available)
  const todaysRegime: {
    key: 'trend' | 'range' | 'high_vol' | 'news' | 'liquidity_stressed';
    title: string;
    description: string;
  } = {
    key: 'news',
    title: 'News-driven day',
    description: 'Event risk increases reversal frequency and spread instability. Exposure is reduced for fragile products.'
  };

  const marketRegimes = [
    {
      key: 'trend',
      title: 'Trend day',
      icon: TrendingUp
    },
    {
      key: 'range',
      title: 'Range-bound day',
      icon: Minus
    },
    {
      key: 'high_vol',
      title: 'High-volatility day',
      icon: Zap
    },
    {
      key: 'news',
      title: 'News-driven day',
      icon: Newspaper
    },
    {
      key: 'liquidity_stressed',
      title: 'Liquidity-stressed day',
      icon: AlertTriangle
    }
  ];

  const assetAllocations: Array<{
    key: string;
    title: string;
    icon: React.ComponentType<{ className?: string }>;
    focusPct: number; // 0-100
    state: AllowState;
    rationale: string;
  }> = [
    {
      key: 'stock',
      title: 'Stock',
      icon: BarChart3,
      focusPct: 35,
      state: 'allowed',
      rationale: 'Preferred: broad liquidity with controllable execution risk.'
    },
    {
      key: 'index',
      title: 'Index',
      icon: Activity,
      focusPct: 30,
      state: 'allowed',
      rationale: 'Stable microstructure relative to single names during news windows.'
    },
    {
      key: 'futures',
      title: 'Futures',
      icon: TrendingUp,
      focusPct: 20,
      state: 'restricted',
      rationale: 'Reduced sizing due to gap/slippage risk around headlines.'
    },
    {
      key: 'commodity',
      title: 'Commodity',
      icon: Package,
      focusPct: 10,
      state: 'restricted',
      rationale: 'Only if liquidity filters pass; otherwise avoid event-driven spikes.'
    },
    {
      key: 'crypto',
      title: 'Crypto',
      icon: Bitcoin,
      focusPct: 0,
      state: 'not_allowed',
      rationale: 'Blocked for this regime and suitability constraints (high variance / execution instability).'
    },
    {
      key: 'derivatives',
      title: 'Derivatives',
      icon: Layers,
      focusPct: 0,
      state: 'not_allowed',
      rationale: 'Hard blocked: complexity and tail risk not appropriate on news-driven sessions.'
    }
  ];

  const engineValues = [
    {
      title: 'Prevents using the wrong trade type on the wrong day',
      icon: XCircle
    },
    {
      title: 'Adapts intraday exposure dynamically',
      icon: RefreshCw
    },
    {
      title: 'Aligns intraday activity with market conditions',
      icon: Target
    },
    {
      title: 'Determines which intraday trades dominate today',
      icon: Crown
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
          <h1 className="page-title">Intraday Asset-Type Allocation & Market Regime Engine</h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch content-start place-items-stretch overflow-hidden">
          {/* Left Column - Market Regime Detection */}
          <motion.div
            className="card h-full max-h-[75vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title mb-4">Market Regime Detection</h2>

            <div className="flex items-start justify-between gap-3 mb-4 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="min-w-0">
                <div className="text-xs font-semibold text-text-secondary mb-1">Today’s regime</div>
                <div className="text-sm font-semibold text-text-primary truncate">{todaysRegime.title}</div>
                <div className="text-[11px] text-text-secondary mt-1 leading-relaxed">
                  {todaysRegime.description}
                </div>
              </div>
              <StatusBadge label="Active" colorClass="bg-slate-700" />
            </div>

            {/* Market Regimes Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {marketRegimes.map((regime, index) => {
                const Icon = regime.icon;
                const isActive = regime.key === todaysRegime.key;
                return (
                  <motion.div
                    key={regime.title}
                    className={`flex items-center p-3 rounded-lg border transition-all duration-200 ${
                      isActive
                        ? 'bg-accent bg-opacity-10 border-accent border-opacity-40'
                        : 'bg-accent bg-opacity-5 border-accent border-opacity-20 hover:bg-opacity-10'
                    }`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-accent bg-opacity-10 rounded-full mr-3">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{regime.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Identifies today’s intraday market regime and allocates focus to trade types that remain safe and executable.
            </p>
          </motion.div>

        {/* Right Column - Asset Allocation */}
        <div className="h-full overflow-hidden">
            {/* Asset-Type Allocation Focus */}
            <motion.div
              className="card h-full max-h-[75vh] overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="section-title mb-4">Asset-Type Allocation Focus</h2>

              {/* Asset Allocations Grid */}
              <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto pr-1">
                {assetAllocations.map((allocation, index) => {
                  const Icon = allocation.icon;
                  const isDominant = allocation.focusPct >= 30 && allocation.state !== 'not_allowed';
                  return (
                    <motion.div
                      key={allocation.title}
                      className={`p-3 rounded-lg border transition-all duration-200 ${
                        isDominant
                          ? 'bg-accent bg-opacity-10 border-accent border-opacity-40'
                          : 'bg-accent bg-opacity-5 border-accent border-opacity-20 hover:bg-opacity-10'
                      }`}
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
                            <div className="text-xs font-semibold text-text-primary truncate">
                              {allocation.title}
                            </div>
                            <div className="text-[11px] text-text-secondary mt-1 leading-snug line-clamp-2">
                              {allocation.rationale}
                            </div>
                          </div>
                        </div>
                        <StatusBadge
                          label={allowStateLabel(allocation.state)}
                          colorClass={allowStateColorClass(allocation.state)}
                        />
                      </div>

                      <div className="mt-3">
                        <MetricCard
                          label="Today’s focus"
                          value={`${allocation.focusPct}%`}
                          helper={allocation.state === 'not_allowed' ? 'Blocked for today’s regime/suitability.' : isDominant ? 'Dominant allocation today.' : 'Reduced allocation.'}
                          stateColorClass={allocation.state === 'not_allowed' ? 'text-red-600' : isDominant ? 'text-accent' : 'text-text-primary'}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetAllocationDashboard;