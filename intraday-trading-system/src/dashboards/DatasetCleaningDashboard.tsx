import { motion } from 'framer-motion';
import { Database, BarChart3, CheckCircle } from 'lucide-react';

const DatasetCleaningDashboard = () => {
  const cleaningMetrics = [
    { label: 'Records Cleaned', value: '1.2M', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Duplicates Removed', value: '45.2K', icon: Database, color: 'text-blue-600' },
    { label: 'Quality Score', value: '97.8%', icon: BarChart3, color: 'text-purple-600' },
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
          <Database className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Dataset Cleaning Dashboard</h1>
          <p className="text-text-secondary mt-2">
            Clean datasets by removing noise, duplicates, invalid records, and normalizing structures
          </p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cleaningMetrics.map((metric, index) => {
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

      {/* Cleaning Overview */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xl font-semibold text-text-primary mb-4">Data Quality Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <span className="text-text-primary font-medium">Data Integrity</span>
            <span className="text-green-600 font-bold">Excellent</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <span className="text-text-primary font-medium">Normalization</span>
            <span className="text-blue-600 font-bold">Complete</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DatasetCleaningDashboard;