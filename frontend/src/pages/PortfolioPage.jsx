import React, { useState, useMemo } from 'react';
import { caseStudies } from '../data/portfolioData';
import { ExternalLink, Filter, MapPin, TrendingUp, Globe, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '../components/ui/dialog';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');

  // Get unique categories and countries
  const categories = useMemo(() => {
    const cats = [...new Set(caseStudies.map(p => p.category))];
    return ['all', ...cats];
  }, []);

  const countries = useMemo(() => {
    const countryList = [...new Set(caseStudies.map(p => p.country))];
    return ['all', ...countryList];
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

  return (
    <div className="min-h-screen pt-32 relative z-10">
      {/* Hero Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 border border-orange-500/20">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-orange-500 text-sm font-medium">50+ проектов по СНГ</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Наши <span className="text-emerald-500 text-glow-emerald">проекты</span>
              </h1>
              <p className="text-gray-400 text-xl leading-relaxed">
                Более <span className="text-orange-500 font-bold">6500+</span> успешных проектов в <span className="text-emerald-500 font-bold">8 странах СНГ</span>. 
                От стартапов до enterprise — мы создаём магазины, которые продают.
              </p>
            </div>

            {/* Country Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(countryStats).slice(0, 8).map(([country, count]) => (
                <button
                  key={country}
                  onClick={() => setCountryFilter(countryFilter === country ? 'all' : country)}
                  className={`floating-card rounded-xl p-4 text-center transition-all duration-300 ${
                    countryFilter === country ? 'border-orange-500/50 scale-105' : 'hover:border-orange-500/30'
                  }`}
                  data-testid={`country-filter-${country}`}
                >
                  <div className="text-2xl mb-1">{country.split(' ')[0]}</div>
                  <div className="text-white font-bold">{count}</div>
                  <div className="text-gray-500 text-xs">проектов</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Filter className="w-4 h-4 text-orange-500" />
              <span className="text-gray-400 text-sm">Категория:</span>
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
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'Все категории' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Country Filter */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="text-gray-400 text-sm">Страна:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCountryFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  countryFilter === 'all'
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                    : 'glass text-gray-400 hover:text-white'
                }`}
              >
                Все страны
              </button>
              {countries.filter(c => c !== 'all').map((country) => (
                <button
                  key={country}
                  onClick={() => setCountryFilter(country)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    countryFilter === country
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                      : 'glass text-gray-400 hover:text-white'
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-6 text-gray-400">
            Показано: <span className="text-orange-500 font-bold">{filteredProjects.length}</span> проектов
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                data-testid={`project-card-${project.id}`}
                className="floating-card rounded-2xl overflow-hidden cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                    <span className="px-2 py-1 glass text-white text-xs font-medium rounded-full">
                      {project.country}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-500 transition-colors" />
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-500 text-xs mb-3">
                    <MapPin className="w-3 h-3" />
                    {project.city}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                  
                  {/* Results preview */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.results.slice(0, 2).map((result, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs rounded-lg flex items-center gap-1"
                      >
                        <TrendingUp className="w-3 h-3" />
                        {result}
                      </span>
                    ))}
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1">
                    {project.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-gray-900 border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                  {selectedProject.category}
                </span>
                <span className="px-3 py-1 glass text-white text-xs font-medium rounded-full">
                  {selectedProject.country}
                </span>
                <span className="px-3 py-1 glass text-gray-400 text-xs font-medium rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {selectedProject.city}
                </span>
              </div>

              <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
              <p className="text-emerald-500 mb-4">{selectedProject.website}</p>
              <p className="text-gray-400 mb-6">{selectedProject.description}</p>
              
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                Результаты:
              </h4>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.results.map((result, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-lg font-medium"
                  >
                    {result}
                  </span>
                ))}
              </div>

              <h4 className="text-white font-semibold mb-3">Услуги:</h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.services.map((service, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 glass text-white text-sm rounded"
                  >
                    {service}
                  </span>
                ))}
              </div>

              <Button
                onClick={() => {
                  setSelectedProject(null);
                  navigate('/contact');
                }}
                data-testid="project-modal-cta"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 py-6 text-lg font-medium rounded-xl shadow-lg shadow-orange-500/25"
              >
                Заказать похожий проект
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="floating-card rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl" />
            
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Хотите такой же <span className="text-orange-500">результат</span>?
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                Давайте обсудим ваш проект и создадим что-то выдающееся для вашего бизнеса в любой стране СНГ
              </p>
              <Button
                onClick={() => navigate('/contact')}
                data-testid="portfolio-cta"
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 px-10 py-6 text-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/30 rounded-xl"
              >
                Начать проект
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
