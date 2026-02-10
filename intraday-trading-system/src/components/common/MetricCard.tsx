interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
  stateColorClass?: string; // text color for value
}

const MetricCard = ({ label, value, helper, stateColorClass }: MetricCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 hover:bg-white hover:shadow-sm transition-all">
      <div className="text-xs font-medium text-text-secondary mb-1">{label}</div>
      <div className={`text-lg font-semibold ${stateColorClass ?? 'text-text-primary'}`}>{value}</div>
      {helper && <div className="text-[11px] text-text-secondary mt-1">{helper}</div>}
    </div>
  );
};

export default MetricCard;

