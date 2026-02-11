import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Dashboard Components
import HomeDashboard from '../dashboards/HomeDashboard';
import UserSuitabilityDashboard from '../dashboards/UserSuitabilityDashboard';
import AssetAllocationDashboard from '../dashboards/AssetAllocationDashboard';
import InstrumentQualityDashboard from '../dashboards/InstrumentQualityDashboard';
import BehavioralAnalysisDashboard from '../dashboards/BehavioralAnalysisDashboard';
import IntradayScenarioDashboard from '../dashboards/IntradayScenarioDashboard';
import SyntheticRiskDashboard from '../dashboards/SyntheticRiskDashboard';
import GeopoliticalShockEngine from '../dashboards/GeopoliticalShockEngine';
import IntradayFragilityEngine from '../dashboards/IntradayFragilityEngine';
import Engine9RebalancingExposure from '../dashboards/Engine9RebalancingExposure';
import Engine10ComplianceEthics from '../dashboards/Engine10ComplianceEthics';
import Engine11SyntheticTestingMarket from '../dashboards/Engine11SyntheticTestingMarket';
import Engine12FinalStrategyConstruction from '../dashboards/Engine12FinalStrategyConstruction';
// Removed: MarketDataDashboard, TechnicalAnalysisDashboard, PriceActionDashboard,
// NewsSentimentDashboard, MicrostructureDashboard, RiskManagementDashboard, ComplianceDashboard
import DatasetCleaningDashboard from '../dashboards/DatasetCleaningDashboard';
import TrainingDashboard from '../dashboards/TrainingDashboard';
import EvaluationDashboard from '../dashboards/EvaluationDashboard';
import DeploymentDashboard from '../dashboards/DeploymentDashboard';
import PreMarketDatasetDashboard from '../dashboards/PreMarketDatasetDashboard';

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeDashboard />} />
          <Route path="/user-suitability" element={<UserSuitabilityDashboard />} />
          <Route path="/asset-allocation" element={<AssetAllocationDashboard />} />
          <Route path="/instrument-quality" element={<InstrumentQualityDashboard />} />
          <Route path="/behavioral-analysis" element={<BehavioralAnalysisDashboard />} />
          <Route path="/scenario-intelligence" element={<IntradayScenarioDashboard />} />
          <Route path="/synthetic-risk" element={<SyntheticRiskDashboard />} />
          <Route path="/geopolitical-shock" element={<GeopoliticalShockEngine />} />
          <Route path="/intraday-fragility" element={<IntradayFragilityEngine />} />
          <Route path="/engine-9" element={<Engine9RebalancingExposure />} />
          <Route path="/engine-10" element={<Engine10ComplianceEthics />} />
          <Route path="/engine-11" element={<Engine11SyntheticTestingMarket />} />
          <Route path="/engine-12" element={<Engine12FinalStrategyConstruction />} />
          {/* Removed legacy dashboards: market-data, technical-analysis, price-action,
              news-sentiment, microstructure, risk-management, compliance */}
          <Route path="/dataset-cleaning" element={<DatasetCleaningDashboard />} />
          <Route path="/training" element={<TrainingDashboard />} />
          <Route path="/evaluation" element={<EvaluationDashboard />} />
          <Route path="/deployment" element={<DeploymentDashboard />} />
          <Route path="/pre-market-dataset" element={<PreMarketDatasetDashboard />} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;