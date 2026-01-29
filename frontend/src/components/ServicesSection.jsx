import React, { useState } from 'react';
import { services } from '../data/mockData';
import { ArrowRight, Gift, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState(services[0]?.id || 'design');
  const navigate = useNavigate();

  const currentService = services.find(s => s.id === activeService) || services[0];

  // Dynamic icon component
  const IconComponent = LucideIcons[currentService.icon] || LucideIcons.Box;

  return (
    <section id="services" className="py-24 relative z-10">
      {/* Section background with glass effect */}
      <div className="absolute inset-0 glass-strong opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            Наши услуги
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Мы <span className="text-orange-500 text-glow-orange">создаём</span> успешные магазины
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Выберите услугу и узнайте, как мы можем помочь вашему бизнесу расти
          </p>
        </div>

        {/* Service Tabs - Scrollable */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {services.slice(0, 6).map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              data-testid={`service-tab-${service.id}`}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeService === service.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                  : 'glass text-gray-400 hover:text-white hover:border-orange-500/30 border border-transparent'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content - Service Info */}
          <div className="space-y-6 floating-card p-8 rounded-2xl">
            {/* Icon and title */}
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  {currentService.subtitle}
                </h3>
                <p className="text-orange-500 text-sm font-medium mt-1">
                  {currentService.price}
                </p>
              </div>
            </div>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              {currentService.fullDescription || currentService.description}
            </p>

            {/* Benefits */}
            {currentService.benefits && (
              <div className="space-y-3">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Что вы получите:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentService.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gift Banner */}
            {currentService.gift && (
              <div className="relative overflow-hidden rounded-xl p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl" />
                <div className="flex items-start gap-3 relative">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-emerald-500 font-bold text-sm">{currentService.gift.title}</div>
                    <div className="text-white text-sm">{currentService.gift.description}</div>
                    <div className="text-gray-500 text-xs mt-1">Стоимость: {currentService.gift.value}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4">
            {currentService.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl floating-card hover:border-orange-500/30 transition-all duration-300 group cursor-pointer card-shine"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-emerald-500 group-hover:scale-150 transition-transform" />
                <span className="text-white text-lg group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300">
                  {feature}
                </span>
              </div>
            ))}

            {/* Link Button */}
            <button
              onClick={() => navigate('/services')}
              data-testid="services-view-all"
              className="inline-flex items-center gap-2 mt-6 text-orange-500 hover:text-white font-medium transition-colors duration-300 group"
            >
              <span className="neon-underline">
                Все услуги и цены
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
