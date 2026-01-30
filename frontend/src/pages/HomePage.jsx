import React from 'react';
import HeroSection from '../components/HeroSection';
import ScrollingText from '../components/ScrollingText';
import ServicesSection from '../components/ServicesSection';
import WhoWeWorkWith from '../components/WhoWeWorkWith';
import ProcessSection from '../components/ProcessSection';
import RatingsSection from '../components/RatingsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TrustedBySection from '../components/TrustedBySection';
import StatsSection from '../components/StatsSection';
import CaseStudiesSection from '../components/CaseStudiesSection';
import AwardsSection from '../components/AwardsSection';
import CTASection from '../components/CTASection';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ScrollingText />
      <ServicesSection />
      <WhoWeWorkWith />
      <ProcessSection />
      <RatingsSection />
      <TestimonialsSection />
      <TrustedBySection />
      <StatsSection />
      <CaseStudiesSection />
      <AwardsSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
