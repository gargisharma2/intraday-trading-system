import { motion } from 'framer-motion';
import { CheckCircle, BarChart3, TrendingUp, Target } from 'lucide-react';

const EvaluationDashboard = () => {
  const evaluationMetrics = [
    { label: 'Backtest Accuracy', value: '87.3%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Sharpe Ratio', value: '2.45', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Max Drawdown', value: '12.4%', icon: Target, color: 'text-red-600' },
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
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Evaluation Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Evaluate model performance with backtesting, metrics, and validation reports
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {evaluationMetrics.map((metric, index) => {
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

      {/* Performance Overview */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-text-primary mb-4">Performance Analysis</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-text-secondary">Backtesting results and performance metrics</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EvaluationDashboard;