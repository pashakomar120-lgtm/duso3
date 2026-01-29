import React from 'react';
import { services } from '../data/mockData';
import { ArrowRight, Check, Gift, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

const ServicesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 relative z-10">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-orange-500/20">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span className="text-orange-500 text-sm font-medium">12 профессиональных услуг</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Полный спектр <span className="text-emerald-500 text-glow-emerald">e-commerce</span> услуг
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              От разработки и дизайна до маркетинга и поддержки — мы закрываем все потребности вашего интернет-магазина.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = LucideIcons[service.icon] || LucideIcons.Box;
              
              return (
                <div
                  key={service.id}
                  data-testid={`service-card-${service.id}`}
                  className="floating-card rounded-2xl p-6 group hover:border-orange-500/30 transition-all duration-500"
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title & Price */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-orange-500 font-medium text-sm mb-3">{service.price}</p>
                  
                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features preview */}
                  <div className="space-y-2 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-300 text-xs">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-gray-500 text-xs">+{service.features.length - 3} ещё...</span>
                    )}
                  </div>
                  
                  {/* Gift Banner - Only for certain services */}
                  {service.gift && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                      <div className="flex items-start gap-2">
                        <Gift className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-emerald-500 font-bold text-xs">{service.gift.title}: </span>
                          <span className="text-white text-xs">{service.gift.description}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* CTA */}
                  <Button
                    onClick={() => navigate('/contact')}
                    className="w-full mt-auto glass border border-white/10 text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all py-5 rounded-xl group"
                  >
                    Заказать
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Подробнее об <span className="text-orange-500">услугах</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Каждая услуга включает профессиональное выполнение, гарантию результата и бонусы
            </p>
          </div>

          {services.slice(0, 6).map((service, index) => {
            const IconComponent = LucideIcons[service.icon] || LucideIcons.Box;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={service.id}
                id={service.id}
                className={`py-16 ${index !== 5 ? 'border-b border-white/5' : ''}`}
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-start ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left/Right Content */}
                  <div className={!isEven ? 'lg:order-2' : ''}>
                    <div className="floating-card rounded-2xl p-8">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/30">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold text-white">
                            {service.title}
                          </h2>
                          <p className="text-orange-500 font-medium">{service.price}</p>
                        </div>
                      </div>
                      <h3 className="text-lg text-emerald-500 mb-4">{service.subtitle}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6">
                        {service.fullDescription}
                      </p>
                      
                      {/* Gift */}
                      {service.gift && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/30 mb-6">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                              <Gift className="w-5 h-5 text-emerald-500" />
                            </div>
                            <div>
                              <div className="text-emerald-500 font-bold">{service.gift.title}</div>
                              <div className="text-white">{service.gift.description}</div>
                              <div className="text-gray-500 text-sm mt-1">Стоимость: {service.gift.value}</div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button
                        onClick={() => navigate('/contact')}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-6 py-3 font-medium transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-orange-500/25 rounded-xl"
                      >
                        Заказать услугу
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Right/Left Content - Features & Benefits */}
                  <div className={`space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                    <div className="floating-card rounded-2xl p-6">
                      <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full" />
                        Что входит:
                      </h4>
                      <div className="grid gap-2">
                        {service.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                          >
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-white text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {service.benefits && (
                      <div className="floating-card rounded-2xl p-6">
                        <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                          Преимущества:
                        </h4>
                        <div className="grid gap-2">
                          {service.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-gray-300"
                            >
                              <Check className="w-4 h-4 text-orange-500 flex-shrink-0" />
                              <span className="text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="floating-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Нужна <span className="text-orange-500">консультация</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Расскажите о вашем проекте, и мы подберём оптимальное решение с максимальной выгодой
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  onClick={() => navigate('/contact')}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30 rounded-xl"
                >
                  Получить предложение
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  onClick={() => navigate('/portfolio')}
                  className="glass border-2 border-emerald-500/30 text-emerald-500 hover:border-emerald-500 hover:bg-emerald-500/10 px-8 py-6 text-lg font-medium transition-all duration-300 rounded-xl"
                >
                  Смотреть портфолио
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
