import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import type { HealthAlertState, HealthAlert } from './types';

interface RealTimeSystemHealthAlertProps {
  alert: HealthAlert;
}

const stateStyle: Record<HealthAlertState, { badge: string; border: string; bg: string; text: string }> = {
  Stable: { badge: 'bg-green-500', border: 'border-green-200', bg: 'bg-green-50', text: 'text-green-700' },
  Watch: { badge: 'bg-yellow-500', border: 'border-yellow-200', bg: 'bg-yellow-50', text: 'text-yellow-700' },
  Fragile: { badge: 'bg-orange-500', border: 'border-orange-200', bg: 'bg-orange-50', text: 'text-orange-700' },
  Critical: { badge: 'bg-red-500', border: 'border-red-200', bg: 'bg-red-50', text: 'text-red-700' }
};

const RealTimeSystemHealthAlert = ({ alert }: RealTimeSystemHealthAlertProps) => {
  const s = stateStyle[alert.state];

  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md p-6 border border-gray-200`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.08 }}
    >
      <h2 className="section-title mb-4">Real-Time System Health Alert</h2>

      <motion.div
        key={alert.state}
        className={`p-4 rounded-lg border ${s.border} ${s.bg}`}
        initial={{ scale: 0.98, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white border border-gray-200">
              <AlertCircle className={`w-5 h-5 ${s.text}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${s.badge}`} />
                <span className={`text-sm font-semibold ${s.text}`}>{alert.state}</span>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">{alert.instruction}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default RealTimeSystemHealthAlert;

