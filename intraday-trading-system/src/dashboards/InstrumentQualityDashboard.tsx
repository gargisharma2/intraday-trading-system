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
        <div className="flex-1 overflow-y-auto">
          {/* Single Column - Instrument Quality Evaluation (expanded) */}
          <motion.div
            className="card h-full max-h-[75vh] overflow-hidden flex flex-col"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title mb-4">Instrument Quality Evaluation</h2>

            {/* Quality Evaluations Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {qualityEvaluations.map((evaluation, index) => {
                const Icon = evaluation.icon;
                return (
                  <motion.div
                    key={evaluation.title}
                    className="flex items-center p-3 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-20 hover:bg-opacity-10 transition-all duration-200"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-accent bg-opacity-10 rounded-full mr-3">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{evaluation.title}</span>
                  </motion.div>
                );
              })}
            </div>

            <p className="text-text-secondary text-sm leading-relaxed">
              Evaluates instrument quality to allow only high-execution-grade assets.
            </p>

            {/* Gate output (Pass/Restricted/Fail) */}
            <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div className="text-sm font-semibold text-text-primary">Approved instrument flow</div>
                <div className="text-[11px] text-text-secondary">
                  Only <span className="font-semibold text-text-primary">Pass</span> instruments flow forward.
                </div>
              </div>

              <div className="space-y-3">
                {instruments.map((ins) => (
                  <div key={ins.symbol} className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-text-primary">
                          {ins.symbol}{' '}
                          <span className="text-[11px] font-medium text-text-secondary">({ins.venue})</span>
                        </div>
                        <div className="text-[11px] text-text-secondary mt-1 leading-snug">
                          {ins.note}
                        </div>
                      </div>
                      <StatusBadge label={gateStateLabel(ins.gate)} colorClass={gateStateColorClass(ins.gate)} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                      <div className="sm:col-span-1">
                        <ThresholdGauge value={ins.qualityScore} label="Quality score" />
                      </div>
                      <MetricCard label="Liquidity" value={ins.liquidity} helper="Spread/turnover/depth" />
                      <MetricCard label="Execution risk" value={ins.executionRisk} helper="Slippage & fill risk" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentQualityDashboard;