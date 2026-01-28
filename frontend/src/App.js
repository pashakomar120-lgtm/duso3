import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ScrollingText from "./components/ScrollingText";
import ServicesSection from "./components/ServicesSection";
import RatingsSection from "./components/RatingsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import TrustedBySection from "./components/TrustedBySection";
import StatsSection from "./components/StatsSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import AwardsSection from "./components/AwardsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0b]">
      <Header />
      <HeroSection />
      <ScrollingText />
      <ServicesSection />
      <RatingsSection />
      <TestimonialsSection />
      <TrustedBySection />
      <StatsSection />
      <CaseStudiesSection />
      <AwardsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;