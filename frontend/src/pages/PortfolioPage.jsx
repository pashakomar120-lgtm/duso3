import React, { useState, useMemo } from 'react';
import { caseStudies } from '../data/portfolioData';
import { ExternalLink, Filter, MapPin, TrendingUp, Globe, Sparkles, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

// CIS flags from flagcdn.com
const countryFlags = {
  '🇷🇺 Россия': { code: 'ru', name: 'Россия' },
  '🇺🇦 Украина': { code: 'ua', name: 'Украина' },
  '🇰🇿 Казахстан': { code: 'kz', name: 'Казахстан' },
  '🇧🇾 Беларусь': { code: 'by', name: 'Беларусь' },
  '🇺🇿 Узбекистан': { code: 'uz', name: 'Узбекистан' },
  '🇦🇿 Азербайджан': { code: 'az', name: 'Азербайджан' },
  '🇬🇪 Грузия': { code: 'ge', name: 'Грузия' },
  '🇦🇲 Армения': { code: 'am', name: 'Армения' },
};

const allCisFlags = [
  { code: 'ru', name: 'Россия', full: '🇷🇺 Россия' },
  { code: 'ua', name: 'Украина', full: '🇺🇦 Украина' },
  { code: 'kz', name: 'Казахстан', full: '🇰🇿 Казахстан' },
  { code: 'by', name: 'Беларусь', full: '🇧🇾 Беларусь' },
  { code: 'uz', name: 'Узбекистан', full: '🇺🇿 Узбекистан' },
  { code: 'az', name: 'Азербайджан', full: '🇦🇿 Азербайджан' },
  { code: 'ge', name: 'Грузия', full: '🇬🇪 Грузия' },
  { code: 'am', name: 'Армения', full: '🇦🇲 Армения' },
];

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(caseStudies.map(p => p.category))];
    return ['all', ...cats];
  }, []);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return caseStudies.filter(p => {
      const matchCategory = categoryFilter === 'all' || p.category === categoryFilter;
      const matchCountry = countryFilter === 'all' || p.country === countryFilter;
      return matchCategory && matchCountry;
    });
  }, [categoryFilter, countryFilter]);

  // Stats by country
  const countryStats = useMemo(() => {
    const stats = {};
    caseStudies.forEach(p => {
      if (!stats[p.country]) stats[p.country] = 0;
      stats[p.country]++;
    });
    return stats;
  }, []);

  const getFlagCode = (country) => {
    return countryFlags[country]?.code || 'ru';
  };

  return (
    <div className="min-h-screen pt-32 relative z-10">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-orange-500/20">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">51+ проект по всьому СНГ</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Наші <span className="text-emerald-500 text-glow-emerald">проекти</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Більше <span className="text-orange-500 font-bold">6500+</span> успішних проектів у <span className="text-emerald-500 font-bold">всіх 8 країнах СНГ</span>. 
                Від стартапів до enterprise — ми створюємо магазини, які продають.
              </p>
              
              {/* All CIS countries highlight */}
              <div className="mt-6 p-4 glass rounded-xl border border-emerald-500/20">
                <p className="text-emerald-400 text-sm font-medium mb-3">🌍 Працюємо з усіма країнами СНГ:</p>
                <div className="flex flex-wrap gap-2">
                  {allCisFlags.map((flag) => (
                    <div key={flag.code} className="flex items-center gap-2 px-3 py-1.5 glass rounded-lg border border-white/5">
                      <img 
                        src={`https://flagcdn.com/w20/${flag.code}.png`}
                        alt={flag.name}
                        className="w-5 h-4 object-cover rounded-sm"
                      />
                      <span className="text-white text-xs">{flag.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Country Stats with Real Flags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {allCisFlags.map((flag) => {
                const count = countryStats[flag.full] || 0;
                return (
                  <button
                    key={flag.code}
                    onClick={() => setCountryFilter(countryFilter === flag.full ? 'all' : flag.full)}
                    className={`floating-card rounded-xl p-4 text-center transition-all duration-300 ${
                      countryFilter === flag.full ? 'border-orange-500/50 scale-105' : 'hover:border-orange-500/30 hover:scale-105'
                    }`}
                    data-testid={`country-filter-${flag.code}`}
                  >
                    <img 
                      src={`https://flagcdn.com/w40/${flag.code}.png`}
                      alt={flag.name}
                      className="w-10 h-7 object-cover rounded shadow-lg mx-auto mb-2"
                    />
                    <div className="text-white font-bold">{count}</div>
                    <div className="text-gray-500 text-xs">{flag.name}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-orange-500" />
              <span className="text-gray-400 text-sm">Категорія:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 12).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  data-testid={`category-filter-${cat}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    categoryFilter === cat
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                      : 'glass text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  {cat === 'all' ? 'Всі категорії' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Country Filter with Flags */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-400 text-sm">Країна:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  countryFilter === 'all'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'glass text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                🌍 Всі країни СНГ
              </button>
              {allCisFlags.map((flag) => (
                <button
                  key={flag.code}
                  onClick={() => setCountryFilter(flag.full)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    countryFilter === flag.full
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'glass text-gray-400 hover:text-white border border-white/5'
                  }`}
                >
                  <img 
                    src={`https://flagcdn.com/w20/${flag.code}.png`}
                    alt={flag.name}
                    className="w-5 h-3 object-cover rounded-sm"
                  />
                  {flag.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-400">
              Показано: <span className="text-white font-bold">{filteredProjects.length}</span> проектів
            </p>
            {(categoryFilter !== 'all' || countryFilter !== 'all') && (
              <button
                onClick={() => { setCategoryFilter('all'); setCountryFilter('all'); }}
                className="text-orange-500 hover:text-orange-400 text-sm flex items-center gap-1"
              >
                Скинути фільтри <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="floating-card rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setSelectedProject(project)}
                data-testid={`project-card-${project.id}`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Country Flag Badge */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 glass rounded-full backdrop-blur-sm">
                    <img 
                      src={`https://flagcdn.com/w20/${getFlagCode(project.country)}.png`}
                      alt={project.country}
                      className="w-5 h-3 object-cover rounded-sm"
                    />
                    <span className="text-white text-xs font-medium">{project.city}</span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-orange-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <Globe className="w-4 h-4" />
                    <span>{project.website}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Results */}
                  <div className="flex flex-wrap gap-2">
                    {project.results.slice(0, 2).map((result, idx) => (
                      <span key={idx} className="px-2 py-1 glass rounded text-emerald-400 text-xs border border-emerald-500/20">
                        {result}
                      </span>
                    ))}
                  </div>

                  {project.revenue && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <span className="text-emerald-500 font-bold">{project.revenue}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="floating-card rounded-3xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Готові до зростання?
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Ваш бізнес в будь-якій країні СНГ? Ми знаємо локальний ринок та допоможемо масштабуватись!
            </p>
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {allCisFlags.map((flag) => (
                <img 
                  key={flag.code}
                  src={`https://flagcdn.com/w40/${flag.code}.png`}
                  alt={flag.name}
                  className="w-10 h-7 object-cover rounded shadow-lg hover:scale-110 transition-transform"
                />
              ))}
            </div>
            <Button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-8 py-6 text-lg font-medium shadow-lg shadow-orange-500/25"
            >
              Обговорити проект
            </Button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-strong rounded-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={`https://flagcdn.com/w40/${getFlagCode(selectedProject.country)}.png`}
                    alt={selectedProject.country}
                    className="w-10 h-7 object-cover rounded shadow-lg"
                  />
                  <span className="text-white text-sm">{selectedProject.country} • {selectedProject.city}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedProject.title}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <Globe className="w-4 h-4" />
                <span>{selectedProject.website}</span>
              </div>

              <p className="text-gray-300 mb-6">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Результати:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.results.map((result, idx) => (
                    <span key={idx} className="px-3 py-1.5 glass rounded-lg text-emerald-400 text-sm border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      {result}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Послуги:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.services.map((service, idx) => (
                    <span key={idx} className="px-3 py-1.5 glass rounded-lg text-orange-400 text-sm border border-orange-500/20">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {selectedProject.revenue && (
                <div className="p-4 glass rounded-xl border border-emerald-500/20 text-center">
                  <span className="text-gray-400 text-sm">Річний оборот</span>
                  <p className="text-emerald-400 text-2xl font-bold">{selectedProject.revenue}</p>
                </div>
              )}

              <Button
                onClick={() => {
                  setSelectedProject(null);
                  navigate('/contact');
                }}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700"
              >
                Хочу такий же результат
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
