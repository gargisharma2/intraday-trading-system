import { motion } from 'framer-motion';
import { AreaChart } from 'lucide-react';
import type { FragilityZonePoint } from './types';

interface FragilityZonesChartProps {
  points: FragilityZonePoint[];
}

const FragilityZonesChart = ({ points }: FragilityZonesChartProps) => {
  const width = 520;
  const height = 220;
  const padX = 40;
  const padY = 28;

  const xScale = (i: number) => padX + (i / (points.length - 1 || 1)) * (width - padX * 2);
  const yScale = (v: number) => height - padY - (v / 100) * (height - padY * 2);

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(i)} ${yScale(p.fragility)}`)
    .join(' ');

  const areaPath = `${linePath} L ${xScale(points.length - 1)} ${height - padY} L ${xScale(0)} ${height - padY} Z`;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-200"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.09 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-accent bg-opacity-10">
          <AreaChart className="w-5 h-5 text-accent" />
        </div>
        <h2 className="section-title mb-0">Fragility Zones Chart</h2>
      </div>

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[220px]">
          {/* zone bands */}
          <rect x={padX} y={yScale(100)} width={width - padX * 2} height={yScale(75) - yScale(100)} fill="#FEE2E2" />
          <rect x={padX} y={yScale(75)} width={width - padX * 2} height={yScale(50) - yScale(75)} fill="#FFEDD5" />
          <rect x={padX} y={yScale(50)} width={width - padX * 2} height={yScale(25) - yScale(50)} fill="#FEF9C3" />
          <rect x={padX} y={yScale(25)} width={width - padX * 2} height={yScale(0) - yScale(25)} fill="#DCFCE7" />

          {/* axes */}
          <line x1={padX} y1={height - padY} x2={width - padX} y2={height - padY} stroke="#9CA3AF" />
          <line x1={padX} y1={padY} x2={padX} y2={height - padY} stroke="#9CA3AF" />

          {/* area */}
          <motion.path
            d={areaPath}
            fill="#C08D4D"
            opacity="0.18"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 0.6 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="#C08D4D"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />

          {/* y labels */}
          {[0, 25, 50, 75, 100].map((v) => (
            <text key={v} x={padX - 10} y={yScale(v) + 3} textAnchor="end" fontSize="10" fill="#6B4E3A">
              {v}
            </text>
          ))}

          {/* x labels */}
          {[0, 10, 20, 29].map((m) => (
            <text
              key={m}
              x={xScale(Math.min(m, points.length - 1))}
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

      <div className="mt-4 grid grid-cols-4 gap-2 text-[11px] text-text-secondary">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-green-400" /> Stable
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-yellow-400" /> Watch
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-orange-400" /> Fragile
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-sm bg-red-400" /> Critical
        </div>
      </div>
    </motion.div>
  );
};

export default FragilityZonesChart;

