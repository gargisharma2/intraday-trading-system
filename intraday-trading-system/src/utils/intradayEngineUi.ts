export type AllowState = 'allowed' | 'restricted' | 'not_allowed';
export type GateState = 'pass' | 'restricted' | 'fail';

export function allowStateLabel(state: AllowState): string {
  switch (state) {
    case 'allowed':
      return 'Allowed';
    case 'restricted':
      return 'Restricted';
    case 'not_allowed':
      return 'Not allowed';
  }
}

export function allowStateColorClass(state: AllowState): string {
  switch (state) {
    case 'allowed':
      return 'bg-green-600';
    case 'restricted':
      return 'bg-amber-500';
    case 'not_allowed':
      return 'bg-red-600';
  }
}

export function gateStateLabel(state: GateState): string {
  switch (state) {
    case 'pass':
      return 'Pass';
    case 'restricted':
      return 'Restricted';
    case 'fail':
      return 'Fail';
  }
}

export function gateStateColorClass(state: GateState): string {
  switch (state) {
    case 'pass':
      return 'bg-green-600';
    case 'restricted':
      return 'bg-amber-500';
    case 'fail':
      return 'bg-red-600';
  }
}


