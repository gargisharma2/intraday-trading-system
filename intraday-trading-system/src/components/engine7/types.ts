import type { LucideIcon } from 'lucide-react';

export type ShockStatus = 'Low' | 'Medium' | 'High' | 'Extreme';

export type EventCategory = 'Geopolitics' | 'Policy' | 'Energy' | 'Crypto';

export interface GlobalShockEvent {
  id: string;
  category: EventCategory;
  timestamp: string;
  title: string;
  description: string;
  severity: 1 | 2 | 3 | 4 | 5;
}

export interface ShockTimelinePoint {
  minute: number;
  riskLevel: 1 | 2 | 3 | 4 | 5;
}

export interface ShockSourceBreakdown {
  Geopolitical: number;
  Policy: number;
  Energy: number;
  Crypto: number;
}

export interface RiskEscalationState {
  index: number; // 0-100
}

export interface ImpactProjection {
  expectedVolatilityImpact: 'Low' | 'Medium' | 'High' | 'Extreme';
  liquidityImpact: 'Low' | 'Medium' | 'High' | 'Extreme';
  spreadWidening: 'Low' | 'Medium' | 'High' | 'Extreme';
  marketInstabilityNotes: string;
  lastUpdated: string;
}

export interface ShockOverviewState {
  status: ShockStatus;
  summary: string;
}

export interface CategoryMeta {
  label: EventCategory;
  colorClass: string;
}

export interface ImpactRow {
  label: string;
  value: ImpactProjection[keyof Omit<ImpactProjection, 'lastUpdated'>];
  icon: LucideIcon;
}

