import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Database,
  Brain,
  CheckCircle,
  Calculator,
  Zap,
  Rocket,
  Clock,
  User,
  UserCheck,
  PieChart,
  Search,
  Activity,
  AlertTriangle,
  Globe,
  Gauge,
  SlidersHorizontal,
  ShieldCheck,
  ActivitySquare,
  Layers
} from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  path: string;
}

interface SidebarProps {
  onLoginClick: () => void;
}

const menuItems: MenuItem[] = [
  { id: 'home', label: 'Home', icon: Home, path: '/' },
  { id: 'user-suitability', label: 'User Suitability & Intraday Trade Matching Engine', icon: UserCheck, path: '/user-suitability' },
  { id: 'asset-allocation', label: 'Intraday Asset-Type Allocation & Market Regime Engine', icon: PieChart, path: '/asset-allocation' },
  { id: 'instrument-quality', label: '360° Intraday Instrument Research & Quality Engine', icon: Search, path: '/instrument-quality' },
  { id: 'behavioral-analysis', label: 'Intraday Mathematical DNA & Behavioral Analysis Engine', icon: Brain, path: '/behavioral-analysis' },
  { id: 'scenario-intelligence', label: 'Intraday Scenario Intelligence Engine', icon: Activity, path: '/scenario-intelligence' },
  { id: 'synthetic-risk', label: 'Synthetic Intraday Risk & Stress World Engine', icon: AlertTriangle, path: '/synthetic-risk' },
  { id: 'geopolitical-shock', label: 'Geopolitical & Global Shock Engine (Intraday Context)', icon: Globe, path: '/geopolitical-shock' },
  { id: 'intraday-fragility', label: 'Intraday Risk Understanding & Fragility Engine', icon: Gauge, path: '/intraday-fragility' },
  { id: 'engine-9', label: 'Intraday Rebalancing & Exposure Control', icon: SlidersHorizontal, path: '/engine-9' },
  { id: 'engine-10', label: 'Intraday Compliance & Ethics', icon: ShieldCheck, path: '/engine-10' },
  { id: 'engine-11', label: 'Internal Intraday Market (Synthetic Testing)', icon: ActivitySquare, path: '/engine-11' },
  { id: 'engine-12', label: 'Final Strategy & Trade Construction', icon: Layers, path: '/engine-12' },
  { id: 'dataset-cleaning', label: 'Dataset Cleaning Dashboard', icon: Database, path: '/dataset-cleaning' },
  { id: 'training', label: 'Training Dashboard', icon: Brain, path: '/training' },
  { id: 'evaluation', label: 'Evaluation Dashboard', icon: CheckCircle, path: '/evaluation' },
  { id: 'deployment', label: 'Deployment Dashboard', icon: Rocket, path: '/deployment' },
  { id: 'pre-market-dataset', label: 'Pre-Market Dataset Dashboard', icon: Clock, path: '/pre-market-dataset' },
];

const Sidebar = ({ onLoginClick }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const sidebarVariants = {
    hidden: { x: -320 },
    visible: {
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (index: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: index * 0.03,
        duration: 0.2
      }
    })
  };

  return (
    <motion.div
      className="w-84 h-screen bg-sidebar-bg shadow-2xl flex flex-col overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={sidebarVariants}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-sidebar-text border-opacity-20 flex-shrink-0">
        <h1 className="text-lg font-bold text-sidebar-text">Intraday AI Trading</h1>
        <p className="text-xs text-sidebar-text text-opacity-70 mt-1">System Dashboard</p>
      </div>

      {/* Menu Items - scrollable with custom thin scrollbar */}
      <div className="flex-1 py-2 overflow-y-auto scrollbar-thin">
        <div className="px-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={itemVariants}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavigation(item.path)}
                whileHover={{ scale: 1.02, x: 1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={14} className="mr-2 flex-shrink-0" />
                <span className="text-[11px] font-medium truncate leading-tight">{item.label}</span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Admin Login at Bottom */}
      <div className="px-3 py-2 border-t border-sidebar-text border-opacity-20 flex-shrink-0">
        <motion.button
          className="sidebar-item w-full"
          onClick={onLoginClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <User size={14} className="mr-2" />
          <span className="text-[11px] font-medium">Admin Login</span>
        </motion.button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        /* Firefox */
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
      `}</style>
    </motion.div>
  );
};

export default Sidebar;