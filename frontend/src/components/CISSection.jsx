import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MapPin, Users, TrendingUp, Globe } from 'lucide-react';
import { Button } from './ui/button';

// Flag images from flagcdn.com
const flagImages = {
  ru: 'https://flagcdn.com/w80/ru.png',
  ua: 'https://flagcdn.com/w80/ua.png',
  kz: 'https://flagcdn.com/w80/kz.png',
  by: 'https://flagcdn.com/w80/by.png',
  uz: 'https://flagcdn.com/w80/uz.png',
  az: 'https://flagcdn.com/w80/az.png',
  ge: 'https://flagcdn.com/w80/ge.png',
  am: 'https://flagcdn.com/w80/am.png',
};

const cisCountries = [
  { 
    code: 'ru',
    name: 'Россия', 
    projects: 3200, 
    cities: ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск', 'Екатеринбург'],
    color: 'from-red-500/20 to-blue-500/20',
    border: 'border-red-500/30 hover:border-red-500/50'
  },
  { 
    code: 'ua',
    name: 'Украина', 
    projects: 1500, 
    cities: ['Киев', 'Харьков', 'Одесса', 'Львов', 'Днепр'],
    color: 'from-blue-500/20 to-yellow-500/20',
    border: 'border-blue-500/30 hover:border-yellow-500/50'
  },
  { 
    code: 'kz',
    name: 'Казахстан', 
    projects: 800, 
    cities: ['Алматы', 'Нур-Султан', 'Шымкент', 'Караганда'],
    color: 'from-cyan-500/20 to-yellow-500/20',
    border: 'border-cyan-500/30 hover:border-cyan-500/50'
  },
  { 
    code: 'by',
    name: 'Беларусь', 
    projects: 450, 
    cities: ['Минск', 'Гомель', 'Брест', 'Гродно'],
    color: 'from-red-500/20 to-green-500/20',
    border: 'border-green-500/30 hover:border-green-500/50'
  },
  { 
    code: 'uz',
    name: 'Узбекистан', 
    projects: 250, 
    cities: ['Ташкент', 'Самарканд', 'Бухара'],
    color: 'from-blue-500/20 to-green-500/20',
    border: 'border-blue-500/30 hover:border-blue-500/50'
  },
  { 
    code: 'az',
    name: 'Азербайджан', 
    projects: 180, 
    cities: ['Баку', 'Гянджа'],
    color: 'from-blue-500/20 to-red-500/20',
    border: 'border-red-500/30 hover:border-red-500/50'
  },
  { 
    code: 'ge',
    name: 'Грузия', 
    projects: 80, 
    cities: ['Тбилиси', 'Батуми'],
    color: 'from-red-500/20 to-white/10',
    border: 'border-red-500/30 hover:border-red-500/50'
  },
  { 
    code: 'am',
    name: 'Армения', 
    projects: 40, 
    cities: ['Ереван'],
    color: 'from-red-500/20 to-orange-500/20',
    border: 'border-orange-500/30 hover:border-orange-500/50'
  },
];

const CISSection = () => {
  const navigate = useNavigate();

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

        {/* Countries Grid with REAL FLAG IMAGES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {cisCountries.map((country) => (
            <div
              key={country.name}
              data-testid={`cis-country-${country.name}`}
              className={`floating-card rounded-2xl p-5 transition-all duration-300 hover:scale-105 cursor-pointer border ${country.border}`}
              onClick={() => navigate('/portfolio')}
            >
              {/* Flag Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${country.color} flex items-center justify-center overflow-hidden`}>
                  <img 
                    src={flagImages[country.code]} 
                    alt={country.name}
                    className="w-12 h-9 object-cover rounded shadow-lg"
                  />
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{country.name}</div>
                  <div className="text-emerald-400 text-sm font-semibold">{country.projects.toLocaleString()}+ магазинов</div>
                </div>
              </div>
              {/* Cities */}
              <div className="flex flex-wrap gap-1">
                {country.cities.slice(0, 4).map((city) => (
                  <span key={city} className="text-xs px-2 py-1 glass rounded-lg text-gray-400 border border-white/5">
                    {city}
                  </span>
                ))}
                {country.cities.length > 4 && (
                  <span className="text-xs px-2 py-1 text-orange-500">
                    +{country.cities.length - 4}
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
