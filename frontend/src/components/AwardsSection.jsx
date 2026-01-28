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
        <div className="bg-[#111827] rounded-3xl p-8 md:p-12 border border-[#1e293b]">
          {/* Header */}
          <div className="mb-12">
            <span className="text-[#f97316] text-lg font-medium">Награды</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">
              & Сертификация
            </h2>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-12">
            {/* Shopify Certifications */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Сертифицированные Shopify Эксперты
              </h3>
              <p className="text-gray-400 mb-8">
                Внутренняя команда сертифицированных Shopify профессионалов с экспертизой в разработке, миграции и маркетинге, и идеальным рейтингом 5.0 на Shopify.
              </p>

              {/* Certification Cards Carousel */}
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {awards.shopifyCertifications.map((cert, index) => {
                  const Icon = certificationIcons[index % certificationIcons.length];
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 border border-[#374151] hover:border-[#f97316]"
                    >
                      <Icon className="w-12 h-12 text-[#f97316] mb-4" />
                      <span className="text-white font-medium text-sm">{cert}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Clutch Recognition */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Признание Clutch
              </h3>
              <p className="text-gray-400 mb-8">
                Признаны как ведущий поставщик услуг на топ-B2B платформах обзоров и рейтингов, таких как Clutch и GoodFirms.
              </p>

              {/* Award Cards Carousel */}
              <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'none' }}>
                {awards.clutchAwards.map((award, index) => {
                  const Icon = clutchIcons[index % clutchIcons.length];
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 w-48 h-64 bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-xl p-6 flex flex-col items-center justify-center text-center hover:scale-105 transition-transform duration-300 border border-[#374151] hover:border-[#10b981]"
                    >
                      <Icon className="w-12 h-12 text-[#10b981] mb-4" />
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
              className="inline-flex items-center gap-2 text-[#f97316] hover:text-white font-medium transition-colors duration-300"
            >
              & Больше
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;