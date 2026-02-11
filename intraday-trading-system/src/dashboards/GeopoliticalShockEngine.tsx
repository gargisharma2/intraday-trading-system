import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import GlobalShockOverview from '../components/engine7/GlobalShockOverview';
import BreakingEventsFeed from '../components/engine7/BreakingEventsFeed';
import ShockTimelineChart from '../components/engine7/ShockTimelineChart';
import ShockSourceBreakdown from '../components/engine7/ShockSourceBreakdown';
import RiskEscalationMeter from '../components/engine7/RiskEscalationMeter';
import ImpactProjectionPanel from '../components/engine7/ImpactProjectionPanel';
import {
  getImpactProjection,
  getInitialEvents,
  getShockOverview,
  getShockTimeline,
  getSourceBreakdown,
  refreshEvents
} from '../components/engine7/mockData';
import type { GlobalShockEvent } from '../components/engine7/types';

const GeopoliticalShockEngine = () => {
  const [riskIndex, setRiskIndex] = useState<number>(48);
  const [events, setEvents] = useState<GlobalShockEvent[]>(() => getInitialEvents());

  // Refresh mock data every 10–20 seconds.
  useEffect(() => {
    const base = 12000;
    const jitter = Math.floor(Math.random() * 7000);
    const intervalMs = base + jitter;

    const id = window.setInterval(() => {
      setEvents((prev) => refreshEvents(prev));
      setRiskIndex((prev) => {
        const next = prev + (Math.random() > 0.5 ? 6 : -5);
        return Math.max(0, Math.min(100, Math.round(next)));
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, []);

  const overview = useMemo(() => getShockOverview(riskIndex), [riskIndex]);
  const timeline = useMemo(() => getShockTimeline(riskIndex), [riskIndex]);
  const breakdown = useMemo(() => getSourceBreakdown(riskIndex), [riskIndex]);
  const impact = useMemo(() => getImpactProjection(riskIndex), [riskIndex]);

  const handleManualRefresh = () => {
    setEvents((prev) => refreshEvents(prev));
    setRiskIndex((prev) => Math.max(0, Math.min(100, Math.round(prev + 4))));
  };

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Geopolitical & Global Shock Engine (Intraday Context)</h1>
        </motion.div>

        {/* Main content scrolls ONLY on this dashboard */}
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

export default GeopoliticalShockEngine;