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
    <div className="flex flex-col h-full overflow-hidden bg-page-bg">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Risk Understanding & Fragility Engine</h1>
          <p className="page-subtitle">Mock intraday fragility signals with periodic updates.</p>
        </motion.div>

        {/* Scrollable main content area for Engine 8 only */}
        <div className="h-full overflow-y-auto px-6 pb-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* LEFT COLUMN */}
            <div className="flex flex-col gap-6">
              <IntradayFragilityMeter index={snapshot.fragilityIndex} state={snapshot.fragilityState} />
              <FailureSpeedIndicator speed={snapshot.failureSpeed} />
              <RiskEscalationThresholdPanel current={snapshot.threshold} />
              <FragilityZonesChart points={zones} />
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col gap-6">
              <ContributingRiskFactors rows={factors} />
              <RealTimeSystemHealthAlert alert={alert} />
              <FailurePointMap map={map} />
              <div className="text-xs text-text-secondary text-right pr-1">
                Last updated {snapshot.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntradayFragilityEngine;

