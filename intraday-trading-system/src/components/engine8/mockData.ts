import type {
  ContributingFactorRow,
  FailurePointMap,
  FailureSegmentId,
  FragilityState,
  FragilityStateSnapshot,
  FragilityZonePoint,
  HealthAlert
} from './types';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function fragilityStateFromIndex(index: number): FragilityState {
  if (index < 25) return 'Stable';
  if (index < 50) return 'Watch';
  if (index < 75) return 'Fragile';
  return 'Critical';
}

export function thresholdFromIndex(index: number): 1 | 2 | 3 {
  if (index < 40) return 1;
  if (index < 70) return 2;
  return 3;
}

export function formatTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function nextSnapshot(prev: FragilityStateSnapshot): FragilityStateSnapshot {
  // Controlled drift upward/downward.
  const drift = Math.random() > 0.55 ? 6 : -4;
  const fragilityIndex = clamp(Math.round(prev.fragilityIndex + drift), 0, 100);

  const speedNoise = Math.round((Math.random() - 0.45) * 18);
  const failureSpeed = clamp(Math.round(prev.failureSpeed + speedNoise + (drift > 0 ? 8 : -4)), 0, 100);

  return {
    fragilityIndex,
    fragilityState: fragilityStateFromIndex(fragilityIndex),
    failureSpeed,
    threshold: thresholdFromIndex(fragilityIndex),
    lastUpdated: formatTime()
  };
}

export function initialSnapshot(): FragilityStateSnapshot {
  const base = 46;
  return {
    fragilityIndex: base,
    fragilityState: fragilityStateFromIndex(base),
    failureSpeed: 34,
    threshold: thresholdFromIndex(base),
    lastUpdated: formatTime()
  };
}

export function generateFragilityZones(seedIndex: number): FragilityZonePoint[] {
  const points: FragilityZonePoint[] = [];
  for (let m = 0; m < 30; m += 1) {
    const wave = Math.sin((m / 29) * Math.PI * 2) * 10;
    const ramp = (m / 29) * 12;
    const fragility = clamp(Math.round(seedIndex + wave + ramp), 0, 100);
    points.push({ minute: m, fragility });
  }
  return points;
}

export function contributingFactors(snapshot: FragilityStateSnapshot): ContributingFactorRow[] {
  // Derived scores (mock) with mild coupling to fragilityIndex.
  const base = snapshot.fragilityIndex;
  const mk = (offset: number) => clamp(Math.round(base + offset + (Math.random() - 0.5) * 10), 0, 100);

  const rows: ContributingFactorRow[] = [
    {
      id: 'instrument-fragility',
      label: 'Instrument Fragility',
      score: mk(-6),
      direction: Math.random() > 0.5 ? 'up' : 'down',
      explanation: 'Execution quality sensitivity under intraday stress.'
    },
    {
      id: 'behavioral-instability',
      label: 'Behavioral Instability',
      score: mk(4),
      direction: Math.random() > 0.55 ? 'up' : 'down',
      explanation: 'Behavioral regime drift vs stable intraday fingerprint.'
    },
    {
      id: 'scenario-fragility',
      label: 'Scenario Fragility',
      score: mk(10),
      direction: Math.random() > 0.6 ? 'up' : 'down',
      explanation: 'Scenario path sensitivity to phase transitions.'
    },
    {
      id: 'stress-sensitivity',
      label: 'Stress Sensitivity',
      score: mk(2),
      direction: Math.random() > 0.5 ? 'up' : 'down',
      explanation: 'Synthetic stress response under rulebook shocks.'
    },
    {
      id: 'global-shock-pressure',
      label: 'Global Shock Pressure',
      score: mk(8),
      direction: Math.random() > 0.55 ? 'up' : 'down',
      explanation: 'Intraday global headline pressure and correlation risk.'
    }
  ];

  return rows;
}

export function systemHealthAlert(snapshot: FragilityStateSnapshot): HealthAlert {
  const state = snapshot.fragilityState;
  const instructionByState: Record<FragilityState, string> = {
    Stable: 'Maintain normal sizing and monitor threshold transitions.',
    Watch: 'Tighten risk; avoid adding into unstable microstructure.',
    Fragile: 'Reduce exposure; prioritize liquidity and faster exits.',
    Critical: 'De-risk immediately; avoid new entries until stability returns.'
  };
  return { state, instruction: instructionByState[state] };
}

export function failurePointMap(snapshot: FragilityStateSnapshot): FailurePointMap {
  const base = snapshot.fragilityIndex;
  const speed = snapshot.failureSpeed;

  const weights = {
    'liquidity-collapse': clamp(Math.round(22 + base * 0.35), 5, 60),
    'spread-explosion': clamp(Math.round(18 + base * 0.25 + speed * 0.15), 5, 55),
    'volatility-jump': clamp(Math.round(16 + base * 0.3), 5, 55),
    'behavioral-reversal': clamp(Math.round(14 + speed * 0.35), 5, 55),
    'shock-triggered-failure': clamp(Math.round(10 + base * 0.2 + speed * 0.2), 5, 55)
  } satisfies Record<FailureSegmentId, number>;

  const segments = (Object.keys(weights) as FailureSegmentId[]).map((id) => ({
    id,
    label:
      id === 'liquidity-collapse'
        ? 'Liquidity collapse'
        : id === 'spread-explosion'
          ? 'Spread explosion'
          : id === 'volatility-jump'
            ? 'Volatility jump'
            : id === 'behavioral-reversal'
              ? 'Behavioral reversal'
              : 'Shock-triggered failure',
    weight: weights[id]
  }));

  const mostLikely = segments.reduce((best, cur) => (cur.weight > best.weight ? cur : best), segments[0]).id;

  return { segments, mostLikely };
}

