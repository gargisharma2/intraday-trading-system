import { motion } from 'framer-motion';
import { TrendingUp, Shield, Zap, ArrowRight } from 'lucide-react';

const HomeDashboard = () => {
  const features = [
    {
      title: 'AI-Powered Trading',
      description: 'Advanced algorithms analyze market patterns and execute trades with precision.',
      icon: TrendingUp
    },
    {
      title: 'Risk Management',
      description: 'Comprehensive risk controls and position management for optimal portfolio protection.',
      icon: Shield
    },
    {
      title: 'Real-time Execution',
      description: 'Lightning-fast order execution with direct market access and low latency.',
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <motion.div
        className="flex-1 flex items-center justify-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-6xl font-bold text-text-primary mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Intraday AI
            <span className="text-accent"> Trading</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            className="text-xl md:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Advanced algorithmic trading platform powered by artificial intelligence.
            Professional-grade tools for serious traders seeking alpha in today's markets.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="inline-flex items-center px-8 py-4 bg-accent hover:bg-opacity-90 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Access Trading Dashboard
            <ArrowRight size={20} className="ml-3" />
          </motion.button>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="py-16 px-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="card text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-accent bg-opacity-10 rounded-full">
                      <Icon className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomeDashboard;