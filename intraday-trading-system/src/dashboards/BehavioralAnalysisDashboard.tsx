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
        <div className="flex-1 overflow-auto mt-10 p-4">
          <div className="mb-8">
            <button className='btn-primary p-5 font-bold text-lg'>Initiate the Process</button>
          </div>
            
          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type of Dataset</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">PDF</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">Market Data Analysis</td>
                  <td className="px-6 py-4 text-sm text-gray-600">10:30 AM</td>
                  <td className="px-6 py-4 text-sm text-blue-600 underline cursor-pointer">market_report.pdf</td>
                  <td className="px-6 py-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Initiate
                    </button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-800">Risk Assessment Profile</td>
                  <td className="px-6 py-4 text-sm text-gray-600">2:15 PM</td>
                  <td className="px-6 py-4 text-sm text-blue-600 underline cursor-pointer">risk_profile.pdf</td>
                  <td className="px-6 py-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                      Initiate
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralAnalysisDashboard;