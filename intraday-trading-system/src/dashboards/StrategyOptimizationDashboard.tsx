import { motion } from 'framer-motion';
import { Zap, BarChart3, TrendingUp, Target } from 'lucide-react';

const StrategyOptimizationDashboard = () => {
  const metrics = [
    { label: 'Optimization Runs', value: '1,247', icon: Zap, color: 'text-blue-600' },
    { label: 'Best Performance', value: '94.2%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Parameters Tuned', value: '18', icon: Target, color: 'text-purple-600' },
  ];

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-primary bg-opacity-10 rounded-xl">
          <Zap className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Strategy Optimization Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Optimize and validate intraday strategy formulas with back-testing and stress testing
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.label}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-text-primary">{metric.label}</h3>
                <Icon className={`w-5 h-5 ${metric.color}`} />
              </div>
              <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Optimization Overview */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-text-primary mb-4">Genetic Algorithm Optimization</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-text-secondary">Real-time optimization progress and results</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StrategyOptimizationDashboard;