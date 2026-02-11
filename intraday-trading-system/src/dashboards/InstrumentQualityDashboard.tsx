import { motion } from 'framer-motion';
import {
  Waves,
  BarChart3,
  Layers,
  AlertTriangle,
  FileText,
  Shield,
  Lock,
  DollarSign
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';
import ThresholdGauge from '../components/common/ThresholdGauge';
import MetricCard from '../components/common/MetricCard';
import { gateStateColorClass, gateStateLabel, type GateState } from '../utils/intradayEngineUi';

const InstrumentQualityDashboard = () => {
  // Minimal engine output (replace with real instrument research + microstructure feed when available)
  const instruments: Array<{
    symbol: string;
    venue: string;
    qualityScore: number; // 0-100
    liquidity: 'High' | 'Medium' | 'Low';
    executionRisk: 'Low' | 'Medium' | 'High';
    gate: GateState;
    note: string;
  }> = [
    {
      symbol: 'SPY',
      venue: 'NYSE Arca',
      qualityScore: 88,
      liquidity: 'High',
      executionRisk: 'Low',
      gate: 'pass',
      note: 'Tight spreads and deep book; stable execution for intraday.'
    },
    {
      symbol: 'NQ (Front)',
      venue: 'CME',
      qualityScore: 72,
      liquidity: 'High',
      executionRisk: 'Medium',
      gate: 'restricted',
      note: 'Allowed with stricter slippage limits during headline windows.'
    },
    {
      symbol: 'Small-cap (Example)',
      venue: 'NASDAQ',
      qualityScore: 42,
      liquidity: 'Low',
      executionRisk: 'High',
      gate: 'fail',
      note: 'Wide spreads / thin depth; high slippage risk. Blocked.'
    }
  ];

  const qualityEvaluations = [
    {
      title: 'Liquidity',
      icon: Waves
    },
    {
      title: 'Spread',
      icon: BarChart3
    },
    {
      title: 'Order Book Depth',
      icon: Layers
    },
    {
      title: 'Slippage Risk',
      icon: AlertTriangle
    },
    {
      title: 'Contract Structure',
      icon: FileText
    }
  ];

  const engineValues = [
    {
      title: 'Prevents liquidity traps',
      icon: Shield
    },
    {
      title: 'Ensures safe entry and exit',
      icon: Lock
    },
    {
      title: 'Protects capital from execution losses',
      icon: DollarSign
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
          <h1 className="page-title">360° Intraday Instrument Research & Quality Engine</h1>
        </motion.div>

        {/* Main Content Area - scrollable */}
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

export default InstrumentQualityDashboard;