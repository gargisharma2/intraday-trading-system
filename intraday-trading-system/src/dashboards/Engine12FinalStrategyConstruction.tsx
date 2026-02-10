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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Final Strategy &amp; Trade Construction</h1>
          <p className="page-subtitle">Final gate before execution (mock UI).</p>
        </motion.div>

        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <Card title="Trade Allowed / Blocked">
              <Banner
                label={allowed ? 'Allowed' : 'Blocked'}
                tone={allowed ? 'green' : 'red'}
                description={
                  allowed
                    ? 'Trade passes current checks.'
                    : 'Blocked due to sizing or limit constraints (mock).'
                }
              />
            </Card>

            {/* Card 2 */}
            <Card title="Position Sizing">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-text-secondary mb-1">Recommended size</div>
                  <div className="text-2xl font-semibold text-text-primary">{recommendedSize}</div>
                </div>
                <div>
                  <div className="text-xs text-text-secondary mb-1">User-requested size</div>
                  <div className="text-2xl font-semibold text-text-primary">{requestedSize}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-medium text-text-primary">Comparison</div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden flex">
                  <div className="h-3 bg-accent" style={{ width: `${clamp((recommendedSize / 120) * 100, 0, 100)}%` }} />
                  <div className="h-3 bg-[#8B5CF6]" style={{ width: `${clamp((requestedSize / 120) * 100, 0, 100)}%` }} />
                </div>
                <div className="flex justify-between text-[11px] text-text-secondary">
                  <span>Recommended</span>
                  <span>Requested</span>
                </div>
              </div>
            </Card>

            {/* Card 3 */}
            <Card title="Risk-to-Reward Visualization">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs text-text-secondary">R:R curve (mock)</div>
                <SoftBadge label={allowed ? 'acceptable' : 'unacceptable'} tone={allowed ? 'green' : 'red'} />
              </div>
              <MiniLineChart points={rrSeries} />
            </Card>

            {/* Card 4 */}
            <Card title="Risk Limits">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-text-primary">Usage vs max</div>
                <SoftBadge label={`${limitUsed}%`} tone={limitUsed < 65 ? 'green' : limitUsed < 90 ? 'amber' : 'red'} />
              </div>
              <Meter value={limitUsed} />
            </Card>

            {/* Card 5 */}
            <Card title="Exit Logic Overview">
              <div className="space-y-3">
                {[
                  { label: 'Stop-loss method', state: 'active' as const },
                  { label: 'Exit trigger', state: 'active' as const },
                  { label: 'Time-based exit', state: 'pending' as const },
                  { label: 'Volatility exit', state: 'active' as const }
                ].map((e) => (
                  <div key={e.label} className="flex items-center justify-between">
                    <div className="text-xs text-text-primary">{e.label}</div>
                    <SoftBadge label={e.state} tone={e.state === 'active' ? 'green' : 'neutral'} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 6 */}
            <Card title="Execution Readiness Checklist">
              <div className="space-y-3">
                {readinessChecklist.map((c) => (
                  <div key={c.item} className="flex items-center justify-between">
                    <div className="text-xs text-text-primary">{c.item}</div>
                    <SoftBadge label={c.ok ? 'green' : 'pending'} tone={c.ok ? 'green' : 'amber'} />
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Banner
                  label={allGreen ? 'Execution Enabled' : 'Execution Disabled'}
                  tone={allGreen ? 'green' : 'amber'}
                  description={allGreen ? 'All items are green.' : 'Complete remaining items before execution.'}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine12FinalStrategyConstruction;