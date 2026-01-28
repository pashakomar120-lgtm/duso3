import React, { useState } from 'react';
import { services } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  const [activeService, setActiveService] = useState('make');

  const currentService = services.find(s => s.id === activeService);

  return (
    <section className="bg-[#0a0a0b] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Tabs */}
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">We</h2>
          <div className="flex gap-2">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-[#3b82f6] text-white'
                    : 'bg-[#1e293b] text-gray-400 hover:bg-[#2d3a4f] hover:text-white'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>

        {/* Service Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {currentService.subtitle}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {currentService.description}
            </p>
          </div>

          {/* Right Content - Features */}
          <div className="space-y-4">
            {currentService.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-[#111827] hover:bg-[#1e293b] transition-colors duration-300 group cursor-pointer"
              >
                <div className="w-2 h-2 rounded-full bg-[#3b82f6]" />
                <span className="text-white text-lg group-hover:translate-x-1 transition-transform duration-300">
                  {feature}
                </span>
              </div>
            ))}

            {/* Link Button */}
            <a
              href={currentService.linkHref}
              className="inline-flex items-center gap-2 mt-6 text-[#3b82f6] hover:text-white font-medium transition-colors duration-300 group"
            >
              <span className="border-b border-[#3b82f6] group-hover:border-white">
                {currentService.linkText}
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;