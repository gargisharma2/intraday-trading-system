import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Waves, Zap } from 'lucide-react';
import SectionHeader from '../components/common/SectionHeader';
import StatusBadge from '../components/common/StatusBadge';
import ThresholdGauge from '../components/common/ThresholdGauge';
import VerticalTimeline from '../components/common/VerticalTimeline';
import type { TimelineItem } from '../components/common/VerticalTimeline';
import MetricCard from '../components/common/MetricCard';
import SummaryCard from '../components/common/SummaryCard';

type MarketState = 'Calm' | 'Turbulent' | 'Extreme';

const stateColor: Record<MarketState, string> = {
  Calm: 'bg-[#4ade80]',
  Turbulent: 'bg-[#facc15]',
  Extreme: 'bg-[#ef4444]'
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

const SyntheticInternalMarketEngine = () => {
  const [marketState, setMarketState] = useState<MarketState>('Calm');
  const [volIndex, setVolIndex] = useState<number>(32);
  const [bidDepth, setBidDepth] = useState<number>(72);
  const [askDepth, setAskDepth] = useState<number>(68);
  const [survivalScore, setSurvivalScore] = useState<number>(78);

  useEffect(() => {
    const id = window.setInterval(() => {
      setVolIndex((prev) => clamp(Math.round(prev + (Math.random() - 0.45) * 18), 0, 100));
      setBidDepth((prev) => clamp(Math.round(prev + (Math.random() - 0.55) * 16), 10, 100));
      setAskDepth((prev) => clamp(Math.round(prev + (Math.random() - 0.55) * 16), 10, 100));
      setSurvivalScore((prev) => clamp(Math.round(prev + (Math.random() - 0.55) * 14), 0, 100));
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    // marketState derived from volIndex (mock logic)
    setMarketState(volIndex < 40 ? 'Calm' : volIndex < 75 ? 'Turbulent' : 'Extreme');
  }, [volIndex]);

  const sparkline = useMemo(() => {
    // simple deterministic sparkline tied to volIndex
    const pts = Array.from({ length: 24 }).map((_, i) => {
      const wave = Math.sin((i / 23) * Math.PI * 2) * (volIndex / 10);
      const drift = (i / 23) * (volIndex / 25);
      return 50 + wave + drift;
    });
    return pts;
  }, [volIndex]);

  const sparkPath = useMemo(() => {
    const w = 260;
    const h = 70;
    const pad = 6;
    const max = Math.max(...sparkline);
    const min = Math.min(...sparkline);
    const x = (i: number) => pad + (i / (sparkline.length - 1)) * (w - pad * 2);
    const y = (v: number) =>
      pad + (1 - (v - min) / Math.max(1e-6, max - min)) * (h - pad * 2);
    return sparkline.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  }, [sparkline]);

  const shocks: TimelineItem[] = [
    { id: 'sh1', timestamp: '09:38', title: 'Policy Shock', description: 'Artificial policy shock injected.', tag: 'Policy Shock' },
    { id: 'sh2', timestamp: '10:12', title: 'Earnings Chaos', description: 'Synthetic earnings volatility burst.', tag: 'Earnings Chaos' },
    { id: 'sh3', timestamp: '11:05', title: 'Geo Event', description: 'Synthetic geopolitical headline stress.', tag: 'Geo Event' },
    { id: 'sh4', timestamp: '11:42', title: 'Crypto Shock', description: 'Synthetic crypto correlation shock.', tag: 'Crypto Shock' }
  ];

  const survivalColor =
    survivalScore >= 70 ? 'text-[#4ade80]' : survivalScore >= 40 ? 'text-[#facc15]' : 'text-[#ef4444]';

  const outcome = survivalScore >= 55 ? 'PASS' : 'FAIL';
  const outcomeColor = outcome === 'PASS' ? 'bg-[#4ade80]' : 'bg-[#ef4444]';

  const description =
    marketState === 'Calm'
      ? 'Synthetic environment stable; baseline stress testing in effect.'
      : marketState === 'Turbulent'
        ? 'Synthetic turbulence applied; volatility and depth sensitivity elevated.'
        : 'Extreme synthetic conditions; execution quality likely degrades rapidly.';

  return (
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Internal Synthetic Intraday Market</h1>
          <p className="page-subtitle">Internal synthetic exchange for intraday stress testing (mock data).</p>
        </motion.div>

        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SectionHeader
                  title="Synthetic Market Simulator"
                  subtitle="Synthetic market state and price movement preview."
                  icon={<Activity className="w-5 h-5 text-accent" />}
                />
                <div className="flex items-center justify-between mb-3">
                  <StatusBadge label={marketState} colorClass={stateColor[marketState]} />
                </div>
                <p className="text-sm text-text-secondary mb-4">{description}</p>
                <svg viewBox="0 0 260 70" className="w-full h-[70px] overflow-hidden rounded-lg bg-gray-50 border border-gray-200">
                  <path d={sparkPath} fill="none" stroke="#C08D4D" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SectionHeader
                  title="Volatility Stress Meter"
                  subtitle="Synthetic volatility index (0–100)."
                  icon={<Zap className="w-5 h-5 text-accent" />}
                />
                <ThresholdGauge value={volIndex} label="Volatility index" />
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SectionHeader
                  title="Liquidity Depth Distortion"
                  subtitle="Bid/ask depth bars under synthetic distortion."
                  icon={<Waves className="w-5 h-5 text-accent" />}
                />

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                      <span>Bid depth</span>
                      <span className="font-medium text-text-primary">{bidDepth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="h-3 bg-[#4ade80]" style={{ width: `${bidDepth}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-text-secondary mb-1">
                      <span>Ask depth</span>
                      <span className="font-medium text-text-primary">{askDepth}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div className="h-3 bg-[#fb923c]" style={{ width: `${askDepth}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SectionHeader
                  title="News Shock Simulation Timeline"
                  subtitle="Artificial shock events in the synthetic session."
                />
                <VerticalTimeline items={shocks} />
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
                <SectionHeader
                  title="Trade Survival Score"
                  subtitle="How well the trade survives synthetic chaos (mock)."
                />
                <MetricCard
                  label="Trade Survival Score"
                  value={`${survivalScore}`}
                  helper="0 = Failed, 100 = Safe"
                  stateColorClass={survivalColor}
                />
              </div>

              <SummaryCard
                title="Stress Test Outcome Panel"
                content={
                  <div className="space-y-2">
                    <StatusBadge label={outcome} colorClass={outcomeColor} />
                    <div className="text-sm text-text-secondary">
                      Breakdown (mock): slippage, volatility burst, liquidity collapse.
                    </div>
                    <div className="text-xs text-text-secondary">
                      Summary recommendation: {outcome === 'PASS' ? 'Proceed with controlled sizing.' : 'Avoid new exposure.'}
                    </div>
                  </div>
                }
              />
            </div>
          </div>

          <div className="mt-6">
            <SummaryCard
              title="Engine Input Dependencies"
              content={
                <div className="flex flex-wrap gap-2 text-xs">
                  {['Engine 3', 'Engine 4', 'Engine 5', 'Engine 6', 'Engine 7'].map((e) => (
                    <span
                      key={e}
                      className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-text-secondary"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              }
              footer="Engine 12 consumes intraday behavior, scenarios, stress, and global shock signals (mock dependencies)."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyntheticInternalMarketEngine;

