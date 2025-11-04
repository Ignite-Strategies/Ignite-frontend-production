import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ActivationProvider } from './context/ActivationContext';
import Sidebar from './components/Sidebar';

// ScrollToTop component to fix scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Pages
import ProposalPage from './pages/proposals/ProposalPage';
import ProposalsList from './pages/proposals/ProposalsList';
import ServiceLibrary from './pages/proposals/ServiceLibrary';
import ProposalBuilder from './pages/proposals/ProposalBuilder';
import AssessmentIntro from './pages/assessment/AssessmentIntro';
import Splash from './pages/Splash';
import Signup from './pages/auth/Signup';
import Signin from './pages/auth/Signin';
import Profilesetup from './pages/setup/Profilesetup';
import CompanyProfile from './pages/company/CompanyProfile';
// Legacy routes - kept for backwards compatibility
import CompanyCreateOrChoose from './pages/setup/CompanyCreateOrChoose';
import JoinCompany from './pages/company/JoinCompany';
import Cost from './pages/assessment/Cost';
import Human from './pages/assessment/Human';
import BDPipeline from './pages/setup/BDPipeline';
import Pipeline from './pages/bd-gen/Pipeline';
import CompanyDashboard from './pages/company/CompanyDashboard';
import Assessment from './pages/assessment/Assessment';
import AssessmentResults from './pages/assessment/AssessmentResults';
import Revenue from './pages/assessment/Revenue';
import RevenueTotalOutlook from './pages/assessment/RevenueTotalOutlook';
import HumanCapital from './pages/assessment/HumanCapital';
import HumanCapitalTotalOutlook from './pages/assessment/HumanCapitalTotalOutlook';
import TargetAcquisition from './pages/assessment/TargetAcquisition';
import BDAssessmentTotalOutlook from './pages/assessment/BDAssessmentTotalOutlook';
import GrowthDashboard from './pages/GrowthDashboard';
import Ecosystem from './pages/setup/Ecosystem';
import Persona from './pages/setup/Persona';
import AdsHub from './pages/ads/AdsHub';
import AdsDashboard from './pages/ads/AdsDashboard';
import AdPreview from './pages/ads/AdPreview';
import CampaignCreate from './pages/ads/CampaignCreate';
import Seo from './pages/attract/Seo';
import Content from './pages/attract/Content';
import BlogPotentials from './pages/attract/BlogPotentials';
import BlogEditor from './pages/attract/BlogEditor';
import BrandingHub from './pages/attract/BrandingHub';
import AdamColePersonalBranding from './pages/attract/components/branding/AdamColePersonalBranding';
import AttractHub from './pages/attract/AttractHub';
import Events from './pages/events/Events';
import OutreachHome from './pages/outreach/OutreachHome';
import CampaignCreator from './pages/outreach/CampaignCreator';
import CampaignPreview from './pages/outreach/CampaignPreview';
import CampaignSuccess from './pages/outreach/CampaignSuccess';
import CampaignAnalytics from './pages/outreach/CampaignAnalytics';
import IndividualEmail from './pages/outreach/IndividualEmail';
import Templates from './pages/outreach/Templates';
import TemplateView from './pages/outreach/TemplateView';
import GrowthCostOutlook from './pages/assessment/GrowthCostOutlook';
import RevenueToTargetOutlook from './pages/assessment/RevenueToTargetOutlook';
import BDBaselineAssessment from './pages/assessment/BDBaselineAssessment';
import BDBaselineResults from './pages/assessment/BDBaselineResults';
import Settings from './pages/Settings';
import BDPipelineRoadmap from './pages/bd-gen/BDPipelineRoadmap';
import Personas from './pages/personas/Personas';
import PersonaBuilder from './pages/personas/PersonaBuilder';
import CloseDeals from './pages/proposals/CloseDeals';
import MeetingDashboard from './pages/meetings/MeetingDashboard';
import MeetingFeedbackForm from './pages/meetings/MeetingFeedbackForm';
import Insights from './pages/Insights';

