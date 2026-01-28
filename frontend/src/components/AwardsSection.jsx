import React from 'react';
import { awards } from '../data/mockData';
import { Award, Shield, Star, Trophy } from 'lucide-react';

const AwardsSection = () => {
  const certificationIcons = [Shield, Award, Star, Trophy];
  const clutchIcons = [Trophy, Award, Star];

  return (
    <section className="bg-[#0a0a0b] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Container */}
        <div className="bg-[#111827] rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="mb-12">
            <span className="text-[#3b82f6] text-lg font-medium">Нагороди</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              & Сертифікація
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Shopify Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Сертифіковані Shopify Експерти
              </h3>
              <p className="text-gray-400 mb-8">
                Внутрішня команда сертифікованих Shopify професіоналів з експертизою у розробці, міграції та маркетингу, та ідеальним рейтингом 5.0 на Shopify.
              </p>

              {/* Certification Cards Carousel */}
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {awards.shopifyCertifications.map((cert, index) => {
                  const Icon = certificationIcons[index % certificationIcons.length];
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300"
                    >
                      <Icon className="w-12 h-12 text-[#3b82f6] mb-4" />
                      <span className="text-white font-medium text-sm">{cert}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clutch Recognition */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Визнання Clutch
              </h3>
              <p className="text-gray-400 mb-8">
                Визнані як провідний постачальник послуг на топ-B2B платформах оглядів та рейтингів, таких як Clutch та GoodFirms.
              </p>

              {/* Award Cards Carousel */}
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {awards.clutchAwards.map((award, index) => {
                  const Icon = clutchIcons[index % clutchIcons.length];
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300"
                    >
                      <Icon className="w-12 h-12 text-[#f59e0b] mb-4" />
                      <span className="text-white font-medium text-sm">{award}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* View More Link */}
          <div className="mt-8 text-center">
            <a
              href="#awards"
              className="inline-flex items-center gap-2 text-[#3b82f6] hover:text-white font-medium transition-colors duration-300"
            >
              & Більше
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;