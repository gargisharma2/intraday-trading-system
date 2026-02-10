import { motion } from 'framer-motion';
import type { StressScenario } from '../../dashboards/SyntheticRiskDashboard';

// Mock data generators for different scenarios
const generateTimelineData = (scenario: StressScenario) => {
  const data = [];
  const duration = 300; // 5 minutes in seconds

  for (let i = 0; i <= duration; i += 5) {
    let intensity = 0;

    switch (scenario) {
      case 'volatility-spike':
        // Sharp spike in the middle
        intensity = i > 120 && i < 180 ? Math.sin((i - 120) * Math.PI / 30) * 85 + 15 : 5;
        break;
      case 'liquidity-disappearance':
        // Gradual increase then sharp drop
        intensity = i < 150 ? i * 0.4 : Math.max(0, 60 - (i - 150) * 0.8);
        break;
      case 'slippage-explosion':
        // Multiple sharp spikes
        intensity = Math.sin(i * 0.1) * 20 + Math.sin(i * 0.3) * 30 + 25;
        intensity = Math.max(0, Math.min(100, intensity));
        break;
      case 'circuit-move':
        // Rapid directional change
        intensity = i < 120 ? 10 : i < 180 ? 80 : 5;
        break;
      case 'fast-reversal':
        // Sharp reversal pattern
        intensity = i < 120 ? 70 - i * 0.5 : Math.min(100, (i - 120) * 2);
        break;
    }

    data.push({
      time: i,
      intensity: Math.round(intensity),
      timeLabel: `${Math.floor(i / 60)}:${(i % 60).toString().padStart(2, '0')}`
    });
  }

  return data;
};

interface ShockTimelineChartProps {
  selectedScenario: StressScenario;
}

const ShockTimelineChart = ({ selectedScenario }: ShockTimelineChartProps) => {
  const data = generateTimelineData(selectedScenario);

  const scenarioTitles = {
    'volatility-spike': 'Volatility Spike Timeline',
    'liquidity-disappearance': 'Liquidity Crisis Timeline',
    'slippage-explosion': 'Slippage Cascade Timeline',
    'circuit-move': 'Circuit Breaker Timeline',
    'fast-reversal': 'Reversal Shock Timeline'
  };

  // Create SVG path for the line
  const width = 400;
  const height = 200;
  const padding = 40;

  const xScale = (time: number) => ((time / 300) * (width - 2 * padding)) + padding;
  const yScale = (intensity: number) => height - padding - ((intensity / 100) * (height - 2 * padding));

  const pathData = data.map((point, index) => {
    const x = xScale(point.time);
    const y = yScale(point.intensity);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <motion.div
      className="bg-white rounded-xl p-6 shadow-md border border-gray-200 flex flex-col"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="section-title mb-2">Shock Timeline</h3>
      <p className="text-sm text-text-secondary mb-4">{scenarioTitles[selectedScenario]}</p>

      <div className="w-full aspect-[2/1] flex items-center justify-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-hidden">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#E5E7EB" strokeWidth="0.5" opacity="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="#FAFAFA" />
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Reference lines */}
          <line x1={padding} y1={yScale(50)} x2={width - padding} y2={yScale(50)} stroke="#C08D4D" strokeWidth="1" strokeDasharray="5,5" opacity="0.9" />
          <line x1={padding} y1={yScale(80)} x2={width - padding} y2={yScale(80)} stroke="#EF4444" strokeWidth="1" strokeDasharray="3,3" opacity="0.7" />

          {/* Main shock line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#C08D4D"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Data points */}
          {data.filter((_, index) => index % 12 === 0).map((point) => (
            <circle
              key={point.time}
              cx={xScale(point.time)}
              cy={yScale(point.intensity)}
              r="3"
              fill="#C08D4D"
              opacity="0.7"
            />
          ))}

          {/* Axes */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#9CA3AF" strokeWidth="1" />

          {/* Axis labels */}
          <text x={width / 2} y={height - 10} textAnchor="middle" fill="#6B4E3A" fontSize="10">Time (seconds)</text>
          <text x={15} y={height / 2} textAnchor="middle" fill="#6B4E3A" fontSize="10" transform={`rotate(-90 15 ${height / 2})`}>Shock Intensity</text>
        </svg>
      </div>

      <div className="mt-4 flex justify-between text-xs text-text-secondary">
        <span>Shock Onset</span>
        <span>Peak Intensity</span>
        <span>Shock Decay</span>
      </div>
    </motion.div>
  );
};

export default ShockTimelineChart;