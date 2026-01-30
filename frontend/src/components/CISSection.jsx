import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Users, TrendingUp, Globe } from 'lucide-react';
import { Button } from './ui/button';

const cisCountries = [
  { 
    flag: '🇷🇺', 
    name: 'Россия', 
    projects: 15, 
    cities: ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'],
    highlight: true
  },
  { 
    flag: '🇺🇦', 
    name: 'Украина', 
    projects: 10, 
    cities: ['Киев', 'Харьков', 'Одесса', 'Львов', 'Днепр'],
    highlight: true
  },
  { 
    flag: '🇰🇿', 
    name: 'Казахстан', 
    projects: 8, 
    cities: ['Алматы', 'Нур-Султан', 'Шымкент', 'Караганда'],
    highlight: false
  },
  { 
    flag: '🇧🇾', 
    name: 'Беларусь', 
    projects: 7, 
    cities: ['Минск', 'Гомель', 'Брест', 'Гродно'],
    highlight: false
  },
  { 
    flag: '🇺🇿', 
    name: 'Узбекистан', 
    projects: 5, 
    cities: ['Ташкент', 'Самарканд', 'Бухара'],
    highlight: false
  },
  { 
    flag: '🇦🇿', 
    name: 'Азербайджан', 
    projects: 3, 
    cities: ['Баку'],
    highlight: false
  },
  { 
    flag: '🇬🇪', 
    name: 'Грузия', 
    projects: 2, 
    cities: ['Тбилиси', 'Батуми'],
    highlight: false
  },
  { 
    flag: '🇦🇲', 
    name: 'Армения', 
    projects: 2, 
    cities: ['Ереван'],
    highlight: false
  },
];

const CISSection = () => {
  const navigate = useNavigate();

  const totalProjects = cisCountries.reduce((sum, c) => sum + c.projects, 0);
  const totalCities = cisCountries.reduce((sum, c) => sum + c.cities.length, 0);

  return (
    <section className="py-24 relative z-10">
      <div className="absolute inset-0 glass opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-emerald-500 text-sm font-medium tracking-wider uppercase mb-4 block">
            География присутствия
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="text-orange-500 text-glow-orange">#1</span> E-commerce агентство по <span className="text-emerald-500 text-glow-emerald">СНГ</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Работаем с бизнесами в 8 странах СНГ. Локальная экспертиза, глобальные стандарты.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="floating-card rounded-xl p-6 text-center">
            <Globe className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">8</div>
            <div className="text-gray-500 text-sm">Стран СНГ</div>
          </div>
          <div className="floating-card rounded-xl p-6 text-center">
            <MapPin className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">{totalCities}+</div>
            <div className="text-gray-500 text-sm">Городов</div>
          </div>
          <div className="floating-card rounded-xl p-6 text-center">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">6500+</div>
            <div className="text-gray-500 text-sm">Проектов</div>
          </div>
          <div className="floating-card rounded-xl p-6 text-center">
            <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-white">$3B+</div>
            <div className="text-gray-500 text-sm">Оборот клиентов</div>
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {cisCountries.map((country, index) => (
            <div
              key={country.name}
              data-testid={`cis-country-${country.name}`}
              className={`floating-card rounded-xl p-5 transition-all duration-300 hover:scale-105 cursor-pointer ${
                country.highlight ? 'border-orange-500/30' : ''
              }`}
              onClick={() => navigate('/portfolio')}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{country.flag}</span>
                <div>
                  <div className="text-white font-bold">{country.name}</div>
                  <div className="text-orange-500 text-sm font-medium">{country.projects} проектов</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {country.cities.slice(0, 3).map((city) => (
                  <span key={city} className="text-xs px-2 py-1 glass rounded text-gray-400">
                    {city}
                  </span>
                ))}
                {country.cities.length > 3 && (
                  <span className="text-xs px-2 py-1 text-gray-500">
                    +{country.cities.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Ваш бизнес в СНГ? Мы знаем местный рынок!</p>
          <Button
            onClick={() => navigate('/portfolio')}
            data-testid="cis-portfolio-btn"
            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 rounded-xl shadow-lg shadow-orange-500/25 mr-4"
          >
            Смотреть все проекты
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            onClick={() => navigate('/contact')}
            variant="outline"
            className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 px-8 py-6 rounded-xl"
          >
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CISSection;
