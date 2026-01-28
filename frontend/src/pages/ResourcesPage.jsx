import React, { useState } from 'react';
import { resources, faq } from '../data/mockData';
import { Clock, ArrowRight, ChevronDown, ChevronUp, BookOpen, FileText, CheckSquare, Lightbulb, TrendingUp, CreditCard } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useNavigate } from 'react-router-dom';

const ResourcesPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Гайд', 'Сравнение', 'Чеклист', 'Стратегия', 'Тренды'];

  const categoryIcons = {
    'Гайд': BookOpen,
    'Сравнение': FileText,
    'Чеклист': CheckSquare,
    'Стратегия': Lightbulb,
    'Тренды': TrendingUp
  };

  const filteredResources = filter === 'all'
    ? resources
    : resources.filter(r => r.category === filter);

  return (
    <div className="min-h-screen bg-[#0a0a0b] pt-24">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <span className="text-[#f97316] text-sm font-medium uppercase tracking-wider">Ресурсы</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6">
              База <span className="text-[#10b981]">знаний</span>
            </h1>
            <p className="text-gray-400 text-xl leading-relaxed">
              Полезные статьи, гайды и чеклисты по e-commerce от наших экспертов.
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
                {cat === 'all' ? 'Все материалы' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => {
              const Icon = categoryIcons[resource.category] || BookOpen;
              return (
                <article
                  key={resource.id}
                  className="bg-[#111827] rounded-2xl overflow-hidden border border-[#1e293b] hover:border-[#f97316] transition-all duration-300 cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#10b981] text-white text-xs font-medium rounded-full inline-flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {resource.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-3">
                      <span>{resource.date}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {resource.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#f97316] transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{resource.excerpt}</p>
                    <button className="inline-flex items-center gap-2 text-[#f97316] hover:text-white font-medium text-sm transition-colors group/btn">
                      Читать дальше
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#111827]/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
            Часто задаваемые <span className="text-[#f97316]">вопросы</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Ответы на самые популярные вопросы о наших услугах
          </p>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-[#111827] rounded-xl border border-[#1e293b] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="text-white font-medium pr-4">{item.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-[#f97316] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Остались вопросы?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Наши эксперты готовы ответить на все ваши вопросы
          </p>
          <Button
            onClick={() => navigate('/contact')}
            className="bg-[#f97316] text-white hover:bg-[#ea580c] px-8 py-6 text-lg font-medium transition-all duration-300 hover:scale-105"
          >
            Задать вопрос
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;