import React from 'react';
import { services } from '../data/mockData';
import { Code, ArrowRightLeft, TrendingUp, Headphones, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ServicesPage = () => {
  const navigate = useNavigate();
  
  const iconMap = {
    Code: Code,
    ArrowRightLeft: ArrowRightLeft,
    TrendingUp: TrendingUp,
    HeadphonesIcon: Headphones
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#f97316] text-sm font-medium uppercase tracking-wider">Наши услуги</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Полный спектр <span className="text-[#10b981]">e-commerce</span> услуг
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              От разработки и дизайна до маркетинга и поддержки — мы закрываем все потребности вашего интернет-магазина.
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={service.id}
                id={service.id === 'make' ? 'development' : service.id === 'migrate' ? 'migration' : service.id === 'market' ? 'marketing' : 'support'}
                className={`py-16 ${index !== services.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                  {/* Left Content */}
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#f97316]/10 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-[#f97316]" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        Мы {service.title}
                      </h2>
                    </div>
                    <h3 className="text-xl text-[#10b981] mb-4">{service.subtitle}</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                      {service.fullDescription}
                    </p>
                    <Button
                      onClick={() => navigate('/contact')}
                      className="bg-[#f97316] text-white hover:bg-[#ea580c] px-6 py-3 font-medium transition-all duration-300 inline-flex items-center gap-2"
                    >
                      Заказать услугу
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Right Content - Features & Benefits */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-white font-semibold mb-4">Что входит:</h4>
                      <div className="grid gap-3">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-[#111827] border border-[#1e293b]"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
                            <span className="text-white">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-semibold mb-4">Преимущества:</h4>
                      <div className="grid gap-3">
                        {service.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <Check className="w-5 h-5 text-[#f97316] flex-shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#111827]/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Нужна консультация?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Расскажите о вашем проекте, и мы подберём оптимальное решение
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              onClick={() => navigate('/contact')}
              className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
            >
              Получить предложение
            </Button>
            <Button
              onClick={() => navigate('/portfolio')}
              className="bg-transparent border border-[#10b981] text-[#10b981] hover:bg-[#10b981] hover:text-white px-8 py-6 text-lg font-medium transition-all duration-300"
            >
              Смотреть портфолио
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;