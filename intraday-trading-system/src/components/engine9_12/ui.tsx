import { motion } from 'framer-motion';

export type PastelTone = 'green' | 'amber' | 'red' | 'blue' | 'orange' | 'purple' | 'neutral';

export function pastelStyles(tone: PastelTone) {
  switch (tone) {
    case 'green':
      return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' };
    case 'amber':
      return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700' };
    case 'red':
      return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' };
    case 'blue':
      return { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700' };
    case 'orange':
      return { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700' };
    case 'purple':
      return { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700' };
    default:
      return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-text-secondary' };
  }
}

export const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
    <h2 className="section-title mb-4">{title}</h2>
    {children}
  </div>
);

export const Banner = ({
  label,
  tone,
  description
}: {
  label: string;
  tone: PastelTone;
  description?: string;
}) => {
  const s = pastelStyles(tone);
  return (
    <motion.div
      className={`rounded-xl border ${s.border} ${s.bg} p-4`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className={`text-sm font-semibold ${s.text}`}>{label}</div>
      {description && <div className="text-xs text-text-secondary mt-1">{description}</div>}
    </motion.div>
  );
};

export const SoftBadge = ({ label, tone }: { label: string; tone: PastelTone }) => {
  const s = pastelStyles(tone);
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full border text-[11px] font-semibold ${s.border} ${s.bg} ${s.text}`}>
      {label}
    </span>
  );
};

export const MiniLineChart = ({
  points,
  stroke = '#C08D4D'
}: {
  points: number[];
  stroke?: string;
}) => {
  const w = 320;
  const h = 90;
  const pad = 8;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const x = (i: number) => pad + (i / Math.max(1, points.length - 1)) * (w - pad * 2);
  const y = (v: number) => pad + (1 - (v - min) / Math.max(1e-6, max - min)) * (h - pad * 2);
  const path = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-[90px] rounded-lg bg-gray-50 border border-gray-200">
      <path d={path} fill="none" stroke={stroke} strokeWidth="2.5" />
    </svg>
  );
};

export const MiniDonut = ({
  slices
}: {
  slices: Array<{ label: string; value: number; color: string }>;
}) => {
  const r = 36;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg viewBox="0 0 100 100" className="w-24 h-24">
      <circle cx="50" cy="50" r={r} fill="transparent" stroke="#E5E7EB" strokeWidth="14" />
      {slices.map((s) => {
        const slice = (s.value / 100) * c;
        const el = (
          <circle
            key={s.label}
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
            stroke={s.color}
            strokeWidth="14"
            strokeDasharray={`${slice} ${c - slice}`}
            strokeDashoffset={-acc}
          />
        );
        acc += slice;
        return el;
      })}
    </svg>
  );
};

export const Meter = ({ value }: { value: number }) => {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
        <motion.div
          className="h-3 rounded-full"
          style={{ background: 'linear-gradient(90deg,#4ade80 0%,#facc15 35%,#fb923c 65%,#ef4444 100%)' }}
          initial={{ width: 0 }}
          animate={{ width: `${v}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[11px] text-text-secondary">
        <span>Low</span>
        <span>Med</span>
        <span>High</span>
        <span>Max</span>
      </div>
    </div>
  );
};

