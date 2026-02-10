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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Rebalancing &amp; Exposure Control</h1>
          <p className="page-subtitle">Mock UI to prevent overtrading and silent risk buildup.</p>
        </motion.div>

        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <Card title="Real-Time Exposure Buildup">
              <div className="flex items-center justify-between mb-3">
                <div className="text-2xl font-semibold text-text-primary">{exposure}%</div>
                <SoftBadge label={status} tone={statusTone} />
              </div>
              <MiniLineChart points={exposureSeries} />
              <div className="mt-3 text-xs text-text-secondary">
                Exposure vs time (mock). Status updates calmly with thresholds.
              </div>
            </Card>

            {/* Card 2 */}
            <Card title="Trade Concentration">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-4">
                  <MiniDonut slices={concentration} />
                  <div className="space-y-1 text-[11px] text-text-secondary">
                    {concentration.map((s) => (
                      <div key={s.label} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                        <span>{s.label}</span>
                        <span className="ml-auto font-medium text-text-primary">{s.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <SoftBadge label="Clustering detected" tone="orange" />
              </div>
            </Card>

            {/* Card 3 */}
            <Card title="Cumulative Intraday Risk">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-text-primary">Risk meter</div>
                <SoftBadge label={trend} tone={trend === 'rising' ? 'orange' : trend === 'falling' ? 'green' : 'neutral'} />
              </div>
              <Meter value={risk} />
            </Card>

            {/* Card 4 */}
            <Card title="Automatic Reduction Triggers">
              <div className="space-y-3">
                {triggerRules.map((r) => (
                  <div key={r.id} className="flex items-center justify-between gap-3">
                    <div className="text-xs text-text-primary">{r.label}</div>
                    <SoftBadge label={r.state} tone={r.tone} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 5 */}
            <Card title="Exposure State Banner">
              <Banner
                label={banner}
                tone={banner === 'Within Limits' ? 'green' : 'red'}
                description={
                  banner === 'Within Limits'
                    ? 'Exposure remains inside defined guardrails.'
                    : 'Mock reduction workflow has been forced due to breach.'
                }
              />
            </Card>

            {/* Card 6 - Placeholder for future content */}
            <Card title="Reserved">
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                Additional monitoring metrics
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine9RebalancingExposure;