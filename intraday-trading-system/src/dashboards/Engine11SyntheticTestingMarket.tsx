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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Internal Intraday Market (Synthetic Testing)</h1>
          <p className="page-subtitle">Simulated extreme markets before live execution (mock UI).</p>
        </motion.div>

        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <Card title="Extreme Volatility Simulation">
              <div className="flex items-center justify-between mb-3">
                <SoftBadge label={`Stress score: ${stress}`} tone={stress < 40 ? 'green' : stress < 70 ? 'amber' : 'red'} />
                <div className="text-[11px] text-text-secondary">Scenario list (mock)</div>
              </div>
              <MiniLineChart points={stressSeries} />
              <div className="mt-3 flex flex-wrap gap-2">
                <SoftBadge label="Gap opens" tone="purple" />
                <SoftBadge label="Vol bursts" tone="orange" />
                <SoftBadge label="Liquidity snaps" tone="blue" />
              </div>
            </Card>

            {/* Card 2 */}
            <Card title="Liquidity Stress Test">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-text-primary">Depth simulation</div>
                <SoftBadge label={`Survival probability: ${Math.max(0, Math.min(100, survival))}%`} tone={survival >= 70 ? 'green' : survival >= 55 ? 'amber' : 'red'} />
              </div>
              <MiniLineChart points={depthSeries} stroke="#22C55E" />
              <div className="mt-3 text-xs text-text-secondary">Depth degradation increases under stress (mock).</div>
            </Card>

            {/* Card 3 */}
            <Card title="News Chaos Simulation">
              <div className="max-h-[220px] overflow-y-auto divide-y divide-gray-200">
                {[
                  { ts: '09:44', title: 'Geo headline shock', tone: 'purple' as const },
                  { ts: '10:11', title: 'Policy repricing pulse', tone: 'blue' as const },
                  { ts: '10:58', title: 'Crypto correlation jolt', tone: 'orange' as const }
                ].map((e, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] text-text-secondary">{e.ts}</div>
                      <div className="text-xs font-medium text-text-primary mt-0.5">{e.title}</div>
                    </div>
                    <SoftBadge label="Event" tone={e.tone} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <div className="text-xs font-medium text-text-primary mb-2">Impact severity</div>
                <Meter value={impact} />
              </div>
            </Card>

            {/* Card 4 */}
            <Card title="Trade Survival Score">
              <div className="flex items-center justify-between mb-2">
                <div className="text-3xl font-semibold text-text-primary">{survival}</div>
                <SoftBadge label={survival >= 70 ? 'stable' : 'declining'} tone={survival >= 70 ? 'green' : 'amber'} />
              </div>
              <div className="text-xs text-text-secondary">0 = Failed, 100 = Safe (mock).</div>
            </Card>

            {/* Card 5 */}
            <Card title="Final Verdict Banner">
              <Banner
                label={verdict}
                tone={verdict === 'PASS' ? 'green' : 'red'}
                description={
                  verdict === 'PASS'
                    ? 'Synthetic stress test outcome is acceptable.'
                    : 'Fail reasons: slippage, volatility burst, liquidity collapse.'
                }
              />
            </Card>

            {/* Card 6 - Placeholder */}
            <Card title="Reserved">
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                Additional simulation metrics
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine11SyntheticTestingMarket;