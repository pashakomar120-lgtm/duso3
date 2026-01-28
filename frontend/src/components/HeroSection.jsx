import React, { useState } from 'react';
import { Button } from './ui/button';
import { heroContent, heroImages } from '../data/mockData';
import { Info } from 'lucide-react';
import QuoteModal from './QuoteModal';
import CallModal from './CallModal';

const HeroSection = () => {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);

  return (
    <>
      <section className="min-h-screen bg-[#0a0a0b] pt-24 pb-16 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#0a0a0b] to-[#111827] opacity-80" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#1e293b] rounded-md px-4 py-2">
                <div className="w-6 h-6 bg-[#f97316] rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">E</span>
                </div>
                <span className="text-white text-sm font-medium tracking-wider">
                  {heroContent.badge}
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                  {heroContent.title[0]}
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                  <span className="text-white">{heroContent.title[1]} </span>
                  <span className="text-[#f97316]">{heroContent.title[2]}</span>
                </h1>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                  {heroContent.title[3]}
                </h1>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-lg flex items-center flex-wrap gap-1">
                {heroContent.description}{' '}
                <span className="text-white font-semibold">{heroContent.highlightText}</span>{' '}
                <span className="text-[#10b981] font-bold">{heroContent.brandName}</span>{' '}
                {heroContent.descriptionEnd}
                <Info className="w-5 h-5 text-gray-500 ml-2 cursor-pointer hover:text-white transition-colors" />
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setQuoteModalOpen(true)}
                  className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105"
                >
                  Получить предложение
                </Button>
                <Button
                  onClick={() => setCallModalOpen(true)}
                  className="bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white px-8 py-6 text-base font-medium transition-all duration-300"
                >
                  Запланировать звонок
                </Button>
              </div>
            </div>

            {/* Right Content - Floating Images */}
            <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
              {/* Main floating images */}
              <div 
                className="absolute top-0 right-0 w-72 h-48 rounded-xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              >
                <img 
                  src={heroImages[0]} 
                  alt="E-commerce mockup 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="absolute top-20 right-32 w-80 h-52 rounded-xl overflow-hidden shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 z-10"
                style={{ animation: 'float 7s ease-in-out infinite 0.5s' }}
              >
                <img 
                  src={heroImages[1]} 
                  alt="E-commerce mockup 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="absolute bottom-32 right-8 w-64 h-44 rounded-xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                style={{ animation: 'float 5s ease-in-out infinite 1s' }}
              >
                <img 
                  src={heroImages[2]} 
                  alt="E-commerce mockup 3" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div 
                className="absolute bottom-10 right-48 w-56 h-40 rounded-xl overflow-hidden shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 z-20"
                style={{ animation: 'float 6s ease-in-out infinite 1.5s' }}
              >
                <img 
                  src={heroImages[3]} 
                  alt="E-commerce mockup 4" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Floating animation keyframes */}
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
            50% { transform: translateY(-20px) rotate(var(--rotation, 0deg)); }
          }
        `}</style>
      </section>

      <QuoteModal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)} />
      <CallModal isOpen={callModalOpen} onClose={() => setCallModalOpen(false)} />
    </>
  );
};

export default HeroSection;