import type { ReactNode } from 'react';

interface StatusBadgeProps {
  label: string;
  colorClass: string; // e.g. 'bg-green-500'
  icon?: ReactNode;
}

const StatusBadge = ({ label, colorClass, icon }: StatusBadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-white ${colorClass}`}
    >
      {icon}
      {label}
    </span>
  );
};

export default StatusBadge;

