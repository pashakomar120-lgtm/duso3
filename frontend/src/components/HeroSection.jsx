import React from 'react';
import { Button } from './ui/button';
import { heroContent, heroImages } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-24 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 fade-in-up">
            {/* Badge with glow */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group cursor-pointer">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium tracking-wider">
                {heroContent.badge}
              </span>
            </div>

            {/* Main Headline with glow effect */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                {heroContent.title[0]}
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight">
                <span className="text-white">{heroContent.title[1]} </span>
                <span className="text-orange-500 text-glow-orange">{heroContent.title[2]}</span>
              </h1>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                {heroContent.title[3]}
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg flex items-center flex-wrap gap-1">
              {heroContent.description}{' '}
              <span className="text-white font-semibold">{heroContent.highlightText}</span>{' '}
              <span className="text-emerald-500 font-bold text-glow-emerald">{heroContent.brandName}</span>{' '}
              {heroContent.descriptionEnd}
            </p>

            {/* CTA Buttons with glow */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 btn-glow rounded-xl"
                data-testid="hero-cta-primary"
              >
                Получить предложение
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={() => navigate('/portfolio')}
                className="bg-transparent border-2 border-emerald-500/50 text-emerald-500 hover:bg-emerald-500/10 hover:border-emerald-500 px-8 py-6 text-base font-medium transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20 rounded-xl"
                data-testid="hero-cta-secondary"
              >
                Смотреть портфолио
              </Button>
            </div>

            {/* Stats mini row */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">6500+</div>
                <div className="text-xs text-gray-500">Магазинов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-500">98%</div>
                <div className="text-xs text-gray-500">Довольны</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$3B+</div>
                <div className="text-xs text-gray-500">Оборот</div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Images with glass effect */}
          <div className="relative h-[500px] lg:h-[600px] hidden lg:block">
            {/* Decorative glowing orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            
            {/* Main floating images with glass frames */}
            <div 
              className="absolute top-0 right-0 w-72 h-48 rounded-2xl overflow-hidden floating-card transform rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 float"
            >
              <img 
                src={heroImages[0]} 
                alt="E-commerce mockup 1" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div 
              className="absolute top-20 right-32 w-80 h-52 rounded-2xl overflow-hidden floating-card transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 z-10 float-slow"
              style={{ animationDelay: '0.5s' }}
            >
              <img 
                src={heroImages[1]} 
                alt="E-commerce mockup 2" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div 
              className="absolute bottom-32 right-8 w-64 h-44 rounded-2xl overflow-hidden floating-card transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 float-fast"
              style={{ animationDelay: '1s' }}
            >
              <img 
                src={heroImages[2]} 
                alt="E-commerce mockup 3" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <div 
              className="absolute bottom-10 right-48 w-56 h-40 rounded-2xl overflow-hidden floating-card transform -rotate-3 hover:rotate-0 transition-all duration-500 hover:scale-105 z-20 float"
              style={{ animationDelay: '1.5s' }}
            >
              <img 
                src={heroImages[3]} 
                alt="E-commerce mockup 4" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating tech elements */}
            <div className="absolute top-10 left-0 w-16 h-16 rounded-xl glass border border-orange-500/20 flex items-center justify-center float-slow">
              <span className="text-2xl">🚀</span>
            </div>
            <div className="absolute bottom-20 left-10 w-14 h-14 rounded-xl glass border border-emerald-500/20 flex items-center justify-center float" style={{ animationDelay: '2s' }}>
              <span className="text-xl">💎</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
