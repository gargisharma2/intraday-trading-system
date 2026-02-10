interface AlertTagProps {
  label: string;
  colorClass: string; // e.g. 'bg-[#facc15] text-white'
}

const AlertTag = ({ label, colorClass }: AlertTagProps) => {
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${colorClass}`}
    >
      {label}
    </span>
  );
};

export default AlertTag;

