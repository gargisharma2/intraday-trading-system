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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Compliance &amp; Ethics</h1>
          <p className="page-subtitle">Real-time legal &amp; ethical safety checks (mock UI).</p>
        </motion.div>

        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
            {/* Card 1 */}
            <Card title="Regulatory Rule Checks">
              <div className="space-y-3">
                {ruleChecks.map((r) => (
                  <div key={r.rule} className="flex items-center justify-between gap-4">
                    <div className="text-xs text-text-primary">{r.rule}</div>
                    <SoftBadge label={r.status} tone={r.tone as any} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 2 */}
            <Card title="Broker Margin Limits">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium text-text-primary">Margin usage</div>
                <SoftBadge label={`${marginUsed}%`} tone={trafficTone as any} />
              </div>
              <Meter value={marginUsed} />
            </Card>

            {/* Card 3 */}
            <Card title="Suitability Validation">
              <div className="space-y-3">
                {suitability.map((s) => (
                  <div key={s.item} className="flex items-center justify-between">
                    <div className="text-xs text-text-primary">{s.item}</div>
                    <SoftBadge label={s.status} tone={s.tone} />
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 4 */}
            <Card title="Audit Logs">
              <div className="max-h-[240px] overflow-y-auto divide-y divide-gray-200">
                {logs.map((l, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[11px] text-text-secondary">{l.ts}</div>
                      <SoftBadge
                        label={l.outcome}
                        tone={l.outcome === 'PASS' ? 'green' : l.outcome === 'FAIL' ? 'red' : 'blue'}
                      />
                    </div>
                    <div className="text-xs font-medium text-text-primary mt-1">{l.rule}</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Card 5 */}
            <Card title="Overall Compliance Banner">
              <Banner
                label={banner}
                tone={banner === 'PASS' ? 'green' : 'red'}
                description={banner === 'PASS' ? 'All compliance checks satisfied.' : 'Compliance failure detected; block execution.'}
              />
            </Card>

            {/* Card 6 - Placeholder */}
            <Card title="Reserved">
              <div className="flex items-center justify-center h-full text-text-secondary text-sm">
                Additional compliance metrics
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engine10ComplianceEthics;