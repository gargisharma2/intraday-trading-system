import { motion } from 'framer-motion';
import SessionTimeline from '../components/dashboard5/SessionTimeline';
import ScenarioPaths from '../components/dashboard5/ScenarioPaths';
import ActivePhaseCard from '../components/dashboard5/ActivePhaseCard';
import ScenarioProbabilityCard from '../components/dashboard5/ScenarioProbabilityCard';

const IntradayScenarioDashboard = () => {
  // Mock current minute in the trading session (out of 390 minutes = 6.5 hours)
  const currentMinute = 180; // Mock: 3 hours into the session

  return (
    <div className="flex flex-col h-screen overflow-hidden px-8 pt-6 pb-6 bg-page-bg">
      <div className="max-w-7xl mx-auto w-full h-full flex flex-col">
        {/* Dashboard Title */}
        <motion.div
          className="mb-6 flex-shrink-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Intraday Scenario Intelligence Engine</h1>
        </motion.div>

        {/* Main Content - scrollable with equal card sizes */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Row 1, Col 1 - Session Timeline */}
            <div className="flex">
              <SessionTimeline currentMinute={currentMinute} />
            </div>

            {/* Row 1, Col 2 - Scenario Paths */}
            <div className="flex">
              <ScenarioPaths />
            </div>

            {/* Row 2, Col 1 - Active Intraday Phase */}
            <div className="flex">
              <ActivePhaseCard />
            </div>

            {/* Row 2, Col 2 - Scenario Probability Matrix */}
            <div className="flex">
              <ScenarioProbabilityCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntradayScenarioDashboard;