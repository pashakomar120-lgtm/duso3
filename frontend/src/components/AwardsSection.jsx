import React from 'react';
import { awards } from '../data/mockData';
import { Award, Shield, Star, Trophy, CheckCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AwardsSection = () => {
  const navigate = useNavigate();
  const certificationIcons = [Shield, Award, Star, Trophy];

  const partners = [
    { name: 'Shopify Plus Partner', icon: '🛍️' },
    { name: 'Google Partner', icon: '🔍' },
    { name: 'Meta Business Partner', icon: '📱' },
    { name: 'Klaviyo Partner', icon: '📧' },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="absolute inset-0 glass opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Main Container */}
        <div className="floating-card rounded-3xl p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-orange-500 text-sm font-medium tracking-wider uppercase mb-2 block">
              Сертификация
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Награды & <span className="text-emerald-500 text-glow-emerald">Партнёры</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Официальные партнёры ведущих e-commerce платформ и сертифицированные эксперты с безупречной репутацией.
            </p>
          </div>

          {/* Partners Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="glass rounded-xl p-4 text-center hover:border-orange-500/30 border border-transparent transition-all duration-300 group"
              >
                <span className="text-3xl block mb-2">{partner.icon}</span>
                <span className="text-white text-sm font-medium group-hover:text-orange-500 transition-colors">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Shopify Certifications */}
            <div className="floating-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Shopify Эксперты</h3>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-3 h-3 fill-orange-500 text-orange-500" />
                    ))}
                    <span className="text-gray-500 text-xs ml-1">5.0</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                Сертифицированные профессионалы с экспертизой в разработке, миграции и маркетинге Shopify магазинов.
              </p>

              <div className="flex flex-wrap gap-2">
                {awards.shopifyCertifications.map((cert, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 glass rounded-lg text-white border border-orange-500/20 hover:border-orange-500/50 transition-colors cursor-default"
                  >
                    <CheckCircle className="w-3 h-3 text-orange-500 inline mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Clutch Recognition */}
            <div className="floating-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Признание Clutch</h3>
                  <span className="text-emerald-500 text-xs">Top B2B Company</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-4">
                Признаны как ведущий поставщик услуг на Clutch и GoodFirms.
              </p>

              <div className="flex flex-wrap gap-2">
                {awards.clutchAwards.map((award, index) => (
                  <span
                    key={index}
                    className="text-xs px-3 py-1.5 glass rounded-lg text-white border border-emerald-500/20 hover:border-emerald-500/50 transition-colors cursor-default"
                  >
                    <Award className="w-3 h-3 text-emerald-500 inline mr-1" />
                    {award}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-white/5">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">6500+</div>
              <div className="text-gray-500 text-xs">Проектов</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-500">98%</div>
              <div className="text-gray-500 text-xs">Клиентов довольны</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10+</div>
              <div className="text-gray-500 text-xs">Лет опыта</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-500">50+</div>
              <div className="text-gray-500 text-xs">Экспертов</div>
            </div>
          </div>

          {/* View More Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/about')}
              data-testid="awards-learn-more"
              className="inline-flex items-center gap-2 text-orange-500 hover:text-white font-medium transition-colors duration-300 group"
            >
              <span className="neon-underline">Узнать больше о нас</span>
              <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
