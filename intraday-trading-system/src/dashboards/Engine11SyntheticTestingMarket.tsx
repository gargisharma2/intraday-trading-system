import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Banner, SoftBadge, MiniLineChart, Meter } from '../components/engine9_12/ui';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const Engine11SyntheticTestingMarket = () => {
  const [stress, setStress] = useState(46);
  const [survival, setSurvival] = useState(72);
  const [impact, setImpact] = useState(38);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStress((p) => clamp(Math.round(p + (Math.random() - 0.45) * 18), 0, 100));
      setSurvival((p) => clamp(Math.round(p + (Math.random() - 0.55) * 14), 0, 100));
      setImpact((p) => clamp(Math.round(p + (Math.random() - 0.45) * 16), 0, 100));
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  const stressSeries = useMemo(() => Array.from({ length: 28 }).map((_, i) => stress + Math.sin(i / 4) * 8 + (i / 27) * 4), [stress]);
  const depthSeries = useMemo(() => Array.from({ length: 28 }).map((_, i) => 60 + Math.cos(i / 5) * 10 - stress / 8), [stress]);

  const verdict = survival >= 55 ? 'PASS' : 'FAIL';

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Internal Intraday Market (Synthetic Testing)</h1>
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

export default Engine11SyntheticTestingMarket;