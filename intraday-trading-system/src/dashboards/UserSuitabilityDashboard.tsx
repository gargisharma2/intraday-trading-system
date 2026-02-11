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

export default UserSuitabilityDashboard;