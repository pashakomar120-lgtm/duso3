import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ResourcesPage from "./pages/ResourcesPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import AnimatedBackground from "./components/AnimatedBackground";
import AIAssistant from "./components/AIAssistant";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "./components/ui/toaster";

// Admin imports
import { AuthProvider, useAuth } from "./context/AuthContext";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeadsPage from "./pages/admin/AdminLeadsPage";
import AdminCallsPage from "./pages/admin/AdminCallsPage";
import AdminLiveChatsPage from "./pages/admin/AdminLiveChatsPage";
import AdminAIConversationsPage from "./pages/admin/AdminAIConversationsPage";

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    window.location.href = '/admin/login';
    return null;
  }
  
  return children;
};

// Main site layout
const MainSiteLayout = ({ children }) => {
  return (
    <>
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <AIAssistant />
    </>
  );
};

// App content with routing
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute><AdminDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/leads" element={
          <ProtectedRoute><AdminLeadsPage /></ProtectedRoute>
        } />
        <Route path="/admin/calls" element={
          <ProtectedRoute><AdminCallsPage /></ProtectedRoute>
        } />
        <Route path="/admin/livechats" element={
          <ProtectedRoute><AdminLiveChatsPage /></ProtectedRoute>
        } />
        <Route path="/admin/ai-conversations" element={
          <ProtectedRoute><AdminAIConversationsPage /></ProtectedRoute>
        } />
      </Routes>
    );
  }

  return (
    <MainSiteLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </MainSiteLayout>
  );
};

function App() {
  return (
    <div className="App relative">
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <AppContent />
          <Toaster />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
