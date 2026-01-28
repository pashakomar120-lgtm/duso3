import React, { useState } from 'react';
import { caseStudies } from '../data/mockData';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent } from '../components/ui/dialog';

const PortfolioPage = () => {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Мода и одежда', 'Электроника', 'Дом и интерьер', 'Спорт и фитнес', 'Красота и здоровье', 'Товары для животных'];

  const filteredProjects = filter === 'all' 
    ? caseStudies 
    : caseStudies.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#f97316] text-sm font-medium uppercase tracking-wider">Портфолио</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              Наши <span className="text-[#10b981]">проекты</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Более 6500+ успешных проектов в различных отраслях. Вот некоторые из них.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === cat
                    ? 'bg-[#f97316] text-white'
                    : 'bg-[#1e293b] text-gray-400 hover:bg-[#2d3a4f] hover:text-white'
                }`}
              >
                {cat === 'all' ? 'Все проекты' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="bg-[#111827] rounded-2xl overflow-hidden border border-[#1e293b] hover:border-[#f97316] transition-all duration-300 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#f97316] text-white text-xs font-medium rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.services.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-[#1e293b] text-[#10b981] text-xs rounded"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#f97316] text-sm font-medium">{project.website}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#10b981] transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-[#111827] border-[#1e293b] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <div>
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <span className="px-3 py-1 bg-[#f97316] text-white text-xs font-medium rounded-full">
                {selectedProject.category}
              </span>
              <h2 className="text-3xl font-bold text-white mt-4 mb-2">{selectedProject.title}</h2>
              <p className="text-[#10b981] mb-4">{selectedProject.website}</p>
              <p className="text-gray-400 mb-6">{selectedProject.description}</p>
              
              <h4 className="text-white font-semibold mb-3">Результаты:</h4>
              <div className="flex flex-wrap gap-3 mb-6">
                {selectedProject.results.map((result, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-[#10b981]/10 text-[#10b981] rounded-lg font-medium"
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
                    className="px-3 py-1 bg-[#1e293b] text-white text-sm rounded"
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
                className="w-full bg-[#f97316] text-white hover:bg-[#ea580c] py-6 text-lg font-medium"
              >
                Заказать похожий проект
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-20 bg-[#111827]/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Хотите такой же результат?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Давайте обсудим ваш проект и создадим что-то выдающееся
          </p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Начать проект
          </Button>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;