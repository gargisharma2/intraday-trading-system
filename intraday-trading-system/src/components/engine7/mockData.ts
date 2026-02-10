import type {
  GlobalShockEvent,
  ShockOverviewState,
  ShockSourceBreakdown,
  ShockTimelinePoint,
  ImpactProjection,
  ShockStatus,
  EventCategory
} from './types';

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function statusFromIndex(index: number): ShockStatus {
  if (index < 25) return 'Low';
  if (index < 50) return 'Medium';
  if (index < 75) return 'High';
  return 'Extreme';
}

export function getShockOverview(index: number): ShockOverviewState {
  const status = statusFromIndex(index);
  const summaries: Record<ShockStatus, string> = {
    Low: 'Stable intraday context with limited headline-driven shock pressure.',
    Medium: 'Moderate intraday shock pressure; monitor headlines for escalation.',
    High: 'Elevated shock pressure; expect rapid intraday regime shifts.',
    Extreme: 'Severe shock pressure; intraday conditions may destabilize abruptly.'
  };
  return { status, summary: summaries[status] };
}

export function getInitialEvents(): GlobalShockEvent[] {
  return [
    {
      id: 'evt-1',
      category: 'Geopolitics',
      timestamp: '09:41',
      title: 'Regional tensions escalate',
      description: 'Risk sentiment shifts toward defense positioning.',
      severity: 4
    },
    {
      id: 'evt-2',
      category: 'Policy',
      timestamp: '10:08',
      title: 'Central bank commentary released',
      description: 'Rates expectations adjust intraday risk appetite.',
      severity: 3
    },
    {
      id: 'evt-3',
      category: 'Energy',
      timestamp: '10:32',
      title: 'Supply disruption headline',
      description: 'Energy-linked volatility rises across correlated assets.',
      severity: 4
    },
    {
      id: 'evt-4',
      category: 'Crypto',
      timestamp: '10:57',
      title: 'Large liquidation cascade observed',
      description: 'Cross-market correlation spikes in high beta instruments.',
      severity: 2
    }
  ];
}

export function refreshEvents(prev: GlobalShockEvent[]): GlobalShockEvent[] {
  // Deterministic “refresh” that rotates severity and updates timestamps slightly.
  const tick = new Date();
  const mm = tick.getMinutes().toString().padStart(2, '0');
  const hh = tick.getHours().toString().padStart(2, '0');
  const newTimestamp = `${hh}:${mm}`;

  const categories: EventCategory[] = ['Geopolitics', 'Policy', 'Energy', 'Crypto'];
  const templates: Array<Pick<GlobalShockEvent, 'title' | 'description'>> = [
    { title: 'Headline momentum builds', description: 'Intraday risk reprices across liquid venues.' },
    { title: 'Cross-asset correlation uptick', description: 'Risk-on/risk-off transitions accelerate.' },
    { title: 'Volatility pulse detected', description: 'Short-horizon stability deteriorates temporarily.' },
    { title: 'Liquidity sensitivity rises', description: 'Depth thins at key price levels.' }
  ];

  const next = prev.slice(0, 6).map((e, idx) => {
    const sev = ((e.severity % 5) + 1) as 1 | 2 | 3 | 4 | 5;
    return { ...e, severity: sev, timestamp: newTimestamp, category: categories[idx % categories.length] };
  });

  const add = templates[tick.getSeconds() % templates.length];
  const newEvent: GlobalShockEvent = {
    id: `evt-${tick.getTime()}`,
    category: categories[tick.getSeconds() % categories.length],
    timestamp: newTimestamp,
    title: add.title,
    description: add.description,
    severity: (clamp((tick.getSeconds() % 5) + 1, 1, 5) as 1 | 2 | 3 | 4 | 5)
  };

  return [newEvent, ...next].slice(0, 8);
}

export function getShockTimeline(index: number): ShockTimelinePoint[] {
  // 30 minutes, minute-level. Risk level 1–5 loosely tied to index.
  const baseLevel = clamp(Math.round(index / 20), 1, 5) as 1 | 2 | 3 | 4 | 5;
  const points: ShockTimelinePoint[] = [];
  for (let m = 0; m < 30; m += 1) {
    const wave = Math.sin((m / 29) * Math.PI * 2) * 0.8;
    const bump = m > 18 ? 0.5 : 0;
    const lvl = clamp(Math.round(baseLevel + wave + bump), 1, 5) as 1 | 2 | 3 | 4 | 5;
    points.push({ minute: m, riskLevel: lvl });
  }
  return points;
}

export function getSourceBreakdown(index: number): ShockSourceBreakdown {
  // Soft shifts across buckets; sum to 100.
  const g = clamp(35 + Math.round(index / 6), 20, 60);
  const p = clamp(25 + Math.round(index / 10), 10, 35);
  const e = clamp(25 - Math.round(index / 12), 10, 35);
  let c = 100 - g - p - e;
  c = clamp(c, 5, 35);
  const total = g + p + e + c;
  return {
    Geopolitical: Math.round((g / total) * 100),
    Policy: Math.round((p / total) * 100),
    Energy: Math.round((e / total) * 100),
    Crypto: 100 - Math.round((g / total) * 100) - Math.round((p / total) * 100) - Math.round((e / total) * 100)
  };
}

export function getImpactProjection(index: number): ImpactProjection {
  const status = statusFromIndex(index);
  const lastUpdated = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const notes: Record<ShockStatus, string> = {
    Low: 'Intraday stability holds; monitor for headline regime shifts.',
    Medium: 'Expect sporadic volatility bursts and selective liquidity thinning.',
    High: 'Broader instability likely; spreads may widen on transitions.',
    Extreme: 'High instability risk; execution quality may degrade rapidly.'
  };
  return {
    expectedVolatilityImpact: status,
    liquidityImpact: status,
    spreadWidening: status,
    marketInstabilityNotes: notes[status],
    lastUpdated
  };
}

