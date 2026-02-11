import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Banner, SoftBadge, Meter } from '../components/engine9_12/ui';

type ComplianceBanner = 'PASS' | 'FAIL';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const Engine10ComplianceEthics = () => {
  const [marginUsed, setMarginUsed] = useState(48);
  const [banner, setBanner] = useState<ComplianceBanner>('PASS');

  useEffect(() => {
    const id = window.setInterval(() => {
      setMarginUsed((p) => clamp(Math.round(p + (Math.random() - 0.45) * 16), 0, 110));
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    setBanner(marginUsed > 90 ? 'FAIL' : 'PASS');
  }, [marginUsed]);

  const ruleChecks = useMemo(
    () => [
      { rule: 'SEBI Intraday Leverage Limit', status: marginUsed < 75 ? 'Pass' : marginUsed < 90 ? 'Review' : 'Fail', tone: marginUsed < 75 ? 'green' : marginUsed < 90 ? 'blue' : 'red' },
      { rule: 'Broker Intraday Margin Threshold', status: marginUsed < 75 ? 'Pass' : marginUsed < 90 ? 'Pass' : 'Fail', tone: marginUsed < 90 ? 'green' : 'red' },
      { rule: 'Restricted Instrument List', status: 'Pass', tone: 'green' }
    ],
    [marginUsed]
  );

  const suitability = [
    { item: 'Risk class valid', status: 'met', tone: 'green' as const },
    { item: 'Capital profile aligned', status: 'met', tone: 'green' as const },
    { item: 'Experience sufficient', status: 'unmet', tone: 'amber' as const }
  ];

  const logs = useMemo(
    () => [
      { ts: '09:31', rule: 'Leverage limit', outcome: 'PASS' },
      { ts: '10:14', rule: 'Margin threshold', outcome: marginUsed < 90 ? 'PASS' : 'FAIL' },
      { ts: '11:02', rule: 'Suitability validation', outcome: 'REVIEW' }
    ],
    [marginUsed]
  );

  const trafficTone = marginUsed < 50 ? 'green' : marginUsed < 75 ? 'amber' : marginUsed < 90 ? 'orange' : 'red';

  return (
    <div className="h-screen overflow-hidden bg-page-bg p-4">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-4 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Compliance &amp; Ethics</h1>
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

export default Engine10ComplianceEthics;