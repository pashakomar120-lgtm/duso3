import React from 'react';
import { teamMembers, companyValues, stats } from '../data/mockData';
import { Target, Handshake, Lightbulb, Eye, Linkedin, Users, Award, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  
  const iconMap = {
    Target: Target,
    Handshake: Handshake,
    Lightbulb: Lightbulb,
    Eye: Eye
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#f97316] text-sm font-medium uppercase tracking-wider">О компании</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Мы создаём <span className="text-[#10b981]">e-commerce</span> будущего
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              С 2015 года мы помогаем бизнесам выходить в онлайн и масштабировать продажи. 
              Наша миссия — сделать успешную интернет-торговлю доступной для каждого.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Users className="w-10 h-10 text-[#f97316] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">50+</div>
              <p className="text-gray-400">Специалистов в команде</p>
            </div>
            <div className="text-center">
              <Award className="w-10 h-10 text-[#10b981] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">10+</div>
              <p className="text-gray-400">Лет на рынке</p>
            </div>
            <div className="text-center">
              <Clock className="w-10 h-10 text-[#f97316] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <p className="text-gray-400">Поддержка клиентов</p>
            </div>
            <div className="text-center">
              <Target className="w-10 h-10 text-[#10b981] mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <p className="text-gray-400">Довольных клиентов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Наши <span className="text-[#f97316]">ценности</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const Icon = iconMap[value.icon];
              return (
                <div
                  key={index}
                  className="bg-[#111827] rounded-2xl p-8 border border-[#1e293b] hover:border-[#f97316] transition-all duration-300 group"
                >
                  <Icon className="w-12 h-12 text-[#f97316] mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#111827]/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Наша <span className="text-[#10b981]">команда</span>
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Профессионалы с многолетним опытом в e-commerce, разработке и маркетинге
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-[#111827] rounded-2xl overflow-hidden border border-[#1e293b] hover:border-[#10b981] transition-all duration-300 group"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-[#f97316] text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#10b981] hover:text-white transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm">LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Готовы начать работать вместе?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Свяжитесь с нами для бесплатной консультации по вашему проекту
          </p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Связаться с нами
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;