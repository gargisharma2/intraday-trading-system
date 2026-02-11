import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import IntradayFragilityMeter from '../components/engine8/IntradayFragilityMeter';
import FailureSpeedIndicator from '../components/engine8/FailureSpeedIndicator';
import RiskEscalationThresholdPanel from '../components/engine8/RiskEscalationThresholdPanel';
import FragilityZonesChart from '../components/engine8/FragilityZonesChart';
import ContributingRiskFactors from '../components/engine8/ContributingRiskFactors';
import RealTimeSystemHealthAlert from '../components/engine8/RealTimeSystemHealthAlert';
import FailurePointMap from '../components/engine8/FailurePointMap';
import {
  contributingFactors,
  failurePointMap,
  generateFragilityZones,
  initialSnapshot,
  nextSnapshot,
  systemHealthAlert
} from '../components/engine8/mockData';
import type { FragilityStateSnapshot } from '../components/engine8/types';

const IntradayFragilityEngine = () => {
  const [snapshot, setSnapshot] = useState<FragilityStateSnapshot>(() => initialSnapshot());

  useEffect(() => {
    const id = window.setInterval(() => {
      setSnapshot((prev) => nextSnapshot(prev));
    }, 12000);
    return () => window.clearInterval(id);
  }, []);

  const zones = useMemo(() => generateFragilityZones(snapshot.fragilityIndex), [snapshot.fragilityIndex]);
  const factors = useMemo(() => contributingFactors(snapshot), [snapshot]);
  const alert = useMemo(() => systemHealthAlert(snapshot), [snapshot]);
  const map = useMemo(() => failurePointMap(snapshot), [snapshot]);

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Risk Understanding & Fragility Engine</h1>
        </motion.div>

        {/* Scrollable main content area for Engine 8 only */}
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

export default IntradayFragilityEngine;