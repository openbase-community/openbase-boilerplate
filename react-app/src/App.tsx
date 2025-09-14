import {
  AnonymousRoute,
  AuthChangeRedirector,
  AuthContextProvider,
} from "openbase-react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Assets from "./pages/Assets";
import Build from "./pages/Build";
import Compliance from "./pages/Compliance";
import ComprehensiveReport from "./pages/ComprehensiveReport";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Entities from "./pages/Entities";
import FamilyInfo from "./pages/FamilyInfo";
import Forecasting from "./pages/Forecasting";
import Housing from "./pages/Housing";
import Login from "./pages/Login";
import Marketing from "./pages/Marketing";
import MedicalTrajectory from "./pages/MedicalTrajectory";
import MockModelExplainer from "./pages/MockModelExplainer";
import NotFound from "./pages/NotFound";
import PremiumMedicalTrajectory from "./pages/PremiumMedicalTrajectory";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Protect from "./pages/Protect";
import ProtectOverview from "./pages/ProtectOverview";
import Resources from "./pages/Resources";
import SamplePlan from "./pages/SamplePlan";
import Search from "./pages/Search";
import Settings from "./pages/Settings";
import Setup from "./pages/Setup";
import SetupMock from "./pages/SetupMock";
import TermsOfService from "./pages/TermsOfService";
import Validate from "./pages/Validate";
import ValidateBranch from "./pages/ValidateBranch";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Marketing />} />
      <Route path="/sample-plan" element={<SamplePlan />} />
      <Route
        path="/account/login"
        element={
          <AnonymousRoute>
            <Login />
          </AnonymousRoute>
        }
      />
      <Route path="/protect" element={<Protect />} />
      <Route path="/protect/overview" element={<ProtectOverview />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/setup" element={<Setup />} />
      <Route path="/setup-mock" element={<SetupMock />} />
      <Route path="/mock-model-explainer" element={<MockModelExplainer />} />
      <Route path="/dashboard/family-info" element={<FamilyInfo />} />
      <Route path="/dashboard/forecasting" element={<Forecasting />} />
      <Route path="/dashboard/assets" element={<Assets />} />
      <Route path="/dashboard/compliance" element={<Compliance />} />
      <Route path="/dashboard/housing" element={<Housing />} />
      <Route
        path="/dashboard/medical-trajectory"
        element={<MedicalTrajectory />}
      />
      <Route
        path="/dashboard/premium-medical-trajectory"
        element={<PremiumMedicalTrajectory />}
      />
      <Route path="/dashboard/search" element={<Search />} />
      <Route path="/dashboard/build" element={<Build />} />
      <Route path="/dashboard/validate" element={<Validate />} />
      <Route
        path="/dashboard/validate/branch/:snapshotId"
        element={<ValidateBranch />}
      />
      <Route path="/dashboard/resources" element={<Resources />} />
      <Route path="/dashboard/entities" element={<Entities />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route
        path="/dashboard/comprehensive-report"
        element={<ComprehensiveReport />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <QuickstartProvider>
          <AuthChangeRedirector>
            <AppRoutes />
          </AuthChangeRedirector>
        </QuickstartProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
