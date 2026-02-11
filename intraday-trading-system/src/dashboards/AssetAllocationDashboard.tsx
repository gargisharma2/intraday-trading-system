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

        {/* Main Content */}
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

export default AssetAllocationDashboard;