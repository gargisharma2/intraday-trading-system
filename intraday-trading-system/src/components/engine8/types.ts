export type FragilityState = 'Stable' | 'Watch' | 'Fragile' | 'Critical';

export interface FragilityStateSnapshot {
  fragilityIndex: number; // 0-100
  fragilityState: FragilityState;
  failureSpeed: number; // 0-100
  threshold: 1 | 2 | 3;
  lastUpdated: string;
}

export interface FragilityZonePoint {
  minute: number;
  fragility: number; // 0-100
}

export interface ContributingFactorRow {
  id: 'instrument-fragility' | 'behavioral-instability' | 'scenario-fragility' | 'stress-sensitivity' | 'global-shock-pressure';
  label: string;
  score: number; // 0-100
  direction: 'up' | 'down';
  explanation: string;
}

export type HealthAlertState = FragilityState;

export interface HealthAlert {
  state: HealthAlertState;
  instruction: string;
}

export type FailureSegmentId =
  | 'liquidity-collapse'
  | 'spread-explosion'
  | 'volatility-jump'
  | 'behavioral-reversal'
  | 'shock-triggered-failure';

export interface FailureSegment {
  id: FailureSegmentId;
  label: string;
  weight: number; // 0-100
}

export interface FailurePointMap {
  segments: FailureSegment[];
  mostLikely: FailureSegmentId;
}

