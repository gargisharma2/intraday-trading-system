import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Banner, SoftBadge, MiniLineChart, MiniDonut, Meter } from '../components/engine9_12/ui';

type ExposureStatus = 'Within Limit' | 'Approaching Limit' | 'Breach';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const Engine9RebalancingExposure = () => {
  const [exposure, setExposure] = useState<number>(58);
  const [risk, setRisk] = useState<number>(44);
  const [trend, setTrend] = useState<'rising' | 'stable' | 'falling'>('stable');
  const [banner, setBanner] = useState<'Within Limits' | 'Reduction Forced'>('Within Limits');

  useEffect(() => {
    const id = window.setInterval(() => {
      setExposure((p) => clamp(Math.round(p + (Math.random() - 0.45) * 10), 0, 110));
      setRisk((p) => clamp(Math.round(p + (Math.random() - 0.45) * 9), 0, 100));
      setTrend(Math.random() > 0.6 ? 'rising' : Math.random() > 0.6 ? 'falling' : 'stable');
    }, 14000);
    return () => window.clearInterval(id);
  }, []);

  const status: ExposureStatus =
    exposure < 70 ? 'Within Limit' : exposure < 90 ? 'Approaching Limit' : 'Breach';

  useEffect(() => {
    setBanner(status === 'Breach' ? 'Reduction Forced' : 'Within Limits');
  }, [status]);

  const statusTone = status === 'Within Limit' ? 'green' : status === 'Approaching Limit' ? 'amber' : 'red';

  const exposureSeries = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => exposure + Math.sin(i / 3) * 6 + (i / 23) * 4);
  }, [exposure]);

  const concentration = [
    { label: 'Top cluster', value: 42, color: '#8B5CF6' },
    { label: 'Mid', value: 34, color: '#22C55E' },
    { label: 'Tail', value: 24, color: '#F97316' }
  ];

  const triggerRules = [
    { id: 't1', label: 'Gross exposure > 85%', state: 'Armed', tone: 'blue' as const },
    { id: 't2', label: 'Concentration clustering detected', state: exposure > 80 ? 'Active' : 'Armed', tone: 'orange' as const },
    { id: 't3', label: 'Risk meter sustained rise', state: risk > 70 ? 'Fired' : 'Armed', tone: risk > 70 ? 'red' as const : 'blue' as const },
    { id: 't4', label: 'Forced reduction complete', state: banner === 'Reduction Forced' && exposure < 70 ? 'Completed' : 'Armed', tone: 'purple' as const }
  ];

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Rebalancing &amp; Exposure Control</h1>
        </motion.div>

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

export default Engine9RebalancingExposure;