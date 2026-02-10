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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col overflow-hidden">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Geopolitical & Global Shock Engine (Intraday Context)</h1>
          <p className="page-subtitle">Intraday context panel using mock global shock signals and events.</p>
        </motion.div>

        {/* Main content scrolls ONLY on this dashboard */}
        <div className="overflow-y-auto h-full overflow-x-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 pb-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              <GlobalShockOverview overview={overview} />
              <BreakingEventsFeed events={events} onRefresh={handleManualRefresh} />
              <ShockTimelineChart timeline={timeline} />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              <ShockSourceBreakdown breakdown={breakdown} />
              <RiskEscalationMeter riskIndex={riskIndex} />
              <ImpactProjectionPanel impact={impact} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeopoliticalShockEngine;

