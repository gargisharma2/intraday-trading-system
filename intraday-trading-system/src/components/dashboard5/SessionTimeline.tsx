import { motion } from 'framer-motion';

interface SessionTimelineProps {
  currentMinute: number;
}

const SessionTimeline = ({ currentMinute }: SessionTimelineProps) => {
  // Mock session data - represents a 6.5 hour trading session (390 minutes)
  const totalMinutes = 390;
  const phases = [
    { name: 'Pre-Open', duration: 30, color: '#9CA3AF' },
    { name: 'Open Volatility', duration: 60, color: '#EF4444' },
    { name: 'Trend Phase', duration: 120, color: '#10B981' },
    { name: 'Consolidation', duration: 90, color: '#F59E0B' },
    { name: 'Late Session', duration: 90, color: '#8B5CF6' },
  ];

  const getPhaseAtMinute = (minute: number) => {
    let cumulativeMinutes = 0;
    for (const phase of phases) {
      if (minute <= cumulativeMinutes + phase.duration) {
        return phase;
      }
      cumulativeMinutes += phase.duration;
    }
    return phases[phases.length - 1];
  };

  const currentPhase = getPhaseAtMinute(currentMinute);
  const progressPercentage = (currentMinute / totalMinutes) * 100;

  return (
    <div className="rounded-xl shadow-md bg-white p-6 w-full h-full flex flex-col">
      <h3 className="text-xl font-semibold text-text-primary mb-6">Session Timeline</h3>

      {/* Current Phase Indicator */}
      <motion.div
        className="flex items-center justify-between mb-6 p-3 bg-accent bg-opacity-5 rounded-lg border border-accent border-opacity-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full mr-3"
            style={{ backgroundColor: currentPhase.color }}
          ></div>
          <span className="text-sm font-medium text-text-primary">
            Current Phase: {currentPhase.name}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          {currentMinute} min elapsed
        </span>
      </motion.div>

      {/* Timeline Visualization */}
      <div className="w-full mb-6 flex-shrink-0">
        <div className="relative mb-3">
          <div className="flex h-10 bg-gray-200 rounded-full overflow-hidden">
            {phases.map((phase, index) => {
              const phaseWidth = (phase.duration / totalMinutes) * 100;
              return (
                <motion.div
                  key={phase.name}
                  className="h-full relative"
                  style={{ backgroundColor: phase.color, width: `${phaseWidth}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                />
              );
            })}
          </div>

          {/* Progress marker */}
          <motion.div
            className="absolute top-0 h-10 w-1 bg-accent rounded-full shadow-lg"
            style={{ left: `${progressPercentage}%` }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </div>

        {/* Time markers */}
        <div className="flex justify-between text-sm text-text-secondary">
          <span>9:30</span>
          <span>12:00</span>
          <span>2:30</span>
          <span>4:00</span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        {phases.map((phase) => (
          <div key={phase.name} className="flex items-center">
            <div
              className="w-4 h-4 rounded mr-2 flex-shrink-0"
              style={{ backgroundColor: phase.color }}
            />
            <span className="text-sm text-text-primary truncate">{phase.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SessionTimeline;