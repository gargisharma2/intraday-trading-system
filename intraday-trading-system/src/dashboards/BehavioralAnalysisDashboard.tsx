import { motion } from 'framer-motion';
import {
  Activity,
  Zap,
  TrendingUp,
  RotateCcw,
  GitBranch,
  Target,
  Filter,
  Eye
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import AlertTag from '../components/common/AlertTag';
import StatusBadge from '../components/common/StatusBadge';
import ThresholdGauge from '../components/common/ThresholdGauge';
import { allowStateColorClass, allowStateLabel, type AllowState } from '../utils/intradayEngineUi';

const BehavioralAnalysisDashboard = () => {
  // Minimal engine output (replace with real behavioral feature extraction when available)
  const behavioralFingerprint = {
    volatility: { score: 64, label: 'Volatility', note: 'Moderate intraday variance; spikes around events.' },
    speed: { score: 72, label: 'Speed of movement', note: 'Fast candles; avoid late entries.' },
    fakeBreakouts: { score: 58, label: 'Fake breakout risk', note: 'Elevated; require confirmation.' },
    reversals: { score: 66, label: 'Reversal frequency', note: 'Frequent mean reversion after spikes.' }
  };

  const instrumentNature: { label: string; state: 'trend' | 'mean_revert'; note: string } = {
    label: 'Trend vs mean reversion',
    state: 'mean_revert',
    note: 'Mean-reverting bias today; trend-following entries need stricter filters.'
  };

  const strategyFit: Array<{
    strategy: string;
    state: AllowState;
    reason: string;
  }> = [
    {
      strategy: 'Mean reversion (intraday)',
      state: 'allowed',
      reason: 'Matches reversal frequency and post-spike normalization behavior.'
    },
    {
      strategy: 'Trend following (breakouts)',
      state: 'restricted',
      reason: 'Fake-breakout risk elevated; only trade with confirmation + tighter invalidation.'
    },
    {
      strategy: 'High-frequency scalping',
      state: 'restricted',
      reason: 'Speed is high; execution quality must be Pass to avoid slippage drag.'
    }
  ];

  const instabilityWarnings: Array<string> = [
    'Behavior is sensitive to news windows; avoid holding through scheduled releases.',
    'Breakout signals are less reliable; prioritize confirmation and defined exits.'
  ];

  const behavioralFingerprints = [
    {
      title: 'Volatility Profile',
      icon: Activity
    },
    {
      title: 'Price Speed',
      icon: Zap
    },
    {
      title: 'Breakout Behavior',
      icon: TrendingUp
    },
    {
      title: 'Reversal Patterns',
      icon: RotateCcw
    },
    {
      title: 'Trend vs Mean Reversion',
      icon: GitBranch
    }
  ];

  const engineValues = [
    {
      title: 'Matches strategy to instrument behavior',
      icon: Target
    },
    {
      title: 'Avoids one-size-fits-all logic',
      icon: Filter
    },
    {
      title: 'Detects hidden intraday instability',
      icon: Eye
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
          <h1 className="page-title">Intraday Mathematical DNA & Behavioral Analysis Engine</h1>
        </motion.div>

        {/* Main Content Grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start content-start place-items-start overflow-hidden">
          {/* Left Column - Behavioral Fingerprinting */}
          <motion.div
            className="card h-auto max-h-[75vh] overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title mb-4">Behavioral Fingerprinting</h2>

            {/* Fingerprint panel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <ThresholdGauge value={behavioralFingerprint.volatility.score} label={behavioralFingerprint.volatility.label} />
                <div className="text-[11px] text-text-secondary mt-2 leading-relaxed">{behavioralFingerprint.volatility.note}</div>
              </div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <ThresholdGauge value={behavioralFingerprint.speed.score} label={behavioralFingerprint.speed.label} />
                <div className="text-[11px] text-text-secondary mt-2 leading-relaxed">{behavioralFingerprint.speed.note}</div>
              </div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <ThresholdGauge value={behavioralFingerprint.fakeBreakouts.score} label={behavioralFingerprint.fakeBreakouts.label} />
                <div className="text-[11px] text-text-secondary mt-2 leading-relaxed">{behavioralFingerprint.fakeBreakouts.note}</div>
              </div>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <ThresholdGauge value={behavioralFingerprint.reversals.score} label={behavioralFingerprint.reversals.label} />
                <div className="text-[11px] text-text-secondary mt-2 leading-relaxed">{behavioralFingerprint.reversals.note}</div>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-text-primary">{instrumentNature.label}</div>
                  <div className="text-[11px] text-text-secondary mt-1 leading-relaxed">{instrumentNature.note}</div>
                </div>
                <StatusBadge
                  label={instrumentNature.state === 'mean_revert' ? 'Mean-reverting' : 'Trend-following'}
                  colorClass={instrumentNature.state === 'mean_revert' ? 'bg-slate-700' : 'bg-indigo-600'}
                />
              </div>
            </div>

            {/* Behavioral Fingerprints Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {behavioralFingerprints.map((fingerprint, index) => {
                const Icon = fingerprint.icon;
                return (
                  <motion.div
                    key={fingerprint.title}
                    className="flex items-center p-3 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-20 hover:bg-opacity-10 transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-accent bg-opacity-10 rounded-full mr-3">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{fingerprint.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Builds a mathematical intraday behavioral fingerprint for each instrument.
            </p>

            {/* Strategy–instrument fit */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-sm font-semibold text-text-primary">Strategy–instrument fit</div>
                <AlertTag label="Safety-first" colorClass="bg-slate-700 text-white" />
              </div>

              <div className="space-y-2">
                {strategyFit.map((row) => (
                  <div key={row.strategy} className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-text-primary">{row.strategy}</div>
                        <div className="text-[11px] text-text-secondary mt-1 leading-relaxed">{row.reason}</div>
                      </div>
                      <StatusBadge label={allowStateLabel(row.state)} colorClass={allowStateColorClass(row.state)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Value of This Engine */}
          <motion.div
            className="card h-auto max-h-[75vh] overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title mb-4">Value of This Engine</h2>

            {/* Instability warnings */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-sm font-semibold text-text-primary">Behavioral warnings</div>
                <AlertTag label="Caution" colorClass="bg-amber-500 text-white" />
              </div>
              <div className="space-y-2">
                {instabilityWarnings.map((w) => (
                  <div key={w} className="text-xs text-text-secondary leading-relaxed">
                    - <span className="text-text-primary font-medium">{w}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <MetricCard
                label="Fit: allowed strategies"
                value={`${strategyFit.filter((s) => s.state === 'allowed').length}`}
                helper="Usable without additional constraints"
                stateColorClass="text-green-700"
              />
              <MetricCard
                label="Fit: restricted strategies"
                value={`${strategyFit.filter((s) => s.state === 'restricted').length}`}
                helper="Requires confirmation/risk tightening"
                stateColorClass="text-amber-600"
              />
            </div>

            {/* Engine Values List */}
            <div className="space-y-4">
              {engineValues.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    className="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="p-1.5 bg-accent bg-opacity-10 rounded-full mr-3 mt-0.5">
                      <Icon className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-text-primary leading-relaxed">{value.title}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralAnalysisDashboard;