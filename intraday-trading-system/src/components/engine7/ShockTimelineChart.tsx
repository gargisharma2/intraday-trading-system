import { motion } from 'framer-motion';
import type { ShockTimelinePoint } from './types';

interface ShockTimelineChartProps {
  timeline: ShockTimelinePoint[];
}

const levelColor: Record<ShockTimelinePoint['riskLevel'], string> = {
  1: '#22C55E', // green
  2: '#EAB308', // yellow
  3: '#F97316', // orange
  4: '#EF4444', // red
  5: '#DC2626'  // deep red
};

const ShockTimelineChart = ({ timeline }: ShockTimelineChartProps) => {
  const width = 520;
  const height = 220;
  const padX = 40;
  const padY = 28;

  const xScale = (minute: number) => padX + (minute / (timeline.length - 1 || 1)) * (width - padX * 2);
  const yScale = (level: number) =>
    height - padY - ((level - 1) / 4) * (height - padY * 2);

  const path = timeline
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(p.riskLevel)}`)
    .join(' ');

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="section-title mb-4">Shock Timeline Chart</h2>

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[220px]">
          {/* grid */}
          <defs>
            <pattern id="e7grid" width="52" height="22" patternUnits="userSpaceOnUse">
              <path d="M 52 0 L 0 0 0 22" fill="none" stroke="#E5E7EB" strokeWidth="1" />
            </pattern>
          </defs>
          <rect x="0" y="0" width={width} height={height} fill="#FAFAFA" />
          <rect x="0" y="0" width={width} height={height} fill="url(#e7grid)" opacity="0.9" />

          {/* axes */}
          <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#9CA3AF" />
          <line x1={padX} y1={padY} x2={padX} y2={height - padY} stroke="#9CA3AF" />

          {/* y ticks 1-5 */}
          {[1, 2, 3, 4, 5].map((lvl) => (
            <g key={lvl}>
              <line
                x1={padX}
                y1={yScale(lvl)}
                x2={width - padX}
                y2={yScale(lvl)}
                stroke="#E5E7EB"
              />
              <text x={padX - 10} y={yScale(lvl) + 3} textAnchor="end" fontSize="10" fill="#6B4E3A">
                {lvl}
              </text>
            </g>
          ))}

          {/* line */}
          <motion.path
            d={path}
            fill="none"
            stroke="#C08D4D"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.1 }}
          />

          {/* colored points */}
          {timeline.map((p, i) => (
            <circle
              key={`${p.minute}-${i}`}
              cx={xScale(i)}
              cy={yScale(p.riskLevel)}
              r="3"
              fill={levelColor[p.riskLevel]}
              opacity="0.9"
            />
          ))}

          {/* x labels (minute-level) */}
          {[0, 10, 20, 29].map((m) => (
            <text
              key={m}
              x={xScale(Math.min(m, timeline.length - 1))}
              y={height - 8}
              textAnchor="middle"
              fontSize="10"
              fill="#6B4E3A"
            >
              {m}m
            </text>
          ))}
        </svg>
      </div>
    </motion.div>
  );
};

export default ShockTimelineChart;

