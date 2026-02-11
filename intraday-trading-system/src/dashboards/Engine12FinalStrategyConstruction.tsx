import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Banner, SoftBadge, MiniLineChart, Meter } from '../components/engine9_12/ui';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const Engine12FinalStrategyConstruction = () => {
  const [allowed, setAllowed] = useState<boolean>(true);
  const [requestedSize, setRequestedSize] = useState<number>(75);
  const [recommendedSize, setRecommendedSize] = useState<number>(62);
  const [limitUsed, setLimitUsed] = useState<number>(54);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRequestedSize((p) => clamp(Math.round(p + (Math.random() - 0.45) * 10), 10, 120));
      setRecommendedSize((p) => clamp(Math.round(p + (Math.random() - 0.5) * 8), 10, 120));
      setLimitUsed((p) => clamp(Math.round(p + (Math.random() - 0.45) * 12), 0, 110));
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setAllowed(limitUsed < 90 && requestedSize <= recommendedSize * 1.25);
  }, [limitUsed, requestedSize, recommendedSize]);

  const rrSeries = useMemo(() => {
    // mock risk-to-reward curve
    return Array.from({ length: 24 }).map((_, i) => 40 + Math.sin(i / 3) * 10 + (recommendedSize / 10) * 0.8);
  }, [recommendedSize]);

  const readinessChecklist = useMemo(
    () => [
      { item: 'All limits satisfied', ok: limitUsed < 90 },
      { item: 'Position sizing within cap', ok: requestedSize <= recommendedSize * 1.25 },
      { item: 'Exit logic configured', ok: true },
      { item: 'Compliance signals clear', ok: true }
    ],
    [limitUsed, requestedSize, recommendedSize]
  );

  const allGreen = readinessChecklist.every((c) => c.ok);

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Final Strategy &amp; Trade Construction</h1>
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

export default Engine12FinalStrategyConstruction;