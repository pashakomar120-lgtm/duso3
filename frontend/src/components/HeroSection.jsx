import React from 'react';
import { Button } from './ui/button';
import { heroContent, heroImages } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, CheckCircle } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen pt-32 pb-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center min-h-[75vh]">
          {/* Left Content - 3 columns */}
          <div className="lg:col-span-3 space-y-8 fade-in-up">
            {/* Badge with glow */}
            <div className="inline-flex items-center gap-2 glass rounded-full px-5 py-2.5 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group cursor-pointer">
              <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-sm font-medium tracking-wider">
                {heroContent.badge}
              </span>
              <span className="text-emerald-500 text-xs px-2 py-0.5 bg-emerald-500/10 rounded-full">
                #1 в СНГ
              </span>
            </div>

            {/* Main Headline with glow effect */}
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                Создаём <span className="text-orange-500 text-glow-orange">Shopify</span> магазины
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <span className="text-white">которые </span>
                <span className="gradient-text">продают</span>
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                по всему <span className="text-emerald-500 text-glow-emerald">СНГ</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg max-w-xl">
              От идеи до запуска за <span className="text-white font-semibold">2-4 недели</span>. 
              Сертифицированный Shopify Partner с опытом <span className="text-orange-500 font-semibold">6500+</span> успешных проектов.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Shopify Plus Partner</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>98% довольных клиентов</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>Гарантия результата</span>
              </div>
            </div>

            {/* CTA Buttons with glow */}
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => navigate('/contact')}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 btn-glow rounded-xl"
                data-testid="hero-cta-primary"
              >
                Бесплатная консультация
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/portfolio')}
                className="glass border-2 border-white/10 text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 px-8 py-6 text-base font-medium transition-all duration-300 rounded-xl group"
                data-testid="hero-cta-secondary"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Смотреть кейсы
              </Button>
            </div>

            {/* Stats mini row */}
            <div className="flex gap-8 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">6500+</div>
                <div className="text-xs text-gray-500">Магазинов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-500">$3B+</div>
                <div className="text-xs text-gray-500">Оборот клиентов</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-xs text-gray-500">Стран СНГ</div>
              </div>
            </div>
          </div>

          {/* Right Content - 2 columns - Grid of images */}
          <div className="lg:col-span-2 relative hidden lg:block">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/4 right-0 w-[200px] h-[200px] bg-emerald-500/15 rounded-full blur-[80px]" />
            
            {/* Images Grid - No overlap */}
            <div className="relative grid grid-cols-2 gap-4">
              {/* Top row */}
              <div className="floating-card rounded-2xl overflow-hidden h-40 float" data-testid="hero-image-1">
                <img 
                  src={heroImages[0]} 
                  alt="E-commerce mockup 1" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="floating-card rounded-2xl overflow-hidden h-48 float-slow" style={{ animationDelay: '0.5s' }} data-testid="hero-image-2">
                <img 
                  src={heroImages[1]} 
                  alt="E-commerce mockup 2" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Bottom row */}
              <div className="floating-card rounded-2xl overflow-hidden h-48 float-fast" style={{ animationDelay: '1s' }} data-testid="hero-image-3">
                <img 
                  src={heroImages[2]} 
                  alt="E-commerce mockup 3" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="floating-card rounded-2xl overflow-hidden h-40 float" style={{ animationDelay: '1.5s' }} data-testid="hero-image-4">
                <img 
                  src={heroImages[3]} 
                  alt="E-commerce mockup 4" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 glass rounded-xl p-3 border border-emerald-500/30 float-slow">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">+340%</div>
                    <div className="text-gray-500 text-[10px]">Рост продаж</div>
                  </div>
                </div>
              </div>

              {/* Floating badge 2 */}
              <div className="absolute -top-4 -right-4 glass rounded-xl p-3 border border-orange-500/30 float">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">24/7</div>
                    <div className="text-gray-500 text-[10px]">Поддержка</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