function App() {
  return (
    <ActivationProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex">
          <Sidebar />
          <div className="flex-1 ml-64">
            <Routes>
          {/* Entry Point - Splash checks Firebase auth and routes accordingly */}
          <Route path="/" element={<Splash />} />
          <Route path="/splash" element={<Splash />} />
          
          {/* Auth Routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          
          {/* Hydration Home - Central routing hub (TODO: create component) */}
          {/* <Route path="/hydration-home" element={<HydrationHome />} /> */}
          
          {/* Onboarding Routes */}
          <Route path="/profilesetup" element={<Profilesetup />} />
          <Route path="/companyprofile" element={<CompanyProfile />} />
          
          {/* Main Dashboard */}
          <Route path="/growth-dashboard" element={<GrowthDashboard />} />
          <Route path="/companydashboard" element={<CompanyDashboard />} />
          <Route path="/proposals" element={<ProposalsList />} />
          <Route path="/proposals/service-library" element={<ServiceLibrary />} />
          <Route path="/proposals/create" element={<ProposalBuilder />} />
          <Route path="/proposals/edit/:proposalId" element={<ProposalBuilder />} />
          <Route path="/proposals/:clientId" element={<ProposalPage />} />
          <Route path="/close-deals" element={<CloseDeals />} />
          <Route path="/assessment-intro" element={<AssessmentIntro />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
        <Route path="/revenue" element={<Revenue />} />
        <Route path="/revenue-total-outlook" element={<RevenueTotalOutlook />} />
        <Route path="/human-capital" element={<HumanCapital />} />
        <Route path="/human-capital-total-outlook" element={<HumanCapitalTotalOutlook />} />
        <Route path="/target-acquisition" element={<TargetAcquisition />} />
        <Route path="/bd-assessment-total-outlook" element={<BDAssessmentTotalOutlook />} />
        <Route path="/growth-dashboard" element={<GrowthDashboard />} />
        <Route path="/setup/ecosystem" element={<Ecosystem />} />
        <Route path="/persona" element={<Persona />} />
        <Route path="/personas" element={<Personas />} />
        <Route path="/personas/builder" element={<PersonaBuilder />} />
        <Route path="/bdpipeline" element={<Pipeline />} />
        <Route path="/ads" element={<AdsHub />} />
        <Route path="/ads/dashboard" element={<AdsDashboard />} />
        <Route path="/ads/campaign/:campaignId" element={<AdPreview />} />
        <Route path="/ads/create" element={<CampaignCreate />} />
        <Route path="/ads/tools" element={<AdsDashboard />} />
        <Route path="/attract" element={<AttractHub />} />
        <Route path="/seo" element={<Seo />} />
        <Route path="/content" element={<Content />} />
        <Route path="/content/blog-potentials" element={<BlogPotentials />} />
        <Route path="/content/blog-editor" element={<BlogEditor />} />
        <Route path="/branding-hub" element={<BrandingHub />} />
        <Route path="/branding-hub/adam-cole" element={<AdamColePersonalBranding />} />
        <Route path="/events" element={<Events />} />
        <Route path="/outreach" element={<OutreachHome />} />
        <Route path="/meetings" element={<MeetingDashboard />} />
        <Route path="/meetings/feedback/:id" element={<MeetingFeedbackForm />} />
        <Route path="/outreach/campaign-creator" element={<CampaignCreator />} />
        <Route path="/outreach/campaign-preview" element={<CampaignPreview />} />
        <Route path="/outreach/campaign-success" element={<CampaignSuccess />} />
        <Route path="/outreach/analytics" element={<CampaignAnalytics />} />
        <Route path="/outreach/individual-email" element={<IndividualEmail />} />
        <Route path="/outreach/templates" element={<Templates />} />
        <Route path="/outreach/templates/:templateId" element={<TemplateView />} />
        <Route path="/growth-cost-outlook" element={<GrowthCostOutlook />} />
        <Route path="/revenue-target-outlook" element={<RevenueToTargetOutlook />} />
        <Route path="/bd-baseline-assessment" element={<BDBaselineAssessment />} />
        <Route path="/bd-baseline-results" element={<BDBaselineResults />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/roadmap" element={<BDPipelineRoadmap />} />
        <Route path="/insights" element={<Insights />} />
        
        {/* Legacy/Deprecated Routes - kept for backwards compatibility */}
        <Route path="/companycreateorchoose" element={<CompanyCreateOrChoose />} />
        <Route path="/joincompany" element={<JoinCompany />} />
          <Route path="/cost" element={<Cost />} />
          <Route path="/human" element={<Human />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ActivationProvider>
  );
}

export default App;

